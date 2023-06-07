import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import "./graph.css";
import { Link } from "react-router-dom";

const data = [
  {
    name: "Mon",
    val: 5,
    Project: 1.3,
    "Task by Mentor": 1.3,
    "Self Learning": 1.6,
    "CG Learning Video": 1.5,
    Other: 2.3,
    // amt: 2400,
  },
  {
    name: "Tues",
    Project: 1.3,
    "Task by Mentor": 1.3,
    "Self Learning": 1.6,
    "CG Learning Video": 1.5,
    Other: 2.3,
    amt: 2210,
  },
  {
    name: "Wed",
    Project: 1.3,
    "Task by Mentor": 1.3,
    "Self Learning": 1.6,
    "CG Learning Video": 1.5,
    Other: 2.3,
    // amt: 2290,
  },
  {
    name: "Thu",
    Project: 1.3,
    "Task by Mentor": 1.3,
    "Self Learning": 1.6,
    "CG Learning Video": 1.5,
    Other: 2.3,
    // amt: 2000,
  },
  {
    name: "Fri",
    Project: 1.3,
    "Task by Mentor": 1.3,
    "Self Learning": 1.6,
    "CG Learning Video": 1.5,
    Other: 2.3,
    // amt: 2000,
  },
];

const dataMonthly = [
  {
    name: "Week 1",
    val: 40,
    Project: 6.7,
    "Task by Mentor": 5.9,
    "Self Learning": 7.4,
    "CG Learning Video": 7.5,
    Other: 12.5,
    // amt: 2400,
  },
  {
    name: "Week 2",
    Project: 6.7,
    "Task by Mentor": 5.9,
    "Self Learning": 7.4,
    "CG Learning Video": 7.5,
    Other: 12.5,
    // amt: 2210,
  },
  {
    name: "Week 3",
    Project: 6.7,
    "Task by Mentor": 5.9,
    "Self Learning": 7.4,
    "CG Learning Video": 7.5,
    Other: 12.5,
    // amt: 2290,
  },
  {
    name: "Week 4",
    Project: 6.7,
    "Task by Mentor": 5.9,
    "Self Learning": 7.4,
    "CG Learning Video": 7.5,
    Other: 12.5,
    // amt: 2000,
  },
  // {
  //   name: "Fri",
  //   "CG Learning": 520,
  //   "Self Learning": 370,
  //   "Task By Mentor": 460,
  //   "Project": 511,
  //   "Other": 621,
  //   amt: 2000
  // },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100
  //   }
];

export default function DashboardGraph() {
  const [graphType, setGraphType] = useState("daily");

  const setGraphData = (type) => {
    setGraphType(type);
  };
  const [active, setActive] = useState(true);

  const DropdownItems = () => {
    if (graphType === "daily") {
      return (
        <>
          <li>
            <Link
              className="dropdown-item pe-0"
              // href="#"
              style={{ paddingLeft: "8px", fontSize: "14px" }}
            >
              This Week
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item pe-0"
              href="#"
              style={{ paddingLeft: "8px", fontSize: "14px" }}
            >
              Previous Week
            </Link>
          </li>
        </>
      );
    } else if (graphType === "monthly") {
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
      return months.map((month) => (
        <li key={month}>
          <Link
            className="dropdown-item pe-0"
            href="#"
            style={{ paddingLeft: "8px", fontSize: "14px" }}
          >
            {month}
          </Link>
        </li>
      ));
    }
  };

  return (
    <>
      <div className="card text-center report">
        <div
          className="card-header bg-white pt-0 pb-0"
          style={{ paddingRight: "22px" }}
        >
          <div className="d-flex justify-content-between">
            <div className="btn-group" role="group">
              <div
                // className="daily"
                className={`daily center ${
                  active ? "card-heading-active" : "border-bottom-0"
                }`}
                onClick={() => {
                  setGraphData("daily");
                  setActive(true);
                }}
              >
                {/* <button
                  type="button"
                 
                > */}
                <p className="txt fw-bold me-3"> Daily Hours </p>
                {/* </button> */}
              </div>
              <div
                className={`monthly center ${
                  active ? "border-bottom-0" : "card-heading-active"
                }`}
                style={{
                  // width: "125px",
                  marginLeft: "8px",
                }}
                onClick={() => {
                  setGraphData("monthly");
                  setActive(false);
                }}
              >
                {/* <button
                  type="button"
                  
                 
                > */}
                <p className="txt fw-bold"> Monthly Hours </p>
                {/* </button> */}
              </div>
            </div>
            <div
              className="dropdown"
              style={{ marginTop: "0.694rem", marginBottom: "0.594rem" }}
            >
              <button
                className="btn dropdown-toggle dropdown-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {graphType === "daily" ? "This Week" : "January"}
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
                {/* <li>
                  <a
                    className="dropdown-item pe-0"
                    href="#"
                    style={{ paddingLeft: "8px", fontSize: "14px" }}
                  >
                    This Week
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item pe-0"
                    href="#"
                    style={{ paddingLeft: "8px", fontSize: "14px" }}
                  >
                    Previous Week
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="chart">
          <BarChart
            width={700}
            height={350}
            style={{ fontSize: "16px" }}
            data={graphType === "daily" ? data : dataMonthly}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 40,
            }}
          >
            <Tooltip
              wrapperStyle={{ backgroundColor: "#ccc", fontSize: "12px" }}
            />
            <CartesianGrid
              vertical={false}
              strokeDasharray="2"
              stroke="#B2B2B3"
            />
            <XAxis
              tick={{ stroke: "#000", strokeWidth: 0.6 }}
              padding={{ left: 8, right: 20 }}
              tickMargin={5}
              tickLine={false}
              dataKey="name"
            />
            <YAxis
              tick={{ stroke: "#000", strokeWidth: 0.6 }}
              padding={{ top: 30 }}
              tickMargin={5}
              tickLine={false}
              dataKey="val"
            />
            <Legend
              layout="vertical"
              iconSize={17}
              iconType="square"
              verticalAlign="center"
              align="right"
            />
            <Bar dataKey="Project" stackId="a" fill="#2DC26B" barSize={20} />
            <Bar
              dataKey="Task by Mentor"
              stackId="a"
              fill="#28519E"
              barSize={20}
            />
            <Bar
              dataKey="Self Learning"
              stackId="a"
              fill="#FFB81C"
              barSize={20}
            />
            <Bar
              dataKey="CG Learning Video"
              stackId="a"
              fill="#FF8311"
              barSize={20}
            />
            <Bar dataKey="Other" stackId="a" fill="#B2B2B3" barSize={20} />
          </BarChart>
        </div>
      </div>
    </>
  );
}
