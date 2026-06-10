"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";

const CATEGORIES = ["All", "Villa", "Nature", "Dining", "Experiences", "Rooms"];

const GALLERY = [
  { src: "/hero.png",     alt: "The Nest forest villa aerial view",   cat: "Villa",       tall: true },
  { src: "/villa.png",    alt: "Private infinity pool at The Nest",    cat: "Villa",       tall: false },
  { src: "/trail.png",    alt: "Forest nature trail morning",          cat: "Nature",      tall: false },
  { src: "/bonfire.png",  alt: "Evening bonfire gathering",            cat: "Experiences", tall: true },
  { src: "/dining.png",   alt: "Farm-to-table outdoor dining",         cat: "Dining",      tall: false },
  { src: "/about.png",    alt: "Handcrafted suite interior",           cat: "Rooms",       tall: false },
  { src: "/stargazing.png",alt: "Stargazing night experience",         cat: "Experiences", tall: true },
  { src: "/stream.png",   alt: "Natural stream in the forest",         cat: "Nature",      tall: false },
  { src: "/kitchen.png",  alt: "Village kitchen cooking",              cat: "Dining",      tall: false },
  { src: "/farm.png",     alt: "Organic farm walk at sunrise",         cat: "Experiences", tall: false },
  { src: "/room.png",     alt: "Teak wood villa bedroom",              cat: "Rooms",       tall: true },
];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? GALLERY
    : GALLERY.filter((g) => g.cat === activeCategory);

  return (
    <section id="gallery" ref={ref} className="section-pad bg-[#F5F1E8]">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-14"
        >
          <p className="section-label mb-4">Visual Journey</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C2C2C] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Glimpse of{" "}
            <em className="italic text-[#2F4F3E]">The Nest</em>
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[0.65rem] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#2F4F3E] text-white"
                  : "bg-white text-[#2C2C2C]/60 hover:text-[#2F4F3E] border border-[#6B4F3A]/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-3 lg:gap-4 space-y-3 lg:space-y-4"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.src + item.cat}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="gallery-item relative group cursor-pointer overflow-hidden break-inside-avoid mb-3 lg:mb-4"
                onClick={() => setLightbox(item.src)}
              >
                <div className={`relative w-full overflow-hidden ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#2F4F3E]/0 group-hover:bg-[#2F4F3E]/40 transition-all duration-500 flex items-center justify-center">
                    <ZoomIn
                      size={28}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 scale-75 group-hover:scale-100 transform"
                    />
                  </div>
                  {/* Category tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/50 text-white text-[0.58rem] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    {item.cat}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
              className="relative w-full max-w-4xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Gallery preview"
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors duration-200 z-10"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

