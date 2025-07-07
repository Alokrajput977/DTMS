// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import "../css/navbar.css"; // Add this for custom styles

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? "scrolled" : ""} custom-navbar px-3 py-2 shadow-sm`}>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-dark btn-sm">
          <i className="bi bi-door-open-fill me-1"></i> Gate
        </button>
      </div>

      <button
        className="navbar-toggler ms-auto bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="text-muted small fw-semibold text-end">
            <div>{formattedTime}</div>
          </div>

          <i className="bi bi-box-arrow-right fs-5 text-dark" title="Logout" role="button"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
