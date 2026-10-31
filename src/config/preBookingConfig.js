// Configuration for Pre-Booking Mode
// When isEnabled is true, Zusko runs in exclusive Pre-Booking mode for BIET Jhansi Launch
// All orders are locked to the fixed 7th November pickup date & fixed time slot.

export const PRE_BOOKING_CONFIG = {
  isEnabled: true,

  // Fixed Pickup Date & Time for BIET Pre-Booking
  date: "2026-11-07", // YYYY-MM-DD
  dateDisplay: "Saturday, 7 Nov 2026",
  shortDateDisplay: "7 Nov 2026",
  dayDisplay: "Saturday",

  // Fixed Time Slot
  timeSlot: "10:00 AM - 01:00 PM",
  timeSlotDisplay: "10:00 AM - 01:00 PM (Campus Slot)",

  // Target Launch Campus
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

  // Launch messaging (Strictly no 'testing' phrasing)
  tagline: "Official Campus Launch for BIET Jhansi",
  bannerText: "🚀 Pre-Booking is LIVE for BIET Jhansi Launch! First pickup batch runs on 7th Nov (10 AM - 1 PM) • Reserve your slot now!",
  ctaText: "Pre-Book Laundry Slot",
};

export default PRE_BOOKING_CONFIG;
