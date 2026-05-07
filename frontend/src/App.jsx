import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

// Layout & Common
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
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
import AnimalDoctorBooking from "./pages/AnimalDoctorBooking";

// Dashboards (Protected)
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PublicDashboard from "./pages/PublicDashboard";

// Protected Route wrapper
import ProtectedRoute from "./components/ProtectedRoute";

// ==================== ABOUT PAGE (ASGS THEME - FIXED) ====================
const About = () => {
  const navigate = useNavigate();
  
  const redirectToLogin = () => navigate("/public-login");
  
  const teamMembers = [
    { name: "Awdhesh Sahani", role: "Full Stack Developer", icon: "👨‍💻", color: "#8b5cf6", desc: "Backend & Frontend Expert", exp: "2+ years", projects: "5+ Major Projects" },
    { name: "Gaurav Singh", role: "Frontend Developer", icon: "🎨", color: "#10b981", desc: "UI/UX Specialist", exp: "2+ years", projects: "4+ Major Projects" },
    { name: "Dr. Sarah Wilson", role: "Chief Veterinarian", icon: "👩‍⚕️", color: "#f59e0b", desc: "Animal Health Expert", exp: "15+ years", projects: "10000+ Pets Treated" },
    { name: "Dr. Michael Chen", role: "Senior Pet Specialist", icon: "👨‍⚕️", color: "#ef4444", desc: "Surgery & Emergency", exp: "12+ years", projects: "8000+ Successful Surgeries" }
  ];
  
  const values = [
    { title: "Compassion", desc: "We treat every animal with love and care like our own family members.", icon: "❤️", color: "#ef4444" },
    { title: "Excellence", desc: "Best-in-class animal management facilities with modern technology.", icon: "⭐", color: "#f59e0b" },
    { title: "Trust", desc: "Building lasting relationships with farmers and pet owners across India.", icon: "🤝", color: "#10b981" },
    { title: "Innovation", desc: "Latest technology for animal tracking, health monitoring, and care.", icon: "💡", color: "#8b5cf6" }
  ];
  
  const stats = [
    { value: "5000+", label: "Animals Tracked", icon: "🐾", growth: "+45% this year" },
    { value: "100+", label: "Expert Doctors", icon: "👨‍⚕️", growth: "+20 new doctors" },
    { value: "10000+", label: "Happy Farmers", icon: "👨‍🌾", growth: "+2000 this month" },
    { value: "4.9", label: "User Rating", icon: "⭐", growth: "From 5000+ reviews" },
    { value: "50+", label: "Cities Covered", icon: "🏙️", growth: "Pan India Service" },
    { value: "24/7", label: "Customer Support", icon: "🕐", growth: "Always available" }
  ];

  const milestones = [
    { year: "2024", title: "ASGS Launched", desc: "Platform launched with basic tracking features", icon: "🚀" },
    { year: "2024", title: "1000 Users", desc: "Reached 1000+ happy farmers milestone", icon: "🎉" },
    { year: "2024", title: "Doctor Network", desc: "50+ veterinarians joined ASGS", icon: "👨‍⚕️" },
    { year: "2025", title: "Marketplace", desc: "Buy & Sell feature launched", icon: "🛒" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <div style={{ padding: "100px 20px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.15)", padding: "8px 20px", borderRadius: "50px", marginBottom: "24px", fontSize: "13px", color: "#a78bfa" }}>
            <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", display: "inline-block" }}></span>
            <span>✨ Welcome to ASGS ✨</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "700", color: "#fff", marginBottom: "20px", lineHeight: "1.2" }}>
            Animal Secure & <br />
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Growth System</span>
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto 30px", lineHeight: "1.6" }}>
            Revolutionizing animal management with cutting-edge technology since 2024.
            India's most trusted platform for farmers, pet owners, and veterinarians.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/public-register")} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>🚀 Get Started Free</button>
            <button onClick={redirectToLogin} style={{ padding: "14px 32px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "#fff", fontSize: "14px", cursor: "pointer" }}>📍 Watch Demo</button>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div style={{ padding: "60px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", background: "rgba(139,92,246,0.15)", borderRadius: "50px", fontSize: "12px", color: "#a78bfa", marginBottom: "16px" }}>📖 Our Journey</span>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#fff", marginBottom: "12px" }}>The ASGS Story</h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto" }}>From a small idea to India's leading animal management platform</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "0 auto 40px" }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "25px", borderRadius: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ display: "inline-block", background: "rgba(139,92,246,0.2)", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", color: "#a78bfa", marginBottom: "12px" }}>{m.year}</span>
              <div style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}>{m.icon}</div>
              <h3 style={{ fontSize: "18px", color: "#fff", marginBottom: "8px" }}>{m.title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{m.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: "800px", margin: "40px auto 0", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "15px" }}>Founded in 2024, ASGS started with a simple mission: to help farmers and pet owners manage their animals better through technology.</p>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>Today, we're proud to offer real-time tracking, doctor booking, health monitoring, and a secure marketplace - all in one place.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", maxWidth: "1000px", margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{ background: "rgba(139,92,246,0.1)", padding: "40px", borderRadius: "24px", textAlign: "center", border: "1px solid rgba(139,92,246,0.2)" }}>
          <div style={{ fontSize: "50px", display: "block", marginBottom: "16px" }}>🎯</div>
          <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "15px" }}>Our Mission</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>To provide accessible, affordable, and high-quality animal management solutions for every farmer and pet owner across India.</p>
        </div>
        <div style={{ background: "rgba(16,185,129,0.1)", padding: "40px", borderRadius: "24px", textAlign: "center", border: "1px solid rgba(16,185,129,0.2)" }}>
          <div style={{ fontSize: "50px", display: "block", marginBottom: "16px" }}>👁️</div>
          <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "15px" }}>Our Vision</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>To become India's most trusted and innovative animal care platform, setting new standards in animal healthcare and management.</p>
        </div>
      </div>

      {/* Core Values */}
      <div style={{ padding: "60px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", background: "rgba(139,92,246,0.15)", borderRadius: "50px", fontSize: "12px", color: "#a78bfa", marginBottom: "16px" }}>💎 Core Values</span>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#fff", marginBottom: "12px" }}>What Drives Us</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px", maxWidth: "1100px", margin: "0 auto" }}>
          {values.map((v, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "30px", borderRadius: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", background: v.color }}><span style={{ fontSize: "35px" }}>{v.icon}</span></div>
              <h3 style={{ fontSize: "20px", color: "#fff", marginBottom: "10px" }}>{v.title}</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ padding: "40px 20px", background: "rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", background: "rgba(139,92,246,0.15)", borderRadius: "50px", fontSize: "12px", color: "#a78bfa", marginBottom: "16px" }}>📊 By the Numbers</span>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#fff", marginBottom: "12px" }}>ASGS in Numbers</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "25px", borderRadius: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "35px", display: "block", marginBottom: "10px" }}>{s.icon}</div>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#8b5cf6" }}>{s.value}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "5px" }}>{s.label}</div>
              <div style={{ fontSize: "10px", color: "#10b981", marginTop: "8px" }}>{s.growth}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div style={{ padding: "60px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", background: "rgba(139,92,246,0.15)", borderRadius: "50px", fontSize: "12px", color: "#a78bfa", marginBottom: "16px" }}>👥 Our Team</span>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#fff", marginBottom: "12px" }}>Meet the People Behind ASGS</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px", maxWidth: "1100px", margin: "0 auto" }}>
          {teamMembers.map((m, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "25px", borderRadius: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: "90px", height: "90px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", background: m.color }}><span style={{ fontSize: "45px" }}>{m.icon}</span></div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", marginBottom: "4px" }}>{m.name}</h3>
              <p style={{ fontSize: "12px", color: "#8b5cf6", marginBottom: "8px", fontWeight: "500" }}>{m.role}</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>{m.desc}</p>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}><span>📅</span> {m.exp}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginTop: "5px" }}><span>🏆</span> {m.projects}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ textAlign: "center", padding: "60px 20px", background: "linear-gradient(135deg, #1e1b4b, #0f172a)", marginTop: "40px" }}>
        <h2 style={{ fontSize: "28px", color: "#fff", marginBottom: "15px" }}>Ready to Transform Animal Management?</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "30px" }}>Join thousands of farmers and pet owners who trust ASGS for their animal care needs</p>
        <div>
          <button onClick={() => navigate("/public-register")} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginRight: "12px" }}>Register Now →</button>
          <button onClick={() => navigate("/public-login")} style={{ padding: "14px 32px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "#fff", fontSize: "15px", cursor: "pointer" }}>Login</button>
        </div>
      </div>
    </div>
  );
};

