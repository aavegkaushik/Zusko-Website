import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Gift,
  Package,
  LifeBuoy,
  LogOut,
  ShieldCheck,
  Edit2,
  MapPin,
  CreditCard,
  Bell,
  Lock,
  Receipt,
  TrendingUp,
  Shield,
  ArrowRight,
  ArrowUpRight,
  Sun,
  Moon,
  CloudSun,
  Award,
  Wallet,
  Sparkles,
  Coins,
  Globe,
  BadgeCheck,
  CheckCircle,
  CircleCheckBig,
  ScanFace,
  ChevronRight,
  Copy,
  Check,
  X,
  RefreshCw,
  Clock,
  Truck,
  Tag,
  ExternalLink,
  Share2,
  ChevronDown,
  AlertCircle,
  Save,
  MessageCircle,
} from "lucide-react";

import API from "../config/api";
import AddressModal from "../components/AddressModal";
import AllAddressesModal from "../components/AllAddressesModal";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Live state
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  // Active Modals
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'rewards' | 'invoices' | 'payments' | 'notifications' | 'security' | 'logout'
  const [isAllAddressesOpen, setIsAllAddressesOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // In-page quick edit form state
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [editSaving, setEditSaving] = useState(false);

  // Notification preference toggles (in modal)
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    orderUpdates: true,
    whatsappAlerts: true,
    promotions: false,
  });

  // Fetch all live profile and order data
  const fetchDashboardData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const [profileRes, activeOrdersRes, historyOrdersRes, addressesRes] =
        await Promise.allSettled([
          API.get("/profile"),
          API.get("/orders/active"),
          API.get("/orders/history"),
          API.get("/addresses"),
        ]);

      if (profileRes.status === "fulfilled" && profileRes.value.data?.data) {
        const liveUser = profileRes.value.data.data;
        if (updateUser) updateUser(liveUser);
        setEditForm({
          name: liveUser.name || "",
          email: liveUser.email || "",
          phone: liveUser.phone || "",
        });
      }

      if (activeOrdersRes.status === "fulfilled") {
        setActiveOrders(activeOrdersRes.value.data?.data || []);
      }

      if (historyOrdersRes.status === "fulfilled") {
        setHistoryOrders(historyOrdersRes.value.data?.data || []);
      }

      if (addressesRes.status === "fulfilled") {
        setAddresses(addressesRes.value.data?.data || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [updateUser]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Calculations
  const allOrders = [...activeOrders, ...historyOrders];
  const totalOrdersCount = allOrders.length;
  const completedOrdersCount = historyOrders.length;
  const activeOrdersCount = activeOrders.length;

  // Real or derived loyalty points & savings
  const computedPoints =
    user?.loyaltyPoints ?? (completedOrdersCount * 50 + 100);
  const computedSavings =
    user?.totalSavings ?? (completedOrdersCount * 65 + (user?.couponSavings || 49));

  // Determine loyalty tier
  const getTier = () => {
    if (completedOrdersCount >= 15) return { name: "Platinum Member", color: "from-purple-500 to-indigo-600", nextTier: "VIP Elite", ordersLeft: 0, progress: 100 };
    if (completedOrdersCount >= 6) return { name: "Gold Member", color: "from-yellow-400 to-amber-500", nextTier: "Platinum", ordersLeft: 15 - completedOrdersCount, progress: Math.min(100, (completedOrdersCount / 15) * 100) };
    if (completedOrdersCount >= 2) return { name: "Silver Member", color: "from-slate-300 to-slate-400", nextTier: "Gold", ordersLeft: 6 - completedOrdersCount, progress: Math.min(100, (completedOrdersCount / 6) * 100) };
    return { name: "Bronze Member", color: "from-amber-600 to-orange-700", nextTier: "Silver", ordersLeft: 2 - completedOrdersCount, progress: Math.min(100, (completedOrdersCount / 2) * 100) };
  };
  const tier = getTier();

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    toast.success(`Copied: "${text}"`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleQuickProfileUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    if (!editForm.email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    try {
      setEditSaving(true);
      const res = await API.put("/profile", {
        name: editForm.name.trim(),
        email: editForm.email.trim().toLowerCase(),
        phone: editForm.phone.trim().replace(/\D/g, ""),
      });

      const updated = res.data?.data || res.data?.user || {
        ...user,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
      };

      if (updateUser) updateUser(updated);
      toast.success("Profile updated successfully! ✨");
      setActiveModal(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setEditSaving(false);
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const GreetingIcon = hour < 12 ? Sun : hour < 17 ? CloudSun : Moon;

  const initials =
    (user?.name || "User")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const coupons = [
    { code: "ZUSKO50", discount: "50% OFF", desc: "First laundry order up to ₹150", minOrder: "₹299" },
    { code: "FREEDEL", discount: "FREE DELIVERY", desc: "Doorstep pickup & delivery", minOrder: "₹199" },
    { code: "EXPRESS20", discount: "20% OFF", desc: "Steam ironing & express services", minOrder: "₹249" },
  ];

  const actionCards = [
    {
      id: "orders",
      icon: Package,
      label: "My Orders",
      subtitle: activeOrdersCount > 0 ? `${activeOrdersCount} in progress` : `${completedOrdersCount} orders completed`,
      badge: activeOrdersCount > 0 ? `${activeOrdersCount} Active` : null,
      badgeColor: "bg-amber-400 text-black",
      color: "from-yellow-400 to-amber-500",
      action: () => navigate("/my-orders"),
    },
    {
      id: "addresses",
      icon: MapPin,
      label: "Saved Addresses",
      subtitle: addresses.length > 0 ? `${addresses.length} saved locations` : "Add pickup address",
      badge: addresses.length > 0 ? `${addresses.length} Saved` : null,
      badgeColor: "bg-blue-100 text-blue-800",
      color: "from-blue-500 to-cyan-500",
      action: () => setIsAllAddressesOpen(true),
    },
    {
      id: "rewards",
      icon: Gift,
      label: "Rewards & Coupons",
      subtitle: `${computedPoints} Coins • ${tier.name}`,
      badge: `${coupons.length} Offers`,
      badgeColor: "bg-green-100 text-green-800",
      color: "from-green-500 to-emerald-500",
      action: () => setActiveModal("rewards"),
    },
    {
      id: "invoices",
      icon: Receipt,
      label: "Invoices & Billing",
      subtitle: completedOrdersCount > 0 ? "Download order receipts" : "Billing history",
      badge: null,
      color: "from-purple-500 to-pink-500",
      action: () => setActiveModal("invoices"),
    },
    {
      id: "payments",
      icon: CreditCard,
      label: "Payment Methods",
      subtitle: "UPI, Cards & COD supported",
      badge: "Secure",
      badgeColor: "bg-indigo-100 text-indigo-800",
      color: "from-indigo-500 to-violet-500",
      action: () => setActiveModal("payments"),
    },
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
      subtitle: "Order alerts & care updates",
      badge: null,
      color: "from-orange-500 to-red-500",
      action: () => setActiveModal("notifications"),
    },
    {
      id: "support",
      icon: LifeBuoy,
      label: "Help & Support",
      subtitle: "24/7 customer care & FAQs",
      badge: "24/7",
      badgeColor: "bg-sky-100 text-sky-800",
      color: "from-sky-500 to-cyan-500",
      action: () => navigate("/help"),
    },
    {
      id: "security",
      icon: Shield,
      label: "Security Center",
      subtitle: "Account protection & privacy",
      badge: "Protected",
      badgeColor: "bg-emerald-100 text-emerald-800",
      color: "from-slate-700 to-gray-900",
      action: () => setActiveModal("security"),
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#FDFBF7] pb-20 pt-24 sm:pt-28 text-gray-900">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-yellow-300/15 blur-[120px]" />
        <div className="absolute top-96 left-0 h-96 w-96 rounded-full bg-orange-200/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            PROFILE HERO BANNER
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-yellow-500/20"
        >
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-52 w-52 rounded-full bg-yellow-200/30 blur-2xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Identity Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 min-w-0">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] bg-white p-1.5 shadow-2xl shadow-black/10">
                  <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-black text-black text-3xl sm:text-4xl shadow-inner">
                    {initials}
                  </div>
                </div>
                <div
                  title="Account Verified"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white shadow-md"
                >
                  <Check size={14} strokeWidth={3} />
                </div>
              </div>

              {/* Text info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-black/75">
                  <GreetingIcon size={16} />
                  <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                    {greeting}
                  </span>
                </div>

                <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight truncate">
                  {user?.name || "Valued Customer"}
                </h1>

                {/* Email and Phone chips with copy action */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  {user?.email && (
                    <button
                      type="button"
                      onClick={() => handleCopy(user.email, "email")}
                      className="group flex items-center gap-2 rounded-full bg-white/80 hover:bg-white px-3.5 py-1.5 backdrop-blur-md text-gray-800 font-semibold shadow-sm transition-all"
                    >
                      <Mail size={13} className="text-gray-500" />
                      <span className="truncate max-w-[220px]">{user.email}</span>
                      {copiedCode === "email" ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <Copy size={12} className="text-gray-400 opacity-60 group-hover:opacity-100" />
                      )}
                    </button>
                  )}

                  {user?.phone && (
                    <button
                      type="button"
                      onClick={() => handleCopy(user.phone, "phone")}
                      className="group flex items-center gap-2 rounded-full bg-white/80 hover:bg-white px-3.5 py-1.5 backdrop-blur-md text-gray-800 font-semibold shadow-sm transition-all"
                    >
                      <Phone size={13} className="text-gray-500" />
                      <span>{user.phone}</span>
                      {copiedCode === "phone" ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <Copy size={12} className="text-gray-400 opacity-60 group-hover:opacity-100" />
                      )}
                    </button>
                  )}

                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/10 backdrop-blur-md text-black text-xs font-extrabold">
                    <Sparkles size={12} /> {tier.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Refresh in Hero */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal("edit")}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black hover:bg-black/85 text-white font-bold text-xs sm:text-sm shadow-xl active:scale-95 transition-all"
              >
                <Edit2 size={15} />
                <span>Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAllAddressesOpen(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/90 hover:bg-white text-gray-900 font-bold text-xs sm:text-sm backdrop-blur shadow-sm active:scale-95 transition-all"
              >
                <MapPin size={15} />
                <span>Addresses</span>
              </button>

              <button
                type="button"
                title="Refresh latest data"
                onClick={() => fetchDashboardData(true)}
                className="w-11 h-11 rounded-2xl bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center shadow-sm active:scale-95 transition-all"
              >
                <RefreshCw size={16} className={refreshing ? "animate-spin text-amber-600" : ""} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            LIVE METRICS STATS BAR
        ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-8">
          {/* Total Orders */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-[26px] border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Package size={22} />
              </div>
              <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Orders
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              {totalOrdersCount}
            </h3>
            <p className="text-[11px] text-gray-500 mt-1">
              {completedOrdersCount} cleaned & delivered
            </p>
          </motion.div>

          {/* Active Orders */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => navigate("/my-orders")}
            className="cursor-pointer rounded-[26px] border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Truck size={22} />
              </div>
              <ArrowUpRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Active Pickups
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              {activeOrdersCount}
            </h3>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">
              {activeOrdersCount > 0 ? "Tap to track orders →" : "No active orders"}
            </p>
          </motion.div>

          {/* Zusko Coins */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => setActiveModal("rewards")}
            className="cursor-pointer rounded-[26px] border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <Coins size={22} />
              </div>
              <Sparkles size={16} className="text-yellow-500" />
            </div>
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Zusko Coins
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              {computedPoints}
            </h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">
              {tier.name}
            </p>
          </motion.div>

          {/* Total Savings */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-[26px] border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Wallet size={22} />
              </div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Lifetime Savings
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 mt-0.5">
              ₹{computedSavings}
            </h3>
            <p className="text-[11px] text-gray-500 mt-1">
              Via coupons & rewards
            </p>
          </motion.div>
        </div>

        {/* =========================================================
            ACTIVE / RECENT ORDER HIGHLIGHT
        ========================================================= */}
        {activeOrders.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-[30px] border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 sm:p-7 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-black font-bold shadow-md">
                  <Truck size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                      Ongoing Order In Progress
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 mt-0.5">
                    Order #{activeOrders[0]._id?.slice(-6)?.toUpperCase()} • {activeOrders[0].status || "In Process"}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {activeOrders[0].items?.length || 1} items • Total ₹{activeOrders[0].totalAmount || activeOrders[0].total || 0}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/track-order/${activeOrders[0]._id}`)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-black hover:bg-black/90 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>Track Live Order</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="mb-8 rounded-[30px] border border-gray-100 bg-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold shrink-0">
                <Sparkles size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Ready for fresh, crisp laundry?
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Doorstep pickup, professional garment cleaning, steam iron, and delivery in 24 hrs.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/place-order")}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 font-extrabold text-xs sm:text-sm text-black shadow-md transition-all active:scale-95"
            >
              Book Pickup Now →
            </button>
          </div>
        )}

        {/* =========================================================
            QUICK ACTIONS GRID (ALL 8 FUNCTIONAL CARDS)
        ========================================================= */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Quick Actions & Services
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage your orders, rewards, addresses, and account
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionCards.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className="group relative flex flex-col justify-between text-left rounded-[28px] border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-200"
                >
                  <div className="flex items-start justify-between w-full mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon size={22} strokeWidth={2.2} />
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-gray-900 group-hover:text-black">
                      {item.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-gray-900">
                    <span>Manage</span>
                    <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            PERSONAL INFORMATION CARD
        ========================================================= */}
        <div className="mb-10 rounded-[32px] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">
                <ScanFace size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900">
                  Personal Information
                </h2>
                <p className="text-xs text-gray-500">
                  Verified details attached to your Zusko profile
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal("edit")}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors"
            >
              <Edit2 size={13} /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Full Name
              </span>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {user?.name || "Not provided"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Email Address
              </span>
              <p className="text-sm font-bold text-gray-900 mt-1 truncate">
                {user?.email || "Not provided"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Phone Number
              </span>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {user?.phone ? `+91 ${user.phone}` : "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            ACCOUNT LOGOUT SECTION
        ========================================================= */}
        <div className="rounded-[30px] border border-red-100 bg-red-50/60 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-red-950">
              Sign out from this device
            </h3>
            <p className="text-xs text-red-700/80 mt-0.5">
              You will need to verify your OTP when you log back in.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("logout")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <LogOut size={16} />
            <span>Logout Account</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          MODALS & DRAWERS
      ========================================================= */}

      {/* 1. EDIT PROFILE MODAL */}
      <AnimatePresence>
        {activeModal === "edit" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold">
                  <Edit2 size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Edit Profile</h3>
                  <p className="text-xs text-gray-500">Update your account information</p>
                </div>
              </div>

              <form onSubmit={handleQuickProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value.replace(/\D/g, "") })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="submit"
                    disabled={editSaving}
                    className="flex-1 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 font-extrabold text-sm text-black shadow-md transition-all disabled:opacity-60"
                  >
                    {editSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-sm text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. REWARDS & COUPONS MODAL */}
      <AnimatePresence>
        {activeModal === "rewards" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-bold">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Zusko Rewards & Loyalty</h3>
                  <p className="text-xs text-gray-500">Earn points on every wash and unlock perks</p>
                </div>
              </div>

              {/* Tier Progress Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 text-black mb-6 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider bg-black/10 px-2.5 py-1 rounded-full">
                    Current Tier
                  </span>
                  <span className="font-black text-xl">{computedPoints} Coins</span>
                </div>
                <h4 className="text-2xl font-black mt-2">{tier.name}</h4>
                <p className="text-xs opacity-90 mt-0.5">
                  {tier.ordersLeft > 0
                    ? `${tier.ordersLeft} more completed order(s) to unlock ${tier.nextTier}`
                    : "You are at the highest loyalty tier! Enjoy maximum perks."}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-black/15 h-2.5 rounded-full mt-4 overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full transition-all duration-500"
                    style={{ width: `${tier.progress}%` }}
                  />
                </div>
              </div>

              {/* Active Coupons */}
              <h4 className="text-sm font-extrabold text-gray-900 mb-3 flex items-center gap-1.5">
                <Tag size={15} className="text-amber-500" /> Active Promo Codes
              </h4>
              <div className="space-y-3 mb-6">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="p-3.5 rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-gray-900 bg-white px-2 py-0.5 rounded-lg border border-amber-200">
                          {coupon.code}
                        </span>
                        <span className="text-xs font-extrabold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          {coupon.discount}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{coupon.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(coupon.code, coupon.code)}
                      className="px-3 py-1.5 rounded-xl bg-black text-white text-xs font-bold shrink-0 hover:bg-gray-800 transition-colors"
                    >
                      {copiedCode === coupon.code ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Referral */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Share2 size={16} className="text-amber-600" />
                  <h5 className="font-bold text-sm text-gray-900">Refer a Friend & Earn ₹100</h5>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Share your referral link with friends. When they place their first order, both get ₹100 discount.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://zusko.in/ref/${user?._id?.slice(-6) || "FRIEND"}`}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono text-gray-700 select-all"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(`https://zusko.in/ref/${user?._id?.slice(-6) || "FRIEND"}`, "ref")
                    }
                    className="px-4 py-2 rounded-xl bg-amber-400 font-bold text-xs text-black hover:bg-amber-300"
                  >
                    {copiedCode === "ref" ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. INVOICES & BILLING MODAL */}
      <AnimatePresence>
        {activeModal === "invoices" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Receipt size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Invoices & Receipts</h3>
                  <p className="text-xs text-gray-500">View and download GST-compliant receipts</p>
                </div>
              </div>

              {allOrders.length === 0 ? (
                <div className="text-center py-10">
                  <Receipt size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-bold text-gray-700">No invoices yet</p>
                  <p className="text-xs text-gray-400 mt-1">Receipts will appear here after placing orders.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allOrders.slice(0, 8).map((order) => (
                    <div
                      key={order._id}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 bg-gray-50/50 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div>
                        <p className="font-mono font-bold text-xs text-gray-900">
                          #{order._id?.slice(-8)?.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {new Date(order.createdAt || Date.now()).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Paid: ₹{order.totalAmount || order.total || 0}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          toast.success(`Opening receipt for #${order._id?.slice(-8)}`);
                          navigate(`/my-orders`);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm"
                      >
                        <ExternalLink size={13} /> View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. PAYMENT METHODS MODAL */}
      <AnimatePresence>
        {activeModal === "payments" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Payment Modes</h3>
                  <p className="text-xs text-gray-500">Accepted payment channels for Zusko</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">UPI Instant Payments</p>
                      <p className="text-[11px] text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Active</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💳</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Debit & Credit Cards</p>
                      <p className="text-[11px] text-gray-500">Visa, Mastercard, RuPay & Amex</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Active</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💵</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-gray-500">Pay when clothes are returned crisp</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Supported</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <span>All online transactions are 256-bit encrypted via Cashfree & RBI certified gateways.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. NOTIFICATIONS MODAL */}
      <AnimatePresence>
        {activeModal === "notifications" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Notification Settings</h3>
                  <p className="text-xs text-gray-500">Control alerts and updates</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Order Status Updates</p>
                    <p className="text-[11px] text-gray-500">Pickup and delivery notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled.orderUpdates}
                    onChange={(e) =>
                      setNotificationsEnabled({ ...notificationsEnabled, orderUpdates: e.target.checked })
                    }
                    className="w-5 h-5 accent-yellow-400 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50">
                  <div>
                    <p className="text-xs font-bold text-gray-900">WhatsApp Live Updates</p>
                    <p className="text-[11px] text-gray-500">Instant driver coordination on WhatsApp</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled.whatsappAlerts}
                    onChange={(e) =>
                      setNotificationsEnabled({ ...notificationsEnabled, whatsappAlerts: e.target.checked })
                    }
                    className="w-5 h-5 accent-yellow-400 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Exclusive Promo Alerts</p>
                    <p className="text-[11px] text-gray-500">Weekend discounts & coin drop alerts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled.promotions}
                    onChange={(e) =>
                      setNotificationsEnabled({ ...notificationsEnabled, promotions: e.target.checked })
                    }
                    className="w-5 h-5 accent-yellow-400 rounded cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  toast.success("Preferences updated successfully! ✨");
                  setActiveModal(null);
                }}
                className="w-full mt-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 font-extrabold text-xs sm:text-sm text-black shadow-md transition-all"
              >
                Save Preferences
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. SECURITY & PRIVACY MODAL */}
      <AnimatePresence>
        {activeModal === "security" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Security & Privacy</h3>
                  <p className="text-xs text-gray-500">Your account security overview</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Email Verification</p>
                    <p className="text-[11px] text-gray-500">{user?.email}</p>
                  </div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                    ✓ Verified
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">OTP Login Protection</p>
                    <p className="text-[11px] text-gray-500">SMS / Email 6-digit OTP verification</p>
                  </div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Data Encryption</p>
                    <p className="text-[11px] text-gray-500">256-bit SSL encrypted communication</p>
                  </div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                    Enforced
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xs sm:text-sm text-gray-800 transition-all"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {activeModal === "logout" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-4">
                <LogOut size={24} />
              </div>

              <h3 className="text-xl font-black text-gray-900">Sign Out?</h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">
                Are you sure you want to log out of your Zusko account?
              </p>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 font-extrabold text-xs sm:text-sm text-white shadow-md transition-all"
                >
                  Yes, Logout
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xs sm:text-sm text-gray-700 transition-all"
                >
                  Stay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. ADDRESSES MODALS */}
      {isAllAddressesOpen && (
        <AllAddressesModal
          isOpen={isAllAddressesOpen}
          onClose={() => setIsAllAddressesOpen(false)}
          addresses={addresses}
          onOpenAddAddress={() => {
            setIsAllAddressesOpen(false);
            setEditingAddress(null);
            setIsAddressModalOpen(true);
          }}
          onOpenEditAddress={(addr) => {
            setIsAllAddressesOpen(false);
            setEditingAddress(addr);
            setIsAddressModalOpen(true);
          }}
          onDeleteAddress={async (id) => {
            if (!window.confirm("Delete this address?")) return;
            try {
              await API.delete(`/addresses/${id}`);
              setAddresses((prev) => prev.filter((a) => a._id !== id));
              toast.success("Address deleted");
            } catch (err) {
              toast.error("Failed to delete address");
            }
          }}
          onSetDefaultAddress={async (id) => {
            try {
              await API.patch(`/addresses/${id}/default`);
              setAddresses((prev) =>
                prev.map((a) => ({ ...a, isDefault: a._id === id }))
              );
              toast.success("Default address updated");
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}

      {isAddressModalOpen && (
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => {
            setIsAddressModalOpen(false);
            setEditingAddress(null);
          }}
          initialAddress={editingAddress}
          currentUser={user}
          onAddressSaved={() => {
            setIsAddressModalOpen(false);
            setEditingAddress(null);
            fetchDashboardData(true);
          }}
        />
      )}
    </main>
  );
}