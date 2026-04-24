"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import delivery from "../assets/delivery.png";
import { TbIroningSteamFilled, TbIroningFilled } from "react-icons/tb";
import { FaTshirt, FaSoap, FaTruck, FaBuilding } from "react-icons/fa";
import steamIron from "../assets/steam_ironing.png";
import dryclean from "../assets/dryclean.png";
import washiron from "../assets/washiron.png";
import washfold from "../assets/washfold.png";

/* ---------------------------------- */

const services = [
  {
    title: "Wash & Fold",
    desc: "Simplify your daily routine with our Wash & Fold service. We carefully sort, wash, dry, and neatly fold your clothes — just the way you like them.",
    icon: FaTshirt,
    image: washfold,
  },
  {
    title: "Dry Cleaning",
    desc: "Advanced solvent-based techniques to gently clean delicate fabrics while preserving quality and color.",
    icon: FaSoap,
    image: dryclean,
  },
  {
    title: "Wash & Iron",
    desc: "A complete solution that cleans and presses your clothes to perfection — ideal for daily and formal wear.",
    icon: TbIroningFilled,
    image: washiron,
  },
  {
    title: "Steam Ironing",
    desc: "Professional steam ironing that removes tough wrinkles while protecting fabric integrity.",
    icon: TbIroningSteamFilled,
    image: steamIron,
  },
  {
    title: "Pickup & Delivery",
    desc: "On-time doorstep pickup and delivery — convenience built into every order.",
    icon: FaTruck,
    image: delivery,
  },
  {
    title: "Commercial Laundry",
    desc: "Bulk laundry solutions for hotels, hospitals, and businesses with professional-grade hygiene.",
    icon: FaBuilding,
    image: "https://i.pinimg.com/1200x/ff/c4/d0/ffc4d061a4ffc26ff802187c03cbe310.jpg",
  },
];

/* ---------------------------------- */

const Services = () => {
  const navigate = useNavigate();
  return (
    <section className="relative mt-32 px-6 md:px-20 bg-white overflow-hidden">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-32"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-gray-500">
          Our Services
        </span>
        <h1 className="text-[clamp(2.5rem,4vw,3.5rem)] font-semibold tracking-tight mt-4 text-gray-900">
          Premium Laundry Care, Redefined
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Thoughtfully designed services for individuals, families, and businesses.
        </p>
      </motion.div>

      {/* Services */}
      <div className="space-y-56">
        {services.map((service, index) => (
          <ServiceBlock key={index} service={service} index={index} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative mt-40 rounded-3xl bg-yellow-400 p-14 text-center shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-black mb-4">
          Ready for spotless clothes?
        </h2>
        <p className="text-black/80 max-w-2xl mx-auto mb-8">
          From daily wear to commercial linen — we deliver care, quality, and consistency.
        </p>
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => navigate('/auth/login')}
          whileTap={{ scale: 0.96 }}
          className="bg-black text-white px-10 py-4 font-semibold rounded-tl-xl rounded-br-xl"
        >
          Book Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Services;

/* ---------------------------------- */

const ServiceBlock = ({ service, index }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yText = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const Icon = service.icon;
  const reverse = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      className={`max-w-7xl mx-auto flex flex-col gap-16 items-center
      ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Image */}
      <motion.div
        style={{ y: yImage }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className="md:w-5/12 relative rounded-3xl overflow-hidden shadow-2xl"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-[420px] object-cover"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        style={{ y: yText }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="md:w-6/12"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 mb-6 flex items-center justify-center rounded-2xl
                     bg-yellow-400/20 text-yellow-500"
        >
          <Icon size={28} />
        </motion.div>

        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-5">
          {service.title}
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-8">
          {service.desc}
        </p>

        <motion.button
          whileHover={{ x: 6 }}
          className="text-yellow-500 font-semibold inline-flex items-center gap-2"
        >
          Learn More →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
