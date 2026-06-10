"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya & Arjun",
    location: "Mumbai",
    review:
      "We've stayed at luxury properties across Southeast Asia, but The Nest gave us something none of them could — complete, unhurried peace. The bonfire evening was the highlight of our honeymoon.",
    rating: 5,
    stay: "Forest Canopy Villa · 4 Nights",
  },
  {
    id: 2,
    name: "Meera Krishnan",
    location: "Bangalore",
    review:
      "The moment I arrived, I felt my shoulders drop. No phone signal, no noise — just forest sounds and the smell of wood fires. I didn't want to leave. I'm already planning my next stay.",
    rating: 5,
    stay: "Riverside Nest Suite · 3 Nights",
  },
  {
    id: 3,
    name: "Rohan & Sneha",
    location: "Hyderabad",
    review:
      "Watching the stars from the treetop loft felt like being in another world. The team went above and beyond for every detail. The food was extraordinary — all from their own farm.",
    rating: 5,
    stay: "Treetop Loft · 5 Nights",
  },
  {
    id: 4,
    name: "Vikram Nair",
    location: "Delhi",
    review:
      "I came alone to unwind and ended up discovering a new version of myself. The forest trails, the silence, the craftsmanship of this place — it's not just a retreat, it's a revelation.",
    rating: 5,
    stay: "Forest Canopy Villa · 6 Nights",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-[#d4a855]" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0l1.4 4.1H12L8.3 6.6 9.7 11 6 8.5 2.3 11l1.4-4.4L0 4.1h4.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f5efe6 0%, #ede0cc 100%)" }}
    >
      {/* Decorative leaf motif */}
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #8b5e3c 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="w-12 h-px bg-[#d4a855]" />
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-[#8b5e3c] font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Guest Stories
            </span>
            <div className="w-12 h-px bg-[#d4a855]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2c1a0e] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Words From Our{" "}
            <em className="italic text-[#8b5e3c]">Guests</em>
          </motion.h2>
        </div>

        {/* Active Testimonial */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center mb-14"
        >
          <div className="text-6xl text-[#d4a855]/30 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "
          </div>
          <p
            className="text-xl md:text-2xl lg:text-3xl font-light text-[#2c1a0e] leading-relaxed mb-8 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {testimonials[active].review}
          </p>
          <div className="flex flex-col items-center gap-3">
            <StarRating count={testimonials[active].rating} />
            <div
              className="text-sm font-medium text-[#2c1a0e] tracking-wide"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {testimonials[active].name}
            </div>
            <div
              className="text-xs text-[#8b5e3c] font-light tracking-widest uppercase"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {testimonials[active].location} · {testimonials[active].stay}
            </div>
          </div>
        </motion.div>

        {/* Tab selectors */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-400 ${
                i === active
                  ? "w-8 h-1.5 bg-[#d4a855]"
                  : "w-2 h-1.5 bg-[#c4956a]/40 hover:bg-[#c4956a]"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Awards bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10"
        >
          {[
            { award: "Best Eco Resort", body: "India Travel Awards 2024" },
            { award: "4.9 / 5.0", body: "500+ Verified Reviews" },
            { award: "Top 10 Retreats", body: "Condé Nast Traveller" },
            { award: "Sustainable Stay", body: "Green Hospitality Certified" },
          ].map((item) => (
            <div key={item.award} className="flex flex-col items-center text-center gap-2 py-8 px-4 border border-[#c4956a]/30 bg-white/50">
              <div
                className="text-xl text-[#2c1a0e] font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.award}
              </div>
              <div className="w-6 h-px bg-[#d4a855]" />
              <div
                className="text-[10px] tracking-widest uppercase text-[#8b5e3c] font-light"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {item.body}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
