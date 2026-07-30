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
  X,
  Ban,
  ArrowLeft,
  Truck,
  Sparkles,
  AlertCircle,
  ChevronDown,
  Copy,
} from "lucide-react";
import API from "../config/api";
import OrderAssistant from "../components/OrderAssistant";

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
        handler: async function (response) {
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

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const { data } = await API.patch(`/orders/${orderId}/cancel`);
        alert(data.message);
        fetchOrder();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to cancel order");
      }
    }
  };

  const getOrderStatusMessage = () => {
    switch (order?.status) {
      case "pending":
        return "We've received your order. Pickup has not started yet.";
      case "in-progress":
        return "Your clothes are currently being processed by our team.";
      case "ready-for-delivery":
        return "Your order is packed and ready for delivery.";
      case "out-for-delivery":
        return "Your rider is on the way. Please keep your phone available.";
      case "completed":
        return "Your order has been successfully delivered. Thank you for choosing Zusko.";
      case "cancelled":
        return "This order has been cancelled.";
      default:
        return "Please contact support for assistance.";
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const steps = [
    { key: "pending", label: "Order Placed", icon: Package },
    { key: "picked-up", label: "Picked Up", icon: Package },
    { key: "in-progress", label: "Processing", icon: Truck },
    { key: "ready-for-delivery", label: "Ready", icon: CheckCircle },
    { key: "out-for-delivery", label: "Out Delivery", icon: Truck },
    { key: "completed", label: "Delivered", icon: CheckCircle },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: "from-yellow-400 to-orange-400",
      "picked-up": "from-blue-400 to-cyan-400",
      "in-progress": "from-purple-400 to-pink-400",
      "ready-for-delivery": "from-green-400 to-emerald-400",
      "out-for-delivery": "from-orange-400 to-red-400",
      completed: "from-green-500 to-emerald-500",
      cancelled: "from-red-400 to-pink-400",
    };
    return colors[status] || colors["pending"];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // Loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-32 pb-24"
      >
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          {/* Header Skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="h-10 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl mb-4" />
            <div className="h-5 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
          </div>

          {/* Progress Skeleton */}
          <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg animate-pulse border border-white/80 mb-8">
            <div className="h-6 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-8" />
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex-1 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300" />
                  <div className="h-3 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded mt-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg animate-pulse border border-white/80"
              >
                <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-6" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
                  <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!order) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center pt-32 pb-24 px-4"
      >
        <div className="text-center bg-white/50 backdrop-blur-xl rounded-3xl p-12 shadow-lg border border-white/80">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-orders")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const currentStep = steps.findIndex((step) => step.key === order.status);
  const statusGradient = getStatusColor(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-32 pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-10"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </motion.button>

          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`p-3 rounded-2xl bg-gradient-to-br ${statusGradient}`}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900">
                Track Order
              </h1>
              <p className="text-gray-600">{order.orderId}</p>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl">
            {getOrderStatusMessage()}
          </motion.p>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`inline-block px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r ${statusGradient} text-white shadow-lg`}
          >
            {order.status.replaceAll("-", " ").toUpperCase()}
          </motion.span>
        </motion.div>

        {/* Progress Tracker */}
        {!["cancelled"].includes(order.status) && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/80 mb-10 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <h3 className="text-xl font-black text-gray-900 mb-8 relative z-10">Order Progress</h3>

            <div className="relative">
              {/* Progress line background */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>

              {/* Progress line fill */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`absolute top-5 left-0 h-1 bg-gradient-to-r ${statusGradient} rounded-full`}
              ></motion.div>

              {/* Steps */}
              <div className="relative z-10 flex justify-between">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = index <= currentStep;
                  const isActive = index === currentStep;

                  return (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                          isCompleted
                            ? `bg-gradient-to-br ${statusGradient} text-white shadow-lg`
                            : "bg-gray-200 text-gray-500"
                        } ${isActive ? "ring-4 ring-yellow-400/30" : ""}`}
                      >
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <CheckCircle size={24} />
                          </motion.div>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </motion.div>

                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-xs mt-3 text-center max-w-20 font-semibold text-gray-700"
                      >
                        {step.label}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          {/* Pickup & Address */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pickup Details */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/80 group-hover:border-yellow-300/50 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>

                <div className="flex items-center gap-3 mb-6">
                  <motion.div className="p-3 rounded-xl bg-yellow-100">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900">Pickup Details</h3>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">{order.pickup?.date}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">Time</p>
                    <p className="font-semibold text-gray-900">{order.pickup?.time}</p>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/80 group-hover:border-blue-300/50 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>

                <div className="flex items-center gap-3 mb-6">
                  <motion.div className="p-3 rounded-xl bg-blue-100">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900">Address</h3>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">Full Address</p>
                    <p className="font-semibold text-gray-900">{order.address?.fullAddress}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">City & Pincode</p>
                    <p className="font-semibold text-gray-900">
                      {order.address?.city} - {order.address?.pincode}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/80 group-hover:border-purple-300/50 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>

              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-purple-100">
                  <Package className="w-6 h-6 text-purple-600" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
              </div>

              {/* Items */}
              <div className="space-y-4 mb-8">
                {order.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.8)" }}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-gray-200 transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.service}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                      ₹{item.price * item.qty}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹
                    {order.originalTotal ||
                      order.items.reduce((acc, item) => acc + item.price * item.qty, 0)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Handling Charges</span>
                  <span className="font-semibold">₹{order.handlingFee || 0}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {order.deliveryFee > 0 ? `₹${order.deliveryFee}` : "FREE"}
                  </span>
                </div>

                {order.discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between text-green-600 font-semibold"
                  >
                    <span>Discount</span>
                    <span>-₹{order.discount}</span>
                  </motion.div>
                )}

                <div className="border-t border-purple-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                      ₹{order.total}
                    </motion.span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Inclusive of all applicable charges
                  </p>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/80 group-hover:border-green-300/50 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400"></div>

              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-green-100">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900">Payment Details</h3>
              </div>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                >
                  <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-900">{order.payment?.method}</p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                >
                  <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      order.payment?.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.payment?.status.toUpperCase()}
                  </motion.span>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                >
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="font-semibold text-gray-900">₹{order.payment?.amount}</p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                >
                  <p className="text-xs text-gray-500 mb-1">Order Created</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              </div>

              {/* Pay Online Button */}
              {order.payment?.method === "COD" &&
                order.payment?.status !== "paid" &&
                ["pending"].includes(order.status) && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePayPendingOrder}
                    className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay Online Now ₹{order.payment?.amount}
                  </motion.button>
                )}

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Refund Details */}
          {order.refund && order.refund.status !== "none" && (
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300"
            >
              <h3 className="font-bold text-lg text-green-900 mb-4">Refund Details</h3>
              <div className="space-y-3 text-green-800">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold">{order.refund.status.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold">₹{order.refund.amount}</span>
                </div>
                {order.refund.completedAt && (
                  <div className="flex justify-between">
                    <span>Refunded At:</span>
                    <span className="font-semibold">
                      {new Date(order.refund.completedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/80 group-hover:border-indigo-300/50 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-400"></div>

              <h3 className="text-lg font-bold text-gray-900 mb-6">Additional Information</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                >
                  <p className="text-xs text-gray-500 mb-2">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">
                    {order.estimatedDelivery
                      ? new Date(order.estimatedDelivery).toLocaleString()
                      : "Not Available"}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all"
                >
                  <p className="text-xs text-gray-500 mb-2">Delivery Agent</p>
                  <p className="font-semibold text-gray-900">
                    {order.deliveryAgent?.name || "Not Assigned"}
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/80 group-hover:border-orange-300/50 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>

              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-orange-100">
                  <Clock className="w-6 h-6 text-orange-600" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900">Order Timeline</h3>
              </div>

              <div className="space-y-6 relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-red-400 rounded-full"></div>

                {order.history?.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex gap-6 relative z-10"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 mt-1 flex-shrink-0 shadow-lg"
                    />

                    <div className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all flex-1">
                      <p className="font-semibold text-gray-900">
                        {entry.status.replaceAll("-", " ").toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(entry.changedAt).toLocaleString()}
                      </p>
                      {entry.note && (
                        <p className="text-sm text-gray-500 mt-2 italic">{entry.note}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 flex-col sm:flex-row"
          >
            {["pending", "picked-up", "in-progress"].includes(order.status) && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCancelOrder(order._id)}
                className="flex-1 px-6 py-4 rounded-xl border-2 border-red-400 text-red-600 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <Ban className="w-5 h-5" />
                Cancel Order
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHelp(!showHelp)}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Need Help?
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Assistant Modal */}
      <AnimatePresence>
        {showHelp && (
          <OrderAssistant order={order} onClose={() => setShowHelp(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}