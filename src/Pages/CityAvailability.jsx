import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Shirt, Sparkles, Truck, MapPin, Navigation  } from "lucide-react";
import cities from "../data/cities";
import cityBg from '../assets/city.jpg'
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

//Area Illustration
const areaContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const areaItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};


const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

//Service Name with Icons
const serviceIcons = {
  "Wash & Fold": Shirt,
  "Dry Cleaning": Sparkles,
  // "Ironing": ,
  "Pickup & Delivery": Truck,
};

export default function CityAvailability() {
  const { city } = useParams();
  const cityData = cities[city];

  if (!cityData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">City not found</h2>
      </div>
    );
  }

  document.title = `Laundry Service in ${cityData.name} | Zusko`;

  return (
    <section className="bg-white min-h-screen mt-20">
      {/* HERO */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative h-[70vh] flex items-center justify-center text-center"
  style={{
    backgroundImage: `url(${cityBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <h1 className="text-4xl md:text-5xl font-bold text-white">
      Laundry Services in{" "}
      <span className="text-yellow-400">{cityData.name}</span>
    </h1>

    <p className="mt-5 text-gray-200 text-lg">
      Reliable pickup & delivery laundry services powered by trusted Zusko partners.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition">
        Schedule Pickup
      </button>

      <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl transition">
        Partner With Us
      </button>
    </div>
  </div>
</motion.div>


      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* STATUS */}
        {!cityData.operational && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded"
          >
            🚧 We’re launching soon in {cityData.name}.  
            Join our waitlist to get notified.
          </motion.div>
        )}

        {/* SERVICES */}
        {cityData.services && (
          <motion.div
  variants={container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* Heading */}
  <motion.h2
    variants={card}
    className="text-2xl md:text-3xl font-bold text-black"
  >
    Services Available
  </motion.h2>

  {/* Cards */}
  <div className="mt-8 grid cursor-pointer sm:grid-cols-2 md:grid-cols-3 gap-6">
    {cityData.services.map((service) => {
      const Icon = serviceIcons[service] || Shirt;

      return (
        <motion.div
          key={service}
          variants={card}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="group border border-gray-200 rounded-xl p-6 bg-white 
                     hover:border-yellow-400 hover:shadow-lg transition-all"
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center
                          group-hover:bg-yellow-400 transition">
            <Icon className="w-6 h-6 text-yellow-500 group-hover:text-black transition" />
          </div>

          {/* Text */}
          <h3 className="mt-4 text-lg font-semibold text-black">
            {service}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Professional {service.toLowerCase()} with quality assurance.
          </p>
        </motion.div>
      );
    })}
  </div>
</motion.div>

        )}

        {/* AREAS */}
        {cityData.areas && (
          <motion.div
  variants={areaContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* Heading */}
  <motion.div variants={areaItem} className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
      <Navigation className="w-5 h-5 text-yellow-500" />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-black">
      Areas We Cover
    </h2>
  </motion.div>

  {/* Subtext */}
  <motion.p
    variants={areaItem}
    className="mt-4 text-gray-600 max-w-2xl"
  >
    We currently provide pickup & delivery services across the following
    locations in {cityData.name}.
  </motion.p>

  {/* Area Grid */}
  <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
    {cityData.areas.map((area) => (
      <motion.div
        key={area}
        variants={areaItem}
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260 }}
        className="group relative border border-gray-200 rounded-xl p-5 bg-white
                   hover:border-yellow-400 hover:shadow-lg transition-all"
      >
        {/* Pin Icon */}
        <div className="absolute -top-4 left-4 bg-white p-2 rounded-full border
                        group-hover:border-yellow-400 transition">
          <MapPin className="w-5 h-5 text-yellow-500 animate-pulse" />
        </div>

        {/* Area Name */}
        <h3 className="mt-4 text-lg font-semibold text-black">
          {area}
        </h3>

        {/* Supporting Text */}
        <p className="mt-1 text-sm text-gray-600">
          Pickup & delivery available in this area.
        </p>
      </motion.div>
    ))}
  </div>
</motion.div>

        )}

        {/* DELIVERY */}
        {cityData.deliveryTime && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-black text-white p-8 rounded-xl"
          >
            <h3 className="text-xl font-semibold">
              ⏱ Delivery Time
            </h3>
            <p className="mt-2 text-yellow-400 text-lg">
              {cityData.deliveryTime}
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition">
            Schedule Pickup
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Partner with Zusko for smart & reliable laundry operations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
