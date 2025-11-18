import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const ApplyJob = () => {
  const { state: job } = useLocation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Job Application Submitted:", { job, ...data });
    alert("✅ Application submitted successfully!");
    reset();
  };

  return (
    <div className="mt-20 p-8 md:p-16 text-black">
      {/* Job Info Header */}
      <div className="bg-yellow-100 p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-3xl font-bold text-yellow-600">{job?.title}</h2>
        <p className="text-gray-700 mt-2">
          <strong>Job ID:</strong> {job?.id} | <strong>Location:</strong> {job?.location}
        </p>
      </div>

      {/* Application Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Upload Resume</label>
          <input
            type="file"
            {...register("resume", { required: "Please upload your resume" })}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Cover Letter</label>
          <textarea
            {...register("cover", { required: "Please write a short cover letter" })}
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 resize-none"
            placeholder="Write a short cover letter..."
          />
          {errors.cover && <p className="text-red-500 text-sm">{errors.cover.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("agree", { required: true })} />
          <p className="text-sm text-gray-600">
            I agree to the{" "}
            <span className="text-yellow-600 font-semibold cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
        {errors.agree && <p className="text-red-500 text-sm">You must accept the policy</p>}

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg py-3 transition-all"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
