// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import "../css/navbar.css";

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  const formattedDate = time.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? "scrolled" : ""}`}>
      <div className="container-fluid">
        {/* Brand/Logo */}
        <div className="d-flex align-items-center">
          <a href="/" className="navbar-brand">
            <i className="bi bi-building me-2"></i>
            <span className="brand-text">GateSecure</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <div className="navbar-content-wrapper">
            {/* Time and Date */}
            <div className="time-date-wrapper">
              <div className="time-display">
                <i className="bi bi-clock me-2"></i>
                {formattedTime}
              </div>
              <div className="date-display">
                {formattedDate}
              </div>
            </div>

            {/* Profile and Actions */}
            <div className="profile-actions">
              <div className="notification-icon">
                <i className="bi bi-bell"></i>
                <span className="notification-badge">3</span>
              </div>

              <div className="profile-dropdown">
                <div className="profile-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="profile-info">
                  <span className="profile-name">Admin User</span>
                  <span className="profile-role">Administrator</span>
                </div>
                <i className="bi bi-chevron-down dropdown-arrow"></i>

                {/* Dropdown Menu */}
                {/* Dropdown Menu */}
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => console.log('Profile clicked')}>
                    <i className="bi bi-person"></i> Profile
                  </button>
                  <button className="dropdown-item" onClick={() => console.log('Settings clicked')}>
                    <i className="bi bi-gear"></i> Settings
                  </button>
                  <button className="dropdown-item" onClick={() => console.log('Logout clicked')}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;