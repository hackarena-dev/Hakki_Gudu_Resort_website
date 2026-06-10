"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, Users, Calendar, Home, MessageSquare,
  Check, Star, Minus, Plus, Leaf, Wifi, Coffee, Utensils, Waves
} from "lucide-react";

/* ── Types ── */
type Room = {
  id: string;
  name: string;
  tier: string;
  price: number;
  guests: string;
  image: string;
  desc: string;
  features: string[];
};

type FormData = {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  room: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
};

/* ── Data ── */
const ROOMS: Room[] = [
  {
    id: "canopy",
    name: "Forest Canopy Villa",
    tier: "Signature",
    price: 18500,
    guests: "2–4 Guests",
    image: "/villa.png",
    desc: "Private infinity plunge pool, panoramic forest deck, handcrafted teak interiors.",
    features: ["Private Pool", "Forest Deck", "King Bed", "Rain Shower"],
  },
  {
    id: "riverside",
    name: "Riverside Nest Suite",
    tier: "Deluxe",
    price: 12000,
    guests: "2 Guests",
    image: "/room.png",
    desc: "Floor-to-ceiling stream windows, handwoven furnishings, private courtyard garden.",
    features: ["Stream View", "Courtyard", "Bamboo Lounge", "Artisan Bath"],
  },
  {
    id: "treetop",
    name: "The Treetop Loft",
    tier: "Adventure",
    price: 9500,
    guests: "2 Guests",
    image: "/about.png",
    desc: "15 feet above ground, skylight stargazing, wraparound balcony, wood stove.",
    features: ["Skylight", "Balcony", "Hammock", "Wood Stove"],
  },
];

const STEPS = ["Dates & Guests", "Choose Room", "Your Details", "Confirm"];

