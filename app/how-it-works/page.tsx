import Hero from "@/components/shared/hero";
import CTAs from "@/components/shared/cta";
import HowItWorksScreen from "@/components/how-it-works-screen";

export default function HowItWorksPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero
        title="How Prawnbox Works"
        description="Simple, transparent, and secure. Choose your role to see how easy
              it is to get started."
      />

      <HowItWorksScreen />

      {/* CTA Section */}
      <CTAs
        title="Ready to Get Started?"
        description="Join thousands of Nigerians using Prawnbox every day"
      />
    </div>
  );
}
