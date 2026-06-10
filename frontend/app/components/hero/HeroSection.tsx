"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.7 } },
};
const item = {
  hidden: { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
  show: {
    opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.1, ease: "easeOut" as const },
  },
};
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgScale   = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const bgY       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY     = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[680px] overflow-hidden"
    >
      {/* ── Background Image ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: bgScale, y: bgY }}
      >
        <Image
          src="/hero.png"
          alt="The Nest — Private luxury forest villa surrounded by tropical jungle"
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Layered Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3329]/75 via-[#1e3329]/25 to-[#1e3329]/85 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3329]/55 via-transparent to-transparent z-10" />
      {/* Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(30,51,41,0.65) 100%)" }}
      />

      {/* ── Hero Content ── */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-5 text-center"
        style={{ y: textY, opacity }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-7">
          <span className="w-10 h-px bg-[#C9A96E]" />
          <p className="section-label text-[#C9A96E]">Private Nature Retreat</p>
          <span className="w-10 h-px bg-[#C9A96E]" />
        </motion.div>

        {/* Headline Line 1 */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            variants={item}
            className="text-[clamp(2.8rem,7.5vw,7rem)] font-bold text-white leading-[1.02] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where Nature
          </motion.h1>
        </div>

        {/* Headline Line 2 */}
        <div className="overflow-hidden mb-7">
          <motion.h1
            variants={item}
            className="text-[clamp(2.8rem,7.5vw,7rem)] font-bold leading-[1.02] tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(120deg, #e8cc98 0%, #C9A96E 50%, #b8884a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcomes You Home
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          variants={fadeIn}
          className="max-w-lg md:max-w-2xl text-sm md:text-base font-light leading-7 text-white/72 mb-11 tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Escape into a private villa surrounded by forests, farm trails, bonfire nights,
          natural streams, and unforgettable starlit experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/booking" className="btn-primary">
            <span>Reserve Your Stay</span>
          </Link>
          <button
            className="btn-outline"
            onClick={() => document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore The Nest
          </button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={fadeIn}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-10 lg:gap-16"
        >
          {[
            { value: "2 Acres", label: "Pristine Nature" },
            { value: "12", label: "Private Villas" },
            { value: "4.9 ★", label: "Guest Rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-2xl font-semibold text-[#C9A96E] leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.value}
              </p>
              <p className="text-[0.6rem] tracking-[0.25em] uppercase text-white/45 mt-1.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer animate-float"
        onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
      >
        <p className="text-[0.58rem] tracking-[0.4em] uppercase text-white/40">Scroll</p>
        <div className="relative w-px h-12 bg-white/15 overflow-hidden">
          <motion.div
            className="absolute left-0 w-full bg-[#C9A96E]"
            animate={{ top: ["-30%", "130%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "30%" }}
          />
        </div>
        <ArrowDown size={12} className="text-white/30" />
      </motion.div>
    </section>
  );
}

