import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import API from "../config/api";

export const CartContext = createContext();

// =========================================================
// DELIVERY FEES
// =========================================================

const DELIVERY_FEES = {
  "284001": 30,
  "284002": 40,
  "284003": 50,
  "284127": 60,
  "284128": 70,
  "284419": 80,
};

// =========================================================
// DELIVERY FEE HELPER
// =========================================================

const getDeliveryFee = (pincode, total) => {
  if (total >= 200) {
    return 0;
  }

  return DELIVERY_FEES[pincode] || 100;
};

// =========================================================
// CART PROVIDER
// =========================================================

export const CartProvider = ({ children }) => {
  // =========================================================
  // CART
  // =========================================================

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("CART LOAD ERROR:", error);
      return [];
    }
  });

  // =========================================================
  // COUPON
  // =========================================================

  const [coupon, setCoupon] = useState(() => {
    return localStorage.getItem("coupon") || null;
  });

  const [discount, setDiscount] = useState(() => {
    return Number(localStorage.getItem("discount")) || 0;
  });

  // =========================================================
  // AVAILABLE COUPONS
  // =========================================================

  const [availableCoupons, setAvailableCoupons] = useState([]);

  const [couponLoading, setCouponLoading] = useState(false);

  const [couponMessage, setCouponMessage] = useState("");

  // =========================================================
  // REVALIDATION CONTROL
  // =========================================================

  /*
   * Prevent stale API responses from overwriting
   * the latest cart/coupon state.
   */
  const couponValidationRequest = useRef(0);

  // =========================================================
  // CART STORAGE
  // =========================================================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================================================
  // COUPON STORAGE
  // =========================================================

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("coupon", coupon);
    } else {
      localStorage.removeItem("coupon");
    }

    localStorage.setItem("discount", String(discount));
  }, [coupon, discount]);

  // =========================================================
  // ITEM IDENTITY
  // =========================================================

  /*
   * Premium and Regular must be treated as
   * different cart items.
   */

  const isSameItem = (a, b) => {
    return (
      a.name === b.name &&
      a.service === b.service &&
      (a.careLevel || "regular") ===
        (b.careLevel || "regular")
    );
  };

  // =========================================================
  // ADD ITEM
  // =========================================================

  const addItem = (item) => {
    const normalizedItem = {
      ...item,

      careLevel:
        item.service === "Dry Clean"
          ? item.careLevel === "premium"
            ? "premium"
            : "regular"
          : "regular",
    };

    setCart((prev) => {
      const exists = prev.find((i) =>
        isSameItem(i, normalizedItem)
      );

      if (exists) {
        return prev.map((i) =>
          isSameItem(i, normalizedItem)
            ? {
                ...i,
                qty: Number(i.qty || 0) + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...normalizedItem,
          qty: 1,
        },
      ];
    });
  };

  // =========================================================
  // INCREASE QUANTITY
  // =========================================================

  const increaseQty = (item) => {
    const normalizedItem = {
      ...item,

      careLevel:
        item.service === "Dry Clean"
          ? item.careLevel === "premium"
            ? "premium"
            : "regular"
          : "regular",
    };

    setCart((prev) =>
      prev.map((i) =>
        isSameItem(i, normalizedItem)
          ? {
              ...i,
              qty: Number(i.qty || 0) + 1,
            }
          : i
      )
    );
  };

  // =========================================================
  // DECREASE QUANTITY
  // =========================================================

  const decreaseQty = (item) => {
    const normalizedItem = {
      ...item,

      careLevel:
        item.service === "Dry Clean"
          ? item.careLevel === "premium"
            ? "premium"
            : "regular"
          : "regular",
    };

    setCart((prev) =>
      prev
        .map((i) =>
          isSameItem(i, normalizedItem)
            ? {
                ...i,
                qty: Number(i.qty || 0) - 1,
              }
            : i
        )
        .filter((i) => Number(i.qty || 0) > 0)
    );
  };

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  const removeItem = (itemOrName) => {
    // Old usage:
    // removeItem("Blazer")

    if (typeof itemOrName === "string") {
      setCart((prev) =>
        prev.filter((i) => i.name !== itemOrName)
      );

      return;
    }

    // New variant-aware usage
    const normalizedItem = {
      ...itemOrName,

      careLevel:
        itemOrName.service === "Dry Clean"
          ? itemOrName.careLevel === "premium"
            ? "premium"
            : "regular"
          : "regular",
    };

    setCart((prev) =>
      prev.filter(
        (i) => !isSameItem(i, normalizedItem)
      )
    );
  };

  // =========================================================
  // CART TOTAL
  // =========================================================

  const total = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.qty || 0) *
        Number(item.price || 0),
    0
  );

  // =========================================================
  // HANDLING CHARGE
  // =========================================================

  const handlingCharge = total > 0 ? 15 : 0;

  // =========================================================
  // CART ITEMS FOR COUPON API
  // =========================================================

