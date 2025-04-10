"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Instructor {
  name: string;
  title: string;
  image: string;
  quote: string;
  tagline?: string;
}

const instructors: Instructor[] = [
  {
    name: "Dipto Karmakar",
    title: "Hr @ DataPollex",
    image: "/instructors/emily.jpg",
    quote:
      "“True intelligence isn't in knowing everything — it's in the curiosity to learn.”",
    tagline: "Machine Learning | AI | DeepTech"
  },
  {
    name: "Rakib Rezwan",
    title: "Senior Engineer @ DataPollex",
    image: "/instructors/james.jpg",
    quote: "“Code should not just work — it should inspire.”",
    tagline: "Full Stack | Systems | JS/TS"
  },
  {
    name: "Rakib Ul Hasna",
    title: "Lead UX @ DataPollex",
    image: "/instructors/sophia.jpg",
    quote: "“Design is the silent ambassador of your product.”",
    tagline: "UX | UI | Product Design"
  },
  {
    name: "Rezwan Ahmed",
    title: "Cloud Architect @ DataPollex",
    image: "/instructors/carlos.jpg",
    quote: "“Build for scale, think for impact.”",
    tagline: "DevOps | Cloud | Infrastructure"
  },
  {
    name: "Rezwan Ahmed",
    title: "Creative Director @ DataPollex",
    image: "/instructors/amara.jpg",
    quote: "“Stories shape the future — tell them well.”",
    tagline: "Branding | Visual Storytelling | Creative"
  },
  {
    name: "Rakib Ul Hasna",
    title: "Cybersecurity Analyst @ DataPollex",
    image: "/instructors/liam.jpg",
    quote: "“Security is a mindset, not a feature.”",
    tagline: "Cybersecurity | Privacy | Threat Analysis"
  }
];

const InstructorSection = () => {
  return (
    <section className="relative z-10 bg-[#0e0f1a] text-white py-24 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full blur-2xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Masters Behind the Mission
        </h2>
        <p className="text-muted mb-16 max-w-xl mx-auto text-gray-400">
          Our instructors are more than educators — they’re visionaries,
          builders, and leaders shaping tomorrow.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
          {instructors.map((instructor, idx) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "relative group overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md p-6 pt-24",
                idx % 2 === 0 ? "md:-mt-12" : "md:mt-12"
              )}
            >
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-500">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {instructor.name}
              </h3>
              <p className="text-sm text-indigo-400 mb-4">{instructor.title}</p>

              <p className="italic text-gray-300 text-sm mb-4">
                “{instructor.quote}”
              </p>
              {instructor.tagline && (
                <p className="text-xs uppercase tracking-wide text-indigo-300">
                  {instructor.tagline}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative floating icons or sparkles */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping" />
    </section>
  );
};

export default InstructorSection;
