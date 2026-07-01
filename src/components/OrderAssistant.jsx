import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  X,
  MapPin,
  CreditCard,
  Ban,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function OrderAssistant({ order }) {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const canCancel = ["pending"].includes(order.status);

  /* Initial Greeting */

  useEffect(() => {
    if (!order || messages.length) return;
    console.log(order);
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: `Hi ${order.customerName || "there"} 👋

I'm Zusko Assistant.

Order: ${order.orderId}

How can I help you today?`,
      },
    ]);
  }, [order, messages.length]);

  /* Auto Scroll */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const quickReplies = [
    {
      label: "📍 Track Order",
      value: "Where is my order?",
    },

    {
      label: "💳 Payment Help",
      value: "Payment issue",
    },

    ...(canCancel
      ? [
          {
            label: "❌ Cancel Order",
            value: "Can I cancel?",
          },
        ]
      : []),

    {
      label: "📞 Call Support",
      value: "Call support",
    },

    {
      label: "💬 WhatsApp",
      value: "WhatsApp support",
    },
  ];

  const generateBotReply = (message) => {
    const text = message.toLowerCase();

    /* Track Order */

    if (
      text.includes("track") ||
      text.includes("where") ||
      text.includes("status")
    ) {
      switch (order.status) {
        case "pending":
          return `📦 Your order has been placed successfully.

Current Status: Placed

Pickup is yet to begin.`;

        case "picked-up":
          return `📦 Your order has been received successfully.

Current Status: Picked Up

Service is yet to begin.`;

        case "in-progress":
          return `🧺 Your clothes are currently being processed by our team.

Current Status: In Progress`;

        case "ready-for-delivery":
          return `🎁 Great news!

Your order is packed and ready for delivery.`;

        case "out-for-delivery":
          return `🚚 Your order is out for delivery.

Please keep your phone available.

Order ID: ${order.orderId}`;

        case "completed":
          return `✅ Your order has already been delivered.

Thank you for choosing Zusko ❤️`;

        case "cancelled":
          return `❌ This order has been cancelled.`;

        default:
          return "I couldn't find the latest status.";
      }
    }

    /* Payment */

    if (
      text.includes("payment") ||
      text.includes("paid") ||
      text.includes("cod")
    ) {
      return `💳 Payment Details

Method: ${order.payment?.method || "N/A"}

Status: ${order.payment?.status || "N/A"}

Amount: ₹${order.total}`;
    }

    //   Pickup Details

    if (text.includes("pickup contact")) {
      return `Pickup Contact

Name: ${order.pickupContact?.name}

Phone: ${order.pickupContact?.phone}`;
    }

    /* Cancel */

    if (text.includes("cancel")) {
      if (order.status === "pending") {
        return `⚠️ Your order can still be cancelled.

Please contact support if you'd like to cancel it.`;
      }

      return `❌ Sorry, this order can no longer be cancelled because pickup has already been completed.`;

      return `❌ Sorry, cancellation is not available once the order has reached "${order.status}".`;
    }

    /* Delivery */

    if (text.includes("delivery") || text.includes("when")) {
      if (order.status === "completed") {
        return `✅ Your order was delivered successfully.`;
      }

      if (order.status === "out-for-delivery") {
        return `🚚 Your order is on the way.

Expected delivery:
Today.`;
      }

      return `📍 Delivery information will be available once your order is dispatched.`;
    }

    /* Pickup */

    if (text.includes("pickup")) {
      return `📅 Pickup Details

Date: ${order.pickup?.date || "N/A"}

Time: ${order.pickup?.time || "N/A"}`;
    }

    /* Address */

    if (text.includes("address")) {
      return `📍 Delivery Address

${order.address?.fullAddress}

${order.address?.city || ""}

${order.address?.pincode || ""}`;
    }

    /* Call */

    if (text.includes("call")) {
      window.location.href = "tel:+919999999999";

      return "📞 Connecting you to our support team...";
    }

    /* WhatsApp */

    if (text.includes("whatsapp")) {
      window.open(
        `https://wa.me/919999999999?text=Hi, I need help regarding Order ${order.orderId}`,
        "_blank",
      );

      return "💬 Opening WhatsApp support...";
    }

    /* Default */

    return `I'm sorry, I couldn't understand that.

You can ask me things like:

• Where is my order?
• Payment status
• Pickup details
• Delivery details
• Cancel order`;
  };

    const handleSend = async (customMessage) => {
      const message = customMessage || input;
      const botReply =
    generateBotReply(message);
      if (!message.trim()) return;

      if (
    botReply.includes("delivery")
  ) {
    setSuggestions([
      "Payment status",
      "Call support",
    ]);
  }
  else if (
    botReply.includes("Payment")
  ) {
    setSuggestions([
      "Track order",
      "Delivery details",
    ]);
  }
  else {
    setSuggestions([
      "Track order",
      "Pickup details",
      "Call support",
    ]);
  }

      /* User Message */

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "user",
          text: message,
        },
      ]);

      setInput("");

      /* Typing Animation */

      setTyping(true);

  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "bot",
        text: botReply,
      },
    ]);

    setTyping(false);
  }, 1200);
    };

  return (
    <>
      {/* Floating Bubble */}

      <motion.button
        initial={{
          scale: 0,
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          scale: {
            repeat: Infinity,
            duration: 2,
          },
        }}
        onClick={() => {
          setOpen(true);
          setHasUnread(false);
        }}
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-16
          h-16
          rounded-full
          bg-black
          text-white
          shadow-2xl
          flex
          items-center
          justify-center
        "
      >
        <Bot size={28} />

        {hasUnread && (
          <span
            className="
        absolute
        -top-1
        -right-1
        w-5
        h-5
        rounded-full
        bg-red-500
        text-white
        text-xs
        flex
        items-center
        justify-center
      "
          >
            1
          </span>
        )}
      </motion.button>

      {/* Chat Window */}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                fixed
                inset-0
                bg-black/40
                z-50
              "
              onClick={() => setOpen(false)}
            />

            {/* Chat */}

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 40,
              }}
              className="
