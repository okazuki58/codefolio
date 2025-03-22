import { HeroSection } from "@/app/components/hero-section";
import { FeaturesSection } from "@/app/components/features-section";
import { LearningFlowSection } from "@/app/components/learning-flow-section";
import { HomePricingSection } from "@/app/components/home-pricing-section";
import { CTASection } from "@/app/components/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <HeroSection />

      {/* 特徴セクション */}
      <FeaturesSection />

      {/* 学習フローセクション */}
      <LearningFlowSection />

      {/* 料金プランセクション */}
      <HomePricingSection />

      {/* CTAセクション */}
      <CTASection />
    </div>
  );
}
