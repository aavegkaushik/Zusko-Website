"use client";
import { motion } from "framer-motion";
import delivery from '../assets/delivery.png'
import { TbIroningSteamFilled, TbIroningFilled } from "react-icons/tb";
import { FaTshirt, FaSoap, FaTruck, FaBuilding } from "react-icons/fa";
import steamIron from '../assets/steam_ironing.png'
import dryclean from '../assets/dryclean.png'
import washiron from '../assets/washiron.png'
import washfold from '../assets/washfold.png'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const services = [
  {
    title: "Wash & Fold",
    desc: "Simplify your daily routine with our Wash & Fold service. We carefully sort, wash, dry, and neatly fold your clothes — just the way you like them. Perfect for everyday wear, this service saves your time and ensures your garments stay fresh, clean, and ready to wear. Enjoy crisp laundry without the hassle of doing it yourself!",
    icon: <FaTshirt size={40} className="text-yellow-500" />,
    image: washfold,
  },
  {
    title: "Dry Cleaning",
    desc: "For delicate fabrics that need special attention, our Dry Cleaning service uses advanced solvent-based techniques to gently remove stains and dirt while preserving fabric integrity and color. Perfect for suits, sarees, coats, and designer wear.",
    icon: <FaSoap size={40} className="text-yellow-500" />,
    image: dryclean,
  },
  {
    title: "Wash & Iron",
    desc: "The best of both worlds — our Wash & Iron service ensures your clothes are thoroughly cleaned and pressed to perfection. Ideal for formal and everyday wear, it’s a complete solution that keeps your wardrobe fresh, neat, and presentation-ready.",
    icon: <TbIroningFilled size={40} className="text-yellow-500" />,
    image: washiron,
  },
  {
    title: "Steam ironing",
    desc: "Give your clothes the professional finish they deserve with our Steam Iron service. Using high-quality steam ironing equipment, we remove even the toughest wrinkles while preserving fabric quality and color. From casual wear to formal outfits, every piece is pressed to perfection — fresh, smooth, and ready to impress.",
    icon: <TbIroningSteamFilled size={40} className="text-yellow-500" />,
    image: steamIron,
  },
  {
    title: "Pickup & Delivery",
    desc: "Doorstep laundry service with on-time pickup and delivery – convenience at your fingertips.",
    icon: <FaTruck size={40} className="text-yellow-500" />,
    image: delivery,
  },
  {
    title: "Commercial Laundry",
    desc: "Our Commercial Laundry Service caters to hotels, restaurants, hospitals, and businesses that demand bulk laundry with professional quality. We handle large volumes efficiently while maintaining hygiene, freshness, and timely delivery.",
    icon: <FaBuilding size={40} className="text-yellow-500" />,
    image: "https://i.pinimg.com/1200x/ff/c4/d0/ffc4d061a4ffc26ff802187c03cbe310.jpg",
  },
];

const Services = () => {
  return (
    <div className="mt-28 px-6 md:px-20 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Our Laundry Services
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-3">
          Fresh, clean, and neatly folded – for homes and businesses alike!
        </p>
      </motion.div>

      {/* Services List */}
      <div className="space-y-56">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-10 md:gap-14`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.2}
            variants={fadeUp}
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="md:w-5/12 rounded-3xl shadow-2xl ring-1 ring-gray-200 overflow-hidden flex justify-center items-center"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full max-h-[400px] object-cover rounded-2xl"
                loading="lazy"
              />
            </motion.div>

            {/* Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                {service.icon}
              </div>
              <h2 className="text-3xl font-bold mb-3 text-gray-800">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-5 leading-relaxed text-xl">
                {service.desc}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium cursor-pointer py-2 px-6 rounded-tl-xl rounded-br-xl"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="text-center mt-24 bg-yellow-400 py-12 rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Ready for spotless clothes?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Whether it’s your daily wear or your company’s linen stock, we handle laundry
          with care, quality, and commitment. Book your first wash today!
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black cursor-pointer text-white font-semibold py-3 px-8 rounded-tl-xl rounded-br-xl"
        >
          Book Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Services;
