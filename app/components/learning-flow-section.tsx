import {
  BiBookOpen,
  BiCheckCircle,
  BiCodeAlt,
  BiMessageDetail,
  BiRightArrowAlt,
} from "react-icons/bi";
import Link from "next/link";

interface FlowStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FlowStep({ number, title, description, icon }: FlowStepProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-20 flex justify-center">
        <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center">
          {number}
        </div>
      </div>

      <div className="flex-1 p-6 rounded-lg border border-gray-100 bg-white">
        <div className="flex items-start gap-5">
          <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] hidden sm:flex">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LearningFlowSection() {
  const steps = [
    {
      number: 1,
      title: "基礎学習",
      description:
        "プログラミングの基礎概念を学習ドキュメントで理解します。わかりやすい説明と実例で、初心者でも安心して学べます。各トピックは実務で使える知識を中心に構成されています。",
      icon: <BiBookOpen className="text-xl" />,
    },
    {
      number: 2,
      title: "理解度テスト",
      description:
        "学んだ内容の理解度を確認するテストに取り組みます。苦手な部分を特定し、効率的に学習を進めることができます。各テストは実践的な問題で構成され、実務に即した応用力を養います。",
      icon: <BiCheckCircle className="text-xl" />,
    },
    {
      number: 3,
      title: "実践課題",
      description:
        "実際のプロジェクトを想定した課題に取り組みます。GitHub連携により、実務の開発フローを体験できます。チーム開発に必要なコミュニケーションやコードレビューの流れも学べます。",
      icon: <BiCodeAlt className="text-xl" />,
    },
    {
      number: 4,
      title: "振り返りと評価",
      description:
        "提出した課題の評価とフィードバックを受け取ります。改善点を把握し、次の学習に活かすことができます。現役エンジニアからの具体的なアドバイスが成長を加速させます。",
      icon: <BiMessageDetail className="text-xl" />,
    },
  ];

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium mb-4">
            学習プロセス
          </div>

          <h2 className="text-3xl font-bold mb-6">
            学習の<span className="text-[#2563EB]">流れ</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            codefolioでは基礎から実践まで、段階的に学習できる仕組みを提供しています
          </p>
        </div>

        <div className="relative">
          <div className="space-y-6">
            {steps.map((step) => (
              <FlowStep key={step.number} {...step} />
            ))}
          </div>
        </div>

        {/* ボトムアクションエリア */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-lg border border-gray-100 bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              あなただけの学習体験を始めよう
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              効率的な学習プロセスであなたのエンジニアスキルを加速させませんか？
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              無料で始める
              <BiRightArrowAlt className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
