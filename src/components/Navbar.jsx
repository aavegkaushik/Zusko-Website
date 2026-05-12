import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaExternalLinkAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "../assets/Zusko White Logo.png";
import LogoAlt from "../assets/zusko.png";

const SCROLL_THRESHOLD = 80;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrolled(scrollTop > SCROLL_THRESHOLD);
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const useHomeLook = isHome && !scrolled;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Our Services" },
    { path: "/contact", label: "Contact Us" },
  ];

  const homeStyles = {
    navLinkBase: "text-white",
    navLinkInactive: "text-white/70 hover:text-white",
    navLinkActive: "text-white font-semibold",
    hamburgerColor: "text-white",
    downloadBtn:
      "relative px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 flex items-center gap-2",
    mobileMenuBg: "bg-black/95 backdrop-blur-lg",
    navBg: "bg-transparent",
    borderBottom: "border-b-0",
    logo: Logo,
  };

  const otherStyles = {
    navLinkBase: "text-gray-800",
    navLinkInactive: "text-gray-600 hover:text-gray-900",
    navLinkActive: "text-gray-900 font-semibold",
    hamburgerColor: "text-gray-800",
    downloadBtn:
      "relative px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 flex items-center gap-2",
    mobileMenuBg: "bg-white/98 backdrop-blur-lg",
    navBg: "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50",
    logo: LogoAlt,
  };

  const styles = useHomeLook ? homeStyles : otherStyles;

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${styles.navBg}`}
      aria-label="Main navigation"
    >
      {/* Main Navbar Container */}
      <div className="flex flex-nowrap justify-between items-center px-4 py-3 md:px-16 max-w-7xl mx-auto">
        {/* Logo with Hover Effect */}
        <motion.div
          className="flex items-center gap-2 z-50"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <img
              src={styles.logo}
              alt="Zusko Logo"
              className="w-28 md:w-36 transition-all duration-300"
              style={{ imageRendering: "auto" }}
            />
          </NavLink>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-base">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) => {
                const baseClasses =
                  "relative px-4 py-2 transition-all duration-300 group";
                const colorClass = isActive
                  ? `${styles.navLinkActive}`
                  : `${styles.navLinkInactive}`;

                return `${baseClasses} ${colorClass}`;
              }}
              onClick={() => setMenuOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>

                  {/* Animated Underline */}
                  {isActive ? (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-1 left-4 right-4 h-1 bg-linear-to-r from-yellow-400 to-yellow-300 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  ) : (
                    <div className="absolute bottom-1 left-4 right-4 h-1 bg-yellow-400/0 group-hover:bg-yellow-400/30 rounded-full transition-colors duration-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/auth/login" className={styles.downloadBtn}>
            <span>Book Now</span>
            <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <FaExternalLinkAlt size={14} />
            </motion.span>
          </Link>
        </motion.div>

        {/* Mobile Menu & Download Link Container */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Download Link */}
          {!menuOpen && (
            <motion.a
              href="/auth/login"
              className={`text-xs font-semibold ${useHomeLook ? "text-yellow-400" : "text-yellow-500"} hover:opacity-80 transition-opacity`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Book
            </motion.a>
          )}

          {/* Hamburger Menu Button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`text-2xl transition-colors duration-300 ${styles.hamburgerColor}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${styles.mobileMenuBg} overflow-hidden border-t ${useHomeLook ? "border-white/10" : "border-gray-200/30"}`}
          >
            <div className="flex flex-col items-center gap-2 py-6 px-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full"
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    end
                    className={({ isActive }) => {
                      const baseClasses =
                        "block w-full py-3 px-4 rounded-lg transition-all duration-300 text-center font-semibold";
                      const activeClass = isActive
                        ? `${styles.navLinkActive} ${useHomeLook ? "bg-white/10" : "bg-yellow-100/50"}`
                        : `${styles.navLinkInactive} hover:${useHomeLook ? "bg-white/5" : "bg-gray-100/50"}`;

                      return `${baseClasses} ${activeClass}`;
                    }}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile CTA Button */}
              <motion.a
                href="/auth/login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className={`w-full mt-2 ${styles.downloadBtn} justify-center`}
              >
                <span>Book Laundry</span>
                <FaExternalLinkAlt size={14} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-transparent overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0.8 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-linear-to-r from-yellow-400 via-yellow-300 to-transparent"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </nav>
  );
};

export default Navbar;