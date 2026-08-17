import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Shirt,
  Sparkles,
  Truck,
  MapPin,
  Navigation,
  Clock,
  Zap,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  PackageCheck,
  Search,
  ChevronDown,
  WashingMachine,
  CircleCheck,
  Phone,
  Star,
  Building2,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";

import { FaBuilding } from "react-icons/fa";
import {
  TbIroningSteamFilled,
  TbIroningFilled,
} from "react-icons/tb";

import cities from "../data/cities";
import cityBg from "../assets/city.jpg";
import CityComingSoon from "./CityComingSoon";

// =========================================================
// ANIMATION VARIANTS
// =========================================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

// =========================================================
// SERVICE ICONS
// =========================================================

const serviceIcons = {
  "Wash & Fold": Shirt,
  "Dry Cleaning": Sparkles,
  "Wash & Iron": TbIroningFilled,
  "Pickup & Delivery": Truck,
  "Steam Ironing": TbIroningSteamFilled,
  "Commercial Laundry": FaBuilding,
};

// =========================================================
// SERVICE DESCRIPTIONS
// =========================================================

const serviceDescriptions = {
  "Wash & Fold":
    "Everyday clothes professionally washed, dried and neatly folded.",

  "Dry Cleaning":
    "Careful cleaning for delicate, premium and special garments.",

  "Wash & Iron":
    "Freshly washed clothes finished with a clean, crisp ironing.",

  "Pickup & Delivery":
    "Convenient doorstep pickup and delivery handled by Zusko.",

  "Steam Ironing":
    "Professional steam ironing for a fresh, polished finish.",

  "Commercial Laundry":
    "Reliable laundry solutions for businesses and bulk requirements.",
};

// =========================================================
// HOW IT WORKS
// =========================================================

const howItWorks = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book a Pickup",
    description:
      "Choose your services and schedule a convenient pickup.",
  },
  {
    number: "02",
    icon: Truck,
    title: "We Pick Up",
    description:
      "Our pickup partner collects your clothes from your doorstep.",
  },
  {
    number: "03",
    icon: WashingMachine,
    title: "We Clean",
    description:
      "Your clothes are processed according to the selected service.",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "We Deliver",
    description:
      "Fresh, clean clothes are delivered back to your doorstep.",
  },
];

// =========================================================
// WHY ZUSKO
// =========================================================

const whyZusko = [
  {
    icon: Truck,
    title: "Doorstep Pickup",
    description:
      "No need to carry laundry around. We collect it from your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Focused",
    description:
      "Your clothes are handled with care throughout the cleaning process.",
  },
  {
    icon: PackageCheck,
    title: "Secure Handling",
    description:
      "Orders are carefully managed from pickup to final delivery.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Reliable turnaround times designed around your convenience.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Partners",
    description:
      "We work with local laundry partners to deliver dependable service.",
  },
  {
    icon: Phone,
    title: "Customer Support",
    description:
      "Need help with an order? Our support team is here to assist.",
  },
];

// =========================================================
// FAQ
// =========================================================

const faqs = [
  {
    question: "Does Zusko provide pickup and delivery in this city?",
    answer:
      "Yes. If this city is operational on Zusko, pickup and delivery are available in the areas listed on this page.",
  },
  {
    question: "Which areas do you currently cover?",
    answer:
      "You can find the currently supported localities in the Areas We Cover section above. Coverage may expand as Zusko grows.",
  },
  {
    question: "How long does laundry service take?",
    answer:
      "The expected turnaround time for this city is shown in the Delivery Promise section. Actual turnaround can vary depending on the selected service and order.",
  },
  {
    question: "What services are available?",
    answer:
      "Available services are listed in the Services Available section. The exact services depend on the operational configuration for this city.",
  },
  {
    question: "Can I request service if my area is not listed?",
    answer:
      "Yes. You can contact Zusko and request service for your locality. We can evaluate availability and future coverage.",
  },
  {
    question: "How can I schedule a pickup?",
    answer:
      "Click the Schedule Pickup or Book a Pickup button on this page to continue to the booking flow.",
  },
];

// =========================================================
// COMPONENT
// =========================================================

