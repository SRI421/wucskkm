import React from "react";

const videoIds = [
  "dQw4w9WgXcQ",
  "M7FIvfx5J10",
  "e-ORhEE9VVg",
  "fLexgOxsZu0",
  "L_jWHffIx5E",
  "CevxZvSJLk8",
  "kJQP7kiw5Fk",
  "RgKAFK5djSk",
  "YQHsXMglC9A",
  "fRh_vgS2dFE",
  "OPf0YbXqDm0",
  "uelHwf8o7_U",
];

const VideoGallery = ({ onVideoSelect }) => {
  return (
    <div className="video-grid">
      {videoIds.map((id, index) => (
        <div
          key={index}
          className="video-thumb"
          onClick={() => onVideoSelect(id)}
        >
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={`Video ${index + 1}`}
          />
          <i className="bi bi-play-circle-fill play-btn"></i>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
