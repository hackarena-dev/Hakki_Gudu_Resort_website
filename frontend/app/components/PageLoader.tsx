"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader once client mounts and page is fully ready
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      
      // Fallback timer (700ms) to ensure loader doesn't hang if assets are cached
      const timer = setTimeout(() => setLoading(false), 700);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#1e3329] flex items-center justify-center pointer-events-auto"
        >
          {/* Elegant Luxury Double-ring Loader */}
          <div className="relative w-16 h-16">
            {/* Outer pulsing gold circle */}
            <div className="absolute inset-0 border border-[#B98958]/40 rounded-full animate-ping opacity-60" />
            {/* Inner spinning gold crescent */}
            <div className="absolute inset-2 border-2 border-t-[#B98958] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
