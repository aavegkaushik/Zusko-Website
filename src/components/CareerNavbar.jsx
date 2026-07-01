import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from '../assets/zusko.png'
export default function CareerNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link
  to="/career"
  className="flex items-center gap-3"
>
  <img
    src={Logo}
    alt="Zusko"
    className="h-12 w-auto"
  />

  <div className="flex flex-col leading-none">

    <span className="text-sm font-medium text-gray-500 tracking-wider">
      Careers
    </span>
  </div>
</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#life-at-zusko"
            className="text-gray-600 hover:text-black transition"
          >
            Life at Zusko
          </a>

          <a
            href="#open-roles"
            className="text-gray-600 hover:text-black transition"
          >
            Open Roles
          </a>

          <a
            href="#hiring-process"
            className="text-gray-600 hover:text-black transition"
          >
            Hiring Process
          </a>

          <a
            href="#faq"
            className="text-gray-600 hover:text-black transition"
          >
            FAQs
          </a>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-5 py-3 rounded-xl font-medium transition"
        >
          <ArrowLeft size={18} />

          Back to Zusko
        </Link>
      </div>
    </nav>
  );
}