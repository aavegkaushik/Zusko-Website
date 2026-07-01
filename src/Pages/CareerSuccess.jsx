import { motion } from "framer-motion";
import {
  CheckCircle2,
  Briefcase,
  Mail,
  ArrowRight,
  Home,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function CareerSuccess() {
  const { state } = useLocation();

  const job = state?.job;

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white rounded-4xl shadow-2xl p-8 md:p-12 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            delay: 0.2,
          }}
          className="flex justify-center"
        >
          <div className="bg-green-100 p-6 rounded-full">
            <CheckCircle2
              size={80}
              className="text-green-600"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-8">
          Application Submitted!
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Thank you for applying to join
          <span className="font-semibold text-yellow-600">
            {" "}Zusko
          </span>.
          We've received your application and our team will review it shortly.
        </p>

        {/* Job Card */}
        {job && (
          <div className="mt-10 bg-yellow-50 border border-yellow-100 rounded-2xl p-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900">
                {job.title}
              </h2>
            </div>

            <div className="space-y-2 text-gray-700">

                <p>
                <span className="font-semibold">
                  Job ID:
                </span>{" "}
                {job._id}
              </p>


              <p>
                <span className="font-semibold">
                  Location:
                </span>{" "}
                {job.location}
              </p>

              <p>
                <span className="font-semibold">
                  Type:
                </span>{" "}
                {job.type}
              </p>

              {job.department && (
                <p>
                  <span className="font-semibold">
                    Department:
                  </span>{" "}
                  {job.department}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="mt-10 bg-gray-50 rounded-2xl p-6 text-left">
          <h3 className="font-bold text-xl text-gray-900 mb-4">
            What happens next?
          </h3>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Mail className="text-yellow-500 mt-1" />

              <div>
                <h4 className="font-semibold">
                  Application Review
                </h4>

                <p className="text-gray-600">
                  Our hiring team will carefully review your profile.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="text-yellow-500 mt-1" />

              <div>
                <h4 className="font-semibold">
                  Interview Process
                </h4>

                <p className="text-gray-600">
                  If shortlisted, we'll contact you within 5–7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/career"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition"
          >
            Explore More Jobs

            <ArrowRight size={18} />
          </Link>

          <Link
            to="/"
            className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <Home size={18} />

            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}