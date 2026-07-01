import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import API from "../config/api";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";

export default function RateOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const popupContent = {
    5: {
      emoji: "🎉",
      title: "You're Amazing!",
      message:
        "Thank you for your 5-star rating. We're delighted that you loved your Zusko experience!",
      color: "text-yellow-500",
      confetti: true,
      bg: "from-yellow-100 to-yellow-50"
    },
    4: {
      emoji: "😊",
      title: "Thank You!",
      message:
        "We're glad you had a great experience. We'll aim for 5 stars next time!",
      color: "text-green-500",
      confetti: true,
      bg: "from-green-100 to-green-50"
    },
    3: {
      emoji: "🙂",
      title: "Thanks for the Feedback",
      message: "Your feedback helps us improve our service every day.",
      color: "text-blue-500",
      confetti: false,
      bg: "from-blue-100 to-blue-50"
    },
    2: {
      emoji: "😔",
      title: "We're Sorry",
      message: "We didn't meet your expectations. We'll do better next time.",
      color: "text-orange-500",
      confetti: false,
      bg: "from-orange-100 to-orange-50"
    },
    1: {
      emoji: "💔",
      title: "We Apologize",
      message:
        "We're truly sorry about your experience. Thank you for helping us improve.",
      color: "text-red-500",
      confetti: false,
      bg: "from-red-100 to-red-50"
    },
  };

  const popup = popupContent[stars];

  const submitReview = async () => {
    if (!stars) {
      alert("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      await API.post(`/orders/${id}/rate`, {
        stars,
        review,
      });

      // 🎉 Confetti Blast
      if (popup.confetti) {
        const duration = 2500;
        const end = Date.now() + duration;

        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }

          confetti({
            particleCount: 10,
            startVelocity: 35,
            spread: 360,
            ticks: 70,
            origin: {
              x: Math.random(),
              y: Math.random() * 0.5,
            },
          });
        }, 180);
      }

      setShowPopup(true);

      setTimeout(() => {
        navigate("/my-orders");
      }, 2800);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 pt-24 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-center">Rate Your Experience</h1>

        <p className="text-gray-500 text-center mt-2">
          How was your Zusko service?
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-3 mt-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setStars(star)}>
              <Star
                size={40}
                fill={star <= stars ? "#FACC15" : "none"}
                color={star <= stars ? "#FACC15" : "#D1D5DB"}
              />
            </button>
          ))}
        </div>

        {/* Review */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tell us about your experience..."
          className="
            w-full
            mt-8
            border
            rounded-2xl
            p-4
            resize-none
            h-32
            outline-none
          "
        />

        <button
          onClick={submitReview}
          disabled={loading}
          className="
            w-full
            mt-6
            bg-black
            text-white
            py-4
            rounded-2xl
            font-semibold
            disabled:opacity-50
          "
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{
                scale: 0.6,
                opacity: 0,
                y: 40,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className={`bg-linear-to-br ${popup.bg} rounded-3xl p-10 max-w-md w-[90%] text-center shadow-2xl`}
            >
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                }}
                className="text-7xl"
              >
                {popup.emoji}
              </motion.div>

              <h2 className={`text-3xl font-bold mt-5 ${popup.color}`}>
                {popup.title}
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                {popup.message}
              </p>

              <div className="flex justify-center mt-6">
                {Array.from({ length: stars }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.4 + i * 0.08,
                    }}
                  >
                    <Star size={28} fill="#FACC15" color="#FACC15" />
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-sm text-gray-400">
                Redirecting to your orders...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
