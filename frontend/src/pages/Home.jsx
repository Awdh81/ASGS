import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Direct redirect to login page - NO ALERT
  const redirectToLogin = () => {
    navigate("/public-login");
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🐾</span>
            <span style={styles.logoText}>ASGS</span>
          </div>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            <span>India's Most Trusted Animal Platform</span>
          </div>
          <h1 style={styles.heroTitle}>
            Animal Secure & <br />
            <span style={styles.gradientText}>Growth System</span>
          </h1>
          <p style={styles.heroDesc}>
            One-stop solution for animal management, health tracking, 
            doctor appointments, and secure buying/selling platform.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn} onClick={() => navigate("/public-register")}>
              🚀 Get Started Free
            </button>
            <button style={styles.secondaryBtn} onClick={redirectToLogin}>
              📍 Live Demo
            </button>
          </div>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>500+</span>
              <span style={styles.statLabel}>Animals Tracked</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>50+</span>
              <span style={styles.statLabel}>Expert Doctors</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>1000+</span>
              <span style={styles.statLabel}>Happy Farmers</span>
            </div>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.floatingCard}>
            <div style={styles.floatingIcon}>🐮</div>
            <div>
              <h4>Real-time Tracking</h4>
              <p>GPS location updates</p>
            </div>
          </div>
          <div style={{ ...styles.floatingCard, top: "40%", right: "20%" }}>
            <div style={styles.floatingIcon}>🩺</div>
            <div>
              <h4>Health Monitoring</h4>
              <p>24/7 vet support</p>
            </div>
          </div>
          <div style={{ ...styles.floatingCard, top: "70%", left: "10%" }}>
            <div style={styles.floatingIcon}>💰</div>
            <div>
              <h4>Buy & Sell</h4>
              <p>Secure marketplace</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Direct redirect to login */}
      <section style={styles.features}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Our Services</span>
          <h2 style={styles.sectionTitle}>Everything You Need</h2>
          <p style={styles.sectionDesc}>Powerful tools to manage your animals efficiently</p>
        </div>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard} onClick={redirectToLogin}>
            <span style={styles.featureIcon}>📍</span>
            <h3>Live Tracking</h3>
            <p>Track your animals in real-time with GPS location</p>
            <span style={styles.featureLink}>Access →</span>
          </div>
          <div style={styles.featureCard} onClick={redirectToLogin}>
            <span style={styles.featureIcon}>👨‍⚕️</span>
            <h3>Doctor Booking</h3>
            <p>Book veterinary appointments instantly</p>
            <span style={styles.featureLink}>Access →</span>
          </div>
          <div style={styles.featureCard} onClick={redirectToLogin}>
            <span style={styles.featureIcon}>🛒</span>
            <h3>Buy & Sell</h3>
            <p>Secure marketplace for animal trading</p>
            <span style={styles.featureLink}>Access →</span>
          </div>
          <div style={styles.featureCard} onClick={redirectToLogin}>
            <span style={styles.featureIcon}>📊</span>
            <h3>Health Reports</h3>
            <p>Complete health history and growth tracking</p>
            <span style={styles.featureLink}>Access →</span>
          </div>
          <div style={styles.featureCard} onClick={redirectToLogin}>
            <span style={styles.featureIcon}>💊</span>
            <h3>Vaccination Alerts</h3>
            <p>Automated reminders for vaccinations</p>
            <span style={styles.featureLink}>Access →</span>
          </div>
          <div style={styles.featureCard} onClick={redirectToLogin}>
            <span style={styles.featureIcon}>📈</span>
            <h3>Growth Analytics</h3>
            <p>Track weight, health, and growth metrics</p>
            <span style={styles.featureLink}>Access →</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.howItWorks}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Simple Process</span>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionDesc}>Get started in just 3 easy steps</p>
        </div>
        <div style={styles.stepsGrid}>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>1</div>
            <span style={styles.stepIcon}>📝</span>
            <h3>Register Account</h3>
            <p>Create your free account in seconds</p>
            <button style={styles.stepBtn} onClick={() => navigate("/public-register")}>Sign Up →</button>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>2</div>
            <span style={styles.stepIcon}>🔐</span>
            <h3>Login to Dashboard</h3>
            <p>Access all features after login</p>
            <button style={styles.stepBtn} onClick={() => navigate("/public-login")}>Login →</button>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>3</div>
            <span style={styles.stepIcon}>🎯</span>
            <h3>Start Managing</h3>
            <p>Track, book doctors, buy & sell</p>
            <button style={styles.stepBtn} onClick={redirectToLogin}>Explore →</button>
          </div>
        </div>
      </section>

      {/* Login CTA Banner */}
      <section style={styles.loginBanner}>
        <div style={styles.bannerContent}>
          <span style={styles.bannerIcon}>🔐</span>
          <h2>Ready to Get Started?</h2>
          <p>Login to access complete animal management system</p>
          <div style={styles.bannerButtons}>
            <button style={styles.bannerPrimary} onClick={() => navigate("/public-login")}>
              Login Now →
            </button>
            <button style={styles.bannerSecondary} onClick={() => navigate("/public-register")}>
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Compact Premium Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerMain}>
          <div style={styles.footerGrid}>
            <div style={styles.footerBrand}>
              <div style={styles.footerLogo}>
                <span style={styles.footerLogoIcon}>🐾</span>
                <span style={styles.footerLogoText}>ASGS</span>
              </div>
              <p style={styles.footerTagline}>Animal Secure & Growth System</p>
              <p style={styles.footerDesc}>Smart technology for animal management since 2026.</p>
            </div>

            <div style={styles.footerLinks}>
              <h4>Quick Links</h4>
              <button onClick={() => navigate("/")}>Home</button>
              <button onClick={() => navigate("/about")}>About</button>
              <button onClick={redirectToLogin}>Tracking</button>
              <button onClick={redirectToLogin}>Marketplace</button>
            </div>

            <div style={styles.footerLinks}>
              <h4>Services</h4>
              <button onClick={redirectToLogin}>Doctor Booking</button>
              <button onClick={redirectToLogin}>Health Reports</button>
              <button onClick={redirectToLogin}>Buy & Sell</button>
            </div>

            <div style={styles.footerContact}>
              <h4>Contact</h4>
              <div>📧 awadheshsahani71as@gmail.com</div>
              <div>📞 +91 8808807888</div>
              <div>🕐 24/7 Support</div>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p>© 2024 ASGS. All rights reserved.</p>
        </div>
      </footer>

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          button {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          button:hover {
            transform: translateY(-2px);
            filter: brightness(1.05);
          }
          .feature-card {
            transition: all 0.3s ease;
          }
          .feature-card:hover {
            transform: translateY(-8px);
            background: rgba(139,92,246,0.1);
            border-color: rgba(139,92,246,0.3);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    fontFamily: "'Inter', -apple-system, 'Segoe UI', sans-serif",
    overflowX: "hidden"
  },

  hero: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "90vh",
    padding: "60px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "50px",
    flexWrap: "wrap"
  },

  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
    pointerEvents: "none"
  },

  heroContent: {
    flex: 1,
    minWidth: "280px",
    animation: "fadeInUp 0.6s ease-out",
    zIndex: 2
  },

  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
    padding: "8px 20px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "50px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.05)"
  },

  logoIcon: {
    fontSize: "28px"
  },

  logoText: {
    fontSize: "22px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(16,185,129,0.1)",
    padding: "6px 16px",
    borderRadius: "50px",
    marginBottom: "24px",
    fontSize: "13px",
    color: "#10b981",
    border: "1px solid rgba(16,185,129,0.2)"
  },

  badgeDot: {
    width: "8px",
    height: "8px",
    background: "#10b981",
    borderRadius: "50%",
    animation: "pulse 2s infinite"
  },

  heroTitle: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "1.2",
    marginBottom: "24px"
  },

  gradientText: {
    background: "linear-gradient(135deg, #8b5cf6, #6366f1, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  heroDesc: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.6)",
    lineHeight: "1.6",
    marginBottom: "32px",
    maxWidth: "500px"
  },

  heroButtons: {
    display: "flex",
    gap: "16px",
    marginBottom: "48px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(139,92,246,0.3)"
  },

  secondaryBtn: {
    padding: "14px 32px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer"
  },

  stats: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap"
  },

  statItem: {
    display: "flex",
    flexDirection: "column"
  },

  statValue: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#8b5cf6"
  },

  statLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)"
  },

  heroRight: {
    flex: 1,
    position: "relative",
    minWidth: "300px",
    height: "350px"
  },

  floatingCard: {
    position: "absolute",
    top: "15%",
    right: "10%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: "15px 20px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
    animation: "float 3s ease-in-out infinite"
  },

  floatingIcon: {
    fontSize: "32px"
  },

  features: {
    padding: "80px 40px",
    background: "rgba(0,0,0,0.4)"
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px"
  },

  sectionBadge: {
    display: "inline-block",
    padding: "6px 14px",
    background: "rgba(139,92,246,0.15)",
    borderRadius: "50px",
    fontSize: "12px",
    color: "#a78bfa",
    marginBottom: "16px"
  },

  sectionTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "16px"
  },

  sectionDesc: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.5)",
    maxWidth: "600px",
    margin: "0 auto"
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "0 auto"
  },

  featureCard: {
    background: "rgba(255,255,255,0.03)",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.05)",
    cursor: "pointer",
    textAlign: "center"
  },

  featureIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "20px"
  },

  featureLink: {
    display: "inline-block",
    marginTop: "20px",
    fontSize: "14px",
    color: "#8b5cf6",
    fontWeight: "500"
  },

  howItWorks: {
    padding: "80px 40px",
    background: "rgba(0,0,0,0.2)"
  },

  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1000px",
    margin: "0 auto"
  },

  stepCard: {
    textAlign: "center",
    padding: "35px 25px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "20px",
    position: "relative"
  },

  stepNumber: {
    position: "absolute",
    top: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold"
  },

  stepIcon: {
    fontSize: "52px",
    display: "block",
    marginBottom: "20px"
  },

  stepBtn: {
    marginTop: "20px",
    padding: "8px 20px",
    background: "transparent",
    border: "1px solid rgba(139,92,246,0.5)",
    borderRadius: "8px",
    color: "#a78bfa",
    fontSize: "13px",
    cursor: "pointer"
  },

  loginBanner: {
    margin: "40px",
    background: "linear-gradient(135deg, #1e1b4b, #0f172a)",
    borderRadius: "24px",
    border: "1px solid rgba(139,92,246,0.2)"
  },

  bannerContent: {
    textAlign: "center",
    padding: "50px",
    maxWidth: "600px",
    margin: "0 auto"
  },

  bannerIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "16px"
  },

  bannerPrimary: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "12px"
  },

  bannerSecondary: {
    padding: "12px 28px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer"
  },

  bannerButtons: {
    marginTop: "24px",
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  // Compact Footer Styles
  footer: {
    background: "#050814",
    marginTop: "40px"
  },

  footerMain: {
    padding: "40px 40px 30px"
  },

  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "30px",
    maxWidth: "1000px",
    margin: "0 auto"
  },

  footerBrand: {
    maxWidth: "220px"
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "12px"
  },

  footerLogoIcon: {
    fontSize: "24px"
  },

  footerLogoText: {
    fontSize: "18px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  footerTagline: {
    fontSize: "11px",
    fontWeight: "500",
    color: "#8b5cf6",
    marginBottom: "10px"
  },

  footerDesc: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.4)",
    lineHeight: "1.4",
    marginBottom: "0"
  },

  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  footerContact: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  footerBottom: {
    padding: "15px 40px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
    fontSize: "10px",
    color: "rgba(255,255,255,0.3)"
  }
};

export default Home;