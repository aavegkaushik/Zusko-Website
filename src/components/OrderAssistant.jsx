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
  PhoneCall,
  MessageCircle,
  Sparkles,
  Package,
  Clock,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Shirt,
  ShieldCheck,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";

// ============================================================
// MASTER OPTIONS LIST
// ============================================================
const MASTER_OPTIONS = [
  {
    id: "track_order",
    icon: "📍",
    label: "Track Live Order Status",
    desc: "Live stage, phase & delivery ETA",
    query: "Where is my order?",
  },
  {
    id: "call_support",
    icon: "📞",
    label: "Call Customer Care Support",
    desc: "Direct Helpline: +91 80044 11976",
    query: "Call customer care support",
    highlight: true,
  },
  {
    id: "clothes_list",
    icon: "🧺",
    label: "What clothes did I give?",
    desc: "List of items, services & fabric care",
    query: "What clothes did I give?",
  },
  {
    id: "bill_details",
    icon: "💳",
    label: "Bill & Payment Breakdown",
    desc: "Item subtotal, delivery, discounts & total",
    query: "Bill and payment details",
  },
  {
    id: "pickup_slot",
    icon: "🚚",
    label: "Pickup Slot & Address",
    desc: "Scheduled date, time slot & address",
    query: "Pickup slot and address",
  },
  {
    id: "rider_info",
    icon: "🛵",
    label: "Delivery Agent / Rider Info",
    desc: "Assigned partner details & arrival timing",
    query: "Rider details",
  },
  {
    id: "whatsapp_support",
    icon: "💬",
    label: "Chat on WhatsApp Support",
    desc: "Instant live chat with support team",
    query: "WhatsApp support",
  },
  {
    id: "switch_order",
    icon: "📋",
    label: "View / Switch All Orders",
    desc: "Browse other active & past orders",
    query: "Show all my orders",
  },
  {
    id: "cancel_order",
    icon: "❌",
    label: "Cancel this Order",
    desc: "Check cancellation eligibility & policy",
    query: "Can I cancel my order?",
  },
  {
    id: "fabric_safety",
    icon: "🛡️",
    label: "Fabric Safety & Guarantee",
    desc: "Gentle eco-wash & sanitization standards",
    query: "Is my fabric safe?",
  },
];

