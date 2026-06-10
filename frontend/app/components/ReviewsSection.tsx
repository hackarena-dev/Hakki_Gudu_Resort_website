"use client";

import { motion, useInView, useAnimationFrame } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya & Arjun Mehra",
    location: "Mumbai",
    stay: "Forest Canopy Villa · 4 Nights",
    rating: 5,
    text: "We've stayed at luxury properties across Southeast Asia, but Hakki Goodu gave us something none of them could — complete, unhurried peace. The bonfire evening was the highlight of our honeymoon. We still talk about it every day.",
  },
  {
    name: "Meera Krishnan",
    location: "Bangalore",
    stay: "Riverside Nest Suite · 3 Nights",
    rating: 5,
    text: "The moment I arrived, I felt my shoulders drop. No phone signal, no noise — just forest sounds and the smell of wood fires. The farm breakfast every morning was extraordinary. I didn't want to leave.",
  },
  {
    name: "Rohan & Sneha Rao",
    location: "Hyderabad",
    stay: "Treetop Loft · 5 Nights",
    rating: 5,
    text: "Watching the stars from the treetop loft skylight felt like being in another dimension. The team went above and beyond for every detail. Absolutely unforgettable. Already planning our next stay.",
  },
  {
    name: "Vikram Nair",
    location: "Delhi",
    stay: "Forest Canopy Villa · 6 Nights",
    rating: 5,
    text: "I came alone to unwind and ended up discovering a new version of myself. The forest trails, the village kitchen, the silences — it's not just a retreat. It's a revelation. Best decision of the year.",
  },
  {
    name: "Ananya & Dev Shah",
    location: "Pune",
    stay: "Riverside Nest Suite · 4 Nights",
    rating: 5,
    text: "The stream outside our suite was the most beautiful alarm clock we've ever had. Every meal was a story, every evening a memory. Hakki Goodu redefines what a holiday means.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 10 10" className="w-3 h-3 fill-[#C9A96E]">
          <path d="M5 0L6.12 3.45H9.76L6.82 5.59L7.94 9.04L5 6.9L2.06 9.04L3.18 5.59L0.24 3.45H3.88L5 0Z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((a) => (a - 1 + REVIEWS.length) % REVIEWS.length), []);
  const next = useCallback(() => setActive((a) => (a + 1) % REVIEWS.length), []);

  return (
    <section
      id="reviews"
      ref={ref}
      className="section-pad overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FAF7F2 0%, #F5F1E8 100%)" }}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="section-label mb-4">Guest Stories</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C2C2C] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Words From Our{" "}
            <em className="italic text-[#2F4F3E]">Guests</em>
          </h2>
        </motion.div>

        {/* Review Display */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center"
          >
            {/* Quote icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 border border-[#C9A96E]/40 flex items-center justify-center">
                <Quote size={20} className="text-[#C9A96E]" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center mb-6">
              <Stars count={REVIEWS[active].rating} />
            </div>

            {/* Review text */}
            <p
              className="text-xl md:text-2xl font-medium italic text-[#2C2C2C] leading-relaxed mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{REVIEWS[active].text}&rdquo;
            </p>

            {/* Guest info */}
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm font-semibold text-[#2C2C2C] tracking-wide">
                {REVIEWS[active].name}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#6B4F3A]/65">
                <span>{REVIEWS[active].location}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-40" />
                <span>{REVIEWS[active].stay}</span>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 border border-[#6B4F3A]/25 flex items-center justify-center text-[#6B4F3A] hover:bg-[#2F4F3E] hover:text-white hover:border-[#2F4F3E] transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-400 ${
                    i === active ? "w-7 h-1.5 bg-[#2F4F3E]" : "w-1.5 h-1.5 bg-[#6B4F3A]/25 hover:bg-[#6B4F3A]/50"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-[#6B4F3A]/25 flex items-center justify-center text-[#6B4F3A] hover:bg-[#2F4F3E] hover:text-white hover:border-[#2F4F3E] transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Awards Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20 lg:mt-28 pt-12 border-t border-[#6B4F3A]/12"
        >
          {[
            { title: "Best Eco Resort", sub: "India Travel Awards 2024" },
            { title: "4.9 / 5.0", sub: "500+ Verified Reviews" },
            { title: "Top 10 Retreats", sub: "Condé Nast Traveller" },
            { title: "Eco Certified", sub: "Green Hospitality 2024" },
          ].map((a) => (
            <div key={a.title} className="text-center py-6 px-4 border border-[#6B4F3A]/10 hover:border-[#2F4F3E]/30 transition-colors duration-400 bg-white/50">
              <p
                className="text-lg font-bold text-[#2C2C2C] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {a.title}
              </p>
              <div className="w-5 h-px bg-[#C9A96E] mx-auto mb-2" />
              <p className="text-[0.62rem] tracking-[0.25em] uppercase text-[#6B4F3A]/60">
                {a.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

