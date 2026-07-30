import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {toast} from "react-hot-toast";
import {
  FaHotel,
  FaBuilding,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaFileInvoice,
  FaTruck,
  FaUserTie,
  FaShieldAlt,
  FaLeaf,
  FaClipboardList,
  FaHandshake,
  FaSoap,
  FaBoxOpen,
  FaMoneyBillWave,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MdLocalHospital, MdRestaurant } from "react-icons/md";
import { GiWeightLiftingUp, GiLargeDress } from "react-icons/gi";

import businessImg from "../assets/forBusiness.png";
import API from "../config/api";
const heroFeatures = [
  "Daily Pickup & Delivery",
  "Dedicated Account Manager",
  "Bulk Pricing",
  "GST Invoices",
];
const features = [
  {
    icon: <FaTruck />,
    title: "Scheduled Pickup & Delivery",
    desc: "Daily, alternate-day or custom pickup schedules that fit your business operations.",
  },
  {
    icon: <FaUserTie />,
    title: "Dedicated Account Manager",
    desc: "One point of contact for quotations, support and operational coordination.",
  },
  {
    icon: <FaFileInvoice />,
    title: "GST Billing",
    desc: "Transparent invoices and monthly billing designed for businesses.",
  },
  {
    icon: <FaClock />,
    title: "Fast Turnaround",
    desc: "Reliable processing with on-time pickup and delivery commitments.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Quality Assurance",
    desc: "Every batch is professionally cleaned and inspected before delivery.",
  },
  {
    icon: <FaLeaf />,
    title: "Eco-Friendly Cleaning",
    desc: "Modern cleaning processes that protect fabrics while reducing environmental impact.",
  },
];

const stats = [
  {
    value: "24/7",
    label: "Business Support",
  },
  {
    value: "99%",
    label: "On-Time Delivery",
  },
  {
    value: "GST",
    label: "Business Billing",
  },
  {
    value: "100%",
    label: "Quality Checked",
  },
];

const industries = [
  {
    icon: <FaHotel />,
    title: "Hotels",
    badge: "Most Popular",
    desc: "Professional care for bed linens, towels, robes, uniforms and guest laundry.",
    bestFor: ["Luxury Hotels", "Resorts", "Boutique Hotels"],
  },
  {
    icon: <FaBuilding />,
    title: "Hostels & PGs",
    desc: "Affordable bulk laundry solutions for student hostels and PG accommodations.",
    bestFor: ["Student Hostels", "PGs", "Dormitories"],
  },
  {
    icon: <MdRestaurant />,
    title: "Restaurants",
    desc: "Clean aprons, chef uniforms, napkins and table linens with fast turnaround.",
    bestFor: ["Restaurants", "Cloud Kitchens", "Cafés"],
  },
  {
    icon: <MdLocalHospital />,
    title: "Hospitals",
    desc: "Hygienic textile processing with professional quality inspection.",
    bestFor: ["Hospitals", "Clinics", "Diagnostic Centres"],
  },
  {
    icon: <GiWeightLiftingUp />,
    title: "Gyms",
    desc: "Daily towel washing and staff uniform cleaning for fitness businesses.",
    bestFor: ["Gyms", "Fitness Clubs", "Sports Centres"],
  },
  {
    icon: <GiLargeDress />,
    title: "Salons & Spa",
    desc: "Premium towel and robe cleaning for salons, spas and wellness centres.",
    bestFor: ["Salons", "Spa", "Beauty Clinics"],
  },
];
const steps = [
  {
    step: "01",
    icon: <FaClipboardList />,
    title: "Request a Business Quote",
    description:
      "Tell us about your business, laundry volume, pickup schedule and requirements.",
  },
  {
    step: "02",
    icon: <FaHandshake />,
    title: "Custom Business Plan",
    description:
      "Our team prepares a customized pricing plan and pickup schedule tailored for your business.",
  },
  {
    step: "03",
    icon: <FaTruck />,
    title: "Scheduled Pickup",
    description:
      "Our logistics team picks up your laundry from your location at your preferred time.",
  },
  {
    step: "04",
    icon: <FaSoap />,
    title: "Professional Cleaning",
    description:
      "Your laundry is cleaned, sanitized, quality checked and carefully packed by professionals.",
  },
  {
    step: "05",
    icon: <FaBoxOpen />,
    title: "Delivery & Monthly Billing",
    description:
      "Fresh laundry delivered back on time with transparent GST invoices and monthly billing.",
  },
];

