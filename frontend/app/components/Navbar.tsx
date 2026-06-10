"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "The Retreat", href: "#story" },
  { label: "Experiences", href: "#experiences" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 60);
    setHidden(y > lastY && y > 200);
    setLastY(y);
  }, [lastY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1e3329]/92 backdrop-blur-xl border-b border-white/8 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-[72px] lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="flex items-center gap-2.5">
                {/* SVG Nest mark */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="15" stroke="#C9A96E" strokeWidth="1"/>
                  <path d="M8 22c0-5.5 3.5-9 8-9s8 3.5 8 9" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M6 22c2-4 5-5.5 10-5.5S24 18 26 22" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
                  <circle cx="16" cy="14" r="2.5" fill="#C9A96E"/>
                </svg>
                <div>
                  <p
                    className="text-[1.05rem] font-bold tracking-[0.25em] text-white leading-none uppercase"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    The Nest
                  </p>
                  <p className="text-[0.55rem] tracking-[0.4em] text-[#C9A96E] uppercase font-medium mt-0.5">
                    Nature Retreat
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.5 }}
                  onClick={() => scrollTo(link.href)}
                  className="relative text-[0.65rem] tracking-[0.2em] uppercase font-medium text-white/80 hover:text-white transition-colors duration-300 pb-0.5 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-400" />
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.72, duration: 0.5 }}
              >
                <Link
                  href="/booking"
                  className="px-5 py-2.5 border border-[#C9A96E] text-[#C9A96E] text-[0.62rem] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#1e3329] transition-all duration-400"
                >
                  Reserve Now
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1e3329]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-medium tracking-wide text-white hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-10 py-3 border border-[#C9A96E] text-[#C9A96E] text-xs tracking-[0.25em] uppercase font-medium"
              >
                Reserve Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

