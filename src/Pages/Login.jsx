import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import API from "../config/api";
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Users,
  PackageCheck,
  Star,
} from "lucide-react";
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
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
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
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.log("ERROR:", err);

  alert(
    err.response?.data?.message ||
    JSON.stringify(err.response?.data) ||
    "Login failed"
  );
} finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen mt-18 flex flex-col md:flex-row">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 relative overflow-hidden bg-black text-white"
      >
        {/* Premium Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl top-10 left-10"
          />

          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl bottom-10 right-10"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,10,0.08),transparent_40%)]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full p-12 lg:p-16">
          {/* Branding */}
          {/* <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      <h1 className="text-4xl font-black tracking-tight">
        ZUSKO
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
        <p className="text-sm text-yellow-400 font-semibold uppercase tracking-wider">
          India’s Premium Laundry Experience
        </p>
      </div>
    </motion.div> */}

          {/* Main Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                Your Clothes.
                <br />
                <span className="bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Our Responsibility.
                </span>
              </h2>

              <p className="text-lg text-zinc-300 max-w-md leading-relaxed">
                Pickup • Professional Cleaning • Fast Delivery
              </p>
            </div>

            {/* Features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {[
                {
                  icon: <Zap size={22} />,
                  title: "Same-Day Delivery",
                  desc: "Quick turnaround for urgent orders",
                },
                {
                  icon: <Sparkles size={22} />,
                  title: "Premium Fabric Care",
                  desc: "Luxury cleaning for every garment",
                },
                {
                  icon: <ShieldCheck size={22} />,
                  title: "Secure Payments",
                  desc: "100% safe & encrypted checkout",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-400/10 hover:border-yellow-400/30 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                    {feature.icon}
                  </div>

                  <div>
                    <p className="font-semibold text-white">{feature.title}</p>
                    <p className="text-sm text-zinc-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-yellow-400/10"
          >
            {[
              {
                icon: <Users size={18} />,
                number: "10K+",
                label: "Happy Customers",
              },
              {
                icon: <PackageCheck size={18} />,
                number: "50K+",
                label: "Orders Delivered",
              },
              {
                icon: <Star size={18} />,
                number: "4.9★",
                label: "Customer Rating",
              },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  {stat.icon}
                  <p className="text-2xl font-black">{stat.number}</p>
                </div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE - LOGIN */}
      <div
        className="flex w-full md:w-1/2
    items-center justify-center
    min-h-screen md:min-h-auto
    bg-linear-to-br from-yellow-50 via-white to-yellow-100
    p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
    w-full max-w-md
    bg-white/90 backdrop-blur-xl
    p-6 sm:p-8
    rounded-3xl
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
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
