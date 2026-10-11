import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Wallet,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Zap,
  Smartphone,
  Building2,
  Lock,
  Sparkles,
  AlertCircle,
  RefreshCw,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  PhoneCall,
  Check,
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

// Helper: Ensure Razorpay checkout script is loaded
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext) || {};

  // Default to "online" for high-conversion recommended flow
  const [selectedMethod, setSelectedMethod] = useState("online"); // "online" | "cod"
  const [processingMethod, setProcessingMethod] = useState(null); // null | "online" | "cod"
  const [verificationStep, setVerificationStep] = useState(null); // null | "verifying" | "creating_order" | "success" | "failed"
  const [verificationError, setVerificationError] = useState("");
  const [showAllItems, setShowAllItems] = useState(false);

  if (!state) return <Navigate to="/place-order" replace />;
  const { orderData } = state;

  // ── TEMPORARY LAUNCHING SOON MODE ─────────────────────────────────────────
  // Set to false when ready to go live. All backend APIs remain 100% intact!
  const LAUNCHING_SOON_MODE = false;

  // ── CASH ON DELIVERY / PICKUP ─────────────────────────────────────────────
  const handleCOD = async () => {
    setProcessingMethod("cod");

    if (LAUNCHING_SOON_MODE) {
      setTimeout(() => {
        navigate("/launching-soon", {
          state: { orderData, paymentMethod: "COD" },
        });
      }, 350);
      return;
    }

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

      console.log("ORDER SUCCESS (COD):", response.data);
      const createdOrder =
        response.data?.data || response.data?.order || response.data;

      const oId =
        createdOrder?._id ||
        createdOrder?.id ||
        (typeof createdOrder === "string" ? createdOrder : null);
      const oCode =
        createdOrder?.orderId ||
        createdOrder?.orderCode ||
        createdOrder?.code ||
        null;

      if (oId) sessionStorage.setItem("latestOrderId", String(oId));
      if (oCode) sessionStorage.setItem("latestOrderCode", String(oCode));
      sessionStorage.setItem("orderSuccess", "true");

      clearCart();
      toast.success("Order confirmed successfully! Pickup scheduled.");

      navigate("/success", {
        replace: true,
        state: {
          orderId: oId,
          orderCode: oCode,
          order: createdOrder,
          paymentMethod: "COD",
        },
      });
    } catch (err) {
      console.error("ORDER ERROR (COD):", err.response?.data || err);
      toast.error(
        err.response?.data?.message || "Failed to create order. Please try again."
      );
    } finally {
      setProcessingMethod(null);
    }
  };

  // ── ONLINE RAZORPAY PAYMENT & VALIDATION ──────────────────────────────────
  const handleOnlinePayment = async () => {
    setProcessingMethod("online");

    if (LAUNCHING_SOON_MODE) {
      setTimeout(() => {
        navigate("/launching-soon", {
          state: { orderData, paymentMethod: "ONLINE" },
        });
      }, 350);
      return;
    }

    try {
      // 1. Verify Razorpay SDK availability
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || !window.Razorpay) {
        toast.error("Payment gateway could not be loaded. Please check your internet connection.");
        setProcessingMethod(null);
        return;
      }

      // 2. Create Razorpay order on backend
      const { data } = await API.post("/payment/create-order", {
        amount: orderData.total,
      });

      const razorpayOrder = data.data || data.order || data;
      const razorpayKey =
        razorpayOrder.key ||
        import.meta.env.VITE_RAZORPAY_KEY ||
        import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        console.error("Razorpay Key ID is not configured.");
        toast.error("Payment configuration missing. Please contact support.");
        setProcessingMethod(null);
        return;
      }

      // 3. Configure options with user prefill & validation handler
      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        order_id: razorpayOrder.id,
        name: "Zusko Laundry",
        description: "Doorstep Laundry & Dry Clean Order",
        image: "https://www.zusko.in/src/assets/zusko%20favicon.png",
        prefill: {
          name:
            user?.name ||
            user?.fullName ||
            orderData?.address?.name ||
            "",
          email: user?.email || "",
          contact:
            user?.phone ||
            user?.mobileNumber ||
            orderData?.address?.phone ||
            "",
        },
        handler: async function (response) {
          try {
            console.log("PAYMENT AUTHORIZED BY RAZORPAY. VERIFYING...", response);
            // Launch validation screen to reassure the user
            setVerificationStep("verifying");

            // Step A: Validate payment signature on backend
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("PAYMENT SIGNATURE VERIFIED:", verifyRes.data);

            // Step B: Create confirmed order on backend
            setVerificationStep("creating_order");
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

            console.log("ORDER CREATION CONFIRMED:", orderRes.data);

            // Step C: Success state & Storage sync
            setVerificationStep("success");
            const createdOrder =
              orderRes.data?.data || orderRes.data?.order || orderRes.data;

            const oId =
              createdOrder?._id ||
              createdOrder?.id ||
              (typeof createdOrder === "string" ? createdOrder : null);
            const oCode =
              createdOrder?.orderId ||
              createdOrder?.orderCode ||
              createdOrder?.code ||
              null;

            if (oId) sessionStorage.setItem("latestOrderId", String(oId));
            if (oCode) sessionStorage.setItem("latestOrderCode", String(oCode));
            sessionStorage.setItem("orderSuccess", "true");

            clearCart();
            toast.success("Payment verified! Booking confirmed.");

            // Step D: Smooth redirect to /success
            setTimeout(() => {
              navigate("/success", {
                replace: true,
                state: {
                  orderId: oId,
                  orderCode: oCode,
                  order: createdOrder,
                  paymentMethod: "ONLINE",
                },
              });
            }, 800);
          } catch (err) {
            console.error("PAYMENT VERIFICATION / ORDER CREATION FAILED:", err);
            setVerificationStep("failed");
            setVerificationError(
              err.response?.data?.message ||
                err.message ||
                "Payment verification could not be completed. If amount was debited, your order will still be processed by our team."
            );
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Razorpay checkout modal closed by user.");
            setProcessingMethod(null);
            setVerificationStep(null);
            toast("Payment window closed. You can retry when ready.", {
              icon: "ℹ️",
            });
          },
        },
        theme: {
          color: "#111111",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("RAZORPAY PAYMENT FAILED:", response.error);
        toast.error(
          response.error?.description || "Payment failed. Please try another method."
        );
        setProcessingMethod(null);
        setVerificationStep(null);
      });

      rzp.open();
    } catch (err) {
      console.error("ONLINE PAYMENT ERROR:", err);
      toast.error(
        err.response?.data?.message || "Failed to initialize payment gateway. Please try again."
      );
      setProcessingMethod(null);
    }
  };

  const handleProceed = () => {
    if (selectedMethod === "online") {
      handleOnlinePayment();
    } else {
      handleCOD();
    }
  };

  const isLoading = processingMethod !== null;
  const itemsList = orderData.items || [];
  const displayedItems = showAllItems ? itemsList : itemsList.slice(0, 3);

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-[#F8F9FB] relative"
      style={{ paddingTop: "80px", paddingBottom: "110px" }}
    >
      {/* ── TOP HEADER / NAV BAR ─────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-6 py-3.5 flex items-center justify-between"
        style={{
          background: "rgba(248,249,251,0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate(-1)}
            disabled={isLoading}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
            style={{
              background: "white",
              border: "1px solid #EFEFEF",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
            }}
            title="Go back"
            aria-label="Go back"
          >
            <ArrowLeft size={16} color="#111" />
          </motion.button>
          <div>
            <h1 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
              Select Payment
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Secure checkout · Zusko Guarantee
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          {[
            { label: "Cart", num: "✓", done: true },
            { label: "Details", num: "✓", done: true },
            { label: "Pay", num: "3", active: true },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-1.5">
              <div
                className="flex items-center justify-center rounded-full font-black text-[11px] transition-all"
                style={{
                  width: step.active ? "26px" : "22px",
                  height: step.active ? "26px" : "22px",
                  background: step.active ? "#101010" : "#E5E7EB",
                  color: step.active ? "#FFD700" : "#6B7280",
                  boxShadow: step.active ? "0 2px 8px rgba(0,0,0,0.18)" : "none",
                }}
              >
                {step.num}
              </div>
              {i < 2 && <div className="w-3.5 sm:w-5 h-0.5 bg-gray-200 rounded-full" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ──────────────────────────────────── */}
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="lg:flex lg:gap-8 lg:items-start">
          {/* ── LEFT COLUMN: PAYMENT METHOD OPTIONS ─────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Amount Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[26px] p-6 sm:p-7"
              style={{
                background:
                  "linear-gradient(135deg, #0A0A0A 0%, #171717 55%, #291C02 100%)",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Radial glow blobs */}
              <div
                className="absolute top-[-50px] right-[-50px] w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.22), transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-[-30px] left-[-20px] w-36 h-36 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.12), transparent 65%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      <Sparkles size={11} className="text-[#FFD700]" />
                      Total Payable Amount
                    </span>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <p
                        className="font-black text-white"
                        style={{
                          fontSize: "clamp(34px, 7.5vw, 50px)",
                          lineHeight: 1,
                        }}
                      >
                        ₹{orderData.total}
                      </p>
                      {orderData.discount > 0 && (
                        <span className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-400/20">
                          Saved ₹{orderData.discount}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5"
                    style={{
                      background: "rgba(255,215,0,0.14)",
                      color: "#FFD700",
                      border: "1px solid rgba(255,215,0,0.3)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Lock size={12} /> 256-Bit SSL Secure
                  </div>
                </div>

                {/* Mini bill breakdown metrics */}
                <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Items Total",
                      val: `₹${orderData.originalTotal ?? orderData.total}`,
                    },
                    {
                      label: "Delivery Fee",
                      val:
                        orderData.deliveryFee === 0
                          ? "FREE"
                          : `₹${orderData.deliveryFee}`,
                      highlight: orderData.deliveryFee === 0,
                    },
                    {
                      label: "Handling Fee",
                      val: `₹${orderData.handlingFee ?? 15}`,
                    },
                  ].map((row) => (
                    <div key={row.label} className="min-w-0">
                      <p
                        className="text-[10px] font-semibold mb-0.5"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {row.label}
                      </p>
                      <p
                        className="text-xs sm:text-sm font-black truncate"
                        style={{
                          color: row.highlight ? "#34D399" : "#FFFFFF",
                        }}
                      >
                        {row.val}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pickup details pill */}
                {orderData.pickup && (
                  <div
                    className="mt-4 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Calendar size={14} className="text-[#FFD700] flex-shrink-0" />
                    <p
                      className="text-[12px] font-medium truncate"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      Pickup Slot:{" "}
                      <span className="font-bold text-white">
                        {orderData.pickup.date} · {orderData.pickup.time}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Section label */}
            <div className="flex items-center justify-between px-1 pt-1">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Choose Payment Mode
              </p>
              <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                RBI Compliant
              </span>
            </div>

            {/* ── OPTION 1: PAY ONLINE (RECOMMENDED) ──────────────────── */}
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedMethod("online")}
              className={`rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-200 border-2 ${
                selectedMethod === "online"
                  ? "border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.18)]"
                  : "border-gray-200 bg-white shadow-xs hover:border-gray-300"
              }`}
              style={{
                background:
                  selectedMethod === "online"
                    ? "linear-gradient(145deg, #121212 0%, #1A1A1A 100%)"
                    : "#FFFFFF",
              }}
            >
              {/* Recommended badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5">
                <span
                  className="text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider"
                  style={{
                    background:
                      selectedMethod === "online"
                        ? "rgba(255,215,0,0.18)"
                        : "#ECFDF5",
                    color:
                      selectedMethod === "online" ? "#FFD700" : "#047857",
                    border:
                      selectedMethod === "online"
                        ? "1px solid rgba(255,215,0,0.3)"
                        : "1px solid #A7F3D0",
                  }}
                >
                  <Sparkles size={10} /> Recommended
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Custom Radio Circle */}
                  <div className="pt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        selectedMethod === "online"
                          ? "bg-[#FFD700] ring-4 ring-amber-400/20"
                          : "border-2 border-gray-300 bg-white"
                      }`}
                    >
                      {selectedMethod === "online" && (
                        <div className="w-2 h-2 rounded-full bg-[#111111]" />
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        selectedMethod === "online"
                          ? "rgba(255,215,0,0.14)"
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
                        className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full"
                      />
                    ) : (
                      <CreditCard
                        size={21}
                        className={
                          selectedMethod === "online"
                            ? "text-[#FFD700]"
                            : "text-purple-600"
                        }
                      />
                    )}
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0 pr-16 sm:pr-24">
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-black text-sm sm:text-base leading-tight ${
                          selectedMethod === "online"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        Pay Online (Razorpay)
                      </p>
                      <span
                        className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-sm"
                        style={{
                          background:
                            selectedMethod === "online"
                              ? "rgba(255,255,255,0.12)"
                              : "#F3F4F6",
                          color:
                            selectedMethod === "online"
                              ? "#FFD700"
                              : "#4B5563",
                        }}
                      >
                        Fastest
                      </span>
                    </div>

                    <p
                      className={`text-[12px] mt-1 leading-snug ${
                        selectedMethod === "online"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      Instant booking confirmation with UPI, Cards, Netbanking
                    </p>

                    {/* Supported options pills */}
                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      {[
                        { icon: <Smartphone size={10} />, label: "GPay / PhonePe / Paytm" },
                        { icon: <CreditCard size={10} />, label: "All Cards" },
                        { icon: <Building2 size={10} />, label: "NetBanking" },
                      ].map((item) => (
                        <span
                          key={item.label}
                          className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background:
                              selectedMethod === "online"
                                ? "rgba(255,255,255,0.08)"
                                : "#F3F4F6",
                            color:
                              selectedMethod === "online"
                                ? "rgba(255,255,255,0.75)"
                                : "#4B5563",
                          }}
                        >
                          {item.icon} {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom sub-bar */}
              <div
                className="px-4 sm:px-5 py-2.5 flex items-center justify-between border-t text-[11px] font-medium"
                style={{
                  borderColor:
                    selectedMethod === "online"
                      ? "rgba(255,255,255,0.08)"
                      : "#F3F4F6",
                  background:
                    selectedMethod === "online"
                      ? "rgba(255,255,255,0.03)"
                      : "#FAFAFA",
                  color:
                    selectedMethod === "online"
                      ? "rgba(255,255,255,0.6)"
                      : "#6B7280",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <Zap size={12} className="text-amber-400" />
                  Auto-verified & slot prioritized
                </span>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                  <Check size={12} /> Zero transaction fee
                </span>
              </div>
            </motion.div>

            {/* ── OPTION 2: CASH ON PICKUP (COD) ───────────────────────── */}
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedMethod("cod")}
              className={`rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-200 border-2 ${
                selectedMethod === "cod"
                  ? "border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.18)]"
                  : "border-gray-200 bg-white shadow-xs hover:border-gray-300"
              }`}
              style={{
                background:
                  selectedMethod === "cod"
                    ? "linear-gradient(145deg, #121212 0%, #1A1A1A 100%)"
                    : "#FFFFFF",
              }}
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Custom Radio Circle */}
                  <div className="pt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        selectedMethod === "cod"
                          ? "bg-[#FFD700] ring-4 ring-amber-400/20"
                          : "border-2 border-gray-300 bg-white"
                      }`}
                    >
                      {selectedMethod === "cod" && (
                        <div className="w-2 h-2 rounded-full bg-[#111111]" />
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        selectedMethod === "cod"
                          ? "rgba(255,215,0,0.14)"
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
                        className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full"
                      />
                    ) : (
                      <Wallet
                        size={21}
                        className={
                          selectedMethod === "cod"
                            ? "text-[#FFD700]"
                            : "text-amber-600"
                        }
                      />
                    )}
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-black text-sm sm:text-base leading-tight ${
                          selectedMethod === "cod"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        Cash / UPI on Pickup
                      </p>
                      <span
                        className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-sm"
                        style={{
                          background:
                            selectedMethod === "cod"
                              ? "rgba(255,255,255,0.12)"
                              : "#FEF3C7",
                          color:
                            selectedMethod === "cod" ? "#FFD700" : "#92400E",
                        }}
                      >
                        Doorstep
                      </span>
                    </div>

                    <p
                      className={`text-[12px] mt-1 leading-snug ${
                        selectedMethod === "cod"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      Hand over clothes first, pay in cash or scanner when pickup rider arrives
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <CheckCircle2
                        size={12}
                        className={
                          selectedMethod === "cod"
                            ? "text-[#FFD700]"
                            : "text-emerald-600"
                        }
                      />
                      <span
                        className="text-[11px] font-semibold"
                        style={{
                          color:
                            selectedMethod === "cod"
                              ? "rgba(255,255,255,0.75)"
                              : "#065F46",
                        }}
                      >
                        No advance payment needed today
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom sub-bar */}
              <div
                className="px-4 sm:px-5 py-2.5 flex items-center justify-between border-t text-[11px] font-medium"
                style={{
                  borderColor:
                    selectedMethod === "cod"
                      ? "rgba(255,255,255,0.08)"
                      : "#F3F4F6",
                  background:
                    selectedMethod === "cod"
                      ? "rgba(255,255,255,0.03)"
                      : "#FAFAFA",
                  color:
                    selectedMethod === "cod"
                      ? "rgba(255,255,255,0.6)"
                      : "#6B7280",
                }}
              >
                <span>Tamper-proof laundry bag provided on spot</span>
                <span className="font-bold">Pay ₹{orderData.total} to rider</span>
              </div>
            </motion.div>

            {/* Trust highlights strip */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {[
                { label: "100% Safe Payments", sub: "Razorpay Protected" },
                { label: "Free Cancellation", sub: "Before Pickup" },
                { label: "Fabric Inspected", sub: "Quality Guaranteed" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-xl p-2.5 text-center bg-white border border-gray-100 shadow-2xs"
                >
                  <p className="text-[11px] font-black text-gray-800 leading-tight">
                    {badge.label}
                  </p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: ORDER SUMMARY & CTAS ───────────────────── */}
          <div className="lg:w-[360px] flex-shrink-0 lg:sticky lg:top-24 mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden bg-white border border-gray-200/80 shadow-md"
            >
              {/* Card Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-gray-900 text-sm">
                    Order Summary
                  </h2>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {itemsList.length} items
                  </span>
                </div>
                <span className="text-[11px] font-bold text-gray-400">
                  Step 3 of 3
                </span>
              </div>

              {/* Items List Preview */}
              <div className="p-3">
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {displayedItems.map((item, i) => {
                    const svcColor = serviceColors[item.service] || {
                      bg: "#F3F4F6",
                      color: "#6B7280",
                    };
                    const isPremium =
                      item.service === "Dry Clean" &&
                      item.careLevel === "premium";

                    return (
                      <div
                        key={`${item.name}-${item.service}-${i}`}
                        className="flex items-center justify-between p-2 rounded-xl bg-gray-50/70 border border-gray-100"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-base flex-shrink-0">
                            {itemEmoji[item.name] || "🧺"}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-800 truncate">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span
                                className="text-[9px] font-bold px-1.5 py-0.2 rounded-full"
                                style={{
                                  background: svcColor.bg,
                                  color: svcColor.color,
                                }}
                              >
                                {item.service}
                              </span>
                              {isPremium && (
                                <span className="text-[9px] font-black text-amber-700 bg-amber-50 px-1 py-0.2 rounded-full border border-amber-200">
                                  Premium
                                </span>
                              )}
                              <span className="text-[10px] text-gray-400 font-semibold">
                                ×{item.qty}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-gray-900 flex-shrink-0 pl-2">
                          ₹{item.qty * item.price}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {itemsList.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllItems(!showAllItems)}
                    className="w-full mt-1.5 py-1 text-center text-[11px] font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center gap-1"
                  >
                    {showAllItems ? (
                      <>
                        Show less <ChevronUp size={12} />
                      </>
                    ) : (
                      <>
                        View all {itemsList.length} items <ChevronDown size={12} />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Delivery Address & Pickup Preview */}
              {orderData.address && (
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/40 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-600 leading-tight">
                      <span className="font-bold text-gray-800">
                        {orderData.address.name || "Doorstep Address"}:
                      </span>{" "}
                      {orderData.address.fullAddress || orderData.address.address},{" "}
                      {orderData.address.city} – {orderData.address.pincode}
                    </p>
                  </div>
                </div>
              )}

              {/* Bill Details */}
              <div className="px-5 py-3 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Item Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ₹{orderData.originalTotal ?? orderData.total}
                  </span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles size={11} /> Coupon Discount
                      {orderData.couponCode && ` (${orderData.couponCode})`}
                    </span>
                    <span>−₹{orderData.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Doorstep Delivery</span>
                  <span
                    className={`font-bold ${
                      orderData.deliveryFee === 0
                        ? "text-emerald-600"
                        : "text-gray-900"
                    }`}
                  >
                    {orderData.deliveryFee === 0
                      ? "FREE"
                      : `₹${orderData.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Handling & Care</span>
                  <span className="font-bold text-gray-900">
                    ₹{orderData.handlingFee ?? 15}
                  </span>
                </div>
              </div>

              {/* Total & Action Area */}
              <div className="p-5 border-t border-gray-100 bg-gray-50/70">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">
                      Total Payable
                    </p>
                    <p className="text-2xl font-black text-gray-900 leading-tight">
                      ₹{orderData.total}
                    </p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Inclusive of taxes
                  </span>
                </div>

                {/* Main Action Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceed}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                  style={{
                    background:
                      selectedMethod === "online"
                        ? "linear-gradient(135deg, #111111 0%, #1e1700 100%)"
                        : "linear-gradient(135deg, #B45309 0%, #78350F 100%)",
                    color: "#FFFFFF",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>
                        {processingMethod === "online"
                          ? "Connecting to Gateway..."
                          : "Booking Your Slot..."}
                      </span>
                    </div>
                  ) : (
                    <>
                      {selectedMethod === "online" ? (
                        <>
                          <Lock size={15} className="text-[#FFD700]" />
                          <span>Pay ₹{orderData.total} via Razorpay</span>
                          <ChevronRight size={16} className="text-[#FFD700] ml-auto" />
                        </>
                      ) : (
                        <>
                          <Wallet size={15} />
                          <span>Place Order with Cash (₹{orderData.total})</span>
                          <ChevronRight size={16} className="ml-auto" />
                        </>
                      )}
                    </>
                  )}
                </motion.button>

                {/* Subtext */}
                <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-gray-400 font-medium">
                  <ShieldCheck size={13} className="text-gray-500" />
                  <span>
                    {selectedMethod === "online"
                      ? "Powered by Razorpay · 100% Encrypted"
                      : "Pay in cash or scan QR when clothes are picked up"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STICKY CTA BAR (MOBILE ONLY) ────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
        <div className="max-w-[500px] mx-auto flex items-center gap-3">
          <div className="min-w-[85px]">
            <p className="text-[10px] text-gray-400 font-bold uppercase">
              Total to pay
            </p>
            <p className="text-xl font-black text-gray-900 leading-none">
              ₹{orderData.total}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleProceed}
            disabled={isLoading}
            className="flex-1 py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-between text-white shadow-md"
            style={{
              background:
                selectedMethod === "online"
                  ? "linear-gradient(135deg, #101010 0%, #1c1500 100%)"
                  : "linear-gradient(135deg, #B45309 0%, #78350F 100%)",
            }}
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span className="text-xs">Processing...</span>
              </div>
            ) : (
              <>
                <div className="text-left">
                  <p className="text-xs leading-none">
                    {selectedMethod === "online" ? "Pay Online" : "Confirm COD"}
                  </p>
                  <p className="text-[10px] text-white/60 font-medium mt-0.5">
                    {selectedMethod === "online"
                      ? "UPI, Cards, Netbanking"
                      : "Pay at Doorstep"}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#FFD700] text-[#111] flex items-center justify-center">
                  <ChevronRight size={14} />
                </div>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* ── FULL SCREEN PAYMENT VERIFICATION OVERLAY ─────────────────── */}
      <AnimatePresence>
        {verificationStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(10, 10, 10, 0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="w-full max-w-[420px] rounded-3xl overflow-hidden p-6 sm:p-7 text-center relative border border-white/10"
              style={{
                background:
                  "linear-gradient(145deg, #141414 0%, #0d0d0d 100%)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              }}
            >
              {/* Gold bloom in top corner */}
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.2), transparent 70%)",
                }}
              />

              {verificationStep === "failed" ? (
                /* ERROR STATE */
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center bg-red-500/15 border border-red-500/30 text-red-400">
                    <AlertCircle size={28} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">
                      Payment Verification Notice
                    </h3>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed">
                      {verificationError}
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setVerificationStep(null);
                        setProcessingMethod(null);
                      }}
                      className="w-full py-3 rounded-xl font-bold text-xs bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      Try Again
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          `https://wa.me/918004411976?text=${encodeURIComponent(
                            `Hi Zusko! My online payment completed but verification had an issue. Amount: ₹${orderData.total}. Can you please assist?`
                          )}`,
                          "_blank"
                        )
                      }
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle size={14} /> WhatsApp Support Assistance
                    </button>
                  </div>
                </div>
              ) : (
                /* ACTIVE VERIFYING / CONFIRMING / SUCCESS STATE */
                <div className="relative z-10 space-y-5">
                  {/* Glowing Animated Spinner */}
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.4,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border-3 border-transparent border-t-[#FFD700] border-r-[#FFD700]/40"
                    />
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.05) 100%)",
                        border: "1px solid rgba(255,215,0,0.3)",
                      }}
                    >
                      {verificationStep === "success" ? (
                        <Check size={26} className="text-[#FFD700]" strokeWidth={3} />
                      ) : (
                        <Lock size={22} className="text-[#FFD700]" />
                      )}
                    </div>
                  </div>

                  {/* Headline & Description */}
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {verificationStep === "verifying" &&
                        "Validating Payment with Bank..."}
                      {verificationStep === "creating_order" &&
                        "Confirming Your Laundry Slot..."}
                      {verificationStep === "success" &&
                        "Payment Verified! Order Booked!"}
                    </h3>
                    <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                      Please do not refresh or press back button. Securing your booking details.
                    </p>
                  </div>

                  {/* Step Sequence Checklist */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-left text-xs">
                    <div className="flex items-center gap-2.5 text-white/90">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="font-semibold">
                        Razorpay Payment Authorized
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          verificationStep === "verifying"
                            ? "bg-amber-400/20 text-amber-300"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {verificationStep === "verifying" ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "linear",
                            }}
                            className="w-2.5 h-2.5 border-2 border-amber-300 border-t-transparent rounded-full"
                          />
                        ) : (
                          <Check size={12} strokeWidth={3} />
                        )}
                      </div>
                      <span
                        className={
                          verificationStep === "verifying"
                            ? "font-bold text-[#FFD700]"
                            : "font-semibold text-white/90"
                        }
                      >
                        Validating Gateway Signature
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          verificationStep === "creating_order"
                            ? "bg-amber-400/20 text-amber-300"
                            : verificationStep === "success"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-white/10 text-white/30"
                        }`}
                      >
                        {verificationStep === "creating_order" ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "linear",
                            }}
                            className="w-2.5 h-2.5 border-2 border-amber-300 border-t-transparent rounded-full"
                          />
                        ) : verificationStep === "success" ? (
                          <Check size={12} strokeWidth={3} />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        )}
                      </div>
                      <span
                        className={
                          verificationStep === "creating_order"
                            ? "font-bold text-[#FFD700]"
                            : verificationStep === "success"
                            ? "font-semibold text-white/90"
                            : "text-white/40"
                        }
                      >
                        Generating Order ID & Scheduling Pickup
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/40">
                    256-bit bank encrypted transaction · Zusko India
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
