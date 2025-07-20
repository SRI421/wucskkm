import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import Chart from "chart.js/auto";
// import "./Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    let pieChart, barChart, lineChart;

    const years = ["2021", "2022", "2023", "2024", "2025"];
    const pieData = [10, 20, 30, 25, 15];
    const barData = [12, 19, 3, 5, 2];
    const lineData = [5, 10, 15, 7, 12];

    const pieCtx = document.getElementById("pieChart");
    if (pieCtx) {
      pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: years,
          datasets: [
            {
              data: pieData,
              backgroundColor: [
                "#ff6384",
                "#36a2eb",
                "#cc65fe",
                "#ffce56",
                "#2ecc71",
              ],
            },
          ],
        },
      });
    }

    const barCtx = document.getElementById("barChart");
    if (barCtx) {
      barChart = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: years,
          datasets: [
            {
              label: "Bar values",
              data: barData,
              backgroundColor: "#36a2eb",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    const lineCtx = document.getElementById("lineChart");
    if (lineCtx) {
      lineChart = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              label: "Trend over years",
              data: lineData,
              borderColor: "#ff6384",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      pieChart?.destroy();
      barChart?.destroy();
      lineChart?.destroy();
    };
  }, []);

  return (
    <div className="dashboard-flex">
      <div className="row vh-45 g-2 p-2">
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <Carousel className="dashboard-carousel">
              <Carousel.Item>
                <img
                  src="https://picsum.photos/id/1015/800/400"
                  alt="Event 1"
                  className="d-block w-100"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
                  <h5>Event 1</h5>
                  <p>Description of event 1</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://picsum.photos/id/1016/800/400"
                  alt="Event 2"
                  className="d-block w-100"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
                  <h5>Event 2</h5>
                  <p>Description of event 2</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://picsum.photos/id/1018/800/400"
                  alt="Event 3"
                  className="d-block w-100"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
                  <h5>Event 3</h5>
                  <p>Description of event 3</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <img
              src="https://picsum.photos/id/1033/800/400"
              alt="Map Placeholder"
              className="card-img-top dashboard-map-img"
            />
            <div className="card-body">
              <p className="card-text">Map Placeholder Image</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row vh-45 g-2 p-2">
        <div className="col-md-4 h-100">
          <div className="card h-100 p-2 dashboard-chart-card">
            <canvas id="pieChart"></canvas>
          </div>
        </div>
        <div className="col-md-4 h-100">
          <div className="card h-100 p-2 dashboard-chart-card">
            <canvas id="barChart"></canvas>
          </div>
        </div>
        <div className="col-md-4 h-100">
          <div className="card h-100 p-2 dashboard-chart-card">
            <canvas id="lineChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
