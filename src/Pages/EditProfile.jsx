import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Save,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import API from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      const profileData = res.data?.data || res.data?.user || {};

      setForm({
        name: profileData.name || user?.name || "",
        email: profileData.email || user?.email || "",
        phone: profileData.phone || user?.phone || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Fallback to local auth context
      if (user) {
        setForm({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (form.phone && form.phone.trim()) {
      const cleanPhone = form.phone.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        errs.phone = "Phone number must be exactly 10 digits";
      } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        errs.phone = "Enter a valid 10-digit Indian mobile number";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();

    if (!validate()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    try {
      setSaving(true);

      const cleanedPayload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim().replace(/\D/g, ""),
      };

      const res = await API.put("/profile", cleanedPayload);

      const updatedUser = res.data?.data || res.data?.user || cleanedPayload;

      // Update in AuthContext so whole website updates immediately
      if (updateUser) {
        updateUser(updatedUser);
      }

      toast.success(res.data?.message || "Profile updated successfully! ✨");

      navigate("/user/profile");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const initials =
    form.name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-3 border-yellow-200 border-t-yellow-400 animate-spin" />
        <p className="text-sm font-semibold text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate("/user/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft size={16} />
            <span>Back to Profile</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-800 text-xs font-bold">
            <Sparkles size={12} /> Account Settings
          </span>
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-xl"
        >
          {/* Header background */}
          <div className="h-32 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 relative flex items-end px-8 pb-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Avatar & Title overlay */}
          <div className="px-6 sm:px-8 -mt-14 pb-8">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl sm:text-4xl font-black text-black shadow-inner">
                    {initials}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white">
                  <ShieldCheck size={14} />
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400">Account Type</span>
                <p className="text-sm font-bold text-gray-900">Standard Member</p>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Edit Profile
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Keep your personal details current to ensure smooth order pickups and delivery updates.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full pl-11 pr-11 py-3.5 rounded-2xl border text-sm font-semibold transition-all duration-200 outline-none ${
                      errors.name
                        ? "border-red-400 bg-red-50/40 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />
                  {form.name && !errors.name && (
                    <CheckCircle2
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                    />
                  )}
                </div>
                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-medium">
                    <AlertCircle size={13} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="name@example.com"
                    className={`w-full pl-11 pr-11 py-3.5 rounded-2xl border text-sm font-semibold transition-all duration-200 outline-none ${
                      errors.email
                        ? "border-red-400 bg-red-50/40 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />
                  {form.email && !errors.email && (
                    <CheckCircle2
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                    />
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-medium">
                    <AlertCircle size={13} /> {errors.email}
                  </p>
                )}
                <p className="mt-1.5 text-[11px] text-gray-400">
                  Used for order receipts, tracking links, and pickup confirmation.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, phone: val });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="9876543210"
                    className={`w-full pl-11 pr-11 py-3.5 rounded-2xl border text-sm font-semibold transition-all duration-200 outline-none ${
                      errors.phone
                        ? "border-red-400 bg-red-50/40 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />
                  {form.phone && form.phone.length === 10 && !errors.phone && (
                    <CheckCircle2
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                    />
                  )}
                </div>
                {errors.phone && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-medium">
                    <AlertCircle size={13} /> {errors.phone}
                  </p>
                )}
                <p className="mt-1.5 text-[11px] text-gray-400">
                  Our delivery partners use this to coordinate scheduled doorstep pickups.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-extrabold text-sm shadow-lg shadow-yellow-400/30 transition-all duration-200 disabled:opacity-60"
                >
                  <Save size={18} />
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/user/profile")}
                  className="py-4 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 active:scale-[0.98] text-gray-700 font-bold text-sm transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}