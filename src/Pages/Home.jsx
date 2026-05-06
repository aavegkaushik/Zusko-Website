import { motion } from "framer-motion";
import Caraousel from "../components/Caraousel.jsx";
import points from "../assets/points.png";
import restImage from "../assets/Lo-fi concept-pana.svg";
import SaveMoney from "../assets/Saving money-cuate.svg";
import delivery from "../assets/In no time-cuate.svg";
import Eco from "../assets/Eco.svg";
import Mobile from "../assets/mobile1.png";
import Logo from "../assets/Logo.png";
import Hero from '../components/Hero.jsx'
const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};
 
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};
 
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8 },
  },
};
 
const stats = [
  {
    number: '5M+',
    label: 'Loads Cleaned',
    icon: '🧺',
  },
  {
    number: '15K+',
    label: 'Happy Customers',
    icon: '⭐',
  },
  {
    number: '99.8%',
    label: 'Satisfaction Rate',
    icon: '✓',
  },
];

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Service Section */}
      <div className="">
        {/* To make Life easier section */}
  <div className="relative flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 md:px-16 mb-20 lg:px-24 overflow-visible mt-40 gap-8 md:gap-12">
  {/* Text + Decorative Points */}
  <motion.div
    className="relative w-full md:w-1/2"
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Decorative dots: hidden on very small screens, smaller on small screens */}
    <img
      src={points}
      alt="Zusko"
      aria-hidden="true"
      className="hidden sm:block absolute -top-40 sm:-top-10 -left-6 sm:-left-10 w-36 sm:w-56 opacity-90 z-0 pointer-events-none"
      loading="lazy"
    />

    <span className="relative z-10 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 sm:mt-10 font-bold leading-tight text-gray-900">
      To Make Life Easier
    </span>

    <p className="z-10 text-base sm:text-lg md:text-[20px] mt-4 text-gray-700 max-w-xl">
      At Zusko, we are committed to providing our customers with the freedom from
      the daily laundry hassles and providing them with the convenience of their
      daily needs.
    </p>
  </motion.div>

  {/* Right Image */}
  <motion.div
    className="w-full md:w-1/2 flex justify-center md:justify-end"
    variants={fadeIn}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
  >
    <img
      src={restImage}
      alt="Laundry service illustration"
      loading="lazy"
      className="w-11/12 sm:w-9/12 md:w-[85%] lg:w-[80%] max-w-[520px] object-contain"
      style={{ willChange: "transform" }}
    />
  </motion.div>
</div>


        {/* What's in it for you Section */}
        <motion.div
  className="
    flex 
    items-center 
    justify-center 
    font-bold 
    px-4 
    mt-20
    text-3xl 
    sm:text-4xl 
    md:text-5xl
    mb-8
  "
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.3 }}
>
  <span
    className="
      relative 
      inline-block 
      pb-1 
      after:content-[''] 
      after:absolute 
      after:bottom-0 
      after:left-1/2 
      after:-translate-x-1/2 
      after:border-b-4 
      after:border-[#FFC700] 
      after:w-1/2
    "
  >
    What's in it for you
  </span>
</motion.div>


        <section className="flex flex-col md:flex-row w-full bg-[#F9F2D7] rounded-full z-0 items-center justify-between px-10 py-12 gap-12">
          {/* Feature 1 */}
          <motion.div
            className="flex-1 flex flex-col items-center text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={SaveMoney}
              alt="Save Money"
              className="w-[60%] max-w-[220px] object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Save Time & Money
            </h3>
            <p className="text-gray-600 mt-2 text-sm max-w-[250px]">
              Enjoy professional laundry care without breaking your budget or
              wasting hours.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="flex-1 flex flex-col items-center text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={delivery}
              alt="Fast Delivery"
              className="w-[60%] max-w-[220px] object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Doorstep Pickup & Delivery
            </h3>
            <p className="text-gray-600 mt-2 text-sm max-w-[250px]">
              We will pick up your clothes and deliver them at your doorstep.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="flex-1 flex flex-col items-center text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src={Eco}
              alt="Eco Friendly"
              className="w-[60%] max-w-[220px] object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Eco Friendly
            </h3>
            <p className="text-gray-600 mt-2 text-sm max-w-[250px]">
              We use biodegradable detergents and energy-efficient machines to
              protect nature.
            </p>
          </motion.div>
        </section>

        {/* Let's Start Section */}
        <motion.div
          className="flex items-start justify-start gap-4 mt-10 px-4 md:pl-36 text-3xl md:text-5xl font-extrabold"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span>Let's</span>
          <span className="text-yellow-400">Start</span>
        </motion.div>


        {/* App Download Section */}
        <motion.section
      className="w-full bg-linear-to-br from-black via-slate-950 to-black text-white flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-24 overflow-hidden relative"
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      id="get-started"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl -z-10"></div>
 
      {/* Left Content */}
      <motion.div
        className="flex-1 flex flex-col items-start text-left space-y-8 max-w-2xl z-10"
        variants={fadeUp}
      >
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="Zusko Logo"
          className="w-28 md:w-36 hover:scale-110 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        />
 
        {/* Main Heading */}
        <div className="space-y-4">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight bg-linear-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
            variants={fadeUp}
          >
            Book Your Laundry in Seconds
          </motion.h2>
 
          <motion.p
            className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            No more waiting. Schedule your pickup, choose premium services, and relax — we'll handle the rest with meticulous care and attention to detail.
          </motion.p>
        </div>
 
        {/* CTA Button with enhanced styling */}
        <motion.button
          onClick={() => navigate('/auth/login')}
          className="relative group px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Book Laundry Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
 
        {/* Trust Indicators */}
        <motion.div
          className="flex items-center gap-6 pt-4 text-sm text-gray-400"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Secure & Instant Booking</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </motion.div>
 
      {/* Right Side - Stats Cards */}
      <motion.div
        className="flex-1 flex items-center justify-center mt-16 lg:mt-0 w-full lg:w-auto"
        variants={scaleIn}
        transition={{ delay: 0.2 }}
      >
        <div className="relative w-full max-w-md">
          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative h-48 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Card Background with gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-slate-800/80 via-slate-900/60 to-black/80 border border-yellow-400/20 rounded-2xl"></div>
 
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
 
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center space-y-3 px-6 py-8">
                  {/* Icon */}
                  <motion.div
                    className="text-5xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.icon}
                  </motion.div>
 
                  {/* Number */}
                  <motion.div
                    className="text-4xl md:text-3xl font-black bg-linear-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
 
                  {/* Label */}
                  <p className="text-gray-300 text-sm font-medium text-center leading-tight">
                    {stat.label}
                  </p>
                </div>
 
                {/* Border accent on hover */}
                <div className="absolute inset-0 border border-yellow-400/0 group-hover:border-yellow-400/30 rounded-2xl transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
 
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl pointer-events-none"></div>
        </div>
      </motion.div>
    </motion.section>
      </div>
    </div>
  );
};

export default Home;
