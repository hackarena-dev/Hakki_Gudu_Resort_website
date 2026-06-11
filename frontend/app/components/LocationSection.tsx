"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";

const CONTACTS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon–Sun, 8am–8pm IST",
    href: "tel:+919876543210",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat With Us",
    sub: "Quick replies, always",
    href: "https://wa.me/919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@hakkigoodu.in",
    sub: "Reply within 24 hrs",
    href: "mailto:hello@hakkigoodu.in",
  },
  {
    icon: Clock,
    label: "Timings",
    value: "In: 2 PM · Out: 11 AM",
    sub: "Daily reception access",
    href: null,
  },
];

export default function LocationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="location"
      ref={ref}
      className="py-12 md:py-16"
      style={{ background: "linear-gradient(160deg, #2F4F3E 0%, #1e3329 100%)" }}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 lg:mb-10"
        >
          <p className="section-label text-[#B98958] mb-3">Find Us</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 max-w-5xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nestled in the{" "}
              <em className="italic text-[#B98958]">Heart of Coorg</em>
            </h2>
            <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
              <MapPin size={14} className="text-[#B98958]" />
              <span>Coorg (Kodagu), Karnataka, India</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="relative overflow-hidden bg-[#2C2C2C]/30 border border-white/10 h-[260px] sm:h-[300px] lg:h-[340px]"
          >
            {/* Stylized map placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              {/* Map grid decoration */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(185,137,88,0.4) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(185,137,88,0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Pulsing pin */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-[#B98958] flex items-center justify-center shadow-xl">
                    <MapPin size={18} className="text-[#1e3329]" />
                  </div>
                  <div className="absolute -inset-1.5 bg-[#B98958]/20 animate-ping rounded-full" />
                </div>
                <div>
                  <p
                    className="text-lg font-bold text-white mb-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Hakki Goodu
                  </p>
                  <p className="text-[0.7rem] text-white/55">Coorg, Karnataka — 571215</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 px-5 py-2 border border-[#B98958]/50 text-[#B98958] text-[0.58rem] tracking-[0.2em] uppercase hover:bg-[#B98958] hover:text-[#1e3329] transition-all duration-400"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Unified Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" as const }}
            className="flex flex-col border border-white/10 bg-white/5 p-6 md:p-8 justify-between"
          >
            {/* Address Row */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[#B98958]/60 mb-2">
                Address
              </p>
              <p className="text-sm text-white font-medium leading-relaxed">
                Hakki Goodu Nature Retreat,<br />
                Near Coorg Forest Reserve,<br />
                Kodagu District, Karnataka — 571 215, India
              </p>
              <p className="text-xs text-white/45 mt-2">
                3 hrs drive from Bengaluru · 1.5 hrs from Mysore
              </p>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              {CONTACTS.map((c) => {
                const Icon = c.icon;
                const El = c.href ? "a" : "div";
                return (
                  <El
                    key={c.label}
                    {...(c.href ? { href: c.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:border-[#B98958] group-hover:bg-[#B98958]/10 transition-all duration-400">
                      <Icon size={14} className="text-[#B98958]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B98958]/60 mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-xs font-medium text-white group-hover:text-[#B98958]/90 transition-colors truncate">
                        {c.value}
                      </p>
                      <p className="text-[0.62rem] text-white/35 truncate">{c.sub}</p>
                    </div>
                  </El>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

