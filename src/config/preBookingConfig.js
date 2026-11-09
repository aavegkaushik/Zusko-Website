// Configuration for Pre-Booking Mode
// When isEnabled is false, Zusko runs in regular on-demand booking mode with dynamic pickup dates and time slots.

export const PRE_BOOKING_CONFIG = {
  isEnabled: false,

  // Default values
  date: "",
  dateDisplay: "Scheduled Pickup",
  shortDateDisplay: "Scheduled",
  dayDisplay: "",

  // Standard Time Slot
  timeSlot: "10:00 AM - 01:00 PM",
  timeSlotDisplay: "10:00 AM - 01:00 PM",

  // Target Campus
  campusName: "BIET Jhansi",
  campusFullAddress: "BIET Jhansi Campus, Kanpur Road, Jhansi, Uttar Pradesh",
  campusPincode: "284128",
  city: "Jhansi",
  state: "Uttar Pradesh",

  // BIET Campus Hostels for quick selection
  hostels: [
    "Vrindavan Bhawan (Hostel 1)",
    "Saket Bhawan (Hostel 2)",
    "Jai Bharat Bhawan (Hostel 3)",
    "Panchwati Bhawan (Hostel 4)",
    "Yashodhara Bhawan (Girls Hostel 1)",
    "Kalpana Chawla Bhawan (Girls Hostel 2)",
    "Faculty & Staff Quarters",
    "Other Campus Hostel / Block",
  ],

  // BIET Campus GPS Coordinates (Kochhabhanwar / Kanpur Road, Jhansi)
  bietCoordinates: {
    latitude: 25.4923,
    longitude: 78.5830,
  },

  tagline: "Doorstep Laundry & Dry Cleaning",
  bannerText: "",
  ctaText: "Book Laundry Now",
};

export default PRE_BOOKING_CONFIG;
