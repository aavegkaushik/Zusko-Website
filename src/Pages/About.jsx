
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Check,
} from "lucide-react";

import { content } from "../constants/About.content";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -30,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 30,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   MAIN ABOUT
========================================================= */

const About = () => {
  return (
    <main className="relative overflow-hidden bg-white text-black">

      {/* =====================================================
          GLOBAL BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <div className="
          absolute
          -right-52
          -top-52
          h-[650px]
          w-[650px]
          rounded-full
          bg-yellow-300/15
          blur-[140px]
        " />

        <div className="
          absolute
          left-[-250px]
          top-[38%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-gray-200/30
          blur-[140px]
        " />

        <div className="
          absolute
          bottom-[-250px]
          right-[10%]
          h-[550px]
          w-[550px]
          rounded-full
          bg-yellow-200/10
          blur-[130px]
        " />

      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="
        relative
        px-6
        pb-20
        pt-32
        md:px-12
        md:pb-28
        md:pt-40
        lg:px-20
      ">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-5xl"
          >

            {/* Eyebrow */}

            <motion.div
              variants={fadeUp}
              className="
                mb-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-white/80
                px-4
                py-2
                shadow-sm
                backdrop-blur-xl
              "
            >

              <span className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-yellow-400
              ">
                <Sparkles
                  size={13}
                  strokeWidth={2.5}
                />
              </span>

              <span className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.22em]
                text-gray-600
              ">
                The Zusko Story
              </span>

            </motion.div>

            {/* Main heading */}

            <motion.h1
              variants={fadeUp}
              className="
                max-w-5xl
                text-5xl
                font-black
                leading-[0.95]
                tracking-[-0.055em]
                text-gray-950
                sm:text-6xl
                md:text-7xl
                lg:text-[92px]
              "
            >
              Laundry should be
              <br />

              <span className="relative inline-block">

                <span className="relative z-10">
                  effortless.
                </span>

                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.65,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    bottom-1
                    left-0
                    -z-0
                    h-3
                    rounded-full
                    bg-yellow-400
                    md:h-4
                  "
                />

              </span>
            </motion.h1>

            {/* Intro */}

            <motion.p
              variants={fadeUp}
              className="
                mt-8
                max-w-2xl
                text-base
                leading-8
                text-gray-500
                md:text-lg
              "
            >
              We are building a simpler way to take care of
              everyday laundry — combining professional care,
              reliable service and doorstep convenience.
            </motion.p>

            {/* Mini metrics */}

            <motion.div
              variants={fadeUp}
              className="
                mt-10
                flex
                flex-wrap
                gap-x-8
                gap-y-4
                border-t
                border-gray-200
                pt-6
              "
            >

              <div>
                <p className="
                  text-2xl
                  font-black
                  tracking-tight
                ">
                  01
                </p>

                <p className="
                  mt-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-gray-400
                ">
                  Simple experience
                </p>
              </div>

              <div>
                <p className="
                  text-2xl
                  font-black
                  tracking-tight
                ">
                  24/7
                </p>

                <p className="
                  mt-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-gray-400
                ">
                  Convenience
                </p>
              </div>

              <div>
                <p className="
                  text-2xl
                  font-black
                  tracking-tight
                ">
                  100%
                </p>

                <p className="
                  mt-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-gray-400
                ">
                  Customer focused
                </p>
              </div>

            </motion.div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          CONTENT SECTIONS
      ====================================================== */}

      <section className="relative">

        {content.map((section, index) => (
          <AboutBlock
            key={index}
            section={section}
            index={index}
          />
        ))}

      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="
        px-5
        pb-20
        pt-10
        md:px-10
        md:pb-28
        lg:px-20
      ">

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[30px]
            bg-gray-950
            px-7
            py-12
            md:px-12
            md:py-16
          "
        >

          {/* Background glow */}

          <div className="
            pointer-events-none
            absolute
            -right-20
            -top-40
            h-80
            w-80
            rounded-full
            bg-yellow-400/20
            blur-[100px]
          " />

          {/* Decorative circle */}

          <div className="
            pointer-events-none
            absolute
            -bottom-28
            -right-20
            h-64
            w-64
            rounded-full
            border-[45px]
            border-white/5
          " />

          <div className="
            relative
            flex
            flex-col
            justify-between
            gap-10
            md:flex-row
            md:items-center
          ">

            <div>

              <p className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.22em]
                text-yellow-400
              ">
                The next chapter
              </p>

              <h2 className="
                mt-3
                max-w-2xl
                text-3xl
                font-black
                leading-tight
                tracking-[-0.035em]
                text-white
                md:text-5xl
              ">
                We're just getting
                <br />
                started.
              </h2>

              <p className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-gray-400
                md:text-base
              ">
                Zusko is on a mission to make laundry feel
                less like a chore and more like something
                you never have to think about.
              </p>

            </div>

            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: 2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-yellow-400
                text-black
                shadow-[0_15px_35px_rgba(250,204,21,0.2)]
              "
            >
              <ArrowUpRight size={25} />
            </motion.div>

          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default About;

/* =========================================================
   ABOUT BLOCK
========================================================= */

