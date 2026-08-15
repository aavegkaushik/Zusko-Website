import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Tag,
  X,
  Lock,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function CouponSection() {
  const {
    applyCoupon,
    coupon,
    discount,
    removeCoupon,
    availableCoupons = [],
    couponLoading,
    total,
  } = useContext(CartContext);

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [shake, setShake] = useState(false);
  const [isError, setIsError] = useState(false);

  // =========================================================
  // APPLY COUPON
  // =========================================================

  const handleApply = async (couponCode = code) => {
    const finalCode = couponCode?.trim();

    if (!finalCode) {
      setMsg("Please enter a coupon code");
      setIsError(true);
      return;
    }

    setMsg("");
    setIsError(false);

    try {
      const res = await applyCoupon(finalCode);

      setMsg(res.message || "");
      setIsError(!res.success);

      if (res.success) {
        setCode(finalCode.toUpperCase());
        fireConfetti();
      } else {
        setShake(true);

        setTimeout(() => {
          setShake(false);
        }, 400);
      }
    } catch (error) {
      console.error(
        "COUPON APPLY ERROR:",
        error
      );

      setMsg("Unable to apply coupon");
      setIsError(true);

      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);
    }
  };

  // =========================================================
  // CONFETTI
  // =========================================================

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: {
        y: 0.6,
      },
    });
  };

  // =========================================================
  // COUPON SUGGESTION
  // =========================================================

  const handleSuggestion = (couponCode) => {
    setCode(couponCode);
    setMsg("");
    setIsError(false);

    handleApply(couponCode);
  };

  // =========================================================
  // REMOVE COUPON
  // =========================================================

  const handleRemove = () => {
    try {
      removeCoupon();

      setCode("");
      setMsg("");
      setIsError(false);

      console.log(
        "Coupon removed successfully"
      );
    } catch (error) {
      console.error(
        "COUPON REMOVE ERROR:",
        error
      );

      setMsg("Unable to remove coupon");
      setIsError(true);
    }
  };

  // =========================================================
  // FILTER COUPONS
  // =========================================================
  //
  // firstOrderOnly / newUsersOnly coupons:
  // Show ONLY when user is eligible.
  //
  // Normal coupons:
  // Show both eligible and locked.
  //
  // =========================================================

  const visibleCoupons =
    availableCoupons.filter((item) => {
      if (
        item.firstOrderOnly ||
        item.newUsersOnly
      ) {
        return item.eligible === true;
      }

      return true;
    });

  // =========================================================
  // LOADING
  // =========================================================

  if (
    couponLoading &&
    availableCoupons.length === 0
  ) {
    return (
      <div className="bg-white p-4 rounded-2xl mt-4">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "#FFF9E6",
            }}
          >
            <Tag
              size={17}
              color="#D97706"
            />
          </div>

          <div>
            <p className="font-bold text-gray-900 text-sm">
              Available Offers
            </p>

            <p className="text-[11px] text-gray-400">
              Finding the best coupons for you...
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl p-4"
              style={{
                background: "#F8F9FB",
              }}
            >
              <div className="h-4 bg-gray-200 rounded w-24 mb-2" />

              <div className="h-3 bg-gray-200 rounded w-48" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================
  // COUPON APPLIED
  // =========================================================

  if (coupon) {
    return (
      <div className="bg-white p-4 rounded-2xl mt-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="relative overflow-hidden rounded-2xl p-4"
          style={{
            background:
              "linear-gradient(135deg,#ECFDF5,#F0FDF4)",
            border:
              "1px solid #BBF7D0",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "#DCFCE7",
                }}
              >
                <Check
                  size={19}
                  color="#16A34A"
                  strokeWidth={3}
                />
              </div>

              <div>
                <p className="text-[11px] text-green-600 font-semibold uppercase tracking-wide">
                  Coupon Applied
                </p>

                <p className="text-sm font-black text-gray-900">
                  {coupon}
                </p>

                <p className="text-xs text-green-600 mt-0.5">
                  You're saving ₹{discount}
                </p>
              </div>
            </div>

            {/* REMOVE BUTTON */}

            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove coupon"
              className="
                mb-10
                px-4 py-2.5
                min-w-[90px]
                rounded-xl
                flex items-center justify-center
                bg-white
                text-red-500
                border border-red-200
                hover:bg-red-50
                active:scale-95
                transition-all
                cursor-pointer
                shrink-0
                font-bold
                text-xs
                tracking-wide
              "
            >
              REMOVE
            </button>
          </div>

          <div className="absolute -right-6 -bottom-8 text-7xl opacity-10">
            🎉
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  // COUPON SECTION
  // =========================================================

  return (
    <div className="bg-white p-4 rounded-2xl mt-4">

      {/* HEADER */}

      {/* <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "#FFF9E6",
            }}
          >
            <Tag
              size={17}
              color="#D97706"
            />
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Available Offers
            </h3>

            <p className="text-[11px] text-gray-400">
              Offers picked for your account
            </p>
          </div>
        </div>

        <Sparkles
          size={17}
          color="#D97706"
        />
      </div> */}

      {/* =====================================================
          MANUAL COUPON INPUT
      ===================================================== */}

      <motion.div
        animate={
          shake
            ? {
                x: [-5, 5, -5, 5, 0],
              }
            : { x: 0 }
        }
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => {
              setCode(
                e.target.value.toUpperCase()
              );

              setMsg("");
              setIsError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApply();
              }
            }}
            className={`flex-1 border px-3.5 py-2.5 rounded-xl outline-none text-sm font-medium transition ${
              isError
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-yellow-400"
            }`}
          />

          <button
            type="button"
            onClick={() => handleApply()}
            disabled={
              !code.trim() ||
              couponLoading
            }
            className="px-5 rounded-xl font-bold text-sm transition disabled:opacity-40"
            style={{
              background: "#101010",
              color: "#FFD700",
            }}
          >
            {couponLoading
              ? "..."
              : "Apply"}
          </button>
        </div>
      </motion.div>

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      <AnimatePresence>
        {msg && (
          <motion.p
            initial={{
              opacity: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className={`text-xs mt-2.5 ${
              isError
                ? "text-red-500"
                : "text-green-600"
            } font-medium`}
          >
            {isError
              ? "⚠️ "
              : "✓ "}
            {msg}
          </motion.p>
        )}
      </AnimatePresence>

      {/* =====================================================
          COUPON CARDS
      ===================================================== */}

      <div className="mt-4 space-y-3">
        {visibleCoupons.length === 0 ? (
          <div
            className="text-center py-5 rounded-2xl"
            style={{
              background: "#F8F9FB",
            }}
          >
            <div className="text-2xl mb-1">
              🎟️
            </div>

            <p className="text-sm font-semibold text-gray-700">
              No offers available
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Check back later for exciting offers
            </p>
          </div>
        ) : (
          visibleCoupons.map(
            (item, index) => {
              const eligible =
                item.eligible === true;

              const amountToUnlock =
                Math.max(
                  Number(
                    item.minOrderValue ||
                      0
                  ) -
                    Number(
                      total || 0
                    ),
                  0
                );

              return (
                <motion.div
                  key={
                    item.id ||
                    item.code
                  }
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className={`relative overflow-hidden rounded-2xl p-4 transition ${
                    eligible
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                  style={{
                    border: eligible
                      ? "1px solid #FDE68A"
                      : "1px solid #E5E7EB",
                  }}
                >
                  {/* LEFT ACCENT */}

                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{
                      background:
                        eligible
                          ? "#FFD700"
                          : "#D1D5DB",
                    }}
                  />

                  <div className="flex items-center justify-between gap-3 pl-2">

                    {/* COUPON INFO */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black text-sm tracking-wide ${
                            eligible
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {item.code}
                        </span>

                        {eligible ? (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-500">
                            LOCKED
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-xs mt-1 ${
                          eligible
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {item.description}
                      </p>

                      {/* DISCOUNT */}

                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs font-bold ${
                            eligible
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {item.discountType ===
                          "percentage"
                            ? `${item.discountValue}% OFF`
                            : `₹${item.discountValue} OFF`}
                        </span>

                        {item.minOrderValue >
                          0 && (
                          <span className="text-[10px] text-gray-400">
                            • Min ₹
                            {
                              item.minOrderValue
                            }
                          </span>
                        )}
                      </div>

                      {/* LOCK MESSAGE */}

                      {!eligible && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <Lock
                            size={11}
                            className="text-gray-400"
                          />

                          <span className="text-[10px] text-gray-500">
                            {amountToUnlock >
                            0
                              ? `Add ₹${amountToUnlock} more to unlock`
                              : item.message ||
                                "Not available"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* APPLY / LOCKED */}

                    <div className="shrink-0">
                      <button
                        type="button"
                        disabled={
                          !eligible ||
                          couponLoading
                        }
                        onClick={() =>
                          handleSuggestion(
                            item.code
                          )
                        }
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                          eligible
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {eligible ? (
                          <>
                            APPLY
                            <ChevronRight
                              size={13}
                            />
                          </>
                        ) : (
                          <>
                            <Lock
                              size={11}
                            />
                            LOCKED
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )
        )}
      </div>

      {/* FOOTER */}

      {visibleCoupons.length > 0 && (
        <p className="text-[10px] text-gray-400 text-center mt-4">
          🔒 Coupons are securely validated
          for your account
        </p>
      )}
    </div>
  );
}