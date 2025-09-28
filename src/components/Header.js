import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaUser, FaBars } from "react-icons/fa";
import { WiRaindrops } from "react-icons/wi"; // Water drop icon

const HEADER_HEIGHT = 56;

const headerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: HEADER_HEIGHT,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  background: "#0d6efd",
  color: "#fff",
  zIndex: 300,
};

const leftGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const toggleBtnStyle = {
  background: "#ffffff33", // Semi-transparent white
  border: "1.5px solid rgba(255, 255, 255, 0.7)", // White border with opacity
  borderRadius: 8,
  color: "#fff",
  fontSize: 22,
  cursor: "pointer",
  padding: 8,
  marginRight: 8,
  transition: "background-color 0.25s ease, box-shadow 0.25s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 6px rgba(0, 0, 0, 0.12)",
  outline: "none",
};

const toggleBtnHoverStyle = {
  background: "#ffffff80", // More opaque on hover
  boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
};

const logoWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const companyNameStyle = {
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: 1,
};

const waterDropStyle = {
  fontSize: 36,
  color: "#fff",
};

const Header = ({ onToggleSidebar }) => {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <header style={headerStyle}>
        <div style={leftGroupStyle}>
          {/* Sidebar toggle button */}
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            style={hover ? { ...toggleBtnStyle, ...toggleBtnHoverStyle } : toggleBtnStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <FaBars />
          </button>

          {/* Water drop icon and company name */}
          <div style={logoWrapStyle}>
            <WiRaindrops style={waterDropStyle} />
            <span style={companyNameStyle}>WUCSKKM</span>
          </div>
        </div>

        {/* Login button */}
        <Button size="sm" variant="light" onClick={() => setShow(true)}>
          <FaUser style={{ marginRight: 7 }} />
          Login
        </Button>
      </header>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { HEADER_HEIGHT };
export default Header;
