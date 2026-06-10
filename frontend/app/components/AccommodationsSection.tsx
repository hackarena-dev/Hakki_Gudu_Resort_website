"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const accommodations = [
  {
    id: 1,
    name: "Forest Canopy Villa",
    type: "Signature",
    price: "₹18,500",
    priceUnit: "per night",
    desc: "Elevated among the treetops, this teak-wood villa offers a private infinity plunge pool, a sun deck, and panoramic forest views from every window.",
    image: "/villa.png",
    features: ["Private Plunge Pool", "Forest View Deck", "King Teak Bed", "Outdoor Rain Shower"],
    guests: "2 Guests",
    area: "1,200 sq ft",
  },
  {
    id: 2,
    name: "Riverside Nest Suite",
    type: "Deluxe",
    price: "₹12,000",
    priceUnit: "per night",
    desc: "Nestled beside a gentle stream, this bamboo-and-stone suite has floor-to-ceiling windows framing the water, handwoven furnishings, and a private courtyard.",
    image: "/about.png",
    features: ["Stream View", "Private Courtyard", "Bamboo Lounge", "Handcrafted Bath"],
    guests: "2 Guests",
    area: "850 sq ft",
  },
  {
    id: 3,
    name: "The Treetop Loft",
    type: "Adventure",
    price: "₹9,500",
    priceUnit: "/night",
    desc: "Sleep among the leaves in this intimate loft built 15 feet above ground. Wooden ladder access, stargazing skylight, and a wraparound treehouse balcony.",
    image: "/hero.png",
    features: ["Skylight Ceiling", "Wraparound Balcony", "Hammock Lounge", "Cozy Wood Stove"],
    guests: "2 Guests",
    area: "650 sq ft",
  },
];

export default function AccommodationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="accommodations"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f5efe6 0%, #ede0cc 40%, #e6d5bb 100%)" }}
    >
      {/* Subtle wood grain */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            105deg,
            transparent,
            transparent 3px,
            rgba(139,94,60,0.06) 3px,
            rgba(139,94,60,0.06) 6px
          )`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-4 mb-5"
          >
            <div className="w-12 h-px bg-[#d4a855]" />
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-[#8b5e3c] font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Your Private Sanctuary
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2c1a0e] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Villas Woven From{" "}
            <em className="italic text-[#8b5e3c]">Wood & Wonder</em>
          </motion.h2>
        </div>

        {/* Accommodation Cards */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {accommodations.map((acc, i) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`grid lg:grid-cols-2 gap-0 overflow-hidden group ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ boxShadow: "0 20px 60px rgba(26,15,8,0.12)" }}
            >
              {/* Image Side */}
              <div className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={acc.image}
                  alt={acc.name}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f08]/30 to-transparent" />
                {/* Type badge */}
                <div className="absolute top-6 left-6 px-3 py-1.5 bg-[#d4a855] text-[9px] tracking-[0.3em] uppercase text-[#1a0f08] font-medium">
                  {acc.type}
                </div>
              </div>

              {/* Content Side */}
              <div
                className={`flex flex-col justify-center p-8 lg:p-12 xl:p-16 bg-white ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div
                  className="text-xs tracking-[0.3em] uppercase text-[#8b5e3c] mb-3 font-light"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {acc.guests} · {acc.area}
                </div>
                <h3
                  className="text-3xl lg:text-4xl font-light text-[#2c1a0e] mb-4 group-hover:text-[#8b5e3c] transition-colors duration-400"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {acc.name}
                </h3>
                <p
                  className="text-sm text-[#4a2c1a]/65 leading-relaxed mb-8 font-light"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {acc.desc}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {acc.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#d4a855] flex-shrink-0" />
                      <span
                        className="text-xs text-[#4a2c1a]/60 font-light"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-end justify-between border-t border-[#c4956a]/25 pt-8">
                  <div>
                    <div
                      className="text-3xl font-light text-[#2c1a0e] leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {acc.price}
                    </div>
                    <div
                      className="text-[10px] text-[#4a2c1a]/40 mt-1 font-light tracking-wide"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {acc.priceUnit} · All meals included
                    </div>
                  </div>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-3.5 bg-[#2c1a0e] text-white text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#d4a855] hover:text-[#1a0f08] transition-all duration-400"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Reserve
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
