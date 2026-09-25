import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  Clock3,
  ChevronRight,
  Home,
  Share2,
  Phone,
  Check,
  Sparkles,
  Shirt,
  Truck,
  WashingMachine,
  Box,
  ArrowUpRight,
} from "lucide-react";


// ============================================================
// PREMIUM SUCCESS CHECK
// ============================================================
function SuccessMark() {
  return (
    <div className="relative w-[92px] h-[92px]">
      {/* Outer pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(255,215,0,0.28)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.9, 1.15, 1.35],
          opacity: [0.8, 0.35, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Main circle */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        className="relative w-full h-full rounded-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(145deg, #FFE66B 0%, #FFD700 45%, #E6B800 100%)",
          boxShadow:
            "0 18px 50px rgba(255,215,0,0.28), inset 0 1px 0 rgba(255,255,255,0.65)",
        }}
      >
        {/* Inner circle */}
        <div
          className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
          style={{
            background: "#111111",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              delay: 0.55,
              duration: 0.55,
              ease: "easeOut",
            }}
          >
            <Check
              size={34}
              strokeWidth={3}
              color="#FFD700"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


// ============================================================
// FLOATING LIGHT
// ============================================================
function FloatingLight({ x, y, size = 5, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: "#FFD700",
        boxShadow: "0 0 18px rgba(255,215,0,0.7)",
      }}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
        y: [0, -30, -60],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeOut",
      }}
    />
  );
}


