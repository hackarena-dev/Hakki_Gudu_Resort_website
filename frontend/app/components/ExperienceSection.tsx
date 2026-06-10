"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EXPERIENCES = [
  {
    id: "bonfire",
    title: "Bonfire Nights",
    tag: "Evening",
    tagColor: "#B56A4A",
    desc: "Gather around a crackling bonfire under an open sky. Share stories, sip spiced chai, and let the night hold you in warmth and wonder.",
    image: "/bonfire.png",
  },
  {
    id: "kitchen",
    title: "Village Kitchen",
    tag: "Culinary",
    tagColor: "#798A63",
    desc: "Watch traditional recipes come alive over a clay stove. Our village cooks share stories behind every dish as you eat fresh, soulful meals.",
    image: "/kitchen.png",
  },
  {
    id: "farm",
    title: "Farm Walk",
    tag: "Morning",
    tagColor: "#2F4F3E",
    desc: "Walk the organic farm with our farmer, harvest fresh vegetables, and understand the journey from soil to plate.",
    image: "/farm.png",
  },
  {
    id: "trails",
    title: "Nature Trails",
    tag: "Adventure",
    tagColor: "#6B4F3A",
    desc: "Explore winding trails through dense jungle, discover secret clearings, rare bird species, and the meditative rhythm of walking in nature.",
    image: "/trail.png",
  },
  {
    id: "stars",
    title: "Stargazing",
    tag: "Celestial",
    tagColor: "#2F4F3E",
    desc: "Far from city lights, Hakki Goodu offers a vast, clear sky. Our resident guide walks you through constellations in intimate nightly sessions.",
    image: "/stargazing.png",
  },
  {
    id: "stream",
    title: "Stream Exploration",
    tag: "Nature",
    tagColor: "#798A63",
    desc: "Follow the natural stream that winds through the property — dip your feet, spot river life, and find stillness in moving water.",
    image: "/stream.png",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="experiences"
      ref={ref}
      className="section-pad overflow-hidden"
      style={{ background: "linear-gradient(180deg, #2F4F3E 0%, #1e3329 100%)" }}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="section-label text-[#C9A96E] mb-4">Curated Moments</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Experiences That{" "}
            <em className="italic text-[#C9A96E]">Stay With You</em>
          </h2>
          <p className="mt-5 text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
            Every experience at Hakki Goodu is curated to create a genuine connection with the land, the people, and yourself.
          </p>
        </motion.div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.9, ease: "easeOut" }}
              className="group relative overflow-hidden h-[380px] sm:h-[420px] lg:h-[450px] shadow-lg cursor-pointer bg-[#1e3329]"
            >
              {/* Image Container with Zoom hover */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Dynamic Overlays */}
              {/* Solid gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 z-10 transition-all duration-500 group-hover:from-black/95 group-hover:via-black/50" />
              {/* Soft forest green glow overlay on hover */}
              <div className="absolute inset-0 bg-[#2F4F3E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Tag Badge */}
              <div
                className="absolute top-5 left-5 z-20 px-3 py-1.5 text-[0.55rem] tracking-[0.3em] uppercase font-bold text-white"
                style={{ background: exp.tagColor }}
              >
                {exp.tag}
              </div>

              {/* Content Panel */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end">
                <h3
                  className="text-xl md:text-2xl font-bold text-white mb-3 tracking-wide transition-colors duration-300 group-hover:text-[#C9A96E]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {exp.title}
                </h3>
                
                {/* Description: Slides up on desktop, static on mobile for accessibility */}
                <div className="overflow-hidden">
                  <p className="text-xs md:text-[0.82rem] leading-relaxed text-white/75 lg:opacity-0 lg:translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
