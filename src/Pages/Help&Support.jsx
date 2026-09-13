import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaPlus,
  FaMinus,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaHeadset,
  FaQuestionCircle,
} from "react-icons/fa";
import points from "../assets/points.png";

const faqs = [
  {
    question: "How can I schedule a laundry pickup?",
    answer:
      "You can easily schedule a pickup through the Zusko App or website. Choose your preferred time slot, select your items, and confirm the order in just a few taps.",
  },
  {
    question: "What services does Zusko offer?",
    answer:
      "Zusko provides Wash & Fold, Dry Cleaning, Steam Ironing, and Commercial Laundry services for both individuals and businesses.",
  },
  {
    question: "Is there a minimum order amount?",
    answer:
      "Yes, there’s a small minimum order value to ensure efficient pickup and delivery. You can view this limit in the app before confirming your order.",
  },
  {
    question: "How long does it take to get my clothes back?",
    answer:
      "Typically, standard services take 24-48 hours. Express delivery is available at a nominal additional cost.",
  },
  {
    question: "What if my clothes are damaged?",
    answer:
      "We handle every garment with utmost care. In rare cases of damage, please contact our support team within 24 hours of delivery for quick resolution.",
  },
  {
    question: "Can I cancel or reschedule my order?",
    answer:
      "Yes, you can cancel or reschedule your order anytime before pickup. Once processing starts, cancellations may not be possible.",
  },
];

const HelpSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative mt-20 min-h-screen w-full overflow-hidden bg-[#FAFAF8] text-black">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="absolute -right-32 top-[35%] h-96 w-96 rounded-full bg-yellow-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gray-200/30 blur-3xl" />
      </div>

      {/* Decorative Points */}
      <img
        src={points}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-28 z-0 w-32 opacity-30 md:w-48"
      />

      <img
        src={points}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-0 z-0 w-32 rotate-180 opacity-30 md:w-48"
      />

      {/* =========================================================
          HERO
      ========================================================= */}
      <div className="relative z-10 px-6 pb-12 pt-20 md:px-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] shadow-sm"
          >
            <FaHeadset className="text-[#FFC700]" />
            Zusko Support
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-[#171717] md:text-7xl lg:text-8xl">
            Got questions?
            <br />
            <span className="relative inline-block">
              We’ve got answers.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="absolute -bottom-2 left-0 h-2 rounded-full bg-[#FFC700] md:-bottom-3 md:h-3"
              />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Find quick answers about pickups, laundry services, delivery,
            payments, and more. If you still need us, we’re just a message or
            call away.
          </p>
        </motion.div>

        {/* =========================================================
            SUPPORT STATS
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-3 divide-x divide-black/10 rounded-3xl border border-black/10 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur md:p-7"
        >
          <div className="px-2 text-center">
            <p className="text-2xl font-black md:text-3xl">24/7</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500 md:text-xs">
              Support
            </p>
          </div>

          <div className="px-2 text-center">
            <p className="text-2xl font-black md:text-3xl">6+</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500 md:text-xs">
              FAQs
            </p>
          </div>

          <div className="px-2 text-center">
            <p className="text-2xl font-black md:text-3xl">
              <span className="text-[#FFC700]">●</span>
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500 md:text-xs">
              Always Here
            </p>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          FAQ AREA
      ========================================================= */}
      <div className="relative z-10 px-6 pb-24 md:px-20">
        <div className="mx-auto max-w-5xl">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
          >
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Frequently asked
              </p>

              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Everything you need to know.
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
              <FaQuestionCircle className="text-[#FFC700]" />
              Tap a question to reveal the answer
            </div>
          </motion.div>

          {/* FAQ list */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                  className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "border-black bg-white shadow-[0_18px_50px_rgba(0,0,0,0.09)]"
                      : "border-black/10 bg-white/70 hover:border-black/20 hover:bg-white hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isActive}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                  >
                    {/* Number */}
                    <span
                      className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black md:flex ${
                        isActive
                          ? "bg-[#FFC700] text-black"
                          : "bg-[#F3F3F0] text-gray-500"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`flex-1 text-base font-bold transition-colors md:text-lg ${
                        isActive ? "text-black" : "text-gray-800"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Icon */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-black text-[#FFC700]"
                          : "bg-[#F5F5F2] text-black group-hover:bg-[#FFC700]"
                      }`}
                    >
                      {isActive ? (
                        <FaMinus className="text-xs" />
                      ) : (
                        <FaPlus className="text-xs" />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="border-t border-black/10 px-5 pb-6 pt-5 md:ml-[4.5rem] md:px-7">
                          <p className="max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================
          CONTACT CTA
      ========================================================= */}
      <div className="relative z-10 px-6 pb-20 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-black"
        >
          <div className="relative p-8 md:p-12 lg:p-14">
            {/* Yellow glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FFC700]/20 blur-3xl" />

            <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              {/* Copy */}
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-300">
                  <span className="h-2 w-2 rounded-full bg-[#FFC700]" />
                  Need a hand?
                </div>

                <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
                  Still need
                  <span className="text-[#FFC700]"> help?</span>
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
                  Our support team is ready to help you with your order,
                  pickup, delivery, or anything else you need.
                </p>
              </div>

              {/* Contact buttons */}
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <a
                  href="mailto:info@zusko.in"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#FFC700] px-6 py-4 text-sm font-black text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  <FaEnvelope />
                  Email us
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="tel:+918004411976"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
                >
                  <FaPhoneAlt />
                  Call us
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          BOTTOM BRAND LINE
      ========================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 pb-12 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
          Zusko — Laundry, made effortless.
        </p>
      </motion.div>
    </section>
  );
};

export default HelpSupport;
