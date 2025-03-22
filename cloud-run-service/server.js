const express = require("express");
const { exec } = require("child_process");
const { promisify } = require("util");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");

const execAsync = promisify(exec);
const app = express();

console.log("サーバー初期化を開始します");

app.use(bodyParser.json());

// メイン処理エンドポイント
app.post("/process-exam", async (req, res) => {
  const { examResultId, repositoryUrl } = req.body;

  if (!examResultId || !repositoryUrl) {
    return res.status(400).json({
      success: false,
      error: "examResultId と repositoryUrl は必須です",
    });
  }

  console.log(`処理開始: examResultId=${examResultId}, repo=${repositoryUrl}`);

  try {
    // 一時ディレクトリを作成
    const repoDir = `/tmp/repo-${examResultId}`;
    await execAsync(`mkdir -p ${repoDir}`);
    console.log(`一時ディレクトリを作成: ${repoDir}`);

    // リポジトリをクローン
    console.log(`リポジトリのクローン開始: ${repositoryUrl}`);

    try {
      await execAsync(`git clone ${repositoryUrl} ${repoDir}`);
      console.log("リポジトリのクローン成功");
    } catch (cloneError) {
      console.error("クローンエラー:", cloneError);
      return res.status(500).json({
        success: false,
        error: `リポジトリのクローンに失敗しました: ${cloneError.message}`,
      });
    }

    // package.jsonの存在確認
    const packageJsonPath = path.join(repoDir, "package.json");
    try {
      await fs.access(packageJsonPath);
      console.log("package.jsonの存在を確認");
    } catch (err) {
      console.error("package.jsonが見つかりません:", err);
      return res.status(500).json({
        success: false,
        error:
          "package.jsonが見つかりません。リポジトリにNode.jsプロジェクトが含まれていることを確認してください。",
      });
    }

    // package.jsonの内容を確認
    let packageJsonContent;
    try {
      const packageJson = await fs.readFile(packageJsonPath, "utf8");
      packageJsonContent = JSON.parse(packageJson);
      console.log("package.jsonを解析しました");
    } catch (parseError) {
      console.error("package.jsonの解析エラー:", parseError);
      return res.status(500).json({
        success: false,
        error: `package.jsonの解析に失敗しました: ${parseError.message}`,
      });
    }

    if (!packageJsonContent.scripts || !packageJsonContent.scripts.test) {
      console.error("testスクリプトが定義されていません");
      return res.status(500).json({
        success: false,
        error: "package.jsonにtestスクリプトが定義されていません。",
      });
    }

    // 依存関係のインストール
    console.log("依存関係のインストール開始");
    try {
      await execAsync(`cd ${repoDir} && npm install`);
      console.log("依存関係のインストール完了");
    } catch (installError) {
      console.error("依存関係のインストールエラー:", installError);
      return res.status(500).json({
        success: false,
        error: `依存関係のインストールに失敗しました: ${installError.message}`,
      });
    }

    // テスト実行
    console.log("テスト実行開始");
    let testOutput;
    try {
      // タイムアウトを延長（4分）
      testOutput = await execAsync(`cd ${repoDir} && npm test`, {
        timeout: 240000, // 4分
        maxBuffer: 5 * 1024 * 1024, // 5MB（大きなログ対応）
      });
      console.log("テスト実行完了");
    } catch (testError) {
      // テスト失敗もキャプチャする（失敗してもテスト結果は取得する）
      console.log("テスト実行エラー（結果をキャプチャ）");

      // エラー情報をログ出力
      if (testError.code) {
        console.log(`テストエラーコード: ${testError.code}`);
      }

      // stdoutとstderrをキャプチャ
      testOutput = {
        stdout: testError.stdout || "",
        stderr: testError.stderr || "",
      };

      // エラーログの先頭部分を出力
      if (testError.stderr) {
        console.log(
          "エラー出力 (最初の200文字):",
          testError.stderr.substring(0, 200) + "..."
        );
      }
    }

    // テスト出力
    const { stdout, stderr } = testOutput;
    console.log("テスト出力をキャプチャしました");
    console.log(
      "標準出力長:",
      stdout.length,
      "標準エラー出力長:",
      stderr.length
    );

    // テスト結果の解析 - 標準エラー出力も含めて解析
    const combinedOutput = stdout + "\n" + stderr;
    const testResults = parseJestOutput(combinedOutput);
    console.log("解析されたテスト結果:", testResults);

    // クリーンアップ
    try {
      await execAsync(`rm -rf ${repoDir}`);
      console.log("一時ディレクトリを削除しました");
    } catch (cleanupError) {
      console.error("クリーンアップエラー（無視）:", cleanupError);
    }

    // 正常終了
    console.log("処理完了。結果を返します");
    return res.status(200).json({
      success: true,
      examResultId,
      repositoryUrl,
      testResults,
      log: stdout + "\n" + stderr,
    });
  } catch (error) {
    console.error("演習処理中にエラーが発生しました:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "不明なエラーが発生しました",
    });
  }
});

