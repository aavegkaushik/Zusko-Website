import React from "react";

const UnderDevelopmentPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
          🧺
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Under Development
        </h2>

        {/* Description */}
        <p className="mt-3 text-center text-sm text-gray-600">
          We’re currently ironing out the details!  
          Our laundry service is getting ready to serve you better.
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-gray-200" />

        {/* CTA */}
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-yellow-400 py-3 text-sm font-semibold text-black hover:bg-yellow-500 transition"
        >
          Got it 👍
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopmentPopup;