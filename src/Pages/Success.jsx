import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function Success() {
  const navigate = useNavigate();

  // 🎉 Confetti effect
  useEffect(() => {
    const duration = 1500;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-50 to-white p-4">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-100 shadow-2xl rounded-3xl p-8 text-center"
      >
        
        {/* ✅ Animated Check */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100"
        >
          <motion.span
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl"
          >
            ✅
          </motion.span>
        </motion.div>

        {/* 🎉 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-gray-900"
        >
          Order Placed Successfully!
        </motion.h1>

        {/* 📦 Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-gray-600 text-sm leading-relaxed"
        >
          Your laundry pickup is scheduled.  
          Sit back and relax — we’ve got it covered 💛
        </motion.p>

        {/* 🚀 Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/track")}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Track Order
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/")}
            className="w-full bg-yellow-400 py-3 rounded-xl font-semibold shadow-md"
          >
            Back to Home
          </motion.button>
        </div>

        {/* ✨ Footer */}
        <p className="mt-5 text-xs text-gray-400">
          ZUSKO • Fast • Reliable • Premium
        </p>
      </motion.div>
    </div>
  );
}