export default function OrderAssistant({
  order: initialOrder,
  onClose,
  initialOpen = true,
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(initialOpen);
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(initialOrder || null);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showOrderSelector, setShowOrderSelector] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, showOrderSelector]);

  // Load all user orders from backend
  useEffect(() => {
    let cancelled = false;

    const loadOrders = async () => {
      try {
        const [activeRes, historyRes] = await Promise.allSettled([
          API.get("/orders/active"),
          API.get("/orders/history"),
        ]);

        if (cancelled) return;

        const active =
          activeRes.status === "fulfilled" && Array.isArray(activeRes.value.data?.data)
            ? activeRes.value.data.data
            : [];
        const history =
          historyRes.status === "fulfilled" && Array.isArray(historyRes.value.data?.data)
            ? historyRes.value.data.data
            : [];

        const combined = [...active, ...history];
        const unique = Array.from(new Map(combined.map((o) => [o._id, o])).values());

        setOrdersList(unique);

        if (!initialOrder && unique.length > 0) {
          setSelectedOrder(unique[0]);
        }
      } catch (err) {
        console.error("Assistant order fetch error:", err);
      }
    };

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, [initialOrder]);

  // Update selected order if prop changes
  useEffect(() => {
    if (initialOrder) {
      setSelectedOrder(initialOrder);
    }
  }, [initialOrder]);

  // Status mapping helper
  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "accepted":
        return { label: "Order Placed / Accepted", color: "text-amber-700 bg-amber-50 border-amber-200" };
      case "picked-up":
        return { label: "Picked Up & In Transit", color: "text-blue-700 bg-blue-50 border-blue-200" };
      case "in-progress":
        return { label: "Fabric Care In Progress", color: "text-purple-700 bg-purple-50 border-purple-200" };
      case "ready-for-delivery":
        return { label: "Ready & Packed", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
      case "out-for-delivery":
        return { label: "Out for Delivery 🚚", color: "text-orange-700 bg-orange-50 border-orange-200" };
      case "completed":
        return { label: "Delivered Crisp ✨", color: "text-green-700 bg-green-50 border-green-200" };
      case "cancelled":
        return { label: "Cancelled", color: "text-red-700 bg-red-50 border-red-200" };
      default:
        return { label: status || "Order Placed", color: "text-gray-700 bg-gray-50 border-gray-200" };
    }
  };

  // Initial welcome greeting with options
  useEffect(() => {
    if (messages.length > 0) return;

    const customerName = user?.name || selectedOrder?.customerName || "there";
    const orderCode = selectedOrder?.orderId ? `#${selectedOrder.orderId}` : "";

    setMessages([
      {
        id: "msg-welcome-1",
        sender: "bot",
        text: `Hi ${customerName}! 👋\n\nI am your **Zusko AI Order Assistant**.\nSelect any option below or ask me any question about your laundry:`,
        type: "options_menu",
        options: MASTER_OPTIONS,
      },
      ...(selectedOrder
        ? [
            {
              id: "msg-welcome-order-card",
              sender: "bot",
              text: `Currently active context for Order **${orderCode}**:`,
              type: "order_snapshot",
              order: selectedOrder,
            },
          ]
        : []),
    ]);

    setSuggestions([
      "📞 Call Customer Care",
      "📍 Where is my order?",
      "🧺 Clothes list",
      "💳 Bill details",
      "🚚 Pickup Slot",
      "📋 Switch Order",
      "💬 WhatsApp",
    ]);
  }, [selectedOrder, user?.name, messages.length]);

  const canCancel = ["pending", "accepted"].includes(
    selectedOrder?.status?.toLowerCase()
  );

  // Gemini API Caller (if VITE_GEMINI_API_KEY is configured in .env)
  const callGeminiAPI = async (promptText) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return null;

    try {
      const orderContext = selectedOrder
        ? {
            orderId: selectedOrder.orderId,
            status: selectedOrder.status,
            total: selectedOrder.total,
            items: selectedOrder.items?.map((i) => `${i.name} (${i.qty})`),
            pickup: selectedOrder.pickup,
            address: selectedOrder.address,
            agent: selectedOrder.deliveryAgent,
          }
        : null;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the official Zusko AI Laundry Assistant. Zusko is India's premium doorstep laundry and dry cleaning brand.
Helpline Phone: +91 80044 11976.
Current Order Details: ${JSON.stringify(orderContext || "No active order selected yet")}
Answer politely, concisely and helpfully in easy-to-understand Hinglish or English. User query: ${promptText}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local engine:", err);
      return null;
    }
  };

  // Distinct Response Generator for Each Option
  const getResponseForOption = (optionId, rawText = "") => {
    const currentOrder = selectedOrder;
    const orderCode = currentOrder?.orderId ? `#${currentOrder.orderId}` : "your order";
    const statusMeta = getStatusLabel(currentOrder?.status);

    switch (optionId) {
      // 1. CALL CUSTOMER CARE SUPPORT
      case "call_support":
        return {
          text: `📞 **Zusko Customer Care Support Helpline**:\n\nOur customer care team is available **7 days a week (8:00 AM – 10:00 PM)** to assist you.\n\n• **Direct Phone Helpline**: +91 80044 11976\n• **Order Context**: ${orderCode} (${statusMeta.label})\n• **Assistance**: Live rider updates, address changes, special fabric requests & refunds.\n\nTap below to connect immediately:`,
          type: "call_support_card",
          order: currentOrder,
          followUpOptions: [
            { label: "📍 Track Order", query: "Where is my order?", id: "track_order" },
            { label: "💬 Chat on WhatsApp", query: "WhatsApp support", id: "whatsapp_support" },
            { label: "🧺 Clothes List", query: "What clothes did I give?", id: "clothes_list" },
            { label: "⚡ All Options", query: "Show all options", id: "all_options" },
          ],
        };

      // 2. WHATSAPP SUPPORT
      case "whatsapp_support":
        return {
          text: `💬 **Zusko WhatsApp Support**:\n\nYou can chat directly with our customer support team on WhatsApp for live rider coordination, photo verification, or special instructions regarding **${orderCode}**.\n\nTap the button below to start chat:`,
          type: "whatsapp_action",
          order: currentOrder,
          followUpOptions: [
            { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
            { label: "📍 Track Order", query: "Where is my order?", id: "track_order" },
            { label: "⚡ All Options", query: "Show all options", id: "all_options" },
          ],
        };

      // 3. TRACK LIVE ORDER STATUS
      case "track_order":
        if (currentOrder) {
          let etaMessage = "Estimated Turnaround: 24–36 hrs after pickup.";
          if (currentOrder.estimatedDelivery) {
            etaMessage = `Estimated Delivery: **${new Date(
              currentOrder.estimatedDelivery
            ).toLocaleString()}**`;
          }

          let phaseDetail = "";
          switch (currentOrder.status?.toLowerCase()) {
            case "pending":
            case "accepted":
              phaseDetail =
                "• **Status**: Placed & Confirmed\n• **Pickup**: Scheduled for your selected slot. Rider will be assigned before arrival.";
              break;
            case "picked-up":
              phaseDetail =
                "• **Status**: Clothes Picked Up\n• **Facility**: In transit to our fabric care unit for quality checking.";
              break;
            case "in-progress":
              phaseDetail =
                "• **Status**: In Laundry Processing\n• **Care**: Clothes are undergoing gentle wash, steam pressing or specialized dry clean.";
              break;
            case "ready-for-delivery":
              phaseDetail =
                "• **Status**: Ready & Bagged\n• **Packaging**: Cleaned, steam-ironed and sealed in dust-proof bags.";
              break;
            case "out-for-delivery":
              phaseDetail =
                "• **Status**: Out for Delivery 🚚\n• **Rider**: Delivery partner is on the way to your doorstep. Keep your phone handy!";
              break;
            case "completed":
              phaseDetail =
                "• **Status**: Delivered Successfully ✅\n• **Note**: We hope your clothes feel crisp and fresh!";
              break;
            case "cancelled":
              phaseDetail =
                "• **Status**: Cancelled ❌\n• **Note**: This order was cancelled.";
              break;
            default:
              phaseDetail = `• **Status**: ${currentOrder.status}`;
          }

          return {
            text: `📍 **Live Tracking for ${orderCode}**:\n\n${phaseDetail}\n\n⏱️ ${etaMessage}`,
            type: "tracking_card",
            order: currentOrder,
            followUpOptions: [
              { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
              { label: "🧺 Clothes List", query: "What clothes did I give?", id: "clothes_list" },
              { label: "🚚 Pickup Slot", query: "Pickup details", id: "pickup_slot" },
              { label: "💳 Bill Details", query: "Bill details", id: "bill_details" },
            ],
          };
        } else {
          return {
            text: `📍 **Zusko Live Order Tracking**:\n\nHere is how tracking works with Zusko:\n\n1. **Slot Booking**: Order placed & pickup slot confirmed.\n2. **Rider Arrival**: Partner assigned 30 min before arrival with laundry bags.\n3. **Fabric Care**: Inspection, wash & crisp steam press at facility.\n4. **Sealed Return**: Dust-proof delivery to your doorstep in 24-36 hrs.\n\nNo active order is currently selected. Tap below to view your orders:`,
            followUpOptions: [
              { label: "📋 View My Orders", query: "Show all my orders", id: "switch_order" },
              { label: "📞 Call Support", query: "Call customer care support", id: "call_support" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        }

      // 4. CLOTHES LIST
      case "clothes_list":
        if (currentOrder && currentOrder.items && currentOrder.items.length > 0) {
          const itemsText = currentOrder.items
            .map(
              (i, idx) =>
                `${idx + 1}. **${i.name}** ${i.variant ? `(${i.variant})` : ""} × **${i.qty}**\n   • Service: *${i.service || "Laundry"}* ${
                  i.careLevel === "premium" ? "✨ (Premium Care)" : ""
                }\n   • Price: ₹${i.price * i.qty}`
            )
            .join("\n\n");

          return {
            text: `🧺 **Clothes in ${orderCode}** (${currentOrder.items.length} items):\n\n${itemsText}\n\n💰 **Total Payable**: ₹${currentOrder.total}`,
            followUpOptions: [
              { label: "💳 Bill Breakdown", query: "Bill details", id: "bill_details" },
              { label: "📍 Track Order", query: "Where is my order?", id: "track_order" },
              { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
              { label: "🚚 Pickup Slot", query: "Pickup details", id: "pickup_slot" },
            ],
          };
        } else {
          return {
            text: `🧺 **Zusko Laundry & Fabric Care Categories**:\n\n• **Men**: Shirts, T-Shirts, Jeans, Trousers, Suits & Blazers\n• **Women**: Sarees, Kurtis, Dresses, Gowns & Tops\n• **Kids**: Uniforms, Frocks, Jackets & Sweaters\n• **Household**: Bedsheets, Quilts, Blankets, Curtains & Towels\n\nServices offered: Wash & Fold, Wash & Iron, Premium Dry Clean, Steam Ironing.`,
            followUpOptions: [
              { label: "📋 Check My Orders", query: "Show all my orders", id: "switch_order" },
              { label: "📞 Call Support", query: "Call customer care support", id: "call_support" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        }

      // 5. BILL & PAYMENT DETAILS
      case "bill_details":
        if (currentOrder) {
          const subtotal =
            currentOrder.originalTotal ||
            currentOrder.items?.reduce((sum, item) => sum + item.price * item.qty, 0) ||
            currentOrder.total;
          const deliveryFee = currentOrder.deliveryFee > 0 ? `₹${currentOrder.deliveryFee}` : "FREE";
          const handlingFee = currentOrder.handlingFee ? `₹${currentOrder.handlingFee}` : "₹0";
          const discountText =
            currentOrder.discount > 0 ? `-₹${currentOrder.discount}` : "None";

          const method = currentOrder.payment?.method || "Cash on Delivery (COD)";
          const paymentStatus =
            currentOrder.payment?.status?.toUpperCase() || "PENDING";

          return {
            text: `💳 **Bill Breakdown for ${orderCode}**:\n\n• **Items Subtotal**: ₹${subtotal}\n• **Delivery Charges**: ${deliveryFee}\n• **Handling Fee**: ${handlingFee}\n• **Coupon Discount**: ${discountText}\n\n💵 **Final Total**: **₹${currentOrder.total}**\n• **Payment Method**: ${method}\n• **Payment Status**: **${paymentStatus}**`,
            followUpOptions: [
              { label: "📍 Track Order", query: "Where is my order?", id: "track_order" },
              { label: "🧺 Clothes List", query: "What clothes did I give?", id: "clothes_list" },
              { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
              { label: "💬 WhatsApp Help", query: "WhatsApp support", id: "whatsapp_support" },
            ],
          };
        } else {
          return {
            text: `💳 **Zusko Pricing & Billing Policy**:\n\n• **Wash & Fold**: Starting ₹49/piece\n• **Wash & Iron**: Starting ₹69/piece\n• **Dry Clean**: Starting ₹120/piece\n• **Steam Iron**: Starting ₹30/piece\n• **Delivery**: Free pickup & delivery for standard orders.\n• **Payment Modes**: Cash on Delivery (COD), UPI, Cards & NetBanking accepted.`,
            followUpOptions: [
              { label: "📞 Call Support", query: "Call customer care support", id: "call_support" },
              { label: "📋 My Orders", query: "Show all my orders", id: "switch_order" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        }

      // 6. PICKUP SLOT & ADDRESS
      case "pickup_slot":
        if (currentOrder) {
          const pickupDate = currentOrder.pickup?.date || "Today";
          const pickupTime = currentOrder.pickup?.time || "Standard Slot";
          const fullAddress =
            currentOrder.address?.fullAddress || "Registered Doorstep Address";
          const city = currentOrder.address?.city || "";
          const pincode = currentOrder.address?.pincode ? `• ${currentOrder.address.pincode}` : "";

          return {
            text: `📅 **Pickup & Delivery Address**:\n\n• **Pickup Date**: ${pickupDate}\n• **Pickup Slot**: ${pickupTime}\n\n📍 **Address**:\n${fullAddress}\n${city} ${pincode}`,
            followUpOptions: [
              { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
              { label: "📍 Track Status", query: "Where is my order?", id: "track_order" },
              { label: "🛵 Rider Info", query: "Rider details", id: "rider_info" },
              { label: "❌ Cancel Order", query: "Can I cancel my order?", id: "cancel_order" },
            ],
          };
        } else {
          return {
            text: `🚚 **Zusko Pickup Slots**:\n\nWe provide 3 daily doorstep pickup slots 7 days a week:\n\n• **Morning**: 08:00 AM – 12:00 PM\n• **Afternoon**: 12:00 PM – 04:00 PM\n• **Evening**: 04:00 PM – 08:00 PM\n\nOur rider brings laundry bags directly to your home.`,
            followUpOptions: [
              { label: "📞 Call Support", query: "Call customer care support", id: "call_support" },
              { label: "📋 View Orders", query: "Show all my orders", id: "switch_order" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        }

      // 7. RIDER / DELIVERY AGENT INFO
      case "rider_info":
        if (currentOrder) {
          const agentName = currentOrder.deliveryAgent?.name;
          const agentPhone = currentOrder.deliveryAgent?.phone;

          if (agentName && agentPhone) {
            return {
              text: `🛵 **Assigned Delivery Partner**:\n\n• **Name**: ${agentName}\n• **Phone**: ${agentPhone}\n\nOur rider will carry branded laundry bags and will call you before arrival.`,
              followUpOptions: [
                { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
                { label: "💬 WhatsApp Help", query: "WhatsApp support", id: "whatsapp_support" },
                { label: "📍 Live Status", query: "Where is my order?", id: "track_order" },
              ],
            };
          }

          return {
            text: `🛵 **Pickup Partner Information**:\n\nA verified Zusko pickup partner is automatically assigned **30 minutes before your slot** (${
              currentOrder.pickup?.time || "scheduled slot"
            }).\n\nYou will receive their direct contact details via SMS and WhatsApp.`,
            followUpOptions: [
              { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
              { label: "🚚 Pickup Slot", query: "Pickup details", id: "pickup_slot" },
              { label: "📍 Track Status", query: "Where is my order?", id: "track_order" },
            ],
          };
        } else {
          return {
            text: `🛵 **Zusko Delivery Partners**:\n\nAll Zusko delivery riders are background-verified and trained in fabric handling. They carry branded laundry bags and always coordinate with you by phone prior to arrival.`,
            followUpOptions: [
              { label: "📞 Call Support", query: "Call customer care support", id: "call_support" },
              { label: "📋 My Orders", query: "Show all my orders", id: "switch_order" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        }

      // 8. CANCELLATION & POLICY
      case "cancel_order":
        if (currentOrder) {
          if (canCancel) {
            return {
              text: `⚠️ **Order Cancellation for ${orderCode}**:\n\nYour order is currently **${statusMeta.label}** and pickup has not occurred yet. You can cancel this order directly from the tracking page using the red **"Cancel Order"** button below, or talk to our customer care team right now.`,
              followUpOptions: [
                { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
                { label: "💬 Chat on WhatsApp", query: "WhatsApp support", id: "whatsapp_support" },
                { label: "Keep order active", query: "Where is my order?", id: "track_order" },
              ],
            };
          }

          return {
            text: `❌ **Cannot Cancel at this stage**:\n\nOrder ${orderCode} is already **${statusMeta.label}**. Once clothes are picked up and in our laundry processing facility, orders cannot be cancelled directly from the app.\n\nIf you have an urgent issue, our customer care team can assist you directly on Call or WhatsApp.`,
            followUpOptions: [
              { label: "📞 Call Customer Care Support", query: "Call customer care support", id: "call_support" },
              { label: "💬 WhatsApp Support", query: "WhatsApp support", id: "whatsapp_support" },
              { label: "📍 Track Order", query: "Where is my order?", id: "track_order" },
            ],
          };
        } else {
          return {
            text: `❌ **Zusko Cancellation Policy**:\n\n• **Before Pickup**: 100% Free cancellation anytime before the rider arrives.\n• **After Pickup**: In-processing orders cannot be cancelled once clothes reach the facility.\n• **Support Assistance**: If you need to make changes, our helpline (+91 80044 11976) is ready to help.`,
            followUpOptions: [
              { label: "📞 Call Support", query: "Call customer care support", id: "call_support" },
              { label: "📋 My Orders", query: "Show all my orders", id: "switch_order" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        }

      // 9. FABRIC SAFETY & GUARANTEE
      case "fabric_safety":
        return {
          text: `🛡️ **Zusko Pure Fabric Care Guarantee**:\n\n1. **Individual Batches**: We never mix clothes from different customers.\n2. **Eco Detergents**: Gentle bio-enzymes that preserve fabric fibers & colors.\n3. **Anti-Bacterial Rinse**: 99.9% germ sanitization on every cycle.\n4. **Temperature Control**: Steam pressing tailored to delicate silks, woolens & linens.\n\nYour clothes are 100% safe with us! ✨`,
          followUpOptions: [
            { label: "🧺 Clothes in my order", query: "What clothes did I give?", id: "clothes_list" },
            { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
            { label: "📍 Track Order", query: "Where is my order?", id: "track_order" },
          ],
        };

      // 10. SWITCH / VIEW ALL ORDERS
      case "switch_order":
        if (ordersList && ordersList.length > 0) {
          return {
            text: `Here are all the orders on your account (${ordersList.length} total). Tap any order below to view its live status and details:`,
            type: "order_list",
            orders: ordersList,
            followUpOptions: [
              { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
              { label: "💬 WhatsApp Help", query: "WhatsApp support", id: "whatsapp_support" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        } else {
          return {
            text: `No past orders were found on your account. If you just placed an order, please refresh or check back in a moment!`,
            followUpOptions: [
              { label: "📞 Call Support", query: "Call customer care support", id: "call_support" },
              { label: "⚡ All Options", query: "Show all options", id: "all_options" },
            ],
          };
        }

      // 11. ALL OPTIONS MENU
      case "all_options":
      default:
        return {
          text: `Here are all available assistance options for **${orderCode}**:\n\nSelect any option below to get instant details:`,
          type: "options_menu",
          options: MASTER_OPTIONS,
          followUpOptions: [
            { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
            { label: "📍 Track Status", query: "Where is my order?", id: "track_order" },
            { label: "📋 Switch Order", query: "Show all my orders", id: "switch_order" },
          ],
        };
    }
  };

  // Match raw text input to an Option ID
  const detectOptionIdFromText = (rawInput) => {
    const text = rawInput.toLowerCase().trim();

    if (
      text.includes("call") ||
      text.includes("customer care") ||
      text.includes("care support") ||
      text.includes("helpline") ||
      text.includes("dial") ||
      (text.includes("number") && text.includes("support"))
    ) {
      return "call_support";
    }

    if (text.includes("whatsapp")) {
      return "whatsapp_support";
    }

    if (
      text.includes("track") ||
      text.includes("where") ||
      text.includes("status") ||
      text.includes("kahan") ||
      text.includes("kab aayega") ||
      text.includes("progress") ||
      text.includes("eta")
    ) {
      return "track_order";
    }

    if (
      text.includes("item") ||
      text.includes("cloth") ||
      text.includes("kapde") ||
      text.includes("shirt") ||
      text.includes("pant") ||
      text.includes("saree") ||
      text.includes("kya kya") ||
      text.includes("quantity")
    ) {
      return "clothes_list";
    }

    if (
      text.includes("bill") ||
      text.includes("payment") ||
      text.includes("paid") ||
      text.includes("cod") ||
      text.includes("price") ||
      text.includes("amount") ||
      text.includes("total") ||
      text.includes("paise") ||
      text.includes("discount")
    ) {
      return "bill_details";
    }

    if (
      text.includes("pickup") ||
      text.includes("slot") ||
      text.includes("address") ||
      text.includes("pata") ||
      text.includes("schedule") ||
      text.includes("time")
    ) {
      return "pickup_slot";
    }

    if (
      text.includes("rider") ||
      text.includes("agent") ||
      text.includes("partner") ||
      text.includes("driver") ||
      text.includes("delivery boy") ||
      text.includes("kaun aayega")
    ) {
      return "rider_info";
    }

    if (
      text.includes("cancel") ||
      text.includes("cancellation") ||
      text.includes("refund") ||
      text.includes("hatao") ||
      text.includes("wapas")
    ) {
      return "cancel_order";
    }

    if (
      text.includes("safe") ||
      text.includes("fabric") ||
      text.includes("stain") ||
      text.includes("color") ||
      text.includes("detergent") ||
      text.includes("quality") ||
      text.includes("guarantee")
    ) {
      return "fabric_safety";
    }

    if (
      text.includes("all order") ||
      text.includes("switch order") ||
      text.includes("other order") ||
      text.includes("dusra order") ||
      text.includes("my orders") ||
      text.includes("mere order")
    ) {
      return "switch_order";
    }

    if (
      text.includes("option") ||
      text.includes("menu") ||
      text === "help" ||
      text.includes("saare option")
    ) {
      return "all_options";
    }

    return null;
  };

  const handleSend = async (customMessage, explicitOptionId = null) => {
    const message = customMessage || input;
    if (!message || !message.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessageObj = {
      id: userMsgId,
      sender: "user",
      text: message.trim(),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setInput("");
    setTyping(true);

    // 1. Identify option ID
    const optionId = explicitOptionId || detectOptionIdFromText(message);

    // 2. If option is identified, deliver specialized response
    if (optionId) {
      setTimeout(() => {
        const response = getResponseForOption(optionId, message);

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: response.text,
            type: response.type || "normal",
            order: response.order || selectedOrder,
            orders: response.orders || null,
            options: response.options || null,
            followUpOptions: response.followUpOptions || null,
          },
        ]);

        if (response.followUpOptions && response.followUpOptions.length > 0) {
          setSuggestions(response.followUpOptions.map((o) => o.label || o));
        }

        setTyping(false);
      }, 500);
      return;
    }

    // 3. If Gemini API is configured, call it for custom AI query
    const geminiReply = await callGeminiAPI(message);
    if (geminiReply) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: geminiReply,
          type: "normal",
          order: selectedOrder,
          followUpOptions: [
            { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
            { label: "📍 Track Order", query: "Where is my order?", id: "track_order" },
            { label: "⚡ All Options", query: "Show all options", id: "all_options" },
          ],
        },
      ]);
      setSuggestions([
        "📞 Call Customer Care",
        "📍 Track Order",
        "🧺 Clothes List",
        "⚡ All Options",
      ]);
      setTyping(false);
      return;
    }

    // 4. Conversational Greetings or Fallback with Menu
    setTimeout(() => {
      const lower = message.toLowerCase();
      let replyText = "";

      if (lower === "hi" || lower === "hello" || lower === "hey" || lower.includes("namaste")) {
        replyText = `Hello! 😊 I'm ready to assist with your laundry orders.\n\nCurrently viewing **#${
          selectedOrder?.orderId || "Current"
        }**. Please select one of the options below:`;
      } else if (lower.includes("thank") || lower.includes("shukriya")) {
        replyText = `You're very welcome! ❤️ It's our pleasure to keep your laundry fresh and hassle-free.\n\nLet me know if you need anything else!`;
      } else {
        replyText = `I understand you're asking about **"${message}"**.\n\nPlease choose one of the options below to get exact details:`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: replyText,
          type: "options_menu",
          options: MASTER_OPTIONS,
          order: selectedOrder,
          followUpOptions: [
            { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
            { label: "📍 Track Status", query: "Where is my order?", id: "track_order" },
            { label: "💬 WhatsApp", query: "WhatsApp support", id: "whatsapp_support" },
          ],
        },
      ]);

      setSuggestions([
        "📞 Call Customer Care",
        "📍 Track Status",
        "🧺 Clothes List",
        "💳 Bill Details",
        "⚡ All Options",
      ]);

      setTyping(false);
    }, 500);
  };

  const handleSelectOrder = (newOrder) => {
    setSelectedOrder(newOrder);
    setShowOrderSelector(false);

    const statusMeta = getStatusLabel(newOrder.status);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-switched-${Date.now()}`,
        sender: "bot",
        text: `Switched active context to Order **#${newOrder.orderId}** (${statusMeta.label}).\nTotal: ₹${newOrder.total} • ${newOrder.items?.length || 0} items.\n\nSelect an option below to proceed:`,
        type: "options_menu",
        options: MASTER_OPTIONS.slice(0, 6),
        order: newOrder,
        followUpOptions: [
          { label: "📞 Call Customer Care", query: "Call customer care support", id: "call_support" },
          { label: "📍 Track Status", query: "Where is my order?", id: "track_order" },
          { label: "🧺 Clothes List", query: "What clothes did I give?", id: "clothes_list" },
          { label: "💳 Bill Details", query: "Bill details", id: "bill_details" },
        ],
      },
    ]);
  };

  const handleCloseAssistant = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Floating Launch Bubble (when closed) */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#101010] text-[#FFD700] shadow-[0_10px_35px_rgba(0,0,0,0.35)] flex items-center justify-center border border-amber-400/40"
          aria-label="Open Zusko AI Assistant"
        >
          <Bot size={28} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FFD700] text-[9px] font-black text-black items-center justify-center">
              AI
            </span>
          </span>
        </motion.button>
      )}

      {/* Main Chat Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseAssistant}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 transition-opacity"
            />

            {/* Chat Box */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              className="fixed inset-x-0 bottom-0 sm:inset-auto sm:right-6 sm:bottom-6 w-full sm:w-[420px] md:w-[440px] h-[92vh] sm:h-[84vh] max-h-[800px] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div
                className="px-4 sm:px-5 py-3.5 flex items-center justify-between text-white shrink-0 shadow-md relative z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #0d0d0d 0%, #171717 60%, #1f1802 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFD700] to-[#F59E0B] p-0.5 shadow-sm">
                      <div className="w-full h-full rounded-[14px] bg-[#111111] flex items-center justify-center text-[#FFD700]">
                        <Bot size={20} />
                      </div>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#111111]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-extrabold text-sm text-white leading-tight">
                        Zusko Order Assistant
                      </h2>
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/20 text-[#FFD700] border border-amber-400/30">
                        Live AI
                      </span>
                    </div>

                    <p className="text-[11px] text-white/60 font-medium flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        {selectedOrder
                          ? `Context: #${selectedOrder.orderId}`
                          : "Ready to assist"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Quick Call Button in Header */}
                  <a
                    href="tel:+918004411976"
                    className="p-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-colors flex items-center justify-center border border-emerald-500/30"
                    title="Call Customer Care Support (+91 80044 11976)"
                    aria-label="Call Customer Care"
                  >
                    <PhoneCall size={14} />
                  </a>

                  {ordersList.length > 1 && (
                    <button
                      onClick={() => setShowOrderSelector((p) => !p)}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                      title="Switch Order"
                    >
                      <RefreshCw size={11} />
                      <span>Orders</span>
                    </button>
                  )}

                  <button
                    onClick={handleCloseAssistant}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    aria-label="Close Assistant"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Order Quick Selector Drawer */}
              <AnimatePresence>
                {showOrderSelector && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-amber-50/90 border-b border-amber-200/70 p-3 overflow-hidden shrink-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider">
                        Select an Order to Discuss:
                      </span>
                      <button
                        onClick={() => setShowOrderSelector(false)}
                        className="text-[10px] text-amber-800 font-bold"
                      >
                        Close
                      </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {ordersList.map((o) => {
                        const isCurrent = o._id === selectedOrder?._id;
                        return (
                          <button
                            key={o._id}
                            onClick={() => handleSelectOrder(o)}
                            className={`px-3 py-2 rounded-xl text-left flex-shrink-0 transition-all text-xs border ${
                              isCurrent
                                ? "bg-gray-950 text-white border-amber-400"
                                : "bg-white text-gray-800 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <p className="font-extrabold truncate">
                              #{o.orderId}
                            </p>
                            <p
                              className={`text-[10px] mt-0.5 ${
                                isCurrent ? "text-amber-400" : "text-gray-500"
                              }`}
                            >
                              ₹{o.total} • {o.status}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-4 bg-[#F8F9FA] space-y-3.5">
                {messages.map((message) => {
                  const isUser = message.sender === "user";

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-xl bg-gray-950 text-[#FFD700] flex items-center justify-center shrink-0 mr-2 mt-1 shadow-xs">
                          <Bot size={14} />
                        </div>
                      )}

                      <div
                        className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-[13px] leading-relaxed break-words shadow-xs ${
                          isUser
                            ? "bg-[#111111] text-white rounded-br-xs"
                            : "bg-white text-gray-800 border border-gray-100/90 rounded-tl-xs"
                        }`}
                      >
                        {/* Text rendering with bold markdown support */}
                        <div className="whitespace-pre-line space-y-1">
                          {message.text.split("\n").map((line, i) => {
                            const parts = line.split(/(\*\*.*?\*\*)/g);
                            return (
                              <p key={i}>
                                {parts.map((part, pIdx) => {
                                  if (part.startsWith("**") && part.endsWith("**")) {
                                    return (
                                      <strong
                                        key={pIdx}
                                        className={
                                          isUser
                                            ? "font-bold text-amber-300"
                                            : "font-black text-gray-950"
                                        }
                                      >
                                        {part.slice(2, -2)}
                                      </strong>
                                    );
                                  }
                                  return part;
                                })}
                              </p>
                            );
                          })}
                        </div>

                        {/* Interactive Options Menu Tiles */}
                        {message.type === "options_menu" && message.options && (
                          <div className="mt-3 space-y-1.5">
                            {message.options.map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => handleSend(opt.query, opt.id)}
                                className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all group ${
                                  opt.highlight
                                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 hover:border-emerald-400 hover:shadow-xs"
                                    : "bg-gray-50/80 hover:bg-amber-50/80 border-gray-200/80 hover:border-amber-300"
                                }`}
                              >
                                <span className="text-base shrink-0">{opt.icon}</span>
                                <div className="min-w-0 flex-1">
                                  <p
                                    className={`text-xs font-black leading-tight ${
                                      opt.highlight ? "text-emerald-950 font-black" : "text-gray-900"
                                    }`}
                                  >
                                    {opt.label}
                                  </p>
                                  {opt.desc && (
                                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                                      {opt.desc}
                                    </p>
                                  )}
                                </div>
                                <ChevronRight
                                  size={14}
                                  className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${
                                    opt.highlight ? "text-emerald-600" : "text-gray-400"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Dedicated "Call Customer Care Support" Card */}
                        {message.type === "call_support_card" && (
                          <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-teal-50/50 to-white border border-emerald-200 shadow-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Support Available (8 AM - 10 PM)
                              </span>
                              <span className="text-[10px] text-gray-400 font-bold">Helpline</span>
                            </div>

                            <p className="text-xs font-black text-gray-900 mb-2.5">
                              Connect directly with Zusko Customer Care:
                            </p>

                            <div className="space-y-2">
                              {/* Direct Dial Button */}
                              <a
                                href="tel:+918004411976"
                                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                              >
                                <Phone size={14} />
                                <span>Call Customer Care (+91 80044 11976)</span>
                              </a>

                              {/* WhatsApp Chat Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  window.open(
                                    `https://wa.me/918004411976?text=${encodeURIComponent(
                                      `Hi Zusko Support! I need assistance with Order #${
                                        selectedOrder?.orderId || ""
                                      }`
                                    )}`,
                                    "_blank"
                                  )
                                }
                                className="w-full py-2 px-4 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                              >
                                <MessageCircle size={13} className="text-emerald-400" />
                                <span>Chat on WhatsApp</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* WhatsApp Action Card */}
                        {message.type === "whatsapp_action" && (
                          <div className="mt-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                            <p className="text-[11px] font-bold text-emerald-950 mb-2">
                              Connect with our support team on WhatsApp:
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                window.open(
                                  `https://wa.me/918004411976?text=${encodeURIComponent(
                                    `Hi Zusko Support! I need assistance with Order #${
                                      selectedOrder?.orderId || ""
                                    }`
                                  )}`,
                                  "_blank"
                                )
                              }
                              className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                            >
                              <MessageCircle size={14} />
                              <span>Open WhatsApp Chat</span>
                            </button>
                          </div>
                        )}

                        {/* Interactive Order Snapshot Card */}
                        {message.type === "order_snapshot" && message.order && (
                          <div className="mt-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-extrabold text-xs text-gray-950">
                                Order #{message.order.orderId}
                              </span>
                              <span
                                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                                  getStatusLabel(message.order.status).color
                                }`}
                              >
                                {getStatusLabel(message.order.status).label}
                              </span>
                            </div>

                            <p className="text-[11px] text-gray-500">
                              {message.order.items?.length || 0} items • Amount:{" "}
                              <strong className="text-gray-900 font-bold">
                                ₹{message.order.total}
                              </strong>
                            </p>
                          </div>
                        )}

                        {/* Interactive Order List (Switch Order) */}
                        {message.type === "order_list" && message.orders && (
                          <div className="mt-3 space-y-1.5">
                            {message.orders.map((o) => (
                              <div
                                key={o._id}
                                onClick={() => handleSelectOrder(o)}
                                className="p-2.5 rounded-xl bg-gray-50 hover:bg-amber-50/70 border border-gray-200 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between"
                              >
                                <div>
                                  <p className="font-black text-xs text-gray-950">
                                    #{o.orderId}
                                  </p>
                                  <p className="text-[10px] text-gray-500 mt-0.5">
                                    {o.items?.length || 0} items • ₹{o.total} •{" "}
                                    <span className="font-semibold text-gray-800">
                                      {o.status}
                                    </span>
                                  </p>
                                </div>
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-1 rounded-lg flex items-center gap-0.5">
                                  Select <ChevronRight size={11} />
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Follow-up Quick Action Buttons attached to Bot Message */}
                        {message.followUpOptions && message.followUpOptions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap gap-1.5">
                            {message.followUpOptions.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => handleSend(opt.query || opt.label, opt.id)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                                  opt.id === "call_support"
                                    ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 font-black"
                                    : "bg-gray-100 hover:bg-amber-100 hover:text-amber-950 text-gray-700 border-gray-200/60"
                                }`}
                              >
                                {opt.label || opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Typing Dots Animation */}
                {typing && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gray-950 text-[#FFD700] flex items-center justify-center shrink-0">
                      <Bot size={14} />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs">
                      <div className="flex items-center gap-1">
                        {[0, 0.2, 0.4].map((delay, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay }}
                            className="w-1.5 h-1.5 rounded-full bg-gray-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Chips Bar */}
              {suggestions.length > 0 && (
                <div className="px-3 py-2 bg-white border-t border-gray-100 shrink-0">
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {suggestions.map((s, idx) => {
                      const isCall = s.includes("Call");
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSend(s)}
                          className={`whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full transition-colors shrink-0 border ${
                            isCall
                              ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold"
                              : "bg-gray-100 hover:bg-amber-100 hover:text-amber-900 text-gray-700 border-gray-200/60"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  {/* Quick All Options Button */}
                  <button
                    type="button"
                    onClick={() => handleSend("Show all options", "all_options")}
                    className="h-10 px-3 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs flex items-center gap-1 transition-colors shrink-0"
                    title="View All Options Menu"
                  >
                    <Sparkles size={13} className="text-amber-700" />
                    <span>Options</span>
                  </button>

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      selectedOrder
                        ? `Ask about Order #${selectedOrder.orderId}...`
                        : "Ask anything about your orders..."
                    }
                    className="flex-1 bg-gray-50 border border-gray-200 focus:border-amber-400 focus:bg-white rounded-full px-4 py-2 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                  />

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.9 }}
                    disabled={!input.trim()}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      input.trim()
                        ? "bg-[#101010] text-[#FFD700] shadow-md hover:bg-black"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Send size={15} />
                  </motion.button>
                </form>

                <div className="flex items-center justify-between mt-1.5 px-2 text-[10px] text-gray-400">
                  <span>Zusko AI • Tap any option or type freely</span>
                  <a
                    href="tel:+918004411976"
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-0.5"
                  >
                    <Phone size={10} /> Call Support
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