const getCouponItems = useCallback(() => {
  return cart.map((item) => ({
    name: item.name,
    service: item.service,
    qty: item.qty,
    price: item.price,
  }));
}, [cart]);

  // =========================================================
  // FETCH AVAILABLE COUPONS
  // =========================================================

const fetchAvailableCoupons = useCallback(async () => {
  try {
    // Don't check coupons for an empty cart
    if (!cart.length || Number(total) <= 0) {
      setAvailableCoupons([]);
      return;
    }

    setCouponLoading(true);

    const items = getCouponItems();

    console.log("🎟️ FETCHING COUPONS:", {
      total: Number(total),
      items,
    });

    const response = await API.get("/coupons/available", {
      params: {
        total: Number(total),
        items: JSON.stringify(items),
      },
    });

    console.log(
      "🎟️ AVAILABLE COUPONS RESPONSE:",
      response.data
    );

    setAvailableCoupons(
      Array.isArray(response.data?.coupons)
        ? response.data.coupons
        : []
    );

  } catch (error) {
    console.error(
      "❌ FETCH COUPONS ERROR:",
      error.response?.data || error.message
    );

    setAvailableCoupons([]);
  } finally {
    setCouponLoading(false);
  }
}, [cart, total, getCouponItems]);

  // =========================================================
  // REVALIDATE APPLIED COUPON
  // =========================================================

  const revalidateAppliedCoupon = useCallback(
    async () => {
      /*
       * No coupon currently applied.
       */
      if (!coupon) {
        return;
      }

      /*
       * If cart becomes empty,
       * coupon must immediately disappear.
       */
      if (cart.length === 0 || total <= 0) {
        console.log(
          "🧹 CART EMPTY → REMOVING COUPON"
        );

        setCoupon(null);
        setDiscount(0);
        setCouponMessage(
          "Coupon removed because your cart is empty."
        );

        localStorage.removeItem("coupon");
        localStorage.removeItem("discount");

        return;
      }

      const requestId =
        ++couponValidationRequest.current;

      const currentCoupon = coupon;
      const currentTotal = Number(total || 0);
      const currentItems = getCouponItems();

      try {
        console.log(
          "🔄 REVALIDATING APPLIED COUPON:",
          currentCoupon
        );

        const response = await API.post(
          "/coupons/validate",
          {
            code: currentCoupon,
            total: currentTotal,
            items: currentItems,
          }
        );

        /*
         * Ignore old API response if another
         * cart change happened meanwhile.
         */
        if (
          requestId !==
          couponValidationRequest.current
        ) {
          console.log(
            "⏭️ IGNORING STALE COUPON RESPONSE"
          );

          return;
        }

        if (response.data?.success) {
          const validatedCoupon =
            response.data.coupon;

          const newDiscount = Number(
            validatedCoupon?.discount || 0
          );

          /*
           * Coupon still valid.
           * Update discount according to
           * current cart total.
           */
          setDiscount(newDiscount);

          /*
           * Keep backend-normalized coupon code.
           */
          setCoupon(
            validatedCoupon?.code ||
              currentCoupon
          );

          setCouponMessage(
            `₹${newDiscount} discount applied`
          );

          console.log(
            "✅ COUPON STILL VALID:",
            currentCoupon,
            "Discount:",
            newDiscount
          );

          return;
        }

        /*
         * If backend returns success:false,
         * remove coupon.
         */
        console.log(
          "❌ COUPON NO LONGER VALID"
        );

        setCoupon(null);
        setDiscount(0);

        const message =
          response.data?.message ||
          "Coupon is no longer applicable";

        setCouponMessage(
          `${currentCoupon} removed: ${message}`
        );

        localStorage.removeItem("coupon");
        localStorage.removeItem("discount");
      } catch (error) {
        /*
         * IMPORTANT:
         *
         * 400 from /validate means coupon is no longer
         * eligible. This is NOT a server crash.
         *
         * Example:
         * Minimum order ₹500 required
         */

        if (
          requestId !==
          couponValidationRequest.current
        ) {
          return;
        }

        const status =
          error.response?.status;

        const message =
          error.response?.data?.message ||
          "Coupon is no longer applicable";

        console.log(
          "🎟️ COUPON REVALIDATION RESULT:",
          status,
          message
        );

        /*
         * 400 = coupon eligibility failed.
         *
         * 404 = coupon no longer exists.
         *
         * Both mean the currently applied coupon
         * should not remain applied.
         */
        if (
          status === 400 ||
          status === 404
        ) {
          setCoupon(null);
          setDiscount(0);

          setCouponMessage(
            `${currentCoupon} removed: ${message}`
          );

          localStorage.removeItem("coupon");
          localStorage.removeItem("discount");

          console.log(
            "🧹 INVALID COUPON REMOVED:",
            currentCoupon
          );

          return;
        }

        /*
         * For network/server errors, DO NOT silently
         * remove the coupon.
         *
         * This prevents a temporary API outage from
         * unexpectedly removing a valid coupon.
         */
        console.error(
          "❌ COUPON REVALIDATION ERROR:",
          error.response?.data ||
            error.message ||
            error
        );
      }
    },
    [
      coupon,
      cart,
      total,
      getCouponItems,
    ]
  );

  // =========================================================
  // FETCH COUPONS WHEN CART TOTAL CHANGES
  // =========================================================