// ==================== CONTACT PAGE (ASGS THEME - FIXED) ====================
const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: "📧", title: "Email Us", details: ["support@asgs.com", "care@asgs.com"], desc: "We respond within 24 hours" },
    { icon: "📱", title: "Call Us", details: ["+91 88084 89791", "+91 93342 91402"], desc: "Mon to Sat, 9AM to 8PM" },
    { icon: "💬", title: "WhatsApp", details: ["+91 88084 89791"], desc: "Quick replies on WhatsApp" },
    { icon: "🏫", title: "College", details: ["Microtek College", "MGKVP University, Varanasi"], desc: "BCA Final Year Project" },
    { icon: "📍", title: "Visit Us", details: ["Varanasi, Uttar Pradesh", "India - 221011"], desc: "Come say hello! 👋" }
  ];

  const faqItems = [
    { q: "What is ASGS?", a: "ASGS (Animal Secure & Growth System) is a comprehensive platform for animal management, real-time tracking, healthcare, and secure buying/selling of animals." },
    { q: "How do I track my animal?", a: "Simply login to your account, go to the Tracking section, and enter your animal's unique 12-digit ID." },
    { q: "How to book a doctor?", a: "Login to your dashboard, click on 'Doctor Booking', choose a veterinarian based on specialization." },
    { q: "Is ASGS free to use?", a: "Yes! ASGS is completely free for all farmers, pet owners, and veterinarians." }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", fontFamily: "'Inter', sans-serif", padding: "40px 20px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.15)", padding: "8px 20px", borderRadius: "50px", marginBottom: "24px", fontSize: "13px", color: "#a78bfa" }}>
            <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", display: "inline-block" }}></span>
            <span>📞 Get in Touch</span>
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: "700", color: "#fff", marginBottom: "20px" }}>We'd Love to <span style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hear From You</span></h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto" }}>Have questions, suggestions, or feedback? Our team is here to help you 24/7.</p>
        </div>
      </div>
      
      {isSubmitted && (
        <div style={{ maxWidth: "600px", margin: "0 auto 30px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span>✅</span><div><h4 style={{ margin: 0 }}>Message Sent Successfully!</h4><p style={{ margin: 0, fontSize: "13px" }}>Thank you for contacting ASGS. We'll get back to you within 24 hours.</p></div>
        </div>
      )}
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto 50px" }}>
        {/* Contact Info */}
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "24px", padding: "30px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#fff", marginBottom: "24px" }}>Contact Information</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "30px" }}>
            {contactInfo.map((info, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "15px", padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: "16px" }}>
                <div style={{ fontSize: "28px" }}>{info.icon}</div>
                <div><h3 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#fff" }}>{info.title}</h3>{info.details.map((d, i) => <p key={i} style={{ margin: "2px 0", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{d}</p>)}<small style={{ fontSize: "11px", color: "#8b5cf6" }}>{info.desc}</small></div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "30px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <h3>Follow Our Journey</h3>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", fontSize: "18px", cursor: "pointer" }}>📘</span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", fontSize: "18px", cursor: "pointer" }}>🐦</span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", fontSize: "18px", cursor: "pointer" }}>📷</span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", fontSize: "18px", cursor: "pointer" }}>💼</span>
            </div>
          </div>
          <div style={{ background: "rgba(139,92,246,0.1)", padding: "15px", borderRadius: "16px", fontSize: "12px", color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
            <p>🎓 BCA Minor Project - MGKVP University (2024-2025)</p>
            <p>👨‍💻 Developed by Awdhesh Sahani & Gaurav Singh</p>
          </div>
        </div>
        
        {/* Contact Form */}
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "24px", padding: "30px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}><span style={{ fontSize: "24px" }}>✉️</span><div><h2 style={{ margin: 0, fontSize: "20px", color: "#fff" }}>Send us a Message</h2><p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>We typically respond within 24 hours</p></div></div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none" }} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={{ width: "100%", padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none" }} />
              <select name="subject" value={formData.subject} onChange={handleChange} required style={{ width: "100%", padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none" }}>
                <option value="">Select Subject</option>
                <option value="general">General Inquiry</option>
                <option value="project">Project Information</option>
                <option value="technical">Technical Support</option>
                <option value="feedback">Feedback & Suggestions</option>
              </select>
            </div>
            <textarea name="message" placeholder="Your Message..." rows="5" value={formData.message} onChange={handleChange} required style={{ width: "100%", padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none", resize: "vertical" }}></textarea>
            <button type="submit" style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>Send Message ✉️</button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: "1000px", margin: "0 auto 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}><span style={{ fontSize: "30px" }}>❓</span><h2 style={{ fontSize: "28px", color: "#fff", marginBottom: "5px" }}>Frequently Asked Questions</h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "20px" }}>
          {faqItems.map((faq, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "16px", color: "#8b5cf6", marginBottom: "10px" }}>Q: {faq.q}</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== SERVICES PAGE (ASGS THEME - FIXED) ====================
const Services = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => navigate("/public-login");
  
  const servicesList = [
    { id: 1, title: "Live Animal Tracking", description: "Real-time GPS tracking with location history and geofencing alerts.", icon: "📍", color: "linear-gradient(135deg, #8b5cf6, #6366f1)", features: ["GPS Location", "History Logs", "Geofencing"] },
    { id: 2, title: "Doctor Booking", description: "24/7 veterinary appointments with specialized doctors.", icon: "👨‍⚕️", color: "linear-gradient(135deg, #10b981, #059669)", features: ["24/7 Support", "Specialists", "Emergency"] },
    { id: 3, title: "Buy & Sell Marketplace", description: "Secure platform for buying and selling animals with verified sellers.", icon: "🛒", color: "linear-gradient(135deg, #f59e0b, #d97706)", features: ["Verified Sellers", "Secure Payment", "Pan India"] },
    { id: 4, title: "Health Monitoring", description: "Complete health records, vaccination tracking, and growth metrics.", icon: "📊", color: "linear-gradient(135deg, #ef4444, #dc2626)", features: ["Health Records", "Vaccination", "Growth Track"] },
    { id: 5, title: "Vaccination Alerts", description: "Automated reminders for vaccinations and health checkups.", icon: "💊", color: "linear-gradient(135deg, #8b5cf6, #6d28d9)", features: ["Auto Reminders", "Notifications", "History"] },
    { id: 6, title: "Growth Analytics", description: "Track weight, height, and overall growth metrics with charts.", icon: "📈", color: "linear-gradient(135deg, #ec4899, #be185d)", features: ["Weight Tracking", "Growth Charts", "Reports"] }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", fontFamily: "'Inter', sans-serif", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.15)", padding: "8px 20px", borderRadius: "50px", marginBottom: "24px", fontSize: "13px", color: "#a78bfa" }}>
            <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", display: "inline-block" }}></span>
            <span>Our Premium Services</span>
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: "700", color: "#fff", marginBottom: "20px" }}>Everything You <span style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Need</span></h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto" }}>Complete care solutions for your animals</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
        {servicesList.map(s => (
          <div key={s.id} onClick={redirectToLogin} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ padding: "30px", textAlign: "center", background: s.color }}><div style={{ fontSize: "50px", display: "block", marginBottom: "10px" }}>{s.icon}</div><h3 style={{ color: "white", fontSize: "22px", margin: 0 }}>{s.title}</h3></div>
            <div style={{ padding: "25px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "15px" }}>{s.description}</p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginTop: "15px" }}>{s.features.map((f,i)=> <span key={i} style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>{f}</span>)}</div>
              <span style={{ display: "inline-block", marginTop: "20px", fontSize: "13px", color: "#8b5cf6", fontWeight: "500" }}>Access Now →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== NEWS PAGE (ASGS THEME - FIXED) ====================
const News = () => {
  const newsList = [
    { id: 1, title: "🎉 New Vaccination Drive Started", description: "Free vaccination camp for animals across Varanasi. Register now to book your slot!", date: "March 15, 2024", icon: "💉", category: "Health" },
    { id: 2, title: "🏆 Awarded Best Animal Platform 2024", description: "ASGS recognized as 'Best Animal Management Platform' by MGKVP University.", date: "March 10, 2024", icon: "🏆", category: "Award" },
    { id: 3, title: "📱 Mobile App Launching Soon", description: "ASGS mobile app coming next month. Stay tuned for exclusive launch offers!", date: "February 28, 2024", icon: "📱", category: "Announcement" },
    { id: 4, title: "👨‍⚕️ New Veterinary Partners", description: "New doctors joined ASGS network. More specialists, better care!", date: "February 20, 2024", icon: "👨‍⚕️", category: "Partnership" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", fontFamily: "'Inter', sans-serif", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.15)", padding: "8px 20px", borderRadius: "50px", marginBottom: "24px", fontSize: "13px", color: "#a78bfa" }}>
            <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", display: "inline-block" }}></span>
            <span>Latest Updates</span>
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: "700", color: "#fff", marginBottom: "20px" }}>News & <span style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Announcements</span></h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto" }}>Stay updated with the latest from ASGS</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {newsList.map(n => (
          <div key={n.id} style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "16px", display: "flex", gap: "20px", alignItems: "flex-start", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", width: "70px", height: "70px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: "35px" }}>{n.icon}</span></div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}><h3 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>{n.title}</h3><span style={{ background: "rgba(139,92,246,0.2)", padding: "2px 10px", borderRadius: "20px", fontSize: "10px", color: "#a78bfa" }}>{n.category}</span></div>
              <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 5px 0", fontSize: "14px" }}>{n.description}</p>
              <small style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>📅 {n.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== APP FUNCTION ====================
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
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/public-dashboard" element={<ProtectedRoute><PublicDashboard /></ProtectedRoute>} />
        <Route path="/animal-doctor-booking" element={<AnimalDoctorBooking />} />

        {/* 404 fallback */}
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px", color: "white" }}>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;