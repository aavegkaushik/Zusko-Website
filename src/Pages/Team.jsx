"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import Aaveg from "../assets/Aaveg1.jpeg";
import Shubh from "../assets/Shubh.jpg";
import points from "../assets/points.png";

/* ------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

/* ------------------ */

const Team = () => {
  return (
    <section className="relative mt-24 w-full min-h-screen bg-white py-28 px-6 md:px-20 overflow-hidden">
      
      {/* Decorative accents */}
      <img
        src={points}
        alt=""
        className="absolute top-40 left-20 w-56 opacity-40 pointer-events-none animate-pulse"
      />
      <img
        src={points}
        alt=""
        className="absolute bottom-16 right-16 w-56 opacity-30 rotate-180 pointer-events-none animate-pulse"
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center max-w-3xl mx-auto mb-24 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-gray-500">
          Leadership
        </span>
        <h1 className="text-[clamp(2.6rem,4vw,3.6rem)] font-semibold tracking-tight mt-4 text-gray-900">
          Meet the Founders
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Driven by clarity, craft, and customer obsession — building the future
          of effortless laundry.
        </p>
      </motion.div>

      {/* Founders */}
      <div className="grid md:grid-cols-2 gap-20 max-w-6xl mx-auto relative z-10">
        <FounderCard
          img={Aaveg}
          name="Aaveg Kaushik"
          role="Co-Founder & CEO"
          desc="Aaveg leads Zusko with a product-first mindset and a deep focus on trust, reliability, and user experience. His vision is to simplify urban living through thoughtful technology."
          linkedin="https://www.linkedin.com/in/aaveg-kaushik-a97453218/"
          email="aaveg.kaushik@zusko.in"
          delay={0}
        />

        <FounderCard
          img={Shubh}
          name="Shubh Diwakar"
          role="Co-Founder & CMO"
          desc="Shubh drives Zusko’s brand, growth, and storytelling. He focuses on creating meaningful connections and positioning Zusko as a trusted everyday companion."
          linkedin="https://www.linkedin.com/in/shubh-diwakar-a29625295/"
          instagram="#"
          email="shubh.diwakar@zusko.in"
          delay={0.2}
        />
      </div>
    </section>
  );
};

export default Team;

/* ------------------ */

const FounderCard = ({
  img,
  name,
  role,
  desc,
  linkedin,
  instagram,
  email,
  delay,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      variants={fadeUp}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      className="relative bg-[#F8F9FA] rounded-3xl p-10
                 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]
                 border border-black/5"
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className="relative w-52 h-64 mx-auto mb-8 overflow-hidden rounded-3xl
                   shadow-lg"
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
      </motion.div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          {name}
        </h2>
        <p className="text-sm uppercase tracking-widest text-yellow-500 mb-5">
          {role}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-8 px-4">
          {desc}
        </p>

        {/* Socials */}
        <div className="flex justify-center gap-6 text-xl text-gray-400">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              className="hover:text-[#0A66C2] transition"
            >
              <FaLinkedin />
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              className="hover:text-[#E1306C] transition"
            >
              <FaInstagram />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-[#FF3B30] transition"
            >
              <FaEnvelope />
            </a>
          )}
        </div>
      </div>

      {/* Subtle outline */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 pointer-events-none" />
    </motion.div>
  );
};
