import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/sidebar.css";
import logo from "../../src/components/img.png";

const Sidebar = ({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }) => {
  // Use internal state if props aren't provided
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const [internalSetIsOpen] = useState(() => propSetIsOpen || setInternalIsOpen);
  
  // Determine which state to use
  const isControlled = propIsOpen !== undefined;
  const isOpen = isControlled ? propIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? propSetIsOpen : internalSetIsOpen;

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

  return (
    <>
      <div className={`custom-sidebar ${isOpen ? "open" : "closed"}`}>
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
              isOpen={isOpen} 
            />
          ))}
        </ul>
      </div>
      <div className="sidebar-toggle-center" onClick={toggleSidebar}>
        <i className={`bi ${isOpen ? "bi-x" : "bi-list"}`}></i>
      </div>
    </>
  );
};

const SidebarItem = ({ to, label, icon, isOpen }) => (
  <li className="nav-item mb-3">
    <NavLink
      to={to}
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