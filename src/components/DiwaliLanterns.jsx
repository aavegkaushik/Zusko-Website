import { motion, AnimatePresence } from "framer-motion";

/**
 * Traditional Indian Akash Kandil (Diwali Lantern)
 */
function Kandil({ height = 155, cordHeight = 45 }) {
  return (
    <div className="relative flex flex-col items-center pointer-events-none select-none">
      {/* Golden Thread / Hanging Cord */}
      <div
        style={{ height: cordHeight }}
        className="w-[1.5px] bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-500 shadow-[0_0_8px_rgba(255,215,0,0.6)]"
      />

      {/* Main Lantern Unit */}
      <div className="relative">
        <svg
          width="54"
          height="80"
          viewBox="0 0 54 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_22px_rgba(251,191,36,0.65)]"
        >
          {/* Top Hanging Ring */}
          <circle cx="27" cy="4" r="3" stroke="#FDE68A" strokeWidth="1.2" fill="#B45309" />

          {/* Top Cap */}
          <path
            d="M17 6H37L42 14H12L17 6Z"
            fill="url(#capGrad)"
            stroke="#FDE68A"
            strokeWidth="0.8"
          />

          {/* Central Prismatic Lantern Body */}
          <path
            d="M12 14L4 32L14 56L27 62L40 56L50 32L42 14H12Z"
            fill="url(#bodyGrad)"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />

          {/* Inner Light Core / Candle Radiance */}
          <circle cx="27" cy="36" r="12" fill="url(#coreGlow)" />

          {/* Ornate Lattice / Diamond facets */}
          <path d="M27 14V62" stroke="#FEF08A" strokeWidth="1" opacity="0.85" />
          <path d="M12 14L27 36L42 14" stroke="#FDE68A" strokeWidth="0.9" opacity="0.75" />
          <path d="M4 32H50" stroke="#F59E0B" strokeWidth="0.9" opacity="0.85" />
          <path d="M14 56L27 36L40 56" stroke="#FEF08A" strokeWidth="0.9" opacity="0.75" />

          {/* Bottom Cap */}
          <path d="M22 62H32L30 67H24L22 62Z" fill="#92400E" stroke="#F59E0B" strokeWidth="0.6" />

          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FEF08A" />
              <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bodyGrad" x1="4" y1="14" x2="50" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#FEF9C3" stopOpacity="0.98" />
              <stop offset="1" stopColor="#D97706" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="capGrad" x1="12" y1="6" x2="42" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FCD34D" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>

        {/* Golden Hanging Tassels (Swaying naturally) */}
        <div className="flex justify-center gap-1.5 -mt-1">
          <div className="w-[1px] h-6 bg-gradient-to-b from-yellow-300 to-transparent" />
          <div className="w-[1.2px] h-8 bg-gradient-to-b from-yellow-400 via-amber-300 to-transparent shadow-[0_0_4px_rgba(255,215,0,0.5)]" />
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-yellow-300 via-amber-400 to-transparent shadow-[0_0_6px_rgba(255,215,0,0.6)]" />
          <div className="w-[1.2px] h-8 bg-gradient-to-b from-yellow-400 via-amber-300 to-transparent shadow-[0_0_4px_rgba(255,215,0,0.5)]" />
          <div className="w-[1px] h-6 bg-gradient-to-b from-yellow-300 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * Side Hanging Kandils - Sits elegantly on the top-left and top-right of the hero
 */
export function HangingSideKandils() {
  return (
    <div className="absolute top-0 inset-x-0 h-56 pointer-events-none z-20 overflow-hidden">
      {/* Top Left Kandil */}
      <motion.div
        className="absolute left-3 sm:left-8 md:left-14 top-0 origin-top"
        animate={{ rotate: [-2.8, 2.8, -2.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Kandil cordHeight={40} />
      </motion.div>

      {/* Second Left Kandil (slightly smaller & offset) */}
      <motion.div
        className="hidden sm:block absolute left-20 md:left-28 top-0 origin-top opacity-70 scale-85"
        animate={{ rotate: [2.2, -2.2, 2.2] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <Kandil cordHeight={65} />
      </motion.div>

      {/* Second Right Kandil (slightly smaller & offset) */}
      <motion.div
        className="hidden sm:block absolute right-20 md:right-28 top-0 origin-top opacity-70 scale-85"
        animate={{ rotate: [-2.2, 2.2, -2.2] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Kandil cordHeight={65} />
      </motion.div>

      {/* Top Right Kandil */}
      <motion.div
        className="absolute right-3 sm:right-8 md:right-14 top-0 origin-top"
        animate={{ rotate: [2.8, -2.8, 2.8] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <Kandil cordHeight={40} />
      </motion.div>
    </div>
  );
}
