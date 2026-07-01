import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Save,
  ArrowLeft,
} from "lucide-react";

import API from "../config/api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get(
        "/profile"
      );

      const user = res.data.data;

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const res = await API.put(
        "/profile",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
        }
      );

      alert(
        res.data.message ||
          "Profile updated successfully"
      );

      navigate("/profile");
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">

      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}

        <div className="flex items-center gap-3 mb-6">

          <button
            onClick={() =>
              navigate(-1)
            }
            className="
              w-10 h-10
              rounded-xl
              bg-white
              shadow
              flex
              items-center
              justify-center
            "
          >
            <ArrowLeft size={18} />
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              Edit Profile
            </h1>

            <p className="text-gray-500">
              Update your account
              information
            </p>

          </div>

        </div>

        {/* Card */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
          "
        >

          {/* Name */}

          <div className="mb-5">

            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>

            <div className="relative mt-2">

              <User
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  border
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
              />

            </div>

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>

            <div className="relative mt-2">

              <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  border
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
              />

            </div>

          </div>

          {/* Phone */}

          <div className="mb-8">

            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>

            <div className="relative mt-2">

              <Phone
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  border
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
              />

            </div>

          </div>

          {/* Save */}

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="
              w-full
              bg-yellow-400
              hover:bg-yellow-500
              text-black
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </motion.div>

      </div>

    </div>
  );
}