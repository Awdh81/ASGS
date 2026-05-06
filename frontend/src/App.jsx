import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// Complete About Us Page
const About = () => {
  const team = [
    { name: "Dr. Sarah Johnson", role: "Chief Veterinarian", experience: "15+ years", icon: "👩‍⚕️" },
    { name: "Dr. Michael Chen", role: "Senior Pet Specialist", experience: "12+ years", icon: "👨‍⚕️" },
    { name: "Emma Davis", role: "Pet Care Manager", experience: "10+ years", icon: "🐕" },
    { name: "Dr. Lisa Patel", role: "Emergency Vet", experience: "8+ years", icon: "🚑" }
  ];

  const values = [
    { title: "Compassion", description: "We treat every pet with love and care", icon: "❤️" },
    { title: "Excellence", description: "Best-in-class medical facilities", icon: "⭐" },
    { title: "Trust", description: "Building lasting relationships", icon: "🤝" },
    { title: "Innovation", description: "Latest technology and treatments", icon: "💡" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .about-section {
            animation: fadeInUp 0.6s ease-out;
          }
          .team-card {
            transition: all 0.3s ease;
          }
          .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="about-section" style={{
        textAlign: "center",
        marginBottom: "50px"
      }}>
        <div style={{
          display: "inline-block",
          background: "white",
          padding: "30px 50px",
          borderRadius: "80px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "50px", animation: "float 3s ease-in-out infinite" }}>🐕</span>
            <h1 style={{
              fontSize: "42px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0
            }}>
              About VetCare
            </h1>
            <span style={{ fontSize: "50px", animation: "float 3s ease-in-out infinite 1s" }}>🐱</span>
          </div>
          <p style={{ color: "#666", marginTop: "10px" }}>Your Trusted Partner in Pet Healthcare Since 2010</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="about-section" style={{
        background: "white",
        borderRadius: "30px",
        padding: "40px",
        marginBottom: "40px",
        maxWidth: "1200px",
        margin: "0 auto 40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Our Story 📖
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
          Founded in 2010, VetCare started with a simple mission: to provide compassionate, 
          high-quality veterinary care to all pets. What began as a small clinic has now grown 
          into a comprehensive pet healthcare platform serving thousands of happy pets and their families.
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#555" }}>
          Today, we're proud to offer a wide range of services including online booking, 
          telemedicine, medicine delivery, and a marketplace for pet supplies. Our team of 
          experienced veterinarians and pet care specialists work tirelessly to ensure every 
          pet receives the best possible care.
        </p>
      </div>

      {/* Mission & Vision */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto 40px"
      }}>
        <div className="about-section" style={{
          background: "white",
          borderRadius: "30px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎯</div>
          <h3 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}>Our Mission</h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            To provide accessible, affordable, and high-quality healthcare services to every pet, 
            ensuring they live long, healthy, and happy lives with their families.
          </p>
        </div>
        <div className="about-section" style={{
          background: "white",
          borderRadius: "30px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>👁️</div>
          <h3 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}>Our Vision</h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            To become India's most trusted and innovative pet healthcare platform, setting new 
            standards in veterinary care and pet wellness.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 40px"
      }}>
        <h2 style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Our Core Values 💎
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {values.map((value, idx) => (
            <div key={idx} className="about-section" style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s"
            }}>
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>{value.icon}</div>
              <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>{value.title}</h3>
              <p style={{ color: "#666" }}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto 40px"
      }}>
        <div className="about-section" style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "40px" }}>🐾</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: "#667eea" }}>5000+</div>
          <div style={{ color: "#666" }}>Pets Treated</div>
        </div>
        <div className="about-section" style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "40px" }}>👨‍⚕️</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: "#10b981" }}>100+</div>
          <div style={{ color: "#666" }}>Expert Vets</div>
        </div>
        <div className="about-section" style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "40px" }}>⭐</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: "#f59e0b" }}>4.9</div>
          <div style={{ color: "#666" }}>Customer Rating</div>
        </div>
        <div className="about-section" style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "40px" }}>🏆</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: "#ef4444" }}>15+</div>
          <div style={{ color: "#666" }}>Awards Won</div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 40px"
      }}>
        <h2 style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Meet Our Leadership Team 👥
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px"
        }}>
          {team.map((member, idx) => (
            <div key={idx} className="team-card" style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "50px"
              }}>
                {member.icon}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>{member.name}</h3>
              <p style={{ color: "#667eea", fontWeight: "bold", marginBottom: "5px" }}>{member.role}</p>
              <p style={{ color: "#999", fontSize: "12px" }}>{member.experience} experience</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: "white",
        borderRadius: "30px",
        padding: "50px",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "15px"
        }}>
          Ready to Give Your Pet the Best Care?
        </h2>
        <p style={{ color: "#666", marginBottom: "25px" }}>
          Join thousands of happy pet parents who trust VetCare with their furry family members
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
            Book Appointment 📅
          </button>
          <button style={{
            background: "white",
            color: "#667eea",
            border: "2px solid #667eea",
            padding: "12px 30px",
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#667eea";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "white";
            e.target.style.color = "#667eea";
          }}>
            Contact Us 📞
          </button>
        </div>
      </div>
    </div>
  );
};

