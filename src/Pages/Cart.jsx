import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Tag, ShoppingBag, ArrowLeft, Truck, Sparkles } from "lucide-react";
import CouponSection from "../components/CouponSection.jsx";

// Emoji map — same as BookLaundry
const itemEmoji = {
  "Shirt": "👔", "T-Shirt": "👕", "Jeans": "👖", "Trousers": "👖",
  "Shorts": "🩳", "Kurta": "👘", "Blazer": "🧥", "Suit (2 Piece)": "🤵",
  "Suit (3 Piece)": "🤵", "Jacket": "🧥", "Sweater": "🧶", "Hoodie": "🧥",
  "Innerwear": "🩲", "Kurti": "👘", "Leggings": "🩱", "Saree (Normal)": "🥻",
  "Saree (Heavy)": "🥻", "Blouse": "👗", "Top": "👗", "Dress": "👗",
  "Gown": "👗", "Dupatta": "🧣", "Skirt": "🩴", "Kids Shirt": "👔",
  "Kids T-Shirt": "👕", "Kids Jeans": "👖", "Kids Shorts": "🩳",
  "School Uniform": "🎒", "Kids Jacket": "🧥", "Kids Sweater": "🧶",
  "Frock": "👗", "Bedsheet (Single)": "🛏️", "Bedsheet (Double)": "🛏️",
  "Blanket": "🛌", "Quilt/Rajai": "🛌", "Pillow Cover": "🛏️",
  "Curtains (Light)": "🪟", "Curtains (Heavy)": "🪟", "Sofa Cover": "🛋️",
  "Towel": "🧴", "Carpet (Small)": "🪄", "Carpet (Large)": "🪄",
};

// Service tag colors
const serviceColors = {
  "Wash & Fold":  { bg: "#EFF6FF", color: "#3B82F6" },
  "Wash & Iron":  { bg: "#F5F3FF", color: "#8B5CF6" },
  "Dry Clean":    { bg: "#FFFBEB", color: "#F59E0B" },
  "Steam Iron":   { bg: "#ECFDF5", color: "#10B981" },
};

export default function Cart() {
  const { cart, total, finalTotal,handlingCharge, discount, increaseQty, decreaseQty } =
    useContext(CartContext);
  const navigate = useNavigate();

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const freeDeliveryThreshold = 200;
  const remaining = freeDeliveryThreshold - total;
  const progressPct = Math.min((total / freeDeliveryThreshold) * 100, 100);

  // ── EMPTY STATE ────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#F8F9FB", paddingTop: "80px" }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-40 px-5 py-4 flex items-center gap-3"
          style={{
            background: "rgba(248,249,251,0.85)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid #EFEFEF",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/place-order")}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          >
            <ArrowLeft size={16} color="#111" />
          </motion.button>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-none">Your Cart</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">Review your items</p>
          </div>
        </div>

        {/* Empty illustration */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl mb-6"
            style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
          >
            🧺
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="font-black text-gray-900 text-2xl mb-2">Cart is empty</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Add laundry items to build your order.<br />We'll take care of the rest.
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/place-order")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#101010,#1e1700)", color: "white" }}
            >
              <ShoppingBag size={16} />
              Browse Services
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── FILLED CART ────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ background: "#F8F9FB", paddingTop: "80px", paddingBottom: "110px" }}
    >
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 px-5 py-4 flex items-center gap-3"
        style={{
          background: "rgba(248,249,251,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #EFEFEF",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/place-order")}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
        >
          <ArrowLeft size={16} color="#111" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-gray-900 leading-none">Your Cart</h1>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {itemCount} {itemCount === 1 ? "item" : "items"} · ₹{finalTotal} total
          </p>
        </div>
      </div>

      {/* ── PAGE LAYOUT: wide on desktop ───────────────────────────── */}
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 pt-5">
        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* ── LEFT: items + coupon ─────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Free delivery progress bar */}
            <AnimatePresence>
              {total < freeDeliveryThreshold && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#FFF9E6" }}
                  >
                    <Truck size={16} color="#D97706" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 mb-1.5">
                      Add <span className="text-amber-600 font-black">₹{remaining}</span> more for free pickup & delivery
                    </p>
                    
                    <div className="w-full h-1.5 rounded-full" style={{ background: "#F0F0F0" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg,#FFD700,#FFA500)" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {total >= freeDeliveryThreshold && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: "#ECFDF5", border: "1px solid #D1FAE5" }}
              >
                <span className="text-xl">🎉</span>
                <p className="text-sm font-semibold text-green-700">
                  You've unlocked free pickup & delivery!
                </p>
              </motion.div>
            )}

            {/* Section label */}
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-0.5">
              Items ({cart.length})
            </p>

            {/* ── ITEM CARDS ────────────────────────────────────────── */}
            <div className="space-y-3 mb-5">
              <AnimatePresence>
                {cart.map((item, index) => {
                  const emoji = itemEmoji[item.name] || "🧺";
                  const svcColor = serviceColors[item.service] || { bg: "#F3F4F6", color: "#6B7280" };
                  return (
                    <motion.div
                      key={item.name + item.service}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ delay: index * 0.04, type: "spring", stiffness: 280, damping: 24 }}
                      className="bg-white rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        border: "1px solid #F0F0F0",
                      }}
                    >
                      {/* Top: emoji + info */}
                      <div className="flex items-start gap-4 px-4 pt-4 pb-3">
                        <div
                          className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: "#F8F9FB", minWidth: "52px", minHeight: "52px" }}
                        >
                          {emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-[15px] leading-snug break-words">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: svcColor.bg, color: svcColor.color }}
                            >
                              {item.service}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">
                              ₹{item.price} each
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ height: "1px", background: "#F5F5F5", marginLeft: "16px", marginRight: "16px" }} />

                      {/* Bottom: stepper + subtotal */}
                      <div className="flex items-center justify-between px-4 py-3">
                        {/* Stepper */}
                        <div
                          className="flex items-center rounded-full overflow-hidden"
                          style={{ background: "#101010" }}
                        >
                          <motion.button
                            whileTap={{ scale: 0.82 }}
                            onClick={() => decreaseQty(item)}
                            className="w-10 h-10 flex items-center justify-center text-xl font-bold text-white"
                          >
                            −
                          </motion.button>
                          <span className="text-white font-black text-sm w-7 text-center">
                            {item.qty}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.82 }}
                            onClick={() => increaseQty(item)}
                            className="w-10 h-10 flex items-center justify-center text-xl font-bold"
                            style={{ color: "#FFD700" }}
                          >
                            +
                          </motion.button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-[11px] text-gray-400 mb-0.5">Subtotal</p>
                          <p className="font-black text-gray-900 text-[17px] leading-none">
                            ₹{item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* ── COUPON SECTION ─────────────────────────────────────── */}
            <div
              className="rounded-2xl overflow-hidden mb-5"
              style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#FFF9E6" }}
                >
                  <Tag size={15} color="#D97706" />
                </div>
                <p className="text-sm font-bold text-gray-800">Apply Coupon</p>
              </div>
              <div className="px-4 py-1">
                <CouponSection />
              </div>
            </div>

          </div>

          {/* ── RIGHT: Bill summary (desktop sticky) ─────────────────── */}
          <div className="lg:w-[340px] shrink-0 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm">Bill Details</h2>
              </div>

              {/* Rows */}
              <div className="px-5 py-4 space-y-3">
                {/* Item total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Item Total</span>
                  <span className="text-sm font-bold text-gray-900">₹{total}</span>
                </div>

                {/* Delivery */}
                {/* <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-500">Pickup & Delivery</span>
                  <span className="text-sm font-bold text-green-600">
                    {total >= freeDeliveryThreshold ? "FREE" : "Pending"}
                  </span>
                </div> */}

                {/* Handling Charge */}
