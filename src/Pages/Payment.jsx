import { useLocation, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  CheckCircle,
  Zap,
  Smartphone,
  Building2,
  Lock,
  Sparkles,
} from "lucide-react";
import API from "../config/api";

// ─── ITEM EMOJI MAP ───────────────────────────────────────────────────────────
const itemEmoji = {
  Shirt: "👔",
  "T-Shirt": "👕",
  Jeans: "👖",
  Trousers: "👖",
  Shorts: "🩳",
  Kurta: "👘",
  Blazer: "🧥",
  "Suit (2 Piece)": "🤵",
  "Suit (3 Piece)": "🤵",
  Jacket: "🧥",
  Sweater: "🧶",
  Hoodie: "🧥",
  Innerwear: "🩲",
  Kurti: "👘",
  Leggings: "🩱",
  "Saree (Normal)": "🥻",
  "Saree (Heavy)": "🥻",
  Blouse: "👗",
  Top: "👗",
  Dress: "👗",
  Gown: "👗",
  Dupatta: "🧣",
  Skirt: "🩴",
  "Kids Shirt": "👔",
  "Kids T-Shirt": "👕",
  "Kids Jeans": "👖",
  "Kids Shorts": "🩳",
  "School Uniform": "🎒",
  "Kids Jacket": "🧥",
  "Kids Sweater": "🧶",
  Frock: "👗",
  "Bedsheet (Single)": "🛏️",
  "Bedsheet (Double)": "🛏️",
  Blanket: "🛌",
  "Quilt/Rajai": "🛌",
  "Pillow Cover": "🛏️",
  "Curtains (Light)": "🪟",
  "Curtains (Heavy)": "🪟",
  "Sofa Cover": "🛋️",
  Towel: "🧴",
  "Carpet (Small)": "🪄",
  "Carpet (Large)": "🪄",
};

