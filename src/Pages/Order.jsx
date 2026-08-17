import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Shirt, Baby, Home, Sparkles,
  ChevronRight, Clock, Zap, Wind, Droplets, Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";

// ─── DATA ────────────────────────────────────────────────────────────────────

const categories = {
  Men: {
    emoji: "👔",
    subtitle: "13 items",
    items: [
      { name: "Shirt", basePrice: 20 },
      { name: "T-Shirt", basePrice: 15 },
      { name: "Jeans", basePrice: 40 },
      { name: "Trousers", basePrice: 35 },
      { name: "Shorts", basePrice: 25 },
      { name: "Kurta", basePrice: 30 },
      { name: "Blazer", basePrice: 80 },
      { name: "Suit (2 Piece)", basePrice: 120 },
      { name: "Suit (3 Piece)", basePrice: 150 },
      { name: "Jacket", basePrice: 70 },
      { name: "Sweater", basePrice: 50 },
      { name: "Hoodie", basePrice: 45 },
      { name: "Innerwear", basePrice: 10 },
    ],
  },
  Women: {
    emoji: "👗",
    subtitle: "12 items",
    items: [
      { name: "Kurti", basePrice: 30 },
      { name: "Leggings", basePrice: 20 },
      { name: "Saree (Normal)", basePrice: 80 },
      { name: "Saree (Heavy)", basePrice: 120 },
      { name: "Blouse", basePrice: 25 },
      { name: "Top", basePrice: 25 },
      { name: "Dress", basePrice: 60 },
      { name: "Gown", basePrice: 100 },
      { name: "Dupatta", basePrice: 20 },
      { name: "Skirt", basePrice: 35 },
      { name: "Jacket", basePrice: 70 },
      { name: "Sweater", basePrice: 50 },
    ],
  },
  Kids: {
    emoji: "🧒",
    subtitle: "8 items",
    items: [
      { name: "Kids Shirt", basePrice: 10 },
      { name: "Kids T-Shirt", basePrice: 8 },
      { name: "Kids Jeans", basePrice: 20 },
      { name: "Kids Shorts", basePrice: 15 },
      { name: "School Uniform", basePrice: 25 },
      { name: "Kids Jacket", basePrice: 30 },
      { name: "Kids Sweater", basePrice: 25 },
      { name: "Frock", basePrice: 20 },
    ],
  },
  Household: {
    emoji: "🏠",
    subtitle: "11 items",
    items: [
      { name: "Bedsheet (Single)", basePrice: 40 },
      { name: "Bedsheet (Double)", basePrice: 50 },
      { name: "Blanket", basePrice: 80 },
      { name: "Quilt/Rajai", basePrice: 120 },
      { name: "Pillow Cover", basePrice: 10 },
      { name: "Curtains (Light)", basePrice: 60 },
      { name: "Curtains (Heavy)", basePrice: 100 },
      { name: "Sofa Cover", basePrice: 90 },
      { name: "Towel", basePrice: 15 },
      { name: "Carpet (Small)", basePrice: 100 },
      { name: "Carpet (Large)", basePrice: 200 },
    ],
  },
};

const services = [
  {
    name: "Wash & Fold",
    multiplier: 0.8,
    icon: <Droplets size={18} />,
    desc: "Clean & neatly folded",
    time: "24 hrs",
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    name: "Wash & Iron",
    multiplier: 1,
    icon: <Wind size={18} />,
    desc: "Washed & pressed crisp",
    time: "36 hrs",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    popular: true,
  },
  {
    name: "Dry Clean",
    multiplier: 3,
    icon: <Layers size={18} />,
    desc: "Premium solvent care",
    time: "48 hrs",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    name: "Steam Iron",
    multiplier: 0.7,
    icon: <Zap size={18} />,
    desc: "Quick steam press only",
    time: "12 hrs",
    color: "#10B981",
    bg: "#ECFDF5",
  },
];

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

