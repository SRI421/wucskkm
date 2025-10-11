// App.js
import React, { useState, useEffect } from "react";
import Header, { HEADER_HEIGHT } from "./components/Header";
import Sidebar, { sidebarCollapsedWidth, sidebarExpandedWidth, MENUS } from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import DataTablePage from "./components/DataTablePage";

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
  const [collapsed, setCollapsed] = useState(true);
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
      ? sidebarCollapsedWidth
      : sidebarExpandedWidth
    : collapsed
    ? sidebarCollapsedWidth
    : sidebarExpandedWidth;

  const renderContent = () => {
    switch (activeIdx) {
      case 0:
        return <Dashboard />;
      case MENUS.length - 1: // Farmers-details
        return <DataTablePage sidebarCollapsed={collapsed} sidebarWidth={sidebarWidth} />;
      default:
        return <div style={{ padding: 20 }}>Feature "{MENUS[activeIdx]?.text}" coming soon.</div>;
    }
  };

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
        <main style={mainStyle(sidebarWidth)}>{renderContent()}</main>
      </div>
    </>
  );
}

export default App;