const AboutBlock = ({ section, index }) => {

  const ref = useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Smooth parallax */

  const imageYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [55, -55]
  );

  const textYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [-25, 25]
  );

  const imageY = useSpring(imageYRaw, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const textY = useSpring(textYRaw, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const isEven = index % 2 === 0;

  /*
    Split existing content exactly as before:
    first part = intro
    bullet separated by "•"
  */

  const textParts = section.text
    .split("•")
    .map((item) => item.trim())
    .filter(Boolean);

  const intro = textParts[0];

  const bullets = textParts.slice(1);

  return (
    <motion.section
      ref={ref}
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="
        relative
        overflow-hidden
        px-5
        py-24
        md:px-10
        md:py-32
        lg:px-20
      "
    >

      {/* =====================================================
          SECTION NUMBER
      ====================================================== */}

      <div className="
        pointer-events-none
        absolute
        left-5
        top-10
        select-none
        text-[100px]
        font-black
        leading-none
        tracking-[-0.08em]
        text-gray-100
        md:left-10
        md:text-[160px]
        lg:left-20
      ">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* =====================================================
          CONTENT GRID
      ====================================================== */}

      <div
        className={`
          relative
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          gap-14
          md:gap-20
          lg:gap-24
          ${
            isEven
              ? "lg:flex-row"
              : "lg:flex-row-reverse"
          }
        `}
      >

        {/* =================================================
            IMAGE
        ================================================== */}

        <motion.div
          style={{
            y: imageY,
          }}
          initial={{
            opacity: 0,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            group
            relative
            w-full
            lg:w-[47%]
          "
        >

          {/* Outer glow */}

          <div className="
            absolute
            -inset-4
            rounded-[34px]
            bg-yellow-300/10
            blur-2xl
            transition-opacity
            duration-500
            group-hover:opacity-70
          " />

          {/* Image frame */}

          <div className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-gray-200
            bg-gray-100
            shadow-[0_30px_80px_rgba(0,0,0,0.10)]
          ">

            <motion.img
              src={section.img}
              alt={section.title}
              whileHover={{
                scale: 1.045,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="
                h-[340px]
                w-full
                object-cover
                md:h-[430px]
                lg:h-[500px]
              "
            />

            {/* Image gradient */}

            <div className="
              pointer-events-none
              absolute
              inset-0
              bg-linear-to-t
              from-black/45
              via-transparent
              to-transparent
              opacity-70
            " />

            {/* Floating label */}

            <div className="
              absolute
              bottom-5
              left-5
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/20
              bg-black/55
              px-4
              py-3
              text-white
              shadow-xl
              backdrop-blur-xl
            ">

              <span className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-yellow-400
                text-black
              ">
                <Check size={14} strokeWidth={3} />
              </span>

              <span className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
              ">
                The Zusko way
              </span>

            </div>

          </div>

          {/* Small corner accent */}

          <div className={`
            absolute
            -bottom-4
            h-20
            w-20
            rounded-2xl
            border
            border-yellow-400/40
            bg-yellow-400/10
            ${
              isEven
                ? "-right-4"
                : "-left-4"
            }
          `} />

        </motion.div>

        {/* =================================================
            TEXT
        ================================================== */}

        <motion.div
          style={{
            y: textY,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={stagger}
          className="
            w-full
            lg:w-[48%]
          "
        >

          {/* Eyebrow */}

          <motion.div
            variants={fadeUp}
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >

            <span className="
              h-px
              w-8
              bg-yellow-400
            " />

            <span className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.22em]
              text-gray-400
            ">
              About Zusko
            </span>

          </motion.div>

          {/* Title */}

          <motion.h2
            variants={fadeUp}
            className="
              max-w-xl
              text-[clamp(2.4rem,4.5vw,4rem)]
              font-black
              leading-[0.98]
              tracking-[-0.045em]
              text-gray-950
            "
          >
            {section.title}
          </motion.h2>

          {/* Intro */}

          <motion.p
            variants={fadeUp}
            className="
              mt-7
              max-w-xl
              text-[17px]
              font-medium
              leading-8
              text-gray-700
            "
          >
            {intro}
          </motion.p>

          {/* Divider */}

          <motion.div
            variants={fadeUp}
            className="
              my-7
              h-px
              w-full
              max-w-xl
              bg-gray-200
            "
          />

          {/* Bullet points */}

          {bullets.length > 0 && (
            <motion.ul
              variants={stagger}
              className="
                max-w-xl
                space-y-4
              "
            >

              {bullets.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="
                    group
                    flex
                    items-start
                    gap-4
                  "
                >

                  {/* Bullet */}

                  <span className="
                    mt-1
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-100
                    text-yellow-700
                    transition-all
                    duration-300
                    group-hover:bg-yellow-400
                    group-hover:text-black
                  ">

                    <Check
                      size={14}
                      strokeWidth={3}
                    />

                  </span>

                  {/* Text */}

                  <span className="
                    pt-0.5
                    text-[15px]
                    leading-7
                    text-gray-500
                    transition-colors
                    duration-300
                    group-hover:text-gray-800
                  ">
                    {item}
                  </span>

                </motion.li>
              ))}

            </motion.ul>
          )}

          {/* Bottom accent */}

          <motion.div
            variants={fadeUp}
            className="
              mt-9
              inline-flex
              items-center
              gap-3
              text-xs
              font-black
              uppercase
              tracking-[0.15em]
              text-gray-900
            "
          >

            <span>
              Built with purpose
            </span>

            <span className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
            ">
              <ArrowUpRight size={14} />
            </span>

          </motion.div>

        </motion.div>

      </div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div className="
        absolute
        bottom-0
        left-1/2
        h-px
        w-[70%]
        -translate-x-1/2
        bg-linear-to-r
        from-transparent
        via-gray-200
        to-transparent
      " />

    </motion.section>
  );
};

