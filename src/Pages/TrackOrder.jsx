import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import API from "../config/api";
import OrderAssistant from "../components/OrderAssistant";

const STEPS = [
  { key: "pending", label: "Placed", icon: Package },
  { key: "picked-up", label: "Picked Up", icon: Package },
  { key: "in-progress", label: "Processing", icon: Truck },
  { key: "ready-for-delivery", label: "Ready", icon: CheckCircle },
  { key: "out-for-delivery", label: "On the Way", icon: Truck },
  { key: "completed", label: "Delivered", icon: CheckCircle },
];

const STATUS = {
  "pending": {
    label: "Order Placed",
    message: "We've received your order. Pickup has not started yet.",
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

export default function EnhancedTrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const handlePayPendingOrder = async () => {
    try {
      const { data } = await API.post("/payment/create-order", {
        orderId: order._id,
      });

      const razorOrder = data.data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        order_id: razorOrder.id,
        name: "Zusko Laundry",
        description: "Pending Order Payment",
        handler: async (response) => {
          const { data } = await API.post("/payment/pay-pending", {
            orderId: order._id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          setOrder(data.data);
        },
        theme: { color: "#fbbf24" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const { data } = await API.patch(`/orders/${orderId}/cancel`);
      alert(data.message);
      fetchOrder();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to cancel order");
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

  const currentStep = STEPS.findIndex((step) => step.key === order.status);
  const status = STATUS[order.status] || STATUS.pending;
  const progress =
    currentStep >= 0
      ? Math.max(5, ((currentStep + 1) / STEPS.length) * 100)
      : 0;

  const subtotal =
    order.originalTotal ||
    order.items?.reduce((acc, item) => acc + item.price * item.qty, 0) ||
    0;

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
              <div className="absolute left-[8%] right-[8%] top-5 h-1 rounded-full bg-gray-200" />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `calc(${progress * 0.84}% )` }}
                transition={{ duration: 1, delay: 0.25 }}
                className={`absolute left-[8%] top-5 h-1 rounded-full bg-gradient-to-r ${status.gradient}`}
              />

              <div className="relative grid grid-cols-6 gap-1">
                {STEPS.map((step, index) => {
                  const completed = index <= currentStep;
                  const active = index === currentStep;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex min-w-0 flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.08 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-white shadow-md transition-all sm:h-12 sm:w-12 ${
                          completed
                            ? `bg-gradient-to-br ${status.gradient}`
                            : "bg-gray-200 text-gray-400"
                        } ${active ? "ring-4 ring-yellow-400/20" : ""}`}
                      >
                        {completed ? <CheckCircle size={20} /> : <Icon size={18} />}
                      </motion.div>
                      <span className="mt-2 max-w-[60px] text-center text-[9px] font-bold leading-3 text-gray-600 sm:max-w-[85px] sm:text-[11px] sm:leading-4">
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
                      <p className="truncate font-bold text-gray-900">{item.name}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{item.service}</p>
                      <p className="mt-1 text-[11px] text-gray-400">
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>
                    <p className="shrink-0 text-base font-black text-gray-900 sm:text-lg">
                      ₹{item.price * item.qty}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                  </div>
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
                      <span>Discount</span>
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
                order.status === "pending" && (
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

          {/* Additional info */}
          <GlassCard accent="from-indigo-400 to-blue-400">
            <div className="p-5 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100">
                  <Navigation className="text-indigo-600" size={21} />
                </div>
                <h3 className="text-lg font-black text-gray-900">Additional Information</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoRow label="Estimated Delivery" icon={Calendar}>
                  {order.estimatedDelivery
                    ? new Date(order.estimatedDelivery).toLocaleString()
                    : "Not Available"}
                </InfoRow>
                <InfoRow label="Delivery Agent" icon={Phone}>
                  {order.deliveryAgent?.name || "Not Assigned"}
                </InfoRow>
              </div>
            </div>
          </GlassCard>

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
            {["pending"].includes(order.status) && (
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

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowHelp(true)}
              className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:shadow-xl ${
                !["pending", "picked-up", "in-progress"].includes(order.status)
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <MessageCircle size={19} />
              Need Help?
            </motion.button>
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