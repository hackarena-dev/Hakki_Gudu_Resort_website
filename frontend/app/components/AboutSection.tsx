"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C7 2 4 7 4 10c0 4 2.5 7 8 9 5.5-2 8-5 8-9 0-3-3-8-8-8z" stroke="#d4a855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6v6l3 2" stroke="#d4a855" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Pure Wilderness",
    desc: "50+ acres of untouched forest reserve surrounding your private villa.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#d4a855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="#d4a855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Artisan Crafted",
    desc: "Every villa handbuilt with locally-sourced teak, bamboo, and stone.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#d4a855" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke="#d4a855" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Timeless Serenity",
    desc: "No clocks, no rush. Only the rhythm of nature guiding your day.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f5efe6 0%, #ede0cc 50%, #f5efe6 100%)" }}
    >
      {/* Subtle wood grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(139,94,60,0.04) 2px,
            rgba(139,94,60,0.04) 4px
          )`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-[#d4a855]" />
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-[#8b5e3c] font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Our Philosophy
            </span>
            <div className="w-12 h-px bg-[#d4a855]" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2c1a0e] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A Retreat Built From{" "}
            <em className="italic text-[#8b5e3c]">The Earth</em>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32">
          {/* Image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/about.png"
                alt="Handcrafted luxury interior of The Nest resort with teak wood and natural materials"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle border frame */}
              <div className="absolute inset-0 border border-[#d4a855]/20" />
            </div>
            {/* Floating accent box */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-40 lg:w-52 bg-[#2c1a0e] p-5 lg:p-7"
            >
              <div
                className="text-4xl lg:text-5xl font-light text-[#d4a855] leading-none mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                2018
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-light">
                Est. in the Heart of the Forest
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-8"
          >
            <p
              className="text-2xl lg:text-3xl font-light text-[#2c1a0e] leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "We didn't build a resort in the forest. We wove a place to
              rest{" "}
              <em className="italic text-[#8b5e3c]">within</em> the forest."
            </p>
            <div className="w-12 h-px bg-[#d4a855]" />
            <p
              className="text-sm lg:text-base text-[#4a2c1a]/70 leading-relaxed font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              The Nest was born from a vision to create a sanctuary where
              architecture and wilderness exist in quiet conversation. Every
              structure was crafted by local artisans using centuries-old
              techniques — teak joinery, bamboo lattice, hand-laid stone — so
              the retreat breathes, ages, and belongs to this land.
            </p>
            <p
              className="text-sm lg:text-base text-[#4a2c1a]/70 leading-relaxed font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Here, your days unfold at nature&apos;s pace. Morning birdsong replaces
              alarms. Farm-fresh meals replace menus. The forest trail is your
              corridor, and the bonfire your gathering place.
            </p>
            <motion.a
              href="#experiences"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-medium text-[#8b5e3c] hover:text-[#d4a855] transition-colors duration-300 self-start group"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#experiences")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Discover Experiences
              <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-400" />
            </motion.a>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col gap-4 p-8 border border-[#c4956a]/30 hover:border-[#d4a855]/60 transition-all duration-500 hover:bg-white/50"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#d4a855]/40 group-hover:border-[#d4a855] transition-colors duration-500">
                {pillar.icon}
              </div>
              <h3
                className="text-xl font-light text-[#2c1a0e]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm text-[#4a2c1a]/60 leading-relaxed font-light"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
