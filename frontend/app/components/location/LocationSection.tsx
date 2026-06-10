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
    value: "hello@thenest.in",
    sub: "We reply within 24 hrs",
    href: "mailto:hello@thenest.in",
  },
  {
    icon: Clock,
    label: "Check-In",
    value: "2:00 PM onwards",
    sub: "Check-out by 11:00 AM",
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
      className="section-pad"
      style={{ background: "linear-gradient(160deg, #2F4F3E 0%, #1e3329 100%)" }}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 lg:mb-16"
        >
          <p className="section-label text-[#C9A96E] mb-4">Find Us</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nestled in the{" "}
              <em className="italic text-[#C9A96E]">Heart of Coorg</em>
            </h2>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <MapPin size={14} className="text-[#C9A96E]" />
              <span>Coorg (Kodagu), Karnataka, India — 3 hrs from Bengaluru</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="relative overflow-hidden bg-[#2C2C2C]/30 border border-white/10"
            style={{ minHeight: "380px" }}
          >
            {/* Stylized map placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
              {/* Map grid decoration */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(201,169,110,0.4) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(201,169,110,0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Pulsing pin */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-[#C9A96E] flex items-center justify-center shadow-xl">
                    <MapPin size={20} className="text-[#1e3329]" />
                  </div>
                  <div className="absolute -inset-2 bg-[#C9A96E]/20 animate-ping rounded-full" />
                </div>
                <div>
                  <p
                    className="text-xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    The Nest
                  </p>
                  <p className="text-xs text-white/55">Coorg, Karnataka — 571215</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-7 py-2.5 border border-[#C9A96E]/50 text-[#C9A96E] text-[0.62rem] tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#1e3329] transition-all duration-400"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" as const }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {CONTACTS.map((c, i) => {
              const Icon = c.icon;
              const El = c.href ? "a" : "div";
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.7 }}
                >
                  <El
                    {...(c.href ? { href: c.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex flex-col gap-3 p-6 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C9A96E]/40 transition-all duration-400 h-full group cursor-pointer"
                  >
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/10 transition-all duration-400">
                      <Icon size={16} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[#C9A96E]/60 mb-1">
                        {c.label}
                      </p>
                      <p className="text-sm font-medium text-white mb-0.5">
                        {c.value}
                      </p>
                      <p className="text-xs text-white/40">{c.sub}</p>
                    </div>
                  </El>
                </motion.div>
              );
            })}

            {/* Full Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="sm:col-span-2 p-6 border border-white/10 bg-white/5"
            >
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[#C9A96E]/60 mb-3">
                Address
              </p>
              <p className="text-sm text-white leading-relaxed">
                The Nest Nature Retreat,<br />
                Near Coorg Forest Reserve,<br />
                Kodagu District, Karnataka — 571 215<br />
                India
              </p>
              <p className="text-xs text-white/35 mt-3">
                3 hrs drive from Bengaluru · 1.5 hrs from Mysore
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

