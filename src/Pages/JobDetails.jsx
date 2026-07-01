import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Briefcase,
  Building2,
  IndianRupee,
  ChevronRight,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/careers/jobs/${id}`
        );

        setJob(data.job);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-yellow-500">
          Loading job details...
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">
            Job Not Found
          </h2>

          <p className="text-gray-600 mb-6">
            {error || "The job you're looking for doesn't exist."}
          </p>

          <button
            onClick={() => navigate("/careers")}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <Link
              to="/"
              className="hover:text-yellow-600"
            >
              Home
            </Link>

            <ChevronRight size={16} />

            <Link
              to="/careers"
              className="hover:text-yellow-600"
            >
              Careers
            </Link>

            <ChevronRight size={16} />

            <span className="text-gray-900 font-medium">
              {job.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="lg:flex lg:justify-between lg:gap-12">
            {/* Left */}
            <div className="flex-1">
              <p className="text-yellow-600 font-semibold uppercase tracking-wide">
                {job.department}
              </p>

              <h1 className="text-4xl lg:text-5xl font-bold mt-3 text-gray-900">
                {job.title}
              </h1>

              <p className="text-lg text-gray-600 mt-6 max-w-3xl">
                Join Zusko and help us redefine the
                laundry experience through innovation,
                exceptional service, and customer-first
                thinking.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <MapPin
                    size={18}
                    className="text-yellow-600"
                  />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <Briefcase
                    size={18}
                    className="text-yellow-600"
                  />
                  <span>{job.type}</span>
                </div>

                {job.salary && (
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <IndianRupee
                      size={18}
                      className="text-yellow-600"
                    />
                    <span>{job.salary}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sticky Apply */}
            <div className="mt-10 lg:mt-0 lg:w-80">
              <div className="bg-white border rounded-2xl shadow-sm p-6 lg:sticky lg:top-28">
                <h3 className="text-xl font-bold mb-4">
                  Interested?
                </h3>

                <p className="text-gray-600 mb-6">
                  Apply now and become a part of the
                  Zusko family.
                </p>

                <button
                  onClick={() =>
                    navigate(`/apply/${job._id}`, {
                      state: job,
                    })
                  }
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-5">
                Job Description
              </h2>

              <p className="text-gray-700 leading-8 whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-5">
                  Responsibilities
                </h2>

                <ul className="space-y-4">
                  {job.responsibilities.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="text-yellow-600 font-bold">
                          •
                        </span>

                        <span className="text-gray-700">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Qualifications */}
            {(job.qualifications ||
              job.requirements)?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-5">
                  Qualifications
                </h2>

                <ul className="space-y-4">
                  {(job.qualifications ||
                    job.requirements).map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="text-yellow-600 font-bold">
                          •
                        </span>

                        <span className="text-gray-700">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-5">
                  Benefits & Perks
                </h2>

                <ul className="space-y-4">
                  {job.benefits.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="text-yellow-600 font-bold">
                          •
                        </span>

                        <span className="text-gray-700">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="bg-yellow-500 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-black">
                Ready to Join Zusko?
              </h2>

              <p className="text-black/80 mt-3 mb-6">
                We'd love to hear from you.
                Apply today and help us build
                something extraordinary.
              </p>

              <button
                onClick={() =>
                  navigate(`/apply/${job._id}`, {
                    state: job,
                  })
                }
                className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
              >
                Apply for this Job
              </button>
            </div>
          </div>

          {/* Mobile Apply Card */}
          <div className="lg:hidden mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <button
                onClick={() =>
                  navigate(`/apply/${job._id}`, {
                    state: job,
                  })
                }
                className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-xl"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden z-50">
        <button
          onClick={() =>
            navigate(`/apply/${job._id}`, {
              state: job,
            })
          }
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
