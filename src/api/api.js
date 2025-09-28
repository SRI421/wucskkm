// API utility for all dashboard cards

// Helper for API fallback
const fetchWithFallback = async (url, fallback) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return fallback;
  }
};

// Default images from local 'public/defaults' folder
const defaultCarouselImages = [
  "/defaults/1.jpg",
  "/defaults/2.jpg",
  "/defaults/3.jpg",
  "/defaults/4.jpg",
  "/defaults/5.jpg",
];

const defaultMapImage = "/defaults/1.jpg";

// API endpoints
export const getCarouselImages = () =>
  fetchWithFallback("http://localhost:8000/images-carousel", defaultCarouselImages);

export const getMapImage = () =>
  fetchWithFallback("http://localhost:8000/society-map", defaultMapImage);

export const getPieChartData = () =>
  fetchWithFallback(
    "http://localhost:8000/crop-distribution",
    {
      labels: ["Rice", "Wheat", "Millets"],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: ["#4daee6", "#fa5858", "#ffd900"],
        },
      ],
    }
  );

export const getBarChartData = () =>
  fetchWithFallback(
    "http://localhost:8000/monthly-yield",
    {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Yield",
          data: [120, 90, 100, 140, 110],
          backgroundColor: "#4daee6",
        },
      ],
    }
  );

export const getLineChartData = () =>
  fetchWithFallback(
    "http://localhost:8000/annual-growth-trend",
    {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Growth",
          data: [80, 100, 120, 150, 170],
          borderColor: "#fa5858",
          fill: false,
          tension: 0.4,
        },
      ],
    }
  );
