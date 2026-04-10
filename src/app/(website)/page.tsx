import Banner from "@/features/website/component/Banner";
import PricingSection from "@/features/website/component/PricingSection";
import FAQSection from "@/features/website/component/FAQSection";
import CTASection from "@/features/website/component/CTASection";
import Features from "@/features/website/component/Features";
import HowItWorksSection from "@/features/website/component/HowItWorksSection";
import Creation from "@/features/website/component/Creation";
import Design from "@/features/website/component/Design";
import Slider from "@/features/website/component/Slider";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Banner />
      <Slider />
      <Features />
      <Creation />
      <div className="space-y-10">
        {/* <FeaturesSection /> */}
        <HowItWorksSection />
        <Design />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
}
