import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const steps = [
  "Order Placed",
  "Picked Up",
  "Washing",
  "Out for Delivery",
  "Delivered",
];

export default function TrackOrder() {
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

    console.log(token);
    

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );

        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading your order...
      </div>
    );
  }

  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 to-white p-6">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Track Your Order 🧺
        </h1>

        {/* ORDER INFO */}
        <div className="mb-6 text-sm text-gray-600">
          Order ID: <span className="font-semibold">{order._id}</span>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">

              {/* CIRCLE */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center
                ${
                  index <= currentStepIndex
                    ? "bg-yellow-400"
                    : "bg-gray-200"
                }`}
              >
                {index <= currentStepIndex && "✔"}
              </div>

              {/* LINE */}
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    index <= currentStepIndex
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </p>

                {index === currentStepIndex && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="h-1 bg-yellow-400 mt-1 rounded"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* STATUS MESSAGE */}
        <div className="mt-6 text-center text-gray-600">
          Current Status:{" "}
          <span className="font-semibold text-yellow-500">
            {order.status}
          </span>
        </div>

      </div>
    </div>
  );
}