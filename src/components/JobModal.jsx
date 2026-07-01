import { X, MapPin, Briefcase, IndianRupee, Building2 } from "lucide-react";

const JobModal = ({ job, onClose, onApply }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-8 bg-white flex-0 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-black transition"
          >
            <X size={28} />
          </button>

          {job.department && (
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {job.department}
            </span>
          )}

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {job.title}
          </h2>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
              <MapPin size={18} className="text-yellow-600" />

              <span className="text-sm font-medium">{job.location}</span>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
              <Briefcase size={18} className="text-yellow-600" />

              <span className="text-sm font-medium">{job.type}</span>
            </div>

            {job.department && (
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                <Building2 size={18} className="text-yellow-600" />

                <span className="text-sm font-medium">{job.department}</span>
              </div>
            )}

            {job.salary && (
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                <IndianRupee size={18} className="text-yellow-600" />

                <span className="text-sm font-medium">{job.salary}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10">
          {/* Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Job Description</h3>

            <p className="text-gray-700 leading-8 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities?.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Responsibilities</h3>

              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex gap-3 text-gray-700">
                    <span className="text-yellow-500 font-bold">•</span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications */}
          {job.qualifications?.length > 0 && (
  <div>
    <h3 className="text-2xl font-bold mb-4">
      Qualifications
    </h3>

    <ul className="space-y-4">
      {job.qualifications.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 text-gray-700"
        >
          <span className="text-yellow-500 font-bold mt-1">
            •
          </span>

          <span className="leading-7">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>
)}

          {/* Benefits */}
          {job.benefits?.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Benefits & Perks</h3>

              <ul className="space-y-3">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex gap-3 text-gray-700">
                    <span className="text-yellow-500 font-bold">•</span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          
        {/* Responsibilities
        {job.responsibilities?.length > 0 && (
  <div>
    <h3 className="text-2xl font-bold mb-4">
      Responsibilities
    </h3>

    <ul className="space-y-4">
      {job.responsibilities.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 text-gray-700"
        >
          <span className="text-yellow-500 font-bold mt-1">
            •
          </span>

          <span className="leading-7">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>
)} */}

          {/* About Zusko */}
          <div className="bg-linear-to-br from-yellow-50 to-white border border-yellow-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-5 text-gray-900">
              About Zusko
            </h3>

            <div className="space-y-5 text-gray-700 leading-8">
              <p>
                At <span className="font-semibold text-yellow-600">Zusko</span>,
                we're redefining the laundry experience through technology,
                convenience, and customer-first innovation.
              </p>

              <p>
                We believe great businesses are built by passionate people eager
                to solve real-world problems. Every team member has the
                opportunity to create meaningful impact from day one.
              </p>

              <p>
                As a fast-growing startup, we value ownership, curiosity,
                collaboration, and continuous learning. Your ideas help shape
                our future.
              </p>

              <p>
                We celebrate diverse perspectives, support personal growth, and
                create an environment where innovation thrives.
              </p>

              <p className="font-medium text-gray-900">
                If you're looking for more than just a job—if you're looking for
                an opportunity to grow, build, and create lasting impact, we'd
                love to have you join our journey.
              </p>
            </div>
          </div>
        </div>


        {/* Fixed Footer */}
        <div className="bg-white p-6 flex-0 flex flex-col sm:flex-row gap-4 sm:justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition"
          >
            Close
          </button>

          <button
            onClick={onApply}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-xl transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
