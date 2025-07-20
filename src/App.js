import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import VideoGallery from "./components/VideoGallery";
import Documents from "./components/Documents";
import Maps from "./components/Maps";
import Gallery from "./components/Gallery";
import Reports from "./components/Reports";
import Dashboard from "./components/Dashboard";
import Farmers from "./components/Farmers";
import FarmersCrop from "./components/FarmersCrop";
import "./App.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("videos");
  const [activeVideo, setActiveVideo] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLoginClick={() => setShowLogin(true)}
      />

      <div className="d-flex" style={{ height: "90vh" }}>
        <Sidebar
          collapsed={sidebarCollapsed}
          activePage={activePage}
          onNavigate={setActivePage}
        />

        {activePage === "videos" && (
          <VideoGallery onVideoSelect={setActiveVideo} />
        )}
        {activePage === "documents" && <Documents />}
        {activePage === "maps" && <Maps />}
        {activePage === "gallery" && <Gallery />}
        {activePage === "reports" && <Reports />}
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "farmers" && <Farmers />}
        {activePage === "farmerscrop" && <FarmersCrop />}
      </div>

      <Footer />

      {/* Video Modal */}
      {activeVideo && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="modal-dialog modal-xl modal-fullscreen-sm-down modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content modal-video bg-dark text-white">
                <div className="modal-header border-0">
                  <h5 className="modal-title">Video Preview</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setActiveVideo(null)}
                  ></button>
                </div>
                <div className="modal-body p-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}

      {/* Login Modal */}
      {showLogin && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            onClick={() => setShowLogin(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content border-0 shadow rounded-4 glassy-bg p-4">
                <div className="modal-header border-0">
                  <h5 className="modal-title w-100 text-center text-primary fw-bold">
                    Welcome Back 👋
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowLogin(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form
                    autoComplete="off"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setTimeout(() => setShowLogin(false), 300);
                    }}
                  >
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="bi bi-person-fill" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username or Email"
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </>
  );
}

export default App;
