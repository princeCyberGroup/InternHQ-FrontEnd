import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import PieChartData from "./PieChartData";
import "../TopTech/topTech.css";
import {useEffect, useState } from "react";

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
  const [apiData , setApiData] =useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://cg-interns-hq.azurewebsites.net/getTop5Tech`
      );
      const rsp = await response.json();
      setApiData(rsp);
      console.log(rsp);
    } catch (e) {
      console.log(e);
    }
  };
  const calculateTechPercentage = (data) => {
    const techCount = {};
    const totalCount = data.length;

  const totalTechCount = pdata?.reduce(
    (accumulator, item) => accumulator + parseInt(item.techCount),
    0
  );

  const fetchData = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InN0YXR1c0NvZGUiOjIwMCwibWVzc2FnZSI6IkxvZ2luIFN1Y2Nlc3NmdWxsIiwidXNlcklkIjo5MywiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6bnVsbCwiZW1haWwiOiJhZG1pbkBjZ2luZmluaXR5LmNvbSIsImlzRGVwbG95ZWQiOmZhbHNlLCJyYW5kb21TdHJpbmciOiJjYjg3MTUifSwiZXhwIjoxNjg4MTIzNTI4LCJpYXQiOjE2ODgxMTQ5Mjh9.IDRlW0sv4v35n-B9kAczNEJYCi9k6DfHe-70dp7-Wwc";
    //get the token from usedata
    await fetch(`https://cg-interns-hq.azurewebsites.net/api/v2/getTop5Tech`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InN0YXR1c0NvZGUiOjIwMCwibWVzc2FnZSI6IkxvZ2luIFN1Y2Nlc3NmdWxsIiwidXNlcklkIjo5MywiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6bnVsbCwiZW1haWwiOiJhZG1pbkBjZ2luZmluaXR5LmNvbSIsImlzRGVwbG95ZWQiOmZhbHNlLCJyYW5kb21TdHJpbmciOiJjYjg3MTUifSwiZXhwIjoxNjg4NTc0MDc0LCJpYXQiOjE2ODg0MDEyNzR9.FdkvzcoUcYpqilUqnBog_yS1iSyrI8V8gtuahhhZqdE`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log("data", data.response);
        setPData(data.response);
      })
      .catch((error) => {
        console.log("this is error", error);
      });
  };

  const calculateTechPercentage = (data) => {
    const techDataWithCounts = pdata?.reduce((accumulator, item) => {
      const percentage = (
        (parseInt(item.techCount) / totalTechCount) *
        100
      ).toFixed(2);
      accumulator[item.techName] = percentage;
      return accumulator;
    }, {});

    return techDataWithCounts;
  };

  // Calculate the occurrence of each techName in lowercase
  const techNameOccurrences = pdata?.reduce((accumulator, item) => {
    const { techName } = item;
    const lowerCaseTechName = techName.toLowerCase();
    accumulator[lowerCaseTechName] = (accumulator[lowerCaseTechName] || 0) + 1;
    return accumulator;
  }, {});
  const techPercentages = calculateTechPercentage(pdata);

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
            if (data.labels?.length && data.datasets?.length) {
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
    <div className="container mt-4" style={{ width: "25rem" , margin:"9px" }}>
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
