import React, { useState } from "react";
import DailyTaskTracker from "./DailyTaskTracker/DailyTaskTracker";
import DailyUpdateTable from "../DailyUpdateTable/DailyUpdateTable";
import { AddNewProjectComponent } from "./ProjectIdea/ProjectComponent";
import DashboardGraph from "./ReportGraph/DashboardGraph";
import { NotificationComponent } from "./Notification/Notifications";
import { MentorComponent } from "./MentorList/MentorList";

import "./dashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header";
const Dashboard = () => {
  const [currPage, setCurrPage] = useState("dashboard");
  const [dashNav, setDashNav] = useState("dashboard");

  const changePage = (type) => {
    console.log("working");
    setDashNav(type);
    setCurrPage(type);
  };

  return (
    // <div>Dashboard</div>
    <>
      <Header />

      <div className="responsiveness">
        <>
          <div class="container-fluid">
            <div class="row mt-3">
              <div class=" col-md-4 ps-3">
                <DailyTaskTracker />
              </div>
              <div class="col-md-4 ps-3">
                <AddNewProjectComponent />
              </div>
              <div class="col-md-4 ps-1">
                <MentorComponent />
              </div>
            </div>
            <div class="row mt-3 ">
              <div class="col-md-8">
                <DashboardGraph />
              </div>
              <div class="col-md-4  ps-1">
                <NotificationComponent />
              </div>
            </div>
          </div>
        </>
      </div>
   </>
  );
};

export default Dashboard;
