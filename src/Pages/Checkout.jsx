import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
export default function Checkout() {
  const { cart, total, finalTotal, discount, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const finalAmount = finalTotal + deliveryFee;

  const SERVICEABLE_PINCODES = [
    "284001",
    "284002",
    "284003",
    "284127",
    "284128",
    "284419",
  ];

  const DELIVERY_FEES = {
    284001: 30,
    284002: 40,
    284003: 50,
    284127: 60,
    284128: 70,
    284419: 80,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);

  // 🔥 Auto City Detection
  const [city, setCity] = useState("");
  const [checkingPin, setCheckingPin] = useState(false);
  const [pinError, setPinError] = useState("");

  const pincode = watch("pincode");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  useEffect(() => {
    if (pincode?.length === 6) {
      fetchCity(pincode);
    }
  }, [pincode]);

  useEffect(() => {
    if (pincode?.length === 6) {
      if (total >= 200) {
        setDeliveryFee(0);
      } else {
        setDeliveryFee(DELIVERY_FEES[pincode] || 100);
      }
    }
  }, [pincode, total]);

  const fetchCity = async (pin) => {
    try {
      setCheckingPin(true);
      setPinError("");

      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`,
      );

      if (res.data[0].Status === "Success") {
        const postOffice = res.data[0].PostOffice[0];
        setCity(postOffice.District);
      } else {
        setCity("");
        setPinError("Invalid Pincode ❌");
      }
    } catch (err) {
      setCity("");
      setPinError("Error fetching location");
    } finally {
      setCheckingPin(false);
    }
  };

  const onSubmit = async (data) => {
    const { fullAddress, pincode, date, time } = data;

    if (!city) {
      alert("Enter valid pincode first");
      return;
    }

    if (!SERVICEABLE_PINCODES.includes(pincode)) {
      alert("🚫 We don’t serve this area yet");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        vendorId: "6962ad3e962db6a05ddb10dd",
        customerName: user.name,
        customerPhone: user.phone,
        pickup: { date, time },

        address: {
          fullAddress,
          city,
          pincode,
        },

        items: cart.map((item) => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          service: item.service,
        })),

        total: finalAmount,
        discount,
        deliveryFee,

        payment: {
          status: "pending",
          method: "COD",
          amount: finalAmount,
        },
      };

      // await axios.post("http://localhost:5000/api/orders/create", orderData);
      // const orders = Number(localStorage.getItem("orders")) || 0;
      // localStorage.setItem("orders", orders + 1);
      // clearCart();
      // navigate("/success");
      navigate("/payment", { state: { orderData } });
    } catch (error) {
      console.error(error);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-24 bg-[#fafafa]">
      <div className="max-w-md mx-auto px-4 pt-4 pb-32 space-y-5">
        {/* 🧾 Order Summary */}
        <motion.div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="font-semibold mb-3">Order Summary</h2>

          {cart.map((item) => (
            <div
              key={item.name + item.service}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} ({item.service}) × {item.qty}
              </span>
              <span>₹{item.qty * item.price}</span>
            </div>
          ))}

          <div className="mt-3 pt-3 border-t space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>₹{total}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}

            {pincode?.length === 6 && (
              <div className="flex justify-between">
                <span>Pickup & Delivery</span>
                <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
            )}

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹{finalAmount}</span>
            </div>
          </div>
        </motion.div>

        {/* 📍 Address */}
        <motion.div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <h2 className="font-semibold">Pickup Address</h2>

          <input
            {...register("fullAddress", {
              required: "Address is required",
            })}
            placeholder="Full Address"
            className="w-full border p-3 rounded-xl"
          />
          <p className="text-red-500 text-xs">{errors.fullAddress?.message}</p>

          {/* 🔥 Pincode */}
          <input
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Enter valid 6-digit pincode",
              },
            })}
            placeholder="Pincode"
            className="w-full border p-3 rounded-xl"
          />

          <p className="text-red-500 text-xs">
            {errors.pincode?.message || pinError}
          </p>

          {checkingPin && (
            <p className="text-xs text-gray-500">Checking location...</p>
          )}

          {city && (
            <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
              📍 {city}
            </span>
          )}
        </motion.div>

        {/* 📅 Pickup */}
        <motion.div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <h2 className="font-semibold">Pickup Schedule</h2>

          <input
            type="date"
            {...register("date", { required: "Select date" })}
            className="w-full border p-3 rounded-xl"
          />
          <p className="text-red-500 text-xs">{errors.date?.message}</p>

          <select
            {...register("time", { required: "Select time" })}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Time</option>
            <option>9 AM - 12 PM</option>
            <option>12 PM - 3 PM</option>
            <option>3 PM - 6 PM</option>
          </select>
          <p className="text-red-500 text-xs">{errors.time?.message}</p>
        </motion.div>
      </div>

      {/* 💳 Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-bold text-lg">₹{finalAmount}</p>
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
