import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Tag, X } from "lucide-react";
import confetti from "canvas-confetti";
export default function CouponSection() {
  const { applyCoupon, coupon, discount, removeCoupon } =
    useContext(CartContext);

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [shake, setShake] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleApply = () => {
    const res = applyCoupon(code);
    setMsg(res.message);
    setIsError(!res.success);

    if (res.success) {
      fireConfetti();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const getUserType = () => {
    const orders = Number(localStorage.getItem("orders")) || 0;

    if (orders === 0) return "new";
    if (orders > 5) return "frequent";
    return "occasional";
  };

  const getCoupons = () => {
    const type = getUserType();

    if (type === "new") return ["WELCOME50"];
    if (type === "frequent") return ["LOYAL20", "SAVE50"];
    return ["COME10", "SAVE10"];
  };

  const handleSuggestion = (couponCode) => {
    setCode(couponCode);

    const res = applyCoupon(couponCode);
    setMsg(res.message);
    setIsError(!res.success);

    if (res.success) {
      fireConfetti();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Tag size={18} />
        <h3 className="font-semibold">Apply Coupon</h3>
      </div>

      {!coupon ? (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setMsg("");
                setIsError(false);
              }}
              className={`flex-1 border px-3 py-2 rounded-lg outline-none ${
                isError ? "border-red-500" : ""
              }`}
            />
            <button
              onClick={handleApply}
              className="bg-black text-white px-4 rounded-lg"
            >
              Apply
            </button>
          </div>

          {/* 🧠 Message */}
          <p className="text-xs text-gray-500 mt-2">
            {getUserType() === "new" && "🎉 Welcome offer just for you!"}
            {getUserType() === "frequent" && "🔥 Loyalty reward unlocked!"}
            {getUserType() === "occasional" && "💸 Come back & save more!"}
          </p>

          {/* 🎟️ Suggestions */}
          <div className="mt-2 flex gap-2 flex-wrap">
            {getCoupons().map((c) => (
              <button
                key={c}
                onClick={() => handleSuggestion(c)}
                className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full hover:bg-yellow-200 transition"
              >
                💡 {c}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
          <p className="text-green-600 text-sm">
            ✅ {coupon} applied (₹{discount} off)
          </p>
          <button
            onClick={() => {
              removeCoupon();
              setMsg("");
              setIsError(false);
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {msg && (
        <p
          className={`text-sm mt-2 ${
            isError ? "text-red-500 font-medium" : "text-green-600"
          }`}
        >
          {msg}
        </p>
      )}
    </div>
  );
}