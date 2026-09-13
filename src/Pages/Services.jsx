
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

import delivery from "../assets/delivery.png";
import {
  TbIroningSteamFilled,
  TbIroningFilled,
} from "react-icons/tb";
import {
  FaTshirt,
  FaSoap,
  FaTruck,
  FaBuilding,
} from "react-icons/fa";

import steamIron from "../assets/steam_ironing.png";
import dryclean from "../assets/dryclean.png";
import washiron from "../assets/washiron.png";
import washfold from "../assets/washfold.png";
import { useNavigate } from "react-router-dom";

/* ---------------------------------- */
/* SERVICES */
/* ---------------------------------- */

const services = [
  {
    title: "Wash & Fold",
    shortTitle: "Everyday Care",
    desc:
      "Simplify your daily routine with our Wash & Fold service. We carefully sort, wash, dry, and neatly fold your clothes — just the way you like them.",
    icon: FaTshirt,
    image: washfold,
    number: "01",
    tag: "MOST POPULAR",
  },
  {
    title: "Dry Cleaning",
    shortTitle: "Delicate Care",
    desc:
      "Advanced solvent-based techniques to gently clean delicate fabrics while preserving quality, texture, and color.",
    icon: FaSoap,
    image: dryclean,
    number: "02",
    tag: "PREMIUM",
  },
  {
    title: "Wash & Iron",
    shortTitle: "Clean & Press",
    desc:
      "A complete solution that cleans and presses your clothes to perfection — ideal for daily and formal wear.",
    icon: TbIroningFilled,
    image: washiron,
    number: "03",
    tag: "EVERYDAY",
  },
  {
    title: "Steam Ironing",
    shortTitle: "Wrinkle Free",
    desc:
      "Professional steam ironing that removes tough wrinkles while protecting fabric integrity and keeping your clothes looking fresh.",
    icon: TbIroningSteamFilled,
    image: steamIron,
    number: "04",
    tag: "EXPRESS",
  },
  {
    title: "Pickup & Delivery",
    shortTitle: "Doorstep Service",
    desc:
      "On-time doorstep pickup and delivery — convenience built into every order, without disrupting your day.",
    icon: FaTruck,
    image: delivery,
    number: "05",
    tag: "CONVENIENCE",
  },
  {
    title: "Commercial Laundry",
    shortTitle: "Business Solutions",
    desc:
      "Bulk laundry solutions for hotels, hospitals, and businesses with professional-grade hygiene and consistent quality.",
    icon: FaBuilding,
    image:
      "https://i.pinimg.com/1200x/ff/c4/d0/ffc4d061a4ffc26ff802187c03cbe310.jpg",
    number: "06",
    tag: "BUSINESS",
  },
];

/* ---------------------------------- */
/* MAIN */
/* ---------------------------------- */

