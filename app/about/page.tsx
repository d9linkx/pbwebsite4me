import { Shield } from "lucide-react";
import ImageStory from "@/components/about/image-story";
import MissionAndValues from "@/components/about/mission-and-values";
import Stats from "@/components/about/stats";
import OurReach from "@/components/about/our-reach";
import RoadMap from "@/components/about/roadmap";
import Team from "@/components/about/team";
import CTAs from "@/components/shared/cta";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-dark to-darker text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Delivery in Nigeria
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We are building Africa&apos;s most trusted peer-to-peer delivery
              platform, connecting Nigerians who need to send packages with
              verified Pals who can deliver them safely and efficiently.
            </p>

            {/* CAC Registration Badge */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Shield className="text-primary mr-3" size={20} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    Prawnbox Technology Ltd. (the company behind the Prawnbox
                    delivery app)
                  </p>
                  <p className="text-sm text-gray-300">
                    is registered with the Corporate Affairs Commission (CAC) RC
                    8179339
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Image */}
      <ImageStory />

      {/* Mission & Values */}
      <MissionAndValues />

      {/* Stats Section */}
      <Stats />

      {/* Our Reach - City Expansion */}
      <OurReach />

      {/* Roadmap Section - Next Generation Design */}
      <RoadMap />

      {/* Team Section */}
      <Team />

      {/* CTA Section */}
      <CTAs
        title="Join the Prawnbox Community"
        description="Whether you want to send packages or earn money as a Pal, we are here
          for you."
        accent="primary"
      />
    </div>
  );
}
