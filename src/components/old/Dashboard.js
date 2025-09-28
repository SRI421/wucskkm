import React, { useEffect, useRef } from "react";
import { Carousel } from "react-bootstrap";
import Chart from "chart.js/auto";

const Dashboard = () => {
  // Refs for canvas elements
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const years = ["2021", "2022", "2023", "2024", "2025"];
    const pieData = [10, 20, 30, 25, 15];
    const barData = [12, 19, 3, 5, 2];
    const lineData = [5, 10, 15, 7, 12];

    const pieChart = new Chart(pieRef.current, {
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const barChart = new Chart(barRef.current, {
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    const lineChart = new Chart(lineRef.current, {
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    // Cleanup charts on unmount
    return () => {
      pieChart.destroy();
      barChart.destroy();
      lineChart.destroy();
    };
  }, []);

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 1rem 1.5rem;
        }
        .dashboard-chart-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 0.35rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
          background: white;
          padding: 1rem !important;
        }
        .carousel img {
          object-fit: cover;
          height: 300px;
        }
        @media (max-width: 575.98px) {
          .dashboard-chart-card {
            min-height: 280px !important;
          }
          .carousel img {
            height: 200px !important;
          }
          .container-fluid {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
        }
      `}</style>

      <div className="container-fluid dashboard-container">
        {/* Top row: Carousel and Map */}
        <div className="row g-3">
          <div className="col-12 col-md-6 d-flex flex-column h-100">
            <div className="card flex-grow-1 shadow-sm">
              <Carousel fade>
                {[
                  { id: 1015, title: "Event 1", desc: "Description of event 1" },
                  { id: 1016, title: "Event 2", desc: "Description of event 2" },
                  { id: 1018, title: "Event 3", desc: "Description of event 3" },
                ].map(({ id, title, desc }) => (
                  <Carousel.Item key={id}>
                    <img
                      src={`https://picsum.photos/id/${id}/800/400`}
                      className="d-block w-100 rounded-top"
                      alt={title}
                    />
                    <Carousel.Caption className="bg-dark bg-opacity-50 rounded px-3 py-2">
                      <h5>{title}</h5>
                      <p>{desc}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex flex-column h-100">
            <div className="card flex-grow-1 shadow-sm">
              <img
                src="https://picsum.photos/id/1033/800/400"
                alt="Map Placeholder"
                className="card-img-top rounded-top"
                style={{ objectFit: "cover", height: "100%" }}
              />
              <div className="card-body">
                <p className="card-text">Map Placeholder Image</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Charts */}
        <div className="row g-3 mt-3">
          <div className="col-12 col-sm-6 col-lg-4 d-flex">
            <div
              className="card dashboard-chart-card flex-fill"
              style={{ minHeight: "320px" }}
            >
              <canvas
                ref={pieRef}
                aria-label="Pie Chart showing data distribution"
                role="img"
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 d-flex">
            <div
              className="card dashboard-chart-card flex-fill"
              style={{ minHeight: "320px" }}
            >
              <canvas
                ref={barRef}
                aria-label="Bar Chart showing values across years"
                role="img"
              />
            </div>
          </div>

          <div className="col-12 col-sm-12 col-lg-4 d-flex">
            <div
              className="card dashboard-chart-card flex-fill"
              style={{ minHeight: "320px" }}
            >
              <canvas
                ref={lineRef}
                aria-label="Line Chart showing trend over years"
                role="img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
