import React, { useState } from "react";
import { pdfBase64Data } from "./data/pdfImages"; // base64 PDFs

const Documents = () => {
  const [activePdf, setActivePdf] = useState(null);

  const handleOpen = (title) => setActivePdf(pdfBase64Data[title]);

  return (
    <>
      <div style={{ padding: "1rem", height: "90vh", overflowY: "auto" }}>
        <h5>Available Documents</h5>
        <div className="list-group">
          {Object.keys(pdfBase64Data).map((title, idx) => (
            <a
              href="#"
              key={idx}
              className="list-group-item list-group-item-action"
              onClick={(e) => {
                e.preventDefault();
                handleOpen(title);
              }}
            >
              <i className="bi bi-file-earmark-pdf-fill text-danger fs-4 me-3"></i>
              <div>
                <div className="fw-semibold">{title}</div>
                <small className="text-muted">base64 · PDF</small>
              </div>
            </a>
          ))}
        </div>
      </div>

      {activePdf && (
        <div
          onClick={() => setActivePdf(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "95%",
              height: "95%",
              backgroundColor: "#fff",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePdf(null)}
              style={{
                position: "fixed",
                top: 10,
                right: 10,
                color: "red",
                fontSize: 30,
                fontWeight: "bold",
                border: "none",
                background: "none",
                zIndex: 10000,
              }}
            >
              ×
            </button>

            {/* PDF Viewer */}
            <iframe
              src={activePdf}
              title="PDF Viewer"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Documents;
