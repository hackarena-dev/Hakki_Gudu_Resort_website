"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 2:00 PM onwards and check-out is by 11:00 AM. Early check-in or late check-out can be arranged based on availability. Please inform us in advance and we'll do our best to accommodate you.",
  },
  {
    q: "Is food included in the stay?",
    a: "Yes — all farm-fresh meals are included in your stay. Breakfast, lunch, and dinner are prepared daily using produce from our organic farm and local village kitchens. We accommodate dietary preferences and restrictions with advance notice.",
  },
  {
    q: "How many guests can Hakki Goodu host at once?",
    a: "Hakki Goodu maintains a strict maximum of 20 guests across all villas at any time. This ensures genuine privacy, personal service, and an intimate connection with nature for every guest.",
  },
  {
    q: "Is there parking available at Hakki Goodu?",
    a: "Yes, we have secure private parking within the property. Our team will greet you at the entrance and assist with luggage. The road leading to Hakki Goodu is motorable for all vehicle types.",
  },
  {
    q: "Are pets allowed at Hakki Goodu?",
    a: "We love animals, but to protect our local wildlife and maintain the natural ecosystem of our forest property, we are currently unable to accommodate pets. We hope you understand.",
  },
  {
    q: "Is there mobile signal or Wi-Fi at the property?",
    a: "There is limited mobile connectivity — which most of our guests find to be the greatest luxury of all. We provide basic Wi-Fi in the main pavilion for essential communication. Hakki Goodu is a place to disconnect and be present.",
  },
  {
    q: "What is the nearest airport or railway station?",
    a: "The nearest major airport is Bengaluru Kempegowda International Airport (approximately 3–4 hours by road). The nearest railway station is Mysore Junction (approximately 1.5 hours). We can arrange private transfers on request.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellations made 7 or more days before arrival receive a full refund. Cancellations within 7 days receive a 50% refund. No-shows and same-day cancellations are non-refundable. We recommend travel insurance for added peace of mind.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#6B4F3A]/12 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="text-base font-semibold text-[#2C2C2C] group-hover:text-[#2F4F3E] transition-colors duration-300 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {q}
        </span>
        <span className="flex-shrink-0 w-8 h-8 border border-[#6B4F3A]/25 flex items-center justify-center text-[#6B4F3A] group-hover:bg-[#2F4F3E] group-hover:text-white group-hover:border-[#2F4F3E] transition-all duration-300">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#2C2C2C]/60 leading-7 pb-6 pr-14">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="section-pad bg-[#FAF7F2]">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          {/* Left — Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" as const }}
            className="lg:sticky lg:top-28"
          >
            <p className="section-label mb-5">FAQ</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#2C2C2C] leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Questions,{" "}
              <em className="italic text-[#2F4F3E]">Answered</em>
            </h2>
            <p className="text-sm text-[#2C2C2C]/55 leading-7 mb-8">
              Everything you need to know before your stay. If your question isn&apos;t answered here, our team is always a message away.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase font-medium text-[#2F4F3E] hover:text-[#B56A4A] transition-colors duration-300 group"
            >
              Ask Us Directly
              <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-400" />
            </a>
          </motion.div>

          {/* Right — Accordions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" as const }}
          >
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

