import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  Navigation,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OutOfArea() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F7F5] relative overflow-hidden flex items-center justify-center px-4 sm:px-6 py-8">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.16), transparent 68%)",
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.55, 0.85, 0.55],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.045), transparent 68%)",
          }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg,#111 1px,transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* ================= MAIN ================= */}

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-[510px]"
      >

        {/* ================= TOP BRAND ================= */}

        <div className="flex items-center justify-between mb-5 px-1">

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-white border border-[#EAE8E3] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft size={16} />
            </span>

            <span className="hidden sm:block text-xs font-semibold">
              Go back
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{
                background: "#111",
                boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
              }}
            >
              <span className="text-[#FFD700] text-xs font-black">
                Z
              </span>
            </div>

            <span className="text-sm font-black tracking-[0.16em] text-[#171717]">
              ZUSKO
            </span>
          </div>
        </div>

        {/* ================= CARD ================= */}

        <div
          className="rounded-[30px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.95)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.09), 0 4px 20px rgba(0,0,0,0.04)",
          }}
        >

          {/* ================= MAP ================= */}

          <div className="p-3 sm:p-4 pb-0">

            <div
              className="relative h-[205px] sm:h-[230px] rounded-[23px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg,#ECEEEB,#E5E7E4)",
              }}
            >

              {/* roads */}

              <div className="absolute inset-0 opacity-50">

                {[22, 45, 69, 88].map((top, i) => (
                  <motion.div
                    key={`h-${i}`}
                    className="absolute left-[-10%] right-[-10%] h-[2px] bg-white"
                    style={{
                      top: `${top}%`,
                      transform: `rotate(${i % 2 === 0 ? -2 : 3}deg)`,
                    }}
                  />
                ))}

                {[18, 42, 67, 87].map((left, i) => (
                  <motion.div
                    key={`v-${i}`}
                    className="absolute top-[-10%] bottom-[-10%] w-[2px] bg-white"
                    style={{
                      left: `${left}%`,
                      transform: `rotate(${i % 2 === 0 ? 3 : -2}deg)`,
                    }}
                  />
                ))}

              </div>

              {/* diagonal roads */}

              <div
                className="absolute w-[150%] h-[3px] bg-white/70 left-[-25%] top-[48%] rotate-[-12deg]"
              />

              <div
                className="absolute w-[130%] h-[3px] bg-white/60 left-[-15%] top-[65%] rotate-[18deg]"
              />

              {/* area circles */}

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.07]"
                style={{
                  width: 145,
                  height: 145,
                }}
                animate={{
                  scale: [0.85, 1.2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.06]"
                style={{
                  width: 95,
                  height: 95,
                }}
                animate={{
                  scale: [0.8, 1.25],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2.8,
                  delay: 0.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              {/* floating area label */}

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute left-4 top-4 px-3 py-2 rounded-xl bg-white/85 backdrop-blur shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Navigation size={12} color="#777" />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Your location
                    </p>
                    <p className="text-[11px] font-bold text-gray-800">
                      Outside service area
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* pin */}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%]">

                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >

                  {/* glow */}

                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FFD700] blur-xl"
                    animate={{
                      opacity: [0.25, 0.5, 0.25],
                      scale: [0.9, 1.2, 0.9],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  />

                  <div
                    className="relative w-[58px] h-[58px] rounded-full flex items-center justify-center"
                    style={{
                      background: "#111",
                      border: "4px solid white",
                      boxShadow:
                        "0 12px 30px rgba(0,0,0,0.18)",
                    }}
                  >
                    <MapPin
                      size={25}
                      color="#FFD700"
                      strokeWidth={2.2}
                    />
                  </div>

                </motion.div>

                {/* pin shadow */}

                <motion.div
                  animate={{
                    scaleX: [1, 0.65, 1],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mx-auto mt-2 w-5 h-2 rounded-full bg-black/20 blur-[2px]"
                />

              </div>

              {/* bottom label */}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="absolute bottom-3 left-3 right-3"
              >
                <div className="rounded-xl bg-black/80 backdrop-blur-md px-3.5 py-2.5 flex items-center gap-2.5">

                  <div className="w-7 h-7 rounded-lg bg-[#FFD700] flex items-center justify-center shrink-0">
                    <MapPin size={13} color="#111" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] text-white/50 uppercase tracking-wider font-bold">
                      Service coverage
                    </p>
                    <p className="text-[11px] text-white font-semibold">
                      We’re expanding to more areas
                    </p>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="px-6 sm:px-9 pt-7 pb-8 text-center">

            {/* badge */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: "#FFF8DC",
                border: "1px solid #F6DEA0",
              }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="w-1.5 h-1.5 rounded-full bg-[#D97706]"
              />

              <span className="text-[10px] font-black tracking-[0.16em] uppercase text-[#A16207]">
                Coming Soon
              </span>

              <Sparkles size={11} color="#D97706" />
            </motion.div>

            {/* heading */}

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-5 text-[30px] sm:text-[38px] leading-[1.08] font-black tracking-[-0.04em] text-[#171717]"
            >
              We’re not in your
              <br />

              <span className="relative inline-block">
                area just yet.
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    delay: 0.8,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="absolute left-0 bottom-[-6px] h-[4px] rounded-full bg-[#FFD700]"
                />
              </span>
            </motion.h1>

            {/* description */}

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 mx-auto max-w-[365px] text-[13px] sm:text-[14px] leading-[1.7] text-gray-400"
            >
              We’re expanding across more neighbourhoods.
              <br className="hidden sm:block" />
              Zusko will be available near you soon.
            </motion.p>

            {/* expansion indicator */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-6 mx-auto max-w-[330px] flex items-center gap-3"
            >
              <div className="h-px flex-1 bg-[#ECEAE6]" />

              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-300">
                  Growing
                </span>

                <motion.span
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="text-[#FFD700] text-xs"
                >
                  →
                </motion.span>
              </div>

              <div className="h-px flex-1 bg-[#ECEAE6]" />
            </motion.div>

            {/* CTA */}

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              whileHover={{
                y: -2,
                boxShadow:
                  "0 14px 30px rgba(0,0,0,0.16)",
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => navigate("/")}
              className="mt-7 w-full max-w-[330px] mx-auto h-[52px] rounded-2xl flex items-center justify-center gap-2.5 font-bold text-sm text-white transition-all"
              style={{
                background:
                  "linear-gradient(135deg,#111111,#252525)",
                boxShadow:
                  "0 8px 22px rgba(0,0,0,0.12)",
              }}
            >
              <Home size={16} color="#FFD700" />
              Back to Home

              <span className="ml-1 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowLeft
                  size={12}
                  className="rotate-180"
                />
              </span>
            </motion.button>

            {/* footer */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-7 flex items-center justify-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-[#FFD700]" />

              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300">
                Better laundry is coming
              </span>

              <div className="w-1 h-1 rounded-full bg-[#FFD700]" />
            </motion.div>

          </div>
        </div>

        {/* bottom brand */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-5 text-[9px] font-black tracking-[0.4em] text-gray-300 uppercase"
        >
          ZUSKO • Laundry, simplified
        </motion.p>

      </motion.div>
    </div>
  );
}