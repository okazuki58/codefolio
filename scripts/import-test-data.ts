import { PrismaClient, Test } from "@prisma/client";
import fs from "fs";
import path from "path";

// Prismaクライアントの初期化
const prisma = new PrismaClient();

// テストデータをインポートする関数
async function importTestData() {
  try {
    console.log("テストデータのインポートを開始します...");

    // データディレクトリのパス
    const dataDir = path.join(process.cwd(), "data/test");

    // ディレクトリが存在するか確認
    if (!fs.existsSync(dataDir)) {
      console.error(`ディレクトリが見つかりません: ${dataDir}`);
      return;
    }

    // ディレクトリ内のJSONファイルを取得
    const files = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith(".json"));

    if (files.length === 0) {
      console.log("インポート可能なJSONファイルが見つかりません");
      return;
    }

    console.log(`${files.length}個のJSONファイルを処理します...`);

    // 各JSONファイルを処理
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const categoryName = file.replace(".json", "");

      console.log(`処理中: ${file} (カテゴリ: ${categoryName})`);

      // JSONデータの読み込み
      const quizData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (quizData.length === 0) {
        console.log(`${file}: クイズデータが空です`);
        continue;
      }

      // カテゴリ名をデータから取得（ない場合はファイル名を使用）
      const category = quizData[0].category || categoryName;

      // 既存のデータを確認（重複インポート防止）
      const existingCount = await prisma.test.count({
        where: {
          category,
        },
      });

      if (existingCount > 0) {
        console.log(
          `${category}: すでに ${existingCount} 件のデータが存在します。削除します...`
        );

        // 既存データの削除
        await prisma.test.deleteMany({
          where: {
            category,
          },
        });
        console.log(`${category}: 既存データを削除しました`);
      }

      // 各問題をTestテーブルに追加
      const testData = quizData.map((item: Test) => ({
        question: item.question,
        answerOptions: item.answerOptions,
        category: category,
        correctAnswer: item.correctAnswer,
      }));

      await prisma.test.createMany({
        data: testData,
      });

      console.log(
        `${category}: ${testData.length}問のテスト問題をTestテーブルに追加しました`
      );
    }

    console.log("全てのテストデータのインポートが完了しました");
  } catch (error) {
    console.error("インポート処理中にエラーが発生しました:", error);
  } finally {
    // Prismaクライアントを切断
    await prisma.$disconnect();
  }
}

// スクリプトを実行
importTestData();
