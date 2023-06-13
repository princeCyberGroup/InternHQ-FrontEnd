import React, { useState } from "react";
import DailyTaskTracker from "./DailyTaskTracker/DailyTaskTracker";
import { AddNewProjectComponent } from "./ProjectIdea/ProjectComponent";
import DashboardGraph from "./ReportGraph/DashboardGraph";
import { NotificationComponent } from "./Notification/Notifications";
import { MentorComponent } from "./MentorList/MentorList";

import "./dashboard.css";
import Header from "../../Header/Header";


const Dashboard = (props) => {
  const [currPage, setCurrPage] = useState("dashboard");
  const [dashNav, setDashNav] = useState("dashboard");
  const changePage = (type) => {
    setDashNav(type);
    setCurrPage(type);
  };

  return (
    // <div>Dashboard</div>
    <>
      <Header />

      <div className="responsiveness">
        <>
          <div className="container-fluid">
            <div className="mt-3 das-card-wrapper-row1">
              <div className="">
                <DailyTaskTracker />
              </div>
              <div className="">
                <AddNewProjectComponent />
              </div>
              <div className="">
                <MentorComponent />
                {/* <KYMEmpty/> */}
              </div>
            </div>
            <div className="mt-2 das-card-wrapper-row2">
              <div className="" style={{height:"376px"}}>
                <DashboardGraph sendDataToGraph={props.sendDataToDashboard}/>
                {/* <EmptyGraph/> */}
              </div>
              <div className="mt-2" style={{height:"378px", width: "23.65rem"}}>
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