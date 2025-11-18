import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import Aaveg from "../assets/Aaveg.jpeg";
import Shubh from "../assets/Shubh.jpg";
import points from "../assets/points.png";

const Team = () => {
  return (
    <section className="relative mt-20 w-full min-h-screen bg-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Background Points - More visible */}
      <img
        src={points}
        alt="Decoration"
        className="absolute top-40 left-20 w-48 md:w-56 opacity-100 pointer-events-none animate-pulse z-0"
      />
      <img
        src={points}
        alt="Decoration"
        className="absolute bottom-10 right-10 w-48 md:w-56 opacity-60 rotate-180 pointer-events-none animate-pulse z-0"
      />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-4 relative z-10"
      >
        Meet Our Founders
      </motion.h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-sm md:text-base relative z-10">
        Driven by innovation and simplicity, our founders are shaping the future
        of on-demand laundry with vision, empathy, and technology.
      </p>

      {/* Founders Section */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-10">
        {/* Founder 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F9FA] rounded-2xl shadow-sm hover:shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 border border-gray-100 backdrop-blur-sm"
        >
          <div className="w-48 h-56 mb-5 relative overflow-hidden rounded-4xl rotate-2 hover:rotate-0 transition-transform duration-300 shadow-md">
            <img
              src={Aaveg}
              alt="Aaveg Kaushik"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-1">
            Aaveg Kaushik
          </h2>
          <p className="text-[#0047AB] mb-4 text-sm font-medium tracking-wide uppercase">
            Co-Founder & CEO
          </p>
          <p className="text-gray-600 leading-relaxed text-sm mb-6 px-3">
            Aaveg leads Zusko with a vision to simplify urban living through innovation and technology. His focus on product excellence and user trust drives Zusko’s mission to make laundry effortless and reliable.
          </p>
          <div className="flex gap-5 text-xl text-gray-500">
            <a target="_blank" href="https://www.linkedin.com/in/aaveg-kaushik-a97453218/" className="hover:text-[#0047AB] transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-[#E1306C] transition">
              <FaInstagram />
            </a>
            <a
              href="mailto:founder@zusko.in"
              className="hover:text-[#FF3B30] transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

        {/* Founder 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#F8F9FA] rounded-2xl shadow-sm hover:shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 border border-gray-100 backdrop-blur-sm"
        >
          <div className="w-48 h-56 mb-5 relative overflow-hidden rounded-4xl -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-md">
            <img
              src={Shubh}
              alt="Shubh Diwakar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-1">
            Shubh Diwakar
          </h2>
          <p className="text-[#0047AB] mb-4 text-sm font-medium tracking-wide uppercase">
            Co-Founder & CMO
          </p>
          <p className="text-gray-600 leading-relaxed text-sm mb-6 px-3">
            Shubh shapes Zusko’s brand and growth strategy with creativity and insight. He’s passionate about building meaningful customer connections and establishing Zusko as a trusted everyday companion.
          </p>
          <div className="flex gap-5 text-xl text-gray-500">
            <a target="_blank" href="https://www.linkedin.com/in/shubh-diwakar-a29625295/" className="hover:text-[#0047AB] transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-[#E1306C] transition">
              <FaInstagram />
            </a>
            <a
              href="mailto:aryan@example.com"
              className="hover:text-[#FF3B30] transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
