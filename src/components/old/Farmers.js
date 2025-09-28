import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { datatable_header_mapping, jsonData } from "./data1";

function Farmers() {
  // Convert JSON data keys to match component state keys
  const mapRow = (row) => ({
    pass_field: row.pass_field || "",
    name: row.name || "",
    share: row.share || "",
    phone: row.phone || "",
    address: row.address || "",
    photo:
      row.photo ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  // Prepare initial state from imported JSON
  const [farmers, setFarmers] = useState(jsonData.map(mapRow));

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    pass_field: "",
    name: "",
    share: "",
    phone: "",
    address: "",
    photo: "",
  });

  // Dynamically build columns
  const keys = Object.keys(datatable_header_mapping);

  const columns = keys.map((key) => {
    if (key === "photo") {
      return {
        name: datatable_header_mapping[key],
        cell: (row) => (
          <img
            src={row[key]}
            alt="photo"
            className="photo-thumb"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ),
        width: "80px",
      };
    } else {
      return {
        name: datatable_header_mapping[key],
        selector: (row) => row[key],
        sortable: true,
      };
    }
  });

  columns.push({
    name: "ಕ್ರಿಯೆ",
    cell: (_, index) => (
      <div className="d-flex gap-2">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleEdit(index)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(index)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    ),
  });

  const handleDelete = (index) => {
    if (window.confirm("ನೀವು ಈ ಬಳಕೆದಾರನ ಅಳಿಸಬಯಸುತ್ತೀರಾ?")) {
      const updated = [...farmers];
      updated.splice(index, 1);
      setFarmers(updated);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(farmers[index]);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setFormData({
      pass_field: "",
      name: "",
      share: "",
      phone: "",
      address: "",
      photo: "",
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      ...formData,
      photo:
        formData.photo ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    };

    if (editingIndex !== null) {
      const updated = [...farmers];
      updated[editingIndex] = newEntry;
      setFarmers(updated);
    } else {
      setFarmers([...farmers, newEntry]);
    }
    setShowModal(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((prev) => ({
          ...prev,
          photo: ev.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="farmers-table-container">
      <div className="d-flex justify-content-between mb-3">
        <h5>Editable Farmers Table</h5>
        <button
          className="btn btn-success btn-sm"
          onClick={handleAdd}
        >
          ADD ಬಳಕೆದಾರರ
        </button>
      </div>

      <DataTable
        columns={columns}
        data={farmers}
        pagination
        responsive
        striped
      />

      {/* Modal */}
      {showModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="modal-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content glassy-bg p-3">
                <div className="modal-header">
                  <h5 className="modal-title">
                    ಹೊಸ ಬಳಕೆದಾರರನ್ನು ಸೇರಿಸಿ
                  </h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {keys
                      .filter((key) => key !== "photo")
                      .map((key) => (
                        <div className="mb-2" key={key}>
                          <label>{datatable_header_mapping[key]}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData[key]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                          />
                        </div>
                      ))}

                    <div className="mb-2">
                      <label>{datatable_header_mapping["photo"]}</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handlePhotoChange}
                      />
                      {formData.photo && (
                        <img
                          src={formData.photo}
                          alt="preview"
                          className="photo-thumb mt-2"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      ಸೇರಿಸಿ
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

export default Farmers;
