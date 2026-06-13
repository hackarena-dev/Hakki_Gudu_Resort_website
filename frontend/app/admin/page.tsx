"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  Search,
  Calendar,
  IndianRupee,
  Users,
  Shield,
  CreditCard,
  User,
  Phone,
  Mail,
  ChevronRight,
  X,
  RefreshCw,
  Clock,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// TypeScript types matching the backend schema
type Booking = {
  id: string;
  booking_ref: string;
  status: string;
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  num_guests: number;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  payment_method?: string | null;
  amount_paise?: number | null;
  hold_expires_at?: string | null;
  created_at: string;
  confirmed_at?: string | null;
};

type Metrics = {
  total_revenue_paise: number;
  total_revenue_display: string;
  total_bookings: number;
  upcoming_bookings: number;
  cash_pending_collection: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Check auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_username") || "Resort Owner";
    if (!storedToken) {
      router.push("/admin/login");
    } else {
      setToken(storedToken);
      setUsername(storedUser);
      fetchDashboardData(storedToken);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    router.push("/admin/login");
  };

  const fetchDashboardData = async (authToken: string) => {
    setRefreshing(true);
    setError(null);
    try {
      // Fetch Metrics
      const metricsResponse = await fetch(`${apiBaseUrl}/api/admin/metrics`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (metricsResponse.status === 401) {
        handleLogout();
        return;
      }

      if (!metricsResponse.ok) {
        throw new Error("Failed to fetch dashboard metrics");
      }
      const metricsData = await metricsResponse.json();
      setMetrics(metricsData);

      // Fetch Bookings
      const bookingsResponse = await fetch(`${apiBaseUrl}/api/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (bookingsResponse.status === 401) {
        handleLogout();
        return;
      }

      if (!bookingsResponse.ok) {
        throw new Error("Failed to fetch bookings list");
      }
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while loading dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter and search bookings
  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.booking_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest_phone.includes(searchTerm);

    if (selectedStatus === "all") return matchSearch;
    if (selectedStatus === "confirmed") return matchSearch && b.status === "confirmed";
    if (selectedStatus === "confirmed_cash") return matchSearch && b.status === "confirmed_cash";
    if (selectedStatus === "pending") return matchSearch && b.status === "pending";
    if (selectedStatus === "cancelled") return matchSearch && b.status === "cancelled";
    return matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2.5 py-1 text-[0.65rem] font-semibold bg-[#2F4F3E]/10 text-[#2F4F3E] border border-[#2F4F3E]/20 uppercase tracking-wide">
            Paid (Online)
          </span>
        );
      case "confirmed_cash":
        return (
          <span className="px-2.5 py-1 text-[0.65rem] font-semibold bg-[#8B5A3C]/10 text-[#8B5A3C] border border-[#8B5A3C]/20 uppercase tracking-wide">
            Cash On-site
          </span>
        );
      case "pending":
        return (
          <span className="px-2.5 py-1 text-[0.65rem] font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20 uppercase tracking-wide">
            Hold/Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2.5 py-1 text-[0.65rem] font-semibold bg-[#B56A4A]/10 text-[#B56A4A] border border-[#B56A4A]/20 uppercase tracking-wide">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-[0.65rem] font-semibold bg-gray-100 text-gray-700 border border-gray-200 uppercase tracking-wide">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-2 border-[#8B5A3C]/10 border-t-[#2F4F3E] animate-spin" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A3C] font-semibold">
          Loading Owner Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2C2C] pb-12">
      {/* ── Top Bar ── */}
      <header className="bg-white border-b border-[#8B5A3C]/12 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 border border-[#8B5A3C]/20 p-1.5 rounded-full bg-[#FAF7F2]">
              <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#8B5A3C] font-bold block">
                Hakki Goodu
              </span>
              <h1 className="text-lg font-bold leading-tight font-serif text-[#2F4F3E]">
                Owner Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-[#8B5A3C] bg-[#FAF7F2] px-3.5 py-2 border border-[#8B5A3C]/15 font-semibold">
              <Shield size={13} className="text-[#2F4F3E]" />
              <span>Signed in as: <strong className="text-[#2C2C2C]">{username}</strong></span>
            </div>

            <button
              onClick={() => token && fetchDashboardData(token)}
              disabled={refreshing}
              className="p-2 border border-[#8B5A3C]/15 hover:bg-[#FAF7F2] text-[#8B5A3C] transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-[#B56A4A]/25 text-[#B56A4A] hover:bg-[#B56A4A]/5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Dashboard Workspace ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-[#B56A4A]/10 border border-[#B56A4A]/30 text-[#B56A4A] text-sm">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold mb-0.5">Sync Error</h4>
              <p className="opacity-90">{error}</p>
            </div>
            <button
              onClick={() => token && fetchDashboardData(token)}
              className="text-xs uppercase tracking-wider font-bold underline hover:opacity-80"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Metrics Grid ── */}
        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1 */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white border border-[#8B5A3C]/12 p-6 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8B5A3C] font-semibold mb-2">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold font-serif text-[#2F4F3E]">
                  {metrics.total_revenue_display}
                </p>
                <p className="text-[0.65rem] text-[#8B5A3C]/60 mt-1">Confirmed stays paid</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#2F4F3E]/8 flex items-center justify-center text-[#2F4F3E]">
                <IndianRupee size={20} />
              </div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white border border-[#8B5A3C]/12 p-6 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8B5A3C] font-semibold mb-2">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold font-serif text-[#2F4F3E]">
                  {metrics.total_bookings}
                </p>
                <p className="text-[0.65rem] text-[#8B5A3C]/60 mt-1">Confirmed reservations</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#2F4F3E]/8 flex items-center justify-center text-[#2F4F3E]">
                <Calendar size={20} />
              </div>
            </motion.div>

            {/* Metric 3 */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white border border-[#8B5A3C]/12 p-6 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8B5A3C] font-semibold mb-2">
                  Upcoming Bookings
                </p>
                <p className="text-2xl font-bold font-serif text-[#2F4F3E]">
                  {metrics.upcoming_bookings}
                </p>
                <p className="text-[0.65rem] text-[#8B5A3C]/60 mt-1">Visits scheduled check-in</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#2F4F3E]/8 flex items-center justify-center text-[#2F4F3E]">
                <Users size={20} />
              </div>
            </motion.div>

            {/* Metric 4 */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white border border-[#8B5A3C]/12 p-6 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8B5A3C] font-semibold mb-2">
                  Cash Collections Pending
                </p>
                <p className="text-2xl font-bold font-serif text-[#8B5A3C]">
                  {metrics.cash_pending_collection}
                </p>
                <p className="text-[0.65rem] text-[#8B5A3C]/60 mt-1">Uncollected cash stays</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#8B5A3C]/8 flex items-center justify-center text-[#8B5A3C]">
                <Clock size={20} />
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Table & Interactive Filters Section ── */}
        <div className="bg-white border border-[#8B5A3C]/12 shadow-sm overflow-hidden">
          
          {/* Controls Header */}
          <div className="p-6 border-b border-[#8B5A3C]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Status Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Bookings" },
                { id: "confirmed", label: "Paid" },
                { id: "confirmed_cash", label: "Cash Stays" },
                { id: "pending", label: "Holds" },
                { id: "cancelled", label: "Cancelled" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedStatus === tab.id
                      ? "bg-[#2F4F3E] text-white border border-[#2F4F3E]"
                      : "bg-[#FAF7F2] text-[#8B5A3C] hover:bg-[#8B5A3C]/5 border border-[#8B5A3C]/12"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm w-full">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B5A3C]/50"
              />
              <input
                type="text"
                placeholder="Search name, phone, ref..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#8B5A3C]/15 text-xs text-[#2C2C2C] placeholder-[#8B5A3C]/50 focus:border-[#2F4F3E] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Bookings Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#8B5A3C]/10 text-[#8B5A3C] uppercase text-[0.62rem] tracking-[0.2em] font-bold">
                  <th className="py-4 px-6">Reference</th>
                  <th className="py-4 px-6">Guest Name</th>
                  <th className="py-4 px-6">Check-in</th>
                  <th className="py-4 px-6">Check-out</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8B5A3C]/8 text-xs">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className="hover:bg-[#FAF7F2]/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-4.5 px-6 font-semibold font-serif tracking-wider text-[#2F4F3E]">
                        {b.booking_ref}
                      </td>
                      <td className="py-4.5 px-6 font-medium text-[#2C2C2C]">
                        {b.guest_name}
                      </td>
                      <td className="py-4.5 px-6 text-[#8B5A3C]/85">
                        {formatDate(b.check_in)}
                      </td>
                      <td className="py-4.5 px-6 text-[#8B5A3C]/85">
                        {formatDate(b.check_out)}
                      </td>
                      <td className="py-4.5 px-6 font-semibold text-[#2C2C2C]">
                        ₹{b.amount_paise ? (b.amount_paise / 100).toLocaleString() : "0"}
                      </td>
                      <td className="py-4.5 px-6">
                        {getStatusBadge(b.status)}
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <button className="p-1.5 border border-transparent group-hover:border-[#8B5A3C]/15 group-hover:bg-white text-[#8B5A3C]/60 group-hover:text-[#2F4F3E] transition-all duration-300">
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#8B5A3C]/60 text-xs">
                      No matching reservations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="bg-[#FAF7F2]/40 p-4 border-t border-[#8B5A3C]/10 text-right text-[0.65rem] tracking-wider text-[#8B5A3C]/70 uppercase font-semibold">
            Showing {filteredBookings.length} of {bookings.length} Total Bookings
          </div>
        </div>
      </main>

      {/* ── Booking Details Drawer/Modal ── */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-full bg-white shadow-2xl border-l border-[#8B5A3C]/20 flex flex-col z-10"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-[#8B5A3C]/10 flex items-center justify-between bg-[#FAF7F2]">
                <div>
                  <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8B5A3C] font-semibold block mb-0.5">
                    Reservation Detail
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#2F4F3E]">
                    {selectedBooking.booking_ref}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 border border-[#8B5A3C]/12 hover:bg-white text-[#8B5A3C] transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-7">
                
                {/* Guest Profile Section */}
                <div className="space-y-4">
                  <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B5A3C]/80 font-bold border-b border-[#8B5A3C]/10 pb-1.5">
                    Guest Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2F4F3E]/6 flex items-center justify-center text-[#2F4F3E]">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-[0.62rem] text-[#8B5A3C]/50 uppercase tracking-wider">Guest Name</p>
                        <p className="text-xs font-semibold text-[#2C2C2C]">{selectedBooking.guest_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2F4F3E]/6 flex items-center justify-center text-[#2F4F3E]">
                        <Users size={14} />
                      </div>
                      <div>
                        <p className="text-[0.62rem] text-[#8B5A3C]/50 uppercase tracking-wider">Total Guests</p>
                        <p className="text-xs font-semibold text-[#2C2C2C]">{selectedBooking.num_guests} guests</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:col-span-2">
                      <div className="w-8 h-8 rounded-full bg-[#2F4F3E]/6 flex items-center justify-center text-[#2F4F3E]">
                        <Mail size={14} />
                      </div>
                      <div>
                        <p className="text-[0.62rem] text-[#8B5A3C]/50 uppercase tracking-wider">Email Address</p>
                        <p className="text-xs font-semibold text-[#2C2C2C]">{selectedBooking.guest_email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2F4F3E]/6 flex items-center justify-center text-[#2F4F3E]">
                        <Phone size={14} />
                      </div>
                      <div>
                        <p className="text-[0.62rem] text-[#8B5A3C]/50 uppercase tracking-wider">Phone Number</p>
                        <p className="text-xs font-semibold text-[#2C2C2C]">{selectedBooking.guest_phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stay Dates Section */}
                <div className="space-y-4">
                  <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B5A3C]/80 font-bold border-b border-[#8B5A3C]/10 pb-1.5">
                    Stay Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAF7F2] border border-[#8B5A3C]/10">
                    <div>
                      <p className="text-[0.58rem] text-[#8B5A3C]/50 uppercase tracking-wider mb-0.5">Check-In</p>
                      <p className="text-xs font-bold text-[#2F4F3E]">{formatDate(selectedBooking.check_in)}</p>
                    </div>
                    <div>
                      <p className="text-[0.58rem] text-[#8B5A3C]/50 uppercase tracking-wider mb-0.5">Check-Out</p>
                      <p className="text-xs font-bold text-[#2F4F3E]">{formatDate(selectedBooking.check_out)}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="space-y-4">
                  <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B5A3C]/80 font-bold border-b border-[#8B5A3C]/10 pb-1.5">
                    Financial Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8B5A3C]/60 uppercase tracking-wider">Payment Status</span>
                      <div>{getStatusBadge(selectedBooking.status)}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8B5A3C]/60 uppercase tracking-wider">Payment Method</span>
                      <span className="font-semibold capitalize text-[#2C2C2C]">{selectedBooking.payment_method || "Online"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8B5A3C]/60 uppercase tracking-wider">Total Stays Cost</span>
                      <span className="text-base font-bold text-[#2C2C2C]">
                        ₹{selectedBooking.amount_paise ? (selectedBooking.amount_paise / 100).toLocaleString() : "0"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transaction & System Details */}
                <div className="space-y-4">
                  <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B5A3C]/80 font-bold border-b border-[#8B5A3C]/10 pb-1.5">
                    Transaction Details
                  </h4>
                  <div className="space-y-3 text-xs">
                    {selectedBooking.razorpay_order_id && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B5A3C]/60">Razorpay Order ID</span>
                        <code className="bg-[#FAF7F2] px-2 py-1 border border-[#8B5A3C]/10 text-[0.65rem] select-all">
                          {selectedBooking.razorpay_order_id}
                        </code>
                      </div>
                    )}
                    {selectedBooking.razorpay_payment_id && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B5A3C]/60">Razorpay Payment ID</span>
                        <code className="bg-[#FAF7F2] px-2 py-1 border border-[#8B5A3C]/10 text-[0.65rem] select-all">
                          {selectedBooking.razorpay_payment_id}
                        </code>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B5A3C]/60">Created At</span>
                      <span className="text-xs text-[#2C2C2C]">{new Date(selectedBooking.created_at).toLocaleString("en-IN")}</span>
                    </div>
                    {selectedBooking.confirmed_at && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B5A3C]/60">Confirmed At</span>
                        <span className="text-xs text-[#2C2C2C]">{new Date(selectedBooking.confirmed_at).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    {selectedBooking.hold_expires_at && selectedBooking.status === "pending" && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B5A3C]/60">Hold Expires At</span>
                        <span className="text-xs text-amber-600 font-semibold">{new Date(selectedBooking.hold_expires_at).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-6 border-t border-[#8B5A3C]/10 bg-[#FAF7F2] text-center">
                <p className="text-[0.6rem] text-[#8B5A3C]/50 tracking-wider">
                  🔒 Parameterized Secure SSL Operations Only
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
