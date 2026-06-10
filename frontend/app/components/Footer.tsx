"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Explore: ["The Retreat", "Experiences", "Accommodations", "Gallery"],
  Visit: ["Getting Here", "What to Bring", "Seasonal Guide", "FAQs"],
  Legal: ["Privacy Policy", "Terms of Stay", "Cancellation Policy", "Sustainability"],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 9c0-3 4-4 5 0 .7 3-2 5-2 8M12 15v6" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t border-[#d4a855]/15"
      style={{ background: "#0f0805" }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(212,168,85,0.15) 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-14 lg:mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10">
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
            </div>
            <p
              className="text-sm text-white/40 leading-relaxed font-light max-w-xs mb-8"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              A private sanctuary nestled in 50+ acres of pristine forest in
              Coorg, Karnataka. Crafted for those who seek stillness.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-[#d4a855] hover:border-[#d4a855]/50 transition-all duration-400"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div
                className="text-[10px] tracking-[0.4em] uppercase text-[#d4a855] font-light mb-6"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {group}
              </div>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-white/35 hover:text-white/80 transition-colors duration-300 font-light tracking-wide"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wood divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#d4a855]/30 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p
            className="text-[10px] text-white/25 font-light tracking-wide"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            © {year} The Nest Nature Retreat. All rights reserved. · Coorg, Karnataka, India
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a8f4a] animate-pulse" />
            <span
              className="text-[10px] text-white/25 font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Eco-Certified Property · Carbon Neutral Operations
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