<div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-500">
      Handling Charge
    </span>

    <span
      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
      style={{
        background: "#FFF7CC",
        color: "#B45309",
      }}
    >
      Care
    </span>
  </div>

  <span
    className={`text-sm font-bold ${
      handlingCharge === 0
        ? "text-green-600"
        : "text-gray-900"
    }`}
  >
    {handlingCharge === 0
      ? "FREE"
      : `₹${handlingCharge}`}
  </span>
</div>

                {/* Discount */}
                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-green-600 flex items-center gap-1.5">
                        <Sparkles size={13} />
                        Coupon Discount
                      </span>
                      <span className="text-sm font-bold text-green-600">−₹{discount}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Savings banner */}
              <AnimatePresence>
                {discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mx-4 mb-4 px-3 py-2 rounded-xl text-xs font-semibold text-green-700 flex items-center gap-2"
                    style={{ background: "#ECFDF5", border: "1px solid #D1FAE5" }}
                  >
                    🎉 You're saving ₹{discount} on this order!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Total row */}
              <div
                className="mx-4 mb-4 px-4 py-4 rounded-2xl flex items-center justify-between"
                style={{ background: "#F8F9FB", border: "1px solid #EFEFEF" }}
              >
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">Total (incl. GST)</p>
                  <p className="font-black text-gray-900 text-2xl leading-none">₹{finalTotal}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#FFF9E6" }}
                >
                  <span className="text-xl">🧾</span>
                </div>
              </div>

              {/* Checkout button — desktop */}
              <div className="px-4 pb-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/checkout")}
                  className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg,#101010,#1e1700)", color: "white" }}
                >
                  Proceed to Checkout
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "#FFD700" }}
                  >
                    <ChevronRight size={14} color="#101010" />
                  </span>
                </motion.button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {["🔒 Secure", "🚚 Free Pickup", "✅ Trusted"].map((badge) => (
                    <span key={badge} className="text-[10px] text-gray-400 font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Estimated timeline (desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 rounded-2xl px-5 py-4"
              style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Timeline</p>
              {[
                { icon: "📦", label: "Pickup", time: "Withing the time of your booked slot" },
                { icon: "🧼", label: "Processing", time: "within 24 hours at the time of pickup" },
                { icon: "🚚", label: "Delivery", time: "After 24 hours in same slot" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                    style={{ background: "#F8F9FB" }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-800 leading-none">{step.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{step.time}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── STICKY CHECKOUT BAR (mobile / tablet) ──────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
        style={{ pointerEvents: "none" }}
      >
        <div className="max-w-[640px] mx-auto" style={{ pointerEvents: "auto" }}>
          <div
            className="rounded-2xl p-1"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 -4px 30px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.95)",
            }}
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/checkout")}
              className="w-full flex items-center justify-between px-5 py-4 rounded-[18px]"
              style={{ background: "linear-gradient(135deg,#101010,#1e1700)" }}
            >
              <div className="text-left">
                <p className="text-[10px] font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Total (incl. GST)
                </p>
                <p className="text-white font-black text-xl leading-none">₹{finalTotal}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Checkout</span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#FFD700" }}
                >
                  <ChevronRight size={16} color="#101010" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}