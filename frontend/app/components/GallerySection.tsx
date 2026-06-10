"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  { src: "/hero.png", alt: "Aerial view of The Nest resort in the forest", span: "col-span-2 row-span-2" },
  { src: "/villa.png", alt: "Private infinity pool villa", span: "" },
  { src: "/bonfire.png", alt: "Evening bonfire gathering", span: "" },
  { src: "/trail.png", alt: "Forest trail at sunrise", span: "" },
  { src: "/about.png", alt: "Handcrafted interior suite", span: "" },
  { src: "/stargazing.png", alt: "Stargazing night experience", span: "" },
  { src: "/farm.png", alt: "Organic farm and gardens", span: "" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#1a0f08" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="w-12 h-px bg-[#d4a855]" />
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-[#d4a855] font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Visual Journey
            </span>
            <div className="w-12 h-px bg-[#d4a855]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A Glimpse of{" "}
            <em className="italic text-[#d4a855]">The Nest</em>
          </motion.h2>
        </div>

        {/* Masonry-style gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src + i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#d4a855]/0 group-hover:bg-[#d4a855]/15 transition-all duration-500" />
              <div className="absolute inset-0 border border-transparent group-hover:border-[#d4a855]/40 transition-colors duration-500" />
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#1a0f08]/90 to-transparent">
                <p
                  className="text-xs text-white/80 font-light tracking-wide"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p
            className="text-sm text-white/40 font-light"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Follow our story on{" "}
            <span className="text-[#d4a855] hover:underline cursor-pointer">@TheNestRetreat</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
