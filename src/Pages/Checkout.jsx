import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  MapPin, Calendar, Clock, ChevronRight, User,
  Phone, ArrowLeft, CheckCircle, AlertCircle, Loader2,
  Package, Sparkles, Shield,
} from "lucide-react";

// ─── SERVICE COLOR MAP ────────────────────────────────────────────────────────
const serviceColors = {
  "Wash & Fold":  { bg: "#EFF6FF", color: "#3B82F6" },
  "Wash & Iron":  { bg: "#F5F3FF", color: "#8B5CF6" },
  "Dry Clean":    { bg: "#FFFBEB", color: "#F59E0B" },
  "Steam Iron":   { bg: "#ECFDF5", color: "#10B981" },
};

// ─── ITEM EMOJI MAP ───────────────────────────────────────────────────────────
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

// ─── REUSABLE INPUT ───────────────────────────────────────────────────────────
function PremiumInput({ icon: Icon, label, error, hint, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && (
        <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
          {label}
        </label>
      )}
      <div
        className="relative flex items-center rounded-2xl transition-all duration-200"
        style={{
          background: "white",
          border: error
            ? "1.5px solid #FCA5A5"
            : focused
            ? "1.5px solid #FFD700"
            : "1.5px solid #EFEFEF",
          boxShadow: focused
            ? "0 0 0 3px rgba(255,215,0,0.15)"
            : "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {Icon && (
          <div className="pl-4 flex-shrink-0">
            <Icon size={16} color={focused ? "#FFD700" : error ? "#F87171" : "#9CA3AF"} />
          </div>
        )}
        {children ? (
          <div className="flex-1">
            {children}
          </div>
        ) : (
          <input
            {...props}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
            className="w-full px-4 py-3.5 bg-transparent outline-none text-sm font-medium text-gray-800 placeholder-gray-300"
            style={{ borderRadius: "16px" }}
          />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
        {!error && hint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 text-[11px] text-gray-400"
          >
            {hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
function SectionCard({ icon: Icon, iconColor = "#FFD700", iconBg = "#FFF9E6", title, badge, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          <Icon size={16} color={iconColor} />
        </div>
        <h2 className="font-bold text-gray-900 text-sm flex-1">{title}</h2>
        {badge && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "#F3F4F6", color: "#6B7280" }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="px-5 py-4 space-y-4">{children}</div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Checkout() {
const {
  cart,
  total,
  finalTotal,
  handlingCharge,
  discount,
  coupon,
  clearCart,
} = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [deliveryFee, setDeliveryFee] = useState(0);
  const finalAmount = finalTotal + deliveryFee;

  const SERVICEABLE_PINCODES = ["284001","284002","284003","284127","284128","284135","284419"];
  const DELIVERY_FEES = { 284001: 30, 284002: 40, 284003: 50, 284127: 60, 284128: 70, 284419: 80 };

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [checkingPin, setCheckingPin] = useState(false);
  const [pinError, setPinError] = useState("");
  const [alternateContact, setAlternateContact] = useState(false);

  const pincode = watch("pincode");
  const selectedDate = watch("date");

  // ── All existing logic preserved exactly ──────────────────────────────────

  useEffect(() => { if (!user) navigate("/login"); }, [user]);

  useEffect(() => {
    if (pincode?.length === 6) fetchCity(pincode);
  }, [pincode]);

  useEffect(() => {
    if (pincode?.length === 6) {
      setDeliveryFee(total >= 200 ? 0 : DELIVERY_FEES[pincode] || 100);
    }
  }, [pincode, total]);

  const fetchCity = async (pin) => {
    try {
      setCheckingPin(true);
      setPinError("");
      setCity("");
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`, { timeout: 8000 });
      if (res.data?.[0]?.Status === "Success" && res.data?.[0]?.PostOffice?.length) {
        setCity(res.data[0].PostOffice[0].District);
        return;
      }
      setPinError("Invalid Pincode");
    } catch {
      try {
        const fallback = await axios.get(`https://api.zippopotam.us/IN/${pin}`, { timeout: 8000 });
        if (fallback.data?.places?.length) { setCity(fallback.data.places[0]["place name"]); return; }
        setPinError("Invalid Pincode");
      } catch { setPinError("Location service temporarily unavailable"); }
    } finally { setCheckingPin(false); }
  };

  const getAvailableTimeSlots = () => {
    const allSlots = [
      { label: "9 AM - 12 PM", endHour: 12 },
      { label: "12 PM - 3 PM", endHour: 15 },
      { label: "3 PM - 6 PM", endHour: 18 },
    ];
    if (!selectedDate) return allSlots;
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate !== today) return allSlots;
    const currentHour = new Date().getHours();
    return allSlots.filter((s) => s.endHour > currentHour);
  };

  const onSubmit = async (data) => {
    const { fullAddress, pincode, date, time } = data;
    if (!city) { alert("Enter valid pincode first"); return; }
    if (!SERVICEABLE_PINCODES.includes(pincode)) { alert("🚫 We don't serve this area yet"); return; }
    setLoading(true);
    try {
      const orderData = {
  vendorId: "6962ad3e962db6a05ddb10dd",

  customerName: user.name,
  customerPhone: user.phone,

  pickupContact: alternateContact
    ? {
        name: data.pickupContactName,
        phone: data.pickupContactPhone,
      }
    : {
        name: user.name,
        phone: user.phone,
      },

  pickup: {
    date,
    time,
  },

  address: {
    fullAddress,
    city,
    pincode,
  },

  items: cart.map((item) => ({
    name: item.name,
    qty: item.qty,
    price: item.price,
    service: item.service,
  })),

  originalTotal: total,

  handlingFee: handlingCharge,

  total: finalAmount,

  discount,

  deliveryFee,

  // 🔥 IMPORTANT
  couponCode: coupon || null,

  payment: {
    status: "pending",
    method: "COD",
    amount: finalAmount,
  },
};
      navigate("/payment", { state: { orderData } });
    } catch (error) {
      console.error(error);
      alert("Order failed");
    } finally { setLoading(false); }
  };

  const availableSlots = getAvailableTimeSlots();

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8F9FB]" style={{ paddingTop: "80px", paddingBottom: "110px" }}>

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
          onClick={() => navigate("/cart")}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
        >
          <ArrowLeft size={16} color="#111" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-gray-900 leading-none">Select Pickup & Delivery Address</h1>
          <p className="text-[11px] text-gray-400 mt-0.5">Complete your order details</p>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          {["Cart", "Details", "Pay"].map((step, i) => (
            <div key={step} className="flex items-center gap-1.5">
              <div
                className="flex items-center justify-center rounded-full font-bold"
                style={{
                  width: i === 1 ? "24px" : "20px",
                  height: i === 1 ? "24px" : "20px",
                  fontSize: i === 1 ? "11px" : "10px",
                  background: i === 0 ? "#E5E7EB" : i === 1 ? "#101010" : "#F3F4F6",
                  color: i === 0 ? "#9CA3AF" : i === 1 ? "#FFD700" : "#D1D5DB",
                }}
              >
                {i === 0 ? "✓" : i + 1}
              </div>
              {i < 2 && <div className="w-4 h-px" style={{ background: i === 0 ? "#E5E7EB" : "#E5E7EB" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ────────────────────────────────────────── */}
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 pt-5">
        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* ── LEFT COLUMN: forms ─────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* ── 1. PICKUP ADDRESS ─────────────────────────────────── */}
            <SectionCard
              icon={MapPin}
              iconColor="#EF4444"
              iconBg="#FEF2F2"
              title="Pickup & Delivery Address"
            >
              {/* Full address */}
              <PremiumInput
                label="Full Address"
                icon={MapPin}
                placeholder="House / flat no., street, area..."
                error={errors.fullAddress?.message}
                {...register("fullAddress", { required: "Address is required" })}
              />

              {/* Pincode */}
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Pincode
                </label>
                <div className="relative">
                  <PremiumInput
                    icon={MapPin}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    error={errors.pincode?.message || pinError}
                    {...register("pincode", {
                      required: "Pincode is required",
                      pattern: { value: /^[0-9]{6}$/, message: "Enter valid 6-digit pincode" },
                    })}
                  />
                </div>

                {/* City detection status */}
                <AnimatePresence>
                  {checkingPin && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 mt-2"
                    >
                      <Loader2 size={13} color="#9CA3AF" className="animate-spin" />
                      <span className="text-[12px] text-gray-400">Detecting location…</span>
                    </motion.div>
                  )}
                  {city && !checkingPin && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 mt-2"
                    >
                      <CheckCircle size={14} color="#10B981" />
                      <span
                        className="text-[12px] font-bold px-3 py-1 rounded-full"
                        style={{ background: "#ECFDF5", color: "#065F46" }}
                      >
                        📍 {city}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionCard>

            {/* ── 2. PICKUP CONTACT ─────────────────────────────────── */}
            <SectionCard
              icon={Phone}
              iconColor="#8B5CF6"
              iconBg="#F5F3FF"
              title="Pickup Contact"
            >
              {/* User info chip */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: "#F8F9FB", border: "1px solid #EFEFEF" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                  style={{ background: "#FFD700", color: "#101010" }}
                >
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-[13px] leading-none">{user?.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{user?.phone}</p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#ECFDF5", color: "#065F46" }}
                  >
                    Default
                  </span>
                </div>
              </div>

              {/* Alternate contact toggle */}
              <label
                className="flex items-start gap-3 cursor-pointer select-none"
                style={{ userSelect: "none" }}
              >
                <div className="relative shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={alternateContact}
                    onChange={(e) => setAlternateContact(e.target.checked)}
                  />
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-150"
                    style={{
                      background: alternateContact ? "#101010" : "white",
                      border: alternateContact ? "none" : "1.5px solid #D1D5DB",
                    }}
                  >
                    {alternateContact && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-none">Someone else will hand over</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Add an alternate pickup contact</p>
                </div>
              </label>

              <AnimatePresence>
                {alternateContact && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <PremiumInput
                      label="Contact Name"
                      icon={User}
                      placeholder="Full name"
                      error={errors.pickupContactName?.message}
                      {...register("pickupContactName", {
                        required: alternateContact ? "Contact name is required" : false,
                      })}
                    />
                    <PremiumInput
                      label="Mobile Number"
                      icon={Phone}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      error={errors.pickupContactPhone?.message}
                      hint="This number will be used during pickup coordination."
                      {...register("pickupContactPhone", {
                        required: alternateContact ? "Mobile number is required" : false,
                        pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
                      })}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </SectionCard>

            {/* ── 3. PICKUP SCHEDULE ────────────────────────────────── */}
            <SectionCard
              icon={Calendar}
              iconColor="#3B82F6"
              iconBg="#EFF6FF"
              title="Pickup Schedule"
            >
              {/* Date */}
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Date
                </label>
                <div
                  className="flex items-center rounded-2xl overflow-hidden transition-all duration-200"
                  style={{ border: errors.date ? "1.5px solid #FCA5A5" : "1.5px solid #EFEFEF", background: "white" }}
                >
                  <div className="pl-4">
                    <Calendar size={16} color="#9CA3AF" />
                  </div>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date", { required: "Select a pickup date" })}
                    className="flex-1 px-4 py-3.5 bg-transparent outline-none text-sm font-medium text-gray-800"
                  />
                </div>
                {errors.date && (
                  <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500">
                    <AlertCircle size={11} /> {errors.date.message}
                  </p>
                )}
              </div>

              {/* Time slots */}
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Time Slot
                </label>

                {availableSlots.length === 0 ? (
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium"
                    style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FCA5A5" }}
                  >
                    <AlertCircle size={14} />
                    No pickup slots available for today. Please select another date.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {availableSlots.map((slot) => {
                      // We use a hidden select for react-hook-form compatibility
                      // and render visual radio-style cards
                      return null; // replaced by native select below for RHF compat
                    })}
                    {/* Native select styled as premium dropdown */}
                    <div
                      className="flex items-center rounded-2xl overflow-hidden"
                      style={{ border: errors.time ? "1.5px solid #FCA5A5" : "1.5px solid #EFEFEF", background: "white" }}
                    >
                      <div className="pl-4">
                        <Clock size={16} color="#9CA3AF" />
                      </div>
                      <select
                        {...register("time", { required: "Select a time slot" })}
                        className="flex-1 px-4 py-3.5 bg-transparent outline-none text-sm font-medium text-gray-800 appearance-none cursor-pointer"
                      >
                        <option value="">Choose a time slot</option>
                        {availableSlots.map((slot) => (
                          <option key={slot.label} value={slot.label}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                      <div className="pr-4">
                        <ChevronRight size={14} color="#9CA3AF" className="rotate-90" />
                      </div>
                    </div>
                    {errors.time && (
                      <p className="flex items-center gap-1 text-[11px] font-medium text-red-500">
                        <AlertCircle size={11} /> {errors.time.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Note */}
              <div
                className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
                style={{ background: "#F8F9FB" }}
              >
                <span className="text-base shrink-0">⚡</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Our team will arrive within your selected slot. You'll get an Email confirmation once your order is placed.
                </p>
              </div>
            </SectionCard>

          </div>

          {/* ── RIGHT COLUMN: sticky order summary ───────────────── */}
          <div className="lg:w-[340px] shrink-0 lg:sticky lg:top-24 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm">Order Summary</h2>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "#FFF9E6", color: "#D97706" }}
                >
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Cart items */}
              <div className="px-5 py-3 space-y-2.5 max-h-64 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                {cart.map((item) => {
                  const svcColor = serviceColors[item.service] || { bg: "#F3F4F6", color: "#6B7280" };
                  return (
                    <div key={item.name + item.service} className="flex items-start gap-2.5 py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-base shrink-0">{itemEmoji[item.name] || "🧺"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-800 wrap-break-word leading-snug">{item.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: svcColor.bg, color: svcColor.color }}
                          >
                            {item.service}
                          </span>
                          <span className="text-[10px] text-gray-400">× {item.qty}</span>
                        </div>
                      </div>
                      <span className="text-[13px] font-black text-gray-900 shrink-0">
                        ₹{item.qty * item.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bill breakdown */}
              <div className="px-5 py-3 space-y-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Item Total</span>
                  <span className="font-semibold text-gray-800">₹{total}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <Sparkles size={12} /> Coupon Discount
                    </span>
                    <span className="font-semibold text-green-600">−₹{discount}</span>
                  </div>
                )}
                {pincode?.length === 6 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Pickup & Delivery</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : "text-gray-800"}`}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Handling Charges</span>
                  <span className="font-semibold text-gray-800">₹{handlingCharge}</span>
                </div>
              </div>

              {/* Total block */}
              <div className="px-5 pb-4">
                <div
                  className="flex items-center justify-between px-4 py-4 rounded-2xl"
                  style={{ background: "#F8F9FB", border: "1px solid #EFEFEF" }}
                >
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">Amount to Pay</p>
                    <p className="font-black text-gray-900 text-2xl leading-none">₹{finalAmount}</p>
                  </div>
                </div>
              </div>

              {/* Place order button — desktop */}
              <div className="px-5 pb-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{
                    background: loading ? "#374151" : "linear-gradient(135deg,#101010,#1e1700)",
                    color: "white",
                    opacity: loading ? 0.85 : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Placing Order…
                    </>
                  ) : (
                    <>
                      Select Payment Method
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "#FFD700" }}
                      >
                        <ChevronRight size={14} color="#101010" />
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {[
                    { icon: <Shield size={11} />, label: "Secure" },
                    { icon: <Package size={11} />, label: "Free Pickup" },
                    { icon: <CheckCircle size={11} />, label: "Trusted" },
                  ].map((b) => (
                    <span key={b.label} className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                      {b.icon} {b.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── STICKY PLACE ORDER BAR (mobile / tablet only) ─────────── */}
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
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="w-full flex items-center justify-between px-5 py-4 rounded-[18px]"
              style={{
                background: loading ? "#374151" : "linear-gradient(135deg,#101010,#1e1700)",
              }}
            >
              <div className="text-left">
                <p className="text-[10px] font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Amount to Pay
                </p>
                <p className="text-white font-black text-xl leading-none">₹{finalAmount}</p>
              </div>
              <div className="flex items-center gap-2">
                {loading ? (
                  <Loader2 size={16} color="white" className="animate-spin" />
                ) : (
                  <>
                    <span className="text-white font-bold text-sm">Place Order</span>
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