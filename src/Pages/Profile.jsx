import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Gift,
  Package,
  Headphones,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">

      <div className="max-w-4xl mx-auto px-4">

        {/* Profile Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            bg-gradient-to-r
            from-yellow-400
            to-yellow-300
            rounded-3xl
            p-8
            shadow-lg
          "
        >
          <div className="flex items-center gap-5">

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                text-2xl
                font-bold
              "
            >
              {user?.name?.charAt(0)}
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                {user?.name}
              </h1>

              <p className="mt-1">
                {user?.email}
              </p>

              <div className="flex gap-2 mt-3">

                {user?.isEmailVerified && (
                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-xs
                      font-semibold
                    "
                  >
                    Email Verified
                  </span>
                )}

              </div>

            </div>

          </div>
        </motion.div>

        {/* User Info */}

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="font-bold text-lg mb-5">
              Personal Information
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <User size={20} />
                <span>{user?.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span>{user?.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span>
                  {user?.phone || "Not Added"}
                </span>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="font-bold text-lg mb-5">
              Rewards
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <Gift size={20} />

                <div>
                  <p className="text-sm text-gray-500">
                    Loyalty Points
                  </p>

                  <p className="font-bold text-xl">
                    {user?.loyaltyPoints || 0}
                  </p>
                </div>
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Referral Code
                </p>

                <p className="font-semibold">
                  {user?.referralCode ||
                    "Not Generated"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="bg-white rounded-3xl p-4 shadow-sm mt-6">

  <button
    onClick={() => navigate("/profile/edit")}
    className="
      w-full
      flex
      items-center
      gap-3
      p-4
      rounded-2xl
      hover:bg-gray-50
    "
  >
    ✏️ Edit Profile
  </button>

  <button
    onClick={() => navigate("/addresses")}
    className="
      w-full
      flex
      items-center
      gap-3
      p-4
      rounded-2xl
      hover:bg-gray-50
    "
  >
    📍 Saved Addresses
  </button>

  <button
    onClick={() => navigate("/my-orders")}
    className="
      w-full
      flex
      items-center
      gap-3
      p-4
      rounded-2xl
      hover:bg-gray-50
    "
  >
    📦 My Orders
  </button>

  <button
    onClick={() => navigate("/contact")}
    className="
      w-full
      flex
      items-center
      gap-3
      p-4
      rounded-2xl
      hover:bg-gray-50
    "
  >
    💬 Help & Support
  </button>

  <button
    onClick={handleLogout}
    className="
      w-full
      flex
      items-center
      gap-3
      p-4
      rounded-2xl
      text-red-500
      hover:bg-red-50
    "
  >
    🚪 Logout
  </button>

</div>

      </div>

    </div>
  );
}