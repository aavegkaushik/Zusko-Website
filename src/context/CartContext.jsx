import {
  createContext,
  useState,
  useEffect,
  useCallback,
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

      return saved
        ? JSON.parse(saved)
        : [];
    } catch (error) {
      console.error(
        "CART LOAD ERROR:",
        error
      );

      return [];
    }
  });

  // =========================================================
  // COUPON
  // =========================================================

  const [coupon, setCoupon] = useState(() => {
    return (
      localStorage.getItem("coupon") ||
      null
    );
  });

  const [discount, setDiscount] = useState(() => {
    return (
      Number(
        localStorage.getItem("discount")
      ) || 0
    );
  });

  // =========================================================
  // AVAILABLE COUPONS
  // =========================================================

  const [availableCoupons, setAvailableCoupons] =
    useState([]);

  const [couponLoading, setCouponLoading] =
    useState(false);

  const [couponMessage, setCouponMessage] =
    useState("");

  // =========================================================
  // CART STORAGE
  // =========================================================

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================================================
  // COUPON STORAGE
  // =========================================================

  useEffect(() => {
    if (coupon) {
      localStorage.setItem(
        "coupon",
        coupon
      );
    } else {
      localStorage.removeItem(
        "coupon"
      );
    }

    localStorage.setItem(
      "discount",
      String(discount)
    );
  }, [coupon, discount]);

  // =========================================================
  // ADD ITEM
  // =========================================================

  const addItem = (item) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) =>
          i.name === item.name &&
          i.service === item.service
      );

      if (exists) {
        return prev.map((i) =>
          i.name === item.name &&
          i.service === item.service
            ? {
                ...i,
                qty: i.qty + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          qty: 1,
        },
      ];
    });
  };

  // =========================================================
  // INCREASE QUANTITY
  // =========================================================

  const increaseQty = (item) => {
    setCart((prev) =>
      prev.map((i) =>
        i.name === item.name &&
        i.service === item.service
          ? {
              ...i,
              qty: i.qty + 1,
            }
          : i
      )
    );
  };

  // =========================================================
  // DECREASE QUANTITY
  // =========================================================

  const decreaseQty = (item) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === item.name &&
          i.service === item.service
            ? {
                ...i,
                qty: i.qty - 1,
              }
            : i
        )
        .filter(
          (i) => i.qty > 0
        )
    );
  };

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  const removeItem = (name) => {
    setCart((prev) =>
      prev.filter(
        (i) => i.name !== name
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

  const handlingCharge =
    total > 0 ? 15 : 0;

  // =========================================================
  // FETCH AVAILABLE COUPONS
  // =========================================================

  const fetchAvailableCoupons =
    useCallback(async () => {
      try {
        setCouponLoading(true);

        console.log(
          "🎟️ FETCHING COUPONS"
        );

        console.log(
          "Cart Total:",
          total
        );

        const response =
          await API.get(
            "/coupons/available",
            {
              params: {
                total: Number(
                  total || 0
                ),
              },
            }
          );

        console.log(
          "🎟️ COUPON API RESPONSE:",
          response.data
        );

        if (
          response.data?.success
        ) {
          const coupons =
            response.data
              .coupons || [];

          console.log(
            "🎟️ AVAILABLE COUPONS:",
            coupons
          );

          setAvailableCoupons(
            coupons
          );
        } else {
          setAvailableCoupons(
            []
          );
        }
      } catch (error) {
        console.error(
          "❌ FETCH COUPONS ERROR:",
          error.response?.data ||
            error.message ||
            error
        );

        setAvailableCoupons(
          []
        );
      } finally {
        setCouponLoading(false);
      }
    }, [total]);

  // =========================================================
  // FETCH COUPONS WHEN CART TOTAL CHANGES
  // =========================================================

  useEffect(() => {
    fetchAvailableCoupons();
  }, [fetchAvailableCoupons]);

  // =========================================================
  // APPLY COUPON
  // =========================================================

  const applyCoupon = async (
    code
  ) => {
    const formattedCode =
      code
        ?.trim()
        .toUpperCase();

    // -------------------------------------------------------
    // EMPTY CODE
    // -------------------------------------------------------

    if (!formattedCode) {
      return {
        success: false,
        message:
          "Please enter a coupon code",
      };
    }

    // -------------------------------------------------------
    // EXISTING COUPON
    // -------------------------------------------------------

    if (coupon) {
      return {
        success: false,
        message:
          "Coupon already applied!",
      };
    }

    try {
      setCouponLoading(true);

      setCouponMessage("");

      console.log(
        "🎟️ APPLYING COUPON:",
        formattedCode
      );

      console.log(
        "Order Total:",
        total
      );

      // -----------------------------------------------------
      // BACKEND VALIDATION
      // -----------------------------------------------------

      const response =
        await API.post(
          "/coupons/validate",
          {
            code: formattedCode,

            total: Number(
              total || 0
            ),

            items: cart.map(
              (item) => ({
                name: item.name,

                qty: Number(
                  item.qty || 0
                ),

                price: Number(
                  item.price || 0
                ),

                service:
                  item.service ||
                  "Wash & Fold",
              })
            ),
          }
        );

      console.log(
        "🎟️ VALIDATE RESPONSE:",
        response.data
      );

      // -----------------------------------------------------
      // FAILED
      // -----------------------------------------------------

      if (
        !response.data?.success
      ) {
        return {
          success: false,

          message:
            response.data
              ?.message ||
            "Coupon is not valid",
        };
      }

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      const validatedCoupon =
        response.data.coupon;

      const discountAmount =
        Number(
          validatedCoupon
            ?.discount || 0
        );

      // -----------------------------------------------------
      // SAVE COUPON
      // -----------------------------------------------------

      setCoupon(
        validatedCoupon.code
      );

      setDiscount(
        discountAmount
      );

      setCouponMessage(
        `₹${discountAmount} discount applied`
      );

      // -----------------------------------------------------
      // REFRESH COUPONS
      // -----------------------------------------------------

      await fetchAvailableCoupons();

      return {
        success: true,

        message:
          response.data
            ?.message ||
          "Coupon applied successfully!",

        discount:
          discountAmount,

        coupon:
          validatedCoupon,
      };
    } catch (error) {
      console.error(
        "❌ APPLY COUPON ERROR:",
        error.response?.data ||
          error.message ||
          error
      );

      const message =
        error.response?.data
          ?.message ||
        "Unable to apply coupon";

      setCouponMessage(
        message
      );

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

const removeCoupon = () => {
  setCoupon(null);
  setDiscount(0);
  setCouponMessage("");

  localStorage.removeItem("coupon");
  localStorage.removeItem("discount");

  // Coupons ko immediately refresh karo
  fetchAvailableCoupons();
};

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clearCart = () => {
    setCart([]);

    setCoupon(null);

    setDiscount(0);

    setCouponMessage("");

    setAvailableCoupons([]);

    localStorage.removeItem(
      "cart"
    );

    localStorage.removeItem(
      "coupon"
    );

    localStorage.removeItem(
      "discount"
    );
  };

  // =========================================================
  // REORDER
  // =========================================================

  const reorderItems = (
    items = []
  ) => {
    const reorderedItems =
      items
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

          price: Number(
            item.price || 0
          ),

          qty: Number(
            item.qty ||
              item.quantity ||
              1
          ),
        }))
        .filter(
          (item) =>
            item.name &&
            item.service &&
            item.price > 0 &&
            item.qty > 0
        );

    setCart(
      reorderedItems
    );

    // Never carry old coupon
    setCoupon(null);

    setDiscount(0);

    setCouponMessage("");

    setAvailableCoupons(
      []
    );

    localStorage.removeItem(
      "coupon"
    );

    localStorage.removeItem(
      "discount"
    );

    return reorderedItems;
  };

  // =========================================================
  // FINAL TOTAL
  // =========================================================

  const finalTotal =
    Math.max(
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