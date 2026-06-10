"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "The Retreat", href: "#about" },
  { label: "Experiences", href: "#experiences" },
  { label: "Accommodations", href: "#accommodations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#1a0f08]/90 backdrop-blur-xl shadow-2xl border-b border-[#d4a855]/20"
            : "bg-transparent"
        }`}
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {/* Nest SVG Icon */}
              <div className="w-10 h-10 relative flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="19" stroke="#d4a855" strokeWidth="1" opacity="0.6"/>
                  <path d="M10 26 C10 18, 15 14, 20 14 C25 14, 30 18, 30 26" stroke="#d4a855" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M8 26 C10 22, 13 20, 20 20 C27 20, 30 22, 32 26" stroke="#d4a855" strokeWidth="1" fill="none" strokeLinecap="round"/>
                  <circle cx="20" cy="19" r="3" fill="#d4a855" opacity="0.8"/>
                  <path d="M7 27 L33 27" stroke="#d4a855" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div
                  className="text-2xl font-light tracking-[0.2em] text-white leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  THE NEST
                </div>
                <div className="text-[9px] tracking-[0.35em] text-[#d4a855] uppercase font-light mt-0.5">
                  Nature Retreat
                </div>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300 pb-1 ${
                    activeLink === link.href
                      ? "text-[#d4a855]"
                      : "text-white/80 hover:text-[#d4a855]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#d4a855] transition-all duration-500 ${
                      activeLink === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.85 }}
                onClick={() => handleNavClick("#contact")}
                className="ml-4 px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-medium border border-[#d4a855] text-[#d4a855] hover:bg-[#d4a855] hover:text-[#1a0f08] transition-all duration-400"
              >
                Reserve Now
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-7 bg-white transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-5"
                }`}
              />
              <span
                className={`block h-px w-7 bg-white transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1a0f08]/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-light tracking-[0.15em] uppercase text-white/90 hover:text-[#d4a855] transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNavClick("#contact")}
                className="mt-4 px-10 py-3 border border-[#d4a855] text-[#d4a855] text-sm tracking-[0.2em] uppercase"
              >
                Reserve Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
