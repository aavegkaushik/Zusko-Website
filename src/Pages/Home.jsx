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
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

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
          className="flex text-5xl p-5 ml-36 mt-10 font-extrabold gap-4"
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
          className="w-full bg-black text-white flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-0 pt-5 overflow-hidden"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Content */}
          <motion.div
            className="flex-1 flex flex-col items-start text-left space-y-6"
            variants={fadeUp}
          >
            <img src={Logo} alt="App Logo" className="w-28 md:w-36" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Get the Zusko App Now!
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed">
              Experience hassle-free laundry services right from your phone.
              Track orders, apply offers, and schedule pickups with just one
              tap.
            </p>
          </motion.div>

          {/* Right Side - Mobile Image */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <img
              src={Mobile}
              alt="Mobile App Preview"
              className="w-[50%] max-w-[400px] object-contain"
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
