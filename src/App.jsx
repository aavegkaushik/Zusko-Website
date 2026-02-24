import { BrowserRouter, Route, Routes } from "react-router-dom";
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

import UnderDevelopmentPopup from "./components/UnderDevelopmentPopup";

const App = () => {
  const [showPopup, setShowPopup] = useState(true);

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
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;