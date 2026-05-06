import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/zusko.png"; // adjust path if needed

const UnderDevelopmentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(true);

  useEffect(() => {
    // Check if popup has been shown before
    const popupShown = localStorage.getItem("zusko-popup-shown");

    if (!popupShown) {
      // Show popup only on first visit
      setIsOpen(true);
      setHasShown(false);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Store in localStorage so popup doesn't show again
    localStorage.setItem("zusko-popup-shown", "true");
    setHasShown(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={handleClose}
        >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              aria-label="Close popup"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Logo with animation */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <img
                src={logo}
                alt="Zusko Logo"
                className="h-14 object-contain"
              />
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="mt-6 text-center text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              We're Almost Ready! 🚀
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mt-4 text-center text-sm text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Our premium laundry service is currently under development.
              We're working hard to deliver a fast, reliable, and exceptional experience.
            </motion.p>

            {/* Info Box with animation */}
            <motion.div
              className="mt-6 rounded-xl bg-linear-to-r from-yellow-50 to-yellow-100/50 p-5 border border-yellow-200/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <ul className="space-y-3 text-sm text-gray-700">
                <motion.li
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-yellow-600 font-bold">✓</span>
                  Core features being finalized
                </motion.li>
                <motion.li
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-yellow-600 font-bold">✓</span>
                  Testing & quality improvements ongoing
                </motion.li>
                <motion.li
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-yellow-600 font-bold">✓</span>
                  Some features may be temporarily unavailable
                </motion.li>
              </ul>
            </motion.div>

            {/* Footer Text */}
            <motion.p
              className="mt-6 text-center text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Thank you for your patience 💛  
              <br />
              We'll be live very soon.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="my-6 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            />

            {/* CTA Button */}
            <motion.button
              onClick={handleClose}
              className="w-full rounded-xl bg-linear-to-r from-yellow-400 to-yellow-300 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:from-yellow-300 hover:to-yellow-200 hover:shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Website
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnderDevelopmentPopup;