import { useState } from "react";
import { motion } from "framer-motion";
import logo from '../assets/Zusko White Logo.png'
// Usage:
// <RinseHero
//    videoSrc="/path/to/your-video.mp4"
//    poster="/path/to/fallback.jpg"
//    logoSrc="/path/to/logo.png"
// />

export default function Hero({
  videoSrc = "https://video.rinse.com/assets/rebrand/video/landing_2023_v2.webm",
  poster = "/images/hero-poster.jpg",
  logoSrc = logo,
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background video */}
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
        {/* Fallback: poster image will show on browsers that block autoplay */}
      </video>

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/25 to-black/65" />

      {/* Navbar (on top of the video) */}
      <nav className="absolute top-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {/* <a href="#" className="flex items-center gap-3">
              <img src={logoSrc} alt="Logo" className="h-10 w-auto object-contain" />
            </a> */}

            {/* Desktop links */}
            {/* <div className="hidden md:flex items-center gap-8 text-white/90 font-medium">
              <a href="#services" className="hover:underline">Services</a>
              <a href="#how" className="hover:underline">How it works</a>
              <a href="#pricing" className="hover:underline">Pricing</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </div> */}

            {/* CTAs and hamburger */}
            <div className="flex items-center gap-4">
              {/* <a
                href="#signup"
                className="hidden md:inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
              >
                Sign up
              </a> */}

              <button
                aria-label="Toggle menu"
                className="md:hidden p-2 rounded-md text-white"
                onClick={() => setOpen((s) => !s)}
              >
                {/* simple hamburger icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          {open && (
            <div className="md:hidden bg-black/60 backdrop-blur-sm rounded-lg mt-3 p-4 text-white font-medium">
              <a href="#services" className="block py-2">Services</a>
              <a href="#how" className="block py-2">How it works</a>
              <a href="#pricing" className="block py-2">Pricing</a>
              <a href="#contact" className="block py-2">Contact</a>
              <a href="#signup" className="block mt-3 bg-white text-black text-center px-4 py-2 rounded-full font-semibold">Sign up</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-30 flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
          >
            Premium laundry & dry cleaning
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-6 text-lg sm:text-xl text-white/85 max-w-3xl mx-auto"
          >
            Schedule pickup in seconds. We pick up, clean, and deliver — fresh and folded.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <a
              href="#get-started"
              className="px-6 py-3 rounded-full bg-black text-white font-semibold shadow-md"
            >
              Get started
            </a>

            <a href="/about" className="px-4 py-3 rounded-full bg-yellow-400 text-black font-medium">
              Learn more
            </a>
          </motion.div>

          {/* subtle scroll hint */}
          <div className="mt-12 flex items-center justify-center text-white/70">
            <svg className="animate-bounce" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Accessibility: skip to content link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute top-20 left-6 z-40 bg-white text-black px-3 py-2 rounded">
        Skip to content
      </a>
    </header>
  );
}

/*
Notes & integration tips:
1. Tailwind: This component assumes Tailwind CSS is configured in your project. The classes use Tailwind v3+ utilities.
2. Framer Motion: The file imports `motion` from framer-motion for small entrance animations — optional. Remove if you don't want it.
3. Video hosting: Use an optimized MP4 (H.264) or an adaptive streaming service. Keep file size small for fast loads.
4. Autoplay & mobile: Many mobile browsers disable autoplay with sound. The `muted` attribute enables autoplay in most browsers. Provide a high-quality poster image as fallback.
5. Accessibility: Provide descriptive alt text for the logo and ensure link text is descriptive. Use semantic header/nav elements as shown.
6. Swap copy, links, and colors to match your brand. The layout mimics rinse.com: full-screen video, overlayed navbar, centered hero copy, and CTA buttons.
*/
