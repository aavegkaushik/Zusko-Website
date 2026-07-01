import { motion } from "framer-motion";
import { TrendingDown, Zap, Leaf, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Whatisinitforyou({ SaveMoney, delivery, Eco }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const features = [
    {
      icon: TrendingDown,
      title: "Save Time & Money",
      desc: "Enjoy professional laundry care without breaking your budget or wasting hours.",
      image: SaveMoney,
      color: "from-blue-500 to-cyan-500",
      metric: "₹500/month",
      metricLabel: "Average savings"
    },
    {
      icon: Zap,
      title: "Doorstep Pickup & Delivery",
      desc: "We will pick up your clothes and deliver them at your doorstep.",
      image: delivery,
      color: "from-yellow-500 to-orange-500",
      metric: "2 hours",
      metricLabel: "Pickup window"
    },
    {
      icon: Leaf,
      title: "Eco Friendly",
      desc: "We use biodegradable detergents and energy-efficient machines to protect nature.",
      image: Eco,
      color: "from-green-500 to-emerald-500",
      metric: "100%",
      metricLabel: "Sustainable"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  return (
    <>
      {/* MODERN GRADIENT SECTION */}
      <section className="relative w-full py-24 px-6 lg:px-20 overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp} className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold">
                ✨ Why Choose Zusko
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-6"
            >
              Premium laundry,{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                simplified
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need for perfect laundry — convenience, affordability, and sustainability in one.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 lg:gap-6"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Glow background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

                  {/* Card */}
                  <div className="relative h-full rounded-3xl bg-white p-8 lg:p-10 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/60 overflow-hidden">
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`}></div>

                    {/* Content */}
                    <div className="space-y-6">
                      {/* Icon & Image Row */}
                      <div className="space-y-4">
                        {/* Animated Icon */}
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Image with hover effect */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative h-32 flex items-center justify-center"
                        >
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-[70%] object-contain filter drop-shadow-md group-hover:drop-shadow-lg transition-all"
                          />
                        </motion.div>
                      </div>

                      {/* Text Content */}
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black text-gray-900 group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {feature.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          {feature.desc}
                        </p>
                      </div>

                      {/* Metric Badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 border border-gray-200 group-hover:border-gray-300 transition-all`}
                      >
                        <p className={`text-2xl font-black bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                          {feature.metric}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{feature.metricLabel}</p>
                      </motion.div>

                      {/* Learn More Link */}
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-700 group"
                      >
                        <span>Learn more</span>
                        <motion.div group-hover={{ x: 5 }}>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </motion.a>
                    </div>

                    {/* Bottom shine effect on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mt-20 grid md:grid-cols-3 gap-6"
          >
            {[
              { label: "10,000+", desc: "Happy Customers" },
              { label: "1M+", desc: "Items Cleaned" },
              { label: "99.8%", desc: "Satisfaction Rate" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/80 hover:bg-white/80 transition-all"
              >
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="text-3xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
                >
                  {stat.label}
                </motion.p>
                <p className="text-gray-600 text-sm mt-2">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mt-20 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"></div>

            <div className="relative rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 p-12 text-center shadow-2xl overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="white" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#dots)" />
                </svg>
              </div>

              <div className="relative z-10">
                <motion.h3
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl lg:text-4xl font-black text-black mb-4"
                >
                  Ready to simplify your laundry?
                </motion.h3>

                <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of happy customers. Get your first order at special price!
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-black text-yellow-400 font-bold text-lg hover:text-yellow-300 transition-colors shadow-xl"
                >
                  Book Your First Order
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ALTERNATIVE: Glassmorphic Dark Version */}
      <section className="relative w-full py-24 px-6 lg:px-20 overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-4">
              Why customers love us
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-300">
              Trusted by thousands for quality, speed, and care
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-black/80 border border-yellow-400/20 backdrop-blur-xl hover:border-yellow-400/50 transition-all duration-300 shadow-2xl">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                      className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      className="mt-6 mb-6 h-24 flex items-center justify-center"
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-[60%] object-contain filter drop-shadow-lg"
                      />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{feature.desc}</p>

                    <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm group-hover:gap-3 transition-all">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified by customers</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}