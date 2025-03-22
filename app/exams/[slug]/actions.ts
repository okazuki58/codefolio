"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getExamBySlug } from "@/lib/microcms";

export async function submitExam(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("ログインが必要です");
  }

  const repositoryUrl = formData.get("repositoryUrl") as string;
  const slug = formData.get("slug") as string;

  if (!repositoryUrl) {
    throw new Error("リポジトリURLは必須です");
  }

  // GitHub URLの形式チェック
  const githubUrlPattern = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
  if (!githubUrlPattern.test(repositoryUrl)) {
    throw new Error("有効なGitHub URLを入力してください");
  }

  try {
    // microCMSから演習情報を取得
    console.log(`演習情報を取得中: slug=${slug}`);
    const exam = await getExamBySlug(slug);
    console.log("取得した演習情報:", { id: exam?.id, slug: exam?.slug });

    if (!exam || !exam.id) {
      throw new Error("演習情報の取得に失敗しました");
    }

    // APIを使わずに直接Prismaを使用
    console.log(
      `ExamResultを作成中: userId=${session.user.id}, examId=${exam.id}`
    );
    const examResult = await prisma.examResult.create({
      data: {
        userId: session.user.id,
        examId: exam.id, // microCMSのIDを使用
        repositoryUrl,
        testsPassed: 0,
        testsTotal: 0,
        passPercentage: 0,
        status: "pending",
      },
    });
    console.log(`ExamResult作成完了: id=${examResult.id}`);

    // Cloud Runサービスを呼び出し
    const cloudRunUrl =
      process.env.EXAM_PROCESSOR_URL ||
      "https://exam-processor-100256293693.asia-northeast1.run.app";

    console.log(`Cloud Run呼び出し準備: url=${cloudRunUrl}`);
    console.log(
      `リクエストデータ: examResultId=${examResult.id}, repositoryUrl=${repositoryUrl}`
    );

    try {
      console.log("Cloud Runへリクエスト送信開始");
      const controller = new AbortController();
      // タイムアウト時間を300秒に延長（テスト実行に十分な時間を確保）
      const timeoutId = setTimeout(() => controller.abort(), 300000);

      const response = await fetch(`${cloudRunUrl}/process-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examResultId: examResult.id,
          repositoryUrl,
        }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));

      console.log(`Cloud Run応答: status=${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloud Run呼び出しエラー:", errorText);

        // エラー時はステータスを更新：実際に失敗の可能性があるので失敗と記録
        await prisma.examResult.update({
          where: { id: examResult.id },
          data: {
            status: "failed",
            statusMessage: `Cloud Runサービスエラー(${response.status}): テスト実行サービスとの通信に失敗しました。システム管理者に連絡してください。`,
          },
        });
      } else {
        console.log("Cloud Run呼び出し成功");
        let responseData;
        try {
          responseData = await response.json();
          console.log("Cloud Run応答データ:", responseData);
        } catch (jsonError) {
          console.error("Cloud Run応答のJSONパースエラー:", jsonError);
          const rawText = await response.text();
          console.log("応答の生テキスト:", rawText.substring(0, 200) + "...");

          // JSONパースエラー時も失敗として記録
          await prisma.examResult.update({
            where: { id: examResult.id },
            data: {
              status: "failed",
              statusMessage:
                "テスト結果の解析に失敗しました。システム管理者に連絡してください。",
              executionLog: rawText || "",
            },
          });
          throw new Error("テスト結果の解析に失敗しました");
        }

        // テスト結果をDBに保存（リダイレクト前に必ず保存する）
        if (responseData.success && responseData.testResults) {
          console.log("テスト結果をPrismaに保存開始");
          try {
            // テスト結果とステータスを更新
            await prisma.examResult.update({
              where: { id: examResult.id },
              data: {
                status: "completed",
                statusMessage: "テスト完了",
                testsPassed: responseData.testResults.passed || 0,
                testsTotal: responseData.testResults.total || 0,
                passPercentage: responseData.testResults.percentage || 0,
                executionLog: responseData.log || "",
              },
            });
            console.log(
              `テスト結果を保存完了: status=completed, passed=${responseData.testResults.passed}, total=${responseData.testResults.total}`
            );
          } catch (updateError) {
            console.error("テスト結果保存エラー:", updateError);
            // エラーを再スローして、後続の処理を実行しないようにする
            throw updateError;
          }
        } else {
          console.warn(
            "Cloud Runからの応答に必要なデータがありません:",
            responseData
          );
          // データがない場合にも適切に状態を更新
          await prisma.examResult.update({
            where: { id: examResult.id },
            data: {
              status: "failed",
              statusMessage:
                "テスト結果の形式が不正です。システム管理者に連絡してください。",
            },
          });
        }
      }
    } catch (cloudRunError) {
      console.error("Cloud Runサービス呼び出しエラー:", cloudRunError);
      const errorMessage =
        cloudRunError instanceof Error && cloudRunError.name === "AbortError"
          ? "テスト実行サービスへの接続がタイムアウトしました。システム管理者に連絡してください。"
          : "テスト実行サービスへの接続に失敗しました。システム管理者に連絡してください。";

      // Cloud Runエラーが発生したらテスト失敗として記録
      await prisma.examResult.update({
        where: { id: examResult.id },
        data: {
          status: "failed",
          statusMessage: errorMessage,
        },
      });

      // エラーを再スローして、後続の処理を実行しないようにする
      throw cloudRunError;
    }

    // データベースに最新の状態が確実に反映されるよう、明示的に待機する
    // データベース更新後に少し待機して、確実に反映されるようにする
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 確実に最新データが反映されていることを確認するために再度取得
    const updatedResult = await prisma.examResult.findUnique({
      where: { id: examResult.id },
    });

    if (!updatedResult || updatedResult.status === "pending") {
      console.warn(
        "更新後もステータスがpendingのままです。リダイレクト前に再度更新を試みます。"
      );
      // 最終的な保険として強制的に更新
      await prisma.examResult.update({
        where: { id: examResult.id },
        data: {
          status: updatedResult?.executionLog ? "completed" : "failed",
          statusMessage: updatedResult?.executionLog
            ? "テスト完了"
            : "テスト実行に失敗しました",
        },
      });
    }

    // 結果ページにリダイレクトではなく、結果を返す
    console.log(`結果準備完了: examId=${examResult.id}`);
    return {
      success: true,
      resultId: examResult.id,
      slug: slug,
    };
  } catch (error) {
    console.error("演習提出エラー:", error);
    throw error;
  }
}
