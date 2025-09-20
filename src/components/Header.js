import React from "react";

const Header = ({ onToggleSidebar, onLoginClick }) => (
  <header
    className="navbar navbar-expand-lg navbar-light px-2 vh-5"
    style={{
      background: "linear-gradient(90deg, #cce5ff, #b8daff)",
      minHeight: "5vh",
    }}
  >
    <button
      className="btn btn-outline-primary btn-sm me-2 py-1 px-2"
      onClick={onToggleSidebar}
      style={{ fontSize: "1rem" }}
    >
      ☰
    </button>
    <span
      className="mx-auto navbar-brand text-primary fw-bold"
      style={{ fontSize: "1.1rem" }}
    >
      WUCSKKM
    </span>
    <button
      className="btn btn-primary btn-sm py-1 px-3"
      onClick={onLoginClick}
      style={{ fontSize: "0.9rem" }}
    >
      Login
    </button>
  </header>
);

export default Header;
