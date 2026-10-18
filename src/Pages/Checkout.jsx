import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../config/api";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  User,
  Phone,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Package,
  Sparkles,
  Shield,
  Navigation,
  MapPinned,
  Users,
  Home,
  Briefcase,
  Plus,
  X,
  Pencil,
  Trash2,
  Star,
  Check,
} from "lucide-react";
import AddressModal from "../components/AddressModal";
import AllAddressesModal from "../components/AllAddressesModal";
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

const serviceColors = {
  "Wash & Fold": { bg: "#EFF6FF", color: "#3B82F6" },
  "Wash & Iron": { bg: "#F5F3FF", color: "#8B5CF6" },
  "Dry Clean": { bg: "#FFFBEB", color: "#F59E0B" },
  "Steam Iron": { bg: "#ECFDF5", color: "#10B981" },
};

const itemEmoji = {
  Shirt: "👔",
  "T-Shirt": "👕",
  Jeans: "👖",
  Trousers: "👖",
  Shorts: "🩳",
  Kurta: "👘",
  Blazer: "🧥",
  "Suit (2 Piece)": "🤵",
  "Suit (3 Piece)": "🤵",
  Jacket: "🧥",
  Sweater: "🧶",
  Hoodie: "🧥",
  Innerwear: "🩲",
  Kurti: "👘",
  Leggings: "🩱",
  "Saree (Normal)": "🥻",
  "Saree (Heavy)": "🥻",
  Blouse: "👗",
  Top: "👗",
  Dress: "👗",
  Gown: "👗",
  Dupatta: "🧣",
  Skirt: "🩴",
  "Kids Shirt": "👔",
  "Kids T-Shirt": "👕",
  "Kids Jeans": "👖",
  "Kids Shorts": "🩳",
  "School Uniform": "🎒",
  "Kids Jacket": "🧥",
  "Kids Sweater": "🧶",
  Frock: "👗",
  "Bedsheet (Single)": "🛏️",
  "Bedsheet (Double)": "🛏️",
  Blanket: "🛌",
  "Quilt/Rajai": "🛌",
  "Pillow Cover": "🛏️",
  "Curtains (Light)": "🪟",
  "Curtains (Heavy)": "🪟",
  "Sofa Cover": "🛋️",
  Towel: "🧴",
  "Carpet (Small)": "🪄",
  "Carpet (Large)": "🪄",
};

