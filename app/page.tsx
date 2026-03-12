import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/how-it-works";
import Empowerment from "@/components/home/empowerment";
import Trust from "@/components/home/trust";
import CommunityImpact from "@/components/home/commnunity-impact";
import FlexibleEarning from "@/components/home/flexible-earning";
import SupportingSMEs from "@/components/home/supporting-smes";
import CTAs from "@/components/home/cta";

export default function HomePage() {
  return (
    <div className="pt-20 min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Empowerment />
      <Trust />
      <CommunityImpact />
      <FlexibleEarning />
      <SupportingSMEs />
      <CTAs />
    </div>
  );
}