// ============================================================
// STATUS ITEM
// ============================================================
function StatusItem({
  number,
  icon,
  title,
  description,
  active,
  completed,
  last,
  delay,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay,
        duration: 0.45,
        ease: "easeOut",
      }}
      className="relative flex gap-4"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: delay + 0.1,
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
          className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: completed
              ? "#FFD700"
              : active
              ? "#111111"
              : "#F5F5F5",

            color: completed
              ? "#111111"
              : active
              ? "#FFD700"
              : "#B8B8B8",

            border: active
              ? "1px solid rgba(255,215,0,0.5)"
              : "1px solid #EEEEEE",

            boxShadow: active
              ? "0 8px 25px rgba(255,215,0,0.16)"
              : "none",
          }}
        >
          {completed ? (
            <Check size={18} strokeWidth={3} />
          ) : (
            icon
          )}

          {active && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: "1px solid rgba(255,215,0,0.5)",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        {!last && (
          <div
            className="w-px flex-1 min-h-[42px] mt-1"
            style={{
              background: completed
                ? "linear-gradient(to bottom, #FFD700, #EAEAEA)"
                : "#EEEEEE",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pt-1 pb-6 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className="text-sm font-bold"
            style={{
              color: active || completed
                ? "#111111"
                : "#A1A1A1",
            }}
          >
            {title}
          </h3>

          {active && (
            <span
              className="text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full"
              style={{
                background: "#FFF7CC",
                color: "#9A7400",
              }}
            >
              Current
            </span>
          )}
        </div>

        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Success() {
  const navigate = useNavigate();

  const canAccess =
    sessionStorage.getItem("orderSuccess");

  const [showShare, setShowShare] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  // ==========================================================
  // CONFETTI
  // ==========================================================
  useEffect(() => {
    const timers = [];

    timers.push(
      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 72,
          startVelocity: 30,
          scalar: 0.85,
          origin: {
            x: 0.5,
            y: 0.58,
          },
          colors: [
            "#FFD700",
            "#FFFFFF",
            "#111111",
          ],
        });
      }, 350)
    );

    timers.push(
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 50,
          startVelocity: 28,
          scalar: 0.7,
          origin: {
            x: 0,
            y: 0.65,
          },
          colors: [
            "#FFD700",
            "#FFFFFF",
          ],
        });

        confetti({
          particleCount: 45,
          angle: 120,
          spread: 50,
          startVelocity: 28,
          scalar: 0.7,
          origin: {
            x: 1,
            y: 0.65,
          },
          colors: [
            "#FFD700",
            "#FFFFFF",
          ],
        });
      }, 650)
    );

    return () => {
      timers.forEach(clearTimeout);
      sessionStorage.removeItem(
        "orderSuccess"
      );
    };
  }, []);

  // ==========================================================
  // SHARE
  // ==========================================================
  const handleShare = async () => {
    const shareData = {
      title: "Zusko Laundry",
      text:
        "I just booked my laundry pickup with Zusko. 🧺",
      url: window.location.origin,
    };

    try {
      if (
        navigator.share &&
        typeof navigator.share === "function"
      ) {
        await navigator.share(
          shareData
        );
        return;
      }

      await navigator.clipboard.writeText(
        `${shareData.text} ${shareData.url}`
      );

      setCopied(true);
      setShowShare(true);

      setTimeout(() => {
        setShowShare(false);
        setCopied(false);
      }, 2200);
    } catch (error) {
      console.log(
        "Share cancelled:",
        error?.message
      );
    }
  };

  // ==========================================================
  // ACCESS GUARD
  // ==========================================================
  if (!canAccess) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ==========================================================
  // STATUS
  // ==========================================================
  const statuses = [
    {
      icon: (
        <Package
          size={18}
          strokeWidth={2.5}
        />
      ),
      title: "Order Confirmed",
      description:
        "Your laundry order has been successfully placed.",
      completed: true,
      active: false,
    },

    {
      icon: (
        <Truck
          size={18}
          strokeWidth={2.5}
        />
      ),
      title: "Pickup Scheduled",
      description:
        "Our pickup partner will collect your clothes as scheduled.",
      completed: false,
      active: true,
    },

    {
      icon: (
        <WashingMachine
          size={18}
          strokeWidth={2.5}
        />
      ),
      title: "Cleaning & Care",
      description:
        "Your clothes will be processed according to the selected service.",
      completed: false,
      active: false,
    },

    {
      icon: (
        <Box
          size={18}
          strokeWidth={2.5}
        />
      ),
      title: "Ready for Delivery",
      description:
        "We'll notify you once your fresh laundry is on its way.",
      completed: false,
      active: false,
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10 sm:py-16"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, rgba(255,215,0,0.12), transparent 35%), linear-gradient(145deg, #F7F7F5 0%, #FFFFFF 45%, #F7F8FA 100%)",
      }}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.12), transparent 68%)",
          }}
        />

        <div
          className="absolute -bottom-40 -right-32 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(17,17,17,0.05), transparent 68%)",
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            border:
              "1px solid rgba(0,0,0,0.025)",
          }}
        />

        <FloatingLight
          x={8}
          y={18}
          size={5}
          delay={0.4}
        />

        <FloatingLight
          x={91}
          y={22}
          size={4}
          delay={1.2}
        />

        <FloatingLight
          x={13}
          y={76}
          size={3}
          delay={1.8}
        />

        <FloatingLight
          x={87}
          y={72}
          size={5}
          delay={2.2}
        />
      </div>


      {/* =====================================================
          MAIN WRAPPER
      ====================================================== */}
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-[500px] z-10"
      >

        {/* ===================================================
            PREMIUM CARD
        ==================================================== */}
        <div
          className="relative overflow-hidden rounded-[32px]"
          style={{
            background:
              "rgba(255,255,255,0.94)",
            border:
              "1px solid rgba(255,255,255,0.95)",
            boxShadow:
              "0 35px 100px rgba(0,0,0,0.10), 0 8px 35px rgba(0,0,0,0.05)",
            backdropFilter:
              "blur(30px)",
          }}
        >

          {/* =================================================
              TOP HERO
          ================================================== */}
          <div
            className="relative overflow-hidden px-6 sm:px-8 pt-9 sm:pt-11 pb-8"
            style={{
              background:
                "linear-gradient(145deg, #0B0B0B 0%, #151515 58%, #211A00 100%)",
            }}
          >
            {/* Gold glow */}
            <div
              className="absolute -top-32 -right-24 w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,215,0,0.18), transparent 65%)",
              }}
            />

            {/* Small shine */}
            <motion.div
              className="absolute top-0 left-[-100px] w-20 h-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                transform:
                  "skewX(-20deg)",
              }}
              animate={{
                x: [0, 620],
              }}
              transition={{
                duration: 2.5,
                delay: 1,
                ease: "easeInOut",
              }}
            />

            {/* Brand */}
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="relative flex items-center justify-center gap-2 mb-7"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "rgba(255,215,0,0.12)",
                  border:
                    "1px solid rgba(255,215,0,0.2)",
                }}
              >
                <Shirt
                  size={14}
                  color="#FFD700"
                />
              </div>

              <span
                className="text-[11px] font-black tracking-[0.28em]"
                style={{
                  color: "#FFD700",
                }}
              >
                ZUSKO
              </span>
            </motion.div>

            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <SuccessMark />
            </div>

            {/* Heading */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              className="relative text-center"
            >
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-3"
                style={{
                  background:
                    "rgba(255,215,0,0.09)",
                  border:
                    "1px solid rgba(255,215,0,0.16)",
                }}
              >
                <Sparkles
                  size={11}
                  color="#FFD700"
                />

                <span
                  className="text-[9px] font-bold uppercase tracking-[0.16em]"
                  style={{
                    color: "#FFD700",
                  }}
                >
                  Successfully Placed
                </span>
              </div>

              <h1 className="text-[27px] sm:text-[31px] leading-tight font-black text-white">
                Your laundry is
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #FFFFFF, #FFD700)",
                    WebkitBackgroundClip:
                      "text",
                    WebkitTextFillColor:
                      "transparent",
                  }}
                >
                  in good hands.
                </span>
              </h1>

              <p
                className="text-xs sm:text-sm leading-relaxed mt-3 max-w-[330px] mx-auto"
                style={{
                  color:
                    "rgba(255,255,255,0.48)",
                }}
              >
                Pickup is scheduled. We'll take
                care of the rest while you get
                your time back.
              </p>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
              }}
              className="relative grid grid-cols-3 gap-2 mt-7"
            >
              {[
                {
                  icon: <Truck size={14} />,
                  title: "Pickup",
                  sub: "Scheduled",
                },
                {
                  icon: <Sparkles size={14} />,
                  title: "Care",
                  sub: "Handled",
                },
                {
                  icon: <Box size={14} />,
                  title: "Delivery",
                  sub: "Tracked",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl px-2 py-3 text-center"
                  style={{
                    background:
                      "rgba(255,255,255,0.055)",
                    border:
                      "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="flex justify-center mb-1"
                    style={{
                      color: "#FFD700",
                    }}
                  >
                    {item.icon}
                  </div>

                  <p className="text-[10px] font-bold text-white">
                    {item.title}
                  </p>

                  <p
                    className="text-[9px] mt-0.5"
                    style={{
                      color:
                        "rgba(255,255,255,0.35)",
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>


          {/* =================================================
              ORDER STATUS
          ================================================== */}
          <div className="px-6 sm:px-7 pt-7">

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.85,
              }}
              className="flex items-center justify-between mb-5"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-gray-400">
                  Order Journey
                </p>

                <h2 className="text-base font-black text-gray-900 mt-1">
                  What's happening next
                </h2>
              </div>

              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "#FFF8D6",
                  color: "#A17B00",
                }}
              >
                <Clock3 size={15} />
              </div>
            </motion.div>

            <div>
              {statuses.map(
                (status, index) => (
                  <StatusItem
                    key={status.title}
                    number={index + 1}
                    {...status}
                    last={
                      index ===
                      statuses.length - 1
                    }
                    delay={
                      1 +
                      index * 0.12
                    }
                  />
                )
              )}
            </div>
          </div>


          {/* =================================================
              ESTIMATE CARD
          ================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.55,
            }}
            className="mx-6 sm:mx-7 mb-5"
          >
            <div
              className="relative overflow-hidden rounded-2xl p-4"
              style={{
                background:
                  "linear-gradient(135deg, #FFFBEA, #FFFDF6)",
                border:
                  "1px solid rgba(255,215,0,0.25)",
              }}
            >
              <div
                className="absolute right-[-25px] top-[-25px] w-24 h-24 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.17), transparent 70%)",
                }}
              />

              <div className="relative flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "#111111",
                    color: "#FFD700",
                  }}
                >
                  <Clock3
                    size={18}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.15em] font-black text-gray-400">
                    Estimated Completion
                  </p>

                  <p className="text-sm font-black text-gray-900 mt-0.5">
                    24–36 hours after pickup
                  </p>
                </div>

                <div className="ml-auto">
                  <div
                    className="px-2.5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-wider"
                    style={{
                      background:
                        "#FFD700",
                      color: "#111111",
                    }}
                  >
                    On Track
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


          {/* =================================================
              CTA SECTION
          ================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.7,
            }}
            className="px-6 sm:px-7 pb-7"
          >

            {/* Track Order */}
            <motion.button
              whileHover={{
                y: -2,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                navigate(
                  "/my-orders"
                )
              }
              className="group w-full flex items-center justify-between p-2 rounded-[18px]"
              style={{
                background:
                  "linear-gradient(135deg, #111111, #1D1D1D)",
                boxShadow:
                  "0 12px 28px rgba(0,0,0,0.14)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                  style={{
                    background:
                      "rgba(255,215,0,0.11)",
                    color: "#FFD700",
                  }}
                >
                  <Package
                    size={17}
                  />
                </div>

                <div className="text-left">
                  <p className="text-[12px] font-black text-white">
                    Track your order
                  </p>

                  <p
                    className="text-[9px] mt-0.5"
                    style={{
                      color:
                        "rgba(255,255,255,0.4)",
                    }}
                  >
                    View live order updates
                  </p>
                </div>
              </div>

              <div
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                style={{
                  background:
                    "#FFD700",
                  color: "#111111",
                }}
              >
                <ArrowUpRight
                  size={16}
                />
              </div>
            </motion.button>


            {/* Secondary buttons */}
            <div className="grid grid-cols-2 gap-3 mt-3">

              <motion.button
                whileHover={{
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  navigate("/")
                }
                className="flex items-center justify-center gap-2 py-3.5 rounded-[17px] text-xs font-bold"
                style={{
                  background:
                    "#F8F8F8",
                  border:
                    "1px solid #EEEEEE",
                  color: "#444444",
                }}
              >
                <Home size={15} />
                Home
              </motion.button>

              <motion.button
                whileHover={{
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  navigate(
                    "/place-order"
                  )
                }
                className="flex items-center justify-center gap-2 py-3.5 rounded-[17px] text-xs font-bold"
                style={{
                  background:
                    "#FFF9DB",
                  border:
                    "1px solid rgba(255,215,0,0.3)",
                  color: "#876900",
                }}
              >
                <Package
                  size={15}
                />
                New Order
              </motion.button>
            </div>


            {/* Share + Support */}
            <div className="grid grid-cols-2 gap-3 mt-3">

              <motion.button
                whileHover={{
                  backgroundColor:
                    "#F4F4F4",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={
                  handleShare
                }
                className="flex items-center justify-center gap-2 py-3 rounded-[16px] text-[11px] font-semibold transition-colors"
                style={{
                  background:
                    "#FAFAFA",
                  border:
                    "1px solid #EEEEEE",
                  color: "#777777",
                }}
              >
                <Share2
                  size={14}
                />
                {copied
                  ? "Copied"
                  : "Share"}
              </motion.button>

              <motion.button
                whileHover={{
                  backgroundColor:
                    "#F4F4F4",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  window.open(
                    "tel:+91XXXXXXXXXX"
                  )
                }
                className="flex items-center justify-center gap-2 py-3 rounded-[16px] text-[11px] font-semibold transition-colors"
                style={{
                  background:
                    "#FAFAFA",
                  border:
                    "1px solid #EEEEEE",
                  color: "#777777",
                }}
              >
                <Phone
                  size={14}
                />
                Support
              </motion.button>
            </div>
          </motion.div>


          {/* =================================================
              TRUST FOOTER
          ================================================== */}
          <div
            className="px-6 py-5 text-center"
            style={{
              borderTop:
                "1px solid #F3F3F3",
            }}
          >
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <motion.div
                    key={star}
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay:
                        1.9 +
                        star * 0.06,
                    }}
                  >
                    <Sparkles
                      size={11}
                      fill="#FFD700"
                      color="#FFD700"
                    />
                  </motion.div>
                )
              )}
            </div>

            <p className="text-[9px] text-gray-400">
              Thank you for trusting
              Zusko with your laundry.
            </p>

            <p
              className="text-[8px] font-black tracking-[0.25em] uppercase mt-2"
              style={{
                color: "#D5D5D5",
              }}
            >
              ZUSKO · Laundry, Simplified.
            </p>
          </div>
        </div>


        {/* ===================================================
            SHARE TOAST
        ==================================================== */}
        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 8,
                scale: 0.95,
              }}
              className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold"
              style={{
                background:
                  "#111111",
                color: "#FFFFFF",
                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.22)",
              }}
            >
              <Check
                size={14}
                color="#FFD700"
              />

              Link copied successfully
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}