const benefits = [
  {
    icon: <FaMoneyBillWave />,
    title: "Reduce Operating Costs",
    description:
      "No expensive washing machines, detergents, maintenance or dedicated laundry staff.",
  },
  {
    icon: <FaClock />,
    title: "Save Valuable Time",
    description:
      "Automated pickups and deliveries let your team focus on running the business.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Consistent Quality",
    description:
      "Every order goes through professional cleaning and quality inspection before delivery.",
  },
  {
    icon: <FaTruck />,
    title: "Reliable Logistics",
    description:
      "Scheduled pickups, real-time coordination and on-time delivery for uninterrupted operations.",
  },
  {
    icon: <FaLeaf />,
    title: "Eco-Friendly Cleaning",
    description:
      "Modern fabric-safe cleaning processes that extend garment life while reducing waste.",
  },
  {
    icon: <FaChartLine />,
    title: "Scale With Your Business",
    description:
      "Whether you process 20 KG or 500 KG daily, Zusko grows with your business.",
  },
];

const faqs = [
  {
    question: "Which businesses can partner with Zusko?",
    answer:
      "We work with hotels, hostels, hospitals, restaurants, cafés, salons, spas, gyms, offices, educational institutions and other businesses that require commercial laundry services.",
  },
  {
    question: "Do you provide daily pickup and delivery?",
    answer:
      "Yes. Depending on your business requirements, we can arrange daily, alternate-day or customized pickup schedules.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing depends on your laundry volume, service type, pickup frequency and business requirements. Every business receives a customized quotation.",
  },
  {
    question: "Do you provide GST invoices?",
    answer:
      "Absolutely. Every business account receives GST-compliant invoices with transparent monthly billing.",
  },
  {
    question: "Can I schedule fixed pickup timings?",
    answer:
      "Yes. We assign dedicated pickup windows so your operations remain smooth and predictable.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most commercial orders are delivered within the agreed turnaround time. Delivery schedules depend on service type and business agreement.",
  },
  {
    question: "Can I get a dedicated account manager?",
    answer:
      "Yes. Business partners receive a dedicated relationship manager for quotations, support and operational coordination.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply submit the Business Quote form. Our team will contact you, understand your requirements and provide a customized business proposal.",
  },
];

const ForBusiness = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      businessName: "",
      ownerName: "",
      phone: "",
      email: "",
      businessType: "",
      estimatedVolume: "",
      pickupFrequency: "",
      address: "",
      requirements: "",
    },
  });