const serviceColors = {
  "Wash & Fold": { bg: "#EFF6FF", color: "#3B82F6" },
  "Wash & Iron": { bg: "#F5F3FF", color: "#8B5CF6" },
  "Dry Clean": { bg: "#FFFBEB", color: "#F59E0B" },
  "Steam Iron": { bg: "#ECFDF5", color: "#10B981" },
};

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState(null); // "online" | "cod"
  const [processingMethod, setProcessingMethod] = useState(null);

  if (!state) return <Navigate to="/place-order" replace />;
  const { orderData } = state;

  // ── All original logic untouched ─────────────────────────────────────────

  const handleCOD = async () => {
    setProcessingMethod("cod");
    try {
      const response = await API.post("/orders/create", {
        ...orderData,

        couponCode: orderData.couponCode || null,

        payment: {
          method: "COD",
          status: "pending",
          amount: orderData.total,
        },
      });
      console.log("ORDER SUCCESS:", response.data);
      sessionStorage.setItem("orderSuccess", "true");
      clearCart();
      navigate("/success");
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.status);
      console.error("ORDER DATA:", err.response?.data);
      alert(err.response?.data?.message || "Failed to create order");
    } finally {
      setProcessingMethod(null);
    }
  };

  const handleOnlinePayment = async () => {
    setProcessingMethod("online");
    try {
      const { data } = await API.post("/payment/create-order", {
        amount: orderData.total,
      });
      const razorpayOrder = data.data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "Zusko Laundry",
        description: "Laundry Order Payment",
        handler: async function (response) {
          try {
            console.log("VERIFY START");
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            console.log("VERIFY DONE", verifyRes.data);
            const orderRes = await API.post("/orders/create", {
              ...orderData,

              couponCode: orderData.couponCode || null,

              payment: {
                method: "ONLINE",
                status: "paid",
                amount: orderData.total,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
              },
            });
            console.log("ORDER CREATED", orderRes.data);
            sessionStorage.setItem("orderSuccess", "true");
            clearCart();
            navigate("/success", { replace: true });
          } catch (err) {
            console.log("ONLINE PAYMENT ERROR", err.response?.data, err);
            alert(err.response?.data?.message || err.message);
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled");
            setProcessingMethod(null);
          },
        },
        theme: { color: "#000" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed");
      setProcessingMethod(null);
    }
  };

  const isLoading = processingMethod !== null;

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-[#F8F9FB]"
      style={{ paddingTop: "80px", paddingBottom: "110px" }}
    >
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 px-5 py-4 flex items-center gap-3"
        style={{
          background: "rgba(248,249,251,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #EFEFEF",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "white",
            border: "1px solid #F0F0F0",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <ArrowLeft size={16} color="#111" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-gray-900 leading-none">
            Payment
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Complete your order securely
          </p>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          {["Cart", "Details", "Pay"].map((step, i) => (
            <div key={step} className="flex items-center gap-1.5">
              <div
                className="flex items-center justify-center rounded-full font-bold"
                style={{
                  width: i === 2 ? "24px" : "20px",
                  height: i === 2 ? "24px" : "20px",
                  fontSize: i === 2 ? "11px" : "10px",
                  background: i < 2 ? "#E5E7EB" : "#101010",
                  color: i < 2 ? "#9CA3AF" : "#FFD700",
                }}
              >
                {i < 2 ? "✓" : "3"}
              </div>
              {i < 2 && <div className="w-4 h-px bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN LAYOUT ─────────────────────────────────────────────── */}
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 pt-5">
        <div className="lg:flex lg:gap-8 lg:items-start">
          {/* ── LEFT: payment options ─────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Amount hero card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, #101010 0%, #1a1a1a 55%, #2a1f00 100%)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
              }}
            >
              {/* Gold glow blobs */}
              <div
                className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.2), transparent 65%)",
                }}
              />
              <div
                className="absolute bottom-[-30px] left-[-20px] w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.1), transparent 65%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Total Payable
                    </p>
                    <p
                      className="font-black text-white mt-1.5"
                      style={{
                        fontSize: "clamp(32px, 7vw, 48px)",
                        lineHeight: 1,
                      }}
                    >
                      ₹{orderData.total}
                    </p>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 mt-1"
                    style={{
                      background: "rgba(255,215,0,0.15)",
                      color: "#FFD700",
                      border: "1px solid rgba(255,215,0,0.25)",
                    }}
                  >
                    <Lock size={11} /> Secure
                  </div>
                </div>

                {/* Mini bill breakdown */}
                <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                  {[
                    {
                      label: "Items",
                      val: `₹${orderData.originalTotal ?? orderData.total}`,
                    },
                    {
                      label: "Delivery",
                      val:
                        orderData.deliveryFee === 0
                          ? "Free"
                          : `₹${orderData.deliveryFee}`,
                    },
                    {
                      label: "Handling",
                      val: `₹${orderData.handlingFee ?? 15}`,
                    },
                  ].map((row) => (
                    <div key={row.label}>
                      <p
                        className="text-[10px] font-medium mb-0.5"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {row.label}
                      </p>
                      <p className="text-sm font-bold text-white">{row.val}</p>
                    </div>
                  ))}
                </div>

                {/* Pickup details */}
                {orderData.pickup && (
                  <div
                    className="mt-4 flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-base">📅</span>
                    <p
                      className="text-[12px] font-medium"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      Pickup: {orderData.pickup.date} · {orderData.pickup.time}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Section label */}
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest px-0.5 pt-1">
              Choose Payment Method
            </p>

            {/* ── ONLINE PAYMENT ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              whileTap={{ scale: 0.98 }}
              onClick={!isLoading ? handleOnlinePayment : undefined}
              className="rounded-2xl overflow-hidden cursor-pointer relative"
              style={{
                background: selectedMethod === "online" ? "#101010" : "white",
                border:
                  selectedMethod === "online"
                    ? "1.5px solid rgba(255,215,0,0.4)"
                    : "1.5px solid #EFEFEF",
                boxShadow:
                  selectedMethod === "online"
                    ? "0 8px 32px rgba(0,0,0,0.22)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                opacity: isLoading && processingMethod !== "online" ? 0.5 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={() => !isLoading && setSelectedMethod("online")}
              onMouseLeave={() => setSelectedMethod(null)}
            >
              {/* Recommended badge */}
              <div className="absolute top-3.5 right-4">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ background: "#ECFDF5", color: "#065F46" }}
                >
                  <Sparkles size={9} /> Recommended
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        selectedMethod === "online"
                          ? "rgba(255,215,0,0.15)"
                          : "#F5F3FF",
                    }}
                  >
                    {processingMethod === "online" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-t-transparent rounded-full"
                        style={{
                          borderColor:
                            selectedMethod === "online" ? "#FFD700" : "#8B5CF6",
                          borderTopColor: "transparent",
                        }}
                      />
                    ) : (
                      <CreditCard
                        size={20}
                        color={
                          selectedMethod === "online" ? "#FFD700" : "#8B5CF6"
                        }
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-20">
                    <p
                      className={`font-bold text-[15px] leading-none ${selectedMethod === "online" ? "text-white" : "text-gray-900"}`}
                    >
                      Pay Online
                    </p>
                    <p
                      className={`text-[12px] mt-1 ${selectedMethod === "online" ? "text-gray-400" : "text-gray-500"}`}
                    >
                      UPI, Cards, Netbanking & more
                    </p>
                    {/* Sub-icons */}
                    <div className="flex items-center gap-2 mt-3">
                      {[
                        { icon: <Smartphone size={11} />, label: "UPI" },
                        { icon: <CreditCard size={11} />, label: "Cards" },
                        { icon: <Building2 size={11} />, label: "Netbanking" },
                      ].map((m) => (
                        <span
                          key={m.label}
                          className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background:
                              selectedMethod === "online"
                                ? "rgba(255,255,255,0.1)"
                                : "#F3F4F6",
                            color:
                              selectedMethod === "online"
                                ? "rgba(255,255,255,0.7)"
                                : "#6B7280",
                          }}
                        >
                          {m.icon} {m.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA strip */}
              <div
                className="px-5 py-3 flex items-center justify-between border-t"
                style={{
                  borderColor:
                    selectedMethod === "online"
                      ? "rgba(255,255,255,0.08)"
                      : "#F5F5F5",
                  background:
                    selectedMethod === "online"
                      ? "rgba(255,255,255,0.03)"
                      : "#FAFAFA",
                }}
              >
                <span
                  className="text-[11px] font-medium flex items-center gap-1"
                  style={{
                    color:
                      selectedMethod === "online"
                        ? "rgba(255,255,255,0.4)"
                        : "#9CA3AF",
                  }}
                >
                  <Zap size={11} /> Instant confirmation
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      selectedMethod === "online" ? "#FFD700" : "#F3F4F6",
                  }}
                >
                  <ChevronRight
                    size={14}
                    color={selectedMethod === "online" ? "#101010" : "#9CA3AF"}
                  />
                </div>
              </div>
            </motion.div>

            {/* ── CASH ON PICKUP ────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              whileTap={{ scale: 0.98 }}
              onClick={!isLoading ? handleCOD : undefined}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: selectedMethod === "cod" ? "#101010" : "white",
                border:
                  selectedMethod === "cod"
                    ? "1.5px solid rgba(255,215,0,0.4)"
                    : "1.5px solid #EFEFEF",
                boxShadow:
                  selectedMethod === "cod"
                    ? "0 8px 32px rgba(0,0,0,0.22)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                opacity: isLoading && processingMethod !== "cod" ? 0.5 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={() => !isLoading && setSelectedMethod("cod")}
              onMouseLeave={() => setSelectedMethod(null)}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        selectedMethod === "cod"
                          ? "rgba(255,215,0,0.15)"
                          : "#FFF9E6",
                    }}
                  >
                    {processingMethod === "cod" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-t-transparent rounded-full"
                        style={{
                          borderColor: "#FFD700",
                          borderTopColor: "transparent",
                        }}
                      />
                    ) : (
                      <Wallet
                        size={20}
                        color={selectedMethod === "cod" ? "#FFD700" : "#D97706"}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-bold text-[15px] leading-none ${selectedMethod === "cod" ? "text-white" : "text-gray-900"}`}
                    >
                      Cash on Pickup
                    </p>
                    <p
                      className={`text-[12px] mt-1 ${selectedMethod === "cod" ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Pay in cash when our team arrives
                    </p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <CheckCircle
                        size={12}
                        color={selectedMethod === "cod" ? "#FFD700" : "#10B981"}
                      />
                      <span
                        className="text-[11px] font-semibold"
                        style={{
                          color:
                            selectedMethod === "cod"
                              ? "rgba(255,255,255,0.6)"
                              : "#065F46",
                        }}
                      >
                        No advance payment needed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="px-5 py-3 flex items-center justify-between border-t"
                style={{
                  borderColor:
                    selectedMethod === "cod"
                      ? "rgba(255,255,255,0.08)"
                      : "#F5F5F5",
                  background:
                    selectedMethod === "cod"
                      ? "rgba(255,255,255,0.03)"
                      : "#FAFAFA",
                }}
              >
                <span
                  className="text-[11px] font-medium"
                  style={{
                    color:
                      selectedMethod === "cod"
                        ? "rgba(255,255,255,0.4)"
                        : "#9CA3AF",
                  }}
                >
                  Pay at doorstep
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      selectedMethod === "cod" ? "#FFD700" : "#F3F4F6",
                  }}
                >
                  <ChevronRight
                    size={14}
                    color={selectedMethod === "cod" ? "#101010" : "#9CA3AF"}
                  />
                </div>
              </div>
            </motion.div>

            {/* Security note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 py-1"
            >
              <ShieldCheck size={14} color="#9CA3AF" />
              <span className="text-[12px] text-gray-400 font-medium">
                100% secure payments powered by Razorpay
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: order items summary ───────────────────────── */}
          <div className="lg:w-[340px] flex-shrink-0 lg:sticky lg:top-24 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "white",
                border: "1px solid #F0F0F0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm">
                  Order Details
                </h2>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "#FFF9E6", color: "#D97706" }}
                >
                  {orderData.items?.length ?? 0} items
                </span>
              </div>

              {/* Items */}
              <div
                className="py-2 max-h-60 overflow-y-auto"
                style={{ scrollbarWidth: "thin" }}
              >
                {(orderData.items || []).map((item, i) => {
                  const svcColor = serviceColors[item.service] || {
                    bg: "#F3F4F6",
                    color: "#6B7280",
                  };
                  return (
                    <div
                      key={item.name + item.service + i}
                      className="flex items-start gap-2.5 px-5 py-2.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-base flex-shrink-0">
                        {itemEmoji[item.name] || "🧺"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-800 break-words leading-snug">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{
                              background: svcColor.bg,
                              color: svcColor.color,
                            }}
                          >
                            {item.service}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            × {item.qty}
                          </span>
                        </div>
                      </div>
                      <span className="text-[13px] font-black text-gray-900 flex-shrink-0">
                        ₹{item.qty * item.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Address + pickup */}
              {orderData.address && (
                <div className="px-5 py-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm flex-shrink-0 mt-0.5">📍</span>
                    <p className="text-[12px] text-gray-600 break-words leading-relaxed">
                      {orderData.address.fullAddress}, {orderData.address.city}{" "}
                      – {orderData.address.pincode}
                    </p>
                  </div>
                  {orderData.pickup && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm flex-shrink-0">📅</span>
                      <p className="text-[12px] text-gray-600">
                        {orderData.pickup.date} · {orderData.pickup.time}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bill summary */}
              <div className="px-5 py-3 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Item Total</span>
                  <span className="font-semibold text-gray-800">
                    ₹{orderData.originalTotal ?? orderData.total}
                  </span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <Sparkles size={12} /> Discount
                    </span>
                    <span className="font-semibold text-green-600">
                      −₹{orderData.discount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span
                    className={`font-semibold ${orderData.deliveryFee === 0 ? "text-green-600" : "text-gray-800"}`}
                  >
                    {orderData.deliveryFee === 0
                      ? "FREE"
                      : `₹${orderData.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Handling</span>
                  <span className="font-semibold text-gray-800">
                    ₹{orderData.handlingFee ?? 15}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="px-5 pb-5">
                <div
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
                  style={{ background: "#F8F9FB", border: "1px solid #EFEFEF" }}
                >
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">
                      Amount to Pay
                    </p>
                    <p className="font-black text-gray-900 text-2xl leading-none">
                      ₹{orderData.total}
                    </p>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    style={{ background: "#101010", color: "#FFD700" }}
                  >
                    <Lock size={11} /> Secure
                  </div>
                </div>

                {/* Desktop quick action buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={!isLoading ? handleOnlinePayment : undefined}
                    disabled={isLoading}
                    className="py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5"
                    style={{
                      background: "linear-gradient(135deg,#101010,#1e1700)",
                      color: "white",
                      opacity:
                        isLoading && processingMethod !== "online" ? 0.5 : 1,
                    }}
                  >
                    {processingMethod === "online" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <CreditCard size={14} /> Pay Online
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={!isLoading ? handleCOD : undefined}
                    disabled={isLoading}
                    className="py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5"
                    style={{
                      background: "#FFF9E6",
                      color: "#D97706",
                      border: "1px solid #FDE68A",
                      opacity:
                        isLoading && processingMethod !== "cod" ? 0.5 : 1,
                    }}
                  >
                    {processingMethod === "cod" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Wallet size={14} /> Cash
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Trust line */}
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <ShieldCheck size={12} color="#9CA3AF" />
                  <span className="text-[10px] text-gray-400 font-medium">
                    Secured by Razorpay
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STICKY CTA (mobile / tablet) ──────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="max-w-[640px] mx-auto"
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="rounded-2xl p-1"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 -4px 30px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.95)",
            }}
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={!isLoading ? handleOnlinePayment : undefined}
              disabled={isLoading}
              className="w-full flex items-center justify-between px-5 py-4 rounded-[18px]"
              style={{ background: "linear-gradient(135deg,#101010,#1e1700)" }}
            >
              <div className="text-left">
                <p
                  className="text-[10px] font-medium mb-0.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Total Payable
                </p>
                <p className="text-white font-black text-xl leading-none">
                  ₹{orderData.total}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {processingMethod === "online" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.9,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <span className="text-white font-bold text-sm">
                      Pay Now
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "#FFD700" }}
                    >
                      <ChevronRight size={16} color="#101010" />
                    </div>
                  </>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
