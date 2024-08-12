import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ scrip1_data, scrip2_data }) => {
  // Transform your data into a format suitable for Chart.js
  try {
    const chartData = {
      labels: scrip1_data["data"]
        .filter((item) => item.date !== null && item.close !== null)
        .map((item) => item.date),
      datasets: [
        {
          label: "scrip1 close price",
          data: scrip1_data["data"]
            .filter((item) => item.close !== null)
            .map((item) => item.close / scrip1_data["ratio_data"]),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: false,
        },
        {
          label: "scrip2 close price",
          data: scrip2_data["data"]
            .filter((item) => item.close !== null)
            .map((item) => item.close / scrip2_data["ratio_data"]),
          borderColor: "rgba(255,0,0,0.5)",
          backgroundColor: "rgba(255,0,0,0.5)",
          fill: false,
        },
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart Title",
        },
      },
    };

    return <Line data={chartData} options={options} />;
    // }
  } catch (error) {
    console.log("error message:", error);
  }
};

export default ChartComponent;
