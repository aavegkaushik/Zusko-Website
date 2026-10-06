import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import {
  Rocket,
  Sparkles,
  Gift,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Home,
  Share2,
  Bell,
  Clock3,
  Layers,
  HeartHandshake,
} from "lucide-react";
import logo from "../assets/Zusko White Logo.png";

export default function LaunchingSoon() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData || null;
  const paymentMethod = location.state?.paymentMethod || "ONLINE";

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    // Window scroll to top
    window.scrollTo(0, 0);

    // Initial confetti burst
    const end = Date.now() + 1200;
    const colors = ["#FFD700", "#FFA500", "#FFF", "#F59E0B"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) {
      toast.error("Please enter your Phone number or Email!");
      return;
    }
    setIsSubscribed(true);
    toast.success("You're on the VIP launch list! 🚀 We'll notify you first.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Zusko Laundry - Premium Doorstep Laundry",
          text: "Zusko is launching soon! Get your clothes cleaned with premium care and free pickup/delivery.",
          url: window.location.origin,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success("Website link copied to clipboard!");
    }
  };

  const totalItemsCount = orderData?.items?.reduce(
    (acc, curr) => acc + (curr.qty || 1),
    0
  );

  return (
    <div className="min-h-screen bg-[#0C0D0E] text-white flex flex-col justify-between overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      {/* ── TOP NAV / LOGO ── */}
      <header className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <img src={logo} alt="Zusko" className="h-9 w-auto" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/25 text-yellow-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Launching Very Soon
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 relative max-w-4xl mx-auto px-5 py-12 md:py-16 w-full z-10">
        {/* Ambient Glowing Blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-yellow-400/15 rounded-full blur-[130px] -z-10" />
        <div className="pointer-events-none absolute bottom-10 right-0 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] -z-10" />

        {/* HERO ICON WITH PULSING ANIMATION */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-7">
            {/* Outer animated ripple 1 */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-yellow-400/30 pointer-events-none"
              animate={{ scale: [1, 1.3, 1.5], opacity: [0.8, 0.3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Outer animated ripple 2 */}
            <motion.div
              className="absolute -inset-8 rounded-full border border-yellow-300/15 pointer-events-none"
              animate={{ scale: [1, 1.35, 1.7], opacity: [0.5, 0.15, 0] }}
              transition={{ duration: 2.8, delay: 0.3, repeat: Infinity, ease: "easeOut" }}
            />

            {/* Glowing Icon Container */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 p-0.5 shadow-[0_12px_45px_rgba(250,204,21,0.45)]"
            >
              <div className="w-full h-full bg-[#121316] rounded-[22px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/15 to-transparent" />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket size={44} className="text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-yellow-300 mb-4"
          >
            <Sparkles size={14} className="text-yellow-400" />
            <span>Exclusive VIP Early Access</span>
          </motion.div>

          {/* MAIN HEADINGS */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-2xl"
          >
            We Are{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Launching Soon
            </span>{" "}
            in Your City!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl font-normal leading-relaxed"
          >
            Hum apni high-quality laundry & dry cleaning service ka setup finalise kar rahe hain. 
            Aapka interest register ho chuka hai aur hum aapko sabse pehle <span className="text-yellow-300 font-semibold">VIP Priority</span> ke sath onboard karenge!
          </motion.p>
        </div>

        {/* ── SAVED ORDER PREVIEW CARD (IF ORDER DATA EXISTS) ── */}
        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.08] via-white/[0.02] to-transparent p-5 sm:p-6 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    Aapka Order Preference Saved Hai
                  </h3>
                  <p className="text-xs text-gray-400">
                    {totalItemsCount ? `${totalItemsCount} items selected` : "Items configured"} • Preferred: {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                  </p>
                </div>
              </div>

              {orderData.total && (
                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-400">Estimated Total</span>
                  <p className="text-lg font-black text-yellow-300 leading-none mt-0.5">
                    ₹{orderData.total}
                  </p>
                </div>
              )}
            </div>

            <p className="mt-3 text-xs text-gray-300 leading-relaxed flex items-center gap-2">
              <ShieldCheck size={16} className="text-yellow-400 shrink-0" />
              <span>
                Fikar mat kijiye! Launch hote hi aapko special priority slot aur instant discount milega.
              </span>
            </p>
          </motion.div>
        )}

        {/* ── VIP EARLY BIRD PERKS ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: Gift,
              title: "Flat 25% OFF on Launch",
              desc: "First order par exclusive welcome launch discount.",
            },
            {
              icon: Truck,
              title: "Free Doorstep Pickup",
              desc: "Aapke doorstep se hassle-free pickup aur safe delivery.",
            },
            {
              icon: Clock3,
              title: "Priority 24hr Turnaround",
              desc: "VIP members ke orders express speed se process honge.",
            },
          ].map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-yellow-400/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 mb-3">
                  <Icon size={18} />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  {perk.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* ── NOTIFICATION SIGNUP BOX ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#16171B] to-[#121316] p-6 sm:p-8 text-center shadow-xl"
        >
          <div className="max-w-md mx-auto">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center text-yellow-400 mb-4">
              <Bell size={22} />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Launch Alert Paayein Sabse Pehle
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Apna WhatsApp Number ya Email daalein. Jaise hi live honge, aapko direct VIP launch code mil jayega.
            </p>

            {isSubscribed ? (
              <div className="mt-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 size={18} />
                <span>Thank you! Aap VIP list me add ho chuke hain 💛</span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder="Enter WhatsApp No. or Email..."
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-extrabold text-sm hover:from-yellow-300 hover:to-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95"
                >
                  <span>Notify Me</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* ── ACTION BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all active:scale-95"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <Layers size={16} />
            <span>Explore Services</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white font-medium text-sm transition-all"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </motion.div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t border-white/10 py-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Zusko Laundry Services. Clean Clothes, Pure Peace of Mind.</p>
      </footer>
    </div>
  );
}
