import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, ShieldCheck, Clock3, Leaf, Truck, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import points from "../assets/points.png";
import restImage from "../assets/Lo-fi concept-pana.svg";
import SaveMoney from "../assets/Saving money-cuate.svg";
import delivery from "../assets/In no time-cuate.svg";
import Eco from "../assets/Eco.svg";
import Logo from "../assets/Zusko White Logo.png";

import Hero from "../components/Hero.jsx";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stats = [
  {
    number: "5M+",
    label: "Loads Cleaned",
    icon: "🧺",
  },
  {
    number: "15K+",
    label: "Happy Customers",
    icon: "⭐",
  },
  {
    number: "99.8%",
    label: "Satisfaction Rate",
    icon: "✓",
  },
];

const benefits = [
  {
    icon: SaveMoney,
    title: "Save Time & Money",
    description:
      "Professional laundry care without wasting your valuable time or stretching your budget.",
  },
  {
    icon: delivery,
    title: "Doorstep Pickup & Delivery",
    description:
      "Schedule a pickup and we'll take care of the rest — right from your doorstep.",
  },
  {
    icon: Eco,
    title: "Eco Friendly Care",
    description:
      "Thoughtful cleaning powered by efficient processes and environmentally conscious practices.",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    text: "Your orders stay protected.",
  },
  {
    icon: Clock3,
    title: "On-Time Service",
    text: "Pickup and delivery when promised.",
  },
  {
    icon: Star,
    title: "Premium Care",
    text: "Every garment gets attention.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-white text-gray-900">

      {/* =========================================================
          HERO
      ========================================================= */}

      <Hero />

      {/* =========================================================
          TRUST STRIP
      ========================================================= */}

      <section className="relative z-10 -mt-2 border-y border-gray-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-100 px-5 py-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">

          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center justify-center gap-3 px-4 py-4 sm:py-2"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF8D8]">
                  <Icon size={18} className="text-yellow-600" />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* =========================================================
          MISSION
      ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FCFCFA] to-white px-5 py-20 sm:px-8 md:py-28 lg:px-12">

        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-[450px] w-[450px] rounded-full bg-yellow-100/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* LEFT */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >

            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-yellow-700">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              Our Mission
            </div>

            {/* Heading */}

            <h2 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-5xl md:text-6xl lg:text-7xl">

              Laundry should be
              <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-yellow-600 bg-clip-text text-transparent">
                effortless.
              </span>

            </h2>

            <div className="mt-7 h-1.5 w-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300" />

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              At Zusko, we believe your time belongs to you — not your laundry.
              We combine premium garment care, reliable pickup and delivery,
              and a seamless digital experience to make laundry one less thing
              to worry about.
            </p>

            {/* Benefits */}

            <div className="mt-9 space-y-4">

              {[
                "Quick & hassle-free pickup and delivery",
                "Premium care from trained professionals",
                "Fresh, folded and delivered on time",
              ].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-100">
                    <Check size={15} strokeWidth={3} className="text-yellow-700" />
                  </div>

                  <span className="text-sm font-semibold text-gray-700 sm:text-base">
                    {text}
                  </span>
                </motion.div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative flex justify-center lg:justify-end"
          >

            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-xl"
            >

              {/* Glow */}

              <div className="absolute inset-10 rounded-full bg-yellow-300/20 blur-3xl" />

              {/* Dot pattern */}

              <img
                src={points}
                alt=""
                aria-hidden="true"
                className="absolute -left-8 -top-8 hidden w-40 opacity-50 sm:block"
              />

              {/* Card */}

              <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-10">

                <motion.img
                  src={restImage}
                  alt="Easy and convenient laundry service"
                  loading="lazy"
                  className="relative z-10 w-full object-contain"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating card */}

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-5 left-5 z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
                    <Check size={17} className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Laundry handled
                    </p>
                    <p className="text-[10px] text-gray-500">
                      You just got your time back.
                    </p>
                  </div>
                </motion.div>

              </div>

            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}

      <section className="relative bg-[#FAF8F0] px-5 py-20 sm:px-8 md:py-28 lg:px-12">

        <div className="mx-auto max-w-7xl">

          {/* Header */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-yellow-700 shadow-sm">
              <Sparkles size={14} />
              Why Zusko
            </div>

            <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
              More than clean clothes.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              A complete laundry experience designed around your time,
              convenience and peace of mind.
            </p>

          </motion.div>

          {/* Cards */}

          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {benefits.map((benefit, index) => {
              const IconImage = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.09)] sm:p-8"
                >

                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-yellow-100/40 blur-3xl transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative">

                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8D8]">
                      <img
                        src={IconImage}
                        alt=""
                        className="h-12 w-12 object-contain"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="text-xl font-black text-gray-900">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {benefit.description}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-xs font-bold text-yellow-700">
                      <span>Designed for you</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="bg-white px-5 py-20 sm:px-8 md:py-28 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-600">
                Simple by design
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
                Laundry, without the laundry day.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-gray-500">
              From booking to delivery, Zusko keeps the entire experience
              simple and transparent.
            </p>

          </motion.div>

          <div className="relative mt-14 grid gap-5 md:grid-cols-3">

            {/* Connecting line */}

            <div className="absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 md:block" />

            {[
              {
                number: "01",
                icon: Truck,
                title: "Schedule a pickup",
                text: "Choose your services, add your address and book in seconds.",
              },
              {
                number: "02",
                icon: Sparkles,
                title: "We care for it",
                text: "Your clothes are cleaned and handled with professional care.",
              },
              {
                number: "03",
                icon: Zap,
                title: "Fresh at your door",
                text: "Get your freshly cleaned clothes delivered right back to you.",
              },
            ].map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="relative rounded-[2rem] border border-gray-100 bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.04)]"
                >

                  <div className="relative z-10 flex items-center justify-between">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-yellow-400 shadow-lg">
                      <Icon size={23} />
                    </div>

                    <span className="text-4xl font-black text-gray-100">
                      {step.number}
                    </span>

                  </div>

                  <h3 className="mt-7 text-xl font-black text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {step.text}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================================================
          STATS / SOCIAL PROOF
      ========================================================= */}

      <section className="relative overflow-hidden bg-black px-5 py-20 text-white sm:px-8 md:py-24 lg:px-12">

        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >

            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-yellow-300">
              <Star size={13} fill="currentColor" />
              Trusted by thousands
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Built around your
              <span className="text-yellow-400"> trust.</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
              Every number represents real customers choosing a better way
              to take care of their laundry.
            </p>

          </motion.div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">

                  <div className="text-4xl">
                    {stat.icon}
                  </div>

                  <div className="mt-5 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
                    {stat.number}
                  </div>

                  <p className="mt-3 text-sm font-medium text-zinc-400">
                    {stat.label}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section
        id="get-started"
        className="relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#050505] to-black px-5 py-20 text-white sm:px-8 md:py-28 lg:px-12"
      >

        {/* Background */}

        <div className="absolute inset-0">

          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl"
          />

          <motion.div
            animate={{
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.08),transparent_45%)]" />

        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Content */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >

            <img
              src={Logo}
              alt="Zusko"
              className="mb-8 w-28 sm:w-36"
            />

            <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-yellow-400">
              Your time is worth more
            </p>

            <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Give your laundry
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                a better life.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              Book premium laundry pickup and delivery in seconds.
              We handle the clothes. You get your time back.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <motion.button
                type="button"
                onClick={() => navigate("/auth/login")}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 20px 70px rgba(250,204,21,0.28)",
                }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 text-base font-black text-black transition-all hover:bg-yellow-300"
              >
                Book Laundry Now

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>

            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-500">

              <span className="flex items-center gap-2">
                <Check size={14} className="text-yellow-400" />
                Easy booking
              </span>

              <span className="flex items-center gap-2">
                <Check size={14} className="text-yellow-400" />
                Reliable pickup
              </span>

              <span className="flex items-center gap-2">
                <Check size={14} className="text-yellow-400" />
                Premium care
              </span>

            </div>

          </motion.div>

          {/* Premium visual card */}

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8"
            >

              <div className="mb-7 flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    YOUR LAUNDRY
                  </p>

                  <p className="mt-1 text-lg font-black">
                    Handled by Zusko
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Sparkles size={20} />
                </div>

              </div>

              {/* Timeline */}

              <div className="space-y-5">

                {[
                  {
                    title: "Pickup scheduled",
                    text: "Your clothes are on their way to us.",
                    done: true,
                  },
                  {
                    title: "Premium cleaning",
                    text: "Carefully cleaned & prepared.",
                    done: true,
                  },
                  {
                    title: "Coming back fresh",
                    text: "Ready for doorstep delivery.",
                    done: false,
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-4"
                  >

                    <div className="relative">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          item.done
                            ? "bg-yellow-400 text-black"
                            : "border border-white/10 bg-white/5 text-zinc-500"
                        }`}
                      >
                        {item.done ? (
                          <Check size={16} strokeWidth={3} />
                        ) : (
                          <Clock3 size={16} />
                        )}
                      </div>

                      {index !== 2 && (
                        <div className="absolute left-1/2 top-10 h-5 w-px -translate-x-1/2 bg-white/10" />
                      )}

                    </div>

                    <div className="pt-1">

                      <p className="text-sm font-bold">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        {item.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-8 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.06] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">
                    <Leaf size={18} className="text-yellow-400" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-yellow-300">
                      Thoughtful cleaning
                    </p>

                    <p className="mt-1 text-[11px] text-zinc-500">
                      Better care for your clothes and the planet.
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Home;