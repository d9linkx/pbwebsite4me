"use client";

import AnimatedHeading from "../shared/animated-heading";
import Image from "next/image";
import { Linkedin } from "lucide-react";

const TEAM = [
  {
    name: "Uchechukwu FRIDAY",
    role: "Co-founder/Executive Director, Business & Partnership",
    company: "Prawnbox",
    linkedin: "https://www.linkedin.com/in/uchechukwu-friday/",
    initials: "UF",
    photo: "/2.png",
  },
  {
    name: "Prince DIKE",
    role: "Co-founder/Executive Director, Product & Marketing",
    company: "Prawnbox",
    linkedin: "https://www.linkedin.com/in/prince-dike/",
    initials: "PD",
    photo: "/1.png",
  },
  {
    name: "Victor ADERIBIGBE",
    role: "Co-founder/Executive Director, Technology",
    company: "Prawnbox",
    linkedin: "https://www.linkedin.com/in/vee-jay/",
    initials: "VA",
    photo: "/3.webp",
  },
] as const;

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
            Built from experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            <AnimatedHeading>Meet the Team</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experienced leaders driving innovation in Nigerian logistics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, index) => (
            <div
              key={index}
              className="text-center bg-gray-50 rounded-none hover:shadow-xl transition-all duration-300 group relative pt-1.75 pr-1.75 pb-5 pl-1.75"
            >
              {/* Square Image with slight rounding - positioned at top with 99% width */}
              <div className="w-[99%] aspect-square rounded-lg mx-auto mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-dark to-darker flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {/* {member.initials} */}
                    </span>
                  </div>
                )}
              </div>

              {/* Name with LinkedIn icon beside it */}
              <div className="flex items-center justify-center gap-2 mb-2 px-2">
                <h3 className="text-xl font-bold text-dark">{member.name}</h3>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#0077b5] hover:text-[#005582] transition-colors duration-200 hover:scale-110"
                  aria-label={`View ${member.name}&apos;s LinkedIn profile`}
                >
                  <Linkedin size={20} />
                </a>
              </div>

              {/* Role */}
              <p className="text-gray-600 font-medium text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
