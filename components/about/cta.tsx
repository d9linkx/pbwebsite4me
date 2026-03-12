"use client";

import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-linear-to-br from-primary to-primary-hover text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Join the Prawnbox Community
        </h2>
        <p className="text-xl mb-8">
          Whether you want to send packages or earn money as a Pal, we are here
          for you.
        </p>
        <button
          onClick={() => {
            window.location.href = "https://app.prawnbox.com/register";
          }}
          className="px-8 py-4 bg-white text-primary text-lg font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
        >
          Get Started Today
          <ArrowRight className="inline ml-2" size={20} />
        </button>
      </div>
    </section>
  );
}
