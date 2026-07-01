import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const API = import.meta.env.VITE_API_URL;
const ApplyJob = () => {
  const navigate = useNavigate();
  const { state: job } = useLocation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("coverLetter", data.coverLetter || "");
    formData.append("jobId", job._id);

    // resume file
    formData.append("resume", data.resume[0]);

    const response = await axios.post(
      `${API}/careers/apply`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

   navigate("/career/success", {
      state: { job },
    });

    reset();

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to submit application"
    );
  }  finally {
    setIsSubmitting(false);
  }
};


<AnimatePresence>
  {isSubmitting && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl px-10 py-8 text-center max-w-sm mx-4"
      >
        <Loader2
          size={48}
          className="mx-auto text-yellow-500 animate-spin"
        />

        <h3 className="text-2xl font-bold mt-6">
          Submitting Application
        </h3>

        <p className="text-gray-600 mt-3">
          Please wait while we upload your
          resume and process your application.
        </p>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  return (
    <div className="mt-20 p-8 md:p-16 text-black">
      {/* Job Info Header */}
      <div className="bg-yellow-100 p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-3xl font-bold text-yellow-600">{job?.title}</h2>
        <p className="text-gray-700 mt-2">
          <strong>Job ID:</strong> {job?._id} | <strong>Location:</strong> {job?.location}
        </p>
      </div>

      {/* Application Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input disabled={isSubmitting}
            {...register("fullName", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Email Address</label>
          <input
            type="email" disabled={isSubmitting}
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Phone Number</label>
          <input
            type="tel" disabled={isSubmitting}
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Upload Resume</label>
          <input
            type="file" disabled={isSubmitting}
            {...register("resume", { required: "Please upload your resume" })}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Cover Letter</label>
          <textarea
            {...register("coverLetter", { required: "Please write a short cover letter" })}
            rows="4"
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 resize-none"
            placeholder="Write a short cover letter..."
          />
          {errors.cover && <p className="text-red-500 text-sm">{errors.cover.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input disabled={isSubmitting} type="checkbox" {...register("agree", { required: true })} />
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
  disabled={isSubmitting}
  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-semibold rounded-xl py-4 transition-all flex items-center justify-center gap-3"
>
  {isSubmitting ? (
    <>
      <Loader2
        size={20}
        className="animate-spin"
      />

      Submitting...
    </>
  ) : (
    "Submit Application"
  )}
</button>
      </form>
    </div>
  );
};

export default ApplyJob;