const onSubmit = async (data) => {
  try {
    const response = await API.post("/business-leads", data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Business quote request submitted successfully! 🎉");

    setSubmitted(true);

    setTimeout(() => {
      reset();
    }, 3500);

    setTimeout(() => {
      setSubmitted(false);
    }, 3500);

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message ||
      err.message ||
      "Something went wrong. Please try again."
    );
  }
};

  return (
    <div className="bg-white text-gray-900 mt-20">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-white">
        {/* Background Blur */}

        <div className="absolute -top-32 -left-24 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -right-24 w-[450px] h-[450px] bg-yellow-200/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold">
                <FaBuilding />
                Trusted by Growing Businesses
              </div>

              <h1 className="mt-8 text-5xl lg:text-6xl font-black leading-tight">
                Commercial Laundry
                <span className="block text-yellow-500">
                  Built For Modern Businesses
                </span>
              </h1>

              <p className="mt-8 text-lg text-gray-600 leading-8">
                Zusko helps Hotels, Hospitals, Restaurants, Hostels, Salons and
                Businesses simplify laundry operations with scheduled pickups,
                premium cleaning, dedicated support and transparent business
                billing.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                {heroFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-5 mt-12">
                <button className="bg-yellow-400 hover:bg-yellow-500 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-3">
                  Request Business Quote
                  <FaArrowRight />
                </button>

                <button className="border-2 border-black hover:bg-black hover:text-white transition px-8 py-4 rounded-xl font-semibold">
                  Schedule Consultation
                </button>
              </div>
            </motion.div>

            {/* Right */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={businessImg}
                alt="Zusko Business Laundry"
                className="w-full rounded-3xl"
              />

              <div className="absolute -bottom-8 left-8 bg-white rounded-2xl shadow-xl p-6">
                <p className="text-gray-500 text-sm">Businesses Served</p>

                <h3 className="text-3xl font-bold mt-2">Growing Every Month</h3>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}

        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -6 }}
                  className="bg-gray-50 rounded-3xl p-8 text-center"
                >
                  <h2 className="text-4xl font-black text-yellow-500">
                    {item.value}
                  </h2>

                  <p className="text-gray-600 mt-3">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}

        <div className="bg-black overflow-hidden">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] py-4">
            {[
              "Daily Pickup",
              "Bulk Pricing",
              "Dedicated Manager",
              "GST Billing",
              "Priority Support",
              "Fast Turnaround",
              "Commercial Laundry",
            ].map((item, index) => (
              <div
                key={index}
                className="text-white text-lg font-medium mx-8 flex items-center gap-8"
              >
                <span className="text-yellow-400">●</span>

                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      {/* <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center border hover:shadow-xl transition"
              >

                <h2 className="text-4xl font-extrabold text-yellow-500">

                  {item.value}

                </h2>

                <p className="mt-3 text-gray-600">

                  {item.label}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section> */}

      {/* ================= INDUSTRIES ================= */}

      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="uppercase tracking-[4px] text-yellow-500 font-semibold">
              Industries We Serve
            </span>

            <h2 className="text-5xl font-black mt-5">
              Commercial Laundry
              <br />
              For Every Business
            </h2>

            <p className="text-lg text-gray-600 leading-8 mt-6">
              Whether you're managing guest experiences, healthcare, hospitality
              or uniforms, Zusko provides reliable commercial laundry designed
              specifically for businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {industries.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="bg-white rounded-[30px] p-8 border border-gray-100 hover:border-yellow-300 hover:shadow-2xl transition"
              >
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-500 flex items-center justify-center text-3xl">
                    {item.icon}
                  </div>

                  {item.badge && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-bold mt-8">{item.title}</h3>

                <p className="text-gray-600 leading-8 mt-5">{item.desc}</p>

                <div className="mt-8">
                  <p className="text-sm uppercase tracking-wider text-gray-400">
                    Best For
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.bestFor.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 px-3 py-2 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-10 text-yellow-500 font-semibold flex items-center gap-3 group">
                  Learn More
                  <FaArrowRight className="group-hover:translate-x-2 transition" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY ZUSKO ================= */}

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-yellow-500 uppercase tracking-[4px] font-semibold">
              Why Businesses Choose Zusko
            </span>

            <h2 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Built Around Business Needs,
              <br />
              Not Household Laundry
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              From scheduled pickups to dedicated support, every service is
              designed to simplify commercial laundry operations for growing
              businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-yellow-300 hover:shadow-xl transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-500 text-3xl">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mt-8">{item.title}</h3>

                <p className="text-gray-600 leading-7 mt-5">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="uppercase tracking-[4px] text-yellow-500 font-semibold">
              How It Works
            </span>

            <h2 className="text-5xl font-black mt-5">
              From Pickup To Delivery
            </h2>

            <p className="text-gray-600 text-lg leading-8 mt-6">
              Our business workflow is designed to make commercial laundry
              completely hassle-free, reliable and scalable.
            </p>
          </motion.div>

          <div className="relative mt-24">
            {/* Timeline */}

            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-200 -translate-x-1/2"></div>

            <div className="space-y-20">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="inline-flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl">
                        {step.icon}
                      </div>

                      <span className="text-yellow-500 font-bold text-xl">
                        Step {step.step}
                      </span>
                    </div>

                    <h3 className="text-4xl font-bold mt-8">{step.title}</h3>

                    <p className="text-gray-600 leading-8 text-lg mt-6">
                      {step.description}
                    </p>
                  </div>

                  <div className="relative flex justify-center">
                    <div className="w-72 h-72 rounded-full bg-yellow-100 flex items-center justify-center">
                      <div className="w-56 h-56 rounded-full bg-yellow-200 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-yellow-400 text-black text-6xl flex items-center justify-center shadow-xl">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUSINESS PLANS ================= */}

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <span className="text-yellow-500 uppercase tracking-widest font-semibold">
              Business Plans
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Flexible Solutions For Every Business
            </h2>

            <p className="text-gray-600 mt-6 text-lg">
              Pricing is customized according to your laundry volume, pickup
              frequency and service requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-20">
            {/* Starter */}

            <div className="rounded-3xl bg-white border p-10 hover:shadow-2xl transition">
              <span className="text-yellow-500 font-semibold uppercase">
                Starter
              </span>

              <h3 className="text-3xl font-bold mt-4">Small Businesses</h3>

              <p className="text-gray-600 mt-4">
                Perfect for salons, cafés, boutiques and offices.
              </p>

              <h1 className="text-5xl font-extrabold mt-8">
                20–50
                <span className="text-xl text-gray-500"> KG / Day</span>
              </h1>

              <ul className="space-y-4 mt-10">
                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  Daily / Weekly Pickup
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  Bulk Pricing
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  GST Invoice
                </li>
              </ul>
            </div>

            {/* Growth */}

            <div className="rounded-3xl bg-black text-white p-10 shadow-2xl relative overflow-hidden">
              <span className="absolute top-5 right-5 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>

              <span className="text-yellow-400 uppercase font-semibold">
                Growth
              </span>

              <h3 className="text-3xl font-bold mt-4">Growing Businesses</h3>

              <p className="text-gray-300 mt-4">
                Best for hotels, hostels, gyms and restaurants.
              </p>

              <h1 className="text-5xl font-extrabold mt-8">
                50–150
                <span className="text-xl text-gray-400"> KG / Day</span>
              </h1>

              <ul className="space-y-4 mt-10">
                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-400 mt-1" />
                  Dedicated Manager
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-400 mt-1" />
                  Priority Pickup
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-400 mt-1" />
                  Monthly Billing
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-400 mt-1" />
                  GST Invoices
                </li>
              </ul>
            </div>

            {/* Enterprise */}

            <div className="rounded-3xl bg-white border p-10 hover:shadow-2xl transition">
              <span className="text-yellow-500 font-semibold uppercase">
                Enterprise
              </span>

              <h3 className="text-3xl font-bold mt-4">Large Organizations</h3>

              <p className="text-gray-600 mt-4">
                Hospitals, hotel chains and high-volume operations.
              </p>

              <h1 className="text-5xl font-extrabold mt-8">
                150+
                <span className="text-xl text-gray-500"> KG / Day</span>
              </h1>

              <ul className="space-y-4 mt-10">
                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  SLA Support
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  Custom Pricing
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  Dedicated Operations
                </li>

                <li className="flex gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  Priority Delivery
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUSINESS BENEFITS ================= */}

      <section className="py-28 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="uppercase tracking-[4px] text-yellow-400 font-semibold">
              Business Benefits
            </span>

            <h2 className="text-5xl lg:text-6xl font-black mt-6 leading-tight">
              Focus On Growing
              <br />
              Your Business.
            </h2>

            <p className="text-gray-400 text-lg leading-8 mt-8">
              Let Zusko handle your commercial laundry while your team focuses
              on customers, operations and business growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-yellow-400 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-3xl group-hover:rotate-6 transition">
                  {benefit.icon}
                </div>

                <h3 className="text-2xl font-bold mt-8">{benefit.title}</h3>

                <p className="text-gray-400 leading-8 mt-5">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Banner */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-24 rounded-4xl bg-linear-to-r from-yellow-400 to-yellow-500 text-black p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div>
              <h3 className="text-4xl font-black">
                Ready To Simplify Your Laundry Operations?
              </h3>

              <p className="mt-4 text-lg opacity-80">
                Get a customized business quote and discover how Zusko can
                reduce your laundry costs while improving efficiency.
              </p>
            </div>

            <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
              Request Business Quote
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="uppercase tracking-[4px] text-yellow-500 font-semibold">
              Frequently Asked Questions
            </span>

            <h2 className="text-5xl font-black mt-5">
              Everything You Need To Know
            </h2>

            <p className="text-gray-600 mt-6 text-lg leading-8">
              Still have questions? Here are the answers to the most common
              questions asked by our business partners.
            </p>
          </motion.div>

          <div className="mt-16 space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  layout
                  className="rounded-3xl border border-gray-200 overflow-hidden bg-gray-50"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between text-left px-8 py-6"
                  >
                    <h3 className="text-xl font-semibold pr-6">
                      {faq.question}
                    </h3>

                    {isOpen ? (
                      <FaChevronUp className="text-yellow-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <div className="px-8 pb-8 text-gray-600 leading-8">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 bg-yellow-50 border border-yellow-200 rounded-3xl p-10 text-center"
          >
            <h3 className="text-3xl font-bold">Didn't find your answer?</h3>

            <p className="text-gray-600 mt-4">
              Our business team is happy to discuss your requirements and answer
              any questions.
            </p>

            <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 transition px-8 py-4 rounded-xl font-semibold">
              Contact Business Team
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= BUSINESS QUOTE ================= */}

      <section id="business-quote" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}

            <div>
              <span className="uppercase tracking-widest text-yellow-500 font-semibold">
                Business Partnership
              </span>

              <h2 className="text-5xl font-bold mt-4 leading-tight">
                Let's Build
                <br />
                Your Commercial Laundry Solution
              </h2>

              <p className="text-gray-600 text-lg mt-8 leading-8">
                Whether you're a hotel, hospital, restaurant, hostel or growing
                business, our commercial laundry experts will create a
                customized solution tailored to your daily operations.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex gap-3 items-center">
                  <FaCheckCircle className="text-green-500" />
                  <span>Free Business Consultation</span>
                </div>

                <div className="flex gap-3 items-center">
                  <FaCheckCircle className="text-green-500" />
                  <span>Custom Pricing Proposal</span>
                </div>

                <div className="flex gap-3 items-center">
                  <FaCheckCircle className="text-green-500" />
                  <span>Dedicated Business Support</span>
                </div>

                <div className="flex gap-3 items-center">
                  <FaCheckCircle className="text-green-500" />
                  <span>No Commitment Required</span>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}

            

            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              <AnimatePresence>
  {submitted && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 z-50 bg-white rounded-3xl flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 15,
        }}
        className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
      >
        <FaCheckCircle className="text-6xl text-green-500" />
      </motion.div>

      <h2 className="mt-8 text-3xl font-bold">
        Quote Submitted!
      </h2>

      <p className="mt-3 text-gray-500 text-center max-w-sm">
        Thank you for contacting Zusko Business.
        Our team will reach out within 24 working hours.
      </p>
    </motion.div>
  )}
