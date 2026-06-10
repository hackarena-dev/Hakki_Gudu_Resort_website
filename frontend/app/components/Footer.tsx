"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const NAV_COL = {
  "Explore": ["The Retreat", "Experiences", "Accommodation"],
  "Visit": ["Getting Here", "What to Pack", "Seasonal Guide", "FAQs"],
  "Policies": ["Privacy Policy", "Terms of Stay", "Cancellation Policy", "Sustainability"],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleGroup = (group: string) => {
    setExpanded((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <footer className="bg-[#1a2e22] border-t border-white/8">
      <div className="container-luxury">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-10 lg:gap-8 py-10 md:py-16">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <Image
                src="/logo.png"
                alt="Hakki Goodu Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <div>
                <p className="text-lg font-bold tracking-[0.18em] text-white leading-none uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Hakki Goodu
                </p>
                <p className="text-[0.5rem] tracking-[0.42em] text-[#C9A96E] uppercase mt-0.5">Nature Retreat</p>
              </div>
            </div>
            <p className="text-xs text-white/40 leading-6 max-w-[220px] mb-7">
              A private sanctuary nestled in 2 acres of pristine forest in Coorg, Karnataka. Crafted for those who seek stillness.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/hakki_goodu?igsh=MzR3dGMya2d4ZGhj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* Pinterest */}
              <a href="#" aria-label="Pinterest" className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.867 3.137-4.563 0-2.386-1.716-4.054-4.165-4.054-2.836 0-4.498 2.127-4.498 4.326 0 .856.33 1.775.741 2.276a.3.3 0 01.069.286c-.076.315-.245.995-.278 1.134-.045.183-.15.222-.345.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                aria-label="WhatsApp"
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(NAV_COL).map(([group, links]) => {
            const isOpen = expanded[group];
            return (
              <div key={group} className="border-b border-white/5 md:border-none">
                <button
                  onClick={() => isMobile && toggleGroup(group)}
                  className="w-full flex items-center justify-between text-left py-4 md:py-0 md:mb-5 focus:outline-none md:pointer-events-none cursor-pointer md:cursor-default"
                >
                  <span className="text-[0.65rem] tracking-[0.4em] uppercase text-[#C9A96E] font-semibold">
                    {group}
                  </span>
                  {isMobile && (
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#C9A96E]"
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  )}
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isMobile ? (isOpen ? "auto" : 0) : "auto",
                    opacity: isMobile ? (isOpen ? 1 : 0) : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-col gap-3 pb-4 md:pb-0">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-xs text-white/35 hover:text-white/75 transition-colors duration-300"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/25 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-7 text-center">
          <p className="text-[0.6rem] text-white/25 tracking-wide">
            © {year} Hakki Goodu Nature Retreat. All rights reserved. · Coorg, Karnataka, India.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#798A63] animate-pulse" />
            <span className="text-[0.6rem] text-white/25">
              Eco-Certified · Carbon Neutral Operations
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
