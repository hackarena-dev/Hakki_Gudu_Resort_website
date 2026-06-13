"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, Users, Calendar, MessageSquare,
  Check, Star, Minus, Plus, Leaf, Coffee, Waves,
  CreditCard, Coins, Loader2, AlertTriangle
} from "lucide-react";
import { apiService, UnavailableRange } from "../../lib/api";

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

const STEPS = ["Dates & Guests", "Choose Room", "Your Details", "Confirm & Pay"];

function getNights(checkin: string, checkout: string) {
  if (!checkin || !checkout) return 0;
  const d1 = new Date(checkin), d2 = new Date(checkout);
  return Math.max(0, Math.round((d2.getTime() - d1.getTime()) / 86400000));
}

// Dynamically load Razorpay SDK script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    checkin: "", checkout: "", adults: 2, children: 0,
    room: "", name: "", email: "", phone: "", requests: "",
  });

  // API Integration States
  const [unavailableRanges, setUnavailableRanges] = useState<UnavailableRange[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [reservationId, setReservationId] = useState("");

  const topRef = useRef<HTMLDivElement>(null);

  const selectedRoom = ROOMS.find((r) => r.id === form.room);
  const nights = getNights(form.checkin, form.checkout);
  const subtotal = selectedRoom ? selectedRoom.price * Math.max(nights, 1) : 0;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  const set = (key: keyof FormData, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  // Fetch availability when check-in or check-out dates change
  useEffect(() => {
    const fetchBlockedDates = async () => {
      if (!form.checkin) return;
      
      setLoadingAvailability(true);
      setAvailabilityError(null);
      
      try {
        // Parse the month format (YYYY-MM)
        const checkinMonth = form.checkin.substring(0, 7);
        const data = await apiService.fetchAvailability(checkinMonth);
        
        let combinedRanges = [...data.unavailable_ranges];
        
        // If checkout is in a different month, load that month's availability too
        if (form.checkout) {
          const checkoutMonth = form.checkout.substring(0, 7);
          if (checkoutMonth !== checkinMonth) {
            const extraData = await apiService.fetchAvailability(checkoutMonth);
            combinedRanges = [...combinedRanges, ...extraData.unavailable_ranges];
          }
        }
        
        setUnavailableRanges(combinedRanges);
      } catch (err: any) {
        setAvailabilityError("Unable to retrieve calendar availability. Please check your connection.");
      } finally {
        setLoadingAvailability(false);
      }
    };

    fetchBlockedDates();
  }, [form.checkin, form.checkout]);

  // Check if selected range overlaps with any blocked dates
  const isDateRangeOverlapping = () => {
    if (!form.checkin || !form.checkout) return false;
    
    const checkinDate = new Date(form.checkin);
    const checkoutDate = new Date(form.checkout);
    
    return unavailableRanges.some((range) => {
      const blockedStart = new Date(range.check_in);
      const blockedEnd = new Date(range.check_out);
      
      // Standard date overlap check: start1 < end2 AND end1 > start2
      return checkinDate < blockedEnd && checkoutDate > blockedStart;
    });
  };

  const canNext = () => {
    if (step === 0) {
      return (
        form.checkin &&
        form.checkout &&
        nights > 0 &&
        !isDateRangeOverlapping() &&
        !loadingAvailability
      );
    }
    if (step === 1) return !!form.room;
    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        form.name.trim().length >= 2 &&
        emailRegex.test(form.email) &&
        form.phone.trim().length >= 10 &&
        form.phone.trim().length <= 15
      );
    }
    return true;
  };

  const next = async () => {
    if (!canNext()) return;
    
    // If we are on the final confirmation step, run checkout logic
    if (step === 3) {
      handleCheckout();
      return;
    }
    
    setStep((s) => s + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    setSubmitError(null);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Main payment and checkout implementation
  const handleCheckout = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      check_in: form.checkin,
      check_out: form.checkout,
      guest_name: form.name,
      guest_email: form.email,
      guest_phone: form.phone,
      num_guests: form.adults + form.children,
    };

    if (paymentMethod === "cash") {
      // Direct Cash Booking
      try {
        const response = await apiService.bookCash(payload);
        setBookingRef(response.booking_ref);
        setReservationId(response.reservation_id);
        setConfirmed(true);
      } catch (err: any) {
        setSubmitError(err.message || "Failed to confirm cash booking. Please try again.");
      } finally {
        setSubmitting(false);
      }
    } else {
      // Online Payment via Razorpay
      try {
        // Step 1: Create room hold
        const holdRes = await apiService.createHold(payload);
        const resId = holdRes.reservation_id;
        setReservationId(resId);

        // Step 2: Create Razorpay Order
        const orderRes = await apiService.createOrder(resId);

        // Step 3: Load Razorpay SDK Script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Unable to load payment portal script. Check your internet connection.");
        }

        // Step 4: Open Razorpay checkout overlay
        const options = {
          key: orderRes.key_id,
          amount: orderRes.amount_paise,
          currency: "INR",
          name: "Hakki Gudu Resort",
          description: "Private Forest sanctuary stay booking",
          order_id: orderRes.razorpay_order_id,
          image: "/logo.png",
          handler: async function (paymentResponse: any) {
            setSubmitting(true);
            try {
              // Step 5: Verify payment signature
              await apiService.verifyPayment({
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              });
              
              setBookingRef(`RST-${new Date().getFullYear()}-PAID`);
              setConfirmed(true);
            } catch (verifyErr: any) {
              setSubmitError("Payment was successful but verification failed. Please contact support.");
            } finally {
              setSubmitting(false);
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          notes: {
            reservation_id: resId,
          },
          theme: {
            color: "#2F4F3E", // Custom Forest Green theme matching the resort
          },
          modal: {
            ondismiss: function () {
              setSubmitting(false);
              setSubmitError("Payment window was closed. Stays are held for 10 minutes.");
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err: any) {
        setSubmitError(err.message || "Failed to initialize secure checkout. Please try again.");
        setSubmitting(false);
      }
    }
  };

  if (confirmed) {
    return (
      <ConfirmationScreen
        form={form}
        room={selectedRoom!}
        nights={nights}
        total={total}
        bookingRef={bookingRef}
        reservationId={reservationId}
        paymentMethod={paymentMethod}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]" ref={topRef}>
      {/* ── Booking Hero ── */}
      <div className="relative h-52 md:h-64 overflow-hidden">
        <Image src="/hero.png" alt="Hakki Goodu booking" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-[#1e3329]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <Link href="/" className="absolute top-5 left-5 md:left-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs tracking-widest uppercase">
            <ChevronLeft size={14} /> Back to Home
          </Link>
          <p className="section-label text-[#B98958] mb-3">Private Nature Retreat</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">
            Reserve Your Nest
          </h1>
        </div>
      </div>

      {/* ── Step Progress ── */}
      <div className="bg-white border-b border-[#8B5A3C]/10">
        <div className="container-luxury py-4">
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    i < step ? "bg-[#2F4F3E] text-white" :
                    i === step ? "bg-[#2F4F3E] text-white ring-2 ring-[#2F4F3E]/25 ring-offset-2" :
                    "bg-[#F5F1E8] text-[#8B5A3C]/50"
                  }`}>
                    {i < step ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={`hidden sm:block text-xs tracking-wide transition-colors ${i === step ? "text-[#2F4F3E] font-medium" : "text-[#8B5A3C]/50"}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 md:w-16 h-px mx-3 transition-colors ${i < step ? "bg-[#2F4F3E]" : "bg-[#8B5A3C]/15"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container-luxury py-10 lg:py-14">
        
        {submitError && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-[#B56A4A]/10 border border-[#B56A4A]/30 text-[#B56A4A] text-sm flex items-start gap-2.5">
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold mb-0.5">Booking Error</h4>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          {/* Left — Step Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {step === 0 && (
                  <StepDates
                    form={form}
                    set={set}
                    nights={nights}
                    loading={loadingAvailability}
                    error={availabilityError}
                    isOverlapping={isDateRangeOverlapping()}
                  />
                )}
                {step === 1 && <StepRooms form={form} set={set} rooms={ROOMS} />}
                {step === 2 && <StepDetails form={form} set={set} />}
                {step === 3 && (
                  <StepConfirm
                    form={form}
                    room={selectedRoom!}
                    nights={nights}
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-7 border-t border-[#8B5A3C]/12">
              {step > 0 ? (
                <button
                  onClick={back}
                  disabled={submitting}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8B5A3C] hover:text-[#2F4F3E] transition-colors disabled:opacity-40"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={next}
                disabled={!canNext() || submitting}
                className="px-10 py-3.5 bg-[#8B5A3C] text-white text-[0.67rem] tracking-[0.25em] uppercase font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#A9724F] transition-all duration-400 flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : step === 3 ? (
                  paymentMethod === "cash" ? "Confirm Cash Booking" : "Proceed to Payment"
                ) : (
                  "Continue"
                )}
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
function StepDates({
  form,
  set,
  nights,
  loading,
  error,
  isOverlapping,
}: {
  form: FormData;
  set: (k: keyof FormData, v: string | number) => void;
  nights: number;
  loading: boolean;
  error: string | null;
  isOverlapping: boolean;
}) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2 font-serif">
        When Are You Visiting?
      </h2>
      <p className="text-sm text-[#8B5A3C]/60 mb-8">Select your dates and number of guests.</p>

      {error && (
        <div className="mb-6 p-4 bg-[#B56A4A]/10 border border-[#B56A4A]/20 text-xs text-[#B56A4A]">
          {error}
        </div>
      )}

      {/* Date Pickers */}
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {[
          { label: "Check-In Date", key: "checkin" as const, min: today },
          { label: "Check-Out Date", key: "checkout" as const, min: form.checkin || today },
        ].map(({ label, key, min }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#8B5A3C] font-medium flex items-center gap-1.5">
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

      {/* Overlap & Load Alerts */}
      {loading && (
        <div className="flex items-center gap-2 mb-8 text-xs text-[#8B5A3C]">
          <Loader2 size={13} className="animate-spin text-[#2F4F3E]" />
          Checking resort availability...
        </div>
      )}

      {isOverlapping && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 mb-8 p-4 bg-[#B56A4A]/10 border border-[#B56A4A]/25 text-[#B56A4A]"
        >
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold uppercase tracking-wider mb-0.5">Dates Unavailable</p>
            <p className="opacity-95">The selected check-in/check-out range overlaps with a locked or confirmed stay. Please choose another interval.</p>
          </div>
        </motion.div>
      )}

      {nights > 0 && !isOverlapping && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 p-4 bg-[#2F4F3E]/8 border border-[#2F4F3E]/20"
        >
          <Check size={14} className="text-[#2F4F3E]" />
          <p className="text-sm text-[#2F4F3E] font-medium">{nights} night{nights !== 1 ? "s" : ""} selected (Dates Available)</p>
        </motion.div>
      )}

      {/* Guest Pickers */}
      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { label: "Adults", key: "adults" as const, min: 1, max: 20 },
          { label: "Children (under 12)", key: "children" as const, min: 0, max: 10 },
        ].map(({ label, key, min, max }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#8B5A3C] font-medium flex items-center gap-1.5">
              <Users size={11} /> {label}
            </label>
            <div className="flex items-center border border-[#8B5A3C]/20 bg-[#F5F1E8]">
              <button
                type="button"
                onClick={() => set(key, Math.max(min, (form[key] as number) - 1))}
                className="w-11 h-11 flex items-center justify-center text-[#8B5A3C] hover:bg-[#8B5A3C]/10 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="flex-1 text-center text-sm font-medium text-[#2C2C2C]">{form[key]}</span>
              <button
                type="button"
                onClick={() => set(key, Math.min(max, (form[key] as number) + 1))}
                className="w-11 h-11 flex items-center justify-center text-[#8B5A3C] hover:bg-[#8B5A3C]/10 transition-colors"
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
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2 font-serif">
        Choose Your Sanctuary
      </h2>
      <p className="text-sm text-[#8B5A3C]/60 mb-8">All villas are exclusively yours for the duration of your stay.</p>

      <div className="flex flex-col gap-5">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ y: -2 }}
            onClick={() => set("room", room.id)}
            className={`flex gap-0 border-2 overflow-hidden cursor-pointer transition-all duration-400 ${
              form.room === room.id ? "border-[#2F4F3E] shadow-xl" : "border-[#8B5A3C]/15 hover:border-[#8B5A3C]/40"
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
                  <h3 className="text-base font-bold text-[#2C2C2C] mt-0.5 font-serif">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#8B5A3C]/60 mt-0.5">{room.guests}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-[#2F4F3E] font-serif">
                    ₹{room.price.toLocaleString()}
                  </p>
                  <p className="text-[0.58rem] text-[#8B5A3C]/50">per night</p>
                </div>
              </div>
              <p className="text-xs text-[#8B5A3C]/60 leading-relaxed mb-3 hidden sm:block">{room.desc}</p>
              <div className="flex flex-wrap gap-2">
                {room.features.map((f) => (
                  <span key={f} className="px-2 py-0.5 bg-[#F5F1E8] text-[0.58rem] tracking-wide text-[#8B5A3C]">{f}</span>
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
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2 font-serif">
        Tell Us About You
      </h2>
      <p className="text-sm text-[#8B5A3C]/60 mb-8">Your details are kept private and secure.</p>

      <div className="grid sm:grid-cols-2 gap-7 mb-7">
        {[
          { label: "Full Name", key: "name" as const, type: "text", placeholder: "Your full name" },
          { label: "Phone Number", key: "phone" as const, type: "tel", placeholder: "+91 00000 00000" },
          { label: "Email Address", key: "email" as const, type: "email", placeholder: "you@example.com" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} className={`flex flex-col gap-2 ${key === "email" ? "sm:col-span-2" : ""}`}>
            <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#8B5A3C] font-semibold">
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
        <label className="text-[0.6rem] tracking-[0.35em] uppercase text-[#8B5A3C] font-medium flex items-center gap-1.5">
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

/* ═══ STEP 4: Confirmation Preview & Payment Selector ═══ */
function StepConfirm({
  form,
  room,
  nights,
  subtotal,
  tax,
  total,
  paymentMethod,
  setPaymentMethod,
}: {
  form: FormData;
  room: Room;
  nights: number;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "online" | "cash";
  setPaymentMethod: (method: "online" | "cash") => void;
}) {
  const fmt = (d: string) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-2 font-serif">
          Review & Confirm
        </h2>
        <p className="text-sm text-[#8B5A3C]/60">Please review your stay and select a secure checkout method.</p>
      </div>

      <div className="flex flex-col gap-4 border-b border-[#8B5A3C]/10 pb-6">
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
          <div key={label} className="flex gap-4 py-1.5">
            <span className="w-32 flex-shrink-0 text-xs font-semibold text-[#8B5A3C]/60 uppercase tracking-wider">{label}</span>
            <span className="text-sm text-[#2C2C2C] font-medium leading-relaxed">{value}</span>
          </div>
        ))}
      </div>

      {/* ── Payment Selector Card ── */}
      <div className="space-y-4">
        <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B5A3C] font-bold">
          Choose Payment Method
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          
          {/* Online Payment Card */}
          <div
            onClick={() => setPaymentMethod("online")}
            className={`p-5 border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
              paymentMethod === "online"
                ? "bg-[#2F4F3E]/6 border-[#2F4F3E] shadow-md"
                : "bg-white border-[#8B5A3C]/15 hover:border-[#8B5A3C]/30"
            }`}
          >
            <div className={`p-2.5 rounded-full ${paymentMethod === "online" ? "bg-[#2F4F3E]/15 text-[#2F4F3E]" : "bg-[#FAF7F2] text-[#8B5A3C]"}`}>
              <CreditCard size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#2C2C2C]">Pay Securely Online</p>
              <p className="text-xs text-[#8B5A3C]/60 mt-1 leading-relaxed">
                Credit/Debit Cards, UPI, Net Banking via secure Razorpay interface.
              </p>
            </div>
          </div>

          {/* Cash Payment Card */}
          <div
            onClick={() => setPaymentMethod("cash")}
            className={`p-5 border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
              paymentMethod === "cash"
                ? "bg-[#2F4F3E]/6 border-[#2F4F3E] shadow-md"
                : "bg-white border-[#8B5A3C]/15 hover:border-[#8B5A3C]/30"
            }`}
          >
            <div className={`p-2.5 rounded-full ${paymentMethod === "cash" ? "bg-[#2F4F3E]/15 text-[#2F4F3E]" : "bg-[#FAF7F2] text-[#8B5A3C]"}`}>
              <Coins size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#2C2C2C]">Pay Cash On-site</p>
              <p className="text-xs text-[#8B5A3C]/60 mt-1 leading-relaxed">
                Confirm your stay and settle payment at the resort reception desk.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="p-4 bg-[#FAF7F2] border border-[#8B5A3C]/15 text-[0.65rem] text-[#8B5A3C]/70 leading-5">
        By clicking to confirm your stay, you agree to Hakki Goodu nature retreat's terms and cancellation policies. A confirmation copy will be sent to <strong>{form.email}</strong>.
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
    <div className="bg-white border border-[#8B5A3C]/15 overflow-hidden">
      {/* Thumb */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={room?.image || "/hero.png"}
          alt={room?.name || "Hakki Goodu"}
          fill
          className="object-cover transition-all duration-700"
          sizes="360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3329]/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[0.58rem] tracking-[0.3em] text-[#B98958] uppercase mb-0.5">
            {room?.tier || "Your Stay"}
          </p>
          <p className="text-base font-bold text-white leading-tight font-serif">
            {room?.name || "Select a villa to continue"}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Dates */}
        {form.checkin && form.checkout && (
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-[#8B5A3C]/10">
            <div className="text-center">
              <p className="text-[0.55rem] tracking-widest uppercase text-[#8B5A3C]/50 mb-1">Check-In</p>
              <p className="text-sm font-semibold text-[#2C2C2C]">{fmt(form.checkin)}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-px bg-[#B98958]" />
              <p className="text-[0.58rem] text-[#8B5A3C]/50">{nights}N</p>
            </div>
            <div className="text-center">
              <p className="text-[0.55rem] tracking-widest uppercase text-[#8B5A3C]/50 mb-1">Check-Out</p>
              <p className="text-sm font-semibold text-[#2C2C2C]">{fmt(form.checkout)}</p>
            </div>
          </div>
        )}

        {/* Guests */}
        {form.adults > 0 && (
          <div className="flex items-center gap-2 mb-5 text-xs text-[#8B5A3C]/60">
            <Users size={13} />
            {form.adults} adult{form.adults !== 1 ? "s" : ""}{form.children > 0 ? `, ${form.children} child${form.children !== 1 ? "ren" : ""}` : ""}
          </div>
        )}

        {/* Price breakdown */}
        {room && nights > 0 && (
          <div className="flex flex-col gap-3 pt-4 border-t border-[#8B5A3C]/10">
            <div className="flex justify-between text-xs text-[#8B5A3C]/70">
              <span>₹{room.price.toLocaleString()} × {nights} night{nights !== 1 ? "s" : ""}</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-[#8B5A3C]/70">
              <span>GST (12%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#2C2C2C] pt-3 border-t border-[#8B5A3C]/10">
              <span>Total</span>
              <span className="text-[#2F4F3E] font-serif">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Inclusions */}
        <div className="mt-6 pt-5 border-t border-[#8B5A3C]/10">
          <p className="text-[0.58rem] tracking-[0.3em] uppercase text-[#8B5A3C]/50 mb-3">All Stays Include</p>
          <div className="flex flex-col gap-2">
            {(
              [
                { icon: Leaf,   text: "Farm-to-table meals (all day)" },
                { icon: Coffee, text: "Morning chai & coffee" },
                { icon: Waves,  text: "Stream & nature access" },
                { icon: Star,   text: "Bonfire & stargazing" },
              ] as { icon: React.ElementType; text: string }[]
            ).map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-[#8B5A3C]/65">
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
function ConfirmationScreen({
  form,
  room,
  nights,
  total,
  bookingRef,
  reservationId,
  paymentMethod,
}: {
  form: FormData;
  room: Room;
  nights: number;
  total: number;
  bookingRef: string;
  reservationId: string;
  paymentMethod: "online" | "cash";
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white border border-[#8B5A3C]/15 max-w-lg w-full p-10 text-center shadow-2xl"
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

        <h2 className="text-3xl font-bold text-[#2C2C2C] mb-3 font-serif">
          Reservation Success!
        </h2>
        
        <p className="text-sm text-[#8B5A3C]/65 leading-relaxed mb-8">
          Thank you, <strong>{form.name}</strong>. Your sanctuary reservation for{" "}
          <strong>{room.name}</strong> has been secured. 
          {paymentMethod === "cash" ? (
             <span> Settlement is scheduled for cash payment upon check-in.</span>
          ) : (
             <span> Online transaction has been authorized successfully.</span>
          )}
          {" "}A invoice detailing your stay has been emailed to <strong>{form.email}</strong>.
        </p>

        <div className="bg-[#F5F1E8] p-5 mb-8 text-left space-y-3">
          {paymentMethod === "cash" && bookingRef && (
            <div>
              <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#8B5A3C]/60 mb-0.5">Booking Reference</p>
              <p className="text-base font-bold text-[#2F4F3E] font-serif tracking-wider select-all">
                {bookingRef}
              </p>
            </div>
          )}
          {reservationId && (
            <div>
              <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#8B5A3C]/60 mb-0.5">Transaction ID</p>
              <p className="text-xs font-bold text-[#2C2C2C] select-all">
                {reservationId}
              </p>
            </div>
          )}
          <div>
            <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#8B5A3C]/60 mb-0.5">Summary</p>
            <p className="text-xs text-[#8B5A3C]/80 font-medium">{nights} nights · ₹{total.toLocaleString()} total</p>
          </div>
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
            className="px-8 py-3 bg-[#8B5A3C] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#A9724F] transition-all duration-400"
          >
            WhatsApp Support
          </a>
        </div>
      </motion.div>
    </div>
  );
}
