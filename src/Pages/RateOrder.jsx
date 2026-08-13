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
  const [selectedSuggestions, setSelectedSuggestions] =
  useState([]);

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

  const reviewSuggestions = {
  5: [
    "Excellent laundry quality!",
    "Clothes came back fresh and clean.",
    "Pickup and delivery were super smooth.",
    "Very convenient service.",
    "Really loved the overall experience.",
    "Highly recommended!",
  ],

  4: [
    "Great overall experience.",
    "Laundry quality was really good.",
    "Pickup and delivery were smooth.",
    "Very convenient service.",
    "Happy with the overall experience.",
    "Would definitely use Zusko again.",
  ],

  3: [
    "The overall experience was decent.",
    "Laundry quality was satisfactory.",
    "Pickup and delivery were okay.",
    "There is some room for improvement.",
    "Overall, a satisfactory experience.",
    "The service can be improved further.",
  ],

  2: [
    "The service could be improved.",
    "The laundry quality was below expectations.",
    "Pickup or delivery needs improvement.",
    "The overall experience was not great.",
    "I expected better service.",
    "There is room for improvement.",
  ],

  1: [
    "I was not satisfied with the service.",
    "The experience did not meet my expectations.",
    "The laundry quality needs improvement.",
    "Pickup or delivery needs better management.",
    "I expected much better service.",
    "This experience needs significant improvement.",
  ],
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

  const toggleSuggestion = (suggestion) => {
  setSelectedSuggestions((prev) => {
    if (prev.includes(suggestion)) {
      return prev.filter(
        (item) => item !== suggestion
      );
    }

    return [...prev, suggestion];
  });

  setReview((current) => {
    if (current.includes(suggestion)) {
      return current
        .replace(suggestion, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    return current
      ? `${current} ${suggestion}`
      : suggestion;
  });
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

        <AnimatePresence>
  {stars > 0 && (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-3">

        <div>
          <h3 className="font-semibold text-gray-900">
            Quick Review
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            Tap on anything that describes your experience
          </p>
        </div>

        <span className="text-xs text-gray-400">
          Optional
        </span>

      </div>

      <div className="flex flex-wrap gap-2">

        {reviewSuggestions[stars].map(
          (suggestion, index) => {

            const selected =
              selectedSuggestions.includes(
                suggestion
              );

            return (
              <motion.button
                key={suggestion}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.04,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() =>
                  toggleSuggestion(
                    suggestion
                  )
                }
                className={`px-4 py-2.5 rounded-full text-sm border transition-all ${
                  selected
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {selected && (
                  <span className="mr-1">
                    ✓
                  </span>
                )}

                {suggestion}
              </motion.button>
            );
          }
        )}

      </div>
    </motion.div>
  )}
</AnimatePresence>

        {/* Review */}
        <div className="relative mt-6">

  <textarea
    value={review}
    maxLength={500}
    onChange={(e) =>
      setReview(e.target.value)
    }
    placeholder={
      stars
        ? "Tell us about your experience..."
        : "Select a rating first..."
    }
    disabled={!stars}
    className="
      w-full
      border
      border-gray-200
      rounded-2xl
      p-4
      pb-10
      resize-none
      h-36
      outline-none
      transition
      focus:border-black
      focus:ring-2
      focus:ring-black/10
      disabled:bg-gray-50
      disabled:cursor-not-allowed
    "
  />

  <span className="absolute bottom-3 right-4 text-xs text-gray-400">
    {review.length}/500
  </span>

</div>

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
