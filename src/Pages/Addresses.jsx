import { useEffect, useState } from "react";
import { Plus, MapPin, Pencil, Trash2, ArrowLeft, Home, Briefcase, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../config/api";
import AddressModal from "../components/AddressModal";
import { useAuth } from "../context/AuthContext";

export default function Addresses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await API.get("/addresses");
      setAddresses(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setModalOpen(true);
  };

  const handleAddressSaved = (savedAddr) => {
    setModalOpen(false);
    setEditingAddress(null);
    fetchAddresses();
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await API.delete(`/addresses/${id}`);
      setAddresses((prev) => prev.filter((item) => item._id !== id));
      toast.success("Address deleted successfully");
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await API.patch(`/addresses/${id}/default`);
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr._id === id,
        }))
      );
      toast.success("Default address updated");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-3 border-yellow-200 border-t-yellow-400 animate-spin" />
        <p className="text-sm font-semibold text-gray-500">Loading your addresses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/user/profile")}
              className="w-10 h-10 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Saved Addresses
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your delivery and pickup locations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm shadow-md shadow-yellow-400/20 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>Add New Address</span>
          </button>
        </div>

        {/* Empty state */}
        {addresses.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
              <MapPin size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">No Saved Addresses Yet</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
              Save your home, work, or hostel addresses to schedule pickups and deliveries in 1-click.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm shadow-md transition-all"
            >
              <Plus size={16} /> Add Address Now
            </button>
          </div>
        )}

        {/* Address Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => {
            const isHome = (address.label || "").toLowerCase().includes("home");
            const isWork = (address.label || "").toLowerCase().includes("work");
            const IconComponent = isHome ? Home : isWork ? Briefcase : MapPin;

            return (
              <div
                key={address._id}
                className={`relative rounded-3xl p-6 border transition-all duration-200 bg-white ${
                  address.isDefault
                    ? "border-yellow-400 shadow-md shadow-yellow-400/10"
                    : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        address.isDefault ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900">{address.label || "Home"}</h3>
                      {address.fullName && (
                        <p className="text-xs text-gray-500">{address.fullName}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {address.isDefault ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                        <CheckCircle size={12} /> Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetDefault(address._id)}
                        className="text-[11px] font-semibold text-gray-400 hover:text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {address.line1 || address.fullAddress}
                  {address.line2 ? `, ${address.line2}` : ""}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {address.city} • {address.pincode}
                  {address.landmark ? ` (Near ${address.landmark})` : ""}
                </p>

                {address.phone && (
                  <p className="text-xs text-gray-400 mt-1">📞 {address.phone}</p>
                )}

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(address)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteAddress(address._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Address Edit/Add Modal */}
      {modalOpen && (
        <AddressModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingAddress(null);
          }}
          initialAddress={editingAddress}
          currentUser={user}
          onAddressSaved={handleAddressSaved}
        />
      )}
    </div>
  );
}