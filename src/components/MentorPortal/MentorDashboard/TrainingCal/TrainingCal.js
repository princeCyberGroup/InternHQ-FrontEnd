import { useState, useEffect } from "react";
// import "./Notification.css";
// import NotificationContentSkeleton from "./NotificationContentSkeleton";
// import EmptyNotification from "../EmptyStates/EmptyNoti/EmptyNoti";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import "./TrainingCal.css";
import Api from "./Api"
import { ReactComponent as AngularIcon } from "../../../../Assets/angular.svg";
import { ReactComponent as Calender } from "../../../../Assets/Calendar.svg";
import { ReactComponent as TimeLogo } from "../../../../Assets/clock-regular 1logClock.svg";
import { ReactComponent as Today } from "../../../../Assets/TagToday.svg";
import { ReactComponent as Tomorrow } from "../../../../Assets/TagTomorrow.svg";
import { ReactComponent as Upcoming } from "../../../../Assets/TagUpcoming.svg";
import { ReactComponent as Expired } from "../../../../Assets/TagExpired.svg";
import {ReactComponent as TrainingCalNoData} from "../../../../Assets/NoData.svg"

//Api.length=0;
export const TrainingCalender = () => {
  return (
    <>
      <p className="about-link mb-2 mt-4">Upcoming Sessions</p>
      <div className="card cal-card">
        
        {Api?.length===0?(<div className="d-block"><TrainingCalNoData className="TrainingCal-NoData" />
        <p className="TcNoData">No Session Available!!</p>
        </div>
        ):(Api.map((item, index) => (
          <div className="card cal-inner-card pt-0" key={index} style={{ paddingRight: "0" }}>
            <div className="col" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <div className="pt-2" style={{ display: "flex" }}>
                <AngularIcon />
                <h5 className="inner-cal-head">{item.techName}</h5>
              </div>
              <div className="d-flex p-0" style={{ justifyContent: "flex-end" }}>
                <Today />
              </div>
            </div>
            <div className="col" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <span style={{ marginBottom: "3px" }}>
                <Calender />
              </span>
              <span className="cal-date">{item.date}</span>
              <span style={{ marginBottom: "3px" }}>
                <TimeLogo />
              </span>
              <span className="cal-time mx-2">{item.time}</span>
            </div>
            <div className="col" style={{ display: "flex", width: "100%" }}>
              <span className="attended-batch">Attended By:</span>
              <span className="cal-batch">{item.batch}</span>
            </div>
          </div>
        )))}
       
      </div>
    </>
  );
};
