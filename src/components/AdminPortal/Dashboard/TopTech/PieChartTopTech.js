import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
const PieChartTopTech = () => {
  const [pData, setPData] = useState();

  const fetchData = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InN0YXR1c0NvZGUiOjIwMCwibWVzc2FnZSI6IkxvZ2luIFN1Y2Nlc3NmdWxsIiwidXNlcklkIjo5MywiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6bnVsbCwiZW1haWwiOiJhZG1pbkBjZ2luZmluaXR5LmNvbSIsImlzRGVwbG95ZWQiOmZhbHNlLCJyYW5kb21TdHJpbmciOiJjYjg3MTUifSwiZXhwIjoxNjg4NTc0MDc0LCJpYXQiOjE2ODg0MDEyNzR9.FdkvzcoUcYpqilUqnBog_yS1iSyrI8V8gtuahhhZqdE";
    await fetch(`https://cg-interns-hq.azurewebsites.net/api/v2/getTop5Tech`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setPData(data.response);
      })
      .catch((error) => {
        console.log("this is error", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const totalTechCount = pData?.reduce(
    (accumulator, item) => accumulator + parseInt(item.techCount),
    0
  );
  const techDataWithCounts = pData?.reduce((accumulator, item) => {
    const percentage = (
      (parseInt(item.techCount) / totalTechCount) *
      100
    ).toFixed(2);
    accumulator[item.techName] = percentage;
    return accumulator;
  }, {});

  const data = {
    labels: techDataWithCounts ? Object.keys(techDataWithCounts) : [],
    datasets: [
      {
        radius: "70%",
        data: techDataWithCounts ? Object.values(techDataWithCounts) : [],
        backgroundColor: [
          "#28519E",
          "#3B82F6",
          "#99CC00",
          "#E23237",
          "#FFB81C",
        ],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 17,
          boxHeight: 17,
          generateLabels: (chart) => {
            let array = techDataWithCounts
              ? Object.keys(techDataWithCounts)
              : [];
            return array?.map((val, ind) => {
              const dataset = chart.data.datasets[0];
              return {
                text: `${val} (${techDataWithCounts[val]}%)`,
                fontColor: "#343435",
                fillStyle: chart.data.datasets[0].backgroundColor[ind],
                lineCap: dataset.borderCapStyle,
                lineDash: dataset.borderDash,
                lineDashOffset: dataset.borderDashOffset,
                lineJoin: dataset.borderJoinStyle,
                strokeStyle: "#fff",
                pointStyle: dataset.pointStyle,
                rotation: dataset.rotation,
              };
            });
          },
          fontColor: "#343435",
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const currentValue = dataset.data[tooltipItem.index];
            const label = data.labels[tooltipItem.index];
            return `${label}: ${currentValue}%`;
          },
        },
      },
    },
  };

  return (
    <div className="container mt-4" style={{ width: "25rem" }}>
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

export default PieChartTopTech;