// Jestの出力を解析する関数
function parseJestOutput(output) {
  let passed = 0;
  let failed = 0;
  let total = 0;
  let percentage = 0;

  console.log("テスト出力解析開始...");
  console.log("出力の一部:", output.substring(0, 200) + "...");

  // よりダイレクトな方法でパス/フェイルのマーカーを検索
  const successMarkers = [
    /PASS/g,
    /✓/g,
    /OK/g,
    /SUCCESS/g,
    /DONE/g,
    /ALL[\s\d]+TESTS PASSED/gi,
  ];

  const failMarkers = [/FAIL/g, /✕/g, /ERROR/g, /FAILURE/gi];

  // パターン1: "Tests: 10 passed, 2 failed, 12 total"
  const pattern1 = /Tests:\s+(\d+)\s+passed,\s+(\d+)\s+failed,\s+(\d+)\s+total/;
  const match1 = output.match(pattern1);

  // パターン2: "Test Suites: 1 passed, 0 failed, 1 total"
  const pattern2 =
    /Test Suites:\s+(\d+)\s+passed,\s+(\d+)\s+failed,\s+(\d+)\s+total/;
  const match2 = output.match(pattern2);

  // パターン3: "X passing" and/or "Y failing"
  const passingMatch = output.match(/(\d+)\s+passing/i);
  const failingMatch = output.match(/(\d+)\s+failing/i);

  if (match1) {
    // Jestの標準出力形式
    passed = parseInt(match1[1], 10);
    failed = parseInt(match1[2], 10);
    total = parseInt(match1[3], 10);
    console.log(
      `解析: Jest形式 (Tests) - 成功: ${passed}, 失敗: ${failed}, 合計: ${total}`
    );
  } else if (match2) {
    // テストスイート情報
    passed = parseInt(match2[1], 10);
    failed = parseInt(match2[2], 10);
    total = parseInt(match2[3], 10);
    console.log(
      `解析: Jest形式 (Test Suites) - 成功: ${passed}, 失敗: ${failed}, 合計: ${total}`
    );
  } else if (passingMatch || failingMatch) {
    // Mochaスタイルの出力
    passed = passingMatch ? parseInt(passingMatch[1], 10) : 0;
    failed = failingMatch ? parseInt(failingMatch[1], 10) : 0;
    total = passed + failed;
    console.log(
      `解析: Mocha形式 - 成功: ${passed}, 失敗: ${failed}, 合計: ${total}`
    );
  } else {
    // マーカーベースの簡易カウント
    let passCount = 0;
    let failCount = 0;

    // 各マーカーをチェック
    for (const marker of successMarkers) {
      const matches = output.match(marker);
      if (matches) {
        passCount += matches.length;
      }
    }

    for (const marker of failMarkers) {
      const matches = output.match(marker);
      if (matches) {
        failCount += matches.length;
      }
    }

    if (passCount > 0 || failCount > 0) {
      passed = passCount;
      failed = failCount;
      total = passCount + failCount;
      console.log(
        `解析: マーカーベース - 成功: ${passed}, 失敗: ${failed}, 合計: ${total}`
      );
    } else {
      // 出力に基づいて成功/失敗を推測
      if (
        output.toLowerCase().includes("pass") ||
        output.toLowerCase().includes("success") ||
        output.toLowerCase().includes("ok")
      ) {
        passed = 1;
        total = 1;
        console.log("解析: キーワードベース - テスト成功と推測");
      } else if (
        output.toLowerCase().includes("fail") ||
        output.toLowerCase().includes("error")
      ) {
        failed = 1;
        total = 1;
        console.log("解析: キーワードベース - テスト失敗と推測");
      } else {
        console.log("解析: 結果を判定できません");
      }
    }
  }

  // 割合を計算
  percentage = total > 0 ? (passed / total) * 100 : 0;

  console.log(
    `最終結果: 成功: ${passed}, 失敗: ${failed}, 合計: ${total}, 成功率: ${percentage}%`
  );

  return {
    passed,
    failed,
    total,
    percentage: Math.round(percentage * 100) / 100, // 小数点2桁まで
  };
}

// ヘルスチェックエンドポイント
app.get("/", (req, res) => {
  res.status(200).send("Exam Processor Service is running");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`サーバーが ${port} ポートで起動しました`);
});
