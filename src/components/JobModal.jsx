import { X } from "lucide-react";

const JobModal = ({ job, onClose, onApply }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Job Info */}
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">{job.title}</h2>
        <p className="text-gray-600 mb-3">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Type:</strong> {job.type}
        </p>
        <p className="text-gray-700 mb-3">{job.description}</p>
        <p className="text-gray-700 mb-6">
          <strong>Qualification:</strong> {job.qualification}
        </p>

        {/* Apply Button */}
        <button
          onClick={onApply}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg py-3 transition-all"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobModal;
