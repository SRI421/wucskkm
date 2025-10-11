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
  LineElement,
);

const isBase64Image = (str) => typeof str === "string" && str.startsWith("data:image");

const styles = {
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 56px)",
    minHeight: 420,
    gap: 18,
    padding: 14,
    boxSizing: "border-box",
    position: "relative",
  },
  firstRowStyle: {
    position: "relative",
    height: "50vh",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(30,43,82,0.09)",
    backgroundColor: "transparent",
  },
  carouselStyle: {
    height: "100%",
    width: "100%",
    borderRadius: 14,
  },
  carouselItemStyle: {
    height: "100%",
  },
  carouselImageStyle: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 14,
  },
  overlayStyle: {
    position: "absolute",
    top: "20px",
    left: 0,
    right: 0,
    color: "#244963",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 14,
    margin: "0 20px",
    padding: "10px 0",
    userSelect: "none",
    pointerEvents: "none",
  },
  marqueeStyle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontWeight: "600",
    fontSize: 16,
    animation: "marquee 15s linear infinite",
    color: "#244963",
    marginBottom: 8,
    display: "block",
  },
  marqueeKeyframes: `
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`,
  headerStyle: {
    fontWeight: 600,
    fontSize: 18,
    margin: "0 0 10px 0",
  },
  secondRowStyle: {
    display: "flex",
    flex: 1,
    gap: 18,
    minHeight: 0,
  },
  chartCardStyle: {
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
  },
  cardTitleStyle: {
    fontSize: 17,
    fontWeight: 600,
    padding: "14px 18px 7px 18px",
    color: "#244963",
    userSelect: "none",
  },
  mediaQuery: `
@media (max-width: 900px) {
  .firstRow {
    height: 65vh !important;
  }
  .secondRow {
    flex-direction: column !important;
    height: auto !important;
    margin-top: 24px !important;
  }
  .chartCard {
    min-height: 220px !important;
    width: 100% !important;
    margin-bottom: 20px !important;
  }
  .marquee {
    font-size: 16px !important;
  }
  .headerStyle {
    font-size: 20px !important;
  }
}
`,
};

export default function Dashboard() {
  const [carouselImages, setCarouselImages] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    getCarouselImages().then(setCarouselImages);
    getPieChartData().then(setPieData);
    getBarChartData().then(setBarData);
    getLineChartData().then(setLineData);
  }, []);

  return (
    <>
      <style>{styles.mediaQuery}</style>
      <style>{styles.marqueeKeyframes}</style>
      <div className="dashboard-container" style={styles.dashboardContainer}>

        {/* First Row: Background carousel with transparent overlay */}
        <div className="firstRow" style={styles.firstRowStyle}>
          <Carousel
            variant="dark"
            controls={false}
            indicators={false}
            interval={3500}
            style={styles.carouselStyle}
            pause={false}
          >
            {carouselImages ? (
              carouselImages.map((img, index) => (
                <Carousel.Item key={index} style={styles.carouselItemStyle}>
                  <img
                    src={isBase64Image(img) ? img : img}
                    alt={`Showcase ${index + 1}`}
                    style={styles.carouselImageStyle}
                  />
                </Carousel.Item>
              ))
            ) : (
              <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spinner animation="border" />
              </div>
            )}
          </Carousel>

          {/* Overlay marquee and header*/}
          <div style={styles.overlayStyle} aria-hidden="true">
            <span style={styles.marqueeStyle} className="marquee">
              ನೀರು ಬಳಕೆದಾರರ ಸಹಕಾರ ಸಂಘ ನಿಯಮಿತ, ಕಾಗೆಕೋಡಮ ಜೊತೆ, ಭದ್ರಾವತಿ
            </span>
            <h2 style={styles.headerStyle}>ನೀರು ಬಳಕೆದಾರರ ಸಹಕಾರ ಸಂಘ ನಿರ್ವಾಹಕರು</h2>
          </div>
        </div>

        {/* Second Row: Cards with charts */}
        <div className="secondRow" style={styles.secondRowStyle}>
          <Card style={styles.chartCardStyle}>
            <div style={styles.cardTitleStyle}>Crop Distribution</div>
            {pieData ? (
              <Pie data={pieData} options={{ maintainAspectRatio: false }} style={{ width: "100%", flex: 1 }} />
            ) : (
              <Spinner animation="border" variant="primary" />
            )}
          </Card>

          <Card style={styles.chartCardStyle}>
            <div style={styles.cardTitleStyle}>Monthly Yield</div>
            {barData ? (
              <Bar data={barData} options={{ maintainAspectRatio: false }} style={{ width: "100%", flex: 1 }} />
            ) : (
              <Spinner animation="border" variant="primary" />
            )}
          </Card>

          <Card style={styles.chartCardStyle}>
            <div style={styles.cardTitleStyle}>Annual Growth Trend</div>
            {lineData ? (
              <Line data={lineData} options={{ maintainAspectRatio: false }} style={{ width: "100%", flex: 1 }} />
            ) : (
              <Spinner animation="border" variant="primary" />
            )}
          </Card>
        </div>

      </div>
    </>
  );
}
