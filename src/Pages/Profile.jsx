import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Gift,
  Package,
  Headphones,
  LogOut,
  ShieldCheck,
  Edit2,
  MapPin,
  Heart,
  CreditCard,
  Bell,
  Lock,
  Home,
  Receipt,
  Settings,
  LifeBuoy,
  Copy,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Calendar,
  Clock,
  Shield,
  Zap,
  Crown,
  ChevronRight,
  LockOpen,
  Sparkles,
  Star,
  BadgeCheck,
  Coins,
  ArrowUpRight,
  Sun,
  Moon,
  CloudSun,
  Flame,
  Award,
  Medal,
  Target,
  Wallet,
  Gem,
  Rocket,
  Globe,
  BadgeInfo,
  Camera,
  CircleCheckBig,
  ScanFace,
} from "lucide-react";

export default function EnhancedProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const GreetingIcon = hour < 12 ? Sun : hour < 17 ? CloudSun : Moon;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
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
      value: "₹" + (user?.totalSavings || 0),
      icon: Wallet,
      color: "from-blue-500 to-cyan-400",
      subtitle: "Lifetime",
    },
    {
      label: "Tier",
      value: user?.memberTier || "Silver",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      subtitle: "Membership",
    },
  ];

  const actionItems = [
    {
      icon: Package,
      label: "My Orders",
      subtitle: "Track & reorder",
      route: "/my-orders",
      color: "from-[#FFD700] to-orange-400",
      badge: "12",
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
      subtitle: "Coupons & Points",
      route: "/rewards",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Receipt,
      label: "Invoices",
      subtitle: "Billing History",
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
      subtitle: "Updates",
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
      subtitle: "Privacy",
      route: "/security",
      color: "from-slate-600 to-gray-700",
    },
  ];

  const recentActivities = [
    {
      type: "order",
      title: "Order Placed",
      description: "Order #ORD-2024-001",
      time: "2 hours ago",
      icon: Package,
    },
    {
      type: "reward",
      title: "Reward Earned",
      description: "You earned 150 loyalty points",
      time: "1 day ago",
      icon: Gift,
    },
    {
      type: "address",
      title: "Address Updated",
      description: "Home address was updated",
      time: "3 days ago",
      icon: MapPin,
    },
    {
      type: "profile",
      title: "Profile Updated",
      description: "Email address changed",
      time: "1 week ago",
      icon: User,
    },
  ];

  // Reusable Components
  const ActionButton = ({
    icon: Icon,
    label,
    subtitle,
    route,
    color,
    badge,
  }) => (
    <motion.button
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() => navigate(route)}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-[28px] bg-linear-to-r from-yellow-300/20 to-orange-300/20 blur-xl opacity-0 group-hover:opacity-100 transition-all" />

      <div className="relative rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all p-6">
        <div className="flex justify-between">
          <div
            className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center shadow-xl`}
          >
            <Icon size={24} color="white" />
          </div>

          {badge && (
            <div className="rounded-full bg-red-500 text-white text-xs px-3 py-1 font-bold">
              {badge}
            </div>
          )}
        </div>

        <h3 className="font-bold text-lg mt-6">{label}</h3>

        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>

        <div className="flex items-center justify-between mt-8">
          <span className="text-xs text-gray-400">Open</span>

          <motion.div
            whileHover={{
              x: 4,
            }}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
          >
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );

  const StatCard = ({ icon: Icon, label, value, subtitle, color }) => (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-[28px] bg-linear-to-r from-yellow-300/20 to-orange-300/20 blur-xl opacity-0 group-hover:opacity-100 transition-all" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/70 backdrop-blur-xl p-6 shadow-lg">
        <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-linear-to-br from-white/50 to-transparent" />

        <div className="flex justify-between">
          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.1,
            }}
            className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center shadow-xl`}
          >
            <Icon size={24} color="white" />
          </motion.div>

          <TrendingUp size={18} className="text-green-500" />
        </div>

        <h2 className="text-4xl font-black mt-8 text-[#111]">{value}</h2>

        <p className="font-semibold mt-1">{label}</p>

        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 pt-32 pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-96 h-96 bg-linear-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 left-1/2 w-[600px] h-[600px] rounded-full border border-yellow-200/20"
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-linear-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 relative z-10">
        {/* Premium Profile Header */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-10 overflow-hidden rounded-[34px]"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#FFD700] via-[#FFC107] to-[#F59E0B]" />

          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            />

            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                x: [0, 40, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
              }}
              className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-black/5 blur-3xl"
            />
          </div>

          <div className="relative p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 6,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-40" />

                  <div className="relative w-28 h-28 rounded-full bg-white shadow-2xl p-1">
                    <div className="w-full h-full rounded-full bg-linear-to-br from-[#FFD700] to-orange-400 flex items-center justify-center">
                      <span className="text-5xl font-black text-white">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2">
                    <div className="w-7 h-7 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                      <BadgeCheck size={12} color="white" />
                    </div>
                  </div>
                </motion.div>

                <div>
                  <div className="flex items-center gap-2 text-black/70">
                    <GreetingIcon size={18} />

                    <p className="font-medium">{greeting},</p>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-black text-[#111] mt-2">
                    {user?.name}
                  </h1>

                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full">
                      <Mail size={16} />

                      <span className="text-sm">{user?.email}</span>
                    </div>

                    {user?.phone && (
                      <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full">
                        <Phone size={16} />

                        <span className="text-sm">{user?.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-5 flex-wrap">
                    <div className="bg-black text-white rounded-full px-5 py-2 flex items-center gap-2">
                      <Crown size={16} />
                      {user?.memberTier || "Silver"} Member
                    </div>

                    <div className="bg-white rounded-full px-5 py-2 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-green-600" />
                      Verified
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-5 min-w-[150px]"
                >
                  <div className="flex items-center justify-between">
                    <Package />

                    <ArrowUpRight size={18} />
                  </div>

                  <p className="text-xs text-gray-500 mt-6">Orders</p>

                  <p className="text-3xl font-black mt-1">
                    {user?.totalOrders || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-5 min-w-[150px]"
                >
                  <div className="flex items-center justify-between">
                    <Coins />

                    <Sparkles size={18} />
                  </div>

                  <p className="text-xs text-gray-500 mt-6">Reward Points</p>

                  <p className="text-3xl font-black mt-1">
                    {user?.loyaltyPoints || 0}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-white/70 backdrop-blur p-5">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-bold">Membership Progress</p>

                  <p className="text-sm text-gray-500">
                    Only 50 points away from Gold Elite
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-500 fill-yellow-400" />

                  <span className="font-bold">250 / 300</span>
                </div>
              </div>

              <div className="w-full h-3 rounded-full bg-white overflow-hidden">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "84%",
                  }}
                  transition={{
                    duration: 1.2,
                  }}
                  className="h-full rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-10"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black">Your Dashboard</h2>

              <p className="text-gray-500">
                Everything about your Zusko account
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Rocket size={18} className="text-yellow-700" />

              <span className="font-semibold text-yellow-700">
                Growing Fast
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="mt-8">
          <div className="rounded-[30px] bg-linear-to-r from-[#101010] via-[#1E1E1E] to-[#2A2A2A] overflow-hidden relative p-8">
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div>
                <div className="flex items-center gap-3">
                  <Award size={28} className="text-yellow-400" />

                  <h2 className="text-3xl font-black text-white">
                    Zusko Rewards
                  </h2>
                </div>

                <p className="text-gray-300 mt-3 max-w-lg">
                  Every order earns reward points. Unlock premium perks, faster
                  pickup, exclusive coupons and priority support.
                </p>

                <div className="mt-8">
                  <div className="flex justify-between text-white mb-3">
                    <span>Level Progress</span>

                    <span>450 / 600 XP</span>
                  </div>

                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: "75%",
                      }}
                      transition={{
                        duration: 1.4,
                      }}
                      className="h-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-full"
                    />
                  </div>

                  <p className="text-gray-400 mt-3">
                    150 XP left for Platinum Member
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Flame,
                    title: "Hot Streak",
                    value: "12",
                  },
                  {
                    icon: Gift,
                    title: "Coupons",
                    value: "8",
                  },
                  {
                    icon: Medal,
                    title: "Rank",
                    value: "#24",
                  },
                  {
                    icon: Target,
                    title: "Goals",
                    value: "76%",
                  },
                ].map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5"
                    >
                      <Icon size={24} className="text-yellow-400" />

                      <h3 className="text-white font-bold mt-5">
                        {card.value}
                      </h3>

                      <p className="text-gray-400 text-sm">{card.title}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          {/* Personal Information Card */}
          <motion.section
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="relative group mt-8"
          >
            <div className="absolute inset-0 rounded-[34px] bg-linear-to-r from-blue-300/20 to-cyan-300/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative rounded-[34px] bg-white/70 backdrop-blur-2xl border border-white shadow-xl overflow-hidden">
              {/* Header */}

              <div className="flex items-center justify-between p-8 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-3">
                    <ScanFace size={26} className="text-blue-600" />

                    <h2 className="text-2xl font-black">
                      Personal Information
                    </h2>
                  </div>

                  <p className="text-gray-500 mt-2">
                    Manage your personal account information.
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    rotate: 15,
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => navigate("/profile/edit")}
                  className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 shadow-xl flex items-center justify-center"
                >
                  <Edit2 color="white" size={20} />
                </motion.button>
              </div>

              {/* Body */}

              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  {[
                    {
                      icon: User,
                      title: "Full Name",
                      value: user?.name,
                      verified: true,
                      color: "blue",
                    },

                    {
                      icon: Mail,
                      title: "Email Address",
                      value: user?.email,
                      verified: user?.isEmailVerified,
                      color: "green",
                    },

                    {
                      icon: Phone,
                      title: "Phone Number",
                      value: user?.phone || "Not Added",
                      verified: !!user?.phone,
                      color: "purple",
                    },

                    {
                      icon: Globe,
                      title: "Country",
                      value: "India",
                      verified: true,
                      color: "orange",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={index}
                        whileHover={{
                          scale: 1.02,
                          y: -3,
                        }}
                        className="rounded-3xl bg-linear-to-br from-white to-gray-50 border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all"
                      >
                        <div className="flex justify-between">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center

${
  item.color === "blue"
    ? "bg-blue-100"
    : item.color === "green"
      ? "bg-green-100"
      : item.color === "purple"
        ? "bg-purple-100"
        : "bg-orange-100"
}
`}
                          >
                            <Icon
                              size={24}
                              className={
                                item.color === "blue"
                                  ? "text-blue-600"
                                  : item.color === "green"
                                    ? "text-green-600"
                                    : item.color === "purple"
                                      ? "text-purple-600"
                                      : "text-orange-600"
                              }
                            />
                          </div>

                          {item.verified ? (
                            <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                              <CircleCheckBig
                                size={14}
                                className="text-green-600"
                              />

                              <span className="text-xs font-bold text-green-700">
                                Verified
                              </span>
                            </div>
                          ) : (
                            <div className="bg-yellow-100 px-3 py-1 rounded-full">
                              <span className="text-xs font-bold text-yellow-700">
                                Pending
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-xs uppercase tracking-widest text-gray-400 mt-6">
                          {item.title}
                        </p>

                        <h3 className="font-bold text-lg mt-1 text-[#111]">
                          {item.value}
                        </h3>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Divider */}

                <div className="my-8 h-px bg-gray-100" />

                {/* Account Status */}

                <motion.section variants={itemVariants} className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-black">Quick Actions</h2>

                      <p className="text-gray-500">
                        Everything you need in one place
                      </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100">
                      <Sparkles size={18} className="text-yellow-600" />

                      <span className="font-semibold text-yellow-700">
                        Smart Dashboard
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {actionItems.map((item, index) => (
                      <ActionButton key={index} {...item} />
                    ))}
                  </div>
                </motion.section>

                {/* Bottom Banner */}

                <motion.div
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="mt-8 rounded-3xl bg-linear-to-r from-[#101010] via-[#202020] to-[#101010] p-6 flex flex-col lg:flex-row items-center justify-between gap-6"
                >
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      Your account is secure 🔒
                    </h3>

                    <p className="text-gray-400 mt-2">
                      Keep your profile updated for faster checkout, priority
                      support and better rewards.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => navigate("/profile/edit")}
                    className="bg-[#FFD700] text-black px-6 py-3 rounded-2xl font-bold shadow-xl"
                  >
                    Update Profile
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="mt-8">
            <div className="bg-white rounded-[34px] shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black">Recent Activity</h2>

                  <p className="text-gray-500">Your latest account activity</p>
                </div>

                <Clock className="text-yellow-500" />
              </div>

              <div className="space-y-5">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        x: 8,
                      }}
                      className="flex gap-5 items-start"
                    >
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
                          <Icon size={22} color="white" />
                        </div>

                        {index !== recentActivities.length - 1 && (
                          <div className="absolute top-14 left-1/2 -translate-x-1/2 h-10 w-0.5 bg-yellow-200" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{activity.title}</h3>

                          <span className="text-xs text-gray-400">
                            {activity.time}
                          </span>
                        </div>

                        <p className="text-gray-500 mt-1">
                          {activity.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* Security Card */}
          <motion.section variants={itemVariants} className="mt-8">
            <div className="rounded-[34px] bg-linear-to-r from-[#101010] to-[#222] p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-white">
                    Security Center
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Your account protection status
                  </p>
                </div>

                <Shield size={34} className="text-yellow-400" />
              </div>

              <div className="grid md:grid-cols-4 gap-5 mt-8">
                {[
                  ["Email", "Verified", CheckCircle],
                  ["Phone", "Verified", Phone],
                  ["Password", "Protected", Lock],
                  ["2FA", "Coming Soon", Shield],
                ].map(([title, status, Icon], i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.04,
                    }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-5"
                  >
                    <Icon size={26} className="text-yellow-400" />

                    <p className="text-gray-400 mt-6">{title}</p>

                    <h3 className="text-white font-bold">{status}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Logout Button */}
          <motion.div variants={itemVariants} className="mt-10">
            <div className="rounded-[30px] overflow-hidden bg-linear-to-r from-red-500 to-red-600 shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center p-8 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-white">
                    Ready to leave?
                  </h2>

                  <p className="text-red-100 mt-2">
                    You can securely sign out anytime.
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={handleLogout}
                  className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
                >
                  <LogOut />
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        whileHover={{
          scale: 1.1,
        }}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-black text-white shadow-2xl flex items-center justify-center z-50"
      >
        <ArrowUpRight />
      </motion.button>
    </div>
  );
}
