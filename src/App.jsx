import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Order from './Pages/Order.jsx'
import UnderDevelopmentPopup from "./components/UnderDevelopmentPopup";
import Login from "./Pages/Login.jsx";
import CartBar from "./components/CartBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Payment from "./Pages/Payment.jsx";
import Success from "./Pages/Success.jsx";

const App = () => {
  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();

  const hideCartRoutes = ["/checkout", "/success"];

  useEffect(() => {
    const seen = localStorage.getItem("under_dev_seen");

    if (!seen) {
      setShowPopup(true);
      localStorage.setItem("under_dev_seen", "true");
    }
  }, []);

  return (
    <>
      <UnderDevelopmentPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />

      <ScrollToTop />
      <Navbar />

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

        {/* Protected routes */}
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

      {!hideCartRoutes.includes(location.pathname) && <CartBar />}

      <Footer />
    </>
  );
};

export default App;