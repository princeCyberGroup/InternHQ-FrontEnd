import { useState, useEffect } from "react";
// import "./Notification.css";
// import NotificationContentSkeleton from "./NotificationContentSkeleton";
// import EmptyNotification from "../EmptyStates/EmptyNoti/EmptyNoti";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
// import "./TrainingCal.css";
import { ReactComponent as AngularIcon } from "../../../../Assets/angular.svg";
import { ReactComponent as Calender } from "../../../../Assets/Calendar.svg";
import { ReactComponent as TimeLogo } from "../../../../Assets/clock-regular 1logClock.svg";
import { ReactComponent as Right } from "../../../../Assets/right.svg";
import { ReactComponent as Pass } from "../../../../Assets/PassIcon.svg";
import { ReactComponent as Fail } from "../../../../Assets/FailIcon.svg";
import { Link } from "react-router-dom";
import "./SkillAlerts.css";
import SkillAlertSkeleton from "./SkillAlertSkeleton";

export const SkillAlerts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchNotifications();
    }, 1000);
  }, []);

  const fetchNotifications = async () => {
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
    try {
      // Make an API request to fetch data
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v4/mentor-notification",
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      const data = await response.json();
      setNotifications(data);
      // console.log(data.pass);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (error.response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (error.response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (error.response.status === 404) {
        navigate("/error/statusCode=404");
      }
      console.log("Error occurred while fetching notificatons:", error);
    }
  };

  return (
    <>
      <Link to="" className="about-link p-0 mb-3">
        Skill Alerts
      </Link>
      {isLoading ? (
        <>
        <div className="notification-pass card">
        <div className="pass-head">
                <Pass />
              <h5 className="card-title skill-alert-head">
                Pass
              </h5>
            </div>
        <SkillAlertSkeleton />
        <SkillAlertSkeleton />
        <SkillAlertSkeleton />
        <SkillAlertSkeleton />
        </div>
        <div className="notification-fail card">
        <div className="fail-head">
                <Fail />
              <h5 className="card-title skill-alert-head">
                Fail
              </h5>
            </div>
        <SkillAlertSkeleton />
        <SkillAlertSkeleton />
        <SkillAlertSkeleton />
        <SkillAlertSkeleton />
        </div>
      </>
      ) : (
        <>
          <div className="notification-pass card">
            <div className="pass-head">
                <Pass />
              <h5 className="card-title skill-alert-head">
                Pass
              </h5>
            </div>
            <div className="skill-alert-cover">
              {notifications?.pass?.map((notification, index) => (
                <div className="notification-pass-wrapper" key={index}>
                  <div className="image-wrapper mt-1">
                    <div className="image-box">
                      <img
                        src={notification.techImage}
                        alt={notification.techName}
                        width={32}
                      />
                    </div>
                  </div>
                  <div className="text-wrapper mt-2">
                    <p className="m-0">
                      <b>{`${notification.firstName} ${notification.lastName}`}</b>{" "}
                      has achieved <b>{notification.level}</b> skill on{" "}
                      <b>{notification.techName}</b>
                    </p>
                    <p className="m-0 date-wrapper">{notification.examDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="notification-fail card">
            <div className="fail-head">
                <Fail/>
              <h5 className="card-title skill-alert-head">
                Fail
                </h5>
            </div>
            <div className="skill-alert-cover">
            {notifications?.fail?.map((notification, index) => (
              <div className="notification-pass-wrapper" key={index}>
                <div className="image-wrapper mt-1">
                  <div className="image-box">
                    <img
                      src={notification.techImage}
                      alt={notification.techName}
                      width={32}
                    />
                  </div>
                </div>
                <div className="text-wrapper mt-2">
                  <p className="m-0">
                    <b>{`${notification.firstName} ${notification.lastName}`}</b>{" "}
                    couldn't achieve <b>{notification.level}</b> skill on{" "}
                    <b>{notification.techName}</b>
                  </p>
                  <p className="m-0 date-wrapper">{notification.examDate}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     <Link to="" className="about-link p-0 mb-3">
  //       Skill Alerts
  //     </Link>
  //     <div className="notification-pass card">
  //       <div className="border-bottom">
  //         <h5 className="card-title dtt-hfs">Pass</h5>
  //       </div>
  //       <div className="notification-pass-wrapper">
  //         <div className="image-wrapper mt-1">
  //           <div className="image-box">
  //             <img width={32} alt="" />
  //           </div>
  //         </div>
  //         <div className="text-wrapper mt-3">
  //           <p className="m-0">
  //             <b>John Doe</b> has achieved <b>Beginner</b>
  //             <b> skill </b> on <b>Angular</b>
  //           </p>
  //           <p className="m-0 date-wrapper">25-07-2023 </p>
  //         </div>
  //       </div>
  //       <div className="notification-pass-wrapper">
  //         <div className="image-wrapper mt-1">
  //           <div className="image-box">
  //             <img width={32} alt="" />
  //           </div>
  //         </div>
  //         <div className="text-wrapper mt-3">
  //           <p className="m-0">
  //             <b>John Doe</b> has achieved <b>Beginner</b>
  //             <b> skill </b> on <b>Angular</b>
  //           </p>
  //           <p className="m-0 date-wrapper">25-07-2023 </p>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="notification-fail card">
  //       <div className="border-bottom">
  //         <h5 className="card-title dtt-hfs">Fail</h5>
  //       </div>
  //       <div className="notification-pass-wrapper">
  //         <div className="image-wrapper mt-1">
  //           <div className="image-box">
  //             <img width={32} alt="" />
  //           </div>
  //         </div>
  //         <div className="text-wrapper mt-3">
  //           <p className="m-0">
  //             <b>John Doe</b> didn't achieve <b>Beginner</b>
  //             <b> skill </b> on <b>Angular</b>
  //           </p>
  //           <p className="m-0 date-wrapper">25-07-2023 </p>
  //         </div>
  //       </div>
  //       <div className="notification-pass-wrapper">
  //         <div className="image-wrapper mt-1">
  //           <div className="image-box">
  //             <img width={32} alt="" />
  //           </div>
  //         </div>
  //         <div className="text-wrapper mt-3">
  //           <p className="m-0">
  //             <b>John Doe</b> didn't achieve <b>Beginner</b>
  //             <b> skill </b> on <b>Angular</b>
  //           </p>
  //           <p className="m-0 date-wrapper">25-07-2023 </p>
  //         </div>
  //       </div>
  //     </div>
  //     {/* <div className="card task-status-card mt-3"
  //   //   style={{width:"757px",maxHeight:"360px",overflow:"auto"}}
  //     >
  //       <div className="card cal-inner-card">
  //         <div className="col " style={{ display: "flex" }}>
  //           <AngularIcon />
  //           <h5 className="inner-cal-head">Angular</h5>
  //         </div>
  //         <div
  //           className="col "
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             width: "100%",
  //           }}
  //         >
  //           <span style={{ marginBottom: "3px" }}>
  //             <Calender />
  //           </span>
  //           <span className="cal-date">25-07-2023</span>
  //           <span style={{ marginBottom: "3px" }}>
  //             <TimeLogo />
  //           </span>
  //           <span className="cal-time mx-2">10:30 A.M - 1:00 P.M</span>
  //         </div>
  //       </div>
  //       <div className="card cal-inner-card">
  //         <div className="col " style={{ display: "flex" }}>
  //           <AngularIcon />
  //           <h5 className="inner-cal-head">Angular</h5>
  //         </div>
  //         <div
  //           className="col "
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             width: "100%",
  //           }}
  //         >
  //           <span style={{ marginBottom: "3px" }}>
  //             <Calender />
  //           </span>
  //           <span className="cal-date">25-07-2023</span>
  //           <span style={{ marginBottom: "3px" }}>
  //             <TimeLogo />
  //           </span>
  //           <span className="cal-time mx-2">10:30 A.M - 1:00 P.M</span>
  //         </div>
  //       </div>
  //       <div className="card cal-inner-card">
  //         <div className="col " style={{ display: "flex" }}>
  //           <AngularIcon />
  //           <h5 className="inner-cal-head">Angular</h5>
  //         </div>
  //         <div
  //           className="col "
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             width: "100%",
  //           }}
  //         >
  //           <span style={{ marginBottom: "3px" }}>
  //             <Calender />
  //           </span>
  //           <span className="cal-date">25-07-2023</span>
  //           <span style={{ marginBottom: "3px" }}>
  //             <TimeLogo />
  //           </span>
  //           <span className="cal-time mx-2">10:30 A.M - 1:00 P.M</span>
  //         </div>
  //       </div>
  //       <div className="card cal-inner-card">
  //         <div className="col " style={{ display: "flex" }}>
  //           <AngularIcon />
  //           <h5 className="inner-cal-head">Angular</h5>
  //         </div>
  //         <div
  //           className="col "
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             width: "100%",
  //           }}
  //         >
  //           <span style={{ marginBottom: "3px" }}>
  //             <Calender />
  //           </span>
  //           <span className="cal-date">25-07-2023</span>
  //           <span style={{ marginBottom: "3px" }}>
  //             <TimeLogo />
  //           </span>
  //           <span className="cal-time mx-2">10:30 A.M - 1:00 P.M</span>
  //         </div>
  //       </div>
  //       <div className="card cal-inner-card">
  //         <div className="col " style={{ display: "flex" }}>
  //           <AngularIcon />
  //           <h5 className="inner-cal-head">Angular</h5>
  //         </div>
  //         <div
  //           className="col "
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             width: "100%",
  //           }}
  //         >
  //           <span style={{ marginBottom: "3px" }}>
  //             <Calender />
  //           </span>
  //           <span className="cal-date">25-07-2023</span>
  //           <span style={{ marginBottom: "3px" }}>
  //             <TimeLogo />
  //           </span>
  //           <span className="cal-time mx-2">10:30 A.M - 1:00 P.M</span>
  //         </div>
  //       </div>
  //     </div> */}
  //   </>
  // );
};
