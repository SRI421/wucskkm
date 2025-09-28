import React, { useEffect, useState } from "react";
import { Carousel, Card, Spinner } from "react-bootstrap";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import {
  getCarouselImages,
  getMapImage,
  getPieChartData,
  getBarChartData,
  getLineChartData,
} from "../api/api";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const isBase64Image = (str) =>
  typeof str === "string" && str.startsWith("data:image");

const dashboardContainer = {
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 56px)",
  minHeight: 420,
  gap: 18,
  padding: 14,
};

const firstRowStyle = {
  display: "flex",
  flex: 1,
  gap: 18,
  minHeight: 0,
};

const mapCardStyle = {
  flexBasis: "33%",  // swapped to first position
  borderRadius: 14,
  boxShadow: "0 6px 18px rgba(30,43,82,0.09)",
  background: "#fff",
  minWidth: 200,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const showcaseCardStyle = {
  flexBasis: "67%",  // swapped to second position
  borderRadius: 14,
  boxShadow: "0 6px 18px rgba(30,43,82,0.09)",
  background: "#fff",
  minWidth: 200,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const secondRowStyle = {
  display: "flex",
  flex: 1,
  gap: 18,
  minHeight: 0,
};

const chartCardStyle = {
  flex: 1,
  padding: 14,
  borderRadius: 14,
  boxShadow: "0 6px 18px rgba(30,43,82,0.09)",
  background: "#fff",
  minWidth: 170,
  minHeight: 250,
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const cardTitleStyle = {
  fontSize: 17,
  fontWeight: 600,
  padding: "14px 18px 7px 18px",
  color: "#244963",
};

const mediaQuery = `
@media (max-width: 900px) {
  .dashboard-container { height: auto !important; }
  .dashboard-row { flex-direction: column !important; }
  .dashboard-card { width: 100% !important; min-width: unset !important; }
  .first-row-showcase { flex-basis: 100% !important; margin-top: 12px; }
  .first-row-map { flex-basis: 100% !important; }
  .second-row-chart { flex-basis: 100% !important; margin-top: 12px; min-height: 180px !important;}
  .second-row-chart > canvas {
    height: 160px !important;
  }
}
`;

function Dashboard() {
  const [carouselImages, setCarouselImages] = useState(null);
  const [mapImage, setMapImage] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    getCarouselImages().then(setCarouselImages);
    getMapImage().then(setMapImage);
    getPieChartData().then(setPieData);
    getBarChartData().then(setBarData);
    getLineChartData().then(setLineData);
  }, []);

  return (
    <>
      <style>{mediaQuery}</style>
      <div className="dashboard-container" style={dashboardContainer}>
        {/* First Row */}
        <div className="dashboard-row" style={firstRowStyle}>

          {/* Map Card first */}
          <Card className="dashboard-card first-row-map" style={mapCardStyle}>
            <div style={cardTitleStyle}>ನೀರು ಬಳಕೆದಾರರ ಸಹಕಾರ ಸಂಘ ನಿಯಮಿತ, ಕಾಗೆಕೋಡಮಗ್ಗೆ ,ಭದ್ರಾವತಿ</div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              {!mapImage ? (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <img
                  src={isBase64Image(mapImage) ? mapImage : mapImage}
                  alt="Society Map"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "26vw",
                    minHeight: 160,
                    maxHeight: 300,
                    borderRadius: 8,
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}
            </div>
          </Card>

          {/* Showcase Images second with marquee header */}
          <Card className="dashboard-card first-row-showcase" style={showcaseCardStyle}>
            <div style={{ ...cardTitleStyle, whiteSpace: "nowrap", overflow: "hidden" }}>
              <marquee behavior="scroll" direction="left" scrollamount="5" style={{ color: "#244963" }}>
                ನೀರು ಬಳಕೆದಾರರ ಸಹಕಾರ ಸಂಘ ನಿಯಮಿತ, ಕಾಗೆಕೋಡಮಗ್ಗೆ ,ಭದ್ರಾವತಿ
              </marquee>
            </div>
            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              {!carouselImages ? (
                <div style={{ textAlign: "center", paddingTop: 60 }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Carousel style={{ flex: 1, minHeight: 0, height: "100%" }} interval={3500}>
                  {carouselImages.map((img, idx) => (
                    <Carousel.Item key={idx} style={{ height: "100%" }}>
                      <img
                        src={isBase64Image(img) ? img : img}
                        alt={`Showcase ${idx + 1}`}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "26vw",
                          minHeight: 160,
                          maxHeight: 300,
                          borderRadius: 8,
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
          </Card>
        </div>

        {/* Second Row */}
        <div className="dashboard-row" style={secondRowStyle}>
          <Card className="dashboard-card second-row-chart" style={chartCardStyle}>
            <div style={cardTitleStyle}>Crop Distribution</div>
            {pieData ? (
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div style={{ textAlign: "center", paddingTop: 40 }}>
                <Spinner animation="border" variant="primary" />
              </div>
            )}
          </Card>
          <Card className="dashboard-card second-row-chart" style={chartCardStyle}>
            <div style={cardTitleStyle}>Monthly Yield</div>
            {barData ? (
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div style={{ textAlign: "center", paddingTop: 40 }}>
                <Spinner animation="border" variant="primary" />
              </div>
            )}
          </Card>
          <Card className="dashboard-card second-row-chart" style={chartCardStyle}>
            <div style={cardTitleStyle}>Annual Growth Trend</div>
            {lineData ? (
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div style={{ textAlign: "center", paddingTop: 40 }}>
                <Spinner animation="border" variant="primary" />
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