useEffect(() => {
  if (!cart.length || Number(total) <= 0) {
    setAvailableCoupons([]);
    return;
  }

  fetchAvailableCoupons();
}, [cart, total, fetchAvailableCoupons]);

  // =========================================================
  // AUTO REVALIDATE APPLIED COUPON
  // =========================================================

  /*
   * Whenever cart contents or total changes:
   *
   * ₹600 → ₹500
   * ₹500 → ₹400
   * ₹400 → ₹700
   *
   * the currently applied coupon is checked again.
   */
  useEffect(() => {
    if (!coupon) {
      return;
    }

    const timer = setTimeout(() => {
      revalidateAppliedCoupon();
    }, 250);

    return () => clearTimeout(timer);
  }, [
    cart,
    total,
    coupon,
    revalidateAppliedCoupon,
  ]);

  // =========================================================
  // APPLY COUPON
  // =========================================================

  const applyCoupon = async (code) => {
    const formattedCode =
      code?.trim().toUpperCase();

    if (!formattedCode) {
      return {
        success: false,
        message: "Please enter a coupon code",
      };
    }

    if (coupon) {
      return {
        success: false,
        message: "Coupon already applied!",
      };
    }

    try {
      setCouponLoading(true);
      setCouponMessage("");

      const response = await API.post(
        "/coupons/validate",
        {
          code: formattedCode,

          total: Number(total || 0),

          items: cart.map((item) => ({
            name: item.name,
            qty: Number(item.qty || 0),
            price: Number(item.price || 0),
            service:
              item.service || "Wash & Fold",
            careLevel:
              item.careLevel || "regular",
          })),
        }
      );

      console.log(
        "🎟️ VALIDATE RESPONSE:",
        response.data
      );

      if (!response.data?.success) {
        const message =
          response.data?.message ||
          "Coupon is not valid";

        setCouponMessage(message);

        return {
          success: false,
          message,
        };
      }

      const validatedCoupon =
        response.data.coupon;

      const discountAmount = Number(
        validatedCoupon?.discount || 0
      );

      /*
       * Save validated coupon.
       */
      setCoupon(
        validatedCoupon.code ||
          formattedCode
      );

      setDiscount(discountAmount);

      setCouponMessage(
        response.data.message ||
          `₹${discountAmount} discount applied`
      );

      /*
       * Refresh available coupons.
       */
      await fetchAvailableCoupons();

      return {
        success: true,
        discount: discountAmount,
        message:
          response.data.message ||
          "Coupon applied successfully!",
        coupon: validatedCoupon,
      };
    } catch (error) {
      console.error(
        "❌ APPLY COUPON ERROR:",
        error.response?.data ||
          error.message ||
          error
      );

      const message =
        error.response?.data?.message ||
        "Unable to apply coupon";

      setCouponMessage(message);

      return {
        success: false,
        message,
      };
    } finally {
      setCouponLoading(false);
    }
  };

  // =========================================================
  // REMOVE COUPON
  // =========================================================

  const removeCoupon = useCallback(() => {
    /*
     * Invalidate any previous validation request.
     */
    couponValidationRequest.current += 1;

    setCoupon(null);
    setDiscount(0);
    setCouponMessage("");

    localStorage.removeItem("coupon");
    localStorage.removeItem("discount");

    /*
     * Refresh coupon eligibility immediately.
     */
    fetchAvailableCoupons();
  }, [fetchAvailableCoupons]);

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clearCart = () => {
    /*
     * Invalidate pending coupon requests.
     */
    couponValidationRequest.current += 1;

    setCart([]);

    setCoupon(null);
    setDiscount(0);
    setCouponMessage("");

    setAvailableCoupons([]);

    localStorage.removeItem("cart");
    localStorage.removeItem("coupon");
    localStorage.removeItem("discount");
  };

  // =========================================================
  // REORDER
  // =========================================================

  const reorderItems = (items = []) => {
    const reorderedItems = items
      .map((item) => ({
        name:
          item.name ||
          item.itemName ||
          item.title ||
          "Laundry Item",

        service:
          item.service ||
          item.serviceType ||
          item.serviceName ||
          "Wash & Fold",

        price: Number(item.price || 0),

        qty: Number(
          item.qty ||
            item.quantity ||
            1
        ),

        /*
         * Preserve Premium from previous order.
         */
        careLevel:
          item.careLevel === "premium"
            ? "premium"
            : "regular",
      }))
      .filter(
        (item) =>
          item.name &&
          item.service &&
          item.price > 0 &&
          item.qty > 0
      );

    /*
     * Invalidate old coupon validation.
     */
    couponValidationRequest.current += 1;

    setCart(reorderedItems);

    /*
     * Never carry old coupon.
     */
    setCoupon(null);

    setDiscount(0);

    setCouponMessage("");

    setAvailableCoupons([]);

    localStorage.removeItem("coupon");
    localStorage.removeItem("discount");

    return reorderedItems;
  };

  // =========================================================
  // FINAL TOTAL
  // =========================================================

  const finalTotal = Math.max(
    total +
      handlingCharge -
      discount,
    0
  );

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <CartContext.Provider
      value={{
        // ---------------------------------------------------
        // CART
        // ---------------------------------------------------

        cart,

        addItem,

        removeItem,

        increaseQty,

        decreaseQty,

        clearCart,

        reorderItems,

        // ---------------------------------------------------
        // AMOUNTS
        // ---------------------------------------------------

        total,

        handlingCharge,

        discount,

        finalTotal,

        // ---------------------------------------------------
        // COUPON
        // ---------------------------------------------------

        coupon,

        applyCoupon,

        removeCoupon,

        // ---------------------------------------------------
        // AVAILABLE COUPONS
        // ---------------------------------------------------

        availableCoupons,

        couponLoading,

        couponMessage,

        fetchAvailableCoupons,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};