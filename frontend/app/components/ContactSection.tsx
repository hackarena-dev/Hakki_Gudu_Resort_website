"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    villa: "",
    checkin: "",
    checkout: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #2c1a0e 0%, #1a0f08 100%)" }}
    >
      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full border border-[#d4a855]/05"
          style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
        />
        <div
          className="w-[900px] h-[900px] rounded-full border border-[#d4a855]/03"
          style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="w-12 h-px bg-[#d4a855]" />
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-[#d4a855] font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Begin Your Journey
            </span>
            <div className="w-12 h-px bg-[#d4a855]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Reserve Your Nest
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-sm text-white/50 font-light max-w-md mx-auto"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Complete the form below and our team will personally respond within
            24 hours to confirm your reservation.
          </motion.p>
        </div>

        {/* Form */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto border border-[#d4a855] flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" stroke="#d4a855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3
              className="text-3xl font-light text-white mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your request has been received
            </h3>
            <p className="text-sm text-white/50 font-light" style={{ fontFamily: "'Jost', sans-serif" }}>
              Our team will reach out to you within 24 hours. We look forward to welcoming you to The Nest.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          >
            {/* Form inputs */}
            {[
              { name: "name", label: "Full Name", type: "text", placeholder: "Your name", colSpan: 1 },
              { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com", colSpan: 1 },
              { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 00000 00000", colSpan: 1 },
              { name: "guests", label: "Number of Guests", type: "number", placeholder: "2", colSpan: 1 },
              { name: "checkin", label: "Check-in Date", type: "date", placeholder: "", colSpan: 1 },
              { name: "checkout", label: "Check-out Date", type: "date", placeholder: "", colSpan: 1 },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label
                  htmlFor={field.name}
                  className="text-[10px] tracking-[0.3em] uppercase text-[#d4a855] font-light"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="bg-transparent border border-white/15 text-white placeholder-white/20 px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#d4a855] transition-colors duration-300"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              </div>
            ))}

            {/* Villa Select */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                htmlFor="villa"
                className="text-[10px] tracking-[0.3em] uppercase text-[#d4a855] font-light"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Preferred Villa
              </label>
              <select
                id="villa"
                name="villa"
                value={formData.villa}
                onChange={handleChange}
                className="bg-[#2c1a0e] border border-white/15 text-white/70 px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#d4a855] transition-colors duration-300 appearance-none"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                <option value="" disabled>Select your villa...</option>
                <option value="canopy">Forest Canopy Villa — ₹18,500/night</option>
                <option value="riverside">Riverside Nest Suite — ₹12,000/night</option>
                <option value="treetop">The Treetop Loft — ₹9,500/night</option>
                <option value="any">Any — Please recommend</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                htmlFor="message"
                className="text-[10px] tracking-[0.3em] uppercase text-[#d4a855] font-light"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Special Requests
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Anniversaries, dietary needs, accessibility requirements..."
                value={formData.message}
                onChange={handleChange}
                className="bg-transparent border border-white/15 text-white placeholder-white/20 px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#d4a855] transition-colors duration-300 resize-none"
                style={{ fontFamily: "'Jost', sans-serif" }}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04, backgroundColor: "#e8c97a" }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto px-16 py-4 bg-[#d4a855] text-[#1a0f08] text-xs tracking-[0.35em] uppercase font-medium transition-colors duration-400"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Send Reservation Request
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:mt-24 pt-10 border-t border-white/10"
        >
          {[
            { label: "Call Us", value: "+91 98765 43210", sub: "Mon – Sun, 8am to 8pm" },
            { label: "Write to Us", value: "hello@thenest.in", sub: "We respond within 24 hours" },
            { label: "Find Us", value: "Coorg, Karnataka", sub: "3 hrs from Bengaluru" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div
                className="text-[10px] tracking-[0.35em] uppercase text-[#d4a855] mb-2 font-light"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {item.label}
              </div>
              <div
                className="text-white font-light text-sm mb-1"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {item.value}
              </div>
              <div
                className="text-white/35 text-xs font-light"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
