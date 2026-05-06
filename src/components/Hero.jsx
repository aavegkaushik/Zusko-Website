import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from '../assets/Zusko White Logo.png'

export default function Hero({
  videoSrc = "https://video.rinse.com/assets/rebrand/video/landing_2023_v2.webm",
  poster = "/images/hero-poster.jpg",
  logoSrc = logo,
}) {


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <header className="relative w-full h-screen overflow-hidden bg-black" id="hero">
      {/* Background video with elegant overlay */}
      <video
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/40 to-black/70" />
      
      {/* Subtle animated light accent */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-yellow-400/10 to-transparent rounded-full blur-3xl -z-10"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />



      {/* Hero content */}
      <div className="relative z-30 flex items-center justify-center h-full">
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          {/* <motion.div
            variants={itemVariants}
            className="mt-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Welcome to Premium Laundry Service
            </div>
          </motion.div> */}

          {/* Main heading with elegant styling */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight"
          >
            <span className="bg-linear-to-r from-white via-white to-yellow-200 bg-clip-text text-transparent">
              Fresh & Folded
            </span>
            <br />
            <span className="text-white">In Seconds</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Schedule pickup, we handle the rest. Premium laundry care delivered to your door.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#get-started"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(250, 204, 21, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-linear-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold text-lg uppercase tracking-widest shadow-2xl transition-all duration-300"
            >
              Get Started
            </motion.a>

            <motion.a
              href="#how"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-lg uppercase tracking-widest backdrop-blur-sm transition-all duration-300"
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold">✓</span>
              Fast Delivery
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-yellow-400 font-bold">✓</span>
              Premium Quality
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold">✓</span>
              Expert Care
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with premium styling */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs uppercase tracking-widest font-semibold">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-yellow-400" strokeWidth={2} />
        </div>
      </motion.div>

      {/* Accessibility: skip to content link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute top-24 left-6 z-40 bg-white text-black px-4 py-2 rounded-lg font-semibold"
      >
        Skip to content
      </a>
    </header>
  );
}