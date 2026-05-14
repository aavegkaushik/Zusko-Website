import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import Logo from "../assets/Logo.png";
import LogowithLine from "../assets/fullLogo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <footer className="w-full mt-10 bg-gray-200 text-black px-6 md:px-20 py-12">
      {/* Top section: Company / Contact / Legal / Download */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Company links */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/about"} className="hover:text-[#A6A6A6] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to={"/team"} className="hover:text-[#A6A6A6] transition">
                Team
              </Link>
            </li>
            <li>
              <Link to={"/career"} className="hover:text-[#A6A6A6] transition">
                Careers
              </Link>
            </li>
            <li>
              <Link to={"/blog"} className="hover:text-[#A6A6A6] transition">
                Blog
              </Link>
            </li>
            {/* <li><a href="#" className="hover:text-[#A6A6A6] transition">Zusko Corporate</a></li> */}
          </ul>
        </div>

        {/* Contact / Partner */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/help"} className="hover:text-[#A6A6A6] transition">
                Help & Support
              </Link>
            </li>
            <li>
              <a
                href="/partnerwithus"
                className="hover:text-[#A6A6A6] transition"
              >
                Partner with us
              </a>
            </li>
            {/* <li><a href="#" className="hover:text-[#A6A6A6] transition">Ride with us</a></li> */}
            <li>
              <Link
                to={"/for-business"}
                className="hover:text-[#A6A6A6] transition"
              >
                For Businesses
              </Link>
            </li>
          </ul>
        </div>

        {/* Available in */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">
            Available in
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to={"/available/jhansi"}
                className="hover:text-[#A6A6A6] transition"
              >
                Jhansi
              </Link>
            </li>
            {/* <li><Link to={'/available/delhi'} className="hover:text-[#A6A6A6] transition">Delhi</Link></li> */}
          </ul>
        </div>

        {/* Legal links */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/terms"} className="hover:text-[#A6A6A6] transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to={"/privacy"}
                className="hover:text-[#A6A6A6]  transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to={"/cookie-policy"}
                className="hover:text-[#A6A6A6] transition"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App + Social */}
        <div className="">
          {/* <h4 className="text-md text-black font-bold uppercase mb-4">Download Zusko App</h4>
          <div className="flex items-center space-x-4 mb-6">
            <a href="#" className="flex items-center bg-white text-black px-3 py-2 rounded-md hover:bg-gray-200 transition">
              <FaGooglePlay className="text-xl mr-2" />
              <span className="text-sm font-medium">Google Play</span>
            </a>
            <a href="#" className="flex items-center bg-white text-black px-3 py-2 rounded-md hover:bg-gray-200 transition">
              <FaAppStoreIos className="text-xl mr-2" />
              <span className="text-sm font-medium">App Store</span>
            </a>
          </div> */}
          <div className="text-md text-black font-bold uppercase mb-4">
            <span>Social Links</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-xl text-gray-400 hover:text-[#1877F2] transition-all duration-300 hover:scale-110"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/zusko_official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group text-xl transition-all duration-300 hover:scale-110"
            >
              <FaInstagram className="text-gray-400 group-hover:text-pink-500 transition-colors duration-300" />
            </a>

            <a
              href="https://x.com/Zusko_official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-xl text-gray-400 hover:text-black transition-all duration-300 hover:scale-110"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://linkedin.com/company/zusko"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-xl text-gray-400 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section: logo + copyright */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-8"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Logo */}
        <motion.div
          className="shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={LogowithLine}
            alt="Zusko Logo"
            className="w-48 h-auto object-contain"
          />
        </motion.div>

        {/* Copyright & Company Info */}
        <div className="flex-1 text-center md:text-right space-y-2">
          <p className="text-sm text-gray-500">
            © {currentYear}{" "}
            <span className="font-semibold text-gray-500">
              Zusko Laundry Services Pvt Ltd.
            </span>
          </p>
          <p className="text-xs text-gray-500">
            All rights reserved. Designed with ❤️ for your convenience.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
