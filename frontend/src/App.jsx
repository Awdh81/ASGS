import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout & Common
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Tracking from "./pages/Tracking";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";

// Auth Pages (Admin)
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Auth Pages (Doctor)
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorVerify from "./pages/DoctorVerify";
import DoctorForgotPassword from "./pages/DoctorForgotPassword";
import DoctorResetPassword from "./pages/DoctorResetPassword";

// Auth Pages (Public User)
import PublicLogin from "./pages/PublicLogin";
import PublicRegister from "./pages/PublicRegister";
import PublicVerify from "./pages/PublicVerify";
import PublicForgotPassword from "./pages/PublicForgotPassword";
import PublicResetPassword from "./pages/PublicResetPassword";

// Dashboards (Protected)
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PublicDashboard from "./pages/PublicDashboard";

// Placeholder components for missing pages (optional)
const Contact = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>Contact Us</h1>
    <p>Email: support@animalhub.com</p>
  </div>
);
const Services = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>Our Services</h1>
    <p>Animal tracking, health monitoring, buy/sell marketplace.</p>
  </div>
);
const News = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>Latest News</h1>
    <p>Coming soon...</p>
  </div>
);

// Protected Route wrapper
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />

        {/* Admin auth */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* Doctor auth */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctor-verify" element={<DoctorVerify />} />
        <Route path="/doctor-forgot" element={<DoctorForgotPassword />} />
        <Route path="/doctor-reset" element={<DoctorResetPassword />} />

        {/* Public user auth */}
        <Route path="/public-login" element={<PublicLogin />} />
        <Route path="/public-register" element={<PublicRegister />} />
        <Route path="/public-verify" element={<PublicVerify />} />
        <Route path="/public-forgot" element={<PublicForgotPassword />} />
        <Route path="/public-reset" element={<PublicResetPassword />} />

        {/* Protected dashboards */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public-dashboard"
          element={
            <ProtectedRoute>
              <PublicDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;