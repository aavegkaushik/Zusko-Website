import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

import API from "../config/api";

export default function MyOrders() {
  const navigate = useNavigate();

  const [activeOrders, setActiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState("active");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const [activeRes, historyRes] =
        await Promise.all([
          API.get("/orders/active"),
          API.get("/orders/history"),
        ]);

      setActiveOrders(
        activeRes.data.data || []
      );

      setHistoryOrders(
        historyRes.data.data || []
      );
    } catch (error) {
      console.error(
        "Fetch orders failed:",
        error
      );
    } finally {
      setLoading(false);
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

  const orders =
    activeTab === "active"
      ? activeOrders
      : historyOrders;

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
          <h1 className="text-3xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Track and manage your laundry
            orders.
          </p>
        </div>

        {/* Tabs */}

        <div className="bg-white rounded-2xl p-1 flex mb-6 shadow-sm">

          <button
            onClick={() =>
              setActiveTab("active")
            }
            className={`flex-1 py-3 rounded-xl font-medium transition
            ${
              activeTab === "active"
                ? "bg-black text-white"
                : "text-gray-600"
            }`}
          >
            Active Orders
          </button>

          <button
            onClick={() =>
              setActiveTab("history")
            }
            className={`flex-1 py-3 rounded-xl font-medium transition
            ${
              activeTab === "history"
                ? "bg-black text-white"
                : "text-gray-600"
            }`}
          >
            History
          </button>

        </div>

        {/* Empty State */}

        {orders.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">

            <Package
              className="mx-auto mb-4 text-gray-300"
              size={48}
            />

            <h2 className="text-xl font-semibold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any
              orders yet.
            </p>

            <button
              onClick={() =>
                navigate("/services")
              }
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
            >
              Book Laundry Service
            </button>

          </div>
        )}

        {/* Orders */}

        <div className="space-y-5">

          {orders.map((order) => (
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
              className="bg-white rounded-3xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                {/* Left */}

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="font-bold text-lg">
                      {order.orderId}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status
                        .replaceAll(
                          "-",
                          " "
                        )
                        .toUpperCase()}
                    </span>

                  </div>

                  <div className="mt-3 text-sm text-gray-500 space-y-1">

                    <div className="flex items-center gap-2">
                      <Clock size={16} />

                      <span>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div>
                      {order.items?.length} item
                      {order.items?.length >
                      1
                        ? "s"
                        : ""}
                    </div>

                  </div>

                </div>

                {/* Right */}

                <div className="flex flex-col items-start md:items-end justify-between">

                  <div className="font-bold text-xl">
                    ₹{order.total}
                  </div>

                  <div className="flex gap-3 mt-4">

                    {/* Track */}

                    {order.status !==
                      "completed" &&
                      order.status !==
                        "cancelled" && (
                        <button
                          onClick={() =>
                            navigate(
                              `/track-order/${order._id}`
                            )
                          }
                          className="bg-black text-white px-5 py-2 rounded-xl flex items-center gap-2"
                        >
                          Track Order

                          <ChevronRight
                            size={18}
                          />
                        </button>
                      )}

                    {/* Rate */}

                    {order.status ===
                      "completed" &&
 !order.rating?.stars && (
                      <button
                        onClick={() =>
                          navigate(
                            `/orders/${order._id}/rate`
                          )
                        }
                        className="bg-yellow-400 text-black px-5 py-2 rounded-xl flex items-center gap-2"
                      >
                        <CheckCircle
                          size={18}
                        />

                        Rate Order
                      </button>
                    )}

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
}