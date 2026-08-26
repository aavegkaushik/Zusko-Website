import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function EnhancedProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const GreetingIcon = hour < 12 ? Sun : hour < 17 ? CloudSun : Moon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const statCards = [
    {
      label: "Orders",
      value: user?.totalOrders || 0,
      icon: Package,
      color: "from-[#FFD700] to-orange-400",
      subtitle: "Completed",
    },
    {
      label: "Rewards",
      value: user?.loyaltyPoints || 0,
      icon: Coins,
      color: "from-green-400 to-emerald-500",
      subtitle: "Points",
    },
    {
      label: "Savings",
      value: `₹${user?.totalSavings || 0}`,
      icon: Wallet,
      color: "from-blue-500 to-cyan-400",
      subtitle: "Lifetime",
    },
  ];

  const actionItems = [
    {
      icon: Package,
      label: "My Orders",
      subtitle: "Track & reorder",
      route: "/my-orders",
      color: "from-[#FFD700] to-orange-400",
    },
    {
      icon: MapPin,
      label: "Saved Addresses",
      subtitle: "Manage locations",
      route: "/addresses",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Gift,
      label: "Rewards",
      subtitle: "Coupons & points",
      route: "/rewards",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Receipt,
      label: "Invoices",
      subtitle: "Billing history",
      route: "/invoices",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CreditCard,
      label: "Payments",
      subtitle: "Cards & UPI",
      route: "/payments",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: Bell,
      label: "Notifications",
      subtitle: "Latest updates",
      route: "/notifications",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: LifeBuoy,
      label: "Support",
      subtitle: "Need help?",
      route: "/contact",
      color: "from-sky-500 to-cyan-500",
    },
    {
      icon: Shield,
      label: "Security",
      subtitle: "Privacy & protection",
      route: "/security",
      color: "from-slate-600 to-gray-700",
    },
  ];

  const personalInfo = [
    {
      icon: User,
      title: "Full Name",
      value: user?.name || "Not Added",
      verified: true,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Mail,
      title: "Email Address",
      value: user?.email || "Not Added",
      verified: !!user?.isEmailVerified,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Phone,
      title: "Phone Number",
      value: user?.phone || "Not Added",
      verified: !!user?.phone,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Globe,
      title: "Country",
      value: "India",
      verified: true,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const securityItems = [
    ["Email", user?.isEmailVerified ? "Verified" : "Pending", CheckCircle],
    ["Phone", user?.phone ? "Verified" : "Not Added", Phone],
    ["Password", "Protected", Lock],
    ["2FA", "Coming Soon", Shield],
  ];

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ActionButton = ({
    icon: Icon,
    label,
    subtitle,
    route,
    color,
  }) => (
    <motion.button
      type="button"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => navigate(route)}
      className="group relative w-full min-w-0 text-left"
    >
      <div className="pointer-events-none absolute inset-2 rounded-[24px] bg-yellow-300/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full min-h-[170px] flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 group-hover:border-gray-200 group-hover:shadow-xl sm:min-h-[185px] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg sm:h-14 sm:w-14`}
          >
            <Icon size={22} color="white" strokeWidth={2.2} />
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-all group-hover:bg-black group-hover:text-white">
            <ChevronRight size={18} />
          </div>
        </div>

        <div className="mt-auto pt-6">
          <h3 className="text-base font-extrabold text-[#111] sm:text-lg">
            {label}
          </h3>
          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.button>
  );

  const StatCard = ({ icon: Icon, label, value, subtitle, color }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group relative min-w-0"
    >
      <div className="pointer-events-none absolute inset-2 rounded-[26px] bg-yellow-300/15 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative h-full overflow-hidden rounded-[26px] border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur-xl sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/60" />

        <div className="relative flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg sm:h-14 sm:w-14`}
          >
            <Icon size={22} color="white" />
          </div>
          <TrendingUp size={17} className="mt-1 shrink-0 text-green-500" />
        </div>

        <div className="relative mt-6 min-w-0 sm:mt-8">
          <h2 className="truncate text-3xl font-black tracking-tight text-[#111] sm:text-4xl">
            {value}
          </h2>
          <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">
            {label}
          </p>
          <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -right-24 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 opacity-20 blur-3xl sm:right-0 sm:h-96 sm:w-96"
        />
        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute -left-24 bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-200 to-cyan-200 opacity-20 blur-3xl sm:left-0 sm:h-96 sm:w-96"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile hero */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mb-8 overflow-hidden rounded-[26px] shadow-xl sm:mb-10 sm:rounded-[34px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#F59E0B]" />

          <motion.div
            animate={{ scale: [1, 1.18, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:-right-20 sm:-top-32 sm:h-96 sm:w-96"
          />

          <div className="relative p-5 sm:p-7 md:p-8 lg:p-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              {/* Identity */}
              <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 4 }}
                  className="relative shrink-0"
                >
                  <div className="absolute inset-0 rounded-full bg-white opacity-40 blur-xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white p-1 shadow-2xl sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700] to-orange-400">
                      <span className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-green-500 sm:h-7 sm:w-7">
                    <BadgeCheck size={11} color="white" />
                  </div>
                </motion.div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-black/70">
                    <GreetingIcon size={17} className="shrink-0" />
                    <p className="text-sm font-semibold sm:text-base">
                      {greeting},
                    </p>
                  </div>

                  <h1 className="mt-1 break-words text-3xl font-black leading-tight tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
                    {user?.name || "User"}
                  </h1>

                  <div className="mt-3 flex max-w-full flex-col gap-2 sm:flex-row sm:flex-wrap">
                    {user?.email && (
                      <div className="flex min-w-0 max-w-full items-center gap-2 rounded-full bg-white/70 px-3 py-2 backdrop-blur sm:px-4">
                        <Mail size={14} className="shrink-0" />
                        <span className="truncate text-xs sm:text-sm">
                          {user.email}
                        </span>
                      </div>
                    )}

                    {user?.phone && (
                      <div className="flex min-w-0 max-w-full items-center gap-2 rounded-full bg-white/70 px-3 py-2 backdrop-blur sm:px-4">
                        <Phone size={14} className="shrink-0" />
                        <span className="truncate text-xs sm:text-sm">
                          {user.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm sm:text-sm">
                      <ShieldCheck size={15} className="text-green-600" />
                      Verified Account
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero stats */}
              <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:w-auto lg:min-w-[310px]">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl bg-white/80 p-4 backdrop-blur sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <Package size={20} />
                    <ArrowUpRight size={17} />
                  </div>
                  <p className="mt-4 text-[11px] text-gray-500 sm:mt-6 sm:text-xs">
                    Orders
                  </p>
                  <p className="mt-1 text-2xl font-black sm:text-3xl">
                    {user?.totalOrders || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl bg-white/80 p-4 backdrop-blur sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <Coins size={20} />
                    <Sparkles size={17} />
                  </div>
                  <p className="mt-4 text-[11px] text-gray-500 sm:mt-6 sm:text-xs">
                    Reward Points
                  </p>
                  <p className="mt-1 text-2xl font-black sm:text-3xl">
                    {user?.loyaltyPoints || 0}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Dashboard */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
            <div className="min-w-0">
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Your Dashboard
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Everything about your Zusko account
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 lg:flex">
              <Sparkles size={17} className="text-yellow-700" />
              <span className="text-sm font-semibold text-yellow-700">
                Smart Dashboard
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>
        </motion.section>

        {/* Rewards banner */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-6 sm:mt-8"
        >
          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#101010] via-[#1E1E1E] to-[#2A2A2A] p-5 shadow-xl sm:rounded-[30px] sm:p-7 md:p-8">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <Award size={25} className="shrink-0 text-yellow-400" />
                  <h2 className="text-2xl font-black text-white sm:text-3xl">
                    Zusko Rewards
                  </h2>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
                  Earn reward points with your orders and use them for future
                  benefits and offers.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10">
                    <Coins size={22} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Your Reward Points</p>
                    <p className="text-xl font-black text-white">
                      {user?.loyaltyPoints || 0}
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/rewards")}
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#FFD700] px-6 py-3.5 text-sm font-extrabold text-black shadow-xl transition-colors hover:bg-yellow-300 sm:w-auto"
              >
                View Rewards
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Personal information */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-6 sm:mt-8"
        >
          <div className="overflow-hidden rounded-[26px] border border-white bg-white/80 shadow-xl backdrop-blur-2xl sm:rounded-[34px]">
            <div className="flex flex-col gap-5 border-b border-gray-100 p-5 sm:p-7 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <ScanFace size={24} className="shrink-0 text-blue-600" />
                  <h2 className="text-xl font-black sm:text-2xl">
                    Personal Information
                  </h2>
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
                  Manage your personal account information.
                </p>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05, rotate: 4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/profile/edit")}
                aria-label="Edit profile"
                className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg md:self-center"
              >
                <Edit2 color="white" size={19} />
              </motion.button>
            </div>

            <div className="p-5 sm:p-7 md:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {personalInfo.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="min-w-0 rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm transition-shadow hover:shadow-lg sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.iconBg}`}
                        >
                          <Icon size={22} className={item.iconColor} />
                        </div>

                        {item.verified ? (
                          <div className="flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2.5 py-1">
                            <CircleCheckBig
                              size={13}
                              className="text-green-600"
                            />
                            <span className="text-[10px] font-bold text-green-700 sm:text-xs">
                              Verified
                            </span>
                          </div>
                        ) : (
                          <div className="shrink-0 rounded-full bg-yellow-100 px-2.5 py-1">
                            <span className="text-[10px] font-bold text-yellow-700 sm:text-xs">
                              Pending
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-gray-400 sm:text-xs">
                        {item.title}
                      </p>
                      <h3 className="mt-1 break-words text-base font-bold text-[#111] sm:text-lg">
                        {item.value}
                      </h3>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick actions */}
              <div className="my-7 h-px bg-gray-100 sm:my-8" />

              <section>
                <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
                  <div>
                    <h2 className="text-xl font-black sm:text-2xl">
                      Quick Actions
                    </h2>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Everything you need in one place
                    </p>
                  </div>

                  <div className="hidden shrink-0 items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 lg:flex">
                    <Sparkles size={17} className="text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700">
                      Smart Dashboard
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
                  {actionItems.map((item, index) => (
                    <ActionButton key={index} {...item} />
                  ))}
                </div>
              </section>

              {/* Security update banner */}
              <motion.div
                whileHover={{ scale: 1.005 }}
                className="mt-6 flex flex-col gap-5 rounded-3xl bg-gradient-to-r from-[#101010] via-[#202020] to-[#101010] p-5 sm:mt-8 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="text-xl font-black text-white sm:text-2xl">
                    Your account is secure 🔒
                  </h3>
                  <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                    Keep your profile updated for faster checkout, priority
                    support and better rewards.
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/profile/edit")}
                  className="w-full shrink-0 rounded-2xl bg-[#FFD700] px-6 py-3.5 text-sm font-extrabold text-black shadow-xl sm:w-auto"
                >
                  Update Profile
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Security center */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-6 sm:mt-8"
        >
          <div className="rounded-[26px] bg-gradient-to-r from-[#101010] to-[#222] p-5 shadow-xl sm:rounded-[34px] sm:p-7 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  Security Center
                </h2>
                <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                  Your account protection status
                </p>
              </div>
              <Shield size={28} className="shrink-0 text-yellow-400 sm:h-9 sm:w-9" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {securityItems.map(([title, status, Icon], index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
                >
                  <Icon size={22} className="text-yellow-400 sm:h-6 sm:w-6" />
                  <p className="mt-4 text-xs text-gray-400 sm:mt-6 sm:text-sm">
                    {title}
                  </p>
                  <h3 className="mt-1 break-words text-sm font-bold text-white sm:text-base">
                    {status}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Logout */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-6 sm:mt-8"
        >
          <div className="overflow-hidden rounded-[26px] bg-gradient-to-r from-red-500 to-red-600 shadow-xl sm:rounded-[30px]">
            <div className="flex flex-col gap-5 p-5 sm:p-7 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  Ready to leave?
                </h2>
                <p className="mt-2 text-xs text-red-100 sm:text-sm">
                  You can securely sign out anytime.
                </p>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-7 py-3.5 text-sm font-extrabold text-red-600 shadow-lg sm:w-auto sm:px-8 sm:py-4"
              >
                <LogOut size={19} />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Back to top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={scrollTop}
        aria-label="Back to top"
        className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-2xl sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 lg:bottom-8 lg:right-8 lg:h-14 lg:w-14"
      >
        <ArrowUpRight size={19} />
      </motion.button>
    </main>
  );
}