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
    desc: "Every evening, the bonfire becomes the heartbeat of The Nest — stories, warmth, and stars.",
  },
  {
    icon: Sprout,
    title: "Farm Walk Experience",
    desc: "Walk our organic farm, pick fresh produce, and experience where your meal truly begins.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="section-label mb-4">Why The Nest</p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#2C2C2C] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything You Need.{" "}
            <em className="italic text-[#2F4F3E] font-semibold">Nothing You Don&apos;t.</em>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-sm text-[#6B4F3A]/70 leading-relaxed">
            The Nest is designed for those who crave genuine connection — with nature, with loved ones, and with themselves.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
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
      </div>
    </section>
  );
}
