import React from "react";

function Home() {
  return (
    <div className="home">

      {/* 🔥 HERO SECTION */}
      <section className="hero">
        <h1>Animal Secure & Growth System 🐄</h1>
        <p>Manage, Track & Protect Animals with Smart Technology</p>

        <button className="hero-btn">Get Started</button>
      </section>


      {/* 💡 FEATURES */}
      <section className="features">
        <div className="card">
          <h3>🐾 Animal Tracking</h3>
          <p>Track real-time location of animals easily.</p>
        </div>

        <div className="card">
          <h3>🛒 Buy & Sell</h3>
          <p>Secure platform for buying and selling animals.</p>
        </div>

        <div className="card">
          <h3>📊 Health Monitoring</h3>
          <p>Monitor animal health and growth reports.</p>
        </div>
      </section>


      {/* 📘 ABOUT */}
      <section className="about">
        <h2>About System</h2>
        <p>
          This system helps farmers and doctors manage animals efficiently,
          ensuring security, growth, and proper monitoring.
        </p>
      </section>

    </div>
  );
}

export default Home;