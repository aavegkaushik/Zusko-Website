import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Sparkles,
  ChevronRight, Clock, Zap, Wind, Droplets, Layers,
  Check, ArrowUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";

// ─── DATA ────────────────────────────────────────────────────────────────────

const categoryMeta = {
  Men: { emoji: "👔" },
  Women: { emoji: "👗" },
  Kids: { emoji: "🧒" },
  Household: { emoji: "🏠" },
};

const services = [
  { name: "Wash & Fold", icon: <Droplets size={18} />, desc: "Clean & neatly folded", time: "24 hrs", color: "#3B82F6", bg: "#EFF6FF" },
  { name: "Wash & Iron", icon: <Wind size={18} />, desc: "Washed & pressed crisp", time: "36 hrs", color: "#8B5CF6", bg: "#F5F3FF", popular: true },
  { name: "Dry Clean", icon: <Layers size={18} />, desc: "Premium solvent care", time: "48 hrs", color: "#F59E0B", bg: "#FFFBEB" },
  { name: "Steam Iron", icon: <Zap size={18} />, desc: "Quick steam press only", time: "12 hrs", color: "#10B981", bg: "#ECFDF5" },
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
    <div
      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 flex items-center gap-3 sm:gap-4 animate-pulse"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-100 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-4 w-32 sm:w-44 bg-gray-100 rounded-full mb-2" />
        <div className="h-3 w-20 bg-gray-100 rounded-full mb-2" />
        <div className="h-4 w-16 bg-gray-100 rounded-full" />
      </div>
      <div className="h-9 w-20 sm:h-10 sm:w-24 bg-gray-100 rounded-full flex-shrink-0" />
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function BookLaundry() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedService, setSelectedService] = useState("Wash & Iron");
  const [search, setSearch] = useState("");
  const [selectedCareLevel, setSelectedCareLevel] = useState("regular");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pricing, setPricing] = useState([]);
  const [pricingLoading, setPricingLoading] = useState(true);
  const [pricingError, setPricingError] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mobile service carousel ref
  const serviceScrollRef = useRef(null);

  const scrollServices = () => {
    if (!serviceScrollRef.current) return;
    serviceScrollRef.current.scrollBy({
      left: 160,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          setShowScrollTop((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSmartPlaceholders = () => {
    const hour = new Date().getHours();
    if (hour < 12) return ["Search Shirt...", "Search T-Shirt...", "Search Jeans..."];
    else if (hour < 18) return ["Search Kurti...", "Search Saree...", "Search Dress..."];
    else return ["Search Jacket...", "Search Sweater...", "Search Blanket..."];
  };
  const placeholders = getSmartPlaceholders();

  const { cart, addItem, increaseQty, decreaseQty } = useContext(CartContext);

  const getItemQty = (item) => {
    const careLevel =
      selectedService === "Dry Clean" ? selectedCareLevel : "regular";

    return (
      cart.find(
        (i) =>
          (i.pricingId
            ? String(i.pricingId) === String(item._id)
            : i.name === item.name &&
              i.variant === (item.variant || "") &&
              i.service === selectedService) &&
          (i.careLevel || "regular") === careLevel
      )?.qty ?? 0
    );
  };

  const categoryCounts = Object.keys(categoryMeta).reduce((acc, category) => {
    const uniqueItems = new Set(
      pricing
        .filter((item) => item.category === category)
        .map((item) => `${item.name}::${item.variant || ""}`)
    );
    acc[category] = uniqueItems.size;
    return acc;
  }, {});

  const currentItems = pricing
    .filter((item) => item.service === selectedService)
    .filter((item) => item.category === selectedCategory)
    .filter((item) =>
      selectedService === "Dry Clean"
        ? (item.careLevel || "regular") === selectedCareLevel
        : (item.careLevel || "regular") === "regular"
    )
    .filter((item) => {
      if (!search.trim()) return true;
      const searchText = [item.name, item.variant, item.description]
        .filter(Boolean).join(" ").toLowerCase();
      return searchText.includes(search.toLowerCase());
    })
    .sort(
      (a, b) =>
        Number(a.sortOrder || 0) - Number(b.sortOrder || 0) ||
        String(a.name).localeCompare(String(b.name)) ||
        String(a.variant || "").localeCompare(String(b.variant || ""))
    );

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // Dynamic pricing
  useEffect(() => {
    let cancelled = false;

    const fetchPricing = async () => {
      try {
        setPricingLoading(true);
        setPricingError("");

        const res = await API.get("/pricing");

        if (cancelled) return;

        const rows = Array.isArray(res.data?.data) ? res.data.data : [];

        setPricing(
          rows.filter(
            (item) =>
              item &&
              item.active !== false &&
              item._id &&
              item.service &&
              item.category &&
              item.name &&
              Number.isFinite(Number(item.price))
          )
        );
      } catch (err) {
        if (!cancelled) {
          console.error("PRICING FETCH ERROR:", err);
          setPricing([]);
          setPricingError(
            err.response?.data?.message || "Unable to load pricing right now."
          );
        }
      } finally {
        if (!cancelled) setPricingLoading(false);
      }
    };

    fetchPricing();

    return () => {
      cancelled = true;
    };
  }, []);

  // Active order
  useEffect(() => {
    if (!user || !token || !isAuthenticated) {
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
          console.error("ACTIVE ORDER ERROR:", err);
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
    <div
      className="min-h-screen bg-[#F8F9FB]"
      style={{
        paddingBottom: cartCount > 0 ? "calc(88px + env(safe-area-inset-bottom, 16px))" : "48px",
      }}
    >

      {/* ══════════════════════════════════════════
          HERO — Optimized: Compact on mobile, expansive on desktop
      ══════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(255,215,0,0.16), transparent 30%), linear-gradient(135deg, #080808 0%, #121212 50%, #1a1504 100%)",
          paddingTop: "68px",
        }}
      >
        {/* Decorative ambient lights */}
        <div
          className="absolute top-[-70px] right-[-70px] w-80 sm:w-[460px] h-80 sm:h-[460px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 65%)" }}
        />
        <div
          className="absolute bottom-[-50px] left-[-50px] w-56 sm:w-72 h-56 sm:h-72 rounded-full pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 65%)" }}
        />

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-6 pb-11 sm:pt-9 sm:pb-16">
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">

            {/* Left: headline copy */}
            <div className="lg:max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 sm:mb-4 text-[11px] sm:text-xs font-bold"
                style={{
                  background: "rgba(255,215,0,0.10)",
                  border: "1px solid rgba(255,215,0,0.25)",
                  color: "#FFD700",
                }}
              >
                <Sparkles size={12} />
                <span>Premium Doorstep Laundry & Dry Clean</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-black leading-[1.1] text-white text-2xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight"
              >
                Clean Clothes.<br />
                <span style={{ color: "#FFD700" }}>Delivered Fast.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2.5 sm:mt-4 text-xs sm:text-sm lg:text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Doorstep pickup · Expert fabric care · Effortless reordering
              </motion.p>

              {/* Quick Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-2 mt-4 sm:mt-6"
              >
                {[
                  { icon: "🚚", label: "Slot Pickup" },
                  { icon: "⭐", label: "4.9★ Rated" },
                  { icon: "🧺", label: "Fabric Safe" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <span>{chip.icon}</span>
                    <span>{chip.label}</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: stats strip — desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="hidden lg:flex items-stretch gap-3 pb-1"
            >
              {[
                { val: "1K+", label: "Happy Customers" },
                { val: "4.9★", label: "Average Rating" },
                { val: "24hr", label: "Turnaround" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-[110px] rounded-2xl border px-4 py-3.5 text-center"
                  style={{
                    background: "rgba(255,255,255,0.045)",
                    borderColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <p className="font-black text-2xl text-white tracking-tight">{stat.val}</p>
                  <p className="text-[10px] mt-1 uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SEARCH BAR — floats over hero bottom
      ══════════════════════════════════════════ */}
      <div
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24"
        style={{ marginTop: "-22px", position: "relative", zIndex: 30 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 220 }}
          className="relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.98)",
            borderRadius: "18px",
            boxShadow: searchFocused
              ? "0 0 0 3px rgba(255,215,0,0.35), 0 8px 30px rgba(0,0,0,0.12)"
              : "0 4px 24px rgba(0,0,0,0.09)",
            transition: "box-shadow 0.2s ease",
            maxWidth: "100%",
          }}
        >
          <Search
            size={18}
            className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: searchFocused ? "#EAB308" : "#9CA3AF", transition: "color 0.2s" }}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder=""
            className="w-full h-[52px] sm:h-[58px] bg-transparent outline-none text-sm sm:text-base font-semibold text-gray-900"
            style={{ paddingLeft: "46px", paddingRight: "44px", borderRadius: "18px" }}
          />

          {!search && (
            <div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-xs sm:text-sm flex items-center gap-0.5 text-gray-400 font-medium"
              style={{ left: "46px" }}
            >
              <span>{placeholderText}</span>
              <span style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}>|</span>
            </div>
          )}

          {search && (
            <motion.button
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              whileTap={{ scale: 0.85 }}
              aria-label="Clear search"
            >
              <X size={14} color="#4B5563" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN LAYOUT
          Mobile: single column streamlined stack
          Desktop: left sidebar (sticky 280px) + content + right cart
      ══════════════════════════════════════════ */}
      <div className="w-full max-w-[1480px] mx-auto px-3.5 sm:px-6 lg:px-12 xl:px-20 mt-5 sm:mt-8">
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
                          {activeOrder.status?.replaceAll("-", " ")}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                          #{activeOrder.orderId}
                        </p>
                      </div>
                      <span className="text-xl">🚚</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg,#FFD700,#FFA500)" }}
                      />
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
                {Object.entries(categoryMeta).map(([cat, data]) => {
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
                        <p className={`text-[11px] mt-0.5 ${isSelected ? "text-gray-700" : "text-gray-400"}`}>{categoryCounts[cat] || 0} items</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-white" strokeWidth={2.5} />
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
                      onClick={() => {
                        setSelectedService(service.name);
                        if (service.name !== "Dry Clean") {
                          setSelectedCareLevel("regular");
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 relative"
                      style={{
                        background: isSelected ? "#101010" : "white",
                        border: isSelected ? "none" : "1px solid #F0F0F0",
                        boxShadow: isSelected ? "0 4px 16px rgba(0,0,0,0.18)" : "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: isSelected ? "rgba(255,215,0,0.15)" : service.bg, color: isSelected ? "#FFD700" : service.color }}
                      >
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm leading-none ${isSelected ? "text-white" : "text-gray-800"}`}>{service.name}</p>
                        <p className={`text-[11px] mt-0.5 truncate ${isSelected ? "text-gray-400" : "text-gray-400"}`}>{service.desc}</p>
                      </div>
                      {service.popular && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: isSelected ? "rgba(255,215,0,0.2)" : "#FFF7E6", color: isSelected ? "#FFD700" : "#D97706" }}
                        >
                          HOT
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Dry Clean Care Level (sidebar) */}
            {selectedService === "Dry Clean" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-3"
              >
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-7 h-7 rounded-lg bg-yellow-400 flex items-center justify-center">
                    <Sparkles size={14} className="text-black" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-gray-900">Choose Care Level</p>
                    <p className="text-[10px] text-gray-500">Select how we handle your clothes</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCareLevel("regular")}
                    className={`rounded-xl border p-2.5 text-left transition-all ${
                      selectedCareLevel === "regular"
                        ? "border-gray-900 bg-gray-900 text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold">Regular</span>
                      {selectedCareLevel === "regular" && <Check size={12} className="text-amber-400" />}
                    </div>
                    <p className="text-[10px] text-gray-400">Standard dry clean</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCareLevel("premium")}
                    className={`relative rounded-xl border p-2.5 text-left transition-all ${
                      selectedCareLevel === "premium"
                        ? "border-yellow-400 bg-yellow-400 text-black shadow-md font-semibold"
                        : "border-yellow-200 bg-white text-gray-800 hover:border-yellow-400"
                    }`}
                  >
                    <span className="absolute -top-2 right-2 rounded-full bg-black px-1.5 py-0.5 text-[8px] font-black tracking-wide text-yellow-400">
                      PREMIUM
                    </span>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold">Premium</span>
                      {selectedCareLevel === "premium" && <Check size={12} />}
                    </div>
                    <p className="text-[10px] text-gray-800">Extra care & finishing</p>
                  </button>
                </div>
              </motion.div>
            )}
          </aside>

          {/* ── MAIN CONTENT COLUMN ───────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Mobile Active Order Banner — Sleek & compact */}
            <AnimatePresence>
              {activeOrder && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/track-order/${activeOrder._id}`)}
                  className="lg:hidden mb-4 rounded-2xl overflow-hidden cursor-pointer border border-amber-500/25"
                  style={{
                    background: "linear-gradient(135deg, #101010 0%, #1a1402 100%)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.16)",
                  }}
                >
                  <div className="p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                        </span>
                        <span className="text-[10px] font-black tracking-wider uppercase text-[#FFD700]">
                          Active Order
                        </span>
                        <span className="text-[10px] text-gray-400">
                          #{activeOrder.orderId}
                        </span>
                      </div>
                      <span className="text-xs font-black text-amber-400 flex items-center gap-0.5">
                        Track Live <ChevronRight size={13} />
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-white font-extrabold text-sm capitalize">
                        {activeOrder.status?.replaceAll("-", " ")}
                      </p>
                      <span className="text-[11px] text-gray-400">
                        Est. delivery in 2 hrs
                      </span>
                    </div>

                    <div className="mt-2.5 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile: 4-Column Category Grid — Space-saving & ergonomic */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  Categories
                </h2>
                <span className="text-[11px] font-bold text-gray-400">
                  {categoryCounts[selectedCategory] || 0} items
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {Object.entries(categoryMeta).map(([cat, data], i) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      whileTap={{ scale: 0.94 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSearch("");
                      }}
                      className={`relative p-2 sm:p-2.5 rounded-2xl text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? "shadow-[0_4px_16px_rgba(255,165,0,0.32)] border-transparent"
                          : "bg-white border-gray-100 hover:border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
                      } border`}
                      style={{
                        background: isSelected
                          ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                          : "white",
                      }}
                    >
                      <span className="text-2xl sm:text-3xl block leading-none mb-1">
                        {data.emoji}
                      </span>
                      <span
                        className={`font-black text-[12px] sm:text-xs leading-tight truncate w-full ${
                          isSelected ? "text-gray-950 font-extrabold" : "text-gray-700"
                        }`}
                      >
                        {cat}
                      </span>
                      <span
                        className={`text-[9px] font-bold mt-0.5 ${
                          isSelected ? "text-gray-900/80" : "text-gray-400"
                        }`}
                      >
                        {categoryCounts[cat] || 0}
                      </span>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-950 mt-1" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Services Snap Carousel */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  Service Type
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                  {selectedService}
                </span>
              </div>

              <div className="relative -mx-3.5 sm:-mx-6 px-3.5 sm:px-6">
                <div
                  ref={serviceScrollRef}
                  className="flex gap-2.5 overflow-x-auto pb-2 pt-0.5 snap-x snap-mandatory"
                  style={{
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {services.map((service, i) => {
                    const isSelected = selectedService === service.name;
                    return (
                      <motion.button
                        key={service.name}
                        whileTap={{ scale: 0.94 }}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => {
                          setSelectedService(service.name);
                          if (service.name !== "Dry Clean") {
                            setSelectedCareLevel("regular");
                          }
                        }}
                        className={`snap-start relative flex-shrink-0 p-3 rounded-2xl text-left transition-all ${
                          isSelected
                            ? "bg-[#101010] text-white shadow-[0_6px_20px_rgba(0,0,0,0.22)] border-amber-400/40"
                            : "bg-white text-gray-800 border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                        } border`}
                        style={{ width: "138px" }}
                      >
                        {service.popular && (
                          <span
                            className="absolute top-2.5 right-2.5 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                            style={{
                              background: isSelected ? "rgba(255,215,0,0.22)" : "#FFF7E6",
                              color: isSelected ? "#FFD700" : "#D97706",
                              border: isSelected ? "1px solid rgba(255,215,0,0.4)" : "1px solid #FDE68A",
                            }}
                          >
                            HOT
                          </span>
                        )}
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                          style={{
                            background: isSelected ? "rgba(255,215,0,0.15)" : service.bg,
                            color: isSelected ? "#FFD700" : service.color,
                          }}
                        >
                          {service.icon}
                        </div>
                        <p className="text-[13px] font-black leading-tight truncate">
                          {service.name}
                        </p>
                        <p
                          className={`text-[10px] mt-0.5 truncate ${
                            isSelected ? "text-gray-400" : "text-gray-400"
                          }`}
                        >
                          {service.desc}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock size={10} color={isSelected ? "#FFD700" : "#9CA3AF"} />
                          <span
                            className={`text-[10px] font-bold ${
                              isSelected ? "text-amber-400" : "text-gray-500"
                            }`}
                          >
                            {service.time}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile: Dry Clean Care Level */}
            {selectedService === "Dry Clean" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 to-white p-3"
              >
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-400 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={13} className="text-black" />
                    </div>
                    <span className="text-xs font-black text-gray-900">Dry Clean Care Level</span>
                  </div>
                  <span className="text-[10px] text-amber-800 font-semibold bg-amber-100/70 px-2 py-0.5 rounded-full">
                    {selectedCareLevel === "premium" ? "Premium Active" : "Regular Active"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCareLevel("regular")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedCareLevel === "regular"
                        ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Standard</span>
                      {selectedCareLevel === "regular" && <Check size={12} className="text-amber-400" />}
                    </div>
                    <p className={`text-[10px] mt-0.5 ${selectedCareLevel === "regular" ? "text-gray-300" : "text-gray-400"}`}>
                      Standard care
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCareLevel("premium")}
                    className={`relative p-2.5 rounded-xl border text-left transition-all ${
                      selectedCareLevel === "premium"
                        ? "border-amber-400 bg-gradient-to-br from-amber-400 to-yellow-400 text-black shadow-sm font-semibold"
                        : "border-amber-200/80 bg-white text-gray-800 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black flex items-center gap-1">
                        ✨ Premium
                      </span>
                      {selectedCareLevel === "premium" && <Check size={12} className="text-black" />}
                    </div>
                    <p className={`text-[10px] mt-0.5 ${selectedCareLevel === "premium" ? "text-black/80 font-medium" : "text-gray-400"}`}>
                      Extra finishing
                    </p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── ITEM GRID / LIST ─────────────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
                      {selectedService}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">
                      {selectedCategory}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black tracking-tight text-gray-950 mt-0.5">
                    {search ? `Results for "${search}"` : `${selectedCategory} Collection`}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full transition-colors"
                    >
                      Clear <X size={11} />
                    </button>
                  )}
                  <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-extrabold text-gray-600 shadow-xs">
                    {currentItems.length} {currentItems.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              {/* Responsive Single Column List */}
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                <AnimatePresence mode="popLayout">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : currentItems.length === 0
                    ? (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-full flex flex-col items-center py-14 sm:py-20 text-center bg-white rounded-3xl border border-gray-100 p-6"
                      >
                        <span className="text-4xl sm:text-5xl mb-3">🔍</span>
                        <p className="font-extrabold text-gray-900 text-base sm:text-lg">No clothes found</p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xs">
                          {search ? `We couldn't find anything matching "${search}"` : "No items available in this category & service."}
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSearch("")}
                          className="mt-4 px-5 py-2 rounded-full text-xs sm:text-sm font-black shadow-sm"
                          style={{ background: "#FFD700", color: "#101010" }}
                        >
                          Browse All Clothes
                        </motion.button>
                      </motion.div>
                    )
                    : currentItems.map((item, i) => {
                        const qty = getItemQty(item);
                        const price = Number(item.price);
                        return (
                          <ItemCard
                            key={item._id}
                            item={item}
                            qty={qty}
                            price={price}
                            index={i}
                            selectedService={selectedService}
                            selectedCareLevel={selectedCareLevel}
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

      {/* ── MOBILE SCROLL TO TOP BUTTON ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="xl:hidden fixed right-3.5 z-40 w-9 h-9 rounded-full bg-white/95 text-gray-800 shadow-md border border-gray-200 flex items-center justify-center transition-transform"
            style={{
              bottom: cartCount > 0 ? "calc(78px + env(safe-area-inset-bottom, 14px))" : "20px",
            }}
          >
            <ArrowUp size={16} strokeWidth={2.4} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── STICKY CART BAR (mobile + non-xl desktop) ── */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="xl:hidden fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
          >
            <div className="max-w-[700px] mx-auto pointer-events-auto">
              <div
                className="rounded-2xl p-1 shadow-[0_8px_30px_rgba(0,0,0,0.20)] border border-white/80"
                style={{
                  background: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/cart")}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-3 rounded-xl transition-transform"
                  style={{
                    background: "linear-gradient(135deg, #0f0f0f 0%, #1e1700 100%)",
                  }}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm text-gray-950 shadow-sm"
                      style={{
                        background: "linear-gradient(135deg, #FFD700, #FFA500)",
                      }}
                    >
                      {cartCount}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-extrabold text-xs sm:text-sm leading-tight flex items-center gap-1.5">
                        <span>View Laundry Bag</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {cartCount} {cartCount === 1 ? "item" : "items"} added
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-right">
                      <p className="text-white font-black text-sm sm:text-base leading-tight">
                        ₹{cartTotal}
                      </p>
                      <p className="text-[9px] text-[#FFD700] uppercase font-bold tracking-wider">
                        Proceed →
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#FFD700]">
                      <ChevronRight size={14} />
                    </div>
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
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: "#FFF9E6", color: "#D97706" }}
        >
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Items — stacked layout */}
      <div className="py-2 max-h-80 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={`${item.pricingId || item._id || item.name}-${item.service}-${item.careLevel || "regular"}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 py-3 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-start gap-2.5 mb-2">
                <span className="text-lg leading-none flex-shrink-0 mt-0.5">
                  {itemEmoji[item.name] || "🧺"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-gray-800 leading-snug break-words">
                    {item.variant ? `${item.name} (${item.variant})` : item.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.service}</p>
                  {item.careLevel === "premium" && (
                    <span
                      className="inline-flex items-center gap-1 mt-1 text-[9px] font-extrabold px-2 py-0.5 rounded-full"
                      style={{
                        background: "#FFF4BF",
                        color: "#92400E",
                        border: "1px solid #FDE68A",
                      }}
                    >
                      <Sparkles size={9} />
                      Premium Care
                    </span>
                  )}
                </div>
              </div>

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
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 font-medium">Subtotal</span>
          <span className="font-extrabold text-gray-900 text-base">₹{cartTotal}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/cart")}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg,#101010,#1e1700)", color: "white" }}
        >
          View Cart
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#FFD700" }}
          >
            <ChevronRight size={12} color="#101010" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── ITEM CARD (Mobile-first, Responsive & Ultra-Clean) ────────────────────────

function ItemCard({
  item,
  qty,
  price,
  index,
  selectedService,
  selectedCareLevel,
  selectedCategory,
  addItem,
  increaseQty,
  decreaseQty
}) {
  const emoji =
    itemEmoji[item.name] ||
    itemEmoji[item.variant ? `${item.name} (${item.variant})` : item.name] ||
    "🧺";

  const displayName = item.variant ? `${item.name} (${item.variant})` : item.name;
  const isInCart = qty > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.25), type: "spring", stiffness: 280, damping: 24 }}
      className={`rounded-2xl transition-all duration-200 relative overflow-hidden ${
        isInCart
          ? "bg-gradient-to-r from-amber-50/40 via-white to-white border-amber-300 shadow-[0_4px_16px_rgba(255,215,0,0.12)]"
          : "bg-white border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
      } border`}
    >
      {/* Visual in-cart accent stripe on left */}
      {isInCart && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] to-[#FFA500]" />
      )}

      {/* Unified flex row: Icon + Details + Action */}
      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
        {/* Emoji Icon Container */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 transition-transform ${
            isInCart ? "scale-105" : ""
          }`}
          style={{
            background: isInCart
              ? "linear-gradient(135deg, #FFF9E6, #FEF3C7)"
              : "#F8F9FB",
            border: isInCart ? "1px solid rgba(255,215,0,0.35)" : "1px solid #F0F2F5",
          }}
        >
          {emoji}
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0 pr-1">
          <h3 className="font-bold text-gray-900 text-[14px] sm:text-[16px] leading-snug truncate">
            {displayName}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {selectedService}
            </span>

            {selectedService === "Dry Clean" && selectedCareLevel === "premium" && (
              <span
                className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full"
                style={{
                  background: "#FFF4BF",
                  color: "#92400E",
                  border: "1px solid #FDE68A",
                }}
              >
                <Sparkles size={9} />
                Premium
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-black text-gray-950 text-base sm:text-lg leading-none">
              ₹{price}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">/ piece</span>
          </div>
        </div>

        {/* Action Button: Add or Stepper */}
        <div className="flex-shrink-0 flex items-center justify-end">
          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  addItem({
                    ...item,
                    pricingId: item._id,
                    price,
                    service: selectedService,
                    careLevel:
                      selectedService === "Dry Clean"
                        ? selectedCareLevel
                        : "regular",
                    category: selectedCategory,
                  })
                }
                className="h-9 px-4 sm:h-10 sm:px-6 rounded-full font-black text-xs sm:text-sm flex items-center justify-center gap-1 transition-all shadow-xs active:shadow-none"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FBBF24)",
                  color: "#111827",
                  boxShadow: "0 2px 8px rgba(251, 191, 36, 0.35)",
                }}
              >
                <span>Add</span>
                <span className="text-base leading-none font-black">+</span>
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="flex items-center rounded-full overflow-hidden p-0.5 shadow-md"
                style={{
                  background: "#101010",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() =>
                    decreaseQty({
                      ...item,
                      pricingId: item._id,
                      service: selectedService,
                      careLevel:
                        selectedService === "Dry Clean"
                          ? selectedCareLevel
                          : "regular",
                    })
                  }
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-lg font-bold text-white hover:text-amber-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </motion.button>
                <span className="text-amber-300 font-black text-xs sm:text-sm w-6 sm:w-7 text-center">
                  {qty}
                </span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() =>
                    increaseQty({
                      ...item,
                      pricingId: item._id,
                      service: selectedService,
                      careLevel:
                        selectedService === "Dry Clean"
                          ? selectedCareLevel
                          : "regular",
                    })
                  }
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-lg font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}