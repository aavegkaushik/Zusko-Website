import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { Wallet, CreditCard, ShieldCheck } from "lucide-react";
import API from "../config/api";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  if (!state) navigate("/");
  const { orderData } = state;

const handleCOD = async () => {
  console.log(orderData);
  
  // alert("🚀 We are starting our laundry service very soon. Stay tuned!");
  await API.post("/orders/create", {
    ...orderData,
    payment: {
      method: "COD",
      status: "pending",
      amount: orderData.total,
    },
  });

    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 100);
  };

  const handleOnlinePayment = async () => {

      // alert("🚀 We are starting our laundry service very soon. Online payments will be available shortly!");

    const { data } = await API.post(
  "/payment/create-order",
  { amount: orderData.total }
);

    const options = {
      key: "rzp_test_SeawcubEUW2ev1",
      amount: data.amount,
      currency: "INR",
      name: "Zusko Laundry",
      description: "Laundry Order Payment",
      order_id: data.id,

      handler: async function (response) {
        await API.post("/orders/create", {
  ...orderData,
  payment: {
    method: "ONLINE",
    status: "paid",
    amount: orderData.total,
    razorpayPaymentId: response.razorpay_payment_id,
  },
});

        setTimeout(() => {
          clearCart();
          navigate("/success");
        }, 200);
      },

      theme: { color: "#000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen mt-10 bg-linear-to-br from-yellow-50 via-white to-yellow-100 pt-20 pb-32">

      {/* 🔥 CENTERED CONTAINER */}
      <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Payment</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Complete your order securely
          </p>
        </div>

        {/* 💰 AMOUNT CARD */}
        <div className="bg-black text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-5 shadow-lg">
          <p className="text-xs sm:text-sm text-gray-300">
            Total Payable
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">
            ₹{orderData.total}
          </h2>
        </div>

        {/* 💳 OPTIONS */}
        <div className="space-y-4">

          {/* ONLINE */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={handleOnlinePayment}
            className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition cursor-pointer relative"
          >
            <span className="absolute top-2 right-2 text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Recommended
            </span>

            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Pay Online
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  UPI, Cards, Netbanking
                </p>
              </div>
            </div>
          </motion.div>

          {/* COD */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={handleCOD}
            className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Cash on Pickup
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Pay at the time of Pickup
                </p>
              </div>
            </div>
          </motion.div>

          {/* 🔒 TRUST */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-3">
            <ShieldCheck size={16} />
            <span>100% secure payments powered by Razorpay</span>
          </div>
        </div>
      </div>

      {/* 🚀 STICKY CTA (RESPONSIVE SAFE) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto flex items-center justify-between">
          
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-bold text-lg sm:text-xl">
              ₹{orderData.total}
            </p>
          </div>

          <button
            onClick={handleOnlinePayment}
            className="bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow active:scale-95 transition"
          >
            Pay Now →
          </button>
        </div>
      </div>
    </div>
  );
}