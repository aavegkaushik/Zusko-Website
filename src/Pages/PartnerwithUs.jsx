import React, { useState } from "react";
import { motion } from "framer-motion";

// PartnerWithUs.jsx
// Tailwind + Framer Motion single-file page for Zusko
// Theme: yellow, black, white

export default function PartnerWithUs() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.business.trim()) e.business = "Please enter your laundromat name.";
    if (!/^[+\d\s-]{6,}$/g.test(form.phone)) e.phone = "Please enter a valid phone number.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Please enter a valid email.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    // Simulate success — replace with API call in production
    setSent(true);
    setForm({ name: "", business: "", phone: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  }

  // Animations
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
  const rise = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };
  const pop = { hidden: { scale: 0.96, opacity: 0 }, visible: { scale: 1, opacity: 1 } };

  return (
    <div className="min-h-screen mt-20 bg-white text-black py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <motion.header initial="hidden" animate="visible" variants={container} className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div variants={rise} className="space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600">Partner with Zusko</p>
            <motion.h1 variants={rise} className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Grow your laundromat — partner with Zusko
            </motion.h1>
            <motion.p variants={rise} className="text-gray-700 max-w-xl">
              Join a trusted partner network that brings predictable orders, clear payouts, and marketing support — all with
              no setup fees. We handle customer acquisition and logistics so you can focus on quality.
            </motion.p>

            <motion.div variants={rise} className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-5 py-3 text-black font-semibold shadow-md hover:bg-yellow-400"
              >
                Start partnership
              </a>
              <a
                href="#onboarding"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 px-5 py-3 text-black font-medium hover:bg-gray-50"
              >
                How onboarding works
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={pop} className="relative w-full">
            <div className="rounded-2xl bg-black text-white p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-yellow-500 flex items-center justify-center text-black font-bold">Z</div>
                <div>
                  <p className="font-semibold">Reliable demand</p>
                  <p className="text-sm text-yellow-200">Consistent orders routed to your shop.</p>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white text-black">
                  <p className="text-sm font-semibold">Fast onboarding</p>
                  <p className="text-xs text-gray-600 mt-1">Complete partner KYC & setup in under 48 hours.</p>
                </div>
                <div className="p-4 rounded-lg bg-white text-black">
                  <p className="text-sm font-semibold">Clear payouts</p>
                  <p className="text-xs text-gray-600 mt-1">Itemized invoices and weekly settlements.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.header>

        {/* WHY */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container} className="mt-12">
          <motion.h2 variants={rise} className="text-2xl font-bold">Why choose Zusko?</motion.h2>
  <motion.p variants={rise} className="mt-3 text-gray-700 max-w-3xl">
    Zusko helps laundromats scale with demand and predictable revenue — no marketing spend, no complex tech to
    manage. We bring customers, you deliver exceptional laundry service.
  </motion.p>

  <motion.div variants={container} className="mt-8 grid sm:grid-cols-3 gap-6">
    {[
      { 
        title: "More orders", 
        desc: "Recurring customers via app & scheduled pickups.",
        icon: (
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" />
          </svg>
        )
      },
      { 
        title: "Transparent payouts", 
        desc: "Weekly settlements and clear fee breakdowns.",
        icon: (
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
        )
      },
      { 
        title: "Local marketing", 
        desc: "Co-branded campaigns to increase your visibility.",
        icon: (
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
    ].map((c, i) => (
      <motion.div key={i} variants={rise} className="bg-yellow-50 border border-yellow-100 p-5 rounded-xl flex flex-col items-start gap-3">
        <div>{c.icon}</div>
        <p className="font-semibold text-black text-lg">{c.title}</p>
        <p className="text-sm text-gray-700">{c.desc}</p>
      </motion.div>
    ))}
  </motion.div>
</motion.section>

        {/* BENEFITS */}
        <section id="benefits" className="mt-12">
  <h3 className="text-xl font-bold">Partner benefits</h3>
  <div className="mt-6 grid lg:grid-cols-2 gap-6">
    <BenefitCard 
      icon={
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" />
        </svg>
      }
      title="Guaranteed leads & demand" 
      body={`We route customers from the Zusko app directly to your shop. High-quality partners are prioritized.`} 
    />

    <BenefitCard 
      icon={
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      }
      title="Operational support" 
      body={`Dashboard, SOPs, and operational training to help you maintain quality and speed.`} 
    />

    <BenefitCard 
      icon={
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      }
      title="Flexible fulfillment" 
      body={`Offer pickup & delivery, drop-off only, or express services to suit your capacity.`} 
    />

    <BenefitCard 
      icon={
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2H5v10h14V9h-2z" />
        </svg>
      }
      title="Transparent commissions & payouts" 
      body={`Weekly payouts with optional faster settlements for large partners.`} 
    />

    <BenefitCard 
      icon={
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
      title="Growth tools" 
      body={`Promotions, referral codes, and analytics to improve pricing and turnaround times.`} 
    />

    <BenefitCard 
      icon={
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6 9.5 7.12 9.5 8.5 10.62 11 12 11z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      }
      title="Quality assurance" 
      body={`Ratings, feedback, and a partner-first dispute resolution process.`} 
    />
  </div>
</section>

        {/* ONBOARDING - redesigned with proper padding & styling */}
        <motion.section id="onboarding" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container} className="mt-12">
          <motion.h3 variants={rise} className="text-2xl font-bold">How onboarding works</motion.h3>

          <motion.div variants={container} className="mt-6 flex flex-col lg:flex-row gap-8">
            {/* Left: Steps timeline */}
            <motion.div variants={rise} className="flex-1 bg-gray-50 rounded-2xl p-6 shadow-sm border border-black/5">
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Apply",
                    desc: "Fill the partner form with basic shop & owner details. We only ask for essentials so you can sign up fast.",
                    tip: "Time: ~5 minutes",
                  },
                  {
                    step: 2,
                    title: "KYC & verification",
                    desc: "Share business registration (if any) and owner ID. We verify to ensure trust on the platform.",
                    tip: "Documents required: ID proof, shop proof",
                  },
                  {
                    step: 3,
                    title: "Setup & training",
                    desc: "We configure your service menu, pricing and train your staff on the partner dashboard and SOPs.",
                    tip: "Includes sample packing labels & wash guides",
                  },
                  {
                    step: 4,
                    title: "Soft launch & tune",
                    desc: "Start receiving orders in a controlled rollout. We measure and help optimize for turnaround time & quality.",
                    tip: "First 30 days: performance review",
                  },
                  {
                    step: 5,
                    title: "Go live",
                    desc: "You are fully onboarded — enjoy steady orders, marketing support, and growth tools.",
                    tip: "Ongoing support: partner success team",
                  },
                ].map((s) => (
                  <StepCard key={s.step} {...s} />
                ))}
              </div>
            </motion.div>

            {/* Right: Visual + CTA */}
            <motion.div variants={rise} className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-md border border-black/5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-yellow-500 flex items-center justify-center font-bold text-black">Z</div>
                <div>
                  <p className="font-semibold">Fast & supportive onboarding</p>
                  <p className="text-sm text-gray-600 mt-2">We’ll help you at every step — paperwork, training, and the first orders.</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium">✓</span>
                  <span className="text-sm">No setup fee</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium">✓</span>
                  <span className="text-sm">Training & SOPs</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium">✓</span>
                  <span className="text-sm">Weekly settlements</span>
                </li>
              </ul>

              <a href="#contact" className="mt-6 inline-block w-full text-center rounded-lg bg-yellow-500 py-3 font-semibold hover:bg-yellow-400">
                Apply now
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* FAQ */}
        <section className="mt-12">
          <h4 className="text-lg font-bold">Frequently asked questions</h4>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <FAQItem q="What are the fees?" a="We charge a competitive commission per order. Exact rates depend on service mix and location; we’ll share a rate card during onboarding." />
            <FAQItem q="Do I need staff for pickups?" a="No — opt-in to handle pickups yourself or let Zusko deliveries manage pickup & drop." />
            <FAQItem q="How are supplies handled?" a="Partners usually provide detergent & consumables. We can arrange bulk supply discounts for larger partners." />
            <FAQItem q="What about damages?" a="We have a claims process; minor issues are handled quickly. For rare major claims, we work with partners on fair settlements." />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-12">
          <div className="bg-yellow-50 p-8 rounded-2xl shadow-inner border border-yellow-100">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h5 className="text-2xl font-bold">Ready to partner with Zusko?</h5>
                <p className="mt-3 text-gray-700">Fill the form and our Partnership Lead will reach out within 24–48 hours.</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-semibold">✓</div>
                    <div>
                      <p className="font-semibold">No onboarding cost</p>
                      <p className="text-sm text-gray-600">We don’t charge a setup fee for verified partners.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-semibold">T</div>
                    <div>
                      <p className="font-semibold">Training & SOPs</p>
                      <p className="text-sm text-gray-600">Step-by-step guides and sample pack labels provided.</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Owner name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md border border-black/10 px-3 py-2" />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Laundromat name</label>
                    <input name="business" value={form.business} onChange={handleChange} className="mt-1 block w-full rounded-md border border-black/10 px-3 py-2" />
                    {errors.business && <p className="text-xs text-red-600 mt-1">{errors.business}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border border-black/10 px-3 py-2" />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border border-black/10 px-3 py-2" />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Message (optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border border-black/10 px-3 py-2" />
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2 text-yellow-400 font-semibold shadow hover:opacity-95">
                    Send request
                  </button>
                  {sent && <span className="text-sm text-green-400">Request sent! We'll contact you soon.</span>}
                </div>

                <p className="text-xs text-gray-500">By submitting you agree to receive communications from Zusko regarding partnership & onboarding.</p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, body }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="font-semibold text-black">{title}</p>
        <p className="text-sm text-gray-700 mt-2">{body}</p>
      </div>
    </div>
  );
}

function StepCard({ step, title, desc, tip }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black">{step}</div>
        <div className="w-px h-full bg-black/5 mt-3" />
      </div>
      <div className="flex-1 bg-white p-4 rounded-lg border border-black/5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-gray-500">{tip}</p>
        </div>
        <p className="text-sm text-gray-700 mt-2">{desc}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${open ? "ring-2 ring-yellow-100" : ""}`}>
      <button onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between gap-3">
        <span className="font-medium">{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M12 5v14M5 12h14" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={open ? "rotate(45 12 12)" : ""} />
        </svg>
      </button>
      {open && <p className="text-sm text-gray-600 mt-3">{a}</p>}
    </div>
  );
}
