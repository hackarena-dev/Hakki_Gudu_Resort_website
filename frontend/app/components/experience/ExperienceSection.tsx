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
    tagColor: "#6B4F3A",
    desc: "Explore winding trails through dense jungle, discover secret clearings, rare bird species, and the meditative rhythm of walking in nature.",
    image: "/trail.png",
  },
  {
    id: "stars",
    title: "Stargazing",
    tag: "Celestial",
    tagColor: "#2F4F3E",
    desc: "Far from city lights, The Nest offers a vast, clear sky. Our resident guide walks you through constellations in intimate nightly sessions.",
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
  const [active, setActive] = useState<string | null>(null);

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
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Experiences That{" "}
            <em className="italic text-[#C9A96E]">Stay With You</em>
          </h2>
          <p className="mt-5 text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
            Every experience at The Nest is curated to create a genuine connection with the land, the people, and yourself.
          </p>
        </motion.div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setActive(exp.id)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3.2] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3329]/95 via-[#1e3329]/30 to-transparent" />
                {/* Active dim */}
                <div
                  className={`absolute inset-0 bg-[#2F4F3E]/40 transition-opacity duration-500 ${active === exp.id ? "opacity-100" : "opacity-0"}`}
                />

                {/* Tag badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-[0.58rem] tracking-[0.3em] uppercase font-medium text-white"
                  style={{ background: exp.tagColor }}
                >
                  {exp.tag}
                </div>

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A96E] transition-colors duration-400"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {exp.title}
                  </h3>
                  {/* Desc reveal on hover */}
                  <motion.div
                    animate={{
                      height: active === exp.id ? "auto" : 0,
                      opacity: active === exp.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-white/65 leading-relaxed pb-1">
                      {exp.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