fixed
inset-x-0
bottom-0

h-[85vh]

md:left-auto
md:right-6
md:bottom-6
md:w-[420px]
md:h-[80vh]
md:max-h-[750px]

bg-white
rounded-t-3xl
md:rounded-3xl
shadow-2xl
z-9999

flex
flex-col
overflow-hidden
"
            >
              {/* Header */}

              <div
                className="
                  sticky
    top-0
    z-20

    bg-black
    text-white

    px-5
    py-4

    flex
    items-center
    justify-between

    shrink-0
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Bot size={22} />
                  </div>

                  <div>
                    <h2 className="font-bold">Zusko Assistant</h2>

                    <p className="text-xs text-white/70">Online</p>
                  </div>
                </div>

                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Messages */}

              <div
                className="
flex-1
overflow-y-auto
px-4
py-5
bg-gray-50
"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                          max-w-[80%]
                          px-4
                          py-3
                          rounded-2xl
                          whitespace-pre-line
                          ${
                            message.sender === "user"
                              ? "bg-black text-white rounded-br-md"
                              : "bg-white shadow-sm rounded-bl-md"
                          }
                        `}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {/* Typing */}

                {typing && (
                  <div className="mb-4 flex justify-start">
                    <div
                      className="
                        bg-white
                        shadow-sm
                        px-4
                        py-3
                        rounded-2xl
                        rounded-bl-md
                      "
                    >
                      <div className="flex gap-1">
                        {[1, 2, 3].map((dot) => (
                          <motion.div
                            key={dot}
                            animate={{
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: dot * 0.2,
                            }}
                            className="
                                w-2
                                h-2
                                rounded-full
                                bg-gray-400
                              "
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}

              <div className="
    px-4
    py-3
    bg-white
    border-t
    shrink-0
  ">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleSend(reply.value)}
                      className="
                          whitespace-nowrap
                          text-sm
                          px-3
                          py-2
                          rounded-full
                          bg-gray-100
                          hover:bg-gray-200
                        "
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>

                {/* Input */}

                <div className="flex gap-2 mt-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything..."
                    className="
                      flex-1
                      border
                      rounded-full
                      px-4
                      py-3
                      outline-none
                    "
                  />

                  <button
                    onClick={() => handleSend()}
                    className="
                      bg-black
                      text-white
                      w-12
                      h-12
                      rounded-full
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              {suggestions.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSend(item)}
                      className="
          px-3
          py-2
          rounded-full
          bg-gray-100
          text-sm
        "
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
