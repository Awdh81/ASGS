import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav">

        {/* Logo */}
        <div className="logo">
          ASGS 🐾
        </div>

        {/* Menu */}
        <div className={`menu ${menuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/news">News</Link>

          <button className="login-btn" onClick={() => setOpen(true)}>
            Login
          </button>
        </div>

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </nav>

      {/* Gradient line */}
      <div className="gradient"></div>

      {/* Modal */}
      <LoginModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Navbar;