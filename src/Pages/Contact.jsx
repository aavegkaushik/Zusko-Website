// ContactSimple.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import points from "../assets/points.png";
import { MapPin, Phone, Mail } from "lucide-react";
// import HCaptcha from '@hcaptcha/react-hcaptcha';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};
  // const onHCaptchaChange = (token) => {
  //   setValue("h-captcha-response", token);
  // };

export default function ContactSimple() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const [serverMsg, setServerMsg] = useState("");

  // Vite env var (if you use CRA change to process.env.REACT_APP_WEB3FORMS_KEY)
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

  const onSubmit = async (data) => {
    setServerMsg("");

    // honeypot - ignore bots
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
      // optional fields web3forms supports:
      // reply_to: data.email,
      // redirect: "https://your-site.com/thank-you"
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
    <div className="relative p-8 md:p-16 mt-20 mx-4 md:mx-14 overflow-hidden">
      <motion.img
        src={points}
        alt="decorative points"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 0.8, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-36 md:w-48 -z-10"
      />

      <motion.div
        className="mb-10 mx-4 text-center md:text-left"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          You can find us here
        </h1>
        <span className="font-medium text-[#A6A6A6] text-lg md:text-2xl ml-2 md:ml-5">
          We would love to hear from you!
        </span>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
        <motion.div
          className="flex-1 bg-white shadow-lg rounded-2xl p-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Honeypot (hidden) */}
            <input type="checkbox" tabIndex={-1} className="hidden" autoComplete="off" {...register("botcheck")} />

            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" },
                })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>

            {/* Comment Box */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Comment</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                {...register("message", { required: "Message is required" })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>


            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full cursor-pointer rounded-tl-2xl rounded-br-2xl text-black font-semibold py-3 transition-all duration-300 ${
                isSubmitting ? "bg-gray-300" : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </motion.button>

            {(isSubmitSuccessful || serverMsg) && (
              <p
                className={`text-center mt-4 font-medium ${
                  serverMsg?.startsWith("✅") ? "text-green-600" : serverMsg ? "text-red-600" : "text-green-600"
                }`}
              >
                {serverMsg || "✅ Your message has been sent successfully!"}
              </p>
            )}
          </form>
        </motion.div>

        {/* Address Section (unchanged) */}
        <motion.div
  className="flex-1 flex justify-center"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.4}
>
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="relative max-w-sm w-full
               bg-white rounded-2xl
               shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
               p-8"
  >
    {/* Header */}
    <h2 className="text-sm uppercase tracking-widest text-gray-500 text-center mb-8">
      Registered Office
    </h2>

    {/* Address */}
    <div className="flex gap-4 mb-6">
      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
      <div className="text-gray-700 leading-relaxed text-sm">
        <strong className="text-gray-900 block mb-1">
          Zusko Laundry Services Pvt. Ltd.
        </strong>
        Bundelkhand Innovation & Incubation Center Foundation
        <br />
        BIET Jhansi, Uttar Pradesh
        <br />
        India – 284128
      </div>
    </div>

    {/* Divider */}
    <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-6" />

    {/* Contact */}
    <div className="space-y-4 text-sm">
      <div className="flex items-center gap-3 text-gray-700">
        <Phone className="w-4 h-4 text-gray-400" />
        <span>+91 63968 64741</span>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <Mail className="w-4 h-4 text-gray-400" />
        <span>info@zusko.in</span>
      </div>
    </div>

    {/* Accent hover ring */}
    <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />
  </motion.div>
</motion.div>
      </div>
    </div>
  );
}
