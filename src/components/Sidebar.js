import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/sidebar.css";
import logo from "../../src/components/img.png";

const Sidebar = ({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }) => {
  // Use internal state if props aren't provided
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const isControlled = propIsOpen !== undefined;
  const isOpen = isControlled ? propIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? propSetIsOpen : setInternalIsOpen;

  const menuItems = [
    { to: "/Dashboard", label: "Dashboard", icon: "bi-grid" },
    { to: "/LiveStatus", label: "Live Status", icon: "bi-broadcast-pin" },
    { to: "/Jobs", label: "Jobs", icon: "bi-briefcase" },
    { to: "/Evidence", label: "Evidence", icon: "bi-camera-video" },
    { to: "/Reports", label: "Reports", icon: "bi-file-earmark-bar-graph" },
    { to: "/Exception", label: "Exception", icon: "bi-exclamation-diamond" },
    { to: "/EIRReport", label: "EIR Report", icon: "bi-journal-check" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setIsOpen(!mobile); // open on desktop, closed on mobile
    };
    handleResize(); // call initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  // when first load, make sure sidebar is closed on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen]);

  // 🧩 close sidebar when clicking menu item (only on mobile)
  const handleMenuClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={`custom-sidebar ${isOpen ? "open" : "closed"} ${isMobile ? "mobile" : ""}`}>
        <div className="sidebar-header text-center mb-4">
          {isOpen && <img src={logo} alt="Logo" className="sidebar-logo mb-2" />}
        </div>
        <ul className="nav flex-column px-2">
          {menuItems.map(({ to, label, icon }) => (
            <SidebarItem 
              key={to}
              to={to}
              label={label}
              icon={icon}
              isOpen={isOpen || !isMobile}
              onClick={handleMenuClick}
            />
          ))}
        </ul>
      </div>

      <div className={`sidebar-toggle-center ${isMobile ? "mobile" : ""}`} onClick={toggleSidebar}>
        <i className={`bi ${isOpen ? "bi-x" : "bi-list"}`}></i>
      </div>

      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

const SidebarItem = ({ to, label, icon, isOpen, onClick }) => (
  <li className="nav-item mb-3">
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center sidebar-link px-3 py-2 rounded ${
          isActive ? "active" : "text-white"
        }`
      }
    >
      <i className={`bi ${icon} fs-5 me-3`}></i>
      {isOpen && <span className="sidebar-heading">{label}</span>}
    </NavLink>
  </li>
);

export default Sidebar;
