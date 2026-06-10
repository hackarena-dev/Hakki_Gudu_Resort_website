"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    id: 1,
    title: "Bonfire Evenings",
    category: "Signature",
    desc: "Gather under an open sky around a crackling bonfire. Share stories, sip artisan brews, and let the night enfold you in warmth.",
    image: "/bonfire.png",
    badge: "Most Loved",
  },
  {
    id: 2,
    title: "Forest Trails",
    category: "Adventure",
    desc: "Wander through 50 acres of ancient forest on guided or self-paced trails. Discover hidden waterfalls, rare birds, and sacred clearings.",
    image: "/trail.png",
    badge: "Dawn Special",
  },
  {
    id: 3,
    title: "Starlit Nights",
    category: "Celestial",
    desc: "Far from city lights, the sky becomes your theatre. Our resident astronomer guides you through constellations in intimate sessions.",
    image: "/stargazing.png",
    badge: "Exclusive",
  },
  {
    id: 4,
    title: "Farm & Table",
    category: "Culinary",
    desc: "Walk the organic farm, harvest seasonal ingredients, and join our chef in crafting a meal that tells the story of this land.",
    image: "/farm.png",
    badge: "Farm Fresh",
  },
];

export default function ExperiencesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeExp, setActiveExp] = useState<number | null>(null);

  return (
    <section
      id="experiences"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #2c1a0e 0%, #1a0f08 100%)" }}
    >
      {/* Decorative wood pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(212,168,85,0.5) 40px,
            rgba(212,168,85,0.5) 41px
          )`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="w-12 h-px bg-[#d4a855]" />
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-[#d4a855] font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Curated Journeys
            </span>
            <div className="w-12 h-px bg-[#d4a855]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Moments That{" "}
            <em className="italic text-[#d4a855]">Stay With You</em>
          </motion.h2>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setActiveExp(exp.id)}
              onMouseLeave={() => setActiveExp(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Dark gradient on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08]/90 via-[#1a0f08]/30 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[#2c1a0e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badge */}
                <div className="absolute top-5 right-5 px-3 py-1.5 bg-[#d4a855] text-[9px] tracking-[0.3em] uppercase text-[#1a0f08] font-medium">
                  {exp.badge}
                </div>

                {/* Category */}
                <div className="absolute top-5 left-5 px-3 py-1.5 border border-white/30 text-[9px] tracking-[0.3em] uppercase text-white/80 font-light">
                  {exp.category}
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3
                    className="text-2xl lg:text-3xl font-light text-white mb-2 group-hover:text-[#d4a855] transition-colors duration-400"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {exp.title}
                  </h3>
                  <motion.p
                    className="text-sm text-white/70 leading-relaxed font-light overflow-hidden"
                    animate={{ height: activeExp === exp.id ? "auto" : 0, opacity: activeExp === exp.id ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {exp.desc}
                  </motion.p>
                  <div
                    className={`mt-4 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-medium text-[#d4a855] transition-all duration-400 ${
                      activeExp === exp.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    Learn More
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p
            className="text-base text-white/50 font-light mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            All experiences are curated and included in your stay
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, backgroundColor: "#e8c97a" }}
            className="inline-block px-12 py-4 bg-[#d4a855] text-[#1a0f08] text-xs tracking-[0.3em] uppercase font-medium transition-all duration-400"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Your Experience
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
