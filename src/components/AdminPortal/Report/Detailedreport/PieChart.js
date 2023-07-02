import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./PieChart.css";
import NoData from "../../../../Assets/NoData.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [tableData, setTableData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const piechartId = sessionStorage.getItem("detailId");

  const data = {
    labels: [],
    datasets: [
      {
        radius: "90%",
        label: "Total Hours",
        data: [],
        backgroundColor: [
          "#4670B6",
          "#5B9BD4",
          "#71AE47",
          "#EE7D31",
          "#B2B2B3",
        ],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMonthClick = (monthIndex) => {
    setCurrentMonth(monthIndex);
  };

  const DropdownItems = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.map((month, index) => (
      <li key={index}>
        <Link
          className="dropdown-item pe-0"
          href="#"
          style={{ paddingLeft: "8px", fontSize: "14px" }}
          onClick={() => handleMonthClick(index)}
        >
          {month}
        </Link>
      </li>
    ));
  };

  const fetchData = async () => {
    await fetch(
      process.env.REACT_APP_API_URL+`/api/v2/getDailyTaskTrackerRecords?userId=${piechartId}`,
      {
        headers: {
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setTableData(data.response);
      });
  };

  function getMonthName(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthNumber >= 0 && monthNumber <= 11) {
      return months[monthNumber];
    }
  }

  function convertToPercentageMonthly(timeString) {
    const regex = /(\d+)\s*hrs\s*(\d+)\s*min/;
    const matches = timeString.match(regex);
    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);
    const totalMinutes = hours * 60 + minutes;
    const percentage = (totalMinutes / 2400) * 100;
    return Number.isInteger(percentage) ? percentage : percentage.toFixed(2);
  }

  function convertToTimeFormat(percentage) {
    const totalMinutes = (percentage / 100) * 2400;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours} hrs ${minutes.toString().padStart(2, "0")} min`;
  }
  function convertHoursToDecimal(hoursString) {
    const regex = /(\d+)\s*hrs\s*(\d+)\s*min/;
    const match = hoursString?.match(regex);

    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const decimalHours = hours + minutes / 60;
      return decimalHours;
    }
  }

  function convertDecimalToHours(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    const hoursString = hours + " hrs";
    const minutesString = minutes.toString().padStart(2, "0") + " min ";

    return hoursString + " " + minutesString;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, currentMonth + 1, 0);

  const startDateFormatted = startDate.toISOString().split("T")[0];
  const endDateFormatted = endDate.toISOString().split("T")[0];
  const monthlyRecords = tableData?.filter((record) => {
    const recordDate = new Date(record.startDate);
    const recordDateFormatted = recordDate.toISOString().split("T")[0];
    return (
      recordDateFormatted >= startDateFormatted &&
      recordDateFormatted <= endDateFormatted
    );
  });
  let totalProjectHours = 0;
  let totalCgHours = 0;
  let totalSelfHours = 0;
  let totalMentorHours = 0;
  monthlyRecords?.forEach((record) => {
    let formattedTotalTime = convertHoursToDecimal(record.totalTime);
    if (record.learning === "Project") {
      totalProjectHours += formattedTotalTime;
    } else if (record.learning === "CG Learning Videos") {
      totalCgHours += formattedTotalTime;
    } else if (record.learning === "Mentor Assigned Task") {
      totalMentorHours += formattedTotalTime;
    } else {
      totalSelfHours += formattedTotalTime;
    }
  });
  totalProjectHours = convertDecimalToHours(totalProjectHours);
  totalCgHours = convertDecimalToHours(totalCgHours);
  totalSelfHours = convertDecimalToHours(totalSelfHours);
  totalMentorHours = convertDecimalToHours(totalMentorHours);

  const techPercentages = {
    Project: parseFloat(convertToPercentageMonthly(totalProjectHours)),
    "CG Learning Video": parseFloat(convertToPercentageMonthly(totalCgHours)),
    "Self Learning": parseFloat(convertToPercentageMonthly(totalSelfHours)),
    "Task By Mentor": parseFloat(convertToPercentageMonthly(totalMentorHours)),
    Idle: Number.isInteger(
      100 -
        convertToPercentageMonthly(
          convertDecimalToHours(
            convertHoursToDecimal(totalProjectHours) +
              convertHoursToDecimal(totalCgHours) +
              convertHoursToDecimal(totalSelfHours) +
              convertHoursToDecimal(totalMentorHours)
          )
        )
    )
      ? 100 -
        convertToPercentageMonthly(
          convertDecimalToHours(
            convertHoursToDecimal(totalProjectHours) +
              convertHoursToDecimal(totalCgHours) +
              convertHoursToDecimal(totalSelfHours) +
              convertHoursToDecimal(totalMentorHours)
          )
        )
      : (
          100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              convertHoursToDecimal(totalProjectHours) +
                convertHoursToDecimal(totalCgHours) +
                convertHoursToDecimal(totalSelfHours) +
                convertHoursToDecimal(totalMentorHours)
            )
          )
        ).toFixed(2),
  };

  data.labels = Object.keys(techPercentages).map((techName) => techName);

  const legendValues = Object.values(techPercentages);
  const newValue = legendValues.map((val) => (val > 0 ? val : 0));
  data.datasets[0].data = newValue;

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "middle",
        labels: {
          boxWidth: 17,
          boxHeight: 17,
          padding: 16,
          font: {
            family: "Roboto",
            style: "normal",
            weight: "bold", 
            size: 12,
            lineHeight: 16,
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                const value = legendValues[i];
                return {
                  text: `${label} (${value}%)`,
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
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const value = dataset.data[context.dataIndex];
            const label = dataset.label;
            const formattedValue = convertToTimeFormat(value);
            return `${label}: ${formattedValue}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };


  return (
    <div className="container" style={{ height: "inherit" }}>
      <div className="row">
        <div style={{ padding: "0", margin: "0" }}>
          <div
            className="dropdown"
            style={{
              marginLeft: "1rem",
              marginTop: "0.594rem",
              marginBottom: "0.594rem",
            }}
          >
            <button
              className="btn dropdown-toggle dropdown-button"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {getMonthName(currentMonth)}
            </button>
            <ul
              className="dropdown-menu"
              style={{
                width: "123px",
                "--bs-dropdown-min-width": 0,
                borderRadius: "4px",
              }}
            >
              <DropdownItems />
            </ul>
          </div>
          <div>
            {monthlyRecords === undefined || monthlyRecords.length === 0 ? (
              <div className="no-data-div">
                <img className="no-data-img" src={NoData} alt="No Data" />
                <h1
                  style={{
                    fontFamily: "'Roboto'",
                    fontWeight: 600,
                    fontSize: "30px",
                    color: "#343435",
                  }}
                >
                  No data found
                </h1>
              </div>
            ) : (
              <div
                style={{
                  width: "394px",
                  height: "220px",
                  // position: "absolute",
                }}
              >
                <Pie data={data} options={options} width={158} height={158} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
