import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
const COUPONS = {
  SAVE10: 10,
  SAVE50: 50,
  ZUSKO100: 100,
  WELCOME50: 50,
  LOYAL20: 20,
  COME10: 10,
};

const DELIVERY_FEES = {
  "284001": 30,
  "284002": 40,
  "284003": 50,
  "284127": 60,
  "284128": 70,
  "284419": 80,
};

const getDeliveryFee = (pincode, total) => {
  if (total >= 200) return 0;

  return DELIVERY_FEES[pincode] || 100; // default fee
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});
  const [coupon, setCoupon] = useState(() => {
    return localStorage.getItem("coupon") || null;
  });

  const [discount, setDiscount] = useState(() => {
    return Number(localStorage.getItem("discount")) || 0;
  });
    useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
    useEffect(() => {
    localStorage.setItem("coupon", coupon || "");
    localStorage.setItem("discount", discount);
  }, [coupon, discount]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const increaseQty = (item) => {
  setCart((prev) =>
    prev.map((i) =>
      i.name === item.name &&
      i.service === item.service
        ? { ...i, qty: i.qty + 1 }
        : i
    )
  );
};

const decreaseQty = (item) => {
  setCart((prev) =>
    prev
      .map((i) =>
        i.name === item.name &&
        i.service === item.service
          ? { ...i, qty: i.qty - 1 }
          : i
      )
      .filter((i) => i.qty > 0)
  );
};

const clearCart = () => {
  setCart([]);
  setCoupon(null);
  setDiscount(0);
};

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
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    }

    return [...prev, { ...item, qty: 1 }];
  });
};

  const removeItem = (name) => {
    setCart((prev) => prev.filter((i) => i.name !== name));
  };

  const total = cart.reduce((acc, i) => acc + i.qty * i.price, 0);

    // 🎟️ APPLY COUPON
  const applyCoupon = (code) => {
    const formatted = code.toUpperCase();

    if (coupon) {
      return { success: false, message: "Coupon already applied!" };
    }

    if (!COUPONS[formatted]) {
      return { success: false, message: "Invalid coupon!" };
    }

    if (total < 100) {
      return { success: false, message: "Minimum order ₹100 required" };
    }

    setCoupon(formatted);
    setDiscount(COUPONS[formatted]);

    return { success: true, message: "Coupon applied successfully!" };
  };

    // ❌ REMOVE COUPON
  const removeCoupon = () => {
    setCoupon(null);
    setDiscount(0);
  };

  const finalTotal = Math.max(total - discount, 0);

  return (
    <CartContext.Provider
  value={{ cart, addItem,  clearCart, removeItem, increaseQty, decreaseQty, total, finalTotal,
        discount,
        coupon,
        applyCoupon,
        removeCoupon }}
>
      {children}
    </CartContext.Provider>
  );
};