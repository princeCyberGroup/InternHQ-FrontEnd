import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import PieChartData from "./PieChartData";
import "../TopTech/topTech.css";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: [],
  datasets: [
    {
      radius: "50%",
      label: "Total Numbers",
      data: [],
      backgroundColor: ["#28519E", "#3B82F6", "#99CC00", "#E23237", "#FFB81C"],
      borderWidth: 2,
    },
  ],
};

const PieChart = () => {
  const calculateTechPercentage = (data) => {
    const techCount = {};
    const totalCount = data.length;

    data.forEach((item) => {
      const techName = item.techName;
      const lowerCaseTechName = techName.toLowerCase();
      techCount[lowerCaseTechName] = (techCount[lowerCaseTechName] || 0) + 1;
    });

    const techPercentage = {};

    for (const techName in techCount) {
      const count = techCount[techName];
      const percentage = (count / totalCount) * 100;
      techPercentage[techName] = percentage.toFixed(2) + "%";
    }

    return techPercentage;
  };

  // Calculate the occurrence of each techName in lowercase
  const techNameOccurrences = PieChartData.reduce((accumulator, item) => {
    const { techName } = item;
    const lowerCaseTechName = techName.toLowerCase();
    accumulator[lowerCaseTechName] = (accumulator[lowerCaseTechName] || 0) + 1;
    return accumulator;
  }, {});
  const techPercentages = calculateTechPercentage(PieChartData);

  // Populate the labels and data arrays based on techName occurrences
  data.labels = Object.keys(techNameOccurrences).map(
    (techName) => techName.charAt(0).toUpperCase() + techName.slice(1)
  );
  data.datasets[0].data = Object.values(techNameOccurrences);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 17,
          boxHeight: 17,

          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                const percentage = techPercentages[label.toLowerCase()];
                const value = dataset.data[i];
                return {
                  text: `${label} (${percentage})`,
                  fontColor: "#343435",
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden:
                    isNaN(dataset.data[i]) ||
                    chart.getDatasetMeta(0).data[i].hidden,
                  lineCap: dataset.borderCapStyle,
                  lineDash: dataset.borderDash,
                  lineDashOffset: dataset.borderDashOffset,
                  lineJoin: dataset.borderJoinStyle,
                  strokeStyle: "#fff",
                  pointStyle: dataset.pointStyle,
                  rotation: dataset.rotation,
                };
              });
            }
            return [];
          },
        },
      },
    },
  };

  return (
    <div className="container mt-4" style={{ width: "400px" }}>
      <div className="row">
        <div className="col">
          <h2
            style={{
              fontFamily: "Roboto",
              textAlign: "start",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "19px",
              color: "#002C3F",
            }}
          >
            Top 5 Technology
          </h2>
        </div>
      </div>
      <div className="row">
        <div
          className="col"
          style={{
            boxShadow: "0px 4px 20px rgba(40, 52, 73, 0.15)",
            borderRadius: "8px",
          }}
        >
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