const Services = () => {
  const navigate = useNavigate();
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAF8] text-[#111]">

      {/* Ambient background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-32
            -right-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-yellow-300/20
            blur-[100px]
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-[40%]
            -left-40
            h-[400px]
            w-[400px]
            rounded-full
            bg-orange-200/15
            blur-[100px]
          "
        />

      </div>

      {/* -------------------------------- */}
      {/* HERO */}
      {/* -------------------------------- */}

      <section className="relative px-6 pt-32 md:px-12 lg:px-20 lg:pt-40">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-5xl"
          >

            <div className="mb-7 flex items-center gap-4">

              <span className="
                h-px
                w-10
                bg-yellow-500
              " />

              <span className="
                text-xs
                font-bold
                uppercase
                tracking-[0.3em]
                text-gray-500
              ">
                Zusko Services
              </span>

            </div>

            <h1 className="
              max-w-5xl
              text-[clamp(3.2rem,8vw,7.5rem)]
              font-black
              leading-[0.9]
              tracking-[-0.065em]
            ">

              Laundry,
              <br />

              <span className="text-gray-400">
                reimagined.
              </span>

            </h1>

            <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <p className="
                max-w-xl
                text-lg
                leading-relaxed
                text-gray-600
                md:text-xl
              ">
                Premium laundry care designed around your life.
                From everyday clothes to delicate fabrics and
                commercial laundry — we handle it all.
              </p>

              <motion.div
                whileHover={{
                  y: -4,
                }}
                className="
                  flex
                  w-fit
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-3
                  shadow-sm
                "
              >

                <span className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-yellow-400
                  text-sm
                ">
                  ✦
                </span>

                <div>

                  <p className="text-xs font-bold">
                    ONE PLATFORM
                  </p>

                  <p className="text-xs text-gray-500">
                    Everything laundry
                  </p>

                </div>

              </motion.div>

            </div>

          </motion.div>

          {/* Hero metrics */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.7,
            }}
            className="
              mt-16
              grid
              grid-cols-2
              border-y
              border-gray-200
              md:grid-cols-4
            "
          >

            {[
              ["01", "Everyday Laundry"],
              ["02", "Premium Care"],
              ["03", "Doorstep Pickup"],
              ["04", "Business Solutions"],
            ].map(([number, label]) => (

              <div
                key={number}
                className="
                  border-gray-200
                  px-4
                  py-7
                  first:border-l-0
                  md:border-l
                  md:px-7
                "
              >

                <p className="text-xs font-bold text-yellow-600">
                  {number}
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-700">
                  {label}
                </p>

              </div>

            ))}

          </motion.div>

        </div>

      </section>

      {/* -------------------------------- */}
      {/* SERVICES */}
      {/* -------------------------------- */}

      <section className="relative px-6 py-28 md:px-12 lg:px-20 lg:py-40">

        <div className="mx-auto max-w-7xl">

          <div className="mb-20 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="
                text-xs
                font-bold
                uppercase
                tracking-[0.3em]
                text-yellow-600
              ">
                What we do
              </p>

              <h2 className="
                mt-4
                text-4xl
                font-black
                tracking-tight
                md:text-6xl
              ">
                Care for every fabric.
              </h2>

            </div>

            <p className="
              max-w-md
              text-gray-500
              md:text-right
            ">
              Select the service that fits your lifestyle.
              We take care of the details.
            </p>

          </div>

          <div className="space-y-32 md:space-y-48">

            {services.map((service, index) => (

              <ServiceBlock
                key={service.title}
                service={service}
                index={index}
              />

            ))}

          </div>

        </div>

      </section>

      {/* -------------------------------- */}
      {/* CTA */}
      {/* -------------------------------- */}

      <section className="relative px-6 pb-24 md:px-12 lg:px-20 lg:pb-32">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[40px]
            bg-[#101010]
            px-7
            py-16
            text-center
            shadow-2xl
            md:px-16
            md:py-24
          "
        >

          {/* Glow */}

          <div className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-72
            w-72
            rounded-full
            bg-yellow-400/20
            blur-[90px]
          " />

          <div className="
            pointer-events-none
            absolute
            -bottom-32
            -left-20
            h-72
            w-72
            rounded-full
            bg-yellow-400/10
            blur-[90px]
          " />

          <div className="relative">

            <div className="
              mx-auto
              mb-6
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-xs
              font-semibold
              text-yellow-400
            ">

              <span>✦</span>

              YOUR CLOTHES DESERVE BETTER

            </div>

            <h2 className="
              mx-auto
              max-w-4xl
              text-4xl
              font-black
              tracking-tight
              text-white
              md:text-6xl
            ">
              Give your laundry
              <span className="text-yellow-400">
                {" "}the Zusko treatment.
              </span>
            </h2>

            <p className="
              mx-auto
              mt-6
              max-w-2xl
              text-gray-400
              md:text-lg
            ">
              Schedule a pickup and let us take care of
              everything from there.
            </p>

            <motion.button
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                mt-9
                rounded-2xl
                bg-yellow-400
                px-9
                py-4
                font-bold
                text-black
                shadow-[0_15px_40px_rgba(255,215,0,.2)]
                transition
                hover:bg-yellow-300
              "
              onClick={() => navigate('/place-order')}
            >
              Book a Pickup
              <span className="ml-2">
                →
              </span>
            </motion.button>

          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default Services;

/* ---------------------------------- */
/* SERVICE BLOCK */
/* ---------------------------------- */

const ServiceBlock = ({
  service,
  index,
}) => {

  const ref = useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: ref,
    offset: [
      "start end",
      "end start",
    ],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [60, -60]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [-20, 30]
  );

  const smoothImageY = useSpring(
    imageY,
    {
      stiffness: 100,
      damping: 25,
    }
  );

  const Icon = service.icon;

  const reverse = index % 2 !== 0;

  return (

    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        y: 70,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className={`
        mx-auto
        flex
        max-w-7xl
        flex-col
        items-center
        gap-12
        md:gap-20
        lg:gap-28
        ${
          reverse
            ? "md:flex-row-reverse"
            : "md:flex-row"
        }
      `}
    >

      {/* IMAGE */}

      <motion.div
        style={{
          y: smoothImageY,
        }}
        className="
          group
          relative
          w-full
          md:w-[52%]
        "
      >

        {/* Glow */}

        <div className="
          absolute
          -inset-5
          rounded-[38px]
          bg-yellow-400/10
          opacity-0
          blur-2xl
          transition
          duration-700
          group-hover:opacity-100
        " />

        <div className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-gray-100
          shadow-[0_25px_70px_rgba(0,0,0,.12)]
        ">

          <img
            src={service.image}
            alt={service.title}
            className="
              h-[380px]
              w-full
              object-cover
              transition
              duration-700
              ease-out
              group-hover:scale-105
              md:h-[520px]
            "
          />

          {/* Image overlay */}

          <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-transparent
          " />

          {/* Number */}

          <div className="
            absolute
            left-6
            top-6
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-black/30
            px-4
            py-2
            text-xs
            font-bold
            text-white
            backdrop-blur-xl
          ">

            <span>
              {service.number}
            </span>

            <span className="h-1 w-1 rounded-full bg-yellow-400" />

            <span>
              {service.tag}
            </span>

          </div>

          {/* Bottom image caption */}

          <div className="
            absolute
            bottom-6
            left-6
            right-6
            flex
            items-end
            justify-between
          ">

            <div>

              <p className="
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/70
              ">
                Zusko
              </p>

              <p className="
                mt-1
                text-2xl
                font-bold
                text-white
              ">
                {service.shortTitle}
              </p>

            </div>

            <motion.div
              whileHover={{
                rotate: 15,
                scale: 1.08,
              }}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-yellow-400
                text-black
                shadow-xl
              "
            >

              <Icon size={22} />

            </motion.div>

          </div>

        </div>

      </motion.div>

      {/* TEXT */}

      <motion.div
        style={{
          y: textY,
        }}
        className="w-full md:w-[42%]"
      >

        <div className="mb-7 flex items-center gap-4">

          <div className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[20px]
            bg-yellow-400
            text-black
            shadow-lg
            shadow-yellow-400/20
          ">

            <Icon size={29} />

          </div>

          <div>

            <p className="
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]
              text-gray-400
            ">
              Service {service.number}
            </p>

            <p className="
              mt-1
              text-sm
              font-semibold
              text-yellow-600
            ">
              {service.tag}
            </p>

          </div>

        </div>

        <h2 className="
          text-4xl
          font-black
          tracking-[-0.04em]
          text-gray-950
          md:text-5xl
        ">
          {service.title}
        </h2>

        <p className="
          mt-6
          max-w-xl
          text-base
          leading-8
          text-gray-600
          md:text-lg
        ">
          {service.desc}
        </p>

        {/* Features */}

        <div className="
          mt-8
          grid
          grid-cols-2
          gap-3
        ">

          {[
            "Professional Care",
            "Fabric Friendly",
            "Quality Checked",
            "Doorstep Ready",
          ].map((feature) => (

            <motion.div
              key={feature}
              whileHover={{
                x: 4,
              }}
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-700
              "
            >

              <span className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-yellow-100
                text-[10px]
                text-yellow-700
              ">
                ✓
              </span>

              {feature}

            </motion.div>

          ))}

        </div>

        {/* Learn more */}

        <motion.button
        onClick={() => navigate('/place-order')}
          whileHover={{
            x: 8,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            group
            mt-9
            inline-flex
            items-center
            gap-3
            font-bold
            text-black
          "
        >

          <span>
            Explore service
          </span>

          <span className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-black
            text-white
            transition
            group-hover:bg-yellow-400
            group-hover:text-black
          ">
            →
          </span>

        </motion.button>

      </motion.div>

    </motion.article>

  );
};

