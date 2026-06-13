"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, User, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || "Invalid admin credentials");
      }

      const data = await response.json();
      localStorage.setItem("admin_token", data.access_token);
      localStorage.setItem("admin_username", username);
      
      // Navigate to dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#FAF7F2]">
      {/* Dynamic blurred organic background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Hakki Goodu Resort Backdrop"
          fill
          className="object-cover filter blur-[6px] brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3329]/90 via-transparent to-[#1e3329]/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md border border-[#8B5A3C]/20 shadow-2xl p-8 md:p-10"
      >
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B5A3C] hover:text-[#2F4F3E] transition-colors mb-6 uppercase tracking-wider font-semibold"
        >
          <ArrowLeft size={13} /> Back to Resort
        </Link>

        {/* Branding & Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4 border border-[#8B5A3C]/30 p-2 rounded-full bg-[#FAF7F2]">
            <Image
              src="/logo.png"
              alt="Hakki Goodu Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Hakki Goodu
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B5A3C] font-semibold">
            Owner Access Portal
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-2.5 p-3.5 mb-6 bg-[#B56A4A]/10 border border-[#B56A4A]/30 text-[#B56A4A] text-xs leading-relaxed"
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#8B5A3C] font-semibold flex items-center gap-1.5">
              <User size={12} className="text-[#2F4F3E]" /> Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter owner username"
              className="w-full bg-[#FAF7F2] border border-[#8B5A3C]/15 px-4 py-3 text-sm text-[#2C2C2C] placeholder-[#8B5A3C]/40 focus:border-[#2F4F3E] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#8B5A3C] font-semibold flex items-center gap-1.5">
              <Lock size={12} className="text-[#2F4F3E]" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#FAF7F2] border border-[#8B5A3C]/15 px-4 py-3 text-sm text-[#2C2C2C] placeholder-[#8B5A3C]/40 focus:border-[#2F4F3E] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 bg-[#8B5A3C] hover:bg-[#A9724F] disabled:bg-[#8B5A3C]/50 text-white text-[0.7rem] tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-[#8B5A3C]/20 shadow-md cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <span>Verify Identity</span>
            )}
          </button>
        </form>

        {/* Security Badge */}
        <div className="mt-8 pt-6 border-t border-[#8B5A3C]/10 text-center">
          <p className="text-[0.6rem] text-[#8B5A3C]/50 tracking-wider flex items-center justify-center gap-1">
            🔒 Fully Encrypted Parameterized Session
          </p>
        </div>
      </motion.div>
    </div>
  );
}
