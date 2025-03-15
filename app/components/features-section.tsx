import {
  BiCodeBlock,
  BiGitBranch,
  BiBookOpen,
  BiCheckShield,
} from "react-icons/bi";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium mb-4">
            主要機能
          </div>

          <h2 className="text-3xl font-bold mb-6">
            <span className="text-[#2563EB]">codefolio</span>の特徴
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            エンジニアとしての実践力を効率的に身につけるための機能
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center mb-4">
              <BiBookOpen className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              ブログ形式の基礎学習
            </h3>
            <p className="text-gray-600">
              初心者にもわかりやすい解説で、プログラミングの基礎概念から応用まで体系的に学べます。実務を想定した内容で構成されています。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center mb-4">
              <BiGitBranch className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              GitHub連携による実践課題
            </h3>
            <p className="text-gray-600">
              実務さながらのワークフローを体験。GitHubと連携した課題で、実際の開発環境に近い形で学習成果を形にできます。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center mb-4">
              <BiCheckShield className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              理解度確認テスト
            </h3>
            <p className="text-gray-600">
              各学習セクション後に理解度を確認できるテストを用意。苦手な部分を特定し、効率的に学習を進められます。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center mb-4">
              <BiCodeBlock className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              自動評価システム
            </h3>
            <p className="text-gray-600">
              提出したコードを自動評価。即時フィードバックにより、実践的なスキルを効率良く向上させることができます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
