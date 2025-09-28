import React from "react";
import {
  FaTachometerAlt,
  FaLandmark,
  FaImages,
  FaMapMarked,
  FaUserFriends,
  FaSeedling,
  FaList,
} from "react-icons/fa";
import { HEADER_HEIGHT } from "./Header";

const MENUS = [
  { icon: <FaTachometerAlt />, text: "Dashboard" },
  { icon: <FaLandmark />, text: "Society-Info" },
  { icon: <FaImages />, text: "Gallery" },
  { icon: <FaMapMarked />, text: "Map" },
  { icon: <FaUserFriends />, text: "Farmers-Info" },
  { icon: <FaSeedling />, text: "Crop-info" },
  { icon: <FaList />, text: "Farmers-details" },
];

const sidebarBase = {
  background: "#f8f9fa",
  overflowX: "hidden",
  boxShadow: "1px 0 2px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
};

const navListStyle = { listStyle: "none", margin: 0, padding: 0 };
const navIconStyle = { fontSize: 20, minWidth: 22 };
const sidebarCollapsedWidth = 56;
const sidebarExpandedWidth = 210;

const navItemStyle = (active, collapsed) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 14px",
  color: active ? "#0d6efd" : "#283046",
  fontWeight: 500,
  fontSize: 16,
  textDecoration: "none",
  borderRadius: 6,
  margin: "3px 7px",
  background: active ? "#e9ecef" : "none",
  cursor: "pointer",
  transition: "background 0.2s",
  justifyContent: collapsed ? "center" : "flex-start",
});

const overlayStyles = (open) => ({
  display: open ? "block" : "none",
  position: "fixed",
  top: HEADER_HEIGHT,
  left: 0,
  width: "100vw",
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  zIndex: 120,
  background: "rgba(40,40,40,0.17)",
});

const Sidebar = ({
  collapsed,
  mobileOpen,
  isMobile,
  activeIdx,
  setActiveIdx,
  setMobileOpen,
}) => {
  const width =
    isMobile && mobileOpen
      ? sidebarExpandedWidth
      : collapsed
      ? sidebarCollapsedWidth
      : sidebarExpandedWidth;

  // Sidebar style: fixed position, with overlay styles on mobile open
  const sidebarStyleDynamic = {
    ...sidebarBase,
    width,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    top: HEADER_HEIGHT,
    position: "fixed",
    left: 0,
    boxShadow: "1px 0 2px rgba(0,0,0,0.06)",
    zIndex: 110,
    ...(isMobile && mobileOpen && {
      zIndex: 130,
      boxShadow: "4px 0 12px rgba(0,0,0,0.3)",
      background: "#f8f9fa",
    }),
  };

  return (
    <>
      <aside style={sidebarStyleDynamic}>
        <div style={{ minHeight: 49 }} />
        <ul style={navListStyle}>
          {MENUS.map((menu, idx) => (
            <li
              key={menu.text}
              style={navItemStyle(idx === activeIdx, collapsed)}
              onClick={() => {
                setActiveIdx(idx);
                if (isMobile && mobileOpen) setMobileOpen(false); // close overlay on selection
              }}
              title={collapsed ? menu.text : ""}
            >
              <span style={navIconStyle}>{menu.icon}</span>
              {!collapsed && <span style={{ marginLeft: 18 }}>{menu.text}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {isMobile && mobileOpen && (
        <div
          style={overlayStyles(true)}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
export { sidebarCollapsedWidth, sidebarExpandedWidth };
