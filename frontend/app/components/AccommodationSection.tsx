"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Maximize, Wind, Wifi, Coffee, Utensils } from "lucide-react";

const ROOMS = [
  {
    id: "canopy",
    name: "Forest Canopy Villa",
    tier: "Signature",
    guests: "2–4 Guests",
    size: "1,200 sq ft",
    price: "₹18,500",
    period: "per night",
    desc: "Elevated among the treetops with a private infinity plunge pool, panoramic forest deck, and handcrafted teak interiors. The pinnacle of nature luxury.",
    image: "/villa.png",
    amenities: ["Private Plunge Pool", "Forest View Deck", "King Teak Bed", "Outdoor Rain Shower", "Daily Farm Breakfast", "Bonfire Access"],
    icons: [Wind, Wifi, Coffee, Utensils],
  },
  {
    id: "riverside",
    name: "Riverside Nest Suite",
    tier: "Deluxe",
    guests: "2 Guests",
    size: "850 sq ft",
    price: "₹12,000",
    period: "per night",
    desc: "Nestled beside the stream with floor-to-ceiling windows, handwoven furnishings, a private courtyard garden, and the sound of water as your constant companion.",
    image: "/room.png",
    amenities: ["Stream View Windows", "Private Courtyard", "Bamboo Lounge Chair", "Handcrafted Bathtub", "Artisan Toiletries", "Morning Yoga Mat"],
    icons: [Wind, Wifi, Coffee, Utensils],
  },
  {
    id: "treehouse",
    name: "The Treetop Loft",
    tier: "Adventure",
    guests: "2 Guests",
    size: "650 sq ft",
    price: "₹9,500",
    period: "per night",
    desc: "Sleep among the leaves 15 feet above ground. Skylight for stargazing from bed, a wraparound treehouse balcony, and the thrill of being held by the forest.",
    image: "/about.png",
    amenities: ["Stargazing Skylight", "Wrap Balcony", "Hammock Lounge", "Cozy Wood Stove", "Forest Sounds", "Private Ladder Access"],
    icons: [Wind, Coffee, Utensils],
  },
];

export default function AccommodationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="accommodation"
      ref={ref}
      className="section-pad bg-[#FAF7F2]"
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 lg:mb-20"
        >
          <p className="section-label mb-4">Stay</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <h2
              className="text-4xl md:text-5xl font-bold text-[#2C2C2C] leading-tight max-w-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Villas Woven From{" "}
              <em className="italic text-[#2F4F3E]">Wood & Wonder</em>
            </h2>
            <p className="text-sm text-[#2C2C2C]/55 max-w-sm leading-relaxed lg:text-right">
              Each villa is a handcrafted sanctuary. All meals from our organic farm are included in every stay.
            </p>
          </div>
        </motion.div>

        {/* Room Cards */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 1, ease: "easeOut" as const }}
              className={`group grid lg:grid-cols-2 overflow-hidden bg-white border border-[#6B4F3A]/10 hover:border-[#2F4F3E]/25 hover:shadow-2xl transition-all duration-600 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-106"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2F4F3E]/20" />
                {/* Tier */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-[#2F4F3E] text-white text-[0.58rem] tracking-[0.3em] uppercase font-medium">
                  {room.tier}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-7 lg:p-10 xl:p-14">
                <div>
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4 text-[#6B4F3A]/60 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Users size={13} /> {room.guests}
                    </span>
                    <span className="w-px h-3 bg-current opacity-30" />
                    <span className="flex items-center gap-1.5">
                      <Maximize size={13} /> {room.size}
                    </span>
                  </div>

                  <h3
                    className="text-2xl lg:text-3xl font-bold text-[#2C2C2C] mb-4 group-hover:text-[#2F4F3E] transition-colors duration-400"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {room.name}
                  </h3>
                  <p className="text-sm text-[#2C2C2C]/55 leading-7 mb-7">
                    {room.desc}
                  </p>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mb-8">
                    {room.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#B56A4A] rounded-full flex-shrink-0" />
                        <span className="text-xs text-[#2C2C2C]/55">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-end justify-between pt-6 border-t border-[#6B4F3A]/12">
                  <div>
                    <p
                      className="text-3xl font-bold text-[#2C2C2C] leading-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {room.price}
                    </p>
                    <p className="text-[0.65rem] text-[#6B4F3A]/55 mt-1 tracking-wide">
                      {room.period} · All meals included
                    </p>
                  </div>
                  <Link
                    href="/booking"
                    className="px-7 py-3.5 bg-[#2F4F3E] text-white text-[0.63rem] tracking-[0.2em] uppercase font-medium hover:bg-[#6B4F3A] transition-colors duration-400"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

