import React, { useState, useRef } from "react";

const images = [
  "https://picsum.photos/id/1015/800/600",
  "https://picsum.photos/id/1016/800/600",
  "https://picsum.photos/id/1018/800/600",
  "https://picsum.photos/id/1019/800/600",
];

const Maps = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const startPoint = useRef({ x: 0, y: 0 });

  const openModal = (src) => {
    setActiveImage(src);
    setScale(1);
    setOrigin({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setActiveImage(null);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleMouseDown = (e) => {
    startPoint.current = {
      x: e.clientX - origin.x,
      y: e.clientY - origin.y,
    };
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDrag = (e) => {
    setOrigin({
      x: e.clientX - startPoint.current.x,
      y: e.clientY - startPoint.current.y,
    });
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div className="gallery-area">
        {images.map((src, i) => (
          <div className="gallery-item" key={i}>
            <img
              src={src}
              className="gallery-img"
              alt={`Map ${i}`}
              onClick={() => openModal(src)}
            />
            <button
              className="zoom-in"
              onClick={() => openModal(src)}
            >
              +
            </button>
            <button
              className="zoom-out"
              onClick={() => openModal(src)}
            >
              −
            </button>
          </div>
        ))}
      </div>

      {activeImage && (
        <>
          <div
            className="modal7"
            style={{ display: "block" }}
            onMouseDown={handleMouseDown}
          >
            <div className="modal-controls">
              <button className="zoom-in" onClick={zoomIn}>
                +
              </button>
              <button className="zoom-out" onClick={zoomOut}>
                −
              </button>
              <button className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal71-content">
              <img
                src={activeImage}
                alt="Zoomed Map"
                style={{
                  transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`,
                  cursor: "grab",
                  userSelect: "none",
                }}
              />
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default Maps;
