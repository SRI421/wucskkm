import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { userData } from "./data2";

function FarmersCrop() {
  const [farmers, setFarmers] = useState(userData);
  const [selectedFarmerIndex, setSelectedFarmerIndex] = useState(0);
  const [activeYear, setActiveYear] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [editAreaIndex, setEditAreaIndex] = useState(null);
  const [editCropIndex, setEditCropIndex] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [formData, setFormData] = useState({
    sno: "",
    area: "",
    Crop: "",
    crop_area: "",
  });

  const farmer = farmers[selectedFarmerIndex];
  const years = farmer.year_details;
  const currentYear = activeYear ?? years[years.length - 1]?.year;

  const yearDetails = useMemo(() => {
    return (
      farmers[selectedFarmerIndex]?.year_details?.find((y) => y.year === currentYear) || {
        area_details: [],
        paid: 0,
        total_wtax: 0,
        total_mtax: 0,
        old_balance: 0,
        remaining_balance: 0,
        total_area: 0,
      }
    );
  }, [farmers, selectedFarmerIndex, currentYear, refreshKey]);

  const handleSelectFarmer = (index) => {
    setSelectedFarmerIndex(index);
    setActiveYear(null);
  };

  const openAddAreaModal = () => {
    setModalMode("add-area");
    setEditAreaIndex(null);
    setEditCropIndex(null);
    setFormData({ sno: "", area: "", Crop: "", crop_area: "" });
    setShowModal(true);
  };

  const openAddCropModal = (areaIndex) => {
    setModalMode("add-crop");
    setEditAreaIndex(areaIndex);
    setEditCropIndex(null);
    setFormData({ Crop: "", crop_area: "" });
    setShowModal(true);
  };

  const openEditCropModal = (areaIndex, cropIndex, crop) => {
    setModalMode("edit-crop");
    setEditAreaIndex(areaIndex);
    setEditCropIndex(cropIndex);
    setFormData({ ...crop });
    setShowModal(true);
  };

  const updateFarmersData = (updatedYearDetail) => {
    const newFarmers = farmers.map((farmer, index) => {
      if (index === selectedFarmerIndex) {
        return {
          ...farmer,
          year_details: farmer.year_details.map((y) =>
            y.year === currentYear ? { ...updatedYearDetail } : y
          ),
        };
      }
      return farmer;
    });

    setFarmers(newFarmers);
    setShowModal(false);
    setRefreshKey((k) => k + 1); // Trigger yearDetails recompute
  };

  const handleAddArea = () => {
    const yearDetail = { ...yearDetails };
    yearDetail.area_details = [...(yearDetail.area_details || [])];

    yearDetail.area_details.push({
      sno: formData.sno,
      area: parseFloat(formData.area) || 0,
      crop_details: [],
    });

    updateFarmersData(yearDetail);
  };

  const handleAddCrop = () => {
    const yearDetail = { ...yearDetails };
    yearDetail.area_details = [...yearDetail.area_details];
    yearDetail.area_details[editAreaIndex] = {
      ...yearDetail.area_details[editAreaIndex],
      crop_details: [
        ...yearDetail.area_details[editAreaIndex].crop_details,
        {
          Crop: formData.Crop,
          crop_area: parseFloat(formData.crop_area) || 0,
        },
      ],
    };

    updateFarmersData(yearDetail);
  };

  const handleEditCrop = () => {
    const yearDetail = { ...yearDetails };
    yearDetail.area_details = [...yearDetail.area_details];
    const cropList = [...yearDetail.area_details[editAreaIndex].crop_details];
    cropList[editCropIndex] = {
      Crop: formData.Crop,
      crop_area: parseFloat(formData.crop_area) || 0,
    };

    yearDetail.area_details[editAreaIndex] = {
      ...yearDetail.area_details[editAreaIndex],
      crop_details: cropList,
    };

    updateFarmersData(yearDetail);
  };

  const handleDeleteCrop = (areaIndex, cropIndex) => {
    if (!window.confirm("Are you sure to delete this crop?")) return;

    const yearDetail = { ...yearDetails };
    const updatedArea = [...yearDetail.area_details];
    const updatedCrops = [...updatedArea[areaIndex].crop_details];
    updatedCrops.splice(cropIndex, 1);
    updatedArea[areaIndex] = {
      ...updatedArea[areaIndex],
      crop_details: updatedCrops,
    };

    yearDetail.area_details = updatedArea;
    updateFarmersData(yearDetail);
  };

  const handleModalSave = () => {
    if (modalMode === "add-area") handleAddArea();
    else if (modalMode === "add-crop") handleAddCrop();
    else if (modalMode === "edit-crop") handleEditCrop();
  };

  const areaColumns = [
    {
      name: "S.No",
      selector: (row) => row.sno,
      width: "90px",
    },
    {
      name: "Area (acre)",
      selector: (row) => row.area,
      width: "120px",
    },
    {
      name: "Crops",
      cell: (row, index) => (
        <div className="d-flex flex-column gap-2 w-100">
          {row.crop_details?.map((crop, cIndex) => (
            <div
              key={cIndex}
              className="d-flex justify-content-between align-items-center border rounded p-1 bg-light"
            >
              <span>
                <strong>{crop.Crop || "-"}</strong> - {crop.crop_area || "-"} acre
              </span>
              <span>
                <button
                  className="btn btn-sm btn-primary me-1"
                  onClick={() => openEditCropModal(index, cIndex, crop)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteCrop(index, cIndex)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
          <button
            className="btn btn-success btn-sm mt-2"
            onClick={() => openAddCropModal(index)}
          >
            + Add Crop
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="d-flex" style={{ height: "90vh" }}>
      {/* Sidebar */}
      <div
        className="sidebar p-3 text-white"
        style={{ minWidth: 220, maxWidth: 220, background: "#2c3e50" }}
      >
        <h5>Farmers</h5>
        {farmers.map((f, i) => (
          <div
            key={i}
            className={`nav-link ${i === selectedFarmerIndex ? "active" : ""}`}
            onClick={() => handleSelectFarmer(i)}
          >
            {f.name}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div
        className="flex-fill p-3 overflow-auto"
        style={{
          maxWidth: "100%",
          background: "#f7f9fc",
          borderLeft: "1px solid #ddd",
        }}
      >
        <div className="container-lg">
          <h4 className="mb-3 text-primary fw-bold">{farmer.name}</h4>

          <div className="mb-3 d-flex gap-2 flex-wrap">
            {years.map((y) => (
              <button
                key={y.year}
                className={`btn btn-sm ${
                  y.year === currentYear ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveYear(y.year)}
              >
                {y.year}
              </button>
            ))}
          </div>

          <div className="mb-3 p-3 border rounded bg-white shadow-sm">
            <div className="row text-center">
              <div className="col"><strong>Paid:</strong><br />₹{yearDetails.paid}</div>
              <div className="col"><strong>WTax:</strong><br />₹{yearDetails.total_wtax}</div>
              <div className="col"><strong>MTax:</strong><br />₹{yearDetails.total_mtax}</div>
              <div className="col"><strong>Old Bal:</strong><br />₹{yearDetails.old_balance}</div>
              <div className="col"><strong>Remaining:</strong><br />₹{yearDetails.remaining_balance}</div>
              <div className="col"><strong>Total Area:</strong><br />{yearDetails.total_area} acre</div>
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-end">
            <button className="btn btn-success" onClick={openAddAreaModal}>
              + Add Area
            </button>
          </div>

          <DataTable
            columns={areaColumns}
            data={yearDetails.area_details || []}
            pagination
            highlightOnHover
            striped
            responsive
            dense
            noDataComponent="No Areas Yet"
            customStyles={{
              table: {
                style: { minWidth: "100%" },
              },
              headCells: {
                style: {
                  backgroundColor: "#e9ecef",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content p-3">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modalMode === "add-area"
                      ? "Add New Area"
                      : modalMode === "add-crop"
                      ? "Add New Crop"
                      : "Edit Crop"}
                  </h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleModalSave();
                    }}
                  >
                    {modalMode === "add-area" && (
                      <>
                        <div className="mb-2">
                          <label>S.No</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.sno}
                            onChange={(e) =>
                              setFormData({ ...formData, sno: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label>Area (acre)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={formData.area}
                            onChange={(e) =>
                              setFormData({ ...formData, area: e.target.value })
                            }
                            required
                          />
                        </div>
                      </>
                    )}

                    {(modalMode === "add-crop" || modalMode === "edit-crop") && (
                      <>
                        <div className="mb-2">
                          <label>Crop</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.Crop}
                            onChange={(e) =>
                              setFormData({ ...formData, Crop: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <label>Crop Area (acre)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={formData.crop_area}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                crop_area: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default FarmersCrop;
