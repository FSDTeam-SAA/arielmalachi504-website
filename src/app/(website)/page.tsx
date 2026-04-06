import Banner from "@/features/website/component/Banner";
import PricingSection from "@/features/website/component/PricingSection";
import FAQSection from "@/features/website/component/FAQSection";
import CTASection from "@/features/website/component/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Banner />
      {/* <Slider /> */}
      <div className="space-y-10">
        {/* <FeaturesSection />
        <HowItWorksSection /> */}
        <PricingSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
}
