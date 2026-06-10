"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Retreat", href: "#story" },
  { label: "Experiences", href: "#experiences" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 30);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1e3329]/80 backdrop-blur-xl border-b border-white/5 shadow-lg h-[70px]"
            : "bg-transparent h-[86px]"
        }`}
      >
        <div className="container-luxury h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="cursor-pointer select-none z-50"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="flex items-center gap-3.5">
                {/* Scaled-up elegant Nest logo */}
                <svg width="38" height="38" viewBox="0 0 32 32" fill="none" className="transition-transform duration-500 hover:rotate-12">
                  <circle cx="16" cy="16" r="15" stroke="#C9A96E" strokeWidth="1"/>
                  <path d="M8 22c0-5.5 3.5-9 8-9s8 3.5 8 9" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M6 22c2-4 5-5.5 10-5.5S24 18 26 22" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                  <circle cx="16" cy="14" r="2.5" fill="#C9A96E"/>
                </svg>
                <div>
                  <p
                    className="text-lg md:text-xl font-bold tracking-[0.32em] text-white leading-none uppercase"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    The Nest
                  </p>
                  <p className="text-[0.58rem] tracking-[0.48em] text-[#C9A96E] uppercase font-semibold mt-1">
                    Nature Retreat
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Desktop Nav - Generous gaps and elegant styles */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-11">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.6 }}
                  onClick={() => scrollTo(link.href)}
                  className="relative text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-white/80 hover:text-white transition-colors duration-300 pb-1.5 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-400 ease-out" />
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="pl-4"
              >
                <Link
                  href="/booking"
                  className="px-6 py-3 bg-[#C9A96E] text-[#1e3329] text-[0.68rem] tracking-[0.22em] uppercase font-bold hover:text-[#1e3329] transition-colors duration-500 shadow-md hover:shadow-xl relative overflow-hidden group block"
                >
                  <span className="relative z-10">Reserve Your Stay</span>
                  <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-white p-2 z-50 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Immersive Editorial Design */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#1e3329]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            <div className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.08, ease: "easeOut" }}
                  onClick={() => scrollTo(link.href)}
                  className="text-3xl md:text-4xl font-medium tracking-wide text-white hover:text-[#C9A96E] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="px-10 py-4 bg-[#C9A96E] text-[#1e3329] text-xs tracking-[0.25em] uppercase font-bold shadow-lg hover:bg-white transition-colors duration-500 block"
              >
                Reserve Your Stay
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