function getNights(checkin: string, checkout: string) {
  if (!checkin || !checkout) return 0;
  const d1 = new Date(checkin), d2 = new Date(checkout);
  return Math.max(0, Math.round((d2.getTime() - d1.getTime()) / 86400000));
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    checkin: "", checkout: "", adults: 2, children: 0,
    room: "", name: "", email: "", phone: "", requests: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const selectedRoom = ROOMS.find((r) => r.id === form.room);
  const nights = getNights(form.checkin, form.checkout);
  const subtotal = selectedRoom ? selectedRoom.price * Math.max(nights, 1) : 0;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  const set = (key: keyof FormData, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 0) return form.checkin && form.checkout && nights > 0;
    if (step === 1) return !!form.room;
    if (step === 2) return form.name && form.email && form.phone;
    return true;
  };

  const next = () => {
    if (!canNext()) return;
    if (step === 3) { setConfirmed(true); return; }
    setStep((s) => s + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const back = () => { setStep((s) => Math.max(0, s - 1)); topRef.current?.scrollIntoView({ behavior: "smooth" }); };

  if (confirmed) return <ConfirmationScreen form={form} room={selectedRoom!} nights={nights} total={total} />;

  return (
    <div className="min-h-screen bg-[#FAF7F2]" ref={topRef}>
      {/* ── Booking Hero ── */}
      <div className="relative h-52 md:h-64 overflow-hidden">
        <Image src="/hero.png" alt="The Nest booking" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#1e3329]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <Link href="/" className="absolute top-5 left-5 md:left-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs tracking-widest uppercase">
            <ChevronLeft size={14} /> Back to Home
          </Link>
          <p className="section-label text-[#C9A96E] mb-3">Private Nature Retreat</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff' }}>
            Reserve Your Nest
          </h1>
        </div>
      </div>

      {/* ── Step Progress ── */}
      <div className="bg-white border-b border-[#6B4F3A]/10">
        <div className="container-luxury py-4">
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    i < step ? "bg-[#2F4F3E] text-white" :
                    i === step ? "bg-[#2F4F3E] text-white ring-2 ring-[#2F4F3E]/25 ring-offset-2" :
                    "bg-[#F5F1E8] text-[#6B4F3A]/50"
                  }`}>
                    {i < step ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={`hidden sm:block text-xs tracking-wide transition-colors ${i === step ? "text-[#2F4F3E] font-medium" : "text-[#6B4F3A]/50"}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 md:w-16 h-px mx-3 transition-colors ${i < step ? "bg-[#2F4F3E]" : "bg-[#6B4F3A]/15"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container-luxury py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          {/* Left — Step Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: "easeOut" as const }}
              >
                {step === 0 && <StepDates form={form} set={set} nights={nights} />}
                {step === 1 && <StepRooms form={form} set={set} rooms={ROOMS} />}
                {step === 2 && <StepDetails form={form} set={set} />}
                {step === 3 && <StepConfirm form={form} room={selectedRoom!} nights={nights} subtotal={subtotal} tax={tax} total={total} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-7 border-t border-[#6B4F3A]/12">
              {step > 0 ? (
                <button onClick={back} className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#6B4F3A] hover:text-[#2F4F3E] transition-colors">
                  <ChevronLeft size={14} /> Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={next}
                disabled={!canNext()}
                className="px-10 py-3.5 bg-[#2F4F3E] text-white text-[0.67rem] tracking-[0.25em] uppercase font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#6B4F3A] transition-all duration-400"
              >
                {step === 3 ? "Confirm Reservation" : "Continue"}
              </button>
            </div>
          </div>

          {/* Right — Booking Summary */}
          <div className="lg:sticky lg:top-28">
            <BookingSummary form={form} room={selectedRoom} nights={nights} subtotal={subtotal} tax={tax} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ STEP 1: Dates & Guests ═══ */
function StepDates({ form, set, nights }: { form: FormData; set: (k: keyof FormData, v: string | number) => void; nights: number }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        When Are You Visiting?
      </h2>
      <p className="text-sm text-[#6B4F3A]/60 mb-8">Select your dates and number of guests.</p>

      {/* Date Pickers */}
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {[
          { label: "Check-In Date", key: "checkin" as const, min: today },
          { label: "Check-Out Date", key: "checkout" as const, min: form.checkin || today },
        ].map(({ label, key, min }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#6B4F3A] font-medium flex items-center gap-1.5">
              <Calendar size={11} /> {label}
            </label>
            <input
              type="date"
              min={min}
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              className="input-luxury-box"
            />
          </div>
        ))}
      </div>

      {/* Nights display */}
      {nights > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 p-4 bg-[#2F4F3E]/8 border border-[#2F4F3E]/20"
        >
          <Check size={14} className="text-[#2F4F3E]" />
          <p className="text-sm text-[#2F4F3E] font-medium">{nights} night{nights !== 1 ? "s" : ""} selected</p>
        </motion.div>
      )}

      {/* Guest Pickers */}
      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { label: "Adults", key: "adults" as const, min: 1, max: 20 },
          { label: "Children (under 12)", key: "children" as const, min: 0, max: 10 },
        ].map(({ label, key, min, max }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#6B4F3A] font-medium flex items-center gap-1.5">
              <Users size={11} /> {label}
            </label>
            <div className="flex items-center border border-[#6B4F3A]/20 bg-[#F5F1E8]">
              <button
                onClick={() => set(key, Math.max(min, (form[key] as number) - 1))}
                className="w-11 h-11 flex items-center justify-center text-[#6B4F3A] hover:bg-[#6B4F3A]/10 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="flex-1 text-center text-sm font-medium text-[#2C2C2C]">{form[key]}</span>
              <button
                onClick={() => set(key, Math.min(max, (form[key] as number) + 1))}
                className="w-11 h-11 flex items-center justify-center text-[#6B4F3A] hover:bg-[#6B4F3A]/10 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ STEP 2: Room Selection ═══ */
function StepRooms({ form, set, rooms }: { form: FormData; set: (k: keyof FormData, v: string | number) => void; rooms: Room[] }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Choose Your Sanctuary
      </h2>
      <p className="text-sm text-[#6B4F3A]/60 mb-8">All villas are exclusively yours for the duration of your stay.</p>

      <div className="flex flex-col gap-5">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ y: -2 }}
            onClick={() => set("room", room.id)}
            className={`flex gap-0 border-2 overflow-hidden cursor-pointer transition-all duration-400 ${
              form.room === room.id ? "border-[#2F4F3E] shadow-xl" : "border-[#6B4F3A]/15 hover:border-[#6B4F3A]/40"
            }`}
          >
            {/* Image */}
            <div className="relative w-32 sm:w-44 flex-shrink-0">
              <Image src={room.image} alt={room.name} fill className="object-cover" sizes="176px" />
              {form.room === room.id && (
                <div className="absolute inset-0 bg-[#2F4F3E]/25 flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#2F4F3E] flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                </div>
              )}
            </div>
            {/* Content */}
            <div className="flex-1 p-5 bg-white">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B56A4A] font-medium">{room.tier}</span>
                  <h3 className="text-base font-bold text-[#2C2C2C] mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#6B4F3A]/60 mt-0.5">{room.guests}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-[#2F4F3E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ₹{room.price.toLocaleString()}
                  </p>
                  <p className="text-[0.58rem] text-[#6B4F3A]/50">per night</p>
                </div>
              </div>
              <p className="text-xs text-[#6B4F3A]/60 leading-relaxed mb-3 hidden sm:block">{room.desc}</p>
              <div className="flex flex-wrap gap-2">
                {room.features.map((f) => (
                  <span key={f} className="px-2 py-0.5 bg-[#F5F1E8] text-[0.58rem] tracking-wide text-[#6B4F3A]">{f}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══ STEP 3: Guest Details ═══ */
function StepDetails({ form, set }: { form: FormData; set: (k: keyof FormData, v: string | number) => void }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Tell Us About You
      </h2>
      <p className="text-sm text-[#6B4F3A]/60 mb-8">Your details are kept private and secure.</p>

      <div className="grid sm:grid-cols-2 gap-7 mb-7">
        {[
          { label: "Full Name", key: "name" as const, type: "text", placeholder: "Your full name" },
          { label: "Phone Number", key: "phone" as const, type: "tel", placeholder: "+91 00000 00000" },
          { label: "Email Address", key: "email" as const, type: "email", placeholder: "you@example.com" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} className={`flex flex-col gap-2 ${key === "email" ? "sm:col-span-2" : ""}`}>
            <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#6B4F3A] font-medium">
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[key] as string}
              onChange={(e) => set(key, e.target.value)}
              required
              className="input-luxury"
            />
          </div>
        ))}
      </div>

      {/* Special requests */}
      <div className="flex flex-col gap-2">
        <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#6B4F3A] font-medium flex items-center gap-1.5">
          <MessageSquare size={11} /> Special Requests (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Anniversary setups, dietary preferences, arrival time, accessibility needs..."
          value={form.requests}
          onChange={(e) => set("requests", e.target.value)}
          className="input-luxury resize-none"
        />
      </div>

      {/* Note */}
      <div className="mt-7 flex items-start gap-3 p-4 bg-[#2F4F3E]/6 border border-[#2F4F3E]/15">
        <Leaf size={14} className="text-[#2F4F3E] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#2F4F3E]/75 leading-relaxed">
          Our team personally reviews every reservation request and will respond within 24 hours to confirm your booking and answer any questions.
        </p>
      </div>
    </div>
  );
}

/* ═══ STEP 4: Confirmation Preview ═══ */
function StepConfirm({ form, room, nights, subtotal, tax, total }: {
  form: FormData; room: Room | undefined; nights: number;
  subtotal: number; tax: number; total: number;
}) {
  const fmt = (d: string) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Review Your Reservation
      </h2>
      <p className="text-sm text-[#6B4F3A]/60 mb-8">Please review your details before confirming.</p>

      <div className="flex flex-col gap-5">
        {/* Stay Details */}
        {[
          { label: "Check-In", value: fmt(form.checkin) },
          { label: "Check-Out", value: fmt(form.checkout) },
          { label: "Duration", value: `${nights} night${nights !== 1 ? "s" : ""}` },
          { label: "Guests", value: `${form.adults} adults${form.children ? `, ${form.children} children` : ""}` },
          { label: "Villa", value: room?.name || "—" },
          { label: "Guest Name", value: form.name || "—" },
          { label: "Contact", value: form.phone || "—" },
          { label: "Email", value: form.email || "—" },
          ...(form.requests ? [{ label: "Special Requests", value: form.requests }] : []),
        ].map(({ label, value }) => (
          <div key={label} className="flex gap-4 py-3 border-b border-[#6B4F3A]/10 last:border-0">
            <span className="w-36 flex-shrink-0 text-xs font-medium text-[#6B4F3A]/60 uppercase tracking-wide">{label}</span>
            <span className="text-sm text-[#2C2C2C] leading-relaxed">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#F5F1E8] border border-[#6B4F3A]/15">
        <p className="text-[0.65rem] text-[#6B4F3A]/60 leading-5">
          By confirming, you agree to The Nest&apos;s cancellation policy. Full payment details and confirmation will be sent to your email within 24 hours. No payment is processed at this step.
        </p>
      </div>
    </div>
  );
}

/* ═══ BOOKING SUMMARY SIDEBAR ═══ */
function BookingSummary({ form, room, nights, subtotal, tax, total }: {
  form: FormData; room: Room | undefined; nights: number;
  subtotal: number; tax: number; total: number;
}) {
  const fmt = (d: string) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—";

  return (
    <div className="bg-white border border-[#6B4F3A]/15 overflow-hidden">
      {/* Thumb */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={room?.image || "/hero.png"}
          alt={room?.name || "The Nest"}
          fill
          className="object-cover transition-all duration-700"
          sizes="360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3329]/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[0.58rem] tracking-[0.3em] text-[#C9A96E] uppercase mb-0.5">
            {room?.tier || "Your Stay"}
          </p>
          <p className="text-base font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {room?.name || "Select a villa to continue"}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Dates */}
        {form.checkin && form.checkout && (
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-[#6B4F3A]/10">
            <div className="text-center">
              <p className="text-[0.55rem] tracking-widest uppercase text-[#6B4F3A]/50 mb-1">Check-In</p>
              <p className="text-sm font-semibold text-[#2C2C2C]">{fmt(form.checkin)}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-px bg-[#C9A96E]" />
              <p className="text-[0.58rem] text-[#6B4F3A]/50">{nights}N</p>
            </div>
            <div className="text-center">
              <p className="text-[0.55rem] tracking-widest uppercase text-[#6B4F3A]/50 mb-1">Check-Out</p>
              <p className="text-sm font-semibold text-[#2C2C2C]">{fmt(form.checkout)}</p>
            </div>
          </div>
        )}

        {/* Guests */}
        {form.adults > 0 && (
          <div className="flex items-center gap-2 mb-5 text-xs text-[#6B4F3A]/60">
            <Users size={13} />
            {form.adults} adult{form.adults !== 1 ? "s" : ""}{form.children > 0 ? `, ${form.children} child${form.children !== 1 ? "ren" : ""}` : ""}
          </div>
        )}

        {/* Price breakdown */}
        {room && nights > 0 && (
          <div className="flex flex-col gap-3 pt-4 border-t border-[#6B4F3A]/10">
            <div className="flex justify-between text-xs text-[#6B4F3A]/70">
              <span>₹{room.price.toLocaleString()} × {nights} night{nights !== 1 ? "s" : ""}</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-[#6B4F3A]/70">
              <span>GST (12%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#2C2C2C] pt-3 border-t border-[#6B4F3A]/10">
              <span>Total</span>
              <span className="text-[#2F4F3E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Inclusions */}
        <div className="mt-6 pt-5 border-t border-[#6B4F3A]/10">
          <p className="text-[0.58rem] tracking-[0.3em] uppercase text-[#6B4F3A]/50 mb-3">All Stays Include</p>
          <div className="flex flex-col gap-2">
            {(
              [
                { icon: Leaf,   text: "Farm-to-table meals (all day)" },
                { icon: Coffee, text: "Morning chai & coffee" },
                { icon: Waves,  text: "Stream & nature access" },
                { icon: Star,   text: "Bonfire & stargazing" },
              ] as { icon: React.ElementType; text: string }[]
            ).map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-[#6B4F3A]/65">
                <Icon size={11} className="text-[#2F4F3E] flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ CONFIRMATION SCREEN ═══ */
function ConfirmationScreen({ form, room, nights, total }: {
  form: FormData; room: Room; nights: number; total: number;
}) {
  const ref = `TNR-${Date.now().toString(36).toUpperCase()}`;
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="bg-white border border-[#6B4F3A]/15 max-w-lg w-full p-10 text-center shadow-2xl"
      >
        {/* Check circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-[#2F4F3E] flex items-center justify-center mx-auto mb-7"
        >
          <Check size={28} className="text-white" strokeWidth={2.5} />
        </motion.div>

        <h2 className="text-3xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Request Received!
        </h2>
        <p className="text-sm text-[#6B4F3A]/65 leading-relaxed mb-8">
          Thank you, <strong>{form.name}</strong>. Your reservation request for{" "}
          <strong>{room.name}</strong> has been received. Our team will contact you at{" "}
          <strong>{form.email}</strong> within 24 hours to confirm your stay.
        </p>

        <div className="bg-[#F5F1E8] p-5 mb-8">
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#6B4F3A]/60 mb-3">Reservation Reference</p>
          <p className="text-xl font-bold text-[#2F4F3E] tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
            {ref}
          </p>
          <p className="text-xs text-[#6B4F3A]/50 mt-2">{nights} nights · ₹{total.toLocaleString()} total</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 border border-[#2F4F3E] text-[#2F4F3E] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#2F4F3E] hover:text-white transition-all duration-400"
          >
            Return Home
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#2F4F3E] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#6B4F3A] transition-all duration-400"
          >
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </div>
  );
}

