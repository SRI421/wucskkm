import React, { useState } from "react";

const documents = [
  {
    title: "Dummy Report 1",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    site: "w3.org",
  },
  {
    title: "Sample PDF 2",
    url: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
    site: "unec.edu.az",
  },
  {
    title: "PDF Example 3",
    url: "https://www.orimi.com/pdf-test.pdf",
    site: "orimi.com",
  },
  {
    title: "Test Document 4",
    url: "https://gahp.net/wp-content/uploads/2017/09/sample.pdf",
    site: "gahp.net",
  },
];

const Documents = () => {
  const [activePdf, setActivePdf] = useState(null);

  return (
    <>
      <div className="doc-list vh-90">
        <h5>Available Documents</h5>
        <div className="list-group">
          {documents.map((doc, idx) => (
            <a
              href="#"
              key={idx}
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={(e) => {
                e.preventDefault();
                setActivePdf(doc.url);
              }}
            >
              <i className="bi bi-file-earmark-pdf-fill text-danger fs-4 me-3"></i>
              <div>
                <div className="fw-semibold">{doc.title}</div>
                <small className="text-muted">
                  {doc.site} · PDF
                </small>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      {activePdf && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            onClick={() => setActivePdf(null)}
          >
            <div
              className="modal-dialog modal-fullscreen-md-down modal-xl modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Document Viewer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setActivePdf(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <embed
                    src={activePdf}
                    type="application/pdf"
                    className="pdf-viewer"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => window.open(activePdf, "_blank")}
                  >
                    <i className="bi bi-download"></i> Download
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setActivePdf(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </>
  );
};

export default Documents;
