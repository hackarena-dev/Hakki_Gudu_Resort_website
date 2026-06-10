"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background Image with parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: imageScale, y: imageY }}
      >
        <Image
          src="/hero.png"
          alt="The Nest — Luxury Nature Retreat surrounded by lush tropical forest"
          fill
          className="object-cover object-center"
          priority
          quality={95}
          sizes="100vw"
        />
      </motion.div>

      {/* Multi-layer gradient overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f08]/70 via-[#1a0f08]/20 to-[#1a0f08]/85 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f08]/50 via-transparent to-[#1a0f08]/30 z-10" />

      {/* Warm amber vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,15,8,0.6) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative top line */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#d4a855]" />
          <span
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#d4a855] font-light"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Private Nature Retreat
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#d4a855]" />
        </motion.div>

        {/* Main Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            variants={lineReveal}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white leading-[1.0] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Where Nature
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            variants={lineReveal}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.05] tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              background: "linear-gradient(135deg, #e8c97a, #d4a855, #c8952a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcomes You Home
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="max-w-xl md:max-w-2xl text-sm md:text-base lg:text-lg font-light leading-relaxed text-white/75 mb-12 tracking-wide"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Escape into a private villa surrounded by forests, farm trails,
          bonfire nights, and unforgettable starlit experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          {/* Primary CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-10 py-4 overflow-hidden text-xs tracking-[0.3em] uppercase font-medium text-[#1a0f08] bg-[#d4a855] hover:bg-[#e8c97a] transition-colors duration-500"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10">Reserve Your Stay</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#about"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium text-white border border-white/40 hover:border-[#d4a855] hover:text-[#d4a855] transition-all duration-500"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore The Nest
            <svg
              className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-14"
        >
          {[
            { num: "12", label: "Private Villas" },
            { num: "50+", label: "Acres of Forest" },
            { num: "4.9★", label: "Guest Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-xl md:text-2xl font-light text-[#d4a855] leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {stat.num}
              </div>
              <div className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/50 mt-1 font-light">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer animate-float"
        onClick={() =>
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-white/40 font-light">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#d4a855] to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "30%" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
