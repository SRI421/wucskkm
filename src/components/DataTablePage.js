import React, { useState, useRef, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Crop mapping for dropdown and display (future API ready)
const cropMap = {
  1: "Mango",
  2: "Apple",
  3: "Orange",
  4: "Banana",
};

// Initial sample data
const initialData = [
  {
    name: "Ram",
    phone: "9000000000",
    address: "Village A",
    pass_number: "P123",
    share_number: "S456",
    details: [
      {
        year: "2020-21",
        old_balance: 200,
        total_mtax: 300,
        total_wtax: 400,
        total: 900,
        paid: 900,
        area_details: [
          {
            sno: "101/*/1",
            area: 2.1,
            crop_details: [
              { crop_id: 3, crop_area: 1.1 },
              { crop_id: 4, crop_area: 1.0 },
            ],
          },
        ],
      },
      {
        year: "2021-22",
        old_balance: 0,
        total_mtax: 300,
        total_wtax: 400,
        total: 700,
        paid: 0,
        area_details: [
          {
            sno: "101/*/1",
            area: 2.1,
            crop_details: [
              { crop_id: 3, crop_area: 1.1 },
              { crop_id: 4, crop_area: 1.0 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Sita",
    phone: "9888888888",
    address: "Village B",
    pass_number: "P789",
    share_number: "S101",
    details: [],
  },
  {
    name: "Lakshman",
    phone: "9777777777",
    address: "Village C",
    pass_number: "P456",
    share_number: "S789",
    details: [],
  },
];

// Utility to deep clone objects
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function DataTablePage() {
  // States
  const [data, setData] = useState(initialData);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [modal, setModal] = useState({ show: false });
  const formRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Expand/Collapse Helpers
  function toggleExpand(id) {
    setExpandedRows((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  }
  function isExpanded(id) {
    return expandedRows.has(id);
  }

  // Filter data by search (name, pass_number, phone)
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lower = searchTerm.trim().toLowerCase();
    return data.filter(
      (person) =>
        person.name.toLowerCase().includes(lower) ||
        person.pass_number.toLowerCase().includes(lower) ||
        person.phone.toLowerCase().includes(lower)
    );
  }, [data, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIdx, startIdx + rowsPerPage);
  }, [filteredData, currentPage]);

  // CRUD Modal Logic
  function openModal(type, mode, indices = {}) {
    setModal({
      show: true,
      type,
      mode,
      ...indices,
      values: getModalValues(type, mode, indices),
    });
  }

  function getModalValues(type, mode, { pIdx, yIdx, aIdx, cIdx }) {
    if (type === "year") {
      if (mode === "add") {
        return {
          year: "",
          old_balance: 0,
          total_mtax: 0,
          total_wtax: 0,
          total: 0,
          paid: 0,
        };
      } else {
        return deepClone(data[pIdx].details[yIdx]);
      }
    }
    if (type === "area") {
      if (mode === "add") {
        return { sno: "", area: "" };
      } else {
        return deepClone(data[pIdx].details[yIdx].area_details[aIdx]);
      }
    }
    if (type === "crop") {
      if (mode === "add") {
        return { crop_id: "", crop_area: "" };
      } else {
        return deepClone(data[pIdx].details[yIdx].area_details[aIdx].crop_details[cIdx]);
      }
    }
    return {};
  }

  function handleModalChange(e) {
    setModal((modal) => ({
      ...modal,
      values: { ...modal.values, [e.target.name]: e.target.value },
    }));
  }

  function handleModalSubmit(e) {
    e.preventDefault();
    const { type, mode, pIdx, yIdx, aIdx, cIdx, values } = modal;
    let newData = deepClone(data);

    if (type === "year") {
      if (mode === "add") {
        newData[pIdx].details.push({
          ...values,
          old_balance: parseFloat(values.old_balance),
          total_mtax: parseFloat(values.total_mtax),
          total_wtax: parseFloat(values.total_wtax),
          total: parseFloat(values.total),
          paid: parseFloat(values.paid),
          area_details: [],
        });
      } else if (mode === "edit") {
        Object.assign(newData[pIdx].details[yIdx], {
          old_balance: parseFloat(values.old_balance),
          total_mtax: parseFloat(values.total_mtax),
          total_wtax: parseFloat(values.total_wtax),
          total: parseFloat(values.total),
          paid: parseFloat(values.paid),
        });
      }
    }
    if (type === "area") {
      if (mode === "add") {
        newData[pIdx].details[yIdx].area_details.push({
          sno: values.sno,
          area: parseFloat(values.area),
          crop_details: [],
        });
      } else if (mode === "edit") {
        Object.assign(newData[pIdx].details[yIdx].area_details[aIdx], {
          sno: values.sno,
          area: parseFloat(values.area),
        });
      }
    }
    if (type === "crop") {
      if (mode === "add") {
        newData[pIdx].details[yIdx].area_details[aIdx].crop_details.push({
          crop_id: parseInt(values.crop_id),
          crop_area: parseFloat(values.crop_area),
        });
      } else if (mode === "edit") {
        Object.assign(newData[pIdx].details[yIdx].area_details[aIdx].crop_details[cIdx], {
          crop_id: parseInt(values.crop_id),
          crop_area: parseFloat(values.crop_area),
        });
      }
    }
    setData(newData);
    setModal({ show: false });
  }

  // Delete functions 
  function deleteYear(pIdx, yIdx) {
    if (window.confirm("Delete this Year and all its nested data?")) {
      let newData = deepClone(data);
      newData[pIdx].details.splice(yIdx, 1);
      setData(newData);
    }
  }

  function deleteArea(pIdx, yIdx, aIdx) {
    if (window.confirm("Delete this Area?")) {
      let newData = deepClone(data);
      newData[pIdx].details[yIdx].area_details.splice(aIdx, 1);
      setData(newData);
    }
  }

  function deleteCrop(pIdx, yIdx, aIdx, cIdx) {
    if (window.confirm("Delete this Crop?")) {
      let newData = deepClone(data);
      newData[pIdx].details[yIdx].area_details[aIdx].crop_details.splice(cIdx, 1);
      setData(newData);
    }
  }

  // Render Years
  function renderYears(pIdx, years) {
    return (
      <div className="table-responsive">
        <table className="table nested-table table-sm table-bordered align-middle mb-0">
          <thead>
            <tr>
              <th>Year</th>
              <th>Old Bal</th>
              <th>M Tax</th>
              <th>W Tax</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Actions</th>
              <th>Areas</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y, yIdx) => (
              <tr key={y.year}>
                <td>{y.year}</td>
                <td>{y.old_balance}</td>
                <td>{y.total_mtax}</td>
                <td>{y.total_wtax}</td>
                <td>{y.total}</td>
                <td>{y.paid}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-1" aria-label="Edit year details" onClick={() => openModal("year", "edit", { pIdx, yIdx })} title="Edit Year">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button className="btn btn-sm btn-danger" aria-label="Delete year" onClick={() => deleteYear(pIdx, yIdx)} title="Delete Year">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-link p-0 expand-btn" aria-expanded={isExpanded(`ar-${pIdx}-${yIdx}`)} aria-label="Toggle areas" onClick={() => toggleExpand(`ar-${pIdx}-${yIdx}`)} title="Toggle Areas">
                    <i className="bi bi-chevron-down"></i>
                  </button>
                  {isExpanded(`ar-${pIdx}-${yIdx}`) && (
                    <div className="mt-2 collapsible-content expanded" id={`ar-${pIdx}-${yIdx}`}>
                      {renderAreas(pIdx, yIdx, y.area_details)}
                      <button className="btn btn-success btn-sm my-2" aria-label="Add area" onClick={() => openModal("area", "add", { pIdx, yIdx })} title="Add Area">
                        <i className="bi bi-plus-lg"></i> Add Area
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success btn-sm d-block mt-1 mb-3" onClick={() => openModal("year", "add", { pIdx })} title="Add New Year">
          <i className="bi bi-plus-lg"></i> Add New Year
        </button>
      </div>
    );
  }

  // Render Areas
  function renderAreas(pIdx, yIdx, areas = []) {
    return (
      <div className="table-responsive">
        <table className="table nested-table table-sm table-bordered align-middle mb-0">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Area</th>
              <th>Crops</th>
              <th className="crud-btns">Actions</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((a, aIdx) => (
              <tr key={a.sno}>
                <td>{a.sno}</td>
                <td>{a.area}</td>
                <td>
                  <button className="btn btn-link p-0 expand-btn" aria-expanded={isExpanded(`cp-${pIdx}-${yIdx}-${aIdx}`)} aria-label="Toggle crops" onClick={() => toggleExpand(`cp-${pIdx}-${yIdx}-${aIdx}`)} title="Toggle Crops">
                    <i className="bi bi-chevron-down"></i>
                  </button>
                  {isExpanded(`cp-${pIdx}-${yIdx}-${aIdx}`) && (
                    <div className="mt-2 collapsible-content expanded" id={`cp-${pIdx}-${yIdx}-${aIdx}`}>
                      {renderCrops(pIdx, yIdx, aIdx, a.crop_details)}
                      <button className="btn btn-success btn-sm my-2" aria-label="Add crop" onClick={() => openModal("crop", "add", { pIdx, yIdx, aIdx })} title="Add Crop">
                        <i className="bi bi-plus-lg"></i> Add Crop
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  <button className="btn btn-primary btn-sm me-1" aria-label="Edit area" onClick={() => openModal("area", "edit", { pIdx, yIdx, aIdx })} title="Edit Area">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" aria-label="Delete area" onClick={() => deleteArea(pIdx, yIdx, aIdx)} title="Delete Area">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render Crops
  function renderCrops(pIdx, yIdx, aIdx, crops = []) {
    return (
      <div className="table-responsive">
        <table className="table nested-table table-sm table-bordered align-middle mb-0">
          <thead>
            <tr>
              <th>Crop Name</th>
              <th>Crop Area</th>
              <th className="crud-btns">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((c, cIdx) => (
              <tr key={c.crop_id + "-" + cIdx}>
                <td>{cropMap[c.crop_id]}</td>
                <td>{c.crop_area}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-1" aria-label="Edit crop" onClick={() => openModal("crop", "edit", { pIdx, yIdx, aIdx, cIdx })} title="Edit Crop">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" aria-label="Delete crop" onClick={() => deleteCrop(pIdx, yIdx, aIdx, cIdx)} title="Delete Crop">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Modal Render
  function renderModal() {
    if (!modal.show) return null;
    const { type, mode, values } = modal;
    return (
      <div className="modal fade show" tabIndex="-1" style={{ display: "block", background: "rgba(0,0,0,0.45)" }}>
        <div className="modal-dialog">
          <form className="modal-content" ref={formRef} autoComplete="off" onSubmit={handleModalSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{mode === "edit" ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}</h5>
              <button type="button" className="btn-close" onClick={() => setModal({ show: false })} />
            </div>
            <div className="modal-body" id="modalBody">
              {type === "year" && (
                <>
                  {mode === "add" && (
                    <div className="mb-3">
                      <label className="form-label">Year (e.g. 2025-26)</label>
                      <input type="text" required className="form-control" name="year" value={values.year} onChange={handleModalChange} placeholder="Enter year" />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Old Balance</label>
                    <input type="number" step="0.01" required className="form-control" name="old_balance" value={values.old_balance} onChange={handleModalChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">M Tax</label>
                    <input type="number" step="0.01" required className="form-control" name="total_mtax" value={values.total_mtax} onChange={handleModalChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">W Tax</label>
                    <input type="number" step="0.01" required className="form-control" name="total_wtax" value={values.total_wtax} onChange={handleModalChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Total</label>
                    <input type="number" step="0.01" required className="form-control" name="total" value={values.total} onChange={handleModalChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Paid</label>
                    <input type="number" step="0.01" required className="form-control" name="paid" value={values.paid} onChange={handleModalChange} />
                  </div>
                </>
              )}
              {type === "area" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">SNO</label>
                    <input type="text" required className="form-control" name="sno" value={values.sno} onChange={handleModalChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Area</label>
                    <input type="number" required step="0.01" className="form-control" name="area" value={values.area} onChange={handleModalChange} />
                  </div>
                </>
              )}
              {type === "crop" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Crop Name</label>
                    <select name="crop_id" required className="form-select" value={values.crop_id} onChange={handleModalChange}>
                      <option value="">Select Crop</option>
                      {Object.entries(cropMap).map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Crop Area</label>
                    <input type="number" required step="0.01" className="form-control" name="crop_area" value={values.crop_area} onChange={handleModalChange} />
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModal({ show: false })}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Pagination controls
  function renderPagination() {
    if (totalPages <= 1) return null;

    function onPageChange(page) {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setExpandedRows(new Set()); // collapse all expanded rows on page change
      }
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pageNumbers.push("...");
      }
    }

    // Remove duplicate ellipsis
    const filteredPages = [];
    for (let i = 0; i < pageNumbers.length; i++) {
      if (!(pageNumbers[i] === "..." && pageNumbers[i - 1] === "...")) {
        filteredPages.push(pageNumbers[i]);
      }
    }

    return (
      <nav aria-label="Pagination Navigation" className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Previous Page"
            >
              &laquo;
            </button>
          </li>
          {filteredPages.map((num, idx) =>
            num === "..." ? (
              <li key={`ellipsis-${idx}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            ) : (
              <li key={num} className={`page-item ${currentPage === num ? "active" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => onPageChange(num)}
                  aria-current={currentPage === num ? "page" : undefined}
                >
                  {num}
                </button>
              </li>
            )
          )}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Next Page"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  // Main render
  return (
    <div className="container my-4">
      <h3>Multi-Nested DataTable (CRUD Areas/Crops & Add/Edit/Delete Year)</h3>
      
      {/* Search Bar */}
      <div className="mb-3 row">
        <label htmlFor="searchInput" className="col-sm-2 col-form-label">
          Search (Name, Pass Number, Phone)
        </label>
        <div className="col-sm-6 col-md-5 col-lg-4">
          <input
            id="searchInput"
            type="search"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
              setExpandedRows(new Set());
            }}
            aria-label="Search by Name, Pass Number or Phone"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Pass Number</th>
              <th>Share Number</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">No records found.</td>
              </tr>
            ) : (
              paginatedData.map((person, pIdx) => (
                <React.Fragment key={person.name + "-" + (currentPage - 1) * rowsPerPage + pIdx}>
                  <tr>
                    <td>{person.name}</td>
                    <td>{person.phone}</td>
                    <td>{person.address}</td>
                    <td>{person.pass_number}</td>
                    <td>{person.share_number}</td>
                    <td>
                      <button
                        className="btn btn-link p-0 expand-btn"
                        aria-expanded={isExpanded(`yr-${person.name}-${pIdx}`)}
                        aria-label="Toggle details"
                        onClick={() => toggleExpand(`yr-${person.name}-${pIdx}`)}
                        title="Toggle Details"
                      >
                        <i className="bi bi-chevron-down"></i>
                      </button>
                    </td>
                  </tr>
                  {isExpanded(`yr-${person.name}-${pIdx}`) && (
                    <tr>
                      <td colSpan={6}>{renderYears(data.indexOf(person), person.details)}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* Modal */}
      {renderModal()}

      {/* Styles */}
      <style>{`
        th { background-color: #f2f2f2 !important; }
        .nested-table th { background-color: #ececec !important; }
        .nested-table { margin-left: 2rem; margin-bottom: 1rem; }
        .expand-btn {
          cursor:pointer;
          color:#0d6efd;
          text-decoration:none;
          user-select:none;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          font-size:1.25rem;
          transition:transform 0.3s ease;
          background:transparent;
          border:none;
          padding:0.15rem;
        }
        .expand-btn[aria-expanded="true"] {
          transform: rotate(180deg);
        }
        .crud-btns { min-width: 92px; }
        button.btn-sm i { pointer-events:none; }
        button.btn-sm {
          padding:0.25rem 0.5rem;
          display:inline-flex;
          align-items:center;
          justify-content:center;
        }
        button:focus-visible,
        .expand-btn:focus-visible {
          outline:3px solid #0d6efd;
          outline-offset:2px;
          box-shadow:0 0 8px rgba(13,110,253,0.5);
          transition:outline-offset 0.15s ease-in-out;
        }
        .collapsible-content {
          max-height:0;
          overflow:hidden;
          transition:max-height 0.3s ease;
        }
        .collapsible-content.expanded {
          max-height:1500px;
        }
        @media (max-width:576px) {
          .nested-table {
            margin-left:0.5rem;
            margin-bottom:1rem;
          }
          table {
            font-size:0.9rem;
          }
          button.btn-sm {
            padding:0.2rem 0.4rem;
            font-size:0.85rem;
          }
        }
        .tooltip {
          max-width:180px;
          font-size:0.85rem;
        }
      `}</style>
    </div>
  );
}
