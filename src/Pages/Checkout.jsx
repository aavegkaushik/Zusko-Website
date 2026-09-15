import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../config/api";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
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
  const { user } = useContext(AuthContext);

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

  const finalAmount = useMemo(
    () => Math.max(0, Number(finalTotal || 0) + Number(deliveryFee || 0)),
    [finalTotal, deliveryFee]
  );

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchSavedAddresses = async () => {
      try {
        setSavedAddressLoading(true);

        const response = await API.get("/addresses");

        const addresses =
          response?.data?.data ||
          response?.data?.addresses ||
          response?.data ||
          [];

        setSavedAddresses(
          Array.isArray(addresses) ? addresses : []
        );
      } catch (error) {
        console.error("SAVED ADDRESS ERROR:", error);
        setSavedAddresses([]);
      } finally {
        setSavedAddressLoading(false);
      }
    };

    fetchSavedAddresses();
  }, [user]);

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

      setDeliveryFee(
        Number(delivery.deliveryFee || 0)
      );

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
        "This saved address has no valid map location. Please select it on the map."
      );
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

    setValue(
      "fullAddress",
      address.line1 ||
        address.fullAddress ||
        ""
    );

    setValue(
      "landmark",
      address.landmark || ""
    );

    setValue(
      "pincode",
      address.pincode || ""
    );

    setCity(address.city || "");

    if (orderForSomeoneElse) {
      setRecipientName(
        address.fullName || ""
      );
      setRecipientPhone(
        address.phone || ""
      );
    }

    await calculateDeliveryEstimate(
      latitude,
      longitude
    );
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
    if (!data.fullAddress?.trim()) {
      alert("Please enter your full address.");
      return;
    }

    if (!data.pincode || !/^\d{6}$/.test(data.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!location) {
  alert(
    "Please use your current location or select a location on the map."
  );
  return;
}

// Location selected but outside Zusko service area
if (location && !serviceable) {
  navigate("/out-of-area");
  return;
}

// Location is still being verified
if (!addressVerified) {
  alert("Please wait while we verify your pickup location.");
  return;
}

    if (
      orderForSomeoneElse &&
      (!recipientName.trim() ||
        !/^[6-9]\d{9}$/.test(recipientPhone))
    ) {
      alert(
        "Please enter the recipient's valid name and 10-digit mobile number."
      );
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
          fullAddress:
            data.fullAddress.trim(),
          landmark:
            data.landmark?.trim() || "",
          city: city || "Jhansi",
          state:
            data.state?.trim() ||
            "Uttar Pradesh",
          pincode: data.pincode,

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
            item.careLevel || "regular",
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
      alert("Unable to continue. Please try again.");
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

              {/* SAVED ADDRESSES */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                      Previously Used
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Tap an address to use it
                    </p>
                  </div>

                  {savedAddresses.length > 0 && (
                    <span className="text-[10px] font-semibold text-gray-400">
                      {savedAddresses.length} saved
                    </span>
                  )}
                </div>

                {savedAddressLoading ? (
                  <div className="flex items-center gap-2 py-3 text-xs text-gray-400">
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                    Loading saved addresses...
                  </div>
                ) : savedAddresses.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-1 snap-x">
                    {savedAddresses.map(
                      (address) => {
                        const selected =
                          selectedAddressId ===
                          address._id;

                        const label =
                          address.label ||
                          address.title ||
                          "Home";

                        const Icon =
                          label.toLowerCase() ===
                          "work"
                            ? Briefcase
                            : Home;

                        return (
                          <button
                            type="button"
                            key={address._id}
                            onClick={() =>
                              selectSavedAddress(
                                address
                              )
                            }
                            className="w-[220px] sm:w-[235px] shrink-0 text-left p-3.5 rounded-2xl transition-all snap-start"
                            style={{
                              background:
                                selected
                                  ? "#FFF9E6"
                                  : "#FAFAFA",
                              border:
                                selected
                                  ? "1.5px solid #FFD700"
                                  : "1px solid #ECECEC",
                              boxShadow:
                                selected
                                  ? "0 4px 16px rgba(255,215,0,0.12)"
                                  : "none",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{
                                  background:
                                    selected
                                      ? "#FFD700"
                                      : "white",
                                }}
                              >
                                <Icon
                                  size={13}
                                  color="#111"
                                />
                              </div>

                              <span className="text-xs font-bold text-gray-800 truncate">
                                {label}
                              </span>

                              {selected && (
                                <CheckCircle
                                  size={14}
                                  color="#10B981"
                                  className="ml-auto shrink-0"
                                />
                              )}
                            </div>

                            <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                              {address.line1 ||
                                address.fullAddress ||
                                "Saved address"}
                            </p>

                            {address.city && (
                              <p className="text-[10px] text-gray-400 mt-1">
                                {address.city}
                                {address.pincode
                                  ? ` • ${address.pincode}`
                                  : ""}
                              </p>
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{
                      background: "#FAFAFA",
                      border:
                        "1px dashed #D1D5DB",
                    }}
                  >
                    <Plus
                      size={15}
                      color="#9CA3AF"
                    />
                    <div>
                      <p className="text-xs font-semibold text-gray-600">
                        No saved addresses yet
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Your first address will be saved automatically.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* LOCATION ACTIONS */}
              <div className="grid sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={traceCurrentLocation}
                  disabled={locationLoading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all disabled:opacity-60"
                  style={{
                    background: "#101010",
                    color: "white",
                    boxShadow:
                      "0 5px 16px rgba(16,16,16,0.14)",
                  }}
                >
                  {locationLoading ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Detecting...
                    </>
                  ) : (
                    <>
                      <Navigation
                        size={16}
                        color="#FFD700"
                      />
                      Use My Current Location
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMapOpen((prev) => !prev)
                  }
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all"
                  style={{
                    background: "#F8F9FB",
                    color: "#111827",
                    border:
                      "1px solid #E5E7EB",
                  }}
                >
                  {mapOpen ? (
                    <>
                      <X size={16} />
                      Close Map
                    </>
                  ) : (
                    <>
                      <MapPinned size={16} />
                      Select on Map
                    </>
                  )}
                </button>
              </div>

              {/* MAP */}
<AnimatePresence initial={false}>
  {mapOpen && (
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
      <div className="space-y-2.5">

        {/* MAP */}
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            height: "330px",
            border: "1px solid #E5E7EB",
          }}
        >
          <MapContainer
            center={
              selectedLocation
                ? [
                    selectedLocation.latitude,
                    selectedLocation.longitude,
                  ]
                : ZUSKO_LOCATION
            }
            zoom={14}
            scrollWheelZoom
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController
              position={selectedLocation}
            />

            <LocationPicker
              position={selectedLocation}
              onSelect={handleMapLocationSelect}
            />
          </MapContainer>

          {/* TOP INSTRUCTION */}
          <div
            className="absolute left-3 right-3 top-3 z-[1000] px-3 py-2.5 rounded-xl bg-white/95 backdrop-blur shadow-lg pointer-events-none"
          >
            <div className="flex items-center gap-2">
              <MapPinned
                size={15}
                color="#EF4444"
              />

              <p className="text-[11px] font-semibold text-gray-700">
                Tap anywhere on the map to choose the pickup location
              </p>
            </div>
          </div>

          {/* BOTTOM INFO */}
          <div
            className="absolute bottom-3 left-3 right-3 z-[1000] px-3 py-2 rounded-xl bg-white/95 backdrop-blur shadow-lg pointer-events-none"
          >
            <p className="text-[10px] text-gray-500">
              The selected location will be used to calculate the road distance and delivery charge.
            </p>
          </div>
        </div>

        {/* DONE BUTTON — ONLY AFTER LOCATION IS SELECTED */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.button
              type="button"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 8,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setMapOpen(false)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: "#101010",
                color: "white",
                boxShadow:
                  "0 5px 16px rgba(16,16,16,0.14)",
              }}
            >
              <CheckCircle
                size={16}
                color="#FFD700"
              />

              Done
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )}
</AnimatePresence>

              {/* LOCATION ERROR */}
              {locationError && !serviceable && !addressLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 p-3 rounded-2xl"
                  style={{
                    background: "#FEF2F2",
                    border: "1px solid #FECACA",
                  }}
                >
                  <AlertCircle size={15} color="#EF4444" className="mt-0.5 shrink-0" />
                  <p className="text-[11px] font-semibold text-red-600 leading-relaxed">
                    {locationError}
                  </p>
                </motion.div>
              )}

              {/* ADDRESS FORM — ONLY AFTER SERVICEABILITY IS CONFIRMED */}
              {serviceable && addressVerified && location && (
              <div className="grid gap-3">
                <PremiumInput
                  label="Full Address"
                  icon={MapPin}
                  placeholder="House / flat no., street, area..."
                  error={
                    errors.fullAddress?.message
                  }
                  {...register("fullAddress", {
                    required:
                      "Address is required",
                  })}
                />

                <div className="grid sm:grid-cols-2 gap-3">
                  <PremiumInput
                    label="Landmark"
                    icon={MapPinned}
                    placeholder="Near school, mall, temple..."
                    {...register("landmark")}
                  />

                  <PremiumInput
                    label="Pincode"
                    icon={MapPin}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    inputMode="numeric"
                    error={
                      errors.pincode?.message ||
                      pinError
                    }
                    {...register("pincode", {
                      required:
                        "Pincode is required",
                      pattern: {
                        value:
                          /^[0-9]{6}$/,
                        message:
                          "Enter valid 6-digit pincode",
                      },
                      onChange: (e) => {
                        e.target.value =
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);
                      },
                    })}
                  />
                </div>

                {/* LOCATION STATUS */}
                <AnimatePresence mode="wait">
                  {reverseGeocoding && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="flex items-center gap-2 text-[11px] text-gray-400"
                    >
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />
                      Finding address...
                    </motion.div>
                  )}

                  {checkingPin &&
                    !reverseGeocoding && (
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        className="flex items-center gap-2 text-[11px] text-gray-400"
                      >
                        <Loader2
                          size={13}
                          className="animate-spin"
                        />
                        Verifying pincode...
                      </motion.div>
                    )}

                  {city &&
                    !checkingPin &&
                    !reverseGeocoding && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.98,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle
                          size={14}
                          color="#10B981"
                        />
                        <span
                          className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                          style={{
                            background:
                              "#ECFDF5",
                            color:
                              "#065F46",
                          }}
                        >
                          📍 {city}
                        </span>
                      </motion.div>
                    )}
                </AnimatePresence>

                {locationError && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-start gap-2.5 p-3 rounded-2xl"
                    style={{
                      background: "#FEF2F2",
                      border:
                        "1px solid #FECACA",
                    }}
                  >
                    <AlertCircle
                      size={15}
                      color="#EF4444"
                      className="mt-0.5 shrink-0"
                    />
                    <p className="text-[11px] font-semibold text-red-600 leading-relaxed">
                      {locationError}
                    </p>
                  </motion.div>
                )}

                {addressLoading && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-2xl"
                    style={{
                      background: "#F8F9FB",
                      border:
                        "1px solid #EFEFEF",
                    }}
                  >
                    <Loader2
                      size={14}
                      className="animate-spin"
                      color="#9CA3AF"
                    />
                    <span className="text-[11px] text-gray-500">
                      Calculating road distance & delivery charge...
                    </span>
                  </div>
                )}

                {addressVerified &&
                  serviceable &&
                  !addressLoading && (
                    <div
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl"
                      style={{
                        background:
                          "#ECFDF5",
                        border:
                          "1px solid #A7F3D0",
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "#D1FAE5",
                          }}
                        >
                          <CheckCircle
                            size={15}
                            color="#059669"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-emerald-800">
                            Location verified
                          </p>
                          
                        </div>
                      </div>

                      
                    </div>
                  )}
              </div>
              )}
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
    </div>
  );
}