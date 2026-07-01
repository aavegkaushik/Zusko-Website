import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaExternalLinkAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Zusko White Logo.png";
import LogoAlt from "../assets/zusko.png";
import { User, Package, LogOut, ChevronDown, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SCROLL_THRESHOLD = 80;

const Navbar = () => {
  const { user, logout } = useAuth();
  const profileRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  const isHome = location.pathname === "/";
  const isPlaceOrder = location.pathname === "/place-order";

  const initials =
    user?.name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase() || "U";

  const hideOrderButton =
    location.pathname.startsWith("/place-order") ||
    location.pathname.startsWith("/my-orders");

  // ── All original logic preserved exactly ────────────────────────────────

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  const useHomeLook = isHome && !scrolled;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Our Services" },
    { path: "/contact", label: "Contact Us" },
    // ...(user ? [{ path: "/my-orders", label: "My Orders" }] : []),
  ];

  // ── RENDER ─────────────────────────────────────────────────────────────
  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 transition-all duration-500"
      style={{
        background: useHomeLook
          ? "transparent"
          : scrolled
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0.96)",
        backdropFilter: useHomeLook ? "none" : "blur(20px)",
        borderBottom: useHomeLook ? "none" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: useHomeLook ? "none" : scrolled ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
      }}
      aria-label="Main navigation"
    >
      {/* ── MAIN BAR ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 md:px-12 lg:px-16 max-w-[1400px] mx-auto">

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="z-50">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <img
              src={useHomeLook ? Logo : LogoAlt}
              alt="Zusko"
              className="h-8 md:h-10 lg:h-14 w-auto transition-all duration-300"
              style={{ imageRendering: "auto" }}
            />
          </NavLink>
        </motion.div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              onClick={() => setMenuOpen(false)}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-xl group"
              style={({ isActive }) => ({
                color: isActive
                  ? useHomeLook ? "#FFFFFF" : "#111111"
                  : useHomeLook ? "rgba(255,255,255,0.65)" : "#6B7280",
                fontWeight: isActive ? 700 : 500,
              })}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover bg */}
                  <span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: useHomeLook ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)" }}
                  />
                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: useHomeLook ? "#FFD700" : "#FFD700" }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden md:flex items-center gap-3">

          {/* Book Now / New Order CTA */}
          {(!user || !isPlaceOrder) && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                to={user ? "/place-order" : "/auth/login"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  color: "#101010",
                  boxShadow: "0 4px 16px rgba(255,165,0,0.35)",
                }}
              >
                {user ? (
                  <><Sparkles size={14} /> New Order</>
                ) : (
                  <>Book Now</>
                )}
              </Link>
            </motion.div>
          )}

          {/* Profile dropdown */}
          {user && (
            <div className="relative" ref={profileRef}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors duration-200"
                style={{
                  background: showProfile
                    ? useHomeLook ? "rgba(255,255,255,0.12)" : "#F3F4F6"
                    : "transparent",
                }}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: "#FFD700", color: "#101010" }}
                >
                  {initials}
                </div>

                {/* Name — only on place-order page */}
                {isPlaceOrder && (
                  <div className="text-left">
                    <p className={`font-bold text-xs leading-none ${useHomeLook ? "text-white" : "text-gray-900"}`}>
                      {user.name}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Verified</p>
                  </div>
                )}

                <ChevronDown
                  size={14}
                  color={useHomeLook ? "rgba(255,255,255,0.6)" : "#9CA3AF"}
                  style={{ transform: showProfile ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                />
              </motion.button>

              {/* Profile dropdown panel */}
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="absolute right-0 top-14 z-50 overflow-hidden"
                    style={{
                      width: "280px",
                      background: "white",
                      borderRadius: "20px",
                      border: "1px solid #F0F0F0",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* User info header */}
                    <div className="px-5 py-4" style={{ background: "#F8F9FB", borderBottom: "1px solid #F0F0F0" }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base flex-shrink-0"
                          style={{ background: "#FFD700", color: "#101010" }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm leading-none">{user.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{user.email}</p>
                          <span
                            className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "#ECFDF5", color: "#065F46" }}
                          >
                            ✓ Verified Customer
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                      {[
                        { to: "/user/profile", icon: <User size={15} />, label: "My Profile", color: "#6B7280" },
                        { to: "/my-orders", icon: <Package size={15} />, label: "My Orders", color: "#6B7280" },
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 px-5 py-3 transition-colors duration-150 group"
                          style={{ color: "#374151" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#F8F9FB"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: "#F3F4F6" }}
                          >
                            {item.icon}
                          </div>
                          <span className="text-sm font-semibold">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div style={{ borderTop: "1px solid #F0F0F0" }} className="py-1.5">
                      <button
                        onClick={() => { logout(); setShowProfile(false); window.location.href = "/"; }}
                        className="w-full flex items-center gap-3 px-5 py-3 transition-colors duration-150"
                        style={{ color: "#EF4444" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#FEF2F2"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FEF2F2" }}
                        >
                          <LogOut size={15} color="#EF4444" />
                        </div>
                        <span className="text-sm font-semibold">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile right cluster */}
        <div className="md:hidden flex items-center gap-3">
          {!menuOpen && !user && (
            <Link
              to="/auth/login"
              className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: "#FFD700",
                color: "#101010",
              }}
            >
              Book
            </Link>
          )}
          {!menuOpen && user && (
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
              style={{ background: "#FFD700", color: "#101010" }}
            >
              {initials}
            </div>
          )}

          {/* Hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.88 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
            style={{
              background: menuOpen
                ? "#FFD700"
                : useHomeLook ? "rgba(255,255,255,0.12)" : "#F3F4F6",
              color: menuOpen ? "#101010" : useHomeLook ? "white" : "#374151",
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <FaTimes size={14} />
                </motion.div>
              ) : (
                <motion.div key="bars" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <FaBars size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: useHomeLook ? "rgba(10,10,10,0.97)" : "rgba(255,255,255,0.98)",
              backdropFilter: "blur(24px)",
              borderTop: useHomeLook ? "1px solid rgba(255,255,255,0.08)" : "1px solid #F0F0F0",
            }}
          >
            <div className="px-5 pt-4 pb-6 space-y-1">

              {/* User card — if logged in */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-2xl mb-3"
                  style={{
                    background: useHomeLook ? "rgba(255,255,255,0.06)" : "#F8F9FB",
                    border: useHomeLook ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F0F0F0",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ background: "#FFD700", color: "#101010" }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className={`font-bold text-sm leading-none ${useHomeLook ? "text-white" : "text-gray-900"}`}>
                      {user.name}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${useHomeLook ? "text-white/40" : "text-gray-400"}`}>
                      {user.email}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Nav links */}
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={link.path}
                    end
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors duration-150"
                    style={({ isActive }) => ({
                      background: isActive
                        ? useHomeLook ? "rgba(255,215,0,0.12)" : "#FFF9E6"
                        : "transparent",
                      color: isActive
                        ? "#FFD700"
                        : useHomeLook ? "rgba(255,255,255,0.75)" : "#374151",
                      fontWeight: isActive ? 700 : 500,
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <span className="text-sm">{link.label}</span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFD700" }} />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* Divider */}
              <div
                className="my-3"
                style={{ height: "1px", background: useHomeLook ? "rgba(255,255,255,0.08)" : "#F0F0F0" }}
              />

              {/* Profile links — if logged in */}
              {user && (
                <div className="space-y-1">
                  {[
                    { to: "/user/profile", icon: <User size={15} />, label: "My Profile" },
                    { to: "/my-orders", icon: <Package size={15} />, label: "My Orders" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + i) * 0.04 }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150"
                        style={{ color: useHomeLook ? "rgba(255,255,255,0.65)" : "#374151" }}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.button
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 2) * 0.04 }}
                    onClick={() => { logout(); setMenuOpen(false); window.location.href = "/"; }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150"
                    style={{ color: "#EF4444" }}
                  >
                    <LogOut size={15} />
                    <span className="text-sm font-medium">Logout</span>
                  </motion.button>
                </div>
              )}

              {/* Book Now CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 3) * 0.04 }}
                className="pt-1"
              >
                <Link
                  to={user ? "/place-order" : "/auth/login"}
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFA500)",
                    color: "#101010",
                    boxShadow: "0 4px 16px rgba(255,165,0,0.3)",
                  }}
                >
                  {user ? "New Order" : "Book Laundry"}
                  <FaExternalLinkAlt size={11} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ height: "2px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full"
          style={{
            width: `${scrollProgress * 100}%`,
            background: "linear-gradient(90deg, #FFD700, #FFA500, transparent)",
            transition: "width 0.15s ease",
          }}
        />
      </motion.div>
    </nav>
  );
};

export default Navbar;