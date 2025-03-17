import { PrismaClient, Test } from "@prisma/client";
import fs from "fs";
import path from "path";

// Prismaクライアントの初期化
const prisma = new PrismaClient();

// インターネット基礎問題をインポートする関数
async function importInternetBasicsTests() {
  try {
    console.log("インターネット基礎問題のインポートを開始します...");

    // ファイルパスの設定
    const filePath = path.join(process.cwd(), "data/test/internet-basics.json");

    // JSONファイルの存在確認
    if (!fs.existsSync(filePath)) {
      console.error(`ファイルが見つかりません: ${filePath}`);
      return;
    }

    // JSONデータの読み込み
    const quizData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (quizData.length === 0) {
      console.log("クイズデータが空です");
      return;
    }

    // 既存のデータを確認（重複インポート防止）
    const existingCount = await prisma.test.count({
      where: {
        category: quizData[0].category,
      },
    });

    if (existingCount > 0) {
      console.log(
        `すでに ${existingCount} 件のデータが存在します。上書きしますか？ (y/n)`
      );

      // ここでユーザー入力を受け取る場合は下記のようなコードを使用
      // 簡易化のため、ここでは常に上書きする前提で進める

      // 既存データの削除
      await prisma.test.deleteMany({
        where: {
          category: quizData[0].category,
        },
      });
      console.log("既存データを削除しました");
    }

    // 各問題をTestテーブルに追加
    const testData = quizData.map((item: Test) => ({
      question: item.question,
      answerOptions: item.answerOptions,
      category: item.category,
      correctAnswer: item.correctAnswer,
    }));

    await prisma.test.createMany({
      data: testData,
    });

    console.log(`${testData.length}問のテスト問題をTestテーブルに追加しました`);
  } catch (error) {
    console.error("インポート処理中にエラーが発生しました:", error);
  } finally {
    // Prismaクライアントを切断
    await prisma.$disconnect();
  }
}

// スクリプトを実行
importInternetBasicsTests();
