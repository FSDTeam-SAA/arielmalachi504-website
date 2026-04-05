import Banner from "@/features/website/component/Banner";
import Slider from "@/features/website/component/Slider";
import FeaturesSection from "@/features/website/component/FeaturesSection";
import HowItWorksSection from "@/features/website/component/HowItWorksSection";
import PricingSection from "@/features/website/component/PricingSection";

export default function Home() {
  return (
    <div className="bg-white">
      <Banner />
      <Slider />
      <div className="space-y-20">
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
      </div>
    </div>
  );
}
