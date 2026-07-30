import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PageNotFound from "./Pages/PagenotFound.jsx";
import Contact from "./Pages/Contact.jsx";
import Services from "./Pages/Services.jsx";
import Career from "./Pages/Career.jsx";
import ScrollToTop from "./components/ScrollTop.jsx";
import Team from "./Pages/Team.jsx";
import HelpSupport from "./Pages/Help&Support.jsx";
import TermsAndConditions from "./Pages/TermsCondition.jsx";
import PrivacyPolicy from "./Pages/Privacy.jsx";
import CookiePolicy from "./Pages/CookiePolicy.jsx";
import ApplyJob from "./Pages/ApplyJob.jsx";
import JobDetails from "./Pages/JobDetails.jsx";
import ForBusiness from "./Pages/ForBusiness.jsx";
import Blog from "./Pages/Blog.jsx";
import PartnerWithUs from "./Pages/PartnerwithUs.jsx";
import CityAvailability from "./Pages/CityAvailability.jsx";
import Order from "./Pages/Order.jsx";
import UnderDevelopmentPopup from "./components/UnderDevelopmentPopup";
import Login from "./Pages/Login.jsx";
import CartBar from "./components/CartBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Payment from "./Pages/Payment.jsx";
import Success from "./Pages/Success.jsx";
import SplashScreen from "./components/SplashScreen";
import CareerNavbar from "./components/CareerNavbar.jsx";
import CareerSuccess from "./Pages/CareerSuccess.jsx";
import TrackOrder from "./Pages/TrackOrder.jsx";
import MyOrders from "./Pages/MyOrders.jsx";
import RateOrder from "./Pages/RateOrder.jsx";
import Profile from "./Pages/Profile.jsx";
import EditProfile from "./Pages/EditProfile.jsx";
import Addresses from "./Pages/Addresses.jsx";
const App = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  const hideCartRoutes = ["/checkout", "/success"];

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

  // Splash screen logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);

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
            <Route
  path="/track-order/:id"
  element={<TrackOrder />}
/>
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

          {/* {!hideCartRoutes.includes(location.pathname) && <CartBar />} */}

          <Footer />
        </>
      )}
    </>
  );
};

export default App;
