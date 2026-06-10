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
          alt="Evening bonfire at The Nest resort"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3329]/70 via-[#1e3329]/55 to-[#1e3329]/85" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(30,51,41,0.7) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label text-[#C9A96E] mb-5">Begin Your Journey</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready For Your Escape?
          </h2>
          <p className="text-sm text-white/65 max-w-md mx-auto leading-relaxed mb-10">
            Limited villas available each season. Reserve your private sanctuary before it&apos;s gone.
          </p>
          <Link
            href="/booking"
            className="inline-block px-12 py-4 bg-[#C9A96E] text-[#1e3329] text-[0.7rem] tracking-[0.3em] uppercase font-semibold hover:bg-white hover:text-[#1e3329] transition-all duration-400"
          >
            Reserve Your Stay
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
