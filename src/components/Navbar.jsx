import { useState } from "react";
import Logo from "../assets/zusko.png";
import { NavLink } from "react-router-dom";
import { FaExternalLinkAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
    { path: "/services", label: "Our Services" },
  ];

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-6 py-3 md:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href={'/'}><img src={Logo} alt="Zusko Logo" className="w-28 md:w-36" /></a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `relative inline-block pb-1 transition-all duration-300 ${
                  isActive
                    ? "text-black font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:border-b-2 after:border-[#FFC700]"
                    : "text-black  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:border-b-2 after:border-[#FFC700] hover:after:w-1/2 after:transition-all after:duration-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Download App Button (always visible) */}
        <div className="hidden md:block">
          <a
            href="#"
            className="py-3 px-6 bg-yellow-400 rounded-tl-2xl rounded-br-2xl text-black font-semibold text-lg flex items-center gap-2"
          >
            Download Zusko App <FaExternalLinkAlt />
          </a>
        </div>

        {menuOpen ? <>
            
        </> : <><div className=" md:hidden">
              <a href="#" className="underline ml-20">Download Zusko App</a>
            </div></>}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-black"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white flex flex-col items-center gap-6 py-6 text-lg font-semibold shadow-md border-t">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              end
              className={({ isActive }) =>
                `relative inline-block pb-1 transition-all duration-300 ${
                  isActive
                    ? "text-black font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/3 after:border-b-2 after:border-[#FFC700]"
                    : "text-black hover:text-gray-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile “Download Zusko App” Button */}
          <a
            href="#"
            className="py-3 px-6 bg-yellow-400 rounded-tl-2xl rounded-br-2xl text-black font-semibold flex items-center gap-2"
          >
            Download Zusko App <FaExternalLinkAlt />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
