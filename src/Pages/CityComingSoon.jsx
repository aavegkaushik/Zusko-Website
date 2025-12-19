import { motion } from "framer-motion";
import { MapPin, Clock, Bell, Store } from "lucide-react";
import cityBg from "../assets/city.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function CityComingSoon({ cityName }) {
  return (
    <section className="bg-white min-h-screen">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative h-[70vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${cityBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Zusko is Coming to{" "}
            <span className="text-yellow-400">{cityName}</span>
          </h1>

          <p className="mt-6 text-gray-200 text-lg">
            We’re not live in your city yet, but we’re expanding fast.
            Join the waitlist and be the first to know.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition">
              Notify Me
            </button>

            <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl transition">
              Become a Partner
            </button>
          </div>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* LEFT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-black">
            Why Zusko?
          </h2>

          <ul className="mt-6 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <Clock className="text-yellow-500" />
              Reliable pickup & delivery services
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="text-yellow-500" />
              Trusted local laundry partners
            </li>
            <li className="flex items-start gap-3">
              <Bell className="text-yellow-500" />
              Smart scheduling & transparent pricing
            </li>
          </ul>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-black rounded-2xl p-8 text-white"
        >
          <h3 className="text-xl font-semibold">
            Want Zusko in {cityName}?
          </h3>

          <p className="mt-4 text-gray-300">
            If you run a laundry business in {cityName}, partner with us
            and grow with predictable demand and weekly payouts.
          </p>

          <button className="mt-6 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition">
            Partner With Zusko
          </button>
        </motion.div>
      </div>
    </section>
  );
}
