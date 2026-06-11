"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BookingCTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="cta" ref={ref} className="relative h-[60vh] min-h-[420px] overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <Image
          src="/bonfire.png"
          alt="Evening bonfire at Hakki Goodu resort"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2F4F3E]/92 to-[#8B5A3C]/92 z-10" />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(30,51,41,0.8) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" as const }}
        >
          <p className="section-label text-[#D9B07A] mb-5 font-bold tracking-[0.4em]">Begin Your Journey</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready For Your Escape?
          </h2>
          <p className="text-base text-white/80 max-w-lg mx-auto leading-relaxed mb-10">
            Limited villas available each season. Reserve your private sanctuary before it&apos;s gone and reconnect with the wild.
          </p>
          <Link
            href="/booking"
            className="inline-block px-12 py-4 bg-[#8B5A3C] text-white text-[0.7rem] tracking-[0.3em] uppercase font-bold hover:bg-[#A9724F] transition-all duration-400 border border-[#8B5A3C] shadow-lg hover:shadow-2xl hover:scale-[1.02]"
          >
            Reserve Your Stay
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

