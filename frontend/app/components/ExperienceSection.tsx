"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
    tagColor: "#8B5A3C",
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
  const [expanded, setExpanded] = useState(false);

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
          <p className="section-label text-[#B98958] mb-4">Curated Moments</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Experiences That{" "}
            <em className="italic text-[#B98958]">Stay With You</em>
          </h2>
          <p className="mt-5 text-sm text-[#FAF7F2]/75 max-w-lg mx-auto leading-relaxed">
            Every experience at Hakki Goodu is curated to create a genuine connection with the land, the people, and yourself.
          </p>
        </motion.div>

        {/* Experience Alternating Showcase */}
        <div className="flex flex-col gap-0 mt-10 lg:mt-16">
          {EXPERIENCES.slice(0, expanded ? undefined : 3).map((exp, i) => {
            const isReversed = i % 2 === 1; // Alternate: Image Left / Image Right

            return (
              <div
                key={exp.id}
                className="border-b border-white/10 last:border-0 py-8 lg:py-14"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  {/* Image Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`group relative overflow-hidden aspect-[3/2] w-full max-w-[480px] mx-auto shadow-2xl border border-white/10 group-hover:border-[#8B5A3C] transition-all duration-500 ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    {/* Soft tint overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
                    
                    {/* Tag Badge */}
                    <div
                      className="absolute top-5 left-5 z-20 px-3 py-1.5 text-[0.55rem] tracking-[0.3em] uppercase font-bold text-white shadow-lg"
                      style={{ background: exp.tagColor }}
                    >
                      {exp.tag}
                    </div>
                  </motion.div>

                  {/* Text Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                    className="flex flex-col items-start text-left max-w-[500px] mx-auto lg:mx-0 lg:max-w-none"
                  >
                    <span
                      className="text-[0.6rem] tracking-[0.35em] uppercase font-semibold mb-3"
                      style={{ color: exp.tagColor }}
                    >
                      {exp.tag} Experience
                    </span>
                    <h3
                      className="text-2xl md:text-3.5xl font-bold text-white mb-4 tracking-wide transition-colors duration-300 group-hover:text-[#8B5A3C]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {exp.title}
                    </h3>
                    
                    <div className="w-12 h-[1px] bg-[#8B5A3C]/40 mb-5 group-hover:bg-[#8B5A3C] transition-all duration-500" />

                    <p className="text-sm leading-relaxed text-[#FAF7F2]/75 mb-6">
                      {exp.desc}
                    </p>
                    
                    <a
                      href="#booking"
                      className="group/link inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-[#B98958] hover:text-[#8B5A3C] transition-colors duration-300"
                    >
                      Inquire Experience
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Toggle Button */}
        <div className="text-center mt-12 lg:mt-16">
          <button
            onClick={() => {
              if (expanded) {
                const section = document.getElementById("experiences");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
                setTimeout(() => setExpanded(false), 300);
              } else {
                setExpanded(true);
              }
            }}
            className="btn-outline border-[#8B5A3C]/40 text-[#8B5A3C] hover:border-[#8B5A3C] hover:text-white"
          >
            <span>{expanded ? "Show Less" : "Explore All Experiences"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
