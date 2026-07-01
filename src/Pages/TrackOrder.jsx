import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import API from "../config/api";
import OrderAssistant from "../components/OrderAssistant";
import axios from "axios";

export default function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

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

          setOrder(data.data);
        },

        theme: {
          color: "#000",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Payment failed");
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "ORDER CONFIRMED";
      case "picked-up":
        return "ORDER PICKED UP";
      default:
        return status.replaceAll("-", " ").toUpperCase();
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const { data } = await API.patch(`/orders/${orderId}/cancel`);

      alert(data.message);

      fetchOrder();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  // Support Message
  const getOrderStatusMessage = () => {
    switch (order.status) {
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
    {
      key: "pending",
      label: "Order Placed",
    },
    {
      key: "picked-up",
      label: "Order Picked Up",
    },
    {
      key: "in-progress",
      label: "In Progress",
    },
    {
      key: "ready-for-delivery",
      label: "Ready",
    },
    {
      key: "out-for-delivery",
      label: "Out for Delivery",
    },
    {
      key: "completed",
      label: "Delivered",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-10">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          {/* Header Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-8 w-40 bg-gray-200 rounded-lg mb-3" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>

              <div className="h-8 w-28 bg-gray-200 rounded-full" />
            </div>
          </div>

          {/* Progress Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded mb-8" />

            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />

                  <div className="h-3 w-16 bg-gray-200 rounded mt-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="h-6 w-40 bg-gray-200 rounded mb-6" />

                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Items Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
            <div className="h-6 w-36 bg-gray-200 rounded mb-6" />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex justify-between border-b pb-4 mb-4"
              >
                <div>
                  <div className="h-5 w-28 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>

                <div>
                  <div className="h-5 w-12 bg-gray-200 rounded mb-2" />
                  <div className="h-5 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
            <div className="h-6 w-40 bg-gray-200 rounded mb-6" />

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-gray-200 mt-2" />

                <div className="flex-1">
                  <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );
  }

  const currentStep = steps.findIndex((step) => step.key === order.status);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-5">
          <button
            onClick={() => {
              setOpen(true);
              setHasUnread(false);
            }}
            className="
      flex items-center gap-2
      bg-black text-white
      px-4 py-2
      rounded-xl
      hover:opacity-90
    "
          >
            <MessageCircle size={18} />
            Need Help?
          </button>
        </div>

        {/* Customer Information */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Customer */}

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Customer Information</h3>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>

                <p className="font-medium">{order.customerName || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone Number</p>

                <p className="font-medium">{order.customerPhone || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email Address</p>

                <p className="font-medium break-all">
                  {order.customerEmail || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Pickup Contact */}

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Pickup Contact</h3>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Contact Name</p>

                <p className="font-medium">
                  {order.pickupContact?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Contact Number</p>

                <p className="font-medium">
                  {order.pickupContact?.phone || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Alternate Contact</p>

                <p className="font-medium">
                  {order.pickupContact?.isAlternate ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Track Order</h1>

              <p className="text-gray-500 mt-1">Order ID: {order.orderId}</p>
            </div>

            <div
              className={
                order.status === "cancelled"
                  ? "bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold h-fit"
                  : "bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold h-fit"
              }
            >
              {getStatusLabel(order.status)}
            </div>
          </div>
        </div>

        {order.status === "cancelled" && (
          <div
            className="
        bg-red-50
        border border-red-200
        rounded-3xl
        p-6
        mb-6
      "
          >
            <div className="flex items-center gap-4">
              <div
                className="
            w-14 h-14
            rounded-full
            bg-red-100
            flex items-center
            justify-center
          "
              >
                <Ban className="text-red-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-red-600">
                  Order Cancelled
                </h2>

                <p className="text-gray-600">
                  This order was cancelled and will not be processed.
                </p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Cancelled on{" "}
              {new Date(
                order.history?.[order.history.length - 1]?.changedAt,
              ).toLocaleString()}
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="
          mt-5
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
        "
            >
              Book New Order
            </button>
          </div>
        )}

        {order.status === "pending" && (
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to cancel this order?")
              ) {
                handleCancelOrder(order._id);
              }
            }}
            className="
        mt-3
        bg-red-500
        text-white
        px-4
        py-2
        rounded-xl
        hover:bg-red-600
      "
          >
            Cancel Order
          </button>
        )}

        {/* Progress */}
        {order.status !== "cancelled" && (
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <h2 className="font-bold text-lg mb-8">Order Progress</h2>

            <div className="flex justify-between relative">
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full" />

              <div
                className="absolute top-5 left-0 h-1 bg-yellow-400 rounded-full transition-all duration-500"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />

              {steps.map((step, index) => (
                <div
                  key={step.key}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${
                    index <= currentStep
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  >
                    {index <= currentStep ? (
                      <CheckCircle size={18} />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <span className="text-xs mt-3 text-center max-w-20">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pickup */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Calendar />
              <h3 className="font-bold">Pickup Details</h3>
            </div>

            <p>
              <strong>Date:</strong> {order.pickup?.date}
            </p>

            <p>
              <strong>Time:</strong> {order.pickup?.time}
            </p>
          </div>

          {/* Address */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin />
              <h3 className="font-bold">Pickup & Delivery Address</h3>
            </div>

            <p>{order.address?.fullAddress}</p>

            <p>
              {order.address?.city} - {order.address?.pincode}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
          <div className="flex items-center gap-2 mb-5">
            <Package />
            <h3 className="font-bold text-lg">Order Summary</h3>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="
          flex items-center
          justify-between
          border-b
          pb-4
        "
              >
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>

                  <p className="text-sm text-gray-500">{item.service}</p>

                  <p className="text-xs text-gray-400 mt-1">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <div className="font-semibold">₹{item.price * item.qty}</div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>
                ₹
                {order.originalTotal ||
                  order.items.reduce(
                    (acc, item) => acc + item.price * item.qty,
                    0,
                  )}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Handling Charges</span>
              <span>₹{order.handlingFee || 0}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Charges</span>
              <span>
                {order.deliveryFee > 0 ? `₹${order.deliveryFee}` : "FREE"}
              </span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}

            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between font-bold text-xl">
                <span>Total Amount</span>
                <span>₹{order.total}</span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Inclusive of all applicable charges
              </p>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard />
            <h3 className="font-bold">Payment Details</h3>
          </div>

          <p>
            <strong>Method:</strong> {order.payment?.method}
          </p>

          <p>
            <strong>Status:</strong> {order.payment?.status}
          </p>

          <p>
            <strong>Amount:</strong> ₹{order.payment?.amount}
          </p>
          <p>
            <strong>Order Created:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {order.payment?.method === "COD" &&
            order.payment?.status !== "paid" &&
            ["pending"].includes(order.status) && (
              <button
                onClick={handlePayPendingOrder}
                className="
        bg-green-600
        text-white
        px-5
        py-3
        rounded-xl
        font-semibold
        w-full
      "
              >
                Pay Online Now ₹{order.payment?.amount}
              </button>
            )}
        </div>

        {order.refund && order.refund.status !== "none" && (
          <div className="mt-5 rounded-2xl bg-green-50 p-5">
            <h3 className="font-bold text-lg">Refund Details</h3>

            <p>
              Status :<b> {order.refund.status}</b>
            </p>

            <p>Amount : ₹{order.refund.amount}</p>

            {order.refund.completedAt && (
              <p>
                Refunded At :
                {new Date(order.refund.completedAt).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* Additional Information */}

        <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
          <h3 className="font-bold text-lg mb-4">Additional Information</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>

              <p className="font-medium">
                {order.estimatedDelivery
                  ? new Date(order.estimatedDelivery).toLocaleString()
                  : "Not Available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Delivery Agent</p>

              <p className="font-medium">
                {order.deliveryAgent?.name || "Not Assigned"}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock />
            <h3 className="font-bold">Order Timeline</h3>
          </div>

          <div className="space-y-5">
            {order.history?.map((entry, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mt-2" />

                <div>
                  <p className="font-medium">
                    {entry.status.replaceAll("-", " ").toUpperCase()}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(entry.changedAt).toLocaleString()}
                  </p>

                  {entry.note && (
                    <p className="text-sm text-gray-400">{entry.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assistant */}
      {showHelp && (
        <OrderAssistant order={order} onClose={() => setShowHelp(false)} />
      )}
    </div>
  );
}
