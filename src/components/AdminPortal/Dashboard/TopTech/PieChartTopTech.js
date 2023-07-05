import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import CryptoJS from "crypto-js";
const PieChartTopTech = () => {
  const [pData, setPData] = useState();

  const fetchData = async () => {
    const secretkeyUser = process.env.REACT_APP_USER_KEY;
    var parsedObject;
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      parsedObject = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    await fetch(`https://cg-interns-hq.azurewebsites.net/api/v2/getTop5Tech`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedObject["token"]}`,
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