// Services Component
const Services = () => {
  const servicesList = [
    { id: 1, title: "🐾 Animal Tracking", description: "Real-time GPS tracking for your pets", icon: "📍", color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { id: 2, title: "🩺 Health Monitoring", description: "Regular checkups and vaccination reminders", icon: "🏥", color: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
    { id: 3, title: "🛒 Marketplace", description: "Buy and sell pets and accessories", icon: "🏪", color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
    { id: 4, title: "📅 Online Booking", description: "Easy appointment scheduling", icon: "📆", color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
    { id: 5, title: "💊 Medicine Delivery", description: "Pet medicines at your doorstep", icon: "💊", color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)" },
    { id: 6, title: "📚 Pet Care Tips", description: "Expert advice and guides", icon: "📖", color: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{
          display: "inline-block",
          background: "white",
          padding: "30px 50px",
          borderRadius: "80px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0
          }}>⭐ Our Premium Services ⭐</h1>
          <p style={{ color: "#666", marginTop: "10px" }}>Complete care solutions for your beloved pets</p>
        </div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {servicesList.map(service => (
          <div key={service.id} style={{
            background: "white",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            transition: "all 0.3s"
          }}>
            <div style={{ background: service.color, padding: "30px", textAlign: "center" }}>
              <div style={{ fontSize: "50px" }}>{service.icon}</div>
              <h3 style={{ color: "white", fontSize: "22px", margin: "10px 0 0 0" }}>{service.title}</h3>
            </div>
            <div style={{ padding: "25px" }}>
              <p style={{ color: "#555" }}>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// News Component
const News = () => {
  const newsList = [
    { id: 1, title: "New Vaccination Drive Started", description: "Free vaccination camp for dogs and cats", date: "March 15, 2024", icon: "💉" },
    { id: 2, title: "Awarded Best Pet Care Platform 2024", description: "We're proud to announce this achievement", date: "March 10, 2024", icon: "🏆" },
    { id: 3, title: "Mobile App Launching Soon", description: "Stay tuned for our new mobile app", date: "February 28, 2024", icon: "📱" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{
          display: "inline-block",
          background: "white",
          padding: "30px 50px",
          borderRadius: "80px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0
          }}>📰 Latest News & Updates 📰</h1>
        </div>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        {newsList.map(news => (
          <div key={news.id} style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            display: "flex",
            gap: "20px",
            alignItems: "center"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px"
            }}>{news.icon}</div>
            <div>
              <h3 style={{ fontSize: "20px", margin: "0 0 5px 0" }}>{news.title}</h3>
              <p style={{ color: "#666", margin: "0 0 5px 0" }}>{news.description}</p>
              <span style={{ fontSize: "12px", color: "#999" }}>📅 {news.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Component
const Contact = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{
          display: "inline-block",
          background: "white",
          padding: "30px 50px",
          borderRadius: "80px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0
          }}>📞 Contact Us 📞</h1>
          <p style={{ color: "#666", marginTop: "10px" }}>We'd love to hear from you!</p>
        </div>
      </div>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Send us a Message</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "2px solid #e0e0e0",
            borderRadius: "10px"
          }} />
          <input type="email" placeholder="Your Email" style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "2px solid #e0e0e0",
            borderRadius: "10px"
          }} />
          <textarea placeholder="Your Message" rows="4" style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "2px solid #e0e0e0",
            borderRadius: "10px"
          }}></textarea>
          <button style={{
            width: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>Send Message ✉️</button>
        </form>
      </div>
    </div>
  );
};

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
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;