import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaExternalLinkAlt, FaBars, FaTimes } from "react-icons/fa";

import Logo from "../assets/Zusko White Logo.png";
import LogoAlt from "../assets/zusko.png"; // change path or reuse Logo if you don't have alt

const SCROLL_THRESHOLD = 80; // pixels scrolled before switching navbar style

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Determine if current path is the home route
  const isHome = location.pathname === "/";

  // Add scroll listener to toggle `scrolled` state
  useEffect(() => {
    // handler checks scroll position
    const onScroll = () => {
      if (typeof window === "undefined") return;
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // Run once to set initial state
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Decide which visual mode to use:
  // - If on Home AND not scrolled -> use home look
  // - Otherwise -> use other look
  const useHomeLook = isHome && !scrolled;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
    { path: "/services", label: "Our Services" },
  ];

  // Centralized style definitions so you can tweak classes easily
  const homeStyles = {
    navLinkBase: "text-white",
    navLinkInactive:
      "text-white/80 hover:text-white after:border-[#FFC700]",
    navLinkActive:
      "text-white font-bold after:border-[#FFC700] after:-translate-x-1/2 after:w-1/2 after:border-b-2",
    hamburgerColor: "text-white",
    downloadBtn:
      "py-3 px-6 bg-yellow-400 rounded-tl-2xl rounded-br-2xl text-black font-semibold text-lg flex items-center gap-2",
    mobileMenuBg: "bg-black",
    navBg: "bg-transparent",
    borderBottom: "border-b-0",
    logo: Logo,
  };

  const otherStyles = {
    navLinkBase: "text-black",
    navLinkInactive:
      "text-black hover:text-gray-700 after:border-[#FFC700]",
    navLinkActive:
      "text-black after:-translate-x-1/2 after:w-1/2 after:border-b-2 font-bold after:border-[#FFC700]",
    hamburgerColor: "text-black",
    downloadBtn:
      "py-3 px-6 bg-yellow-400 rounded-tl-2xl rounded-br-2xl text-black font-semibold text-lg flex items-center gap-2",
    mobileMenuBg: "bg-white",
    navBg: "bg-white/95 backdrop-blur-sm shadow-sm",
    // borderBottom: "border-b",
    logo: LogoAlt,
  };

  const styles = useHomeLook ? homeStyles : otherStyles;

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${styles.navBg} ${styles.borderBottom}`}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-6 py-3 md:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <img
              src={styles.logo}
              alt="Zusko Logo"
              className="w-28 md:w-36"
              style={{ imageRendering: "auto" }}
            />
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `relative inline-block pb-1 transition-all duration-300 ${styles.navLinkBase} after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 ${
                  isActive
                    ? `${styles.navLinkActive} after:w-1/2`
                    : `${styles.navLinkInactive} after:w-0 hover:after:w-1/2`
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Download App Button (desktop) */}
        <div className="hidden md:block">
          <a href="#" className={styles.downloadBtn}>
            Download App <FaExternalLinkAlt />
          </a>
        </div>

        {/* Mobile small download link (keeps layout similar when menu closed) */}
        {!menuOpen && (
          <div className="md:hidden">
            <a
              href="#"
              className={`underline ml-4 ${useHomeLook ? "text-white" : "text-black"}`}
            >
              Download Zusko App
            </a>
          </div>
        )}

        {/* Mobile Menu Button (hamburger) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-2xl ${styles.hamburgerColor}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className={`md:hidden ${styles.mobileMenuBg} flex flex-col items-center gap-6 py-6 text-lg font-semibold shadow-md border-t`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              end
              className={({ isActive }) =>
                `relative inline-block pb-1 transition-all duration-300 ${
                  isActive
                    ? `text-black font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/3 after:border-b-2 after:border-[#FFC700]`
                    : `text-black hover:text-gray-500`
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <a href="#" className={styles.downloadBtn}>
            Download Zusko App <FaExternalLinkAlt />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
