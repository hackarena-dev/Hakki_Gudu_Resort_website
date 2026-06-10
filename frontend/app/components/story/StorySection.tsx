"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="story"
      ref={ref}
      className="section-pad overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F5F1E8 0%, #FAF7F2 60%, #F0EBE0 100%)" }}
    >
      <div className="container-luxury">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-label mb-14 lg:mb-20"
        >
          Our Story
        </motion.p>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20 items-center">
          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/about.png"
                alt="The Nest resort interior — handcrafted teak wood and natural materials"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {/* Overlay tint */}
              <div className="absolute inset-0 bg-[#2F4F3E]/10" />
            </div>

            {/* Inset small image */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 30 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 -right-4 lg:-right-10 w-40 lg:w-52 aspect-square overflow-hidden border-4 border-[#FAF7F2] shadow-2xl"
            >
              <Image
                src="/stream.png"
                alt="Natural stream at The Nest"
                fill
                className="object-cover"
                sizes="200px"
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="absolute top-8 -left-4 lg:-left-8 bg-[#2F4F3E] text-white p-5 lg:p-6 shadow-2xl"
            >
              <p className="text-[0.58rem] tracking-[0.35em] uppercase text-white/55 mb-1">Est.</p>
              <p
                className="text-3xl font-bold leading-none text-[#C9A96E]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                2018
              </p>
              <p className="text-[0.58rem] tracking-[0.2em] uppercase text-white/55 mt-1">
                In the Heart of the Forest
              </p>
            </motion.div>
          </motion.div>

          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7 mt-10 lg:mt-0"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-[#2C2C2C] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Built From the Earth.{" "}
              <em className="italic text-[#2F4F3E]">Woven Into the Forest.</em>
            </h2>

            <div className="w-10 h-0.5 bg-[#C9A96E]" />

            <p className="text-sm text-[#2C2C2C]/65 leading-7">
              The Nest was born from a quiet longing — to find a place where the forest doesn&apos;t end at the door. Where every structure breathes, every corner feels handmade, and every morning begins with birdsong instead of alarms.
            </p>
            <p className="text-sm text-[#2C2C2C]/65 leading-7">
              We built this retreat using centuries-old techniques — hand-laid stone, teak joinery, bamboo lattice — so it ages gracefully and belongs to this land. Our team lives in the surrounding village. The food grows on our farm. The pace is set by nature, not a schedule.
            </p>

            {/* Pull quote */}
            <div className="border-l-2 border-[#B56A4A] pl-6 py-1">
              <p
                className="text-lg font-semibold italic text-[#2F4F3E] leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "We didn&apos;t build a resort in the forest.
                We wove a resting place within it."
              </p>
              <p className="mt-2 text-xs text-[#6B4F3A]/70 tracking-wide">
                — Founders, The Nest
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { label: "Slow Living", sub: "No rush, no schedule" },
                { label: "Privacy", sub: "Just your group" },
                { label: "Authenticity", sub: "Village culture" },
                { label: "Nature First", sub: "50+ bird species" },
              ].map((v) => (
                <div key={v.label} className="flex items-start gap-2.5">
                  <div className="w-1 h-1 bg-[#B56A4A] rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#2C2C2C] tracking-wide">{v.label}</p>
                    <p className="text-xs text-[#2C2C2C]/45">{v.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