</AnimatePresence>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="font-medium">Business Name</label>

                  <input
                    {...register("businessName", {
                      required: "Business name is required",
                    })}
                    type="text"
                    placeholder="Taj Palace Hotel"
                    className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                  />
                  {errors.businessName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.businessName.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-medium">Business Website</label>

                    <input
                      type="url"
                      {...register("website")}
                      placeholder="https://example.in"
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    />
                  </div>

                  <div>
                    <label className="font-medium">Business Location</label>

                    <select
                      {...register("city", {
    required: "Please select your city",
  })}
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    >
                      <option>Select City</option>
                      <option>Jhansi</option>
                    </select>
                    {errors.city && (
  <p className="mt-2 text-sm text-red-500">
    {errors.city.message}
  </p>
)}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-medium">Owner Name</label>

                    <input
                      type="text"
                      placeholder="Full Name"
                      {...register("ownerName", {
                        required: "Owner name is required",
                      })}
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    />
                    {errors.ownerName && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.ownerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium">Phone Number</label>

                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                      type="tel"
                      placeholder="+91 9876543210"
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    />
                    {errors.phone && (
  <p className="mt-2 text-sm text-red-500">
    {errors.phone.message}
  </p>
)}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-medium">Business Email</label>

                    <input
                      {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Invalid email",
    },
  })}
                      type="email"
                      placeholder="business@example.com"
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    />
                    {errors.email && (
  <p className="mt-2 text-sm text-red-500">
    {errors.email.message}
  </p>
)}
                  </div>

                  <div>
                    <label className="font-medium">Business Type</label>

                    <select
                      {...register("businessType", {
    required: "Select a business type",
  })}
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    >
                      <option value="">Select Business</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Hostel / PG">Hostel / PG</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Salon & Spa">Salon & Spa</option>
                      <option value="Gym">Gym</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.businessType && (
  <p className="mt-2 text-sm text-red-500">
    {errors.businessType.message}
  </p>
)}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-medium">
                      Estimated Laundry Volume
                    </label>

                    <select
                      {...register("estimatedVolume", {
    required: "Select expected volume",
  })}
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    >
                      <option>Select Volume</option>
                      <option>20–50 KG / Day</option>
                      <option>50–100 KG / Day</option>
                      <option>100–250 KG / Day</option>
                      <option>250+ KG / Day</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium">Preferred Pickup</label>

                    <select
                    {...register("pickupFrequency")}
                      className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                    >
                      <option>Daily</option>
                      <option>Alternate Days</option>
                      <option>Weekly</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-medium">GST Number (Optional)</label>

                  <input
                    {...register("GSTIN")}
                    type="text"
                    placeholder="Enter GST Number"
                    className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                  />
                </div>

                <div>
                  <label className="font-medium">Business Address</label>

                  <input
                    {...register("address", {
    required: "Address is required",
  })}
                    type="text"
                    placeholder="Enter complete pickup address"
                    className="
