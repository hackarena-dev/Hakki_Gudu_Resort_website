"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Home, Users, Droplets, Flame, Sprout } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "2 Acres of Nature",
    desc: "Surrounded by pristine forest, meadows, and natural trails — a world apart from the city.",
  },
  {
    icon: Home,
    title: "Private Villa",
    desc: "Exclusively yours. A beautifully crafted villa with no shared spaces, no strangers.",
  },
  {
    icon: Users,
    title: "Max 20 Guests",
    desc: "We host only a small group at a time, ensuring absolute privacy and personal attention.",
  },
  {
    icon: Droplets,
    title: "Natural Stream",
    desc: "A fresh mountain stream flows through the property — your private piece of paradise.",
  },
  {
    icon: Flame,
    title: "Bonfire Area",
    desc: "Every evening, the bonfire becomes the heartbeat of Hakki Goodu — stories, warmth, and stars.",
  },
  {
    icon: Sprout,
    title: "Farm Walk Experience",
    desc: "Walk our organic farm, pick fresh produce, and experience where your meal truly begins.",
  },
];

const SANCTUARY_FEATURES = [FEATURES[0], FEATURES[1], FEATURES[3]];
const EXPERIENCE_FEATURES = [FEATURES[2], FEATURES[4], FEATURES[5]];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="section-pad bg-[#FAF7F2]">
      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="section-label mb-4">Why Hakki Goodu</p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#2C2C2C] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything You Need.{" "}
            <em className="italic text-[#2F4F3E] font-semibold">Nothing You Don&apos;t.</em>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-sm text-[#6B4F3A]/70 leading-relaxed">
            Hakki Goodu is designed for those who crave genuine connection — with nature, with loved ones, and with themselves.
          </p>
        </motion.div>

        {/* Desktop Cards Grid (Visible on desktop only) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="hidden lg:grid grid-cols-3 gap-6"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={cardAnim}
                className="group relative p-7 lg:p-9 border border-[#6B4F3A]/10 bg-white hover:border-[#2F4F3E]/30 hover:shadow-xl transition-all duration-500 overflow-hidden cursor-default"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-14 h-14 bg-[#F5F1E8] clip-corner group-hover:bg-[#2F4F3E]/5 transition-colors duration-500" />

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center border border-[#6B4F3A]/20 group-hover:border-[#2F4F3E] group-hover:bg-[#2F4F3E] transition-all duration-500 mb-6">
                  <Icon size={20} className="text-[#6B4F3A] group-hover:text-white transition-colors duration-500" />
                </div>

                <h3
                  className="text-lg font-bold text-[#2C2C2C] mb-3 group-hover:text-[#2F4F3E] transition-colors duration-400"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#2C2C2C]/55 leading-relaxed">
                  {f.desc}
                </p>

                {/* Bottom line accent */}
                <div className="mt-7 w-0 h-px bg-[#2F4F3E] group-hover:w-10 transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile/Tablet Layout (Grouped into 2 cards, visible on smaller screens only) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Card 1: The Sanctuary */}
          <motion.div
            variants={cardAnim}
            className="relative p-6 sm:p-8 border border-[#6B4F3A]/10 bg-white hover:border-[#2F4F3E]/20 hover:shadow-lg transition-all duration-400 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#F5F1E8] clip-corner" />
            <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B56A4A] font-bold mb-1">Stay & Privacy</p>
            <h3
              className="text-xl sm:text-2xl font-bold text-[#2C2C2C] mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Sanctuary
            </h3>
            <p className="text-xs text-[#6B4F3A]/60 tracking-wide mb-6 uppercase font-medium">Earthy luxury and absolute privacy</p>

            <div className="flex flex-col gap-5">
              {SANCTUARY_FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-[#6B4F3A]/20 flex items-center justify-center flex-shrink-0 text-[#6B4F3A] bg-[#FAF7F2]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2C2C2C] mb-0.5">{f.title}</h4>
                      <p className="text-xs text-[#2C2C2C]/60 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Card 2: The Experience */}
          <motion.div
            variants={cardAnim}
            className="relative p-6 sm:p-8 border border-[#6B4F3A]/10 bg-white hover:border-[#2F4F3E]/20 hover:shadow-lg transition-all duration-400 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#F5F1E8] clip-corner" />
            <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B56A4A] font-bold mb-1">Connection & Nature</p>
            <h3
              className="text-xl sm:text-2xl font-bold text-[#2C2C2C] mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Experience
            </h3>
            <p className="text-xs text-[#6B4F3A]/60 tracking-wide mb-6 uppercase font-medium">Moments crafted for connection</p>

            <div className="flex flex-col gap-5">
              {EXPERIENCE_FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-[#6B4F3A]/20 flex items-center justify-center flex-shrink-0 text-[#6B4F3A] bg-[#FAF7F2]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2C2C2C] mb-0.5">{f.title}</h4>
                      <p className="text-xs text-[#2C2C2C]/60 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

