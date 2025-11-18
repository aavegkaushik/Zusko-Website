import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Example job data (in real app, fetch from backend)
  const jobs = [
    {
      id: 1,
      title: "Laundry Manager",
      location: "Delhi",
      type: "Full-time",
      description: "Manage day-to-day laundry operations and supervise staff.",
      qualification: "Graduate with 2+ years experience in laundry operations.",
    },
    {
      id: 2,
      title: "Delivery Executive",
      location: "Jhansi",
      type: "Part-time",
      description: "Responsible for pickup and delivery of laundry items to customers.",
      qualification: "Valid driving license, good communication skills.",
    },
  ];

  const job = jobs.find((j) => j.id === Number(jobId));

  if (!job) return <p className="mt-20 text-center">Job not found.</p>;

  return (
    <div className="mt-20 p-8 md:px-20 text-black">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-2"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-2"><strong>Type:</strong> {job.type}</p>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <p className="text-gray-700 mb-10"><strong>Qualification:</strong> {job.qualification}</p>

      <button
        onClick={() => navigate(`/apply/${job.id}`)}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
