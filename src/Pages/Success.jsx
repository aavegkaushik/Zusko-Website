import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import {
  Package,
  Clock3,
  Home,
  Share2,
  Phone,
  Check,
  Sparkles,
  Shirt,
  Truck,
  Box,
  ArrowUpRight,
  Copy,
  MessageCircle,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";

// ============================================================
// PREMIUM SUCCESS MARK
// ============================================================
function SuccessMark() {
  return (
    <div className="relative w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] flex items-center justify-center">
      {/* Outer pulsing wave 1 */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "2px solid rgba(255,215,0,0.35)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.9, 1.25, 1.5],
          opacity: [0.9, 0.35, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Outer pulsing wave 2 */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "1px dashed rgba(255,215,0,0.25)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.35, 1.65],
          opacity: [0.6, 0.2, 0],
        }}
        transition={{
          duration: 2.5,
          delay: 0.4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Main Outer Gold Gradient Ring */}
      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative w-full h-full rounded-full flex items-center justify-center p-1.5"
        style={{
          background:
            "linear-gradient(135deg, #FFF085 0%, #FFD700 50%, #D4AF37 100%)",
          boxShadow:
            "0 14px 40px rgba(255,215,0,0.32), inset 0 2px 4px rgba(255,255,255,0.7)",
        }}
      >
        {/* Inner Obsidian Circle */}
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(145deg, #141414 0%, #080808 100%)",
            boxShadow:
              "inset 0 2px 4px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.35,
              type: "spring",
              stiffness: 320,
              damping: 18,
            }}
          >
            <Check
              size={36}
              strokeWidth={3.2}
              className="text-[#FFD700]"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// FLOATING GLOW LIGHT
// ============================================================
function FloatingLight({ x, y, size = 5, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: "#FFD700",
        boxShadow: "0 0 16px rgba(255,215,0,0.75)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
        y: [0, -25, -50],
      }}
      transition={{
        duration: 3.2,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeOut",
      }}
    />
  );
}

// ============================================================
// STATUS ITEM
// ============================================================
function StatusItem({
  icon,
  title,
  description,
  active,
  completed,
  last,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="relative flex gap-3.5 sm:gap-4"
    >
      {/* Timeline Indicator */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: delay + 0.08,
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          className="relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: completed
              ? "linear-gradient(135deg, #FFD700, #F59E0B)"
              : active
              ? "#111111"
              : "#F3F4F6",
            color: completed ? "#111111" : active ? "#FFD700" : "#9CA3AF",
            border: active
              ? "1.5px solid rgba(255,215,0,0.6)"
              : completed
              ? "none"
              : "1px solid #E5E7EB",
            boxShadow: active
              ? "0 6px 20px rgba(255,215,0,0.22)"
              : completed
              ? "0 4px 14px rgba(255,165,0,0.2)"
              : "none",
          }}
        >
          {completed ? (
            <Check size={16} strokeWidth={3} />
          ) : (
            icon
          )}

          {active && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: "2px solid rgba(255,215,0,0.6)" }}
              animate={{
                scale: [1, 1.18, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
        </motion.div>

        {!last && (
          <div
            className="w-0.5 flex-1 min-h-[38px] my-1"
            style={{
              background: completed
                ? "linear-gradient(to bottom, #FFD700 0%, #E5E7EB 100%)"
                : "#E5E7EB",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pt-0.5 pb-4 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className="text-xs sm:text-sm font-extrabold leading-tight"
            style={{ color: active || completed ? "#111827" : "#9CA3AF" }}
          >
            {title}
          </h3>

          {active && (
            <span
              className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                background: "#FEF3C7",
                color: "#92400E",
                border: "1px solid #FDE68A",
              }}
            >
              Next Up
            </span>
          )}

          {completed && (
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Done
            </span>
          )}
        </div>

        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Success() {
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState(() => sessionStorage.getItem("latestOrderId") || "");
  const [orderCode, setOrderCode] = useState(() => sessionStorage.getItem("latestOrderCode") || "");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const displayOrderCode = orderCode
    ? `#${orderCode}`
    : orderId
    ? `#ZK-${orderId.slice(-6).toUpperCase()}`
    : `#ZK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // ==========================================================
  // CONFETTI CELEBRATION
  // ==========================================================
  useEffect(() => {
    const timers = [];

    // Wave 1: Center blast
    timers.push(
      setTimeout(() => {
        confetti({
          particleCount: 85,
          spread: 75,
          startVelocity: 32,
          scalar: 0.85,
          origin: { x: 0.5, y: 0.55 },
          colors: ["#FFD700", "#FFFFFF", "#111111", "#F59E0B"],
        });
      }, 300)
    );

    // Wave 2: Left and right cannons
    timers.push(
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 55,
          spread: 55,
          startVelocity: 30,
          origin: { x: 0.05, y: 0.65 },
          colors: ["#FFD700", "#FFFFFF", "#FBBF24"],
        });

        confetti({
          particleCount: 45,
          angle: 125,
          spread: 55,
          startVelocity: 30,
          origin: { x: 0.95, y: 0.65 },
          colors: ["#FFD700", "#FFFFFF", "#FBBF24"],
        });
      }, 650)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // ==========================================================
  // COPY ORDER CODE
  // ==========================================================
  const handleCopyOrderCode = async () => {
    try {
      await navigator.clipboard.writeText(displayOrderCode);
      setToastMessage("Order ID copied to clipboard!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    } catch {
      setToastMessage(displayOrderCode);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    }
  };

  // ==========================================================
  // SHARE
  // ==========================================================
  const handleShare = async () => {
    const shareData = {
      title: "Zusko Laundry Order",
      text: `I just scheduled my laundry pickup with Zusko! ${displayOrderCode} 🧺✨`,
      url: window.location.origin,
    };

    try {
      if (navigator.share && typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setToastMessage("Order details copied to share!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    } catch (err) {
      console.log("Share skipped", err);
    }
  };

  // Safe navigation helper that cleans up orderSuccess on leave
  const handleNavigate = (path) => {
    sessionStorage.removeItem("orderSuccess");
    navigate(path);
  };

  // ==========================================================
  // STATUS LIST
  // ==========================================================
  const statuses = [
    {
      icon: <CheckCheck size={16} strokeWidth={2.6} />,
      title: "Order Placed & Confirmed",
      description: "We've received your booking and reserved your laundry slot.",
      completed: true,
      active: false,
    },
    {
      icon: <Truck size={16} strokeWidth={2.4} />,
      title: "Doorstep Pickup Scheduled",
      description: "Our pickup partner will arrive at your address with laundry bags.",
      completed: false,
      active: true,
    },
    {
      icon: <Sparkles size={16} strokeWidth={2.4} />,
      title: "Fabric Care & Processing",
      description: "Custom care, fabric-safe wash & steam pressing by laundry experts.",
      completed: false,
      active: false,
    },
    {
      icon: <Box size={16} strokeWidth={2.4} />,
      title: "Crisp & Clean Delivery",
      description: "Freshly packaged clothes delivered right back to your doorstep.",
      completed: false,
      active: false,
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-3.5 sm:px-6 py-6 sm:py-12"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, rgba(255,215,0,0.14), transparent 40%), linear-gradient(150deg, #F8F9FA 0%, #FFFFFF 50%, #F5F6F8 100%)",
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-80 sm:w-[460px] h-80 sm:h-[460px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,215,0,0.14), transparent 68%)",
          }}
        />
        <div
          className="absolute -bottom-36 -right-28 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(17,17,17,0.06), transparent 68%)",
          }}
        />

        <FloatingLight x={10} y={20} size={5} delay={0.4} />
        <FloatingLight x={90} y={24} size={4} delay={1.2} />
        <FloatingLight x={14} y={74} size={3} delay={1.8} />
        <FloatingLight x={86} y={70} size={5} delay={2.2} />
      </div>

      {/* Main card container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[490px] z-10"
      >
        <div
          className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/90 shadow-[0_25px_80px_rgba(0,0,0,0.10),0_8px_30px_rgba(0,0,0,0.05)]"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* =================================================
              TOP HERO BANNER
          ================================================== */}
          <div
            className="relative overflow-hidden px-5 sm:px-8 pt-7 sm:pt-9 pb-6 sm:pb-7 text-center"
            style={{
              background:
                "linear-gradient(145deg, #090909 0%, #131313 55%, #1f1802 100%)",
            }}
          >
            {/* Top gold bloom */}
            <div
              className="absolute -top-28 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,215,0,0.22), transparent 65%)",
              }}
            />

            {/* Brand Header */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative flex items-center justify-center gap-2 mb-5"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(255,215,0,0.12)",
                  border: "1px solid rgba(255,215,0,0.25)",
                }}
              >
                <Shirt size={13} color="#FFD700" />
              </div>
              <span className="text-[11px] font-black tracking-[0.26em] text-[#FFD700]">
                ZUSKO LAUNDRY
              </span>
            </motion.div>

            {/* Animated Success Check */}
            <div className="flex justify-center mb-5">
              <SuccessMark />
            </div>

            {/* Headline and Copy */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2.5"
                style={{
                  background: "rgba(255,215,0,0.10)",
                  border: "1px solid rgba(255,215,0,0.22)",
                }}
              >
                <Sparkles size={11} color="#FFD700" />
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FFD700]">
                  Order Placed Successfully
                </span>
              </div>

              <h1 className="text-2xl sm:text-[29px] leading-tight font-black text-white">
                Your clothes are in{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #FFFFFF 0%, #FFD700 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  good hands.
                </span>
              </h1>

              <p className="text-xs sm:text-[13px] leading-relaxed mt-2 text-white/60 max-w-[340px] mx-auto">
                Pickup is scheduled. Our rider will arrive at your address with laundry bags so you can sit back & relax.
              </p>
            </motion.div>

            {/* Order Code Pill with Quick Copy */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15"
            >
              <span className="text-[10px] text-white/60 font-medium">Order ID:</span>
              <span className="text-xs font-black text-[#FFD700] tracking-wide">
                {displayOrderCode}
              </span>
              <button
                type="button"
                onClick={handleCopyOrderCode}
                className="ml-1 text-white/50 hover:text-white transition-colors"
                title="Copy Order ID"
                aria-label="Copy Order ID"
              >
                <Copy size={12} />
              </button>
            </motion.div>

            {/* Quick Reassurance Strip */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-2 mt-5 text-center"
            >
              {[
                { icon: <Truck size={14} />, label: "Doorstep Pickup" },
                { icon: <ShieldCheck size={14} />, label: "Fabric Safe" },
                { icon: <Box size={14} />, label: "Sealed Return" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl px-2 py-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex justify-center mb-0.5 text-[#FFD700]">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-bold text-white/80">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* =================================================
              ORDER JOURNEY / TIMELINE
          ================================================== */}
          <div className="px-5 sm:px-7 pt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-gray-400">
                  Live Status
                </p>
                <h2 className="text-sm sm:text-base font-black text-gray-900 mt-0.5">
                  What happens next
                </h2>
              </div>

              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-50 text-amber-700 border border-amber-200">
                <Clock3 size={15} />
              </div>
            </motion.div>

            <div>
              {statuses.map((status, index) => (
                <StatusItem
                  key={status.title}
                  number={index + 1}
                  {...status}
                  last={index === statuses.length - 1}
                  delay={0.9 + index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* =================================================
              ESTIMATED TURNAROUND CARD
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mx-5 sm:mx-7 mb-4"
          >
            <div
              className="relative overflow-hidden rounded-2xl p-3.5 sm:p-4 border border-amber-200/70"
              style={{
                background: "linear-gradient(135deg, #FFFDF5 0%, #FFFBEA 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-950 text-[#FFD700] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Clock3 size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                    Estimated Turnaround
                  </p>
                  <p className="text-xs sm:text-sm font-black text-gray-900 mt-0.5">
                    24–36 hours after pickup
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-gray-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-950 animate-pulse" />
                  <span>On Track</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              ACTIONS & CTAs
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45 }}
            className="px-5 sm:px-7 pb-6"
          >
            {/* Primary Track Order CTA */}
            <motion.button
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate(orderId ? `/track-order/${orderId}` : "/my-orders")}
              className="group w-full flex items-center justify-between p-2 rounded-2xl transition-all shadow-md"
              style={{
                background: "linear-gradient(135deg, #101010 0%, #1e1700 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,215,0,0.14)",
                    color: "#FFD700",
                  }}
                >
                  <Package size={18} />
                </div>

                <div className="text-left">
                  <p className="text-xs sm:text-sm font-black text-white">
                    Track Your Order Live
                  </p>
                  <p className="text-[10px] text-white/50">
                    Check pickup rider arrival & live status
                  </p>
                </div>
              </div>

              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                style={{
                  background: "#FFD700",
                  color: "#111111",
                }}
              >
                <ArrowUpRight size={15} />
              </div>
            </motion.button>

            {/* Secondary Navigation Row: Home & New Order */}
            <div className="grid grid-cols-2 gap-2.5 mt-2.5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavigate("/")}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-extrabold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 transition-colors"
              >
                <Home size={14} />
                <span>Home</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavigate("/place-order")}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 text-amber-900 transition-colors"
              >
                <Package size={14} />
                <span>New Order</span>
              </motion.button>
            </div>

            {/* Support & Share Actions */}
            <div className="grid grid-cols-2 gap-2.5 mt-2.5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  window.open(
                    `https://wa.me/918004411976?text=${encodeURIComponent(
                      `Hi Zusko! I just booked a laundry pickup (${displayOrderCode}). Can you please help me with the pickup schedule?`
                    )}`,
                    "_blank"
                  )
                }
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-800 transition-colors"
              >
                <MessageCircle size={13} className="text-emerald-600" />
                <span>WhatsApp Help</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 transition-colors"
              >
                <Share2 size={13} className="text-gray-500" />
                <span>Share Details</span>
              </motion.button>
            </div>

            {/* Direct Phone Support */}
            <div className="mt-2.5 text-center">
              <a
                href="tel:+918004411976"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Phone size={12} />
                <span>Need urgent assistance? Call Support (+91 80044 11976)</span>
              </a>
            </div>
          </motion.div>

          {/* =================================================
              TRUSTED FOOTER
          ================================================== */}
          <div className="px-6 py-4 text-center border-t border-gray-100 bg-gray-50/60">
            <div className="flex items-center justify-center gap-1 mb-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Sparkles
                  key={star}
                  size={10}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="text-[10px] text-gray-500 font-medium">
              Thank you for choosing Zusko for effortless doorstep fabric care.
            </p>
            <p className="text-[8px] font-black tracking-[0.22em] uppercase mt-1 text-gray-400">
              ZUSKO · Pure Fabric Care
            </p>
          </div>
        </div>

        {/* ===================================================
            FLOATING TOAST
        ==================================================== */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xl"
              style={{
                background: "#111111",
                color: "#FFFFFF",
                border: "1px solid rgba(255,215,0,0.3)",
              }}
            >
              <Check size={14} color="#FFD700" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}