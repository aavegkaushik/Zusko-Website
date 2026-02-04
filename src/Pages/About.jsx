"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { content } from "../constants/About.content";

const About = () => {
  return (
    <section className="relative mt-10 bg-white text-black overflow-hidden">
      {content.map((section, index) => (
        <AboutBlock key={index} section={section} index={index} />
      ))}
    </section>
  );
};

export default About;

/* --------------------------------------------- */

const AboutBlock = ({ section, index }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax motion
  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yText = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative py-28 px-6 md:px-24"
    >
      <div
        className={`mx-auto max-w-7xl flex flex-col gap-16 items-center
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
      >
        {/* Image */}
        <motion.div
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative md:w-5/12"
        >
          <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-black/5 to-black/0" />
          <img
            src={section.img}
            alt={section.title}
            className="relative rounded-3xl w-full h-[360px] object-cover shadow-2xl"
          />
        </motion.div>

        {/* Text */}
<motion.div
  style={{ y: yText }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  }}
  className="md:w-6/12"
>
  {/* Eyebrow */}
  <motion.span
    variants={fadeUp}
    className="inline-block text-xs uppercase tracking-[0.3em] text-black/50 mb-4"
  >
    About Zusko
  </motion.span>

  {/* Title */}
  <motion.h2
    variants={fadeUp}
    className="text-[clamp(2.4rem,4vw,3.2rem)]
               font-semibold leading-[1.05]
               tracking-tight text-black
               mb-6"
  >
    {section.title}
  </motion.h2>

  {/* Description */}
  <motion.div
  variants={fadeUp}
  className="text-[17px] leading-[1.85] text-black/70 max-w-xl"
>
  {/* Intro sentence */}
  <p className="mb-4">
    {section.text.split("•")[0].trim()}
  </p>

  {/* Bullet points */}
  <ul className="pl-5 space-y-3 list-disc">
    {section.text
      .split("•")
      .slice(1)
      .map((item, i) => (
        <li key={i}>
          {item.trim()}
        </li>
      ))}
  </ul>
</motion.div>

</motion.div>

      </div>

      {/* Soft divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />
    </motion.div>
  );
};

/* --------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
