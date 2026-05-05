// ContactSimple.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import points from "../assets/points.png";
import { MapPin, Phone, Mail, CheckCircle2, AlertCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay },
  }),
};

export default function ContactSimple() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const [serverMsg, setServerMsg] = useState("");

  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

  const onSubmit = async (data) => {
    setServerMsg("");

    if (data.botcheck) return;

    if (!WEB3FORMS_KEY) {
      setServerMsg("Server key not configured. Add VITE_WEB3FORMS_KEY to your .env.");
      return;
    }

    const payload = {
      access_key: WEB3FORMS_KEY,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      message: data.message,
      subject: "New contact from Zusko website",
      from_name: "Zusko Website",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
      }

      const json = await res.json().catch(() => null);
      if (!json) throw new Error("Invalid JSON response from server.");

      if (json.success) {
        setServerMsg("✅ Your message has been sent successfully!");
        reset();
      } else {
        setServerMsg(json.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setServerMsg(
        err?.message?.includes("Failed to fetch")
          ? "Network / CORS error. Check console and API origin settings."
          : `Error: ${err.message || "Network error. Please try again."}`
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/8 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-300/5 rounded-full blur-2xl -z-10 pointer-events-none"></div>

      {/* Animated Points */}
      <motion.img
        src={points}
        alt="decorative points"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 0.6, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-10 left-0 w-40 md:w-56 -z-10 opacity-60"
      />

      {/* Header Section */}
      <motion.div
        className="pt-20 md:pt-28 pb-16 px-6 md:px-12 lg:px-20 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-black bg-linear-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 leading-tight"
          variants={fadeUp}
        >
          Get in Touch
        </motion.h1>

        <motion.p
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </motion.p>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form Section */}
            <motion.div
              className="relative"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
            >
              {/* Subtle background card */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl -z-10"></div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-10 md:p-12 space-y-6">
                {/* Form Title */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
                  <div className="w-12 h-1 bg-linear-to-r from-yellow-400 to-yellow-300 rounded-full"></div>
                </div>

                {/* Honeypot */}
                <input type="checkbox" tabIndex={-1} className="hidden" autoComplete="off" {...register("botcheck")} />

                {/* Name */}
                <motion.div variants={fadeUp} custom={0.3}>
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-800 font-medium"
                  />
                  {errors.name && (
                    <motion.p className="text-red-500 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <AlertCircle size={16} /> {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp} custom={0.4}>
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                    })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-800 font-medium"
                  />
                  {errors.email && (
                    <motion.p className="text-red-500 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <AlertCircle size={16} /> {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Mobile */}
                <motion.div variants={fadeUp} custom={0.5}>
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 63968 64741"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" },
                    })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-800 font-medium"
                  />
                  {errors.mobile && (
                    <motion.p className="text-red-500 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <AlertCircle size={16} /> {errors.mobile.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp} custom={0.6}>
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help..."
                    {...register("message", { required: "Message is required" })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-800 font-medium resize-none"
                  />
                  {errors.message && (
                    <motion.p className="text-red-500 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <AlertCircle size={16} /> {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-base uppercase tracking-wide transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-linear-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-gray-900 shadow-lg hover:shadow-xl"
                  }`}
                  variants={fadeUp}
                  custom={0.7}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {/* Success/Error Message */}
                {(isSubmitSuccessful || serverMsg) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      serverMsg?.startsWith("✅")
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {serverMsg?.startsWith("✅") ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span className="font-medium text-sm">
                      {serverMsg || "✅ Your message has been sent successfully!"}
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Information Section */}
            <motion.div
                className="space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3}
              >
                {/* Heading */}
                <div className="mb-2">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Contact Information</h3>
                  <div className="h-px w-12 bg-gradient-to-r from-yellow-400 to-transparent mt-2"></div>
                </div>

                {/* Location Card */}
                <motion.div
                  whileHover={{ boxShadow: "0 12px 32px rgba(0,0,0,0.06)" }}
                  className="bg-white border border-gray-200/60 rounded-xl p-7 transition-all duration-300"
                  variants={scaleIn}
                  custom={0.3}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200/80">
                      <MapPin className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-semibold text-base mb-2">Registered Office</h4>
                      <p className="text-gray-600 text-sm leading-7">
                        <span className="font-medium text-gray-800">Zusko Laundry Services Pvt. Ltd.</span>
                        <br />
                        Bundelkhand Innovation & Incubation Center Foundation
                        <br />
                        BIET Jhansi, Uttar Pradesh
                        <br />
                        India – 284128
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  whileHover={{ boxShadow: "0 12px 32px rgba(0,0,0,0.06)" }}
                  className="bg-white border border-gray-200/60 rounded-xl p-7 transition-all duration-300"
                  variants={scaleIn}
                  custom={0.4}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 border border-gray-200/80">
                      <Phone className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-semibold text-base mb-2">Telephone</h4>
                      <a
                        href="tel:+916396864741"
                        className="text-gray-900 font-medium text-sm hover:text-yellow-600 transition-colors duration-300 block mb-1"
                      >
                        +91 63968 64741
                      </a>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">
                        Monday – Friday: 9:00 AM – 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  whileHover={{ boxShadow: "0 12px 32px rgba(0,0,0,0.06)" }}
                  className="bg-white border border-gray-200/60 rounded-xl p-7 transition-all duration-300"
                  variants={scaleIn}
                  custom={0.5}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200/80">
                      <Mail className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-semibold text-base mb-2">Email Address</h4>
                      <a
                        href="mailto:info@zusko.in"
                        className="text-gray-900 font-medium text-sm hover:text-yellow-600 transition-colors duration-300 block mb-1"
                      >
                        info@zusko.in
                      </a>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">
                        Expected Response: Within 24 Business Hours
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Formal Note */}
                <motion.div
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-2"
                  variants={fadeUp}
                  custom={0.6}
                >
                  <p className="text-gray-700 text-sm leading-6">
                    <span className="text-gray-900 font-semibold">Notice:</span> For time-sensitive inquiries, we recommend contacting us by phone. Our customer support team is available during business hours.
                  </p>
                </motion.div>
              </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}