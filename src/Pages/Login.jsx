import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import API from '../config/api'
export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (user) {
      navigate("/place-order");
    }
  }, [user, navigate]);

useEffect(() => {
  gsap.fromTo(
    ".input",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }
  );
}, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async () => {
    if (!form.phone) return alert("Phone is required");

    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      login(res.data.user, res.data.token);
      navigate("/place-order");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex flex-col md:flex-row">
      
<div className="hidden md:flex w-1/2 relative overflow-hidden bg-linear-to-br from-yellow-50 via-white to-yellow-100 text-black">

  {/* SOFT BACKGROUND BLOBS */}
  <div className="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-30 top-[-50px] left-[-50px]"></div>
  <div className="absolute w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-30 bottom-[-50px] right-[-50px]"></div>

  <div className="relative z-10 flex flex-col justify-between w-full p-10">

    {/* TOP LOGO */}
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-extrabold tracking-wide">
        ZUSKO
      </h1>

      <span className="text-sm bg-yellow-200 px-3 py-1 rounded-full">
        Premium Laundry
      </span>
    </div>

    {/* CENTER CONTENT */}
    <div className="mt-10">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold leading-tight"
      >
        Laundry,
        <br />
        <span className="bg-linear-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
          but effortless.
        </span>
      </motion.h1>

      <p className="mt-6 text-lg text-gray-600 max-w-md">
        Pickup. Clean. Deliver.  
        Experience premium laundry service with zero hassle.
      </p>

      {/* GLASS CARDS */}
      <div className="flex gap-4 mt-8">
        <div className="bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl border border-yellow-100 shadow-sm hover:scale-105 transition">
          ⚡ Same Day Delivery
        </div>
        <div className="bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl border border-yellow-100 shadow-sm hover:scale-105 transition">
          💧 Premium Care
        </div>
      </div>
    </div>

    {/* LAUNDRY BOY IMAGE */}
    {/* <motion.img
      src=""
      alt="Laundry Service"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute bottom-0 right-0 w-[420px] object-contain drop-shadow-xl"
    /> */}

    {/* BOTTOM TEXT */}
    <div className="text-sm text-gray-500">
      Trusted by 1000+ happy customers
    </div>

  </div>
</div>

      {/* RIGHT SIDE - LOGIN */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-linear-to-br from-yellow-50 via-white to-yellow-100 p-4">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}

    className="
      w-full max-w-md 
      bg-white/90 backdrop-blur-xl
      p-8 rounded-3xl 
      border border-yellow-100
      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    "
  >
    
    {/* HEADING */}
    <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight">
      Welcome to <span className="text-yellow-500">ZUSKO</span>
    </h1>

    {/* INPUTS */}
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Name*"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="
          input w-full p-3 rounded-xl 
          bg-gray-50 border border-gray-200
          focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
          outline-none transition
        "
      />

      <input
        type="text"
        placeholder="Phone *"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
        className="
          input w-full p-3 rounded-xl 
          bg-gray-50 border border-gray-200
          focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
          outline-none transition
        "
      />

      <input
        type="email"
        placeholder="Email*"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="
          input w-full p-3 rounded-xl 
          bg-gray-50 border border-gray-200
          focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
          outline-none transition
        "
      />
    </div>

    {/* BUTTON */}
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={handleSubmit}
      disabled={loading}
      className="
        w-full mt-6 
        bg-linear-to-r from-yellow-400 to-yellow-500 
        text-black py-3 rounded-xl 
        font-semibold 
        flex items-center justify-center gap-2
        shadow-lg hover:shadow-xl
        transition
      "
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </>
      ) : (
        "Continue"
      )}
    </motion.button>

    {/* FOOTER */}
    <p className="text-center text-sm text-gray-500 mt-5">
      Fast • Reliable • Premium Laundry
    </p>

  </motion.div>
</div>
    </div>
  );
}