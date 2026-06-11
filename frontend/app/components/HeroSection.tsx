"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.25, 1, 0.5, 1] as const },
  },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Trigger animations on client-side mount to avoid hydration mismatch/frozen animation states
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax translation effect on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[720px] overflow-hidden bg-[#1e3329] flex flex-col justify-center"
    >
      {/* Background Image Container with Zoom-on-Load & Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full will-change-transform"
          style={{ y: bgY }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/hero.png"
            alt="Hakki Goodu Private Luxury Nature Retreat"
            fill
            priority
            quality={95}
            className="object-cover object-right"
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Luxury Asymmetrical Overlays */}
      {/* Desktop Left-aligned shadow for high readability while keeping the right side bright and vibrant */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3329]/75 via-[#1e3329]/30 to-transparent z-10 hidden lg:block" />
      {/* Mobile/Tablet General Semi-transparent Shade */}
      <div className="absolute inset-0 bg-[#1e3329]/40 z-10 lg:hidden" />
      {/* Vignette Overlay for cinematic top/bottom shadows */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3329]/85 via-[#1e3329]/5 to-[#1e3329]/30 z-10 pointer-events-none" />

      {/* Main Editorial Content */}
      <div className="relative z-20 container-luxury w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl md:max-w-2xl lg:max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUpVariants} className="flex items-center gap-3.5 mb-6">
            <span className="w-8 h-px bg-[#8B5A3C]" />
            <p className="text-[0.62rem] md:text-[0.68rem] tracking-[0.35em] uppercase font-bold text-[#8B5A3C]">
              Private Nature Retreat
            </p>
            <span className="w-8 h-px bg-[#8B5A3C] lg:hidden" />
          </motion.div>

          {/* Headline with Staggered Text Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={textRevealVariants}
              className="text-3xl md:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-light leading-[1.12] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'white' }}
            >
              Escape Into <br className="hidden md:inline" />
              <span className="italic font-normal text-[#FAF7F2]">Nature&apos;s Quiet Luxury</span>
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            variants={fadeUpVariants}
            className="max-w-lg lg:max-w-xl text-sm md:text-base font-light leading-relaxed text-[#FAF7F2]/80 mb-11 tracking-wide"
          >
            A private villa retreat surrounded by forests, bonfire evenings, farm trails, natural streams, and unforgettable starlit experiences.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
            <Link
              href="/booking"
              className="w-fit sm:w-auto px-6 py-3.5 sm:px-9 sm:py-4 bg-[#8B5A3C] text-white text-[0.68rem] sm:text-[0.7rem] tracking-[0.25em] uppercase font-bold hover:text-white transition-colors duration-500 shadow-lg relative overflow-hidden group text-center"
            >
              <span className="relative z-10">Reserve Your Stay</span>
              <span className="absolute inset-0 w-full h-full bg-[#A9724F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
            </Link>
            <button
              className="w-fit sm:w-auto px-6 py-3.5 sm:px-9 sm:py-4 border border-white text-white hover:border-[#8B5A3C] hover:text-[#8B5A3C] text-[0.68rem] sm:text-[0.7rem] tracking-[0.25em] uppercase font-bold transition-all duration-400 group text-center bg-transparent"
              onClick={() => {
                const storySec = document.querySelector("#story");
                if (storySec) {
                  storySec.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="group-hover:text-[#8B5A3C] transition-colors duration-400">Explore The Retreat</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Statistics Bar - Luxury Responsive Layout */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={isMounted ? "show" : "hidden"}
        transition={{ delay: 1.2 }}
        className="absolute bottom-28 md:bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-16 md:translate-x-0 z-20 flex items-center gap-6 md:gap-10 lg:gap-14 bg-[#1e3329]/40 backdrop-blur-md border border-white/5 py-3.5 px-6 md:py-4 md:px-8 shadow-2xl rounded-sm"
      >
        {[
          { value: "2 Acres", label: "Pristine Nature" },
          { value: "12", label: "Private Villas" },
          { value: "4.9 ★", label: "Guest Rating" },
        ].map((s, index) => (
          <div key={s.label} className="flex items-center gap-6 md:gap-10">
            {index > 0 && <div className="w-[1px] h-5 md:h-6 bg-[#8B5A3C]/20" />}
            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.15, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl font-bold text-[#8B5A3C]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {s.value}
              </motion.p>
              <p className="text-[0.52rem] md:text-[0.58rem] tracking-[0.22em] uppercase text-[#FAF7F2]/60 mt-1 font-semibold">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isMounted ? "show" : "hidden"}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          const featuresSec = document.querySelector("#features");
          if (featuresSec) {
            featuresSec.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span className="text-[0.58rem] tracking-[0.45em] uppercase text-white/40 font-semibold select-none">Scroll</span>
        <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute left-0 w-full bg-[#8B5A3C]"
            animate={{ top: ["-30%", "130%"] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "30%" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
