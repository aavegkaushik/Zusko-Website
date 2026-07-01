import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, HeartHandshake, MapPin, Search, Trophy, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobModal from "../components/JobModal";
import axios from "axios";
import CareerBg from "../assets/career.jpg"; // ⭐ Add your background image here

const API = import.meta.env.VITE_API_URL;

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const gridContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

const Career = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    jobTitle: "",
    jobType: "",
    location: "",
  });
const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const [searching, setSearching] = useState(false);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${API}/careers/jobs`
      );

      console.log(data)

      setJobs(data.jobs || []);
      setFilteredJobs(data.jobs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);

  // --- Location dropdown states & refs ---
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1); // for keyboard navigation
  const locationWrapperRef = useRef(null);
  const locationInputRef = useRef(null);

  // derive unique suggestions from jobData
  const jobTitleSuggestions = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.title))).sort(),
    [jobs]
  );
  const locationSuggestions = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location))).sort(),
    [jobs]
  );

  // filtered location suggestions based on query
  const filteredLocations = useMemo(() => {
    if (!locationQuery) return locationSuggestions;
    return locationSuggestions.filter((loc) =>
      loc.toLowerCase().includes(locationQuery.toLowerCase())
    );
  }, [locationQuery, locationSuggestions]);

  // Sync locationQuery when filters.location is changed programmatically
  useEffect(() => {
    setLocationQuery(filters.location || "");
  }, [filters.location]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });

    // special-case: if user types in location input directly we want to open suggestions
    if (e.target.name === "location") {
      setLocationQuery(e.target.value);
      setShowLocationDropdown(true);
      setHighlightIndex(-1);
    }
  };

  // Location-specific change handler (keeps semantics clear)
  const handleLocationChange = (e) => {
    handleChange(e);
  };

  const handleSelectLocation = (loc) => {
    setFilters({ ...filters, location: loc });
    setLocationQuery(loc);
    setShowLocationDropdown(false);
    setHighlightIndex(-1);
    // focus back to input for accessibility
    locationInputRef.current?.focus();
  };

  // keyboard navigation for location input
  const onLocationKeyDown = (e) => {
    if (!showLocationDropdown) {
      if (e.key === "ArrowDown") {
        setShowLocationDropdown(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filteredLocations.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filteredLocations.length) {
        handleSelectLocation(filteredLocations[highlightIndex]);
      } else if (filteredLocations.length === 1) {
        handleSelectLocation(filteredLocations[0]);
      } else {
        // no selection, keep default form submit behavior (do nothing here)
      }
    } else if (e.key === "Escape") {
      setShowLocationDropdown(false);
      setHighlightIndex(-1);
    }
  };

  // click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      const wrapper = locationWrapperRef.current;
      if (!wrapper) return;
      if (!wrapper.contains(e.target)) {
        setShowLocationDropdown(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

const handleSearch = async (e) => {
  e.preventDefault();

  setSearching(true);

  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  setSearchPerformed(true);

  const result = jobs.filter((job) => {
    const titleMatch = job.title
      .toLowerCase()
      .includes(filters.jobTitle.toLowerCase());

    const typeMatch = filters.jobType
      ? job.type === filters.jobType
      : true;

    const locationMatch = job.location
      .toLowerCase()
      .includes(filters.location.toLowerCase());

    return (
      titleMatch &&
      typeMatch &&
      locationMatch
    );
  });

  setFilteredJobs(result);

  setSearching(false);
};

if (loading) {
  return (
    <div className="mt-10 p-6 md:p-16 animate-pulse">
      {/* Hero Skeleton */}
      <div className="rounded-2xl h-[100px] bg-gray-200 mb-16" />

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <div className="h-6 w-2/3 bg-gray-200 rounded mb-4" />

            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded" />

              <div className="h-6 w-20 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

  return (
    <motion.div
      className={`p-6 md:p-16 text-black`}
      variants={pageVariants}
      initial="hidden"
      animate="enter"
    >
      {/* HERO: Background (Heading + Search Form combined) */}
<motion.section
  className="relative overflow-hidden rounded-2xl mb-16 flex items-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  {/* Gradient Background */}
  <div className="absolute inset-0 bg-linear-to-br from-black via-zinc-900 to-black" />

  {/* Yellow Glow */}
  <div className="absolute -top-40 -left-32 w-[500px] h-[500px] bg-yellow-400/20 blur-[120px] rounded-full" />

  {/* Orange Glow */}
  <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-amber-500/15 blur-[120px] rounded-full" />

  {/* Floating Blobs */}
  <motion.div
    animate={{
      y: [0, -20, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
    }}
    className="absolute top-32 right-24 w-24 h-24 rounded-full bg-yellow-400/10 backdrop-blur-xl"
  />

  <motion.div
    animate={{
      y: [0, 25, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
    }}
    className="absolute bottom-28 left-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl"
  />

  {/* Content */}
  <div className="relative z-10 px-6 py-16 md:py-24 max-w-5xl mx-auto text-center w-full">

    {/* Hero */}
    <div className="max-w-4xl">
      <motion.span
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-yellow-300 text-sm font-medium mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ✨ Careers at Zusko
      </motion.span>

      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Build the future
        <br />

        <span className="text-yellow-400">
          of laundry.
        </span>
      </motion.h1>

      <motion.p
        className="text-gray-200 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Join the team reinventing how millions
        experience laundry services. Build products,
        create impact, and grow alongside one of
        India's fastest-growing startups.
      </motion.p>

      {/* CTA */}
      <motion.div
        className="flex flex-wrap gap-4 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {/* <button
          onClick={() =>
            document
              .getElementById("open-roles")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105"
        >
          Explore Roles
        </button> */}

        {/* <button
          className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-2xl hover:bg-white/10 transition-all"
        >
          Learn More
        </button> */}
      </motion.div>
    </div>

    {/* Stats */}
    {/* <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {[
        {
          value: "100K+",
          label: "Orders Served",
        },
        {
          value: "4+",
          label: "Cities",
        },
        {
          value: "40+",
          label: "Team Members",
        },
        {
          value: "95%",
          label: "Customer Satisfaction",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4"
        >
          <h3 className="text-3xl md:text-4xl font-black text-yellow-400">
            {item.value}
          </h3>

          <p className="text-gray-300 mt-2">
            {item.label}
          </p>
        </div>
      ))}
    </motion.div> */}

    {/* Search */}
<div className="mt-5">
  {/* Section Heading */}
  <div className="text-center mb-8">
    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
      Search across teams, locations, and roles to discover where you can make the biggest impact.
    </p>
  </div>

  <motion.form
    onSubmit={handleSearch}
    className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[28px] p-4 md:p-5"
    variants={formVariants}
    initial="hidden"
    animate={loading ? "hidden" : "show"}
  >
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

      {/* Job Title */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          name="jobTitle"
          value={filters.jobTitle}
          onChange={handleChange}
          placeholder="Search roles..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        />
      </div>

      {/* Job Type */}
      <div className="relative">
        <Briefcase
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        >
          <option value="">
            All Types
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Part Time">
            Part Time
          </option>

          <option value="Internship">
            Internship
          </option>
        </select>
      </div>

      {/* Location */}
      <div className="relative">
        <MapPin
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="Location"
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        />
      </div>

      {/* Search Button */}
      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.98,
        }}
        type="submit"
        disabled={searching}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-2xl px-8 py-4 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
      >
        {searching ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />

            Searching...
          </>
        ) : (
          <>
            <Search size={20} />

            Search Jobs
          </>
        )}
      </motion.button>
    </div>
  </motion.form>
</div>

  </div>
</motion.section>



      {/* Results */}
      {
        jobs.length == 0 && (
          <motion.p
            className="text-center text-5xl text-gray-600 mt-16"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            No Jobs are available right now.
          </motion.p>
        )
      }
      <div className="mt-12 mb-56">
        {searchPerformed && filteredJobs.length === 0 ? (
          <motion.p
            className="text-center text-5xl text-gray-600 mt-16"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            0 Result Found.
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
            variants={gridContainer}
            initial="hidden"
            animate={loading ? "hidden" : "show"}
          >
            {filteredJobs.map((job) => (
  <motion.div
    key={job._id}
    onClick={() => setSelectedJob(job)}
    className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 cursor-pointer
               flex flex-col h-64"
    variants={cardVariants}
    whileHover={{
      y: -6,
      boxShadow: "0 14px 30px rgba(16,24,40,0.12)",
      scale: 1.01,
    }}
    transition={{
      type: "spring",
      stiffness: 220,
      damping: 18,
    }}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        setSelectedJob(job);
      }
    }}
  >
    {/* Header */}
    <motion.div
      className="flex items-center gap-3 mb-4"
      initial="hidden"
      animate="show"
      variants={badgeVariants}
    >
      <Briefcase
        className="text-yellow-500 shrink-0"
      />

      <h3 className="text-xl font-bold line-clamp-2">
        {job.title}
      </h3>
    </motion.div>

    {/* Description */}
    <p
      className="text-gray-600 text-sm leading-7 mb-6 overflow-hidden"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
      }}
    >
      {job.description}
    </p>

    {/* Bottom */}
    <div className="mt-auto flex items-center justify-between text-gray-500 text-sm">
      <span className="flex items-center gap-1">
        <MapPin size={16} />

        {job.location}
      </span>

      <motion.span
        className="px-3 py-1 rounded-full text-xs bg-yellow-50 text-yellow-700"
        whileHover={{
          scale: 1.03,
        }}
      >
        {job.type}
      </motion.span>
    </div>
  </motion.div>
))}
          </motion.div>
        )}
      </div>


<motion.section
  className="mt-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <div className="text-center mb-12">
    <span className="text-yellow-500 font-semibold uppercase tracking-wider">
      Life at Zusko
    </span>

    <h2 className="text-4xl font-bold mt-3 text-gray-900">
      Why people love working here.
    </h2>

    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
      We move fast, think big, and empower every team member to make
      an impact from day one.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        emoji: "🚀",
        title: "Ownership",
        desc: "Take initiative and build solutions that matter.",
      },
      {
        emoji: "📚",
        title: "Growth",
        desc: "Learn continuously and accelerate your career.",
      },
      {
        emoji: "🤝",
        title: "Collaboration",
        desc: "Work alongside ambitious and supportive teammates.",
      },
      {
        emoji: "💡",
        title: "Innovation",
        desc: "Experiment boldly and challenge conventions.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
      >
        <div className="text-4xl mb-5">
          {item.emoji}
        </div>

        <h3 className="text-xl font-bold mb-3">
          {item.title}
        </h3>

        <p className="text-gray-600">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</motion.section>



      {/* Why Work With Us Section */}
      <section className="mt-20 text-center">
        <motion.h2
          className="text-3xl font-bold text-yellow-600 mb-10"
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Why Work With Us?
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            whileHover={{ scale: 1.04 }}
          >
            <HeartHandshake size={50} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Friendly Environment</h3>
            <p className="text-gray-600">
              We maintain a supportive workplace that values collaboration, respect, and growth.
            </p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            whileHover={{ scale: 1.04 }}
          >
            <Users size={50} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Work alongside skilled professionals who motivate and help you perform your best.
            </p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            whileHover={{ scale: 1.04 }}
          >
            <Trophy size={50} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
            <p className="text-gray-600">
              We encourage career growth with continuous learning and leadership opportunities.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            key={selectedJob.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <JobModal
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onApply={() =>
  navigate(`/apply/${selectedJob._id}`, {
    state: selectedJob,
  })
}
            />
          </motion.div>
        )}

<motion.section
  className="mt-24"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <div className="text-center mb-12">
    <span className="text-yellow-500 font-semibold uppercase tracking-wider">
      Hiring Process
    </span>

    <h2 className="text-4xl font-bold mt-3 text-gray-900">
      What to expect.
    </h2>

    <p className="text-gray-600 mt-4">
      A transparent and candidate-friendly hiring journey.
    </p>
  </div>

  <div className="grid md:grid-cols-4 gap-6">
    {[
      {
        step: "01",
        title: "Apply",
        desc: "Submit your application online.",
      },
      {
        step: "02",
        title: "Connect",
        desc: "Introductory discussion with our team.",
      },
      {
        step: "03",
        title: "Assess",
        desc: "Role-specific interview or assignment.",
      },
      {
        step: "04",
        title: "Join",
        desc: "Receive an offer and begin your journey.",
      },
    ].map((item) => (
      <div
        key={item.step}
        className="relative bg-white rounded-3xl p-8 shadow-sm"
      >
        <span className="text-5xl font-black text-yellow-100 absolute top-4 right-6">
          {item.step}
        </span>

        <h3 className="text-xl font-bold mt-6 mb-3">
          {item.title}
        </h3>

        <p className="text-gray-600">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</motion.section>


{/* Founders Note */}
<motion.section
  className="mt-24 mb-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <div className="bg-linear-to-br from-yellow-50 to-white rounded-4xl p-10 md:p-14 shadow-sm border border-yellow-100">

    <span className="text-yellow-600 font-semibold uppercase tracking-wider">
      A Note from the Founders
    </span>

    <h2 className="text-4xl font-bold mt-4 text-gray-900 leading-tight">
      We're building more than a laundry company.
    </h2>

    <p className="mt-8 text-gray-700 leading-8 text-lg">
      At Zusko, we believe technology should simplify everyday life.
      Our mission is to transform the laundry experience through
      innovation, convenience, and exceptional service.
    </p>

    <p className="mt-6 text-gray-700 leading-8 text-lg">
      We are looking for people who dream big, embrace challenges,
      and are excited about creating meaningful impact. Every idea
      matters here, and every team member helps shape the future of
      Zusko.
    </p>

    <p className="mt-6 text-gray-700 leading-8 text-lg">
      If you're passionate about building something extraordinary,
      we'd love to have you on this journey.
    </p>

    <div className="mt-10">
      <h4 className="font-bold text-gray-900">
        Team Zusko
      </h4>

      <p className="text-gray-500">
        Building the future of laundry.
      </p>
    </div>
  </div>
</motion.section>



      </AnimatePresence>
    </motion.div>
  );
};

export default Career;
