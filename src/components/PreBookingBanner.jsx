import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, X } from "lucide-react";
import { PRE_BOOKING_CONFIG } from "../config/preBookingConfig";

export default function PreBookingBanner() {
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  if (!PRE_BOOKING_CONFIG.isEnabled || dismissed) return null;

  // Don't show in checkout or payment or success screens
  const isMinimalPage =
    location.pathname === "/checkout" ||
    location.pathname === "/success" ||
    location.pathname === "/payment";

  if (isMinimalPage) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="w-full text-white select-none overflow-hidden shrink-0"
        style={{
          background: "linear-gradient(90deg, #0a0a0a 0%, #171402 50%, #0a0a0a 100%)",
          borderBottom: "1px solid rgba(255, 215, 0, 0.22)",
        }}
        aria-label="Pre-Booking Announcement"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2">
          {/* Left badge & message */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-yellow-400 to-amber-500 text-black shrink-0 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              BIET Launch
            </span>

            <p className="text-xs sm:text-[13px] font-medium text-gray-200 truncate">
              <strong className="text-yellow-300 font-bold">{PRE_BOOKING_CONFIG.campusName}:</strong>{" "}
              <span className="hidden sm:inline text-gray-300">First pickup batch on </span>
              <span className="font-bold text-white bg-white/10 px-1.5 py-0.5 rounded border border-white/10 text-[11px] sm:text-xs inline-flex items-center gap-1">
                <Calendar size={11} className="text-yellow-400" />
                {PRE_BOOKING_CONFIG.shortDateDisplay}
              </span>{" "}
              <span className="hidden md:inline text-gray-400 text-xs">
                ({PRE_BOOKING_CONFIG.timeSlot})
              </span>
            </p>
          </div>

          {/* Right Action & Dismiss */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              to="/place-order"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-yellow-400 hover:bg-yellow-300 text-black transition-all transform hover:scale-105 active:scale-95 shadow-xs"
            >
              <span>Pre-Book</span>
              <ArrowRight size={12} className="hidden sm:inline" />
            </Link>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Close banner"
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
