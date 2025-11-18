import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaMinus, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
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
    <section className="relative mt-20 w-full min-h-screen bg-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Decorative Points */}
      <img
        src={points}
        alt="Decoration"
        className="absolute top-12 left-10 w-40 md:w-56 opacity-60 pointer-events-none z-0"
      />
      <img
        src={points}
        alt="Decoration"
        className="absolute bottom-12 right-10 w-40 md:w-56 opacity-60 rotate-180 pointer-events-none z-0"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-4">
          Help & Support
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          We’re here to help. Find quick answers to common questions, or reach
          out to our support team for personal assistance.
        </p>
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16 relative z-10">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="border border-gray-200 rounded-xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-[#F8F9FA]"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <FaMinus className="text-[#FFC700]" />
              ) : (
                <FaPlus className="text-[#FFC700]" />
              )}
            </button>

            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-4 text-gray-600 text-sm leading-relaxed"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 text-center relative z-10"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1E1E1E] mb-3">
          Still need help?
        </h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Our team is here 24/7 to assist you with anything you need.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <a
            href="mailto:support@zusko.in"
            className="flex items-center gap-2 bg-[#FFC700] text-black px-6 py-3 rounded-full font-medium hover:bg-[#e6b800] transition"
          >
            <FaEnvelope /> support@zusko.in
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
          >
            <FaPhoneAlt /> +91 63968 64741
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HelpSupport;
