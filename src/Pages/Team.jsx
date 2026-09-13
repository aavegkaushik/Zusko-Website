
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import {
  Sparkles,
  ArrowUpRight,
  Users,
  Target,
  Heart,
} from "lucide-react";

import Aaveg from "../assets/Aaveg1.jpeg";
import Shubh from "../assets/Shubh.jpg";
import points from "../assets/points.png";

/* ============================================================
   ANIMATIONS
============================================================ */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ============================================================
   TEAM DATA
============================================================ */

const founders = [
  {
    number: "01",
    img: Aaveg,
    name: "Aaveg Kaushik",
    role: "Co-Founder & CEO",

    desc: "Aaveg leads Zusko with a product-first mindset and a deep focus on trust, reliability, and user experience. His vision is to simplify urban living through thoughtful technology.",

    linkedin:
      "https://www.linkedin.com/in/aaveg-kaushik-a97453218/",

    email: "aaveg.kaushik@zusko.in",

    quote:
      "Building technology that quietly makes everyday life easier.",

    focus: "Product & Technology",
  },

  {
    number: "02",
    img: Shubh,
    name: "Shubh Diwakar",
    role: "Co-Founder & CMO",

    desc: "Shubh drives Zusko’s brand, growth, and storytelling. He focuses on creating meaningful connections and positioning Zusko as a trusted everyday companion.",

    linkedin:
      "https://www.linkedin.com/in/shubh-diwakar-a29625295/",

    instagram: "#",

    email: "shubh.diwakar@zusko.in",

    quote:
      "Turning a service into a brand people genuinely trust.",

    focus: "Brand & Growth",
  },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

const Team = () => {
  return (
    <section className="relative mt-24 min-h-screen w-full overflow-hidden bg-[#FAFAF7] px-6 py-24 md:px-12 md:py-32 lg:px-20">

      {/* ======================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-yellow-300/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-yellow-200/20 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,199,0,0.08),transparent_35%)]" />

      </div>

      {/* ======================================================
          DECORATIVE POINTS
      ====================================================== */}

      <motion.img
        src={points}
        alt=""
        aria-hidden="true"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-0 top-44 z-0 w-40 opacity-25 md:w-56"
      />

      <motion.img
        src={points}
        alt=""
        aria-hidden="true"
        animate={{
          y: [0, -15, 0],
          rotate: [180, 178, 180],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-28 right-0 z-0 w-40 opacity-20 md:w-56"
      />

      {/* ======================================================
          HERO
      ====================================================== */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >

        {/* Eyebrow */}

        <motion.div
          variants={fadeUp}
          custom={0}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 shadow-sm"
        >
          <Sparkles
            size={13}
            className="text-yellow-500"
          />

          The people behind Zusko
        </motion.div>

        {/* Heading */}

        <motion.h1
          variants={fadeUp}
          custom={0.1}
          className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-[#151515]"
        >
          Meet the
          <br />

          <span className="relative inline-block">

            Founders

            <motion.span
              initial={{
                width: 0,
              }}
              whileInView={{
                width: "100%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.7,
                duration: 0.8,
              }}
              className="absolute -bottom-2 left-0 h-2 rounded-full bg-[#FFC700] md:-bottom-3 md:h-3"
            />

          </span>
        </motion.h1>

        {/* Description */}

        <motion.p
          variants={fadeUp}
          custom={0.2}
          className="mx-auto mt-8 max-w-2xl text-base leading-7 text-gray-600 md:text-lg"
        >
          Two people, one shared vision — making laundry simpler,
          smarter, and more effortless for everyday life.
        </motion.p>

      </motion.div>

      {/* ======================================================
          VALUES STRIP
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.2,
        }}
        viewport={{
          once: true,
        }}
        className="relative z-10 mx-auto mt-16 grid max-w-4xl grid-cols-3 divide-x divide-black/10 rounded-3xl border border-black/10 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:p-7"
      >

        <Value
          icon={<Users size={18} />}
          title="Customer"
          subtitle="Obsessed"
        />

        <Value
          icon={<Target size={18} />}
          title="Purpose"
          subtitle="Driven"
        />

        <Value
          icon={<Heart size={18} />}
          title="Built with"
          subtitle="Care"
        />

      </motion.div>

      {/* ======================================================
          FOUNDERS
      ====================================================== */}

      <div className="relative z-10 mx-auto mt-24 grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-10">

        {founders.map((founder, index) => (
          <FounderCard
            key={founder.name}
            founder={founder}
            delay={index * 0.15}
          />
        ))}

      </div>

      {/* ======================================================
          BOTTOM CTA
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
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
        }}
        className="relative z-10 mx-auto mt-24 max-w-6xl overflow-hidden rounded-[2rem] bg-black"
      >

        {/* Glow */}

        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-yellow-400/15 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-12 lg:p-14">

          <div className="max-w-xl">

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400">
              We're just getting started
            </p>

            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Building the future of
              <span className="text-yellow-400">
                {" "}everyday laundry.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
              Zusko is on a mission to make professional laundry
              accessible, reliable, and effortless.
            </p>

          </div>

          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black shadow-[0_0_40px_rgba(255,199,0,0.18)]"
          >
            <ArrowUpRight size={27} />
          </motion.div>

        </div>

      </motion.div>

      {/* ======================================================
          BRAND FOOTER
      ====================================================== */}

      <motion.p
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
        }}
        className="relative z-10 mt-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400"
      >
        ZUSKO — Laundry, reimagined.
      </motion.p>

    </section>
  );
};

export default Team;

/* ============================================================
   VALUE COMPONENT
============================================================ */

const Value = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="flex flex-col items-center justify-center px-2 text-center"
    >

      <div className="mb-2 flex items-center gap-2 text-yellow-500">
        {icon}

        <span className="text-sm font-black text-black md:text-base">
          {title}
        </span>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 md:text-xs">
        {subtitle}
      </p>

    </motion.div>
  );
};

/* ============================================================
   FOUNDER CARD
============================================================ */

const FounderCard = ({
  founder,
  delay,
}) => {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.07)] transition-shadow duration-500 hover:shadow-[0_35px_100px_rgba(0,0,0,0.12)]"
    >

      {/* ======================================================
          TOP AREA
      ====================================================== */}

      <div className="relative h-[26rem] overflow-hidden bg-[#ECEDE9] md:h-[30rem]">

        {/* Founder number */}

        <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
          <span className="text-yellow-400">
            {founder.number}
          </span>

          Founder
        </div>

        {/* Focus badge */}

        <div className="absolute right-6 top-6 z-20 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-gray-600 shadow-sm backdrop-blur-md">
          {founder.focus}
        </div>

        {/* Image */}

        <motion.img
          src={founder.img}
          alt={founder.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Image gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-80" />

        {/* Yellow corner accent */}

        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: "35%",
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: delay + 0.3,
          }}
          className="absolute bottom-0 left-0 h-1.5 bg-yellow-400"
        />

        {/* Image quote */}

        <div className="absolute bottom-7 left-7 right-7 z-10">

          <p className="max-w-md text-sm font-medium leading-6 text-white/90 md:text-base">
            “{founder.quote}”
          </p>

        </div>

      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="p-7 md:p-9">

        {/* Name / Role */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

          <div>

            <h2 className="text-2xl font-black tracking-tight text-black md:text-3xl">
              {founder.name}
            </h2>

            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 md:text-xs">
              {founder.role}
            </p>

          </div>

          {/* Arrow */}

          <motion.div
            whileHover={{
              rotate: 45,
            }}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#F8F8F5] text-black sm:flex"
          >
            <ArrowUpRight size={17} />
          </motion.div>

        </div>

        {/* Description */}

        <p className="mt-6 text-sm leading-7 text-gray-600 md:text-base">
          {founder.desc}
        </p>

        {/* Divider */}

        <div className="my-7 h-px w-full bg-black/10" />

        {/* Socials */}

        <div className="flex items-center justify-between">

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Connect
          </p>

          <div className="flex items-center gap-2">

            {/* LinkedIn */}

            {founder.linkedin && (
              <SocialButton
                href={founder.linkedin}
                label="LinkedIn"
                icon={<FaLinkedin size={16} />}
                hoverClass="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                external
              />
            )}

            {/* Instagram */}

            {founder.instagram && (
              <SocialButton
                href={founder.instagram}
                label="Instagram"
                icon={<FaInstagram size={16} />}
                hoverClass="hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]"
              />
            )}

            {/* Email */}

            {founder.email && (
              <SocialButton
                href={`mailto:${founder.email}`}
                label="Email"
                icon={<FaEnvelope size={15} />}
                hoverClass="hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
              />
            )}

          </div>

        </div>

      </div>

      {/* Bottom hover line */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="absolute bottom-0 left-0 h-1 w-full origin-left bg-yellow-400"
      />

    </motion.article>
  );
};

/* ============================================================
   SOCIAL BUTTON
============================================================ */

const SocialButton = ({
  href,
  icon,
  label,
  hoverClass,
  external = false,
}) => {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#F8F8F5] text-gray-500 transition-all duration-300 ${hoverClass}`}
    >
      {icon}
    </motion.a>
  );
};

