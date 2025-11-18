import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, HeartHandshake, MapPin, Search, Trophy, Users, X } from "lucide-react";
import JobModal from "../components/JobModal";

const Career = () => {
  const navigate = useNavigate();

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
      const titleMatch = job.title
        .toLowerCase()
        .includes(filters.jobTitle.toLowerCase());
      const typeMatch = filters.jobType
        ? job.type === filters.jobType
        : true;
      const locationMatch = job.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      return titleMatch && typeMatch && locationMatch;
    });
    setFilteredJobs(result);
  };

  return (
    <div className={`mt-20 p-6 md:p-16 text-black ${selectedJob ? "" : ""}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
          Join Our Team
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore exciting opportunities and be a part of Zusko’s journey to redefine laundry service.
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4"
      >
        <input
          type="text"
          name="jobTitle"
          value={filters.jobTitle}
          onChange={handleChange}
          placeholder="Job title (e.g. Manager)"
          className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleChange}
          className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        >
          <option value="">Select job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location (e.g. Delhi)"
          className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg py-3 px-6 transition-all"
        >
          <Search size={18} />
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-12 mb-56">
        {searchPerformed && filteredJobs.length === 0 ? (
          <p className="text-center text-5xl text-gray-600 mt-16">
            0 Result Found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="text-yellow-500" />
                  <h3 className="text-xl font-bold">{job.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <span>{job.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why Work With Us Section */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-yellow-600 mb-10">Why Work With Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105">
            <HeartHandshake size={50} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Friendly Environment</h3>
            <p className="text-gray-600">
              We maintain a supportive workplace that values collaboration, respect, and growth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105">
            <Users size={50} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Work alongside skilled professionals who motivate and help you perform your best.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105">
            <Trophy size={50} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
            <p className="text-gray-600">
              We encourage career growth with continuous learning and leadership opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={() => navigate(`/apply/${selectedJob.id}`, { state: selectedJob })}
        />
      )}
    </div>
  );
};

export default Career;
