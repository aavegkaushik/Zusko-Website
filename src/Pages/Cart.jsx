import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CouponSection from "../components/CouponSection.jsx";

export default function Cart() {
  const { cart, total, finalTotal, discount, increaseQty, decreaseQty } =
    useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-28 bg-[#fafafa]">
      {/* 🔥 Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Your Cart</h1>
        <p className="text-xs text-gray-500">Review your items</p>
      </div>

      <div className="max-w-md mx-auto px-4 pt-4 pb-32">
        {/* 🧺 Empty State */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <p className="text-lg font-semibold mb-2">Your cart is empty 🧺</p>
            <p className="text-sm text-gray-500 mb-4">
              Add some laundry items to get started
            </p>

            <button
              onClick={() => navigate("/place-order")}
              className="bg-yellow-400 px-6 py-3 rounded-xl font-semibold"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <>
            {/* 🧾 Items */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.name + item.service}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex justify-between items-center"
                >
                  {/* Info */}
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.service} • ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-black text-white px-3 py-1.5 rounded-full">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="text-lg px-2 active:scale-110"
                    >
                      −
                    </button>

                    <span className="text-sm font-semibold w-5 text-center">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="text-lg px-2 active:scale-110"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold">₹{item.qty * item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 🎟️ Apply Coupon */}
            <CouponSection />

            {/* 💰 Bill Summary */}
            <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-semibold mb-3">Bill Details</h2>

              <div className="flex justify-between text-sm mb-2 text-gray-600">
                <span>Item Total</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between text-sm mb-2 text-gray-600">
                <span>Pickup & Delivery Fee</span>
                <span className={total >= 200 ? "text-green-600" : ""}>
                  {total < 200 && (
                    <p className="text-xs text-orange-500 mt-1">
                      Add ₹{200 - total} more for FREE delivery 🚚
                    </p>
                  )}

                  {total >= 200 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span></span>
                  )}
                </span>
              </div>

              {/* ✅ SHOW DISCOUNT */}
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              {/* 🎉 SAVINGS MESSAGE */}
              {discount > 0 && (
                <div className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg mt-2 font-medium">
                  🎉 You saved ₹{discount}
                </div>
              )}

              {/* ✅ FINAL PRICE */}
              <div className="flex justify-between font-semibold text-lg mt-3 pt-3 border-t">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 🔥 Sticky Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
          <div className="max-w-md mx-auto flex items-center justify-between">
            {/* ✅ ONLY FINAL PRICE */}
            <div>
              <p className="text-xs text-gray-500">Total (Inc. GST)</p>
              <p className="font-bold text-lg">₹{finalTotal}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/checkout")}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold"
            >
              Checkout →
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
