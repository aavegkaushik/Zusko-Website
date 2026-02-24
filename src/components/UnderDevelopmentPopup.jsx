import React from "react";
import logo from "../assets/zusko.png"; // adjust path if needed

const UnderDevelopmentPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-3 top-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Laundry Service Logo"
            className="h-12 object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
          We’re Almost Ready! 🚀
        </h2>

        {/* Description */}
        <p className="mt-3 text-center text-sm text-gray-600 leading-relaxed">
          Our laundry service is currently under development.
          We’re working hard to deliver a fast, reliable, and premium experience.
        </p>

        {/* Info Box */}
        <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-gray-700">
          <ul className="space-y-2">
            <li>✔ Core features being finalized</li>
            <li>✔ Testing & quality improvements ongoing</li>
            <li>✔ Some features may be temporarily unavailable</li>
          </ul>
        </div>

        {/* Footer Text */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Thank you for your patience 💛  
          We’ll be live very soon.
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-gray-200" />

        {/* CTA */}
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-yellow-400 py-3 text-sm font-semibold text-black hover:bg-yellow-500 transition"
        >
          Continue to Website
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopmentPopup;