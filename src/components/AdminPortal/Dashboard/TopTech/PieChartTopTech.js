import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import "./topTech.css";
const PieChartTopTech = () => {
  const [pData, setPData] = useState();
  const navigate = useNavigate();
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
    await fetch(`https://cg-interns-hq.azurewebsites.net/api/v3/getTop5Tech`, {
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
        if (error.response?.data.status === 400) {
          navigate("/error/statusCode=400");
        }
        if (error.response?.data.status === 500) {
          navigate("/error/statusCode=500");
        }
        if (error.response?.data.status === 404) {
          navigate("/error/statusCode=404");
        }
        if (error.response?.data.statusCode === 401) {
          navigate("/error/statusCode=401");
        }
        console.log("this is error", error?.statusCode);
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
  let techDataWithColor = pData ? pData : [];
  const colorArray = ["#28519E", "#3B82F6", "#99CC00", "#E23237", "#FFB81C"];
  colorArray.forEach((val, index) => {
    if (index >= techDataWithColor.length) return;
    techDataWithColor[index]["color"] = val;
    techDataWithColor[index]["techCount"] =
      techDataWithCounts[techDataWithColor[index]["techName"]];
  });
  const data = {
    labels: techDataWithCounts ? Object.keys(techDataWithCounts) : [],
    datasets: [
      {
        radius: "70%",
        data: techDataWithCounts ? Object.values(techDataWithCounts) : [],
        backgroundColor: colorArray,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          boxWidth: 17,
          boxHeight: 17,
          // code for options tag in pie chart if needed in future
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
          responsive: true,
          maintainAspectRatio: false,
          width: 300,
          height: 300,
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
            Top {pData?.length} Technology
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col pie-chart-parent-wrapper">
          <div
            style={{
              width: "250px",
              height: "250px",
              margin: "auto",
            }}
          >
            <Pie data={data} options={options} />
          </div>
          <div className="pie-val-wrapper">
            {techDataWithColor.map((val, index) => {
              return (
                <div className="pie-value" key={index}>
                  <div className="pie-value-child">
                    <div
                      className="col-wrapper"
                      style={{ backgroundColor: val?.color }}
                    />
                    <div className="val-text">{val?.techName}</div>
                  </div>

                  <div className="val-text">{val?.techCount}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartTopTech;
