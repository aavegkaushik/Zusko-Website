import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import {
  Package,
  Clock,
  CheckCircle,
  ChevronRight,
  MapPin,
  CalendarDays,
  CreditCard,
  Tag,
  Receipt,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import API from "../config/api";

export default function MyOrders() {
  const navigate = useNavigate();
  const { reorderItems } = useContext(CartContext);

  const [activeOrders, setActiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState(null);

  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const [activeRes, historyRes] = await Promise.all([
        API.get("/orders/active"),
        API.get("/orders/history"),
      ]);

      setActiveOrders(activeRes.data.data || []);

      setHistoryOrders(historyRes.data.data || []);
    } catch (error) {
      console.error("Fetch orders failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAgain = (order) => {
    try {
      setReorderingId(order._id);

      if (!order?.items?.length) {
        alert("This order does not contain any items to reorder.");
        return;
      }

      const items = reorderItems(order.items);

      if (!items.length) {
        alert("Unable to restore this order to cart.");
        return;
      }

      navigate("/cart");
    } catch (error) {
      console.error("Book again failed:", error);

      alert("Something went wrong while reordering.");
    } finally {
      setReorderingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "out-for-delivery":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getAddressText = (address) => {
    if (!address) return "Address not available";

    if (typeof address === "string") {
      return address;
    }

    return [
      address.addressLine || address.address || address.line1,
      address.area,
      address.city,
      address.state,
      address.pincode || address.postalCode,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const orders = activeTab === "active" ? activeOrders : historyOrders;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="min-h-screen bg-gray-50 pt-24 pb-24">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header Skeleton */}
            <div className="mb-6 animate-pulse">
              <div className="h-9 w-40 bg-gray-200 rounded-lg mb-3" />
              <div className="h-4 w-64 bg-gray-200 rounded" />
            </div>

            {/* Tabs Skeleton */}
            <div className="bg-white rounded-2xl p-1 flex mb-6 shadow-sm animate-pulse">
              <div className="flex-1 h-12 bg-gray-200 rounded-xl mr-2" />
              <div className="flex-1 h-12 bg-gray-200 rounded-xl" />
            </div>

            {/* Order Cards Skeleton */}
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl p-6 shadow-sm animate-pulse"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
                        <div className="h-6 w-24 bg-gray-200 rounded-full" />
                      </div>

                      <div className="space-y-3">
                        <div className="h-4 w-36 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-start md:items-end gap-4">
                      <div className="h-8 w-20 bg-gray-200 rounded-lg" />

                      <div className="h-11 w-36 bg-gray-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen mt-10 bg-gray-50 pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Orders</h1>

          <p className="text-gray-500 mt-1">
            Track and manage your laundry orders.
          </p>
        </div>

        {/* Tabs */}

        <div className="bg-white rounded-2xl p-1 flex mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-3 rounded-xl font-medium transition
            ${
              activeTab === "active" ? "bg-black text-white" : "text-gray-600"
            }`}
          >
            Active Orders
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 rounded-xl font-medium transition
            ${
              activeTab === "history" ? "bg-black text-white" : "text-gray-600"
            }`}
          >
            History
          </button>
        </div>

        {/* Empty State */}

        {orders.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <Package className="mx-auto mb-4 text-gray-300" size={48} />

            <h2 className="text-xl font-semibold">No Orders Found</h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/services")}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
            >
              Book Laundry Service
            </button>
          </div>
        )}

        {/* Orders */}

        {/* Orders */}

        <div className="space-y-5">
          {orders.map((order) => {
            const isHistoryOrder =
              order.status === "completed" || order.status === "cancelled";

            const isCompleted = order.status === "completed";

            const isCancelled = order.status === "cancelled";

            const isExpanded = expandedOrder === order._id;

            const subtotal =
              order.subtotal ??
              order.items?.reduce(
                (sum, item) =>
                  sum +
                  Number(item.price || 0) *
                    Number(item.qty || item.quantity || 1),
                0,
              ) ??
              0;

            const discount = Number(order.discount || 0);

            const deliveryFee = Number(order.deliveryFee || 0);

            return (
              <motion.div
                key={order._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                {/* =========================
            ORDER SUMMARY
        ========================== */}

                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between gap-5">
                    {/* LEFT */}

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-bold text-lg">{order.orderId}</h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {order.status?.replaceAll("-", " ").toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-3 text-sm text-gray-500 space-y-2">
                        {/* DATE */}

                        <div className="flex items-center gap-2">
                          <Clock size={16} />

                          <span>{formatDate(order.createdAt)}</span>
                        </div>

                        {/* ITEMS */}

                        <div className="flex items-center gap-2">
                          <Package size={16} />

                          <span>
                            {order.items?.length || 0} item
                            {order.items?.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-col items-start md:items-end">
                      <div className="font-bold text-xl">
                        ₹{Number(order.total || 0).toFixed(2)}
                      </div>

                      <div className="flex gap-3 mt-4 flex-wrap">
                        {/* TRACK ACTIVE ORDER */}

                        {!isCompleted && order.status !== "cancelled" && (
                          <button
                            onClick={() =>
                              navigate(`/track-order/${order._id}`)
                            }
                            className="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition"
                          >
                            Track Order
                            <ChevronRight size={18} />
                          </button>
                        )}

                        {/* VIEW DETAILS COMPLETED */}

                        {isHistoryOrder && (
                          <button
                            onClick={() =>
                              setExpandedOrder(isExpanded ? null : order._id)
                            }
                            className="bg-gray-100 text-black px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition font-medium"
                          >
                            {isExpanded ? "Hide Details" : "View Details"}

                            {isExpanded ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                        )}

                        {/* RATE */}

                        {isCompleted && !order.rating?.stars && (
                          <button
                            onClick={() =>
                              navigate(`/orders/${order._id}/rate`)
                            }
                            className="bg-yellow-400 text-black px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-yellow-300 transition font-semibold"
                          >
                            <CheckCircle size={18} />
                            Rate Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ==================================================
            FULL COMPLETED ORDER DETAILS
        =================================================== */}

                {isHistoryOrder && isExpanded && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    className="border-t border-gray-100 bg-gray-50"
                  >
                    <div className="p-6 space-y-6">
                      {/* =========================
                  ORDER INFORMATION
              ========================== */}

                      <div>
                        <h3 className="font-bold text-lg mb-4">
                          Order Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* ORDER DATE */}

                          <div className="bg-white rounded-2xl p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <CalendarDays size={20} />
                              </div>

                              <div>
                                <p className="text-xs text-gray-500">
                                  Order Date
                                </p>

                                <p className="font-semibold">
                                  {formatDateTime(order.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* PAYMENT */}

                          <div className="bg-white rounded-2xl p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <CreditCard size={20} />
                              </div>

                              <div>
                                <p className="text-xs text-gray-500">Payment</p>

                                <p className="font-semibold capitalize">
                                  {order.paymentMethod ||
                                    order.payment?.method ||
                                    "Online"}
                                </p>

                                <p className="text-xs text-green-600 font-medium">
                                  {order.paymentStatus ||
                                    order.payment?.status ||
                                    "Paid"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* =========================
                  SERVICES / ITEMS
              ========================== */}

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">
                            Items & Services
                          </h3>

                          <span className="text-sm text-gray-500">
                            {order.items?.length || 0} items
                          </span>
                        </div>

                        <div className="bg-white rounded-2xl overflow-hidden">
                          {order.items?.map((item, index) => {
                            const quantity = Number(
                              item.qty || item.quantity || 1,
                            );

                            const price = Number(item.price || 0);

                            const itemTotal = price * quantity;

                            return (
                              <div
                                key={item._id || index}
                                className={`p-4 flex items-center justify-between gap-4 ${
                                  index !== order.items.length - 1
                                    ? "border-b border-gray-100"
                                    : ""
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <Package size={20} />
                                  </div>

                                  <div>
                                    <p className="font-semibold">
                                      {item.name ||
                                        item.serviceName ||
                                        item.title ||
                                        "Laundry Service"}
                                    </p>

                                    {/* SERVICE TYPE */}

                                    {(item.serviceType ||
                                      item.service ||
                                      order.serviceType) && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Service:{" "}
                                        {item.serviceType ||
                                          item.service ||
                                          order.serviceType}
                                      </p>
                                    )}

                                    <p className="text-sm text-gray-500">
                                      ₹{price.toFixed(2)} × {quantity}
                                    </p>
                                  </div>
                                </div>

                                <div className="font-semibold">
                                  ₹{itemTotal.toFixed(2)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* =========================
                  PICKUP / DELIVERY
              ========================== */}

                      {(order.pickup ||
                        order.address ||
                        order.deliveryAddress) && (
                        <div>
                          <h3 className="font-bold text-lg mb-4">
                            Pickup & Delivery
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* PICKUP */}

                            {order.pickup && (
                              <div className="bg-white rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                                    <CalendarDays size={20} />
                                  </div>

                                  <div>
                                    <p className="font-semibold">
                                      Pickup Schedule
                                    </p>

                                    <p className="text-xs text-gray-500">
                                      Scheduled pickup
                                    </p>
                                  </div>
                                </div>

                                <div className="text-sm space-y-1">
                                  {order.pickup.date && (
                                    <p>
                                      <span className="text-gray-500">
                                        Date:
                                      </span>{" "}
                                      {formatDate(order.pickup.date)}
                                    </p>
                                  )}

                                  {order.pickup.time && (
                                    <p>
                                      <span className="text-gray-500">
                                        Time:
                                      </span>{" "}
                                      {order.pickup.time}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* ADDRESS */}

                            {(order.address || order.deliveryAddress) && (
                              <div className="bg-white rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <MapPin size={20} />
                                  </div>

                                  <div>
                                    <p className="font-semibold">
                                      Delivery Address
                                    </p>

                                    <p className="text-xs text-gray-500">
                                      Delivered to
                                    </p>
                                  </div>
                                </div>

                                <p className="text-sm text-gray-600 leading-6">
                                  {getAddressText(
                                    order.address || order.deliveryAddress,
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* =========================
                  BILL DETAILS
              ========================== */}

                      <div>
                        <h3 className="font-bold text-lg mb-4">Bill Details</h3>

                        <div className="bg-white rounded-2xl p-5">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Item Total</span>

                              <span className="font-medium">
                                ₹{subtotal.toFixed(2)}
                              </span>
                            </div>

                            {discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span className="flex items-center gap-2">
                                  <Tag size={16} />
                                  Discount
                                </span>

                                <span className="font-medium">
                                  -₹{discount.toFixed(2)}
                                </span>
                              </div>
                            )}

                            {order.coupon?.code && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Coupon</span>

                                <span className="font-semibold">
                                  {order.coupon.code}
                                </span>
                              </div>
                            )}

                            {deliveryFee > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Delivery Fee
                                </span>

                                <span>₹{deliveryFee.toFixed(2)}</span>
                              </div>
                            )}

                            {order.handlingFee > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Handling Fee
                                </span>

                                <span>
                                  ₹{Number(order.handlingFee).toFixed(2)}
                                </span>
                              </div>
                            )}

                            <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between text-base">
                              <span className="font-bold">Total Paid</span>

                              <span className="font-bold text-lg">
                                ₹{Number(order.total || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* =========================
                  PAYMENT STATUS
              ========================== */}

                      {isCancelled ? (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                              <Package className="text-red-600" size={20} />
                            </div>

                            <div>
                              <p className="font-semibold text-red-800">
                                Order Cancelled
                              </p>

                              <p className="text-sm text-red-700">
                                This order was cancelled and is available in
                                your order history.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={22} />

                            <div>
                              <p className="font-semibold text-green-800">
                                Order Completed
                              </p>

                              <p className="text-sm text-green-700">
                                Your laundry order has been successfully
                                completed.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* =========================
                  ACTIONS
              ========================== */}

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleBookAgain(order)}
                          disabled={reorderingId === order._id}
                          className="flex-1 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                        >
                          <RotateCcw
                            size={18}
                            className={
                              reorderingId === order._id ? "animate-spin" : ""
                            }
                          />

                          {reorderingId === order._id
                            ? "Adding to Cart..."
                            : "Book Again"}
                        </button>

                        <button
                          onClick={() => window.print()}
                          className="flex-1 bg-white border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-gray-50 transition"
                        >
                          <Receipt size={18} />
                          View Invoice
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