function PremiumInput({
  icon: Icon,
  label,
  error,
  hint,
  children,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="min-w-0">
      {label && (
        <label className="block text-[11px] sm:text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
          {label}
        </label>
      )}

      <div
        className="relative flex items-center rounded-2xl transition-all duration-200 min-w-0"
        style={{
          background: "white",
          border: error
            ? "1.5px solid #FCA5A5"
            : focused
            ? "1.5px solid #FFD700"
            : "1.5px solid #EFEFEF",
          boxShadow: focused
            ? "0 0 0 3px rgba(255,215,0,0.15)"
            : "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {Icon && (
          <div className="pl-4 flex-shrink-0">
            <Icon
              size={16}
              color={
                focused ? "#FFD700" : error ? "#F87171" : "#9CA3AF"
              }
            />
          </div>
        )}

        {children ? (
          <div className="flex-1 min-w-0">{children}</div>
        ) : (
          <input
            {...props}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            className="w-full min-w-0 px-4 py-3.5 bg-transparent outline-none text-sm font-medium text-gray-800 placeholder-gray-300"
            style={{ borderRadius: "16px" }}
          />
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}

        {!error && hint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 text-[11px] text-gray-400"
          >
            {hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  iconColor = "#FFD700",
  iconBg = "#FFF9E6",
  title,
  badge,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "white",
        border: "1px solid #F0F0F0",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-gray-50">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          <Icon size={16} color={iconColor} />
        </div>

        <h2 className="font-bold text-gray-900 text-sm flex-1 min-w-0">
          {title}
        </h2>

        {badge && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{ background: "#F3F4F6", color: "#6B7280" }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="px-4 sm:px-5 py-4 space-y-4">{children}</div>
    </motion.div>
  );
}

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

export default function Checkout() {
  const {
    cart,
    total,
    finalTotal,
    handlingCharge,
    discount,
    coupon,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useContext(AuthContext);

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [serviceable, setServiceable] = useState(false);
  const [roadDistanceKm, setRoadDistanceKm] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);

  const [orderForSomeoneElse, setOrderForSomeoneElse] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [savedAddressLoading, setSavedAddressLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAllAddressesModalOpen, setIsAllAddressesModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [settingDefaultId, setSettingDefaultId] = useState(null);

  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [reverseGeocoding, setReverseGeocoding] = useState(false);

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [checkingPin, setCheckingPin] = useState(false);
  const [pinError, setPinError] = useState("");
  const [alternateContact, setAlternateContact] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const pincode = watch("pincode");
  const selectedDate = watch("date");

  const selectedAddress = useMemo(
    () => savedAddresses.find((a) => a._id === selectedAddressId) || null,
    [savedAddresses, selectedAddressId]
  );

  const finalAmount = useMemo(
    () => Math.max(0, Number(finalTotal || 0) + Number(deliveryFee || 0)),
    [finalTotal, deliveryFee]
  );

  useEffect(() => {
    if (!user || !token || !isAuthenticated) {
      navigate("/auth/login", { state: { from: "/checkout" }, replace: true });
    }
  }, [user, token, isAuthenticated, navigate]);

  // If cart is empty, redirect user to booking page
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/place-order", { replace: true });
    }
  }, [cart, navigate]);

  // Ensure free delivery when order total is 499 or above
  useEffect(() => {
    if (Number(total) >= 499 && deliveryFee > 0) {
      setDeliveryFee(0);
    }
  }, [total, deliveryFee]);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const fetchSavedAddresses = async () => {
      try {
        setSavedAddressLoading(true);

        const response = await API.get("/addresses");

        const addresses =
          response?.data?.data ||
          response?.data?.addresses ||
          response?.data ||
          [];

        const addressList = Array.isArray(addresses) ? addresses : [];
        if (!isMounted) return;
        setSavedAddresses(addressList);
      } catch (error) {
        console.error("SAVED ADDRESS ERROR:", error);
        if (isMounted) setSavedAddresses([]);
      } finally {
        if (isMounted) setSavedAddressLoading(false);
      }
    };

    fetchSavedAddresses();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Auto-select default or first address when savedAddresses are loaded
  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddressId && !location) {
      const defaultAddr =
        savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
      if (defaultAddr) {
        selectSavedAddress(defaultAddr);
      }
    }
  }, [savedAddresses]);

  useEffect(() => {
    if (pincode?.length !== 6) return;

    const timer = setTimeout(() => {
      fetchCity(pincode);
    }, 350);

    return () => clearTimeout(timer);
  }, [pincode]);

  const fetchCity = async (pin) => {
    try {
      setCheckingPin(true);
      setPinError("");

      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`,
        { timeout: 8000 }
      );

      if (
        res.data?.[0]?.Status === "Success" &&
        res.data?.[0]?.PostOffice?.length
      ) {
        setCity(res.data[0].PostOffice[0].District);
        return;
      }

      setPinError("Invalid Pincode");
    } catch {
      try {
        const fallback = await axios.get(
          `https://api.zippopotam.us/IN/${pin}`,
          { timeout: 8000 }
        );

        if (fallback.data?.places?.length) {
          setCity(
            fallback.data.places[0]["place name"] || ""
          );
          return;
        }

        setPinError("Invalid Pincode");
      } catch {
        setPinError("Location service temporarily unavailable");
      }
    } finally {
      setCheckingPin(false);
    }
  };

  const reverseGeocodeLocation = async (latitude, longitude) => {
    try {
      setReverseGeocoding(true);

      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: latitude,
            lon: longitude,
            format: "json",
            addressdetails: 1,
          },
          headers: {
            Accept: "application/json",
          },
          timeout: 10000,
        }
      );

      const address = response.data?.address || {};

      const road = [
        address.house_number,
        address.road,
      ]
        .filter(Boolean)
        .join(", ");

      const area = [
        address.neighbourhood,
        address.suburb,
        address.residential,
        address.village,
      ]
        .filter(Boolean)
        .join(", ");

      const fullAddress = [road, area]
        .filter(Boolean)
        .join(", ");

      setValue(
        "fullAddress",
        fullAddress || response.data?.display_name || "",
        { shouldValidate: true }
      );

      setValue(
        "landmark",
        address.neighbourhood ||
          address.suburb ||
          "",
        { shouldValidate: true }
      );

      setValue(
        "pincode",
        address.postcode || "",
        { shouldValidate: true }
      );

      setCity(
        address.city ||
          address.town ||
          address.municipality ||
          address.district ||
          ""
      );
    } catch (error) {
      console.error("REVERSE GEOCODE ERROR:", error);
    } finally {
      setReverseGeocoding(false);
    }
  };

  const calculateDeliveryEstimate = async (
    latitude,
    longitude
  ) => {
    try {
      setAddressLoading(true);
      setLocationError("");

      const response = await API.post(
        "/orders/delivery-estimate",
        {
          latitude,
          longitude,
          orderValue: total,
        }
      );

      const delivery = response?.data?.data;

      if (!delivery) {
        throw new Error("Invalid delivery estimate response");
      }

      setRoadDistanceKm(
        Number(delivery.distanceKm || 0)
      );

      // Orders ₹499 and above enjoy free pickup & delivery. Below ₹499, delivery charges apply.
      const calculatedFee =
        Number(total) >= 499 ? 0 : Number(delivery.deliveryFee || 0);

      setDeliveryFee(calculatedFee);

      const isServiceable = delivery.serviceable === true;

      setServiceable(isServiceable);
      setAddressVerified(isServiceable);

      if (isServiceable) {
        setLocationError("");
      }

      return isServiceable;
    } catch (error) {
      const code =
        error?.response?.data?.code;

      const message =
        error?.response?.data?.message;

      if (code === "OUTSIDE_SERVICE_AREA") {
        setLocationError(
          "We are not serving in this area yet."
        );
      } else {
        setLocationError(
          message ||
            "Unable to calculate delivery charge."
        );
      }

      setServiceable(false);
      setAddressVerified(false);
      setDeliveryFee(0);
      setRoadDistanceKm(0);
      return false;
    } finally {
      setAddressLoading(false);
    }
  };

  const applyLocation = async (
    latitude,
    longitude,
    { reverseGeocode = true } = {}
  ) => {
    const newLocation = {
      latitude,
      longitude,
    };

    setLocation(newLocation);
    setSelectedLocation(newLocation);
    setSelectedAddressId(null);
    setLocationError("");
    setAddressVerified(false);

    const isServiceable = await calculateDeliveryEstimate(
      latitude,
      longitude
    );

    // Only reveal/populate the address form after the
    // backend confirms that the selected location is serviceable.
    if (isServiceable && reverseGeocode) {
      await reverseGeocodeLocation(
        latitude,
        longitude
      );
    }
  };

  const traceCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by your browser."
      );
      return;
    }

    setLocationLoading(true);
    setLocationError("");
    setAddressVerified(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await applyLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        } catch (error) {
          console.error(
            "CURRENT LOCATION ERROR:",
            error
          );

          setLocationError(
            error?.response?.data?.message ||
              "Unable to verify this location."
          );
          setServiceable(false);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        let message =
          "Unable to access your location.";

        if (error.code === 1) {
          message =
            "Location permission was denied. Please allow location access.";
        }

        if (error.code === 2) {
          message =
            "Your location could not be determined.";
        }

        if (error.code === 3) {
          message =
            "Location request timed out. Please try again.";
        }

        setLocationError(message);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const selectSavedAddress = async (address) => {
    const latitude =
      Number(address?.location?.coordinates?.[1]) ||
      Number(address?.lat);

    const longitude =
      Number(address?.location?.coordinates?.[0]) ||
      Number(address?.lng);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      setLocationError(
        "This address does not have GPS coordinates. Tap 'Edit' to tag location."
      );
      toast.error("Address is missing GPS location. Please tap Edit to tag location.");
      return;
    }

    setSelectedAddressId(address._id);
    setLocation({
      latitude,
      longitude,
    });
    setSelectedLocation({
      latitude,
      longitude,
    });
    setLocationError("");

    const fullAddr =
      [address.line1, address.line2].filter(Boolean).join(", ") ||
      address.fullAddress ||
      "";

    setValue("fullAddress", fullAddr, { shouldValidate: true });
    setValue("landmark", address.landmark || "", { shouldValidate: true });
    setValue("pincode", address.pincode || "", { shouldValidate: true });
    setValue("state", address.state || "Uttar Pradesh", { shouldValidate: true });
    setCity(address.city || "Jhansi");

    if (orderForSomeoneElse) {
      setRecipientName(address.fullName || "");
      setRecipientPhone(address.phone || "");
    }

    await calculateDeliveryEstimate(latitude, longitude);
  };

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (address, e) => {
    e?.stopPropagation();
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleAddressSaved = (savedAddress, isEdit) => {
    if (!savedAddress) return;

    setSavedAddresses((prev) => {
      let updated;
      if (isEdit) {
        updated = prev.map((item) =>
          item._id === savedAddress._id ? savedAddress : item
        );
      } else {
        updated = [savedAddress, ...prev];
      }

      if (savedAddress.isDefault) {
        updated = updated.map((item) => ({
          ...item,
          isDefault: item._id === savedAddress._id,
        }));
      }
      return updated;
    });

    selectSavedAddress(savedAddress);
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete?._id) return;
    const targetId = addressToDelete._id;

    try {
      setDeletingAddressId(targetId);
      await API.delete(`/addresses/${targetId}`);
      toast.success("Address deleted successfully");

      setSavedAddresses((prev) => prev.filter((a) => a._id !== targetId));

      if (selectedAddressId === targetId) {
        setSelectedAddressId(null);
        setLocation(null);
        setSelectedLocation(null);
        setServiceable(false);
        setAddressVerified(false);
        setValue("fullAddress", "");
        setValue("landmark", "");
        setValue("pincode", "");
      }
    } catch (error) {
      console.error("DELETE ADDRESS ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete address"
      );
    } finally {
      setDeletingAddressId(null);
      setAddressToDelete(null);
    }
  };

  const handleSetDefaultAddress = async (addressId, e) => {
    e?.stopPropagation();
    try {
      setSettingDefaultId(addressId);
      await API.patch(`/addresses/${addressId}/default`);
      toast.success("Default address updated");

      setSavedAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr._id === addressId,
        }))
      );
    } catch (error) {
      console.error("SET DEFAULT ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Failed to set default address"
      );
    } finally {
      setSettingDefaultId(null);
    }
  };

  const handleMapLocationSelect = async ({
    latitude,
    longitude,
  }) => {
    setLocationError("");
    setSelectedAddressId(null);

    setLocation({
      latitude,
      longitude,
    });

    setSelectedLocation({
      latitude,
      longitude,
    });
    setAddressVerified(false);

    const isServiceable = await calculateDeliveryEstimate(
      latitude,
      longitude
    );

    // Do not open/populate address details for an
    // unserviceable location.
    if (isServiceable) {
      await reverseGeocodeLocation(
        latitude,
        longitude
      );
    }
  };

  const handleSomeoneElseToggle = () => {
    setOrderForSomeoneElse((prev) => {
      const next = !prev;

      if (!next) {
        setRecipientName("");
        setRecipientPhone("");
      }

      return next;
    });

    setSelectedAddressId(null);
  };

  const getAvailableTimeSlots = () => {
    const allSlots = [
      { label: "9 AM - 12 PM", endHour: 12 },
      { label: "12 PM - 3 PM", endHour: 15 },
      { label: "3 PM - 6 PM", endHour: 18 },
    ];

    if (!selectedDate) return allSlots;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    if (selectedDate !== today) return allSlots;

    const currentHour = new Date().getHours();

    return allSlots.filter(
      (slot) => slot.endHour > currentHour
    );
  };

  const onSubmit = async (data) => {
    const activeAddress = savedAddresses.find((a) => a._id === selectedAddressId);
    const resolvedFullAddress = (
      data.fullAddress ||
      [activeAddress?.line1, activeAddress?.line2].filter(Boolean).join(", ") ||
      activeAddress?.fullAddress ||
      ""
    ).trim();
    const resolvedPincode = data.pincode || activeAddress?.pincode;

    if (!selectedAddressId && !resolvedFullAddress) {
      toast.error("Please select or add a delivery address.");
      return;
    }

    if (!resolvedPincode || !/^\d{6}$/.test(resolvedPincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!location) {
      toast.error("Please select a valid delivery address with GPS location.");
      return;
    }

    // Location selected but outside Zusko service area
    if (location && !serviceable) {
      navigate("/out-of-area");
      return;
    }

    // Location is still being verified
    if (!addressVerified) {
      toast.error("Please wait while we verify your pickup location.");
      return;
    }

    if (
      orderForSomeoneElse &&
      (!recipientName.trim() ||
        !/^[6-9]\d{9}$/.test(recipientPhone))
    ) {
      toast.error("Please enter the recipient's valid name and 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const pickupContact =
        orderForSomeoneElse
          ? {
              name: recipientName.trim(),
              phone: recipientPhone,
            }
          : alternateContact
          ? {
              name: data.pickupContactName,
              phone: data.pickupContactPhone,
            }
          : {
              name: user.name,
              phone: user.phone,
            };

      const orderData = {
        vendorId:
          "6962ad3e962db6a05ddb10dd",

        customerName: user.name,
        customerPhone: user.phone,

        pickupContact,

        pickup: {
          date: data.date,
          time: data.time,
        },

        address: {
          fullAddress: resolvedFullAddress,
          landmark: (data.landmark || activeAddress?.landmark || "").trim(),
          city: city || activeAddress?.city || "Jhansi",
          state: (data.state || activeAddress?.state || "Uttar Pradesh").trim(),
          pincode: resolvedPincode,

          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },

        items: cart.map((item) => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          service: item.service,
          careLevel:
            item.service === "Dry Clean"
              ? item.careLevel || "regular"
              : null,
        })),

        originalTotal: total,
        deliveryFee,
        handlingFee: handlingCharge,
        total: finalAmount,
        discount,
        couponCode: coupon || null,

        payment: {
          status: "pending",
          method: "COD",
          amount: finalAmount,
        },
      };

      navigate("/payment", {
        state: { orderData },
      });
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);
      toast.error("Unable to continue checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const availableSlots =
    getAvailableTimeSlots();

  if (!user) return null;

  return (
    <div
      className="min-h-screen bg-[#F8F9FB]"
      style={{
        paddingTop: "80px",
        paddingBottom: "110px",
      }}
    >
      {/* HEADER */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-5 py-3.5 flex items-center gap-3"
        style={{
          background:
            "rgba(248,249,251,0.94)",
          backdropFilter: "blur(16px)",
          borderBottom:
            "1px solid #EFEFEF",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/cart")}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "white",
            border: "1px solid #F0F0F0",
            boxShadow:
              "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <ArrowLeft size={16} color="#111" />
        </motion.button>

        <div className="flex-1 min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Pickup & Delivery Address
          </h1>
          <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
            Select where we should pick up your laundry
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          {["Cart", "Details", "Pay"].map(
            (step, i) => (
              <div
                key={step}
                className="flex items-center gap-1.5"
              >
                <div
                  className="flex items-center justify-center rounded-full font-bold"
                  style={{
                    width:
                      i === 1 ? "24px" : "20px",
                    height:
                      i === 1 ? "24px" : "20px",
                    fontSize:
                      i === 1 ? "11px" : "10px",
                    background:
                      i === 0
                        ? "#E5E7EB"
                        : i === 1
                        ? "#101010"
                        : "#F3F4F6",
                    color:
                      i === 0
                        ? "#9CA3AF"
                        : i === 1
                        ? "#FFD700"
                        : "#D1D5DB",
                  }}
                >
                  {i === 0 ? "✓" : i + 1}
                </div>

                {i < 2 && (
                  <div
                    className="w-4 h-px bg-gray-200"
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="w-full max-w-[1120px] mx-auto px-3 sm:px-5 lg:px-8 pt-4 sm:pt-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-7 lg:items-start">
          {/* LEFT */}
          <div className="min-w-0 space-y-4">
            <SectionCard
              icon={MapPin}
              iconColor="#EF4444"
              iconBg="#FEF2F2"
              title="Pickup & Delivery Address"
              badge={
                serviceable
                  ? "Verified"
                  : "Required"
              }
            >
              {/* SOMEONE ELSE */}
              {/* <div
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl"
                style={{
                  background:
                    orderForSomeoneElse
                      ? "#FFF9E6"
                      : "#F8F9FB",
                  border:
                    orderForSomeoneElse
                      ? "1px solid #FDE68A"
                      : "1px solid #EFEFEF",
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        orderForSomeoneElse
                          ? "#FFD700"
                          : "white",
                    }}
                  >
                    <Users size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-900">
                      Order for someone else
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Send our pickup team to another person
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    handleSomeoneElseToggle
                  }
                  aria-label="Order for someone else"
                  className="relative w-11 h-6 rounded-full transition-all shrink-0"
                  style={{
                    background:
                      orderForSomeoneElse
                        ? "#101010"
                        : "#D1D5DB",
                  }}
                >
                  <span
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm"
                    style={{
                      left:
                        orderForSomeoneElse
                          ? "24px"
                          : "4px",
                    }}
                  />
                </button>
              </div> */}

              {/* RECIPIENT */}
              <AnimatePresence initial={false}>
                {orderForSomeoneElse && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-2 gap-3 pt-1">
                      <PremiumInput
                        label="Person's Name"
                        icon={User}
                        placeholder="Who will hand over the clothes?"
                        value={recipientName}
                        onChange={(e) =>
                          setRecipientName(
                            e.target.value
                          )
                        }
                      />

                      <PremiumInput
                        label="Mobile Number"
                        icon={Phone}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        inputMode="numeric"
                        value={recipientPhone}
                        onChange={(e) =>
                          setRecipientPhone(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            ).slice(0, 10)
                          )
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SAVED ADDRESSES SECTION (HORIZONTAL SCROLL + VIEW ALL POPUP) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                        Saved Addresses
                      </p>
                      {savedAddresses.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                          {savedAddresses.length}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Swipe horizontally or tap View All
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {savedAddresses.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setIsAllAddressesModalOpen(true)}
                        className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-0.5 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100/80 transition-all"
                      >
                        <span>View All ({savedAddresses.length})</span>
                        <ChevronRight size={13} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleOpenAddAddress}
                      className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl font-bold text-xs bg-[#101010] text-[#FFD700] hover:bg-black transition-all shadow-xs"
                    >
                      <Plus size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {savedAddressLoading ? (
                  <div className="flex items-center justify-center gap-2.5 py-6 rounded-2xl bg-gray-50/70 border border-gray-100 text-xs font-semibold text-gray-500">
                    <Loader2 size={15} className="animate-spin text-amber-500" />
                    Loading saved addresses...
                  </div>
                ) : savedAddresses.length > 0 ? (
                  <div
                    className="flex gap-3 overflow-x-auto pb-2.5 pt-1 snap-x scrollbar-none -mx-1 px-1"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    {savedAddresses.map((address) => {
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
                          onClick={() => selectSavedAddress(address)}
                          className={`w-[260px] sm:w-[280px] shrink-0 snap-start rounded-2xl p-3.5 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                            selected
                              ? "bg-[#FFFDF5] border-2 border-[#FFD700] shadow-[0_4px_16px_rgba(255,215,0,0.18)]"
                              : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xs"
                          }`}
                        >
                          {/* Top: Tag + Default + Selected Checkmark */}
                          <div>
                            <div className="flex items-start justify-between gap-1.5 mb-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <div
                                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
                                >
                                  <Icon size={14} />
                                </div>
                                <span className="text-xs font-black text-gray-900 tracking-wide uppercase truncate">
                                  {label}
                                </span>
                                {address.isDefault && (
                                  <span className="px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase bg-emerald-100 text-emerald-800 tracking-wider shrink-0">
                                    DEFAULT
                                  </span>
                                )}
                              </div>

                              {selected ? (
                                <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs shrink-0">
                                  <Check size={10} strokeWidth={3} />
                                  <span className="text-[9px] font-extrabold uppercase">
                                    DELIVER
                                  </span>
                                </div>
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
                              )}
                            </div>

                            {/* Receiver Info */}
                            {(address.fullName || address.phone) && (
                              <p className="text-[10px] font-bold text-gray-700 truncate mb-0.5">
                                {address.fullName}
                                {address.fullName && address.phone && " • "}
                                {address.phone}
                              </p>
                            )}

                            {/* Street Address */}
                            <p className="text-[11px] text-gray-700 font-medium line-clamp-2 leading-snug">
                              {fullStreetAddress}
                            </p>

                            {/* Landmark & City */}
                            <p className="text-[10px] text-gray-400 mt-1 truncate">
                              {address.landmark ? `${address.landmark} • ` : ""}
                              {address.city || "Jhansi"}
                              {address.pincode ? ` - ${address.pincode}` : ""}
                            </p>
                          </div>

                          {/* Action Toolbar */}
                          <div
                            className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between gap-1 text-[11px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {!address.isDefault ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleSetDefaultAddress(address._id, e)
                                }
                                disabled={settingDefaultId === address._id}
                                className="text-[10px] font-bold text-gray-500 hover:text-amber-800 flex items-center gap-1 transition-colors"
                              >
                                {settingDefaultId === address._id ? (
                                  <Loader2
                                    size={11}
                                    className="animate-spin text-amber-500"
                                  />
                                ) : (
                                  <Star size={11} className="text-gray-400" />
                                )}
                                <span>Default</span>
                              </button>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                                <Check size={10} /> Default
                              </span>
                            )}

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleOpenEditAddress(address, e)
                                }
                                className="px-2 py-1 rounded-lg font-bold text-gray-700 hover:text-black hover:bg-gray-100 transition-all flex items-center gap-1 text-[11px]"
                              >
                                <Pencil size={11} className="text-gray-500" />
                                <span>Edit</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAddressToDelete(address);
                                }}
                                className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* End Card 1: + Add New Address */}
                    <button
                      type="button"
                      onClick={handleOpenAddAddress}
                      className="w-[130px] shrink-0 snap-start rounded-2xl border-2 border-dashed border-gray-200 hover:border-amber-400 bg-gray-50/60 hover:bg-amber-50/20 p-3.5 flex flex-col items-center justify-center text-center gap-1.5 group transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white group-hover:bg-amber-100 text-gray-400 group-hover:text-amber-700 flex items-center justify-center shadow-xs transition-colors">
                        <Plus size={16} />
                      </div>
                      <p className="text-xs font-bold text-gray-800 group-hover:text-black">
                        Add New
                      </p>
                      <p className="text-[10px] text-gray-400">
                        New address
                      </p>
                    </button>

                    {/* End Card 2: View All (if > 2 addresses) */}
                    {savedAddresses.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setIsAllAddressesModalOpen(true)}
                        className="w-[130px] shrink-0 snap-start rounded-2xl border border-gray-200 bg-white hover:bg-amber-50/40 p-3.5 flex flex-col items-center justify-center text-center gap-1.5 group transition-all shadow-xs"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
                          <ChevronRight size={16} />
                        </div>
                        <p className="text-xs font-bold text-gray-800">
                          View All
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {savedAddresses.length} saved
                        </p>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-gray-50 to-amber-50/20 border-2 border-dashed border-gray-200 text-center">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-white shadow-xs flex items-center justify-center mb-2">
                      <MapPin size={20} className="text-amber-500" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 mb-0.5">
                      No Saved Addresses Yet
                    </h4>
                    <p className="text-[11px] text-gray-400 max-w-xs mx-auto mb-3">
                      Save your address for faster checkout.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenAddAddress}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#101010] text-[#FFD700] hover:bg-black transition-all shadow-sm"
                    >
                      <Plus size={13} />
                      Add Address
                    </button>
                  </div>
                )}
              </div>

              {/* SELECTED ADDRESS SUMMARY CARD & SERVICEABILITY STATUS */}
              <div className="mt-3.5 pt-3 border-t border-gray-100">
                {selectedAddress ? (
                  <div className="space-y-2">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/70 via-white to-emerald-50/40 border border-amber-200/90 shadow-xs flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle size={16} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-black text-gray-900 uppercase">
                              {selectedAddress.label || "Home"}
                            </span>
                            <span className="text-[9px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                              Delivering Here
                            </span>
                            {roadDistanceKm > 0 && (
                              <span className="text-[10px] text-gray-400 font-semibold">
                                • {roadDistanceKm} km
                              </span>
                            )}
                          </div>

                          {(selectedAddress.fullName || selectedAddress.phone) && (
                            <p className="text-[10px] font-bold text-gray-700 mt-1 truncate">
                              {selectedAddress.fullName}
                              {selectedAddress.fullName && selectedAddress.phone && " • "}
                              {selectedAddress.phone}
                            </p>
                          )}

                          <p className="text-xs text-gray-600 font-medium mt-0.5 leading-relaxed">
                            {[selectedAddress.line1, selectedAddress.line2].filter(Boolean).join(", ") || selectedAddress.fullAddress}
                          </p>

                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {selectedAddress.landmark ? `${selectedAddress.landmark} • ` : ""}
                            {selectedAddress.city || "Jhansi"}
                            {selectedAddress.pincode ? ` - ${selectedAddress.pincode}` : ""}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenEditAddress(selectedAddress)}
                        className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700 hover:text-black bg-white border border-gray-200 hover:border-amber-300 transition-all flex items-center gap-1 shadow-2xs"
                      >
                        <Pencil size={11} className="text-gray-500" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Delivery Calculation / Verification Status */}
                    {addressLoading && (
                      <div className="flex items-center gap-2 p-3 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-500">
                        <Loader2 size={14} className="animate-spin text-amber-500" />
                        <span>Verifying delivery distance & charges...</span>
                      </div>
                    )}

                    {locationError && !addressLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2.5 p-3 rounded-2xl bg-red-50 border border-red-200"
                      >
                        <AlertCircle size={15} className="text-red-600 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-red-700">
                            Location Outside Service Area
                          </p>
                          <p className="text-[11px] text-red-600 mt-0.5 leading-relaxed">
                            {locationError}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {addressVerified && serviceable && !addressLoading && (
                      <div className="flex items-center justify-between gap-3 p-2.5 px-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-800 text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                          <span className="font-bold text-[11px]">
                            Location verified for pickup & delivery
                          </span>
                        </div>
                        <span className="text-[11px] font-black text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                          {deliveryFee === 0 ? "FREE Delivery" : `₹${deliveryFee} Delivery`}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-dashed border-amber-300 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <AlertCircle size={16} className="text-amber-600 shrink-0" />
                      <p className="text-xs font-semibold text-gray-700 truncate">
                        Select a saved address above or add a new one.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenAddAddress}
                      className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#101010] text-[#FFD700] hover:bg-black transition-all shadow-xs"
                    >
                      + Add Address
                    </button>
                  </div>
                )}
              </div>
            </SectionCard>

            {serviceable && addressVerified && location && (
              <>
            {/* PICKUP CONTACT */}
            <SectionCard
              icon={Phone}
              iconColor="#8B5CF6"
              iconBg="#F5F3FF"
              title="Pickup Contact"
            >
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: "#F8F9FB",
                  border:
                    "1px solid #EFEFEF",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                  style={{
                    background: "#FFD700",
                    color: "#101010",
                  }}
                >
                  {user?.name?.[0]?.toUpperCase() ||
                    "U"}
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-[13px] leading-none truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {user?.phone}
                  </p>
                </div>

                <span
                  className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: "#ECFDF5",
                    color: "#065F46",
                  }}
                >
                  Account
                </span>
              </div>

              {!orderForSomeoneElse && (
                <>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={alternateContact}
                      onChange={(e) =>
                        setAlternateContact(
                          e.target.checked
                        )
                      }
                    />

                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background:
                          alternateContact
                            ? "#101010"
                            : "white",
                        border:
                          alternateContact
                            ? "none"
                            : "1.5px solid #D1D5DB",
                      }}
                    >
                      {alternateContact && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="#FFD700"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Someone else will hand over
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Add an alternate pickup contact
                      </p>
                    </div>
                  </label>

                  <AnimatePresence initial={false}>
                    {alternateContact && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="grid sm:grid-cols-2 gap-3 overflow-hidden"
                      >
                        <PremiumInput
                          label="Contact Name"
                          icon={User}
                          placeholder="Full name"
                          error={
                            errors.pickupContactName
                              ?.message
                          }
                          {...register(
                            "pickupContactName",
                            {
                              required:
                                alternateContact
                                  ? "Contact name is required"
                                  : false,
                            }
                          )}
                        />

                        <PremiumInput
                          label="Mobile Number"
                          icon={Phone}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          inputMode="numeric"
                          error={
                            errors.pickupContactPhone
                              ?.message
                          }
                          {...register(
                            "pickupContactPhone",
                            {
                              required:
                                alternateContact
                                  ? "Contact number is required"
                                  : false,
                              pattern: {
                                value:
                                  /^[6-9]\d{9}$/,
                                message:
                                  "Enter a valid 10-digit mobile number",
                              },
                            }
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </SectionCard>

            {/* SCHEDULE */}
            <SectionCard
              icon={Calendar}
              iconColor="#3B82F6"
              iconBg="#EFF6FF"
              title="Pickup Schedule"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                    Date
                  </label>

                  <div
                    className="flex items-center rounded-2xl overflow-hidden"
                    style={{
                      border:
                        errors.date
                          ? "1.5px solid #FCA5A5"
                          : "1.5px solid #EFEFEF",
                      background: "white",
                    }}
                  >
                    <div className="pl-4">
                      <Calendar
                        size={16}
                        color="#9CA3AF"
                      />
                    </div>

                    <input
                      type="date"
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      {...register("date", {
                        required:
                          "Select a pickup date",
                      })}
                      className="flex-1 px-4 py-3.5 bg-transparent outline-none text-sm font-medium text-gray-800 min-w-0"
                    />
                  </div>

                  {errors.date && (
                    <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500">
                      <AlertCircle size={11} />
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                    Time Slot
                  </label>

                  <div
                    className="flex items-center rounded-2xl overflow-hidden"
                    style={{
                      border:
                        errors.time
                          ? "1.5px solid #FCA5A5"
                          : "1.5px solid #EFEFEF",
                      background: "white",
                    }}
                  >
                    <div className="pl-4">
                      <Clock
                        size={16}
                        color="#9CA3AF"
                      />
                    </div>

                    <select
                      {...register("time", {
                        required:
                          "Select a time slot",
                      })}
                      className="flex-1 px-4 py-3.5 bg-transparent outline-none text-sm font-medium text-gray-800 appearance-none cursor-pointer min-w-0"
                    >
                      <option value="">
                        Choose a time slot
                      </option>
                      {availableSlots.map(
                        (slot) => (
                          <option
                            key={slot.label}
                            value={slot.label}
                          >
                            {slot.label}
                          </option>
                        )
                      )}
                    </select>

                    <div className="pr-4">
                      <ChevronRight
                        size={14}
                        color="#9CA3AF"
                        className="rotate-90"
                      />
                    </div>
                  </div>

                  {errors.time && (
                    
                    <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500">
                      <AlertCircle size={11} />
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>
                  
              <div
                className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
                style={{
                  background: "#F8F9FB",
                }}
              >
                <span className="text-base shrink-0">
                  ⚡
                </span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Our team will arrive within your selected slot. You'll get an email confirmation once your order is placed.
                </p>
              </div>
            </SectionCard>
              </>
            )}

              {!serviceable && !addressLoading && !locationError && (
                <div
                  className="p-4 rounded-2xl text-center"
                  style={{
                    background: "#FAFAFA",
                    border: "1px dashed #D1D5DB",
                  }}
                >
                  <MapPin
                    size={18}
                    className="mx-auto mb-2"
                    color="#9CA3AF"
                  />
                  <p className="text-xs font-bold text-gray-700">
                    Choose your pickup location first
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Use your current location or select a point on the map.
                  </p>
                </div>
              )}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:sticky lg:top-24 mt-4 lg:mt-0 min-w-0">
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "white",
                border:
                  "1px solid #F0F0F0",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm">
                  Order Summary
                </h2>

                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: "#FFF9E6",
                    color: "#D97706",
                  }}
                >
                  {cart.length}{" "}
                  {cart.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div
                className="px-5 py-3 space-y-1.5 max-h-64 overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                }}
              >
                {cart.map((item) => {
                  const svcColor =
                    serviceColors[
                      item.service
                    ] || {
                      bg: "#F3F4F6",
                      color: "#6B7280",
                    };

                  const isPremium =
                    item.service ===
                      "Dry Clean" &&
                    item.careLevel ===
                      "premium";

                  return (
                    <div
                      key={`${item.name}-${item.service}-${item.careLevel || "regular"}`}
                      className="flex items-start gap-2.5 py-2.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-base shrink-0 mt-0.5">
                        {itemEmoji[
                          item.name
                        ] || "🧺"}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-800 leading-snug">
                          {item.name}
                        </p>

                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{
                              background:
                                svcColor.bg,
                              color:
                                svcColor.color,
                            }}
                          >
                            {item.service}
                          </span>

                          {item.service === "Dry Clean" && (
                            <span
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                              style={{
                                background:
                                  isPremium
                                    ? "#FFF8E1"
                                    : "#F3F4F6",
                                color:
                                  isPremium
                                    ? "#B7791F"
                                    : "#6B7280",
                                border:
                                  "1px solid " +
                                  (isPremium
                                    ? "#F6D365"
                                    : "#E5E7EB"),
                              }}
                            >
                              {isPremium
                                ? "Premium Care"
                                : "Regular Care"}
                            </span>
                          )}

                          <span className="text-[10px] text-gray-400">
                            × {item.qty}
                          </span>
                        </div>
                      </div>

                      <span className="text-[13px] font-black text-gray-900 shrink-0">
                        ₹
                        {item.qty *
                          item.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="px-5 py-3 space-y-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Item Total
                  </span>
                  <span className="font-semibold text-gray-800">
                    ₹{total}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <Sparkles size={12} />
                      Coupon Discount
                    </span>
                    <span className="font-semibold text-green-600">
                      −₹{discount}
                    </span>
                  </div>
                )}

                {location &&
                  serviceable && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        Delivery
                        {roadDistanceKm >
                          0 &&
                          ` (${roadDistanceKm.toFixed(
                            2
                          )} km)`}
                      </span>

                      <span
                        className={
                          deliveryFee === 0
                            ? "font-bold text-emerald-600"
                            : "font-semibold text-gray-800"
                        }
                      >
                        {deliveryFee === 0
                          ? "FREE"
                          : `₹${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                  )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Handling Charges
                  </span>
                  <span className="font-semibold text-gray-800">
                    ₹{handlingCharge}
                  </span>
                </div>
              </div>

              <div className="px-5 pb-4">
                <div
                  className="flex items-center justify-between px-4 py-4 rounded-2xl"
                  style={{
                    background: "#F8F9FB",
                    border:
                      "1px solid #EFEFEF",
                  }}
                >
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">
                      Amount to Pay
                    </p>
                    <p className="font-black text-gray-900 text-2xl leading-none">
                      ₹
                      {finalAmount.toFixed(
                        2
                      )}
                    </p>
                  </div>

                  {serviceable && (
                    <div
                      className="text-right"
                    >
                      <p className="text-[10px] text-gray-400">
                        Delivery
                      </p>
                      <p className="text-xs font-bold text-emerald-600">
                        {deliveryFee === 0
                          ? "FREE"
                          : `₹${deliveryFee.toFixed(2)}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 pb-5">
                <motion.button
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleSubmit(
                    onSubmit
                  )}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{
                    background: loading
                      ? "#374151"
                      : "linear-gradient(135deg,#101010,#1e1700)",
                    color: "white",
                    opacity: loading
                      ? 0.85
                      : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Continuing...
                    </>
                  ) : (
                    <>
                      Select Payment Method
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background:
                            "#FFD700",
                        }}
                      >
                        <ChevronRight
                          size={14}
                          color="#101010"
                        />
                      </span>
                    </>
                  )}
                </motion.button>

                <div className="flex items-center justify-center gap-4 mt-4">
                  {[
                    {
                      icon: (
                        <Shield size={11} />
                      ),
                      label: "Secure",
                    },
                    {
                      icon: (
                        <Package size={11} />
                      ),
                      label: "Pickup",
                    },
                    {
                      icon: (
                        <CheckCircle size={11} />
                      ),
                      label: "Trusted",
                    },
                  ].map((badge) => (
                    <span
                      key={badge.label}
                      className="flex items-center gap-1 text-[10px] text-gray-400 font-medium"
                    >
                      {badge.icon}
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE CTA */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-4 pb-3 pt-2"
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className="max-w-[640px] mx-auto"
          style={{
            pointerEvents: "auto",
          }}
        >
          <div
            className="rounded-2xl p-1"
            style={{
              background:
                "rgba(255,255,255,0.94)",
              backdropFilter:
                "blur(20px)",
              boxShadow:
                "0 -4px 30px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.08)",
              border:
                "1px solid rgba(255,255,255,0.95)",
            }}
          >
            <motion.button
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleSubmit(
                onSubmit
              )}
              disabled={loading}
              className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-[18px]"
              style={{
                background: loading
                  ? "#374151"
                  : "linear-gradient(135deg,#101010,#1e1700)",
              }}
            >
              <div className="text-left">
                <p
                  className="text-[10px] font-medium mb-0.5"
                  style={{
                    color:
                      "rgba(255,255,255,0.45)",
                  }}
                >
                  Amount to Pay
                </p>

                <p className="text-white font-black text-xl leading-none">
                  ₹
                  {finalAmount.toFixed(
                    2
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {loading ? (
                  <Loader2
                    size={16}
                    color="white"
                    className="animate-spin"
                  />
                ) : (
                  <>
                    <span className="text-white font-bold text-sm">
                      Continue
                    </span>

                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "#FFD700",
                      }}
                    >
                      <ChevronRight
                        size={16}
                        color="#101010"
                      />
                    </div>
                  </>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* PRODUCTION GRADE ADDRESS MODAL */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        initialAddress={editingAddress}
        currentLocation={location}
        currentUser={user}
        onAddressSaved={handleAddressSaved}
      />

      {/* DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {addressToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddressToDelete(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-3">
                <Trash2 size={22} />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                Delete this address?
              </h4>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-gray-800">
                  {addressToDelete.label || "this address"}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAddressToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={Boolean(deletingAddressId)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-red-200"
                >
                  {deletingAddressId ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ALL ADDRESSES MODAL (VIEW ALL POPUP) */}
      <AllAddressesModal
        isOpen={isAllAddressesModalOpen}
        onClose={() => setIsAllAddressesModalOpen(false)}
        addresses={savedAddresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={selectSavedAddress}
        onOpenAddAddress={handleOpenAddAddress}
        onOpenEditAddress={(addr) => handleOpenEditAddress(addr)}
        onDeleteAddress={(addr) => setAddressToDelete(addr)}
        onSetDefaultAddress={handleSetDefaultAddress}
        settingDefaultId={settingDefaultId}
      />
    </div>
  );
}