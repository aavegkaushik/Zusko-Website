import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

// Eager load for instant first render
import Home from "./Pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollTop.jsx";
import SplashScreen from "./components/SplashScreen";
import UnderDevelopmentPopup from "./components/UnderDevelopmentPopup";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CareerNavbar from "./components/CareerNavbar.jsx";

// Lazy load secondary routes to keep initial bundle ultra-light
const About = lazy(() => import("./Pages/About.jsx"));
const Contact = lazy(() => import("./Pages/Contact.jsx"));
const Services = lazy(() => import("./Pages/Services.jsx"));
const Career = lazy(() => import("./Pages/Career.jsx"));
const JobDetails = lazy(() => import("./Pages/JobDetails.jsx"));
const ApplyJob = lazy(() => import("./Pages/ApplyJob.jsx"));
const CareerSuccess = lazy(() => import("./Pages/CareerSuccess.jsx"));
const Team = lazy(() => import("./Pages/Team.jsx"));
const HelpSupport = lazy(() => import("./Pages/Help&Support.jsx"));
const TermsAndConditions = lazy(() => import("./Pages/TermsCondition.jsx"));
const PrivacyPolicy = lazy(() => import("./Pages/Privacy.jsx"));
const CookiePolicy = lazy(() => import("./Pages/CookiePolicy.jsx"));
const ForBusiness = lazy(() => import("./Pages/ForBusiness.jsx"));
const Blog = lazy(() => import("./Pages/Blog.jsx"));
const PartnerWithUs = lazy(() => import("./Pages/PartnerwithUs.jsx"));
const CityAvailability = lazy(() => import("./Pages/CityAvailability.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Order = lazy(() => import("./Pages/Order.jsx"));
const Cart = lazy(() => import("./Pages/Cart.jsx"));
const Checkout = lazy(() => import("./Pages/Checkout.jsx"));
const Payment = lazy(() => import("./Pages/Payment.jsx"));
const Success = lazy(() => import("./Pages/Success.jsx"));
const TrackOrder = lazy(() => import("./Pages/TrackOrder.jsx"));
const MyOrders = lazy(() => import("./Pages/MyOrders.jsx"));
const RateOrder = lazy(() => import("./Pages/RateOrder.jsx"));
const Profile = lazy(() => import("./Pages/Profile.jsx"));
const EditProfile = lazy(() => import("./Pages/EditProfile.jsx"));
const Addresses = lazy(() => import("./Pages/Addresses.jsx"));
const OutOfArea = lazy(() => import("./Pages/OutOfArea.jsx"));
const PageNotFound = lazy(() => import("./Pages/PagenotFound.jsx"));

// Minimal lightweight loader for smooth route transitions
const RouteLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <div className="w-9 h-9 rounded-full border-3 border-yellow-200 border-t-yellow-400 animate-spin" />
    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Loading...</span>
  </div>
);

const App = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  // Under development popup logic
  useEffect(() => {
    const seen = localStorage.getItem("under_dev_seen");

    if (!seen) {
      setShowPopup(true);
      localStorage.setItem("under_dev_seen", "true");
    } else {
      setShowPopup(false);
    }
  }, []);

  // Snappy splash screen (600ms) to prevent long blocking
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "16px",
            background: "#111827",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
        }}
      />
      <SplashScreen show={showSplash} />

      {!showSplash && (
        <>
          <UnderDevelopmentPopup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
          />

          <ScrollToTop />

          {location.pathname.startsWith("/career") ? (
            <CareerNavbar />
          ) : (
            <Navbar />
          )}

          <Suspense fallback={<RouteLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/career" element={<Career />} />
              <Route path="/career/:jobId" element={<JobDetails />} />
              <Route path="/apply/:jobId" element={<ApplyJob />} />
              <Route path="/team" element={<Team />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/for-business" element={<ForBusiness />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/partnerwithus" element={<PartnerWithUs />} />
              <Route path="/available/:city" element={<CityAvailability />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/career/success" element={<CareerSuccess />} />
              <Route path="/track-order/:id" element={<TrackOrder />} />

              {/* Protected routes */}
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile/edit"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/addresses"
                element={
                  <ProtectedRoute>
                    <Addresses />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders/:id/rate"
                element={
                  <ProtectedRoute>
                    <RateOrder />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/place-order"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route path="/out-of-area" element={<OutOfArea />} />

              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/success"
                element={
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>

          <Footer />
        </>
      )}
    </>
  );
};

export default App;
