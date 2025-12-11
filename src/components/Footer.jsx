import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import Logo from '../assets/Logo.png'
import LogowithLine from '../assets/fullLogo.png'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-gray-200 text-black px-6 md:px-20 py-12">
      {/* Top section: Company / Contact / Legal / Download */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Company links */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/about'} className="hover:text-[#A6A6A6] transition">About Us</Link></li>
            <li><Link to={'/team'} className="hover:text-[#A6A6A6] transition">Team</Link></li>
            <li><Link to={'/career'} className="hover:text-[#A6A6A6] transition">Careers</Link></li>
            <li><Link to={'/blog'} className="hover:text-[#A6A6A6] transition">Blog</Link></li>
            {/* <li><a href="#" className="hover:text-[#A6A6A6] transition">Zusko Corporate</a></li> */}
          </ul>
        </div>

        {/* Contact / Partner */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/help'} className="hover:text-[#A6A6A6] transition">Help & Support</Link></li>
            <li><a href="/partnerwithus" className="hover:text-[#A6A6A6] transition">Partner with us</a></li>
            {/* <li><a href="#" className="hover:text-[#A6A6A6] transition">Ride with us</a></li> */}
            <li><Link to={"/for-business"} className="hover:text-[#A6A6A6] transition">For Businesses</Link></li>
          </ul>
        </div>

        {/* Available in */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">Available in</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/help'} className="hover:text-[#A6A6A6] transition">Jhansi</Link></li>
            {/* <li><a href="#" className="hover:text-[#A6A6A6] transition">Partner with us</a></li>
            {/* <li><a href="#" className="hover:text-[#A6A6A6] transition">Ride with us</a></li> */}
            {/* <li><Link to={"/for-business"} className="hover:text-[#A6A6A6] transition">For Businesses</Link></li> */}
          </ul>
        </div>

        {/* Legal links */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/terms'} className="hover:text-[#A6A6A6] transition">Terms & Conditions</Link></li>
            <li><Link to={'/privacy'} className="hover:text-[#A6A6A6]  transition">Privacy Policy</Link></li>
            <li><Link to={'/cookie-policy'} className="hover:text-[#A6A6A6] transition">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Download App + Social */}
        <div>
          <h4 className="text-md text-black font-bold uppercase mb-4">Download Zusko App</h4>
          <div className="flex items-center space-x-4 mb-6">
            <a href="#" className="flex items-center bg-white text-black px-3 py-2 rounded-md hover:bg-gray-200 transition">
              <FaGooglePlay className="text-xl mr-2" />
              <span className="text-sm font-medium">Google Play</span>
            </a>
            <a href="#" className="flex items-center bg-white text-black px-3 py-2 rounded-md hover:bg-gray-200 transition">
              <FaAppStoreIos className="text-xl mr-2" />
              <span className="text-sm font-medium">App Store</span>
            </a>
          </div>
          <div className="text-md text-black font-bold uppercase mb-4">
            <span>Social Links</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaFacebook className="text-xl hover:text-[#A6A6A6] cursor-pointer transition" />
            <FaInstagram className="text-xl hover:text-[#A6A6A6] cursor-pointer transition" />
            <FaTwitter className="text-xl hover:text-[#A6A6A6] cursor-pointer transition" />
            <FaLinkedin className="text-xl hover:text-[#A6A6A6] cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* Bottom section: logo + copyright */}
      <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
        <img src={LogowithLine} alt="YourApp Logo" className="w-52 mb-4 md:mb-0" />
        <span className="text-sm text-gray-500">© {new Date().getFullYear()} Zusko Corporation. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
