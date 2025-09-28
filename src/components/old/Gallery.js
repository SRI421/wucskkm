import React, { useState } from "react";
// import "./Gallery.css";

const imageIds = [
  1015, 1016, 1018, 1020, 1021, 1024,
  1025, 1033, 1035, 1041, 1043, 1050,
];

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = imageIds.map(
    (id) => `https://picsum.photos/id/${id}/600/400`
  );

  const openModal = (index) => {
    setCurrentIndex(index);
    setActiveImage(images[index]);
  };

  const closeModal = () => {
    setActiveImage(null);
  };

  const prevImage = () => {
    const newIndex =
      (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  const nextImage = () => {
    const newIndex =
      (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  return (
    <>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div
            key={index}
            className="gallery-thumb"
            onClick={() => openModal(index)}
          >
            <img
              src={src}
              alt={`Gallery ${index}`}
            />
          </div>
        ))}
      </div>

      {activeImage && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            onClick={closeModal}
          >
            <div
              className="modal-dialog modal-xl modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content bg-dark border-0 position-relative">
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <span
                  className="modal-img-nav left"
                  onClick={prevImage}
                >
                  <i className="bi bi-chevron-left"></i>
                </span>
                <span
                  className="modal-img-nav right"
                  onClick={nextImage}
                >
                  <i className="bi bi-chevron-right"></i>
                </span>
                <div className="modal-body p-0 text-center">
                  <img
                    src={activeImage}
                    alt="Preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: "80vh", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default Gallery;