// ─── SKELETON ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-100" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
      {/* Top row */}
      <div className="flex items-start gap-4 px-5 pt-5 pb-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex-shrink-0" />
        <div className="flex-1 pt-1">
          <div className="h-4 w-36 bg-gray-100 rounded-full mb-2" />
          <div className="h-3 w-24 bg-gray-100 rounded-full" />
        </div>
      </div>
      {/* Divider */}
      <div style={{ height: "1px", background: "#F5F5F5", marginLeft: "20px", marginRight: "20px" }} />
      {/* Bottom row */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <div>
          <div className="h-3 w-20 bg-gray-100 rounded-full mb-1.5" />
          <div className="h-5 w-12 bg-gray-100 rounded-full" />
        </div>
        <div className="h-10 w-24 bg-gray-100 rounded-full" />
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function BookLaundry() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedService, setSelectedService] = useState("Wash & Iron");
  const [search, setSearch] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  const getSmartPlaceholders = () => {
    const hour = new Date().getHours();
    if (hour < 12) return ["Search Shirt...", "Search T-Shirt...", "Search Jeans..."];
    else if (hour < 18) return ["Search Kurti...", "Search Saree...", "Search Dress..."];
    else return ["Search Jacket...", "Search Sweater...", "Search Blanket..."];
  };
  const placeholders = getSmartPlaceholders();

  const { cart, addItem, increaseQty, decreaseQty } = useContext(CartContext);

  const getItemQty = (item) =>
    cart.find((i) => i.name === item.name && i.service === selectedService)?.qty ?? 0;

  const getPrice = (item) => {
    const service = services.find((s) => s.name === selectedService);
    return Math.round(item.basePrice * service.multiplier);
  };

  const currentItems =
    search.length > 0
      ? Object.values(categories)
          .flatMap((c) => c.items)
          .filter((item, idx, arr) => arr.findIndex((i) => i.name === item.name) === idx)
          .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      : categories[selectedCategory].items;

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // Active order
useEffect(() => {
  if (!user || !token) {
    setIsLoading(false);
    return;
  }

  let cancelled = false;

  const fetchActiveOrder = async () => {
    try {
      const res = await API.get("/orders/active");

      if (!cancelled && res.data?.data?.length > 0) {
        setActiveOrder(res.data.data[0]);
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error(
          "ACTIVE ORDER ERROR:",
          err
        );
      }
    } finally {
      if (!cancelled) {
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      }
    }
  };

  fetchActiveOrder();

  return () => {
    cancelled = true;
  };
}, [user, token]);

  // Typewriter
  useEffect(() => {
    const current = placeholders[placeholderIndex];
    let timeout;
    if (!isDeleting) {
      timeout = setTimeout(() => setPlaceholderText(current.substring(0, placeholderText.length + 1)), 80);
    } else {
      timeout = setTimeout(() => setPlaceholderText(current.substring(0, placeholderText.length - 1)), 40);
    }
    if (!isDeleting && placeholderText === current) timeout = setTimeout(() => setIsDeleting(true), 800);
    if (isDeleting && placeholderText === "") {
      setIsDeleting(false);
      setPlaceholderIndex((p) => (p + 1) % placeholders.length);
    }
    return () => clearTimeout(timeout);
  }, [placeholderText, isDeleting, placeholderIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB]" style={{ paddingBottom: cartCount > 0 ? "100px" : "40px" }}>

      {/* ══════════════════════════════════════════
          HERO — full bleed, no max-width cap
      ══════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          background: "linear-gradient(135deg, #0c0c0c 0%, #161616 55%, #221a00 100%)",
          paddingTop: "80px",
        }}
      >
        {/* Decorative blobs — large on desktop */}
        <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.18]"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 65%)" }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full pointer-events-none opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 65%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 65%)" }} />

        {/* Hero inner — wider on desktop */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-10 pb-14">
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">

            {/* Left: headline copy */}
            <div className="lg:max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 mb-5"
              >
                
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-black leading-[1.08] text-white"
                style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
              >
                Clean Clothes.<br />
                <span style={{ color: "#FFD700" }}>Delivered Fast.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-4 text-sm lg:text-base"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Free Pickup · Premium Fabric Care · Same Day Service
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-2 mt-6"
              >
                {[
                  { icon: "🚚", label: "Slot Based Pickup" },
                  { icon: "⭐", label: "Trusted Service" },
                  { icon: "🧺", label: "Fabric Safe" },
                ].map((chip) => (
                  <span key={chip.label}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}>
                    {chip.icon} {chip.label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: stats strip — hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex gap-8 pb-1"
            >
              {[
                { val: "1K+", label: "Happy Customers" },
                { val: "4.9★", label: "Average Rating" },
                { val: "24hr", label: "Turnaround" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-black text-3xl text-white">{stat.val}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SEARCH BAR — floats over hero bottom
      ══════════════════════════════════════════ */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24" style={{ marginTop: "-26px", position: "relative", zIndex: 30 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
          className="relative"
          style={{
            background: "white",
            borderRadius: "18px",
            boxShadow: searchFocused
              ? "0 0 0 3px rgba(255,215,0,0.3), 0 8px 40px rgba(0,0,0,0.13)"
              : "0 4px 30px rgba(0,0,0,0.11)",
            transition: "box-shadow 0.25s ease",
            /* On desktop stretch to full column width */
            maxWidth: "100%",
          }}
        >
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: searchFocused ? "#FFD700" : "#9CA3AF", transition: "color 0.2s" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder=""
            className="w-full h-14 bg-transparent outline-none text-sm font-medium text-gray-800"
            style={{ paddingLeft: "48px", paddingRight: "44px", borderRadius: "18px" }}
          />
          {!search && (
            <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-sm flex items-center gap-0.5 text-gray-400"
              style={{ left: "48px" }}>
              <span>{placeholderText}</span>
              <span style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}>|</span>
            </div>
          )}
          {search && (
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#F3F4F6" }}
              whileTap={{ scale: 0.85 }}
            >
              <X size={13} color="#6B7280" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN LAYOUT
          Mobile:  single column stack
          Desktop: left sidebar (fixed 280px) + scrollable content area
      ══════════════════════════════════════════ */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 mt-6">
        <div className="lg:flex lg:gap-8 xl:gap-10 lg:items-start">

          {/* ── LEFT SIDEBAR (desktop only) ───────────────── */}
          <aside className="hidden lg:block lg:w-[260px] xl:w-[280px] flex-shrink-0 lg:sticky lg:top-24">

            {/* Active order — sidebar version */}
            <AnimatePresence>
              {activeOrder && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/track-order/${activeOrder._id}`)}
                  className="mb-5 rounded-2xl overflow-hidden cursor-pointer select-none"
                  style={{
                    background: "linear-gradient(135deg, #101010, #1e1700)",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.20)",
                  }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "#FFD700" }}>
                          Active Order
                        </span>
                        <p className="text-white font-bold text-sm mt-0.5 capitalize">
                          {activeOrder.status.replaceAll("-", " ")}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                          #{activeOrder.orderId}
                        </p>
                      </div>
                      <span className="text-xl">🚚</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: "65%" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                        className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#FFD700,#FFA500)" }} />
                    </div>
                    <div className="flex items-center justify-end mt-3">
                      <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#FFD700" }}>
                        Track Live <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Categories — sidebar list */}
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Category</p>
              <div className="space-y-1.5">
                {Object.entries(categories).map(([cat, data]) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedCategory(cat); setSearch(""); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                      style={{
                        background: isSelected ? "linear-gradient(135deg,#FFD700,#FFA500)" : "white",
                        border: isSelected ? "none" : "1px solid #F0F0F0",
                        boxShadow: isSelected ? "0 4px 16px rgba(255,165,0,0.28)" : "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <span className="text-xl leading-none">{data.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm leading-none ${isSelected ? "text-gray-900" : "text-gray-800"}`}>{cat}</p>
                        <p className={`text-[11px] mt-0.5 ${isSelected ? "text-gray-700" : "text-gray-400"}`}>{data.subtitle}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Services — sidebar list */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Service</p>
              <div className="space-y-1.5">
                {services.map((service) => {
                  const isSelected = selectedService === service.name;
                  return (
                    <motion.button
                      key={service.name}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedService(service.name)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 relative"
                      style={{
                        background: isSelected ? "#101010" : "white",
                        border: isSelected ? "none" : "1px solid #F0F0F0",
                        boxShadow: isSelected ? "0 4px 16px rgba(0,0,0,0.18)" : "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: isSelected ? "rgba(255,215,0,0.15)" : service.bg, color: isSelected ? "#FFD700" : service.color }}>
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm leading-none ${isSelected ? "text-white" : "text-gray-800"}`}>{service.name}</p>
                        <p className={`text-[11px] mt-0.5 truncate ${isSelected ? "text-gray-400" : "text-gray-400"}`}>{service.desc}</p>
                      </div>
                      {service.popular && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: isSelected ? "rgba(255,215,0,0.2)" : "#FFF7E6", color: isSelected ? "#FFD700" : "#D97706" }}>
                          HOT
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT COLUMN ───────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Active order — mobile only */}
            <AnimatePresence>
              {activeOrder && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/track-order/${activeOrder._id}`)}
                  className="lg:hidden mb-5 rounded-3xl overflow-hidden cursor-pointer"
                  style={{ background: "linear-gradient(135deg,#101010,#1e1700)", boxShadow: "0 8px 28px rgba(0,0,0,0.2)" }}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#FFD700" }}>Active Order</span>
                        <p className="text-white font-bold text-lg mt-1 capitalize">{activeOrder.status.replaceAll("-", " ")}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>#{activeOrder.orderId}</p>
                      </div>
                      <span className="text-3xl">🚚</span>
                    </div>
                    <div className="mt-4 w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: "65%" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                        className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#FFD700,#FFA500)" }} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Est. delivery in 2 hrs</span>
                      <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#FFD700" }}>Track Live <ChevronRight size={13} /></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile: categories 2-col grid */}
            <div className="lg:hidden mb-5">
              <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">Category</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(categories).map(([cat, data], i) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      whileTap={{ scale: 0.94 }}
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => { setSelectedCategory(cat); setSearch(""); }}
                      className="relative overflow-hidden text-left p-4 rounded-2xl"
                      style={{
                        background: isSelected ? "linear-gradient(135deg,#FFD700,#FFA500)" : "white",
                        border: isSelected ? "none" : "1px solid #F0F0F0",
                        boxShadow: isSelected ? "0 6px 20px rgba(255,165,0,0.3)" : "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      <span className="text-2xl block mb-2">{data.emoji}</span>
                      <p className={`font-bold text-[14px] ${isSelected ? "text-gray-900" : "text-gray-800"}`}>{cat}</p>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? "text-gray-700" : "text-gray-400"}`}>{data.subtitle}</p>
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile: services horizontal scroll */}
            <div className="lg:hidden mb-5">
              <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">Service Type</h2>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {services.map((service, i) => {
                  const isSelected = selectedService === service.name;
                  return (
                    <motion.button
                      key={service.name}
                      whileTap={{ scale: 0.93 }}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => setSelectedService(service.name)}
                      className="relative flex-shrink-0 p-4 rounded-2xl text-left"
                      style={{
                        width: "150px",
                        background: isSelected ? "#101010" : "white",
                        border: isSelected ? "none" : "1px solid #F0F0F0",
                        boxShadow: isSelected ? "0 6px 20px rgba(0,0,0,0.22)" : "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      {service.popular && (
                        <span className="absolute top-3 right-3 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: isSelected ? "rgba(255,215,0,0.2)" : "#FFF7E6", color: isSelected ? "#FFD700" : "#D97706" }}>
                          HOT
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5"
                        style={{ background: isSelected ? "rgba(255,215,0,0.15)" : service.bg, color: isSelected ? "#FFD700" : service.color }}>
                        {service.icon}
                      </div>
                      <p className={`text-sm font-bold leading-tight ${isSelected ? "text-white" : "text-gray-800"}`}>{service.name}</p>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? "text-gray-400" : "text-gray-400"}`}>{service.desc}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock size={10} color={isSelected ? "#FFD700" : "#9CA3AF"} />
                        <span className={`text-[10px] font-semibold ${isSelected ? "text-yellow-400" : "text-gray-400"}`}>{service.time}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ── ITEM GRID / LIST ─────────────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-bold text-gray-900">
                  {search ? `Results for "${search}"` : selectedCategory}
                </h2>
                <span className="text-xs text-gray-400 font-medium">{currentItems.length} items</span>
              </div>

              {/*
                Always single column — names need full width, especially
                on xl where the right cart panel already eats space.
              */}
              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence mode="popLayout">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : currentItems.length === 0
                    ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-full flex flex-col items-center py-20 text-center"
                      >
                        <span className="text-5xl mb-4">🔍</span>
                        <p className="font-bold text-gray-800 text-lg">Nothing found</p>
                        <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSearch("")}
                          className="mt-5 px-6 py-2.5 rounded-full text-sm font-bold"
                          style={{ background: "#FFD700", color: "#101010" }}
                        >
                          Browse All Clothes
                        </motion.button>
                      </motion.div>
                    )
                    : currentItems.map((item, i) => {
                        const qty = getItemQty(item);
                        const price = getPrice(item);
                        return (
                          <ItemCard
                            key={`${selectedCategory}-${item.name}`}
                            item={item}
                            qty={qty}
                            price={price}
                            index={i}
                            selectedService={selectedService}
                            selectedCategory={selectedCategory}
                            addItem={addItem}
                            increaseQty={increaseQty}
                            decreaseQty={decreaseQty}
                          />
                        );
                      })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Cart summary (desktop, xl+) ── */}
          {cartCount > 0 && (
            <aside className="hidden xl:block xl:w-[340px] flex-shrink-0 xl:sticky xl:top-24">
              <CartSummaryPanel cart={cart} cartCount={cartCount} cartTotal={cartTotal} navigate={navigate} />
            </aside>
          )}

        </div>
      </div>

      {/* ── STICKY CART BAR (mobile + non-xl desktop) ── */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="xl:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
            style={{ pointerEvents: "none" }}
          >
            <div className="max-w-[860px] mx-auto" style={{ pointerEvents: "auto" }}>
              <div className="rounded-2xl p-1"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 -2px 30px rgba(0,0,0,0.10), 0 8px 28px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(255,255,255,0.9)",
                }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/cart")}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-[18px]"
                  style={{ background: "linear-gradient(135deg,#101010,#1e1700)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm"
                      style={{ background: "#FFD700", color: "#101010" }}>
                      {cartCount}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm leading-none">View Cart</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {cartCount} {cartCount === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">₹{cartTotal}</span>
                    <ChevronRight size={16} color="#FFD700" />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CART SUMMARY PANEL (desktop right rail) ─────────────────────────────────

function CartSummaryPanel({ cart, cartCount, cartTotal, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #F0F0F0", background: "white" }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-sm">Your Cart</h3>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: "#FFF9E6", color: "#D97706" }}>
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Items — stacked layout so names never clip */}
      <div className="py-2 max-h-80 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={`${item.name}-${item.service}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 py-3 border-b border-gray-50 last:border-0"
            >
              {/* Name + service row */}
              <div className="flex items-start gap-2.5 mb-2">
                <span className="text-lg leading-none flex-shrink-0 mt-0.5">
                  {itemEmoji[item.name] || "🧺"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-gray-800 leading-snug break-words">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.service}</p>
                </div>
              </div>
              {/* Qty × price row */}
              <div className="flex items-center justify-between pl-8">
                <span className="text-xs text-gray-400 font-medium">
                  ₹{item.price} × {item.qty}
                </span>
                <span className="text-sm font-black text-gray-900">
                  ₹{item.price * item.qty}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Subtotal</span>
          <span className="font-bold text-gray-900">₹{cartTotal}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/cart")}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg,#101010,#1e1700)", color: "white" }}
        >
          View Cart
          <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#FFD700" }}>
            <ChevronRight size={12} color="#101010" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── ITEM CARD ────────────────────────────────────────────────────────────────

function ItemCard({ item, qty, price, index, selectedService, selectedCategory, addItem, increaseQty, decreaseQty }) {
  const emoji = itemEmoji[item.name] || "🧺";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 280, damping: 24 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl"
      style={{
        boxShadow: qty > 0 ? "0 4px 20px rgba(255,215,0,0.12)" : "0 2px 10px rgba(0,0,0,0.06)",
        border: qty > 0 ? "1.5px solid rgba(255,215,0,0.45)" : "1px solid #F0F0F0",
        transition: "border 0.15s, box-shadow 0.15s",
      }}
    >
      {/* Top row: emoji icon + name + service tag */}
      <div className="flex items-start gap-4 px-5 pt-5 pb-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: qty > 0 ? "#FFF9E6" : "#F8F9FB" }}
        >
          {emoji}
        </div>

        {/* Name + service */}
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="font-bold text-gray-900 text-[16px] leading-snug break-words">
            {item.name}
          </p>
          <span
            className="inline-block mt-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: "#F3F4F6", color: "#6B7280" }}
          >
            {selectedService}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#F5F5F5", marginLeft: "20px", marginRight: "20px" }} />

      {/* Bottom row: price left, action right */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <div>
          <p className="text-[11px] text-gray-400 mb-0.5">Price per piece</p>
          <p className="font-black text-gray-900 text-[18px] leading-none">₹{price}</p>
        </div>

        <AnimatePresence mode="wait">
          {qty === 0 ? (
            <motion.button
              key="add"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => addItem({ ...item, price, service: selectedService, category: selectedCategory })}
              className="h-10 px-7 rounded-full font-bold text-sm"
              style={{ background: "#FFD700", color: "#101010" }}
            >
              Add
            </motion.button>
          ) : (
            <motion.div
              key="stepper"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="flex items-center rounded-full overflow-hidden"
              style={{ background: "#101010" }}
            >
              <motion.button
                whileTap={{ scale: 0.82 }}
                onClick={() => decreaseQty({ ...item, service: selectedService })}
                className="w-10 h-10 flex items-center justify-center text-xl font-bold text-white"
              >
                −
              </motion.button>
              <span className="text-white font-bold text-sm w-7 text-center">{qty}</span>
              <motion.button
                whileTap={{ scale: 0.82 }}
                onClick={() => increaseQty({ ...item, service: selectedService })}
                className="w-10 h-10 flex items-center justify-center text-xl font-bold"
                style={{ color: "#FFD700" }}
              >
                +
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}