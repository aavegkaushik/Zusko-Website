import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Tag, Lock, Check, ChevronRight, Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function CouponSection({ showAllCoupons, setShowAllCoupons }) {
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
  // DISCOUNT CALCULATION
  // =========================================================

  const getDiscountAmount = (item) => {
    const cartTotal = Number(total || 0);
    const discountValue = Number(item.discountValue || 0);

    if (item.discountType === "percentage") {
      let calculatedDiscount = (cartTotal * discountValue) / 100;

      if (
        item.maxDiscount !== undefined &&
        item.maxDiscount !== null &&
        Number(item.maxDiscount) > 0
      ) {
        calculatedDiscount = Math.min(
          calculatedDiscount,
          Number(item.maxDiscount),
        );
      }

      return Math.min(calculatedDiscount, cartTotal);
    }

    return Math.min(discountValue, cartTotal);
  };

  // =========================================================
  // COUPON FILTER + SORT
  // =========================================================

  const visibleCoupons = availableCoupons
    .filter((item) => {
      /*
       * First-order / new-user coupons
       * should ONLY appear when eligible.
       */
      if (item.firstOrderOnly || item.newUsersOnly) {
        return item.eligible === true;
      }

      /*
       * Normal coupons:
       * show both available and locked.
       */
      return true;
    })
    .map((item) => ({
      ...item,
      calculatedDiscount: getDiscountAmount(item),
    }))
    .sort((a, b) => {
      const aEligible = a.eligible === true;

      const bEligible = b.eligible === true;

      // Eligible first
      if (aEligible !== bEligible) {
        return aEligible ? -1 : 1;
      }

      // Highest discount first
      return b.calculatedDiscount - a.calculatedDiscount;
    });

  /*
   * Only the best coupon is displayed
   * outside the popup.
   */
  const featuredCoupon = visibleCoupons[0] || null;

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
  // APPLY COUPON
  // =========================================================

  const handleApply = async (couponCode = code, closePopup = false) => {
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

        /*
         * Close popup only after
         * successful application.
         */
        if (closePopup) {
          setShowAllCoupons(false);
        }
      } else {
        setShake(true);

        setTimeout(() => {
          setShake(false);
        }, 400);
      }
    } catch (error) {
      console.error("COUPON APPLY ERROR:", error);

      setMsg("Unable to apply coupon");

      setIsError(true);

      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);
    }
  };

  // =========================================================
  // SUGGESTION
  // =========================================================

  const handleSuggestion = (couponCode) => {
    setCode(couponCode);
    setMsg("");
    setIsError(false);

    handleApply(couponCode, true);
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
    } catch (error) {
      console.error("COUPON REMOVE ERROR:", error);

      setMsg("Unable to remove coupon");

      setIsError(true);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (couponLoading && availableCoupons.length === 0) {
    return (
      <div className="bg-white p-4 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "#FFF9E6",
            }}
          >
            <Tag size={17} color="#D97706" />
          </div>

          <div>
            <p className="font-bold text-gray-900 text-sm">Available Offers</p>

            <p className="text-[11px] text-gray-400">
              Finding the best coupons for you...
            </p>
          </div>
        </div>

        <div className="animate-pulse rounded-2xl p-4 bg-gray-50">
          <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-48" />
        </div>
      </div>
    );
  }

  // =========================================================
  // COUPON APPLIED
  // =========================================================

  if (coupon) {
    return (
      <div className="bg-white p-4 rounded-2xl">
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
            background: "linear-gradient(135deg,#ECFDF5,#F0FDF4)",
            border: "1px solid #BBF7D0",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "#DCFCE7",
                }}
              >
                <Check size={19} color="#16A34A" strokeWidth={3} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] text-green-600 font-semibold uppercase tracking-wide">
                  Coupon Applied
                </p>

                <p className="text-sm font-black text-gray-900 truncate">
                  {coupon}
                </p>

                <p className="text-xs text-green-600 mt-0.5">
                  You're saving ₹{discount}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove coupon"
              className="
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
  // NORMAL COUPON SECTION
  // =========================================================

  return (
    <>
      <div className="bg-white p-4 rounded-2xl">
        {/* ===================================================
            MANUAL COUPON INPUT
        =================================================== */}

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
                setCode(e.target.value.toUpperCase());

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
              disabled={!code.trim() || couponLoading}
              className="px-5 rounded-xl font-bold text-sm transition disabled:opacity-40"
              style={{
                background: "#101010",
                color: "#FFD700",
              }}
            >
              {couponLoading ? "..." : "Apply"}
            </button>
          </div>
        </motion.div>

        {/* MESSAGE */}

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
                isError ? "text-red-500" : "text-green-600"
              } font-medium`}
            >
              {isError ? "⚠️ " : "✓ "}
              {msg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ===================================================
            FEATURED COUPON
        =================================================== */}

        {featuredCoupon ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative overflow-hidden rounded-2xl p-3.5 mt-4"
            style={{
              background: featuredCoupon.eligible ? "#FFFEF5" : "#F8F9FB",
              border: featuredCoupon.eligible
                ? "1px solid #FDE68A"
                : "1px solid #E5E7EB",
            }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{
                background: featuredCoupon.eligible ? "#FFD700" : "#D1D5DB",
              }}
            />

            <div className="flex items-center justify-between gap-3 pl-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-black text-sm tracking-wide ${
                      featuredCoupon.eligible
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {featuredCoupon.code}
                  </span>

                  {featuredCoupon.eligible && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                      BEST OFFER
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                  {featuredCoupon.description}
                </p>

                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`text-xs font-bold ${
                      featuredCoupon.eligible
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {featuredCoupon.discountType === "percentage"
                      ? `${featuredCoupon.discountValue}% OFF`
                      : `₹${featuredCoupon.discountValue} OFF`}
                  </span>

                  {featuredCoupon.minOrderValue > 0 && (
                    <span className="text-[10px] text-gray-400">
                      • Min ₹{featuredCoupon.minOrderValue}
                    </span>
                  )}
                </div>

                {!featuredCoupon.eligible && featuredCoupon.message && (
                  <p className="text-[10px] text-gray-500 mt-1">
                    {featuredCoupon.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                disabled={!featuredCoupon.eligible || couponLoading}
                onClick={() => handleSuggestion(featuredCoupon.code)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                  featuredCoupon.eligible
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {featuredCoupon.eligible ? (
                  <>
                    APPLY
                    <ChevronRight size={13} />
                  </>
                ) : (
                  <>
                    <Lock size={11} />
                    LOCKED
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-4 text-xs text-gray-400">
            No offers available
          </div>
        )}

        {/* ===================================================
            VIEW ALL OFFERS
        =================================================== */}

        {visibleCoupons.length > 1 && (
          <button
            type="button"
            onClick={() => setShowAllCoupons(true)}
            className="
              w-full
              mt-3
              py-2.5
              rounded-xl
              border border-gray-200
              text-xs
              font-bold
              text-gray-700
              hover:bg-gray-50
              transition
              flex items-center justify-center gap-1.5
            "
          >
            View all offers
            <ChevronRight size={14} />
          </button>
        )}

        {visibleCoupons.length > 0 && (
          <p className="text-[10px] text-gray-400 text-center mt-3">
            🔒 Coupons are securely validated for your account
          </p>
        )}
      </div>

      {/* =====================================================
          ALL COUPONS MODAL
      ===================================================== */}

      <AnimatePresence>
        {showAllCoupons && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
  fixed
  inset-0
  z-9999
  flex
  items-center
  justify-center
  p-4
  min-h-screen
"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setShowAllCoupons(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="
  relative
  bg-white
  w-full
  max-w-lg
  max-h-[85vh]
  rounded-3xl
  overflow-hidden
  shadow-2xl
  flex
  flex-col
  mx-auto
"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}

              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "#FFF9E6",
                    }}
                  >
                    <Tag size={18} color="#D97706" />
                  </div>

                  <div>
                    <h3 className="font-black text-gray-900">
                      Available Offers
                    </h3>

                    <p className="text-[11px] text-gray-400">
                      Offers picked for your account
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllCoupons(false)}
                  className="
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-gray-100
                    hover:bg-gray-200
                    transition
                  "
                  aria-label="Close offers"
                >
                  <X size={18} />
                </button>
              </div>

              {/* MODAL CONTENT */}

              <div className="overflow-y-auto p-4 space-y-3">
                {visibleCoupons.map((item, index) => {
                  const eligible = item.eligible === true;

                  const amountToUnlock = Math.max(
                    Number(item.minOrderValue || 0) - Number(total || 0),
                    0,
                  );

                  return (
                    <motion.div
                      key={item.id || item.code}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.03,
                      }}
                      className={`relative overflow-hidden rounded-2xl p-4 ${
                        eligible ? "bg-white" : "bg-gray-50"
                      }`}
                      style={{
                        border: eligible
                          ? "1px solid #FDE68A"
                          : "1px solid #E5E7EB",
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{
                          background: eligible ? "#FFD700" : "#D1D5DB",
                        }}
                      />

                      <div className="flex items-center justify-between gap-3 pl-2">
                        {/* INFO */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`font-black text-sm tracking-wide ${
                                eligible ? "text-gray-900" : "text-gray-400"
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
                              eligible ? "text-gray-600" : "text-gray-400"
                            }`}
                          >
                            {item.description}
                          </p>

                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span
                              className={`text-xs font-bold ${
                                eligible ? "text-green-600" : "text-gray-400"
                              }`}
                            >
                              {item.discountType === "percentage"
                                ? `${item.discountValue}% OFF`
                                : `₹${item.discountValue} OFF`}
                            </span>

                            {item.minOrderValue > 0 && (
                              <span className="text-[10px] text-gray-400">
                                • Min ₹{item.minOrderValue}
                              </span>
                            )}
                          </div>

                          {!eligible && (
                            <div className="flex items-center gap-1.5 mt-2">
                              <Lock
                                size={11}
                                className="text-gray-400 shrink-0"
                              />

                              <span className="text-[10px] text-gray-500">
                                {amountToUnlock > 0
                                  ? `Add ₹${amountToUnlock} more to unlock`
                                  : item.message || "Not available"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* APPLY */}

                        <button
                          type="button"
                          disabled={!eligible || couponLoading}
                          onClick={() => handleSuggestion(item.code)}
                          className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                            eligible
                              ? "bg-black text-white hover:bg-gray-800"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {eligible ? (
                            <>
                              APPLY
                              <ChevronRight size={13} />
                            </>
                          ) : (
                            <>
                              <Lock size={11} />
                              LOCKED
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* MODAL FOOTER */}

              <div className="px-5 py-3 border-t border-gray-100 shrink-0">
                <p className="text-[10px] text-gray-400 text-center">
                  🔒 Coupons are securely validated for your account
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
