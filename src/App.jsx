import { Route, Routes, Router } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import About from "./Pages/About.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import PageNotFound from "./Pages/PagenotFound.jsx"
import Contact from "./Pages/Contact.jsx"
import Services from "./Pages/Services.jsx"
import Career from "./Pages/Career.jsx"
import ScrollToTop from "./components/ScrollTop.jsx"
import Team from "./Pages/Team.jsx"
import HelpSupport from "./Pages/Help&Support.jsx"
import TermsAndConditions from "./Pages/TermsCondition.jsx"
import PrivacyPolicy from "./Pages/Privacy.jsx"
import CookiePolicy from "./Pages/CookiePolicy.jsx"
import ApplyJob from "./Pages/ApplyJob.jsx"
import JobDetails from "./Pages/JobDetails.jsx"
import ForBusiness from "./Pages/ForBusiness.jsx"
import Blog from "./Pages/Blog.jsx"
const App = () => {
  return (
    <div>
      {/* <Router> */}
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/contact" Component={Contact} />
          <Route path="/services" Component={Services} />
          <Route path="/career" Component={Career} />
          <Route path="/career/:jobId" element={JobDetails} />
          <Route path="/apply/:jobId" element={ApplyJob} />
          <Route path="/team" Component={Team} />
          <Route path="/help" Component={HelpSupport} />
          <Route path="/terms" Component={TermsAndConditions} />
          <Route path="/privacy" Component={PrivacyPolicy} />
          <Route path="/blog" Component={Blog} />
          <Route path="/for-business" Component={ForBusiness} />
          <Route path="/cookie-policy" Component={CookiePolicy} />
          <Route path="*" Component={PageNotFound} />
        </Routes>
        <Footer/>
      {/* </Router> */}
    </div>
  )
}

export default App
