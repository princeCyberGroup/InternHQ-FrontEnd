import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "../TopTech/topTech.css";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: [],
  datasets: [
    {
      radius: "70%",
      label: "Total Numbers",
      data: [],
      backgroundColor: ["#28519E", "#3B82F6", "#99CC00", "#E23237", "#FFB81C"],
      borderWidth: 2,
    },
  ],
};

const PieChart = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://cg-interns-hq.azurewebsites.net/getTop5Tech`
      );
      const rsp = await response.json();
      setApiData(rsp.response);
      console.log(apiData);
    } catch (e) {
      console.log(e);
    }
  };
  const calculateTechPercentage = (data) => {
    // const totalCount = data.length;
    // const techCount = {};

    // data.forEach((item) => {
    //   const techName = item.techName;
    //   const lowerCaseTechName = techName.toLowerCase();
    //   techCount[lowerCaseTechName] = (techCount[lowerCaseTechName] || 0) + 1;
    // });

    let techPercentage = {};

    for (const ind in data) {
      const count = data[ind].techCount;
      const percentage = (count / 16) * 100;
      techPercentage[data[ind].techName.toLowerCase()] = percentage.toFixed(2) + "%";
    }
    return techPercentage;
  };

  // Calculate the occurrence of each techName in lowercase
  const techNameOccurrences = apiData.reduce((accumulator, item) => {
    const { techName } = item;
    const lowerCaseTechName = techName.toLowerCase();
    accumulator[lowerCaseTechName] = (accumulator[lowerCaseTechName] || 0) + 1;
    return accumulator;
  }, {});
  const techPercentages = calculateTechPercentage(apiData);
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
            console.log("chart", chart.data);
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
                  textDecoration: 'none',
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
    <div className="container mt-4" style={{ width: "25rem", margin: "9px" }}>
      <div className="row">
        <div className="col">
          <h2
            style={{
              fontFamily: "Roboto",
              textAlign: "start",
              fontWeight: 600,
              fontSize: "1rem",
              lineHeight: "1.3rem",
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
            boxShadow: "0rem 0.25rem 1.25rem rgba(40, 52, 73, 0.15)",
            borderRadius: "0.5rem",
          }}
        >
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
