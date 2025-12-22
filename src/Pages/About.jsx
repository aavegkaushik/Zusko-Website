"use client";
import { motion } from "framer-motion";
import { content } from "../constants/About.content";

const About = () => {
  return (
    <div className="mt-20 text-black overflow-hidden">
      {/* Content Sections */}
      {content.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className={`flex flex-col md:flex-row items-center py-16 px-6 md:px-24 justify-center gap-20 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-4/12"
          >
            <img
              src={section.img}
              alt={section.title}
              className="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-4"
          >
            <strong><h2 className="text-3xl font-bold text-black">{section.title}</h2></strong>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {section.text}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default About;
