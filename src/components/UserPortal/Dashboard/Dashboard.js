import React, { useState } from "react";
import DailyTaskTracker from "./DailyTaskTracker/DailyTaskTracker";
import ProjectComponent from "./ProjectIdea/ProjectComponent";
import DashboardGraph from "./ReportGraph/DashboardGraph";
import { NotificationComponent } from "./Notification/Notifications";
import MentorComponent from "./MentorList/MentorList";

import "./dashboard.css";
import Header from "../../Header/Header";

const Dashboard = () => {
  return (
    <>
    <div className="" style={{marginBottom:"5rem"}}>
      <Header />
    </div>

      <div className="responsiveness">
        <>
          <div className="container-fluid">
            <div className="mt-3 das-card-wrapper-row1">
              <div className="">
                <DailyTaskTracker />
              </div>
              <div className="">
                <ProjectComponent />
              </div>
              <div className="">
                <MentorComponent />
                {/* <KYMEmpty/> */}
              </div>
            </div>
            <div className="mt-2 das-card-wrapper-row2">
              <div className="" style={{ height: "376px" }}>
                <DashboardGraph/>
                {/* <EmptyGraph/> */}
              </div>
              <div
                className="mt-2"
                style={{ height: "378px", width: "23.65rem" }}
              >
                <NotificationComponent />
                {/* <EmptyNoti/>*/}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Dashboard;
