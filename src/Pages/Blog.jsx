import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";

import image1 from "../assets/Blog_image_1.png";

const blogs = [
  {
    id: 1,
    title: "How Zusko is Redefining Urban Laundry Experience",
    author: "Aaveg Kaushik",
    date: "October 20, 2025",
    image: image1,
    category: "Inside Zusko",
    description:
      "At Zusko, we are transforming laundry into a seamless digital experience. Discover how technology and sustainability come together to save your time and energy.",
  },
  {
    id: 2,
    title: "5 Reasons Why On-Demand Laundry Is the Future",
    author: "Shubh Diwakar",
    date: "October 10, 2025",
    image:
      "https://images.unsplash.com/photo-1600170311834-9b0f9d9b2c76?auto=format&fit=crop&w=900&q=60",
    category: "Lifestyle",
    description:
      "Convenience and speed define modern life — and on-demand laundry fits perfectly into it. Here’s why doorstep laundry services are here to stay.",
  },
  {
    id: 3,
    title: "Sustainability in Laundry: Zusko’s Eco-Friendly Approach",
    author: "Team Zusko",
    date: "September 25, 2025",
    image:
      "https://images.unsplash.com/photo-1618080464428-7b4f3f1e7e2c?auto=format&fit=crop&w=900&q=60",
    category: "Sustainability",
    description:
      "From eco-friendly detergents to water-efficient machines, Zusko is committed to making clean clothes sustainable. Learn more about our green initiative.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
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

const Blog = () => {
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-gray-900">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <div
          className="
            absolute
            -right-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-yellow-300/15
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -left-40
            top-[35%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-gray-200/30
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            right-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-yellow-200/10
            blur-[120px]
          "
        />

      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          px-6
          pb-16
          pt-32
          md:px-12
          md:pb-24
          md:pt-40
          lg:px-20
        "
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl"
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

              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-yellow-400
                  text-black
                "
              >
                <Sparkles size={13} />
              </span>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-gray-600
                "
              >
                The Zusko Journal
              </span>

            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={fadeUp}
              className="
                text-5xl
                font-black
                leading-[0.95]
                tracking-[-0.055em]
                text-gray-950
                sm:text-6xl
                md:text-7xl
                lg:text-[88px]
              "
            >
              Ideas worth
              <br />

              <span className="relative inline-block">

                <span className="relative z-10">
                  knowing.
                </span>

                <motion.span
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.55,
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

            <motion.p
              variants={fadeUp}
              className="
                mt-7
                max-w-2xl
                text-base
                leading-8
                text-gray-500
                md:text-lg
              "
            >
              Stories, insights and ideas from the world of
              laundry, technology, sustainability and modern
              urban living.
            </motion.p>

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          FEATURED ARTICLE
      ====================================================== */}

      <section className="px-5 pb-24 md:px-10 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <motion.article
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-gray-200
              bg-gray-950
              shadow-[0_30px_90px_rgba(0,0,0,0.10)]
            "
          >

            <div className="grid lg:grid-cols-2">

              {/* Image */}

              <div className="
                relative
                min-h-[340px]
                overflow-hidden
                lg:min-h-[560px]
              ">

                <motion.img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />

                <div className="
                  absolute
                  inset-0
                  bg-linear-to-t
                  from-black/50
                  via-transparent
                  to-transparent
                " />

                {/* Featured badge */}

                <div className="
                  absolute
                  left-6
                  top-6
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-yellow-400
                  px-4
                  py-2
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.15em]
                  text-black
                  shadow-lg
                ">
                  Featured story
                </div>

              </div>

              {/* Content */}

              <div className="
                flex
                flex-col
                justify-center
                px-7
                py-10
                md:px-12
                md:py-14
              ">

                <span className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-yellow-400
                ">
                  {featuredBlog.category}
                </span>

                <h2 className="
                  mt-4
                  text-3xl
                  font-black
                  leading-[1.05]
                  tracking-[-0.035em]
                  text-white
                  md:text-5xl
                ">
                  {featuredBlog.title}
                </h2>

                <p className="
                  mt-6
                  text-sm
                  leading-7
                  text-gray-400
                  md:text-base
                ">
                  {featuredBlog.description}
                </p>

                {/* Metadata */}

                <div className="
                  mt-7
                  flex
                  flex-wrap
                  gap-4
                  border-t
                  border-white/10
                  pt-6
                  text-xs
                  text-gray-400
                ">

                  <span className="flex items-center gap-2">
                    <FaUser
                      className="text-yellow-400"
                      size={12}
                    />
                    {featuredBlog.author}
                  </span>

                  <span className="
                    hidden
                    h-1
                    w-1
                    self-center
                    rounded-full
                    bg-gray-600
                    sm:block
                  " />

                  <span className="flex items-center gap-2">
                    <FaCalendarAlt
                      className="text-yellow-400"
                      size={12}
                    />
                    {featuredBlog.date}
                  </span>

                </div>

                {/* CTA */}

                <motion.button
                  whileHover={{
                    x: 6,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    group/button
                    mt-8
                    flex
                    w-fit
                    items-center
                    gap-3
                    font-bold
                    text-white
                  "
                >

                  <span>
                    Read article
                  </span>

                  <span className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-400
                    text-black
                    transition-all
                    duration-300
                    group-hover/button:bg-white
                  ">
                    <FaArrowRight size={12} />
                  </span>

                </motion.button>

              </div>

            </div>

          </motion.article>

        </div>

      </section>

      {/* =====================================================
          LATEST STORIES
      ====================================================== */}

      <section className="
        px-5
        pb-24
        md:px-10
        lg:px-20
      ">

        <div className="mx-auto max-w-7xl">

          {/* Section header */}

          <div className="
            mb-10
            flex
            flex-col
            justify-between
            gap-5
            md:flex-row
            md:items-end
          ">

            <div>

              <p className="
                mb-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.22em]
                text-yellow-600
              ">
                Latest stories
              </p>

              <h2 className="
                text-3xl
                font-black
                tracking-[-0.035em]
                text-gray-950
                md:text-4xl
              ">
                From the journal.
              </h2>

            </div>

            <p className="
              max-w-sm
              text-sm
              leading-6
              text-gray-500
            ">
              Explore ideas around better laundry,
              better living and a more sustainable future.
            </p>

          </div>

          {/* Cards */}

          <div className="
            grid
            gap-7
            md:grid-cols-2
          ">

            {remainingBlogs.map((blog, index) => (

              <motion.article
                key={blog.id}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -7,
                }}
                className="
                  group
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-gray-200
                  bg-white
                  shadow-[0_12px_40px_rgba(0,0,0,0.04)]
                  transition-shadow
                  duration-500
                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.09)]
                "
              >

                {/* Image */}

                <div className="
                  relative
                  h-[280px]
                  overflow-hidden
                  bg-gray-100
                ">

                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    whileHover={{
                      scale: 1.07,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  {/* Image overlay */}

                  <div className="
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black/35
                    via-transparent
                    to-transparent
                    opacity-70
                  " />

                  {/* Category */}

                  <div className="
                    absolute
                    left-5
                    top-5
                    rounded-full
                    border
                    border-white/20
                    bg-black/50
                    px-3
                    py-1.5
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.15em]
                    text-white
                    backdrop-blur-md
                  ">
                    {blog.category}
                  </div>

                </div>

                {/* Card content */}

                <div className="p-6 md:p-7">

                  {/* Metadata */}

                  <div className="
                    mb-4
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-400
                  ">

                    <span className="flex items-center gap-1.5">
                      <FaUser size={10} />
                      {blog.author}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt size={10} />
                      {blog.date}
                    </span>

                  </div>

                  {/* Title */}

                  <h3 className="
                    text-2xl
                    font-black
                    leading-tight
                    tracking-[-0.025em]
                    text-gray-950
                    transition-colors
                    duration-300
                    group-hover:text-gray-600
                  ">
                    {blog.title}
                  </h3>

                  {/* Description */}

                  <p className="
                    mt-4
                    text-sm
                    leading-7
                    text-gray-500
                  ">
                    {blog.description}
                  </p>

                  {/* CTA */}

                  <motion.button
                    whileHover={{
                      x: 5,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      group/read
                      mt-6
                      flex
                      items-center
                      gap-3
                      text-sm
                      font-black
                      text-gray-950
                    "
                  >

                    <span>
                      Read More
                    </span>

                    <span className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-yellow-400
                      text-black
                      transition-all
                      duration-300
                      group-hover/read:bg-black
                      group-hover/read:text-white
                    ">
                      <FaArrowRight size={10} />
                    </span>

                  </motion.button>

                </div>

              </motion.article>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="
        px-5
        pb-20
        md:px-10
        lg:px-20
      ">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[28px]
            bg-yellow-400
            px-7
            py-12
            md:px-12
            md:py-14
          "
        >

          <div className="
            pointer-events-none
            absolute
            -right-24
            -top-28
            h-72
            w-72
            rounded-full
            border-[45px]
            border-black/5
          " />

          <div className="
            relative
            flex
            flex-col
            justify-between
            gap-7
            md:flex-row
            md:items-center"
          >

            <div>

              <p className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-black/50
              ">
                Stay curious
              </p>

              <h2 className="
                mt-2
                max-w-xl
                text-3xl
                font-black
                tracking-[-0.035em]
                text-black
                md:text-4xl
              ">
                More stories.
                <br />
                More ways to live easier.
              </h2>

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
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
              "
            >
              <FaArrowRight size={17} />
            </motion.div>

          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default Blog;
