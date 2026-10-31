import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import logo from "../assets/zusko.png";
import { PRE_BOOKING_CONFIG } from "../config/preBookingConfig";

const UnderDevelopmentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup once per session/browser or on pre-booking launch
    const popupShown = localStorage.getItem("zusko-prebooking-modal-seen-v1");

    if (!popupShown) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("zusko-prebooking-modal-seen-v1", "true");
  };

  const handlePreBookNow = () => {
    handleClose();
    navigate("/place-order");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl overflow-hidden border border-yellow-200/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-yellow-400/15 blur-2xl pointer-events-none" />

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              aria-label="Close popup"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </motion.button>

            {/* Logo */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <img
                src={logo}
                alt="Zusko Logo"
                className="h-12 object-contain"
              />
            </motion.div>

            {/* Hype Pill Badge */}
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-xs">
                <Sparkles size={12} className="animate-spin text-black" />
                Official Campus Launch • BIET Jhansi
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="mt-3 text-center text-2xl sm:text-3xl font-black text-gray-900 tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              Pre-Booking is Now LIVE! 🚀
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className="mt-2 text-center text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Zusko is officially launching at <strong className="text-gray-900 font-bold">BIET Jhansi</strong>! Reserve your laundry slot now for our first launch batch pickup on 7th November.
            </motion.p>

            {/* Fixed Slot Info Box */}
            <motion.div
              className="mt-5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-yellow-50/40 to-white p-4 border border-amber-200/80 shadow-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-amber-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  Fixed Launch Schedule
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900">
                  Batch #1
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-gray-800">
                  <div className="w-7 h-7 rounded-lg bg-yellow-400/20 text-amber-800 flex items-center justify-center shrink-0">
                    <Calendar size={14} className="text-amber-800" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Pickup Date</span>
                    <strong className="text-gray-900 font-bold">{PRE_BOOKING_CONFIG.dateDisplay}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-gray-800">
                  <div className="w-7 h-7 rounded-lg bg-yellow-400/20 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-amber-800" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Pickup Slot Window</span>
                    <strong className="text-gray-900 font-bold">{PRE_BOOKING_CONFIG.timeSlot}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-gray-800">
                  <div className="w-7 h-7 rounded-lg bg-yellow-400/20 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-amber-800" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Service Area</span>
                    <strong className="text-gray-900 font-bold">{PRE_BOOKING_CONFIG.campusName} (Hostels & Campus)</strong>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Highlights List */}
            <motion.div
              className="mt-3.5 px-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>Doorstep pickup with sanitary laundry bags</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-600 mt-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>Limited slots per hostel to maintain quality</span>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="mt-5 space-y-2">
              <motion.button
                onClick={handlePreBookNow}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 py-3.5 text-sm font-black text-black shadow-lg shadow-yellow-500/20 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                whileTap={{ scale: 0.98 }}
              >
                <span>Pre-Book Laundry Slot Now</span>
                <ArrowRight size={15} />
              </motion.button>

              <button
                onClick={handleClose}
                className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                Explore Website First
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnderDevelopmentPopup;