
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";
import OtpInput from "react-otp-input";

import {
  Zap,
  ShieldCheck,
  Sparkles,
  Users,
  PackageCheck,
  Star,
  Mail,
  Phone,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LockKeyhole,
  Clock3,
  Shield,
} from "lucide-react";

/* ============================================================
   REUSABLE INPUT FIELD
   IMPORTANT:
   This component is OUTSIDE Login to prevent input remounting
   on every keystroke.
============================================================ */

const InputField = ({
  field,
  type = "text",
  placeholder,
  icon: Icon,
  autoComplete,
  value,
  error,
  focusedField,
  setFocusedField,
  onChange,
  onKeyDown,
}) => {
  const hasError = Boolean(error);
  const isFocused = focusedField === field;
  const hasValue = Boolean(value);

  return (
    <div className="space-y-1.5">
      <div
        className={`relative rounded-2xl border transition-all duration-300 ${
          hasError
            ? "border-red-400 bg-red-50/50"
            : isFocused
            ? "border-black bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "border-black/10 bg-[#F8F8F5]"
        }`}
      >
        <Icon
          size={18}
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            hasError
              ? "text-red-400"
              : isFocused || hasValue
              ? "text-black"
              : "text-gray-400"
          }`}
        />

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField("")}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full rounded-2xl bg-transparent px-12 py-4 pr-12 text-sm font-medium text-black outline-none placeholder:text-gray-400"
        />

        {hasValue && !hasError && (
          <CheckCircle2
            size={17}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
          />
        )}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-1.5 px-1 text-xs font-medium text-red-500"
          >
            <AlertCircle size={13} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   LOGIN
============================================================ */

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [otp, setOtp] = useState("");

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [focusedField, setFocusedField] = useState("");

  /* ============================================================
     REDIRECT IF ALREADY LOGGED IN
  ============================================================ */

  useEffect(() => {
    if (user) {
      navigate("/place-order");
    }
  }, [user, navigate]);

  /* ============================================================
     OTP TIMER
  ============================================================ */

  useEffect(() => {
    if (step !== 2) return;

    setTimer(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  /* ============================================================
     MESSAGE HELPERS
  ============================================================ */

  const clearMessage = () => {
    setApiMessage("");
    setMessageType("");
  };

  const showMessage = (message, type = "error") => {
    setApiMessage(message);
    setMessageType(type);
  };

  /* ============================================================
     UPDATE FIELD
  ============================================================ */

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    clearMessage();
  };

  /* ============================================================
     VALIDATE STEP 1
  ============================================================ */

  const validateStepOne = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.replace(/\D/g, "");

    /* NAME */

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      newErrors.name = "Please enter a valid name.";
    }

    /* EMAIL */

    if (!email) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    /* PHONE */

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Please enter a valid Indian mobile number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ============================================================
     VALIDATE OTP
  ============================================================ */

  const validateOtp = () => {
    if (!otp) {
      showMessage("Please enter the OTP.");
      return false;
    }

    if (!/^\d{6}$/.test(otp)) {
      showMessage("OTP must contain exactly 6 digits.");
      return false;
    }

    return true;
  };

  /* ============================================================
     SEND OTP
  ============================================================ */

  const sendOtp = async () => {
    if (loading) return;

    clearMessage();

    const isValid = validateStepOne();

    if (!isValid) {
      return;
    }

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.replace(/\D/g, ""),
    };

    /*
      Normalize form data once before API call.
    */

    setFormData(cleanedData);
    setLoading(true);

    try {
      const { data } = await API.post("/auth/send-otp", {
        email: cleanedData.email,
      });

      if (data?.success) {
        setOtp("");
        setErrors({});

        showMessage(
          "OTP sent successfully. Check your inbox.",
          "success"
        );

        setStep(2);
      } else {
        showMessage(
          data?.message ||
            "Unable to send OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("SEND OTP ERROR:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to send OTP right now. Please try again.";

      showMessage(message);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     VERIFY OTP
  ============================================================ */

  const verifyOtp = async () => {
    if (loading) return;

    clearMessage();

    if (!validateOtp()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\D/g, ""),
        otp,
      };

      const { data } = await API.post(
        "/auth/login",
        payload
      );

      if (data?.success) {
        showMessage(
          "Login successful. Welcome to Zusko.",
          "success"
        );

        login(data.user, data.token);

        setTimeout(() => {
          navigate("/place-order");
        }, 350);
      } else {
        showMessage(
          data?.message ||
            "Invalid OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid or expired OTP. Please try again.";

      showMessage(message);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     RESEND OTP
  ============================================================ */

  const resendOtp = async () => {
    if (loading || !canResend) return;

    clearMessage();
    setLoading(true);

    try {
      const email = formData.email
        .trim()
        .toLowerCase();

      const { data } = await API.post(
        "/auth/send-otp",
        {
          email,
        }
      );

      if (data?.success) {
        setOtp("");
        setTimer(60);
        setCanResend(false);

        showMessage(
          "A new OTP has been sent to your email.",
          "success"
        );
      } else {
        showMessage(
          data?.message ||
            "Unable to resend OTP."
        );
      }
    } catch (error) {
      console.error("RESEND OTP ERROR:", error);

      showMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     CHANGE EMAIL
  ============================================================ */

  const changeEmail = () => {
    setStep(1);
    setOtp("");
    setErrors({});
    clearMessage();
    setCanResend(false);
    setTimer(60);
  };

  /* ============================================================
     ENTER KEY
  ============================================================ */

  const handleKeyDown = (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (step === 1) {
      sendOtp();
    } else {
      verifyOtp();
    }
  };

  /* ============================================================
     PHONE INPUT
  ============================================================ */

  const handlePhoneChange = (value) => {
    const digits = value
      .replace(/\D/g, "")
      .slice(0, 10);

    updateField("phone", digits);
  };

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const featureContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const featureItem = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  /* ============================================================
     FEATURES
  ============================================================ */

  const features = [
    {
      icon: <Zap size={21} />,
      title: "Fast Turnaround",
      desc: "Quick pickup & delivery for your busy schedule",
    },
    {
      icon: <Sparkles size={21} />,
      title: "Premium Fabric Care",
      desc: "Professional care for every garment",
    },
    {
      icon: <ShieldCheck size={21} />,
      title: "Secure & Reliable",
      desc: "Your information and payments stay protected",
    },
  ];

  /* ============================================================
     UI
  ============================================================ */

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFAF7] mt-10">
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* ======================================================
            LEFT — BRAND EXPERIENCE
        ====================================================== */}

        <section className="relative hidden min-h-screen overflow-hidden bg-black text-white md:flex md:w-1/2">

          {/* Animated Background */}

          <div className="absolute inset-0 overflow-hidden">

            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-yellow-400/15 blur-3xl"
            />

            <motion.div
              animate={{
                x: [0, -25, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-yellow-500/10 blur-3xl"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,0,0.10),transparent_38%)]" />

            <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:60px_60px]" />

          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-10 lg:p-14 xl:p-16">

            {/* BRAND */}

            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFC700] text-black">
                  <Sparkles size={21} />
                </div>

                <div>
                  <p className="text-xl font-black tracking-tight">
                    ZUSKO
                  </p>

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                    Laundry, reimagined.
                  </p>
                </div>

              </div>
            </motion.div>

            {/* MAIN HERO */}

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
                delay: 0.2,
                duration: 0.8,
              }}
              className="my-12 max-w-xl"
            >

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-yellow-400">

                <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />

                Premium Laundry Service

              </div>

              <h2 className="text-5xl font-black leading-[0.94] tracking-[-0.04em] lg:text-6xl xl:text-7xl">

                Your clothes.

                <br />

                <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Our responsibility.
                </span>

              </h2>

              <p className="mt-7 max-w-md text-base leading-7 text-zinc-400 lg:text-lg">
                From pickup to professional cleaning and
                doorstep delivery, Zusko takes care of your
                laundry while you focus on what matters.
              </p>

              {/* FEATURES */}

              <motion.div
                variants={featureContainer}
                initial="hidden"
                animate="visible"
                className="mt-10 space-y-3"
              >

                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={featureItem}
                    whileHover={{
                      x: 8,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-colors hover:border-yellow-400/20 hover:bg-white/[0.07]"
                  >

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition-colors group-hover:bg-yellow-400 group-hover:text-black">
                      {feature.icon}
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        {feature.title}
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-zinc-500">
                        {feature.desc}
                      </p>
                    </div>

                  </motion.div>
                ))}

              </motion.div>

            </motion.div>

            {/* STATS */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.7,
                duration: 0.7,
              }}
              className="grid grid-cols-3 gap-5 border-t border-white/10 pt-7"
            >

              {[
                {
                  icon: <Users size={17} />,
                  number: "10K+",
                  label: "Customers",
                },
                {
                  icon: <PackageCheck size={17} />,
                  number: "50K+",
                  label: "Orders",
                },
                {
                  icon: <Star size={17} />,
                  number: "4.9",
                  label: "Rating",
                },
              ].map((stat, index) => (
                <div key={index}>

                  <div className="mb-1.5 flex items-center gap-2 text-yellow-400">

                    {stat.icon}

                    <span className="text-xl font-black">
                      {stat.number}
                    </span>

                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {stat.label}
                  </p>

                </div>
              ))}

            </motion.div>

          </div>
        </section>

        {/* ======================================================
            RIGHT — AUTH FORM
        ====================================================== */}

        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-[#FFF8D9] px-5 py-10 md:w-1/2 md:px-10">

          {/* Background */}

          <div className="pointer-events-none absolute inset-0">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-yellow-200/20 blur-3xl" />

            <div className="absolute right-10 top-1/3 h-2 w-2 rounded-full bg-black/20" />

            <div className="absolute bottom-1/4 left-10 h-2 w-2 rounded-full bg-yellow-400" />

          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative z-10 w-full max-w-md"
          >

            {/* CARD */}

            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/90 shadow-[0_30px_100px_rgba(0,0,0,0.10)] backdrop-blur-xl">

              {/* ACCENT */}

              <div className="h-1.5 w-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500" />

              <div className="p-6 sm:p-8 md:p-9">

                {/* HEADER */}

                <div className="mb-8 text-center">

                  <motion.div
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-yellow-400 shadow-lg"
                  >
                    {step === 1 ? (
                      <LockKeyhole size={23} />
                    ) : (
                      <Shield size={23} />
                    )}
                  </motion.div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                    >
                      <h1 className="text-3xl font-black tracking-tight text-black">

                        {step === 1 ? (
                          <>
                            Welcome to{" "}
                            <span className="text-yellow-500">
                              ZUSKO
                            </span>
                          </>
                        ) : (
                          "Verify your email"
                        )}

                      </h1>

                      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">

                        {step === 1
                          ? "Enter your details to continue with your Zusko experience."
                          : "We've sent a 6-digit verification code to your email."}

                      </p>
                    </motion.div>
                  </AnimatePresence>

                </div>

                {/* API MESSAGE */}

                <AnimatePresence mode="wait">
                  {apiMessage && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        height: 0,
                      }}
                      className={`mb-5 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                        messageType === "success"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-red-200 bg-red-50 text-red-600"
                      }`}
                    >

                      {messageType === "success" ? (
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      ) : (
                        <AlertCircle
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      )}

                      <span className="leading-5">
                        {apiMessage}
                      </span>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ==================================================
                    STEP 1
                ================================================== */}

                <AnimatePresence mode="wait">

                  {step === 1 ? (

                    <motion.div
                      key="details"
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -25,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="space-y-4"
                    >

                      {/* NAME */}

                      <InputField
                        field="name"
                        placeholder="Your full name"
                        icon={User}
                        autoComplete="name"
                        value={formData.name}
                        error={errors.name}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        onChange={(value) =>
                          updateField("name", value)
                        }
                        onKeyDown={handleKeyDown}
                      />

                      {/* PHONE */}

                      <InputField
                        field="phone"
                        placeholder="10-digit mobile number"
                        icon={Phone}
                        autoComplete="tel"
                        value={formData.phone}
                        error={errors.phone}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        onChange={handlePhoneChange}
                        onKeyDown={handleKeyDown}
                      />

                      {/* EMAIL */}

                      <InputField
                        field="email"
                        type="email"
                        placeholder="Your email address"
                        icon={Mail}
                        autoComplete="email"
                        value={formData.email}
                        error={errors.email}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        onChange={(value) =>
                          updateField("email", value)
                        }
                        onKeyDown={handleKeyDown}
                      />

                      {/* INFO */}

                      <div className="flex items-start gap-2 px-1 pt-1">

                        <ShieldCheck
                          size={14}
                          className="mt-0.5 shrink-0 text-yellow-500"
                        />

                        <p className="text-[11px] leading-5 text-gray-500">
                          Your email will be used to send the OTP
                          and important order updates.
                        </p>

                      </div>

                      {/* CONTINUE */}

                      <motion.button
                        type="button"
                        whileHover={{
                          scale: loading ? 1 : 1.01,
                        }}
                        whileTap={{
                          scale: loading ? 1 : 0.98,
                        }}
                        onClick={sendOtp}
                        disabled={loading}
                        className="group mt-3 flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-5 py-4 font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                      >

                        {loading ? (
                          <>
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            Continue securely

                            <ArrowRight
                              size={18}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </>
                        )}

                      </motion.button>

                    </motion.div>

                  ) : (

                    /* ==================================================
                       STEP 2 — OTP
                    ================================================== */

                    <motion.div
                      key="otp"
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -25,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="space-y-6"
                    >

                      {/* EMAIL */}

                      <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-[#F8F8F5] px-4 py-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/20 text-yellow-600">
                            <Mail size={16} />
                          </div>

                          <div className="min-w-0">

                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              OTP sent to
                            </p>

                            <p className="truncate text-sm font-bold text-black">
                              {formData.email}
                            </p>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={changeEmail}
                          disabled={loading}
                          className="shrink-0 text-xs font-bold text-gray-500 transition-colors hover:text-black disabled:opacity-50"
                        >
                          Change
                        </button>

                      </div>

                      {/* OTP */}

                      <div>

                        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                          Enter verification code
                        </p>

                        <OtpInput
                          value={otp}
                          onChange={(value) => {
                            const cleanValue = value
                              .replace(/\D/g, "")
                              .slice(0, 6);

                            setOtp(cleanValue);
                            clearMessage();
                          }}
                          numInputs={6}
                          shouldAutoFocus
                          renderSeparator={
                            <span className="w-1.5" />
                          }
                          containerStyle={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                          renderInput={(props, index) => (
                            <input
                              {...props}
                              key={index}
                              inputMode="numeric"
                              autoComplete={
                                index === 0
                                  ? "one-time-code"
                                  : "off"
                              }
                              className={`h-12! w-11! rounded-xl border-2 bg-white text-center text-lg font-black text-black outline-none transition-all sm:h-14! sm:w-12! ${
                                otp[index]
                                  ? "border-black bg-yellow-50 shadow-sm"
                                  : "border-gray-200 focus:border-black focus:ring-2 focus:ring-yellow-400/20"
                              }`}
                            />
                          )}
                        />

                      </div>

                      {/* VERIFY */}

                      <motion.button
                        type="button"
                        whileHover={{
                          scale:
                            loading || otp.length !== 6
                              ? 1
                              : 1.01,
                        }}
                        whileTap={{
                          scale:
                            loading || otp.length !== 6
                              ? 1
                              : 0.98,
                        }}
                        onClick={verifyOtp}
                        disabled={
                          loading ||
                          otp.length !== 6
                        }
                        className={`flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 font-bold transition-all ${
                          otp.length === 6 &&
                          !loading
                            ? "bg-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:bg-yellow-400 hover:text-black"
                            : "cursor-not-allowed bg-gray-200 text-gray-400"
                        }`}
                      >

                        {loading ? (
                          <>
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            Verify & Login
                            <ArrowRight size={18} />
                          </>
                        )}

                      </motion.button>

                      {/* RESEND */}

                      <div className="text-center">

                        {canResend ? (

                          <motion.button
                            type="button"
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={resendOtp}
                            disabled={loading}
                            className="inline-flex items-center gap-2 text-sm font-bold text-black transition-colors hover:text-yellow-600 disabled:opacity-50"
                          >
                            <RefreshCw size={14} />
                            Resend OTP
                          </motion.button>

                        ) : (

                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">

                            <Clock3 size={14} />

                            Resend available in

                            <span className="font-bold text-black">
                              {timer}s
                            </span>

                          </div>

                        )}

                      </div>

                      {/* CHANGE EMAIL */}

                      <button
                        type="button"
                        onClick={changeEmail}
                        disabled={loading}
                        className="mx-auto flex items-center gap-2 text-xs font-bold text-gray-400 transition-colors hover:text-black disabled:opacity-50"
                      >
                        <ArrowLeft size={14} />
                        Use a different email
                      </button>

                    </motion.div>
                  )}

                </AnimatePresence>

                {/* FOOTER */}

                <div className="mt-8 border-t border-black/5 pt-5">

                  <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-400">

                    <ShieldCheck size={14} />

                    Secure authentication

                    <span>•</span>

                    No password required

                  </div>

                </div>

              </div>
            </div>

            {/* BOTTOM BRAND */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
              }}
              className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400"
            >
              Fast • Reliable • Premium Laundry
            </motion.p>

          </motion.div>
        </section>
      </div>
    </main>
  );
}
