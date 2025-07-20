import React from "react";

const navLinks = [
  { icon: "bi bi-play-circle-fill", label: "Videos", key: "videos" },
  { icon: "bi bi-file-earmark-pdf-fill", label: "Documents", key: "documents" },
  { icon: "bi bi-map", label: "Maps", key: "maps" },
  { icon: "bi bi-images", label: "Gallery", key: "gallery" },
  { icon: "bi bi-file-earmark-bar-graph", label: "Reports", key: "reports" },
  { icon: "bi bi-graph-up-arrow", label: "Dashboard", key: "dashboard" },
  { icon: "bi bi-people-fill", label: "Farmers", key: "farmers" },
  { icon: "bi bi-table", label: "Farmers Crop", key: "farmerscrop" },
];

const Sidebar = ({ collapsed, activePage, onNavigate }) => (
  <div
    className={`sidebar text-white p-3 ${collapsed ? "collapsed" : ""}`}
  >
    <ul className="nav flex-column gap-2">
      {navLinks.map((item) => (
        <li key={item.key}>
          <a
            href="#"
            className={`nav-link text-white ${
              activePage === item.key ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.key);
            }}
          >
            <i className={`${item.icon} me-2`}></i>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
