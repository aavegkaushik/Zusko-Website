import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Home,
  Briefcase,
  Navigation,
  Loader2,
  Check,
  Building,
  User,
  Phone,
  Sparkles,
  Compass,
  MapPinned,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../config/api";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ZUSKO_LOCATION = [25.4435332, 78.57616];

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;
    map.flyTo([position.latitude, position.longitude], 16, {
      duration: 0.7,
    });
  }, [position, map]);

  return null;
}

function LocationPicker({ position, onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return position ? (
    <Marker position={[position.latitude, position.longitude]} />
  ) : null;
}

const PRESET_LABELS = [
  { id: "Home", label: "Home", icon: Home },
  { id: "Work", label: "Work", icon: Briefcase },
  { id: "Other", label: "Other", icon: MapPin },
];

export default function AddressModal({
  isOpen,
  onClose,
  initialAddress = null,
  currentLocation = null,
  currentUser = null,
  onAddressSaved,
}) {
  const isEditing = Boolean(initialAddress?._id);

  const [labelType, setLabelType] = useState("Home");
  const [customLabel, setCustomLabel] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Jhansi");
  const [state, setState] = useState("Uttar Pradesh");
  const [pincode, setPincode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [mapOpen, setMapOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetchingCity, setFetchingCity] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset or populate fields when modal opens or initialAddress changes
  useEffect(() => {
    if (!isOpen) return;

    if (initialAddress) {
      const rawLabel = initialAddress.label || "Home";
      const isPreset = ["Home", "Work"].includes(rawLabel);

      if (isPreset) {
        setLabelType(rawLabel);
        setCustomLabel("");
      } else {
        setLabelType("Other");
        setCustomLabel(rawLabel !== "Other" ? rawLabel : "");
      }

      setFullName(initialAddress.fullName || currentUser?.name || "");
      setPhone(initialAddress.phone || currentUser?.phone || "");
      setLine1(initialAddress.line1 || initialAddress.fullAddress || "");
      setLine2(initialAddress.line2 || "");
      setLandmark(initialAddress.landmark || "");
      setCity(initialAddress.city || "Jhansi");
      setState(initialAddress.state || "Uttar Pradesh");
      setPincode(initialAddress.pincode || "");
      setIsDefault(Boolean(initialAddress.isDefault));

      const latitude =
        Number(initialAddress?.location?.coordinates?.[1]) ||
        Number(initialAddress?.lat);
      const longitude =
        Number(initialAddress?.location?.coordinates?.[0]) ||
        Number(initialAddress?.lng);

      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        setLat(latitude);
        setLng(longitude);
      } else if (currentLocation?.latitude && currentLocation?.longitude) {
        setLat(currentLocation.latitude);
        setLng(currentLocation.longitude);
      } else {
        setLat(null);
        setLng(null);
      }
    } else {
      // New Address
      setLabelType("Home");
      setCustomLabel("");
      setFullName(currentUser?.name || "");
      setPhone(currentUser?.phone || "");
      setLine1("");
      setLine2("");
      setLandmark("");
      setCity("Jhansi");
      setState("Uttar Pradesh");
      setPincode("");
      setIsDefault(false);

      if (currentLocation?.latitude && currentLocation?.longitude) {
        setLat(currentLocation.latitude);
        setLng(currentLocation.longitude);
      } else {
        setLat(null);
        setLng(null);
      }
    }

    setMapOpen(false);
    setErrors({});
  }, [isOpen, initialAddress, currentLocation, currentUser]);

  // Reverse geocode to auto-fill address from coordinates
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: latitude,
            lon: longitude,
            format: "json",
            addressdetails: 1,
          },
          headers: { Accept: "application/json" },
          timeout: 10000,
        }
      );

      const addr = res.data?.address || {};
      const houseRoad = [addr.house_number, addr.road].filter(Boolean).join(", ");
      const area = [
        addr.neighbourhood,
        addr.suburb,
        addr.residential,
        addr.village,
      ]
        .filter(Boolean)
        .join(", ");

      if (houseRoad) {
        setLine1((prev) => prev || houseRoad);
      } else if (res.data?.display_name) {
        setLine1((prev) => prev || res.data.display_name.split(",").slice(0, 2).join(",").trim());
      }

      if (area) {
        setLine2((prev) => prev || area);
      }

      if (addr.neighbourhood || addr.suburb) {
        setLandmark((prev) => prev || (addr.neighbourhood || addr.suburb));
      }

      if (addr.postcode) {
        setPincode(addr.postcode);
      }

      const detectedCity =
        addr.city || addr.town || addr.municipality || addr.district;
      if (detectedCity) {
        setCity(detectedCity);
      }

      if (addr.state) {
        setState(addr.state);
      }

      toast.success("Location & address detected successfully!");
    } catch (err) {
      console.warn("Reverse geocode failed:", err);
      toast.success("GPS tagged! Please fill in address details.");
    }
  };

  // Auto-detect city from 6-digit pincode
  useEffect(() => {
    if (pincode?.length !== 6) return;

    const timer = setTimeout(async () => {
      try {
        setFetchingCity(true);
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`,
          { timeout: 7000 }
        );

        if (
          res.data?.[0]?.Status === "Success" &&
          res.data?.[0]?.PostOffice?.length
        ) {
          const po = res.data[0].PostOffice[0];
          if (po.District) setCity(po.District);
          if (po.State) setState(po.State);
          setErrors((prev) => ({ ...prev, pincode: null }));
        }
      } catch (err) {
        console.warn("Pincode lookup failed:", err);
      } finally {
        setFetchingCity(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [pincode]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setLat(latitude);
        setLng(longitude);
        setGpsLoading(false);
        await reverseGeocode(latitude, longitude);
      },
      (err) => {
        console.error(err);
        setGpsLoading(false);
        let msg = "Unable to access your GPS location";
        if (err.code === 1) msg = "Location permission was denied.";
        toast.error(msg);
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const handleMapPinSelect = async (coords) => {
    setLat(coords.latitude);
    setLng(coords.longitude);
    await reverseGeocode(coords.latitude, coords.longitude);
  };

  const validate = () => {
    const newErrors = {};

    if (!line1.trim()) {
      newErrors.line1 = "House / Flat / Building is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    if (phone && !/^[6-9]\d{9}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (labelType === "Other" && customLabel && customLabel.trim().length > 20) {
      newErrors.customLabel = "Label must be under 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e?.preventDefault();

    if (!validate()) {
      return;
    }

    setSaving(true);

    try {
      const finalLabel =
        labelType === "Other"
          ? customLabel.trim() || "Other"
          : labelType;

      const payload = {
        fullName: fullName.trim() || undefined,
        phone: phone.trim() || undefined,
        line1: line1.trim(),
        line2: line2.trim() || undefined,
        landmark: landmark.trim() || undefined,
        city: city.trim(),
        state: state.trim() || undefined,
        pincode: pincode.trim(),
        label: finalLabel,
        isDefault,
        lat: lat !== null ? Number(lat) : undefined,
        lng: lng !== null ? Number(lng) : undefined,
      };

      let response;
      if (isEditing) {
        response = await API.put(`/addresses/${initialAddress._id}`, payload);
        toast.success("Address updated successfully!");
      } else {
        response = await API.post("/addresses", payload);
        toast.success("Address added successfully!");
      }

      const savedAddress = response?.data?.data || response?.data?.address;
      if (onAddressSaved) {
        onAddressSaved(savedAddress, isEditing);
      }
      onClose();
    } catch (error) {
      console.error("SAVE ADDRESS ERROR:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to save address. Please try again.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const currentMapPos =
    lat && lng
      ? { latitude: Number(lat), longitude: Number(lng) }
      : currentLocation
      ? {
          latitude: Number(currentLocation.latitude),
          longitude: Number(currentLocation.longitude),
        }
      : { latitude: ZUSKO_LOCATION[0], longitude: ZUSKO_LOCATION[1] };

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[560px] max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <MapPin size={18} className="text-[#EAB308]" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight">
                  {isEditing ? "Edit Delivery Address" : "Add Delivery Address"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Complete pickup location & GPS pin
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSave}
            className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4"
          >
            {/* Quick GPS & Map Actions (Merged seamlessly into Add/Edit Address) */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={gpsLoading}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl font-bold text-xs bg-[#101010] text-white hover:bg-black transition-all shadow-sm disabled:opacity-60"
              >
                {gpsLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-amber-400" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <>
                    <Navigation size={14} className="text-[#FFD700]" />
                    <span>Use My Location</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMapOpen((prev) => !prev)}
                className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl font-bold text-xs border transition-all ${
                  mapOpen
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MapPinned size={14} className={mapOpen ? "text-amber-700" : "text-gray-500"} />
                <span>{mapOpen ? "Close Map" : "Select on Map"}</span>
              </button>
            </div>

            {/* Embedded Leaflet Map inside Modal */}
            <AnimatePresence initial={false}>
              {mapOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2">
                    <div
                      className="rounded-2xl overflow-hidden relative border border-gray-200"
                      style={{ height: "230px" }}
                    >
                      <MapContainer
                        center={[currentMapPos.latitude, currentMapPos.longitude]}
                        zoom={14}
                        scrollWheelZoom
                        style={{ width: "100%", height: "100%" }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapController position={currentMapPos} />
                        <LocationPicker
                          position={currentMapPos}
                          onSelect={handleMapPinSelect}
                        />
                      </MapContainer>

                      {/* Map overlay hint */}
                      <div className="absolute top-2 left-2 right-2 z-[1000] px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur shadow-sm text-center pointer-events-none">
                        <p className="text-[10px] font-bold text-gray-700">
                          Tap anywhere on map to pin your exact pickup point
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setMapOpen(false)}
                      className="w-full py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center gap-1.5 hover:bg-amber-100 transition-colors"
                    >
                      <CheckCircle size={14} className="text-amber-700" />
                      Confirm Location Pin
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* GPS Tagged Status Badge */}
            {lat && lng && (
              <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-800">
                <span className="flex items-center gap-1.5 font-bold">
                  <Check size={13} className="text-emerald-600" />
                  GPS Pinned: {Number(lat).toFixed(4)}, {Number(lng).toFixed(4)}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  Verified
                </span>
              </div>
            )}

            {/* Label Selector (Home / Work / Other) */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Save Address As
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_LABELS.map((item) => {
                  const Icon = item.icon;
                  const selected = labelType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setLabelType(item.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all ${
                        selected
                          ? "bg-[#101010] text-[#FFD700] shadow-sm scale-[1.02]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Icon size={13} />
                      {item.label}
                      {selected && <Check size={11} className="ml-0.5" />}
                    </button>
                  );
                })}
              </div>

              {labelType === "Other" && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="e.g. Mom's House, Hostel, Gym, Studio"
                    maxLength={20}
                    className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-50 border border-gray-200 focus:bg-white focus:border-amber-400 outline-none transition-all"
                  />
                  {errors.customLabel && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {errors.customLabel}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Flat / House No / Building */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Flat / House No. / Building / Floor{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Building size={15} />
                </div>
                <input
                  type="text"
                  value={line1}
                  onChange={(e) => {
                    setLine1(e.target.value);
                    if (errors.line1) setErrors({ ...errors, line1: null });
                  }}
                  placeholder="e.g. Flat 302, Royal Residency, Tower A"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-50 border outline-none transition-all ${
                    errors.line1
                      ? "border-red-300 bg-red-50/20"
                      : "border-gray-200 focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                  }`}
                />
              </div>
              {errors.line1 && (
                <p className="text-[11px] text-red-500 mt-1">{errors.line1}</p>
              )}
            </div>

            {/* Area / Sector / Street */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Area / Sector / Street / Colony
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <MapPin size={15} />
                </div>
                <input
                  type="text"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  placeholder="e.g. Civil Lines, Sadar Bazar, Main Road"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-50 border border-gray-200 focus:bg-white focus:border-amber-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Nearby Landmark (Optional)
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Compass size={15} />
                </div>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite State Bank, Near City Mall"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-50 border border-gray-200 focus:bg-white focus:border-amber-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Pincode & City */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pincode}
                    maxLength={6}
                    inputMode="numeric"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setPincode(val);
                      if (errors.pincode) setErrors({ ...errors, pincode: null });
                    }}
                    placeholder="6-digit pincode"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-50 border outline-none transition-all ${
                      errors.pincode
                        ? "border-red-300 bg-red-50/20"
                        : "border-gray-200 focus:bg-white focus:border-amber-400"
                    }`}
                  />
                  {fetchingCity && (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <Loader2 size={13} className="animate-spin text-amber-500" />
                    </div>
                  )}
                </div>
                {errors.pincode && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors({ ...errors, city: null });
                  }}
                  placeholder="e.g. Jhansi"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-50 border outline-none transition-all ${
                    errors.city
                      ? "border-red-300 bg-red-50/20"
                      : "border-gray-200 focus:bg-white focus:border-amber-400"
                  }`}
                />
                {errors.city && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Receiver Contact Details */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Receiver Details (Optional)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Receiver's Name"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-50 border border-gray-200 focus:bg-white focus:border-amber-400 outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone size={14} />
                  </div>
                  <input
                    type="text"
                    value={phone}
                    maxLength={10}
                    inputMode="numeric"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(val);
                      if (errors.phone) setErrors({ ...errors, phone: null });
                    }}
                    placeholder="10-digit mobile"
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-50 border outline-none transition-all ${
                      errors.phone
                        ? "border-red-300 bg-red-50/20"
                        : "border-gray-200 focus:bg-white focus:border-amber-400"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Set as Default Toggle */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer select-none hover:bg-gray-100/70 transition-colors">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                  isDefault ? "bg-[#101010]" : "border border-gray-300 bg-white"
                }`}
              >
                {isDefault && <Check size={11} color="#FFD700" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-800">
                  Set as default address
                </p>
                <p className="text-[10px] text-gray-400">
                  Pre-select this address on future checkouts
                </p>
              </div>
            </label>
          </form>

          {/* Footer Actions */}
          <div className="p-4 sm:px-6 border-t border-gray-100 bg-white flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-black bg-[#FFD700] hover:bg-[#FACC15] shadow-sm flex items-center justify-center gap-1.5 transition-all disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={15} className="animate-spin text-black" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>{isEditing ? "Update Address" : "Save Address"}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
