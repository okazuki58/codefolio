import { auth } from "@/lib/auth";
import { HeroSection } from "@/app/components/hero-section";
import { FeaturesSection } from "@/app/components/features-section";
import { LearningFlowSection } from "@/app/components/learning-flow-section";
import { PricingSection } from "@/app/components/pricing-section";
import { CTASection } from "@/app/components/cta-section";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <HeroSection session={session} />

      {/* 特徴セクション */}
      <FeaturesSection />

      {/* 学習フローセクション */}
      <LearningFlowSection />

      {/* 料金プランセクション */}
      <PricingSection />

      {/* CTAセクション */}
      <CTASection session={session} />
    </div>
  );
}
