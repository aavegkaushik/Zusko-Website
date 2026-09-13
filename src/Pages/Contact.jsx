
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Clock3,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import points from "../assets/points.png";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
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

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ContactSimple() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm();

  const [serverMsg, setServerMsg] = useState("");

  const WEB3FORMS_KEY =
    import.meta.env.VITE_WEB3FORMS_KEY || "";

  const onSubmit = async (data) => {
    setServerMsg("");

    if (data.botcheck) return;

    if (!WEB3FORMS_KEY) {
      setServerMsg(
        "Server key not configured. Add VITE_WEB3FORMS_KEY to your .env."
      );
      return;
    }

    const payload = {
      access_key: WEB3FORMS_KEY,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      message: data.message,
      subject: "New contact from Zusko website",
      from_name: "Zusko Website",
    };

    try {
      const res = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `HTTP ${res.status} ${res.statusText} ${text}`
        );
      }

      const json = await res.json().catch(() => null);

      if (!json) {
        throw new Error(
          "Invalid JSON response from server."
        );
      }

      if (json.success) {
        setServerMsg(
          "Your message has been sent successfully!"
        );

        reset();
      } else {
        setServerMsg(
          json.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Contact form error:", err);

      setServerMsg(
        err?.message?.includes("Failed to fetch")
          ? "Network / CORS error. Check console and API origin settings."
          : `Error: ${
              err.message ||
              "Network error. Please try again."
            }`
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-gray-900">

      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-yellow-300/20 blur-[120px]" />

        <div className="absolute -left-40 top-[35%] h-[420px] w-[420px] rounded-full bg-yellow-200/15 blur-[120px]" />

        <div className="absolute bottom-[-180px] right-[15%] h-[500px] w-[500px] rounded-full bg-gray-200/40 blur-[120px]" />

        <div className="absolute inset-x-0 top-0 h-[500px] bg-linear-to-b from-yellow-50/70 via-white to-transparent" />
      </div>

      {/* Decorative points */}

      <motion.img
        src={points}
        alt=""
        aria-hidden="true"
        initial={{
          opacity: 0,
          x: -60,
          y: -30,
        }}
        animate={{
          opacity: 0.45,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-20
          -z-10
          w-32
          md:w-52
        "
      />

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative px-6 pb-14 pt-28 md:px-12 md:pb-20 md:pt-36 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >

            {/* Eyebrow */}

            <motion.div
              variants={fadeUp}
              custom={0.05}
              className="
                mb-6
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
                backdrop-blur-md
              "
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400">
                <MessageCircle
                  size={13}
                  className="text-black"
                  strokeWidth={2.8}
                />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">
                We're here to help
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={fadeUp}
              custom={0.12}
              className="
                text-5xl
                font-black
                leading-[0.95]
                tracking-[-0.045em]
                text-gray-950
                sm:text-6xl
                md:text-7xl
                lg:text-[88px]
              "
            >
              Let's talk.
              <br />

              <span className="relative inline-block">

                <span className="relative z-10">
                  We're listening.
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

            {/* Description */}

            <motion.p
              variants={fadeUp}
              custom={0.22}
              className="
                mx-auto
                mt-7
                max-w-2xl
                text-base
                leading-7
                text-gray-500
                md:text-lg
                md:leading-8
              "
            >
              Have a question about your laundry, an order,
              or our services? Drop us a message and the
              Zusko team will get back to you.
            </motion.p>

            {/* Trust line */}

            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="
                mt-7
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-6
                gap-y-3
                text-xs
                font-semibold
                text-gray-500
              "
            >
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-yellow-500"
                />
                Quick response
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-yellow-500"
                />
                Customer-first support
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-yellow-500"
                />
                Real human support
              </span>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <section className="relative px-5 pb-24 md:px-10 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

            {/* =================================================
                CONTACT FORM
            ================================================== */}

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              custom={0.05}
              className="relative"
            >

              {/* Glow */}

              <div className="
                absolute
                -inset-3
                -z-10
                rounded-[32px]
                bg-yellow-300/20
                blur-2xl
              " />

              <div className="
                overflow-hidden
                rounded-[28px]
                border
                border-gray-200/80
                bg-white
                shadow-[0_25px_80px_rgba(0,0,0,0.08)]
              ">

                {/* Form header */}

                <div className="
                  border-b
                  border-gray-100
                  bg-linear-to-br
                  from-gray-950
                  to-gray-800
                  px-7
                  py-7
                  md:px-10
                  md:py-8
                ">

                  <div className="flex items-start justify-between gap-5">

                    <div>

                      <div className="
                        mb-4
                        inline-flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-yellow-400
                        text-black
                      ">
                        <Sparkles size={19} />
                      </div>

                      <h2 className="
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                        md:text-3xl
                      ">
                        Send us a message
                      </h2>

                      <p className="
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-gray-400
                      ">
                        Tell us what's on your mind.
                        We'll take it from here.
                      </p>

                    </div>

                    <div className="
                      hidden
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      md:flex
                    ">
                      <ArrowUpRight
                        size={20}
                        className="text-yellow-400"
                      />
                    </div>

                  </div>
                </div>

                {/* Form */}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 p-7 md:p-10"
                >

                  {/* Honeypot */}

                  <input
                    type="checkbox"
                    tabIndex={-1}
                    className="hidden"
                    autoComplete="off"
                    {...register("botcheck")}
                  />

                  {/* Name + Email */}

                  <div className="grid gap-6 md:grid-cols-2">

                    {/* Name */}

                    <motion.div
                      variants={fadeUp}
                      custom={0.15}
                    >
                      <label className="
                        mb-2.5
                        block
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-gray-500
                      ">
                        Full Name
                      </label>

                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("name", {
                          required: "Name is required",
                        })}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          px-4
                          py-3.5
                          text-sm
                          font-medium
                          text-gray-900
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-gray-400
                          hover:border-gray-300
                          focus:border-yellow-400
                          focus:bg-white
                          focus:ring-4
                          focus:ring-yellow-400/10
                        "
                      />

                      {errors.name && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            y: -5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="
                            mt-2
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-red-500
                          "
                        >
                          <AlertCircle size={14} />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email */}

                    <motion.div
                      variants={fadeUp}
                      custom={0.2}
                    >
                      <label className="
                        mb-2.5
                        block
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-gray-500
                      ">
                        Email Address
                      </label>

                      <input
                        type="email"
                        placeholder="john@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message:
                              "Enter a valid email address",
                          },
                        })}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          px-4
                          py-3.5
                          text-sm
                          font-medium
                          text-gray-900
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-gray-400
                          hover:border-gray-300
                          focus:border-yellow-400
                          focus:bg-white
                          focus:ring-4
                          focus:ring-yellow-400/10
                        "
                      />

                      {errors.email && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            y: -5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="
                            mt-2
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-red-500
                          "
                        >
                          <AlertCircle size={14} />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </motion.div>

                  </div>

                  {/* Mobile */}

                  <motion.div
                    variants={fadeUp}
                    custom={0.25}
                  >
                    <label className="
                      mb-2.5
                      block
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-gray-500
                    ">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone
                        size={17}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                        "
                      />

                      <input
                        type="tel"
                        placeholder="8004411976"
                        {...register("mobile", {
                          required:
                            "Mobile number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message:
                              "Enter a valid 10-digit mobile number",
                          },
                        })}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          font-medium
                          text-gray-900
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-gray-400
                          hover:border-gray-300
                          focus:border-yellow-400
                          focus:bg-white
                          focus:ring-4
                          focus:ring-yellow-400/10
                        "
                      />

                    </div>

                    {errors.mobile && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="
                          mt-2
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          font-medium
                          text-red-500
                        "
                      >
                        <AlertCircle size={14} />
                        {errors.mobile.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Message */}

                  <motion.div
                    variants={fadeUp}
                    custom={0.3}
                  >
                    <div className="mb-2.5 flex items-center justify-between">

                      <label className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-gray-500
                      ">
                        Message
                      </label>

                      <span className="text-[10px] font-medium text-gray-400">
                        We'd love to hear from you
                      </span>

                    </div>

                    <textarea
                      rows="5"
                      placeholder="Tell us how we can help..."
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/70
                        px-4
                        py-3.5
                        text-sm
                        font-medium
                        leading-6
                        text-gray-900
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-gray-400
                        hover:border-gray-300
                        focus:border-yellow-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-yellow-400/10
                      "
                    />

                    {errors.message && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="
                          mt-2
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          font-medium
                          text-red-500
                        "
                      >
                        <AlertCircle size={14} />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit */}

                  <motion.button
                    variants={fadeUp}
                    custom={0.35}
                    whileHover={{
                      scale: isSubmitting ? 1 : 1.015,
                    }}
                    whileTap={{
                      scale: isSubmitting ? 1 : 0.98,
                    }}
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-xl
                      bg-yellow-400
                      px-6
                      py-4
                      text-sm
                      font-black
                      tracking-wide
                      text-gray-950
                      shadow-[0_12px_30px_rgba(250,204,21,0.25)]
                      transition-all
                      duration-300
                      hover:bg-yellow-300
                      hover:shadow-[0_16px_35px_rgba(250,204,21,0.32)]
                      disabled:cursor-not-allowed
                      disabled:bg-gray-200
                      disabled:text-gray-400
                      disabled:shadow-none
                    "
                  >

                    {isSubmitting ? (
                      <>
                        <span className="
                          h-4
                          w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-current
                          border-t-transparent"
                        />

                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message

                        <span className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-black
                          text-white
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        ">
                          <ArrowUpRight size={15} />
                        </span>
                        </>
                    )}

                  </motion.button>

                  {/* Status */}

                  {(isSubmitSuccessful || serverMsg) && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className={`
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        p-4
                        ${
                          serverMsg?.startsWith("Your message")
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-red-200 bg-red-50 text-red-700"
                        }
                      `}
                    >

                      {serverMsg?.startsWith(
                        "Your message"
                      ) ? (
                        <CheckCircle2
                          size={19}
                          className="mt-0.5 shrink-0"
                        />
                      ) : (
                        <AlertCircle
                          size={19}
                          className="mt-0.5 shrink-0"
                        />
                      )}

                      <span className="text-sm font-medium leading-6">
                        {serverMsg ||
                          "Your message has been sent successfully!"}
                      </span>

                    </motion.div>
                  )}

                </form>

              </div>
            </motion.div>

            {/* =================================================
                CONTACT INFORMATION
            ================================================== */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              custom={0.15}
              className="lg:pt-4"
            >

              {/* Section heading */}

              <div className="mb-7">

                <p className="
                  mb-3
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-yellow-600
                ">
                  Contact Details
                </p>

                <h2 className="
                  text-3xl
                  font-black
                  tracking-[-0.035em]
                  text-gray-950
                  md:text-4xl
                ">
                  Reach out.
                  <br />
                  <span className="text-gray-400">
                    We're close by.
                  </span>
                </h2>

                <p className="
                  mt-4
                  max-w-lg
                  text-sm
                  leading-7
                  text-gray-500
                  md:text-base
                ">
                  Whether you're a customer looking for
                  support or a business interested in working
                  with Zusko, we'd be happy to hear from you.
                </p>

              </div>

              {/* Contact cards */}

              <div className="space-y-4">

                {/* Location */}

                <motion.div
                  variants={scaleIn}
                  custom={0.2}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    group
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-[0_12px_35px_rgba(0,0,0,0.04)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]
                  "
                >

                  <div className="flex gap-5">

                    <div className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-yellow-100
                      text-yellow-700
                      transition-all
                      duration-300
                      group-hover:bg-yellow-400
                      group-hover:text-black
                    ">
                      <MapPin size={21} />
                    </div>

                    <div>

                      <p className="
                        mb-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                      ">
                        Visit us
                      </p>

                      <h3 className="
                        text-lg
                        font-bold
                        text-gray-900
                      ">
                        Registered Office
                      </h3>

                      <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                      ">
                        <span className="font-semibold text-gray-800">
                          Zusko Laundry Services Pvt. Ltd.
                        </span>
                        <br />
                        Bundelkhand Innovation & Incubation
                        Center Foundation
                        <br />
                        BIET Jhansi, Uttar Pradesh
                        <br />
                        India – 284128
                      </p>

                    </div>

                  </div>

                </motion.div>

                {/* Phone */}

                <motion.a
                  href="tel:+918004411976"
                  variants={scaleIn}
                  custom={0.28}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    group
                    block
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-[0_12px_35px_rgba(0,0,0,0.04)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]
                  "
                >

                  <div className="flex items-center gap-5">

                    <div className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gray-100
                      text-gray-700
                      transition-all
                      duration-300
                      group-hover:bg-yellow-400
                      group-hover:text-black
                    ">
                      <Phone size={20} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="
                        mb-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                      ">
                        Call us
                      </p>

                      <h3 className="
                        text-lg
                        font-bold
                        text-gray-900
                      ">
                        +91 80044 11976
                      </h3>

                      <p className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-gray-500
                      ">
                        <Clock3 size={13} />
                        Mon – Fri · 9:00 AM – 6:00 PM IST
                      </p>

                    </div>

                    <ArrowUpRight
                      size={19}
                      className="
                        shrink-0
                        text-gray-300
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-yellow-500
                      "
                    />

                  </div>

                </motion.a>

                {/* Email */}

                <motion.a
                  href="mailto:info@zusko.in"
                  variants={scaleIn}
                  custom={0.36}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    group
                    block
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-[0_12px_35px_rgba(0,0,0,0.04)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]
                  "
                >

                  <div className="flex items-center gap-5">

                    <div className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gray-100
                      text-gray-700
                      transition-all
                      duration-300
                      group-hover:bg-yellow-400
                      group-hover:text-black
                    ">
                      <Mail size={20} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="
                        mb-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                      ">
                        Email us
                      </p>

                      <h3 className="
                        break-all
                        text-lg
                        font-bold
                        text-gray-900
                      ">
                        info@zusko.in
                      </h3>

                      <p className="
                        mt-1
                        text-xs
                        text-gray-500
                      ">
                        Expected response within 24 business hours
                      </p>

                    </div>

                    <ArrowUpRight
                      size={19}
                      className="
                        shrink-0
                        text-gray-300
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-yellow-500
                      "
                    />

                  </div>

                </motion.a>

              </div>

              {/* Bottom note */}

              <motion.div
                variants={fadeUp}
                custom={0.45}
                className="
                  mt-5
                  rounded-2xl
                  bg-gray-950
                  p-6
                  text-white
                "
              >

                <div className="flex items-start gap-4">

                  <div className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-yellow-400
                    text-black
                  ">
                    <Clock3 size={18} />
                  </div>

                  <div>

                    <h3 className="
                      text-sm
                      font-bold
                    ">
                      Need help urgently?
                    </h3>

                    <p className="
                      mt-1.5
                      text-xs
                      leading-5
                      text-gray-400
                    ">
                      For time-sensitive inquiries, please
                      contact us by phone during business hours.
                    </p>

                  </div>

                </div>

              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================== */}

      <section className="px-5 pb-16 md:px-10 lg:px-20">

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

          {/* Decorative circle */}

          <div className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-64
            w-64
            rounded-full
            border-[40px]
            border-black/5
          " />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-black/50
              ">
                Zusko Support
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
                Good laundry starts with
                <br className="hidden sm:block" />
                good support.
              </h2>

            </div>

            <div className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
            ">
              <ArrowUpRight size={23} />
            </div>

          </div>

        </motion.div>

      </section>
      </main>
  );
}

