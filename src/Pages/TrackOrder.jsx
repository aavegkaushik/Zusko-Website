import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle,
  MessageCircle,
  Phone,
  Ban,
  ArrowLeft,
  Truck,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  Navigation,
  PhoneCall,
  UserCheck,
  PackageCheck,
  Box,
  CheckCircle2,
} from "lucide-react";
import API from "../config/api";
import OrderAssistant from "../components/OrderAssistant";

const MILESTONE_STEPS = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "pickup_assigned", label: "Pickup Assigned", icon: UserCheck },
  { key: "picked_up", label: "Pickup Done", icon: PackageCheck },
  { key: "processing", label: "Processing", icon: Sparkles },
  { key: "ready", label: "Ready", icon: Box },
  { key: "delivery_assigned", label: "Delivery Assigned", icon: UserCheck },
  { key: "out_for_delivery", label: "On the Way", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

function getMilestoneIndex(order) {
  if (!order) return 0;
  const st = (order.status || "").toLowerCase();

  if (st === "completed") return 7;
  if (st === "out-for-delivery") return 6;
  if (st === "ready-for-delivery") {
    if (order.deliveryPartner?.partner?.fullName) return 5;
    return 4;
  }
  if (st === "in-progress") return 3;
  if (st === "picked-up") return 2;
  // pending or accepted
  if (order.pickupPartner?.partner?.fullName) return 1;
  return 0;
}

const STATUS = {
  "pending": {
    label: "Order Placed",
    message: "We've received your order. Pickup has not started yet.",
    gradient: "from-yellow-400 to-orange-400",
    soft: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  "accepted": {
    label: "Order Accepted",
    message: "Your order has been accepted. Pickup will be initiated soon.",
    gradient: "from-yellow-400 to-orange-400",
    soft: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  "picked-up": {
    label: "Picked Up",
    message: "Your clothes have been picked up and are on their way to our facility.",
    gradient: "from-blue-400 to-cyan-400",
    soft: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "in-progress": {
    label: "Processing",
    message: "Your clothes are currently being processed by our team.",
    gradient: "from-purple-400 to-pink-400",
    soft: "bg-purple-50 text-purple-700 border-purple-200",
  },
  "ready-for-delivery": {
    label: "Ready for Delivery",
    message: "Your order is packed and ready for delivery.",
    gradient: "from-green-400 to-emerald-400",
    soft: "bg-green-50 text-green-700 border-green-200",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    message: "Your rider is on the way. Please keep your phone available.",
    gradient: "from-orange-400 to-red-400",
    soft: "bg-orange-50 text-orange-700 border-orange-200",
  },
  completed: {
    label: "Delivered",
    message: "Your order has been successfully delivered. Thank you for choosing Zusko.",
    gradient: "from-green-500 to-emerald-500",
    soft: "bg-green-50 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    message: "This order has been cancelled.",
    gradient: "from-red-400 to-pink-400",
    soft: "bg-red-50 text-red-700 border-red-200",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function GlassCard({ children, accent = "from-yellow-400 to-orange-400", className = "" }) {
  return (
    <motion.section variants={fadeUp} className={`relative group ${className}`}>
      <div
        className={`pointer-events-none absolute -inset-1 rounded-[30px] bg-gradient-to-r ${accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
      />
      <div className="relative overflow-hidden rounded-[26px] border border-white/80 bg-white/75 shadow-lg backdrop-blur-2xl transition-shadow duration-300 group-hover:shadow-2xl sm:rounded-[30px]">
        <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />
        {children}
      </div>
    </motion.section>
  );
}

function InfoRow({ label, children, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="flex min-w-0 items-start gap-3 rounded-2xl border border-gray-100 bg-white/65 p-4 transition-colors hover:bg-white"
    >
      {Icon && (
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50">
          <Icon size={17} className="text-gray-600" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 sm:text-xs">
          {label}
        </p>
        <div className="mt-1 break-words text-sm font-semibold text-gray-900 sm:text-[15px]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function PartnerAvatar({ avatar, name }) {
  const [imageError, setImageError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImageError(false);
    setLoaded(false);
  }, [avatar]);

  const hasValidAvatar = Boolean(avatar && !imageError);

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
      transition={{
        y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.35 },
        opacity: { duration: 0.35 },
      }}
      className="relative shrink-0"
    >
      {/* Outer subtle Zusko Yellow Glow */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FFD700] via-amber-300 to-yellow-500 opacity-70 blur-[6px] animate-pulse" />

      {/* Profile Container */}
      <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#FFD700] bg-neutral-900 shadow-md">
        {hasValidAvatar ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent" />
              </div>
            )}
            <img
              src={avatar}
              alt={name || "Delivery Partner"}
              onLoad={() => setLoaded(true)}
              onError={() => setImageError(true)}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          /* Premium Branded Zusko Delivery Partner SVG Illustration Fallback */
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1e1e1e] via-[#141414] to-black p-2 text-[#FFD700]">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 sm:h-12 sm:w-12 text-[#FFD700]"
            >
              <path
                d="M12 21C12 14.3726 17.3726 9 24 9C30.6274 9 36 14.3726 36 21V23H12V21Z"
                fill="#FFD700"
              />
              <path
                d="M14 23H34C34 25.2091 32.2091 27 30 27H18C15.7909 27 14 25.2091 14 23Z"
                fill="#111111"
              />
              <path
                d="M17 27C17 30.866 20.134 34 24 34C27.866 34 31 30.866 31 27"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M9 41C9 36.5817 12.5817 33 17 33H31C35.4183 33 39 36.5817 39 41"
                stroke="#FFD700"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="24" cy="16" r="2.5" fill="#111111" />
            </svg>
          </div>
        )}
      </div>

      <span className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm" />
    </motion.div>
  );
}

function PartnerSection({ type, partnerData, orderStatus }) {
  const isPickup = type === "pickup";
  const title = isPickup ? "YOUR PICKUP PARTNER" : "YOUR DELIVERY PARTNER";
  const partner = partnerData?.partner;
  const isAssigned = Boolean(partner && partner.fullName);

  const cleanPhone = partner?.mobileNumber ? String(partner.mobileNumber).replace(/[^\d+]/g, "") : "";
  const telHref = cleanPhone
    ? `tel:${cleanPhone.startsWith("+") ? cleanPhone : "+91" + cleanPhone.replace(/^0+/, "")}`
    : null;

  // Unassigned messages
  let unassignedNotice = "";
  if (!isAssigned) {
    if (isPickup) {
      unassignedNotice = "Your pickup partner will be assigned shortly.";
    } else {
      if (orderStatus === "ready-for-delivery" || orderStatus === "out-for-delivery") {
        unassignedNotice = "Your delivery partner will be assigned shortly.";
      } else {
        unassignedNotice = "Delivery partner will be assigned once laundry processing is complete.";
      }
    }
  }

  // Determine partner status badge
  let badgeText = "Assigned";
  let badgeColor = isPickup
    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
    : "bg-emerald-100 text-emerald-800 border-emerald-200";

  const isPickupDone =
    partnerData?.status === "completed" ||
    (isPickup && ["picked-up", "in-progress", "ready-for-delivery", "out-for-delivery", "completed"].includes(orderStatus));

  const isDeliveryDone =
    partnerData?.status === "completed" ||
    (!isPickup && orderStatus === "completed");

  if (isPickup && isPickupDone) {
    badgeText = "Pickup Completed";
    badgeColor = "bg-green-100 text-green-700 border-green-200";
  } else if (!isPickup && isDeliveryDone) {
    badgeText = "Delivered";
    badgeColor = "bg-green-100 text-green-700 border-green-200";
  } else if (partnerData?.status === "on-the-way" || (!isPickup && orderStatus === "out-for-delivery")) {
    badgeText = "On the Way";
    badgeColor = "bg-orange-100 text-orange-800 border-orange-200";
  }

  return (
    <GlassCard accent={isPickup ? "from-yellow-400 to-amber-500" : "from-emerald-400 to-teal-500"}>
      <div className="p-5 sm:p-7">
        {/* Card Header */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                isPickup ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              <Truck size={21} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 sm:text-xs">
                {title}
              </p>
              <h3 className="text-base font-black text-gray-900 sm:text-lg">
                {isPickup ? "Laundry Collection" : "Laundry Delivery"}
              </h3>
            </div>
          </div>

          {isAssigned && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${badgeColor}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {badgeText}
            </span>
          )}
        </div>

        {/* Card Body */}
        {isAssigned ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white/85 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <PartnerAvatar avatar={partner.avatar} name={partner.fullName} />
                <div className="min-w-0">
                  <p className="truncate text-base font-black text-gray-950 sm:text-lg">
                    {partner.fullName}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-gray-500 sm:text-sm">
                    {partner.mobileNumber}
                  </p>
                </div>
              </div>

              {telHref && (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A0A0A] to-[#222222] px-4 py-3 text-xs font-black text-white shadow-md transition-all hover:shadow-lg sm:text-sm"
                >
                  <PhoneCall size={16} className="text-[#FFD700]" />
                  Call Partner
                </motion.a>
              )}
            </div>

            {/* Delivery Out for Delivery Banner */}
            {!isPickup && orderStatus === "out-for-delivery" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs font-bold text-amber-900"
              >
                <Sparkles size={15} className="shrink-0 text-amber-600" />
                <span>Your fresh laundry is on its way!</span>
              </motion.div>
            )}

            {/* Pickup Done Banner */}
            {isPickup && isPickupDone && (
              <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50/70 px-3.5 py-2 text-xs font-semibold text-green-800">
                <CheckCircle size={14} className="shrink-0 text-green-600" />
                <span>Pickup completed. Partner details saved in order history.</span>
              </div>
            )}

            {/* Delivery Done Banner */}
            {!isPickup && isDeliveryDone && (
              <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50/70 px-3.5 py-2 text-xs font-semibold text-green-800">
                <CheckCircle size={14} className="shrink-0 text-green-600" />
                <span>Delivery completed successfully.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-5 text-gray-500">
            <Clock size={20} className="shrink-0 text-gray-400" />
            <p className="text-xs font-semibold sm:text-sm">{unassignedNotice}</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

export default function EnhancedTrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [copied, setCopied] = useState(false);
  const isFetchingRef = useRef(false);

  const fetchOrder = async (isInitial = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      let res;
      try {
        res = await API.get(`/orders/${id}/tracking`);
      } catch {
        res = await API.get(`/orders/${id}`);
      }
      if (res?.data?.data) {
        setOrder(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching order tracking:", error);
    } finally {
      isFetchingRef.current = false;
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder(true);
    const interval = setInterval(() => {
      if (order?.status === "completed" || order?.status === "cancelled") {
        return;
      }
      fetchOrder(false);
    }, 15000);
    return () => clearInterval(interval);
  }, [id, order?.status]);

  const handlePayPendingOrder = async () => {
    try {
      if (!window.Razorpay) {
        toast.error("Payment gateway is loading. Please try again in a moment.");
        return;
      }

      const { data } = await API.post("/payment/create-order", {
        orderId: order._id,
      });

      const razorOrder = data.data || data.order || data;
      const razorpayKey =
        razorOrder?.key ||
        import.meta.env.VITE_RAZORPAY_KEY ||
        import.meta.env.VITE_RAZORPAY_KEY_ID;

      const options = {
        key: razorpayKey,
        amount: razorOrder.amount,
        currency: razorOrder.currency || "INR",
        order_id: razorOrder.id,
        name: "Zusko Laundry",
        description: "Pending Order Payment",
        handler: async (response) => {
          try {
            const { data: payData } = await API.post("/payment/pay-pending", {
              orderId: order._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setOrder(payData.data || payData);
            toast.success("Payment completed successfully!");
          } catch (payErr) {
            console.error("Pay pending error:", payErr);
            toast.error(payErr.response?.data?.message || "Payment verification failed");
          }
        },
        theme: { color: "#fbbf24" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment initialization failed");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const { data } = await API.patch(`/orders/${orderId}/cancel`);
      toast.success(data.message || "Order cancelled successfully");
      fetchOrder();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order?.orderId || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="mx-auto w-full max-w-6xl animate-pulse">
          <div className="mb-8 h-4 w-28 rounded bg-gray-200" />
          <div className="mb-8 rounded-[28px] bg-white/70 p-6 shadow-lg sm:p-8">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="mt-4 h-10 w-72 max-w-full rounded-xl bg-gray-200" />
            <div className="mt-3 h-4 w-full max-w-2xl rounded bg-gray-200" />
            <div className="mt-8 h-16 rounded-2xl bg-gray-100" />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {[1, 2, 3].map((x) => (
              <div key={x} className="h-64 rounded-[28px] bg-white/70 shadow-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-[30px] border border-white bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Order not found</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            The order you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/my-orders")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3.5 font-bold text-black shadow-lg sm:w-auto"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>
        </motion.div>
      </div>
    );
  }

  const normalizedStatus = order.status?.toLowerCase() || "pending";
  const currentMilestoneIndex = getMilestoneIndex(order);
  const status = STATUS[normalizedStatus] || STATUS[order.status] || STATUS.pending;
  const progress = Math.min(
    100,
    Math.max(10, ((currentMilestoneIndex + 1) / MILESTONE_STEPS.length) * 100)
  );

  const itemsSubtotal =
    order.items?.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0) || 0;
  const originalSubtotal =
    order.originalTotal ||
    order.items?.reduce(
      (acc, item) =>
        acc +
        (item.originalPrice !== undefined ? item.originalPrice : item.price || 0) *
          (item.qty || 1),
      0
    ) ||
    itemsSubtotal;
  const promoDiscount =
    order.promotionalDiscount !== undefined
      ? Number(order.promotionalDiscount)
      : Math.max(0, originalSubtotal - itemsSubtotal);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -right-24 top-20 h-64 w-64 rounded-full bg-yellow-200 opacity-20 blur-3xl sm:right-0 sm:h-96 sm:w-96"
        />
        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -left-24 bottom-20 h-64 w-64 rounded-full bg-cyan-200 opacity-20 blur-3xl sm:left-0 sm:h-96 sm:w-96"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header / Hero */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-6 sm:mb-8 lg:mb-10"
        >
          <motion.button
            variants={fadeUp}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/my-orders")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-600 transition-colors hover:text-gray-950 sm:mb-6"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </motion.button>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#111] via-[#1b1b1b] to-[#2b2b2b] p-5 shadow-2xl sm:rounded-[34px] sm:p-7 md:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${status.gradient} shadow-lg sm:h-12 sm:w-12`}
                  >
                    <Sparkles className="text-white" size={22} />
                  </motion.div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 sm:text-xs">
                      Live Order Tracking
                    </p>
                    <div className="mt-1 flex max-w-full items-center gap-2">
                      <h1 className="truncate text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                        {order.orderId}
                      </h1>
                      <button
                        onClick={copyOrderId}
                        aria-label="Copy order ID"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition hover:bg-white/20 hover:text-white"
                      >
                        {copied ? <Check size={15} /> : <Copy size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="max-w-3xl text-sm leading-6 text-gray-300 sm:text-base">
                  {status.message}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 self-start lg:self-center">
                <div className={`rounded-full border px-4 py-2 text-xs font-black ${status.soft}`}>
                  {status.label}
                </div>
                {order.status !== "cancelled" && (
                  <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-gray-300 sm:flex">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                    Auto-updating
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.header>

        {/* Progress */}
        {order.status !== "cancelled" && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 overflow-hidden rounded-[26px] border border-white/80 bg-white/75 p-5 shadow-lg backdrop-blur-2xl sm:mb-8 sm:rounded-[30px] sm:p-7 lg:p-8"
          >
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 sm:text-xs">
                  Journey
                </p>
                <h2 className="mt-1 text-xl font-black text-gray-900 sm:text-2xl">
                  Order Progress
                </h2>
              </div>
              <span className="text-xs font-bold text-gray-500 sm:text-sm">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="relative">
              <div className="absolute left-[5%] right-[5%] top-5 hidden sm:block h-1 rounded-full bg-gray-200" />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `calc(${progress * 0.9}% )` }}
                transition={{ duration: 1, delay: 0.25 }}
                className={`absolute left-[5%] top-5 hidden sm:block h-1 rounded-full bg-gradient-to-r ${status.gradient}`}
              />

              <div className="relative grid grid-cols-4 gap-y-4 sm:grid-cols-8 sm:gap-1">
                {MILESTONE_STEPS.map((step, index) => {
                  const completed = index <= currentMilestoneIndex;
                  const active = index === currentMilestoneIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex min-w-0 flex-col items-center text-center">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-4 border-white text-white shadow-md transition-all ${
                          completed
                            ? `bg-gradient-to-br ${status.gradient}`
                            : "bg-gray-200 text-gray-400"
                        } ${active ? "ring-4 ring-yellow-400/30 scale-105" : ""}`}
                      >
                        {completed && index < currentMilestoneIndex ? (
                          <CheckCircle size={18} />
                        ) : (
                          <Icon size={16} />
                        )}
                      </motion.div>
                      <span
                        className={`mt-2 max-w-[70px] sm:max-w-[85px] text-[10px] sm:text-[11px] font-bold leading-3 ${
                          active
                            ? "text-gray-950 font-black"
                            : completed
                            ? "text-gray-800"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-5 sm:space-y-6"
        >
          {/* Pickup & Delivery Partner Cards */}
          {order.status !== "cancelled" && (
            <div className="grid gap-5 lg:grid-cols-2">
              <PartnerSection
                type="pickup"
                partnerData={order.pickupPartner}
                orderStatus={normalizedStatus}
              />
              <PartnerSection
                type="delivery"
                partnerData={order.deliveryPartner}
                orderStatus={normalizedStatus}
              />
            </div>
          )}
          {/* Pickup + Address */}
          <div className="grid gap-5 lg:grid-cols-2">
            <GlassCard accent="from-yellow-400 to-orange-400">
              <div className="p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100">
                    <Calendar className="text-yellow-600" size={21} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Schedule
                    </p>
                    <h3 className="text-lg font-black text-gray-900">Pickup Details</h3>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <InfoRow label="Date" icon={Calendar}>
                    {order.pickup?.date || "Not Available"}
                  </InfoRow>
                  <InfoRow label="Time" icon={Clock}>
                    {order.pickup?.time || "Not Available"}
                  </InfoRow>
                </div>
              </div>
            </GlassCard>

            <GlassCard accent="from-blue-400 to-cyan-400">
              <div className="p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                    <MapPin className="text-blue-600" size={21} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Destination
                    </p>
                    <h3 className="text-lg font-black text-gray-900">Address</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <InfoRow label="Full Address" icon={MapPin}>
                    {order.address?.fullAddress || "Not Available"}
                  </InfoRow>
                  <InfoRow label="City & Pincode" icon={Navigation}>
                    {order.address?.city || "—"} {order.address?.pincode ? `• ${order.address.pincode}` : ""}
                  </InfoRow>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Summary */}
          <GlassCard accent="from-purple-400 to-pink-400">
            <div className="p-5 sm:p-7 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                  <Package className="text-purple-600" size={21} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Breakdown
                  </p>
                  <h3 className="text-lg font-black text-gray-900">Order Summary</h3>
                </div>
              </div>

              <div className="space-y-3">
                {order.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="flex min-w-0 items-center gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-sm font-black text-purple-600">
                      {item.qty}
                    </div>
                    <div className="min-w-0 flex-1">
  <p className="truncate font-bold text-gray-900">
    {item.name}
  </p>

  <div className="mt-1 flex flex-wrap items-center gap-2">
    <span className="text-xs font-medium text-gray-500">
      {item.service || "Laundry Service"}
    </span>

    {item.service === "Dry Clean" && (
      item.careLevel === "premium" ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-1 text-[10px] font-black text-yellow-700">
          <Sparkles size={11} />
          Premium Care
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-bold text-gray-600">
          Regular Care
        </span>
      )
    )}

    {item.discountPercentage > 0 && (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
        {item.discountPercentage}% OFF
      </span>
    )}
  </div>

  <div className="mt-1 flex items-center gap-2 text-[11px]">
    {item.originalPrice && item.originalPrice > (item.finalPrice || item.price) ? (
      <>
        <span className="text-gray-400 line-through">₹{item.originalPrice}</span>
        <span className="font-bold text-gray-800">₹{item.finalPrice || item.price} × {item.qty}</span>
      </>
    ) : (
      <span className="text-gray-400">₹{item.price} × {item.qty}</span>
    )}
  </div>
</div>
                    <div className="text-right shrink-0">
                      {item.originalPrice && item.originalPrice > (item.finalPrice || item.price) && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{item.originalPrice * item.qty}
                        </p>
                      )}
                      <p className="text-base font-black text-gray-900 sm:text-lg">
                        ₹{(item.finalPrice || item.price) * item.qty}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6">
                <div className="space-y-3 text-sm">
                  {promoDiscount > 0 ? (
                    <>
                      <div className="flex justify-between gap-4 text-gray-600">
                        <span>Items Total (MRP)</span>
                        <span className="font-bold text-gray-900">₹{originalSubtotal}</span>
                      </div>
                      <div className="flex justify-between gap-4 font-bold text-amber-700">
                        <span>Promotional Discount</span>
                        <span>-₹{promoDiscount}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-gray-900">₹{itemsSubtotal}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between gap-4 text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-bold text-gray-900">₹{itemsSubtotal}</span>
                    </div>
                  )}

                  <div className="flex justify-between gap-4 text-gray-600">
                    <span>Handling Charges</span>
                    <span className="font-bold text-gray-900">₹{order.handlingFee || 0}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-gray-900">
                      {order.deliveryFee > 0 ? `₹${order.deliveryFee}` : "FREE"}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between gap-4 font-bold text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{order.discount}</span>
                    </div>
                  )}
                </div>

                <div className="my-4 h-px bg-purple-200" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Total
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Inclusive of applicable charges</p>
                  </div>
                  <p className="text-3xl font-black text-gray-950 sm:text-4xl">₹{order.total}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Payment */}
          <GlassCard accent="from-green-400 to-emerald-400">
            <div className="p-5 sm:p-7 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                  <CreditCard className="text-green-600" size={21} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Transaction
                  </p>
                  <h3 className="text-lg font-black text-gray-900">Payment Details</h3>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoRow label="Payment Method" icon={CreditCard}>
                  {order.payment?.method || "Not Available"}
                </InfoRow>
                <InfoRow label="Payment Status">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
                      order.payment?.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.payment?.status?.toUpperCase() || "PENDING"}
                  </span>
                </InfoRow>
                <InfoRow label="Amount">₹{order.payment?.amount || 0}</InfoRow>
                <InfoRow label="Order Created" icon={Calendar}>
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Not Available"}
                </InfoRow>
              </div>

              {order.payment?.method === "COD" &&
                order.payment?.status !== "paid" &&
                (normalizedStatus === "pending" || normalizedStatus === "accepted") && (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayPendingOrder}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-4 text-sm font-black text-white shadow-lg transition-shadow hover:shadow-xl sm:text-base"
                  >
                    <CreditCard size={19} />
                    Pay Online Now • ₹{order.payment?.amount}
                  </motion.button>
                )}
            </div>
          </GlassCard>

          {/* Refund */}
          {order.refund && order.refund.status !== "none" && (
            <GlassCard accent="from-green-400 to-emerald-400">
              <div className="p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-black text-green-900">Refund Details</h3>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                    {order.refund.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoRow label="Amount">₹{order.refund.amount}</InfoRow>
                  {order.refund.completedAt && (
                    <InfoRow label="Refunded At">
                      {new Date(order.refund.completedAt).toLocaleString()}
                    </InfoRow>
                  )}
                </div>
              </div>
            </GlassCard>
          )}

         

          {/* Timeline */}
          <GlassCard accent="from-orange-400 to-red-400">
            <div className="p-5 sm:p-7 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                  <Clock className="text-orange-600" size={21} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    History
                  </p>
                  <h3 className="text-lg font-black text-gray-900">Order Timeline</h3>
                </div>
              </div>

              <div className="relative space-y-4">
                <div className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-orange-300 to-red-300" />
                {order.history?.map((entry, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="relative flex gap-4"
                  >
                    <div className="relative z-10 mt-4 flex h-3 w-3 shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-red-400 ring-4 ring-orange-50" />
                    <div className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white/70 p-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <p className="text-sm font-black text-gray-900">
                          {entry.status.replaceAll("-", " ").toUpperCase()}
                        </p>
                        <p className="text-[11px] font-medium text-gray-400">
                          {new Date(entry.changedAt).toLocaleString()}
                        </p>
                      </div>
                      {entry.note && (
                        <p className="mt-2 text-sm leading-5 text-gray-500">{entry.note}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Actions */}
          <motion.div
            variants={fadeUp}
            className="grid gap-3 sm:grid-cols-2"
          >
            {["pending", "accepted"].includes(normalizedStatus) && (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCancelOrder(order._id)}
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-red-200 bg-white px-6 py-4 text-sm font-black text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-50"
              >
                <Ban size={19} />
                Cancel Order
              </motion.button>
            )}

            {normalizedStatus !== "cancelled" && (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHelp(true)}
                className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:shadow-xl ${
                  !["pending", "accepted", "picked-up", "in-progress"].includes(normalizedStatus)
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <MessageCircle size={19} />
                Need Help?
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showHelp && (
          <OrderAssistant order={order} onClose={() => setShowHelp(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}