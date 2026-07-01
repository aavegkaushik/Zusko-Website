import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import {
  Package, MapPin, Clock, ChevronRight,
  Home, Star, Share2, Phone, CheckCircle,
} from "lucide-react";

// ─── ANIMATED CHECK SVG ──────────────────────────────────────────────────────
function AnimatedCheck() {
  return (
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
      <motion.circle
        cx="26" cy="26" r="24"
        stroke="#22C55E" strokeWidth="3" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        style={{ pathLength: 1 }}
      />
      <motion.path
        d="M14 26.5L22 34.5L38 18"
        stroke="#22C55E" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.7 }}
      />
    </svg>
  );
}

// ─── FLOATING PARTICLE ────────────────────────────────────────────────────────
function FloatingParticle({ emoji, delay, x, y }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-2xl"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-10, -60], scale: [0, 1.2, 1, 0.5] }}
      transition={{ delay, duration: 2.5, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── PROGRESS STEP ────────────────────────────────────────────────────────────
function TimelineStep({ icon, label, sublabel, index, active, last }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0 + index * 0.12, type: "spring", stiffness: 200, damping: 22 }}
      className="flex items-start gap-3"
    >
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-base"
          style={{
            background: active ? (index === 0 ? "#22C55E" : "#FFD700") : "#F3F4F6",
            color: active ? (index === 0 ? "white" : "#101010") : "#9CA3AF",
            boxShadow: active && index === 0 ? "0 4px 16px rgba(34,197,94,0.3)" : active ? "0 4px 16px rgba(255,215,0,0.3)" : "none",
          }}
        >
          {icon}
        </div>
        {!last && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: active ? 1 : 0.3 }}
            transition={{ delay: 1.2 + index * 0.12, duration: 0.4 }}
            className="w-0.5 mt-1 origin-top"
            style={{ height: "28px", background: active ? "linear-gradient(to bottom, #FFD700, rgba(255,215,0,0.2))" : "#F0F0F0" }}
          />
        )}
      </div>
      {/* Text */}
      <div className="pb-5 pt-1.5 min-w-0">
        <p className={`text-sm font-bold leading-none ${active ? "text-gray-900" : "text-gray-400"}`}>
          {label}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Success() {
  const canAccess = sessionStorage.getItem("orderSuccess");
  if (!canAccess) return <Navigate to="/" replace />;

  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);

  // ── Confetti ────────────────────────────────────────────────────────────
  useEffect(() => {
    const duration = 2200;
    const end = Date.now() + duration;

    // First burst — center
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#FFD700", "#FFA500", "#FFFFFF", "#22C55E", "#101010"],
      });
    }, 400);

    // Side cannons
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors: ["#FFD700", "#FFA500"] });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: ["#FFD700", "#FFA500"] });
    }, 700);

    // Interval bursts
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.65 }, colors: ["#FFD700", "#FFA500", "#FFFFFF"] });
    }, 350);

    return () => {
      clearInterval(interval);
      sessionStorage.removeItem("orderSuccess");
    };
  }, []);

  const steps = [
    { icon: "✅", label: "Order Confirmed", sublabel: "We've received your order", active: true },
    { icon: "🚚", label: "Pickup Scheduled", sublabel: "Our team is on the way", active: true },
    { icon: "🧼", label: "Cleaning in Progress", sublabel: "Premium fabric care", active: false },
    { icon: "📦", label: "Out for Delivery", sublabel: "Back at your door", active: false },
  ];

  const particles = [
    { emoji: "✨", x: 8, y: 20, delay: 0.5 },
    { emoji: "🧺", x: 88, y: 15, delay: 1.2 },
    { emoji: "💛", x: 5, y: 70, delay: 0.8 },
    { emoji: "⭐", x: 92, y: 65, delay: 1.6 },
    { emoji: "🌟", x: 50, y: 5, delay: 2.0 },
    { emoji: "✨", x: 75, y: 80, delay: 0.4 },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 mt-20"
      style={{ background: "linear-gradient(160deg, #F8F9FB 0%, #FFFDE7 50%, #F0FDF4 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 65%)" }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #22C55E, transparent 65%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 65%)" }} />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* ── CARD ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, duration: 0.7 }}
        className="relative w-full z-10"
        style={{ maxWidth: "460px" }}
      >
        {/* Main card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* ── HERO SECTION ────────────────────────────────────── */}
          <div
            className="relative px-8 pt-10 pb-8 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #101010 0%, #1a1a1a 60%, #2a1f00 100%)" }}
          >
            {/* Tiny gold glow in hero */}
            <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,215,0,0.25), transparent 65%)" }} />

            {/* Animated check circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
              className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center rounded-full"
              style={{
                background: "rgba(34,197,94,0.12)",
                border: "2px solid rgba(34,197,94,0.3)",
              }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid rgba(34,197,94,0.5)" }}
                animate={{ scale: [1, 1.35, 1.35], opacity: [1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              />
              <AnimatedCheck />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: "#FFD700" }}>
                Order Confirmed
              </p>
              <h1 className="text-white font-black leading-tight" style={{ fontSize: "clamp(22px, 6vw, 28px)" }}>
                You're all set! 🎉
              </h1>
              <p className="text-sm mt-2.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Your laundry pickup is scheduled.<br />
                Sit back — we've got it covered 💛
              </p>
            </motion.div>

            {/* Quick stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              {[
                { icon: "🚚", label: "30 min pickup" },
                { icon: "✨", label: "Premium care" },
                { icon: "📦", label: "Fast delivery" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <span className="text-base">{stat.icon}</span>
                  <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── ORDER TIMELINE ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-6 pt-6 pb-2"
          >
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Order Status
            </p>
            {steps.map((step, i) => (
              <TimelineStep
                key={step.label}
                icon={step.icon}
                label={step.label}
                sublabel={step.sublabel}
                index={i}
                active={step.active}
                last={i === steps.length - 1}
              />
            ))}
          </motion.div>

          {/* ── ESTIMATED TIME BANNER ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mx-6 mb-5 px-4 py-3.5 rounded-2xl flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, #FFF9E6, #FFFDE7)",
              border: "1px solid rgba(255,215,0,0.3)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: "rgba(255,215,0,0.2)" }}
            >
              ⏱️
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-none">
                Estimated Completion
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                24–36 hours after pickup
              </p>
            </div>
            <div className="ml-auto">
              <span
                className="text-[10px] font-black px-2 py-1 rounded-full"
                style={{ background: "#FFD700", color: "#101010" }}
              >
                ON TIME
              </span>
            </div>
          </motion.div>

          {/* ── CTA BUTTONS ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.75 }}
            className="px-6 pb-6 space-y-3"
          >
            {/* Primary — Track Order */}
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/my-orders")}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #101010, #1e1700)",
                color: "white",
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,215,0,0.15)" }}
                >
                  <Package size={15} color="#FFD700" />
                </div>
                <span>Track My Order</span>
              </div>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#FFD700" }}
              >
                <ChevronRight size={14} color="#101010" />
              </div>
            </motion.button>

            {/* Secondary row */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm"
                style={{
                  background: "#FFF9E6",
                  color: "#D97706",
                  border: "1px solid rgba(255,215,0,0.3)",
                }}
              >
                <Home size={15} />
                Home
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/place-order")}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm"
                style={{
                  background: "#F8F9FB",
                  color: "#374151",
                  border: "1px solid #F0F0F0",
                }}
              >
                <Package size={15} />
                New Order
              </motion.button>
            </div>

            {/* Share + Contact row */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "Zusko Laundry", text: "I just booked a laundry pickup with Zusko! Clean clothes delivered fast. 🧺" });
                  } else {
                    setShowShare(true);
                    setTimeout(() => setShowShare(false), 2200);
                  }
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: "#F3F4F6", color: "#6B7280", border: "1px solid #EFEFEF" }}
              >
                <Share2 size={14} />
                Share
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open("tel:+91XXXXXXXXXX")}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: "#F3F4F6", color: "#6B7280", border: "1px solid #EFEFEF" }}
              >
                <Phone size={14} />
                Support
              </motion.button>
            </div>
          </motion.div>

          {/* ── FOOTER ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="px-6 py-4 text-center"
            style={{ borderTop: "1px solid #F5F5F5" }}
          >
            {/* Star rating nudge */}
            <p className="text-[11px] text-gray-400 mb-2">Enjoying Zusko? Rate us ✨</p>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 + star * 0.07 }}
                  className="text-xl leading-none"
                  style={{ color: "#FFD700" }}
                >
                  ★
                </motion.button>
              ))}
            </div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "#CBD5E1" }}>
              ZUSKO · Fast · Reliable · Premium
            </p>
          </motion.div>
        </div>

        {/* ── SHARE TOAST ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute bottom-[-56px] left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold"
              style={{
                background: "#101010",
                color: "white",
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              }}
            >
              📋 Link copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}