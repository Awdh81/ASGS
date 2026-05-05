import "./About.css"; // ✅ correct import

function About() {
  return (
    <div className="about-container">

      {/* HEADER */}
      <div className="about-header">
        <h1>About Animal Data Hub 🐾</h1>
        <p>Smart system for animal tracking & management</p>
      </div>

      <div className="about-main">

        {/* PROFILE CARD */}
        <div className="profile-card">

          <img
            src="https://i.ibb.co/VpkWbrLd/awdhesh-sahani.jpg"
            alt="profile"
            className="profile-img"
          />

          <h2>Awdhesh Sahani</h2>
          <p className="role">Web Developer</p>

          <div className="info">
            <p>🎓 BCA Final Year</p>
            <p>🏫 Microtek College</p>
            <p>📧 awdheshsahani71as@gmail.com</p>
          </div>

        </div>

        {/* PROJECT DETAILS */}
        <div className="project-section">

          <div className="card">
            <h3>📌 Project</h3>
            <p>Animal Data Hub - 3 Month Project</p>
          </div>

          <div className="card">
            <h3>💻 Technologies</h3>
            <div className="tags">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
              <span>JavaScript</span>
            </div>
          </div>

          <div className="card">
            <h3>⭐ Features</h3>
            <ul>
              <li>Animal Tracking</li>
              <li>Buy & Sell</li>
              <li>Health Monitoring</li>
              <li>Secure Login System</li>
            </ul>
          </div>

          <div className="card">
            <h3>🎯 Objective</h3>
            <p>
              Create a platform to manage animal data and improve tracking,
              security, and awareness.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;