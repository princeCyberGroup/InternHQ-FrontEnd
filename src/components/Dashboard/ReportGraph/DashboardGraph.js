// import "./styles.css";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import './graph.css';


const data = [
  {
    name: "Mon",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2400
  },
  {
    name: "Tue",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2210
  },
  {
    name: "Wed",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2290
  },
  {
    name: "Thu",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2000
  },
  {
    name: "Fri",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2000
  },
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

const dataMonthly = [
  {
    name: "Week 1",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2400
  },
  {
    name: "Week 2",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2210
  },
  {
    name: "Week 3",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2290
  },
  {
    name: "Week 4",
    "CG Learning": 520,
    "Self Learning": 370,
    "Task By Mentor": 460,
    "Project": 511,
    "Other": 621,
    amt: 2000
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
  const [graphType, setGraphType] = useState('daily')

  const setGraphData = (type) => {
    setGraphType(type)

  }

  // const getPath = (x, y, width, height) => {
  //     return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  //     ${x + width / 2}, ${y}
  //     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  //     Z`;
  //   };


  return (

    <>
      <div class="report p-3">
        <div class="card-body">
          <div>
            <div class="d-flex justify-content-between">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary-outline" onClick={() => setGraphData('daily')}>Daily Hours</button>
                <button type="button" class="btn btn-primary-outline" onClick={() => setGraphData('monthly')}>Monthly Hours</button>
              </div>
              <div class="dropdown show">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Jan
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
            </div>
          </div>
            <BarChart
              width={700}
              height={300}
              data={graphType === 'daily' ? data : dataMonthly}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              {/* <div className="legend-gap" > */}
                <Legend layout="vertical" height={50} verticalAlign="right" align="right" />
                <Bar dataKey="CG Learning" stackId="a" fill="#B2B2B3" barSize={20}/>
                <Bar dataKey="Self Learning" stackId="a" fill="#FF8311" barSize={20} />
                <Bar dataKey="Task By Mentor" stackId="a" fill="#FFB81C" barSize={20} />
                <Bar dataKey="Project" stackId="a" fill="#28519E" barSize={20} />
                <Bar dataKey="Other" stackId="a" fill="#2DC26B" barSize={20} />
              {/* </div> */}

            </BarChart>
          </div>
        </div>
    </>
  );
}
