import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { Search, X, Shirt, Baby, Home, Sparkles } from "lucide-react";

const categories = {
  Men: {
    icon: <Shirt size={18} />,
    items: [
      { name: "Shirt", basePrice: 20 },
      { name: "T-Shirt", basePrice: 15 },
      { name: "Jeans", basePrice: 40 },
      { name: "Trousers", basePrice: 35 },
      { name: "Shorts", basePrice: 25 },
      { name: "Kurta", basePrice: 30 },
      { name: "Blazer", basePrice: 80 },
      { name: "Suit (2 Piece)", basePrice: 120 },
      { name: "Suit (3 Piece)", basePrice: 150 },
      { name: "Jacket", basePrice: 70 },
      { name: "Sweater", basePrice: 50 },
      { name: "Hoodie", basePrice: 45 },
      { name: "Innerwear", basePrice: 10 },
    ],
  },
  Women: {
    icon: <Sparkles size={18} />,
    items: [
      { name: "Kurti", basePrice: 30 },
      { name: "Leggings", basePrice: 20 },
      { name: "Saree (Normal)", basePrice: 80 },
      { name: "Saree (Heavy)", basePrice: 120 },
      { name: "Blouse", basePrice: 25 },
      { name: "Top", basePrice: 25 },
      { name: "Dress", basePrice: 60 },
      { name: "Gown", basePrice: 100 },
      { name: "Dupatta", basePrice: 20 },
      { name: "Skirt", basePrice: 35 },
      { name: "Jacket", basePrice: 70 },
      { name: "Sweater", basePrice: 50 },
    ],
  },
  Kids: {
    icon: <Baby size={18} />,
    items: [
      { name: "Kids Shirt", basePrice: 10 },
      { name: "Kids T-Shirt", basePrice: 8 },
      { name: "Kids Jeans", basePrice: 20 },
      { name: "Kids Shorts", basePrice: 15 },
      { name: "School Uniform", basePrice: 25 },
      { name: "Kids Jacket", basePrice: 30 },
      { name: "Kids Sweater", basePrice: 25 },
      { name: "Frock", basePrice: 20 },
    ],
  },
  Household: {
    icon: <Home size={18} />,
    items: [
      { name: "Bedsheet (Single)", basePrice: 40 },
      { name: "Bedsheet (Double)", basePrice: 50 },
      { name: "Blanket", basePrice: 80 },
      { name: "Quilt/Rajai", basePrice: 120 },
      { name: "Pillow Cover", basePrice: 10 },
      { name: "Curtains (Light)", basePrice: 60 },
      { name: "Curtains (Heavy)", basePrice: 100 },
      { name: "Sofa Cover", basePrice: 90 },
      { name: "Towel", basePrice: 15 },
      { name: "Carpet (Small)", basePrice: 100 },
      { name: "Carpet (Large)", basePrice: 200 },
    ],
  },
};

const services = [
  { name: "Wash & Fold", multiplier: 0.8 },
  { name: "Wash & Iron", multiplier: 1 },
  { name: "Dry Clean", multiplier: 3 },
  { name: "Steam Iron", multiplier: 0.7 },
  // { name: "Premium Laundry", multiplier: 2 },
];

export default function BookLaundry() {
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedService, setSelectedService] = useState("Wash & Iron");
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const getSmartPlaceholders = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return ["Search Shirt...", "Search T-Shirt...", "Search Jeans..."];
    } else if (hour < 18) {
      return ["Search Kurti...", "Search Saree...", "Search Dress..."];
    } else {
      return ["Search Jacket...", "Search Sweater...", "Search Blanket..."];
    }
  };
  const placeholders = getSmartPlaceholders();

  const { cart, addItem, increaseQty, decreaseQty } = useContext(CartContext);

  const getItemQty = (item) => {
    const found = cart.find(
      (i) => i.name === item.name && i.service === selectedService,
    );
    return found ? found.qty : 0;
  };

  const getPrice = (item) => {
    const service = services.find((s) => s.name === selectedService);
    return Math.round(item.basePrice * service.multiplier);
  };

  const filteredItems = categories[selectedCategory].items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const currentItems =
    search.length > 0 ? filteredItems : categories[selectedCategory].items;

  useEffect(() => {
    const current = placeholders[index];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + 1));
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length - 1));
      }, 40);
    }

    // pause before deleting
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 800);
    }

    // move to next word
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen mt-20 top-10 bg-linear-to-br from-yellow-50 via-white to-yellow-100">
      {/* 🔥 SEARCH BAR */}
      <div className="top-20 z-40 px-4 py-8 bg-transparent">
        <div className="relative max-w-xl mx-auto">
          {/* 🔍 ICON */}
          <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />

          {/* INPUT */}
          <input
            type="text"
            placeholder=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
    w-full
    h-14
    pl-13 pr-9 py-2
    rounded-full
    bg-white
    text-sm
    shadow-sm
    border border-gray-200
    outline-none
    focus:ring-2 focus:ring-yellow-400
  "
          />

          {/* 🔥 Animated Placeholder Overlay */}
          {!search && (<div className="absolute left-13 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-sm flex items-center gap-1">
            <span className={`transition-opacity duration-300`}>{text}</span>

            {/* Blinking Cursor */}
            <span className="text-gray-500">{showCursor ? "|" : ""}</span>
          </div>)}

          {/* ✖ CLEAR */}
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pt-5 max-w-2xl mx-auto">
        {/* 🔥 CATEGORY */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {Object.keys(categories).map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                setSelectedCategory(cat);
                setSearch("");
              }}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "bg-white border"
              }`}
            >
              <span>{categories[cat].icon}</span>
              {cat}
            </motion.button>
          ))}
        </div>

        {/* 🔥 SERVICES */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {services.map((service) => (
            <motion.button
              key={service.name}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedService(service.name)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium ${
                selectedService === service.name
                  ? service.name === "Premium Laundry"
                    ? "bg-linear-to-r from-yellow-400 to-yellow-600 text-black shadow-lg"
                    : "bg-black text-white"
                  : "bg-white border"
              }`}
            >
              {service.name === "Premium Laundry" ? "✨ Premium" : service.name}
            </motion.button>
          ))}
        </div>

        {/* 🔥 ITEMS */}
        <div className="space-y-4">
          {currentItems.map((item, index) => {
            const qty = getItemQty(item);
            const price = getPrice(item);

            return (
              <motion.div
                key={selectedCategory + "-" + item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="bg-white rounded-3xl p-4 shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{price} • {selectedService}
                  </p>
                </div>

                {qty === 0 ? (
                  <button
                    onClick={() =>
                      addItem({
                        ...item,
                        price,
                        service: selectedService,
                        category: selectedCategory,
                      })
                    }
                    className="bg-yellow-400 px-5 py-2 rounded-full font-semibold"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-4 bg-black text-white px-4 py-2 rounded-full">
                    <button
                      onClick={() =>
                        decreaseQty({ ...item, service: selectedService })
                      }
                    >
                      −
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() =>
                        increaseQty({ ...item, service: selectedService })
                      }
                    >
                      +
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}