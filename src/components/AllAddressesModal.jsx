import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Home,
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Star,
  Check,
  Search,
  Loader2,
  ChevronRight,
} from "lucide-react";

export default function AllAddressesModal({
  isOpen,
  onClose,
  addresses = [],
  selectedAddressId = null,
  onSelectAddress,
  onOpenAddAddress,
  onOpenEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  settingDefaultId = null,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredAddresses = addresses.filter((addr) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const label = (addr.label || "").toLowerCase();
    const line1 = (addr.line1 || "").toLowerCase();
    const line2 = (addr.line2 || "").toLowerCase();
    const landmark = (addr.landmark || "").toLowerCase();
    const city = (addr.city || "").toLowerCase();
    const pincode = (addr.pincode || "").toLowerCase();
    const name = (addr.fullName || "").toLowerCase();
    return (
      label.includes(query) ||
      line1.includes(query) ||
      line2.includes(query) ||
      landmark.includes(query) ||
      city.includes(query) ||
      pincode.includes(query) ||
      name.includes(query)
    );
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal / Sheet Container */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.96 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl max-h-[88vh] sm:max-h-[82vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <MapPin size={18} className="text-[#EAB308]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight">
                    Saved Addresses ({addresses.length})
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Select delivery address for your order
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAddAddress();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs bg-[#101010] text-[#FFD700] hover:bg-black transition-all shadow-xs"
                >
                  <Plus size={13} />
                  <span>Add New</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Search Bar if multiple addresses */}
            {addresses.length > 2 && (
              <div className="relative mt-2">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by label, area, or pincode..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 border border-gray-200 focus:bg-white focus:border-amber-400 outline-none transition-all"
                />
              </div>
            )}
          </div>

          {/* List of Addresses */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
            {filteredAddresses.length === 0 ? (
              <div className="py-12 text-center">
                <MapPin size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm font-semibold text-gray-700">
                  No addresses found
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try another search or add a new delivery location.
                </p>
              </div>
            ) : (
              filteredAddresses.map((address) => {
                const selected = selectedAddressId === address._id;
                const label = address.label || "Home";
                const lowerLabel = label.toLowerCase();
                const isWork = lowerLabel === "work" || lowerLabel === "office";
                const isOther = !isWork && lowerLabel !== "home";

                const Icon = isWork ? Briefcase : isOther ? MapPin : Home;
                const iconBg = isWork
                  ? "bg-indigo-50 text-indigo-600"
                  : isOther
                  ? "bg-purple-50 text-purple-600"
                  : "bg-amber-50 text-amber-600";

                const fullStreetAddress =
                  [address.line1, address.line2].filter(Boolean).join(", ") ||
                  address.fullAddress ||
                  "Saved address";

                return (
                  <div
                    key={address._id}
                    onClick={() => {
                      onSelectAddress(address);
                      onClose();
                    }}
                    className={`group relative rounded-2xl p-4 transition-all duration-200 cursor-pointer border ${
                      selected
                        ? "bg-[#FFFDF5] border-2 border-[#FFD700] shadow-[0_4px_18px_rgba(255,215,0,0.18)]"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-xs"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
                        >
                          <Icon size={15} />
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-gray-900 tracking-wide uppercase">
                            {label}
                          </span>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 tracking-wider">
                              DEFAULT
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Select Indicator */}
                      {selected ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold tracking-wide uppercase shadow-xs shrink-0">
                          <Check size={11} strokeWidth={3} />
                          DELIVER HERE
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-800 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                          Select <ChevronRight size={12} />
                        </span>
                      )}
                    </div>

                    {/* Receiver Contact */}
                    {(address.fullName || address.phone) && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 mb-1">
                        {address.fullName && <span>{address.fullName}</span>}
                        {address.fullName && address.phone && (
                          <span className="text-gray-300">•</span>
                        )}
                        {address.phone && (
                          <span className="text-gray-500 font-semibold">
                            {address.phone}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Street Address */}
                    <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-relaxed">
                      {fullStreetAddress}
                    </p>

                    {/* Landmark & City */}
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1 flex-wrap">
                      {address.landmark && (
                        <span className="text-gray-500 font-medium">
                          Landmark: {address.landmark}
                        </span>
                      )}
                      {address.landmark && address.city && <span>•</span>}
                      <span>
                        {address.city || "Jhansi"}
                        {address.pincode ? ` - ${address.pincode}` : ""}
                      </span>
                    </div>

                    {/* Action Bar */}
                    <div
                      className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Set Default */}
                      <div>
                        {!address.isDefault ? (
                          <button
                            type="button"
                            onClick={(e) =>
                              onSetDefaultAddress(address._id, e)
                            }
                            disabled={settingDefaultId === address._id}
                            className="text-[11px] font-bold text-gray-500 hover:text-amber-700 flex items-center gap-1 transition-colors"
                          >
                            {settingDefaultId === address._id ? (
                              <Loader2
                                size={12}
                                className="animate-spin text-amber-500"
                              />
                            ) : (
                              <Star size={12} className="text-gray-400" />
                            )}
                            <span>Set as default</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                            <Check size={11} /> Primary address
                          </span>
                        )}
                      </div>

                      {/* Edit & Delete */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenEditAddress(address);
                          }}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-700 hover:text-black hover:bg-gray-100 transition-all flex items-center gap-1"
                        >
                          <Pencil size={12} className="text-gray-500" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteAddress(address)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