w-full
mt-2
rounded-2xl
border
border-gray-200
bg-gray-50
px-5
py-4
outline-none
transition-all
focus:border-yellow-400
focus:bg-white
focus:ring-4
focus:ring-yellow-100
"
                  />
                </div>

                <div>
                  <label className="font-medium">Additional Requirements</label>

                  <textarea
  {...register("requirements")}
  rows={5}
  placeholder="Tell us about your laundry requirements..."
  className="w-full mt-2 border rounded-xl p-4 outline-none resize-none focus:border-yellow-400"
/>
                </div>

                <button
  type="submit"
  disabled={isSubmitting}
  className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed rounded-2xl font-bold text-lg text-black transition-all duration-300 flex items-center justify-center"
>
  {isSubmitting ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      <div className="w-5 h-5 border-[3px] border-black/30 border-t-black rounded-full animate-spin" />

      <span>Submitting Your Request...</span>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      <span>Get My Free Business Quote</span>

      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
    </motion.div>
  )}
</button>
              </form>
              <div className="mt-5 flex items-center justify-center text-center text-xs sm:text-sm text-gray-500">
                <span>✓ 100% Free Consultation</span>
                <span className="mx-3 text-yellow-400">|</span>
                <span>✓ No Hidden Charges</span>
                <span className="mx-3 text-yellow-400">|</span>
                <span>✓ No Long-Term Commitment</span>
                <span className="mx-3 text-yellow-400">|</span>
                <span>✓ Response Within 24 Working Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="uppercase tracking-widest text-yellow-400 font-semibold">
            Partner With Zusko
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
            Let's Build a Smarter
            <br />
            Laundry Operation Together
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto mt-8 leading-8">
            Whether you're running a hotel, hospital, restaurant, salon, gym or
            any growing business, Zusko is ready to become your trusted
            commercial laundry partner.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold transition">
              Request Business Quote
            </button>

            <button className="border border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-xl font-semibold">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForBusiness;
