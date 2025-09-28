import React, { useState, useEffect } from "react";
import Header, { HEADER_HEIGHT } from "./components/Header";
import Sidebar, { sidebarCollapsedWidth, sidebarExpandedWidth } from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

const layoutStyle = {
  display: "flex",
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  marginTop: HEADER_HEIGHT,
  flexDirection: "row",
};

const mainStyle = (sidebarWidth) => ({
  flexGrow: 1,
  marginLeft: sidebarWidth,
  background: "#f6f7fb",
  transition: "margin-left 0.3s",
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  padding: 20,
  overflowY: "auto",
});

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);
  const [collapsed, setCollapsed] = useState(true); // icon only visible collapsed by default on mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 780);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    if (isMobile) setCollapsed(true);
    else setCollapsed(false);
  }, [isMobile]);

  const handleToggle = () => {
    if (isMobile) {
      if (mobileOpen) {
        setMobileOpen(false);
        setCollapsed(true);
      } else {
        setMobileOpen(true);
        setCollapsed(false);
      }
    } else {
      setCollapsed(!collapsed);
    }
  };

  const sidebarWidth = isMobile
    ? collapsed
      ? sidebarCollapsedWidth // icon only visible on mobile always
      : sidebarExpandedWidth // overlay overlay on mobile open
    : collapsed
    ? sidebarCollapsedWidth
    : sidebarExpandedWidth;

  return (
    <>
      <Header onToggleSidebar={handleToggle} />
      <div style={layoutStyle}>
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          isMobile={isMobile}
          activeIdx={activeIdx}
          setActiveIdx={setActiveIdx}
          setMobileOpen={setMobileOpen}
        />
        <main style={mainStyle(sidebarWidth)}>
          <Dashboard />
        </main>
      </div>
    </>
  );
}

export default App;
