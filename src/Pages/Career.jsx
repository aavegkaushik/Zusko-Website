import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, HeartHandshake, MapPin, Search, Trophy, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobModal from "../components/JobModal";
import CareerBg from "../assets/career.jpg"; // ⭐ Add your background image here

const jobData = [
  {
    id: "SW101",
    title: "Laundry Manager",
    type: "Full-time",
    location: "Delhi",
    description:
      "Oversee daily laundry operations, manage staff, and ensure quality standards.",
    qualification:
      "Bachelor’s degree or equivalent experience in operations or hospitality.",
  },
  {
    id: "SW102",
    title: "Delivery Executive",
    type: "Part-time",
    location: "Lucknow",
    description:
      "Responsible for timely pickup and delivery of clothes with excellent customer interaction.",
    qualification:
      "Valid driver’s license, knowledge of local routes, and good communication skills.",
  },
  {
    id: "SW103",
    title: "Customer Support Executive",
    type: "Full-time",
    location: "Jhansi",
    description:
      "Handle customer queries, coordinate orders, and provide smooth service experience.",
    qualification:
      "Excellent communication skills, proficiency in English/Hindi, and basic computer knowledge.",
  },
];

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
  const [filteredJobs, setFilteredJobs] = useState(jobData);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
    const result = jobData.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(filters.jobTitle.toLowerCase());
      const typeMatch = filters.jobType ? job.type === filters.jobType : true;
      const locationMatch = job.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      return titleMatch && typeMatch && locationMatch;
    });
    setFilteredJobs(result);
  };

  return (
    <motion.div
      className={`mt-10 p-6 md:p-16 text-black`}
      variants={pageVariants}
      initial="hidden"
      animate="enter"
    >
    <motion.div
      className="relative rounded-2xl overflow-hidden mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CareerBg})` }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content wrapper */}
      <div className="relative px-6 py-16 md:py-24 max-w-5xl mx-auto text-center">

    {/* Heading */}
    <motion.h1
      className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      Join Our Team
    </motion.h1>

    <motion.p
      className="text-gray-100 max-w-2xl mx-auto mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.08 }}
    >
      Explore exciting opportunities and be a part of Zusko’s journey to redefine laundry service.
    </motion.p>

    {/* Search Form inside Background */}
    <motion.form
      onSubmit={handleSearch}
      className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4"
      variants={formVariants}
      initial="hidden"
      animate="show"
    >
      <motion.input
        type="text"
        name="jobTitle"
        value={filters.jobTitle}
        onChange={handleChange}
        placeholder="Job title (e.g. Manager)"
        className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        whileFocus={{ scale: 1.01 }}
      />

      <motion.select
        name="jobType"
        value={filters.jobType}
        onChange={handleChange}
        className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        whileFocus={{ scale: 1.01 }}
      >
        <option value="">Select job type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
      </motion.select>

      <motion.input
        type="text"
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="Location (e.g. Delhi)"
        className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        whileFocus={{ scale: 1.01 }}
      />

      <motion.button
        type="submit"
        className="flex items-center gap-2 w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg py-3 px-6 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search size={18} />
        Search
      </motion.button>
    </motion.form>
  </div>
</motion.div>


      {/* Results */}
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
            animate="show"
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 cursor-pointer"
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: "0 14px 30px rgba(16,24,40,0.12)", scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <motion.div className="flex items-center gap-3 mb-3" initial="hidden" animate="show" variants={badgeVariants}>
                  <Briefcase className="text-yellow-500" />
                  <h3 className="text-xl font-bold">{job.title}</h3>
                </motion.div>
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <motion.span
                    className="px-3 py-1 rounded-full text-xs bg-yellow-50 text-yellow-700"
                    whileHover={{ scale: 1.03 }}
                  >
                    {job.type}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

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
              onApply={() => navigate(`/apply/${selectedJob.id}`, { state: selectedJob })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Career;