export default function CityAvailability() {
  const { city } = useParams();
  const navigate = useNavigate();

  const [openFaq, setOpenFaq] = useState(null);

  // =========================================================
  // CITY DATA
  // =========================================================

  const cityKey = city?.toLowerCase();
  const cityData = cities[cityKey];

  // =========================================================
  // DOCUMENT TITLE
  // =========================================================

  useEffect(() => {
    if (cityData?.name) {
      document.title = `Laundry Service in ${cityData.name} | Zusko`;
    }
  }, [cityData]);

  // =========================================================
  // INVALID CITY
  // =========================================================

  if (!cityData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-100 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-yellow-600" />
          </div>

          <h2 className="text-2xl font-black mt-5 text-gray-900">
            City Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            We couldn't find the city you're looking for.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
          >
            Go Home
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // COMING SOON
  // =========================================================

  if (cityData.operational === false) {
    return <CityComingSoon cityName={cityData.name} />;
  }

  // =========================================================
  // CTA HANDLERS
  // =========================================================

  const handleBooking = () => {
    navigate("/place-order");
  };

  const handleBusiness = () => {
    navigate("/for-business");
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="bg-white min-h-screen mt-20 overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[680px] lg:min-h-[720px] flex items-center overflow-hidden">

        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cityBg})`,
          }}
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

        {/* Decorative Glow */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-yellow-400 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-48 -left-40 w-[450px] h-[450px] rounded-full bg-yellow-500/10 blur-3xl"
        />

        {/* Hero Content */}

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">

            {/* LEFT */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={container}
              className="text-center lg:text-left"
            >

              {/* Location Badge */}

              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <MapPin
                    size={15}
                    className="text-yellow-400"
                  />

                  Serving {cityData.name}
                </span>
              </motion.div>

              {/* Heading */}

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white"
              >
                Premium Laundry
                <br />

                <span className="text-yellow-400">
                  & Dry Cleaning
                </span>

                <br />

                in {cityData.name}
              </motion.h1>

              {/* Description */}

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200 max-w-2xl mx-auto lg:mx-0"
              >
                Reliable doorstep pickup and delivery laundry services,
                powered by trusted local Zusko partners.
              </motion.p>

              {/* CTA */}

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <button
                  onClick={handleBooking}
                  className="group inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-7 py-4 rounded-2xl shadow-xl hover:shadow-yellow-400/20 transition-all active:scale-[0.98]"
                >
                  Book a Pickup

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button
                  onClick={handleBusiness}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 backdrop-blur text-white hover:bg-white hover:text-black px-7 py-4 rounded-2xl font-bold transition-all"
                >
                  <Building2 size={18} />
                  Business Solutions
                </button>
              </motion.div>

              {/* Trust Strip */}

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-3"
              >
                {[
                  "Doorstep Pickup",
                  "Quality Focused",
                  "Secure Handling",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-200"
                  >
                    <CircleCheck
                      size={16}
                      className="text-yellow-400"
                    />

                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT FLOATING CARD */}

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="hidden lg:block"
            >
              <div className="relative max-w-md ml-auto">

                {/* Glow */}

                <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" />

                {/* Card */}

                <div className="relative bg-white/95 backdrop-blur-xl rounded-[30px] p-7 shadow-2xl border border-white/50">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Service Area
                      </p>

                      <h3 className="text-2xl font-black text-gray-900 mt-1">
                        {cityData.name}
                      </h3>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                      <MapPin className="text-yellow-600" />
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <CheckCircle2
                          className="text-green-600"
                          size={21}
                        />
                      </div>

                      <div>
                        <p className="font-bold text-gray-900">
                          Pickup available
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          Serving selected areas
                        </p>
                      </div>
                    </div>
                  </div>

                  {cityData.deliveryTime && (
                    <div className="mt-3 p-4 rounded-2xl bg-yellow-50 border border-yellow-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                          <Clock
                            size={20}
                            className="text-black"
                          />
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Expected turnaround
                          </p>

                          <p className="font-black text-gray-900">
                            {cityData.deliveryTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleBooking}
                    className="w-full mt-5 bg-black hover:bg-gray-800 text-yellow-400 font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition"
                  >
                    Schedule Pickup
                    <ArrowRight size={17} />
                  </button>

                  <p className="text-center text-[11px] text-gray-400 mt-3">
                    Convenient doorstep service
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Fade */}

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* =====================================================
          WHY ZUSKO
      ===================================================== */}

      <section className="py-20 lg:py-24 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full">
              <Sparkles size={14} />
              Why Zusko
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
              Laundry made
              <span className="text-yellow-500">
                {" "}simple
              </span>
            </h2>

            <p className="mt-4 text-gray-500 leading-relaxed">
              From pickup to delivery, Zusko is designed to make
              laundry more convenient for customers in {cityData.name}.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {whyZusko.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={card}
                  whileHover={{
                    y: -7,
                  }}
                  className="group p-6 rounded-3xl border border-gray-100 bg-white hover:border-yellow-200 hover:shadow-xl hover:shadow-yellow-100/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-yellow-50 group-hover:bg-yellow-400 flex items-center justify-center transition-colors">
                    <Icon
                      size={22}
                      className="text-yellow-600 group-hover:text-black transition-colors"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      {cityData.services?.length > 0 && (
        <section className="py-20 lg:py-24 bg-gray-50">

          <div className="max-w-6xl mx-auto px-6">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-5"
            >
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-yellow-600 bg-yellow-100 px-4 py-2 rounded-full">
                  <Shirt size={14} />
                  Our Services
                </span>

                <h2 className="mt-5 text-3xl md:text-4xl font-black text-gray-900">
                  Services available in{" "}
                  <span className="text-yellow-500">
                    {cityData.name}
                  </span>
                </h2>

                <p className="mt-3 text-gray-500 max-w-2xl">
                  Choose the service that works best for your clothes
                  and your schedule.
                </p>
              </div>

              <button
                onClick={handleBooking}
                className="hidden md:inline-flex items-center gap-2 font-bold text-gray-900 hover:text-yellow-600 transition"
              >
                View all services
                <ArrowRight size={17} />
              </button>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {cityData.services.map((service) => {
                const Icon = serviceIcons[service] || Shirt;

                return (
                  <motion.div
                    key={service}
                    variants={card}
                    whileHover={{
                      y: -7,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-100/40 transition-all"
                  >
                    {/* Background Decoration */}

                    <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-yellow-50 group-hover:bg-yellow-100 transition-colors" />

                    <div className="relative">

                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-100 group-hover:bg-yellow-400 flex items-center justify-center transition-colors">
                          <Icon
                            className="w-7 h-7 text-yellow-600 group-hover:text-black transition-colors"
                          />
                        </div>

                        <ArrowRight
                          size={18}
                          className="text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all"
                        />
                      </div>

                      <h3 className="mt-6 text-xl font-black text-gray-900">
                        {service}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-gray-500 min-h-[42px]">
                        {serviceDescriptions[service] ||
                          `Professional ${service.toLowerCase()} with quality-focused handling.`}
                      </p>

                      <button
                        onClick={handleBooking}
                        className="mt-5 text-sm font-bold text-gray-900 group-hover:text-yellow-600 transition-colors"
                      >
                        Book this service →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-8 text-center md:hidden">
              <button
                onClick={handleBooking}
                className="inline-flex items-center gap-2 font-bold text-gray-900"
              >
                View all services
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="py-20 lg:py-24 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full">
              <Zap size={14} />
              Simple Process
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-black text-gray-900">
              How Zusko works
            </h2>

            <p className="mt-4 text-gray-500">
              Getting your laundry cleaned is just a few simple steps.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-12 grid md:grid-cols-4 gap-6"
          >
            {howItWorks.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  variants={card}
                  className="relative text-center"
                >
                  {/* Connector */}

                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[62%] w-[76%] border-t border-dashed border-gray-200" />
                  )}

                  <div className="relative mx-auto w-16 h-16 rounded-2xl bg-black flex items-center justify-center shadow-xl">
                    <Icon
                      size={25}
                      className="text-yellow-400"
                    />

                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 text-black text-[10px] font-black flex items-center justify-center">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-black text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          AREAS
      ===================================================== */}

      {cityData.areas?.length > 0 && (
        <section className="py-20 lg:py-24 bg-gray-50">

          <div className="max-w-6xl mx-auto px-6">

            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">

              {/* LEFT */}

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:sticky lg:top-28"
              >
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-yellow-600 bg-yellow-100 px-4 py-2 rounded-full">
                  <Navigation size={14} />
                  Service Areas
                </span>

                <h2 className="mt-5 text-3xl md:text-4xl font-black text-gray-900">
                  Areas we cover in{" "}
                  <span className="text-yellow-500">
                    {cityData.name}
                  </span>
                </h2>

                <p className="mt-4 text-gray-500 leading-relaxed">
                  We currently provide pickup and delivery services
                  across the following locations.
                </p>

                <div className="mt-7 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                      <MapPin
                        size={19}
                        className="text-yellow-600"
                      />
                    </div>

                    <div>
                      <p className="font-black text-gray-900">
                        Don't see your area?
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Request service for your locality.
                      </p>

                      <a
                        href="mailto:info@zusko.in?subject=Service%20Area%20Request"
                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-yellow-600 hover:text-yellow-700"
                      >
                        Request service
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT */}

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.1,
                }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {cityData.areas.map((area, index) => (
                  <motion.div
                    key={area}
                    variants={card}
                    whileHover={{
                      y: -5,
                    }}
                    className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-5 hover:border-yellow-300 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 shrink-0 rounded-xl bg-yellow-50 group-hover:bg-yellow-400 flex items-center justify-center transition-colors">
                        <MapPin
                          size={20}
                          className="text-yellow-600 group-hover:text-black transition-colors"
                        />
                      </div>

                      <div>
                        <h3 className="font-black text-gray-900">
                          {area}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          Pickup & delivery available
                        </p>
                      </div>
                    </div>

                    <span className="absolute right-4 top-4 text-[10px] font-black text-gray-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          DELIVERY PROMISE
      ===================================================== */}

      {cityData.deliveryTime && (
        <section className="py-20 lg:py-24 bg-white">

          <div className="max-w-6xl mx-auto px-6">

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[34px] bg-black p-8 md:p-10 lg:p-12"
            >

              {/* Glow */}

              <div className="absolute -right-32 -top-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />

              <div className="absolute -left-20 -bottom-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />

              <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-10 items-center">

                <div>

                  {cityData.deliveryTime.includes("24") && (
                    <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-bold">
                      <Zap size={13} />
                      Express turnaround available
                    </div>
                  )}

                  <h2 className="mt-5 text-3xl md:text-4xl font-black text-white">
                    Fast & reliable laundry service
                  </h2>

                  <p className="mt-4 text-gray-400 max-w-2xl leading-relaxed">
                    We aim to provide a convenient laundry experience
                    with dependable turnaround and doorstep service
                    across {cityData.name}.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-200 px-4 py-2.5 rounded-xl text-sm">
                      <Truck
                        size={16}
                        className="text-yellow-400"
                      />
                      Doorstep Pickup
                    </div>

                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-200 px-4 py-2.5 rounded-xl text-sm">
                      <PackageCheck
                        size={16}
                        className="text-yellow-400"
                      />
                      Secure Handling
                    </div>

                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-200 px-4 py-2.5 rounded-xl text-sm">
                      <ShieldCheck
                        size={16}
                        className="text-yellow-400"
                      />
                      Quality Focused
                    </div>
                  </div>
                </div>

                <div className="lg:min-w-[260px]">
                  <div className="bg-white rounded-3xl p-6 text-center shadow-2xl">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center">
                      <Clock
                        size={27}
                        className="text-black"
                      />
                    </div>

                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-5">
                      Turnaround Time
                    </p>

                    <p className="text-3xl font-black text-gray-900 mt-2">
                      {cityData.deliveryTime}
                    </p>

                    <button
                      onClick={handleBooking}
                      className="w-full mt-5 bg-black hover:bg-gray-800 text-yellow-400 py-3.5 rounded-xl font-black transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="py-20 lg:py-24 bg-gray-50">

        <div className="max-w-4xl mx-auto px-6">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-yellow-600 bg-yellow-100 px-4 py-2 rounded-full">
              <Search size={14} />
              FAQ
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-black text-gray-900">
              Frequently asked questions
            </h2>

            <p className="mt-3 text-gray-500">
              Everything you need to know about laundry service in{" "}
              {cityData.name}.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-10 space-y-3"
          >
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={faq.question}
                  variants={card}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(
                        isOpen ? null : index
                      )
                    }
                    className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5"
                  >
                    <span className="font-bold text-gray-900">
                      {faq.question}
                    </span>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        size={19}
                        className="text-gray-400"
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        <div className="px-5 md:px-6 pb-5 text-sm leading-relaxed text-gray-500">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-yellow-400">

        {/* Decorative circles */}

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -right-20 w-80 h-80 rounded-full bg-yellow-300/60"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-orange-400/20"
        />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-24 text-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            <div className="mx-auto w-14 h-14 rounded-2xl bg-black flex items-center justify-center">
              <Truck
                size={25}
                className="text-yellow-400"
              />
            </div>

            <h2 className="mt-6 text-3xl md:text-5xl font-black text-black">
              Ready for hassle-free laundry?
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-black/70 text-base md:text-lg">
              Let Zusko handle your laundry while you focus on
              what matters. Doorstep pickup and delivery available
              in {cityData.name}.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

              <button
                onClick={handleBooking}
                className="group inline-flex items-center justify-center gap-2 bg-black text-yellow-400 hover:bg-gray-900 px-8 py-4 rounded-2xl font-black shadow-xl transition"
              >
                Schedule a Pickup

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <a
                href="mailto:info@zusko.in"
                className="inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white text-black px-8 py-4 rounded-2xl font-bold transition"
              >
                Contact Zusko
              </a>
            </div>

            <p className="mt-5 text-xs text-black/60">
              Serving customers across selected areas of{" "}
              {cityData.name}
            </p>
          </motion.div>
        </div>
      </section>

    </section>
  );
}