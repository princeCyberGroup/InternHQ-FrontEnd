import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Header from "../../Header/Header";
import { NotificationComponent } from "./Notification/Notifications";
import { TrainingCalender } from "./TrainingCal/TrainingCal";
import { TaskStatus } from "./TaskStatus/TaskStatus";
import { SkillAlerts } from "./SkillAlerts/SkillAlerts";
import Status from "./Status/Status";
import "./MentorDashboard.css";

const MentorDashboard = () => {
  const [StatusData, setStatusData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  const navigate = useNavigate();
  var parsedObject;
  const data = localStorage.getItem("userData");
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }

  useEffect(() => {
    fetchData();
    // InsightData();
  }, [selectedBatches]);

  const fetchData = async () => {
    try {
      let apiUrl = `${process.env.REACT_APP_API_URL}/api/v4/dashboard-status`;
      
      if (selectedBatches.length > 0) {
        // const batchNames = props.selectedBatches.map(Batch => Batch.batchName);
        // const batchNamesQuery = batchNames.join(',');
        // console.log(batchNamesQuery);
        // apiUrl += `&batch=${batchNamesQuery}`;
        const batchNamesQuery = selectedBatches.join(',');
        console.log(batchNamesQuery);
      apiUrl += `?&batch=${encodeURIComponent(batchNamesQuery)}`;
      }
      
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      });
  
      const rsp = await response.json();
      console.log(rsp, "This is dashboard status");
      setStatusData(rsp);
    }
    // try {
    //   const response = await fetch(
    //     process.env.REACT_APP_API_URL + `/api/v4/dashboard-status`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${parsedObject["token"]}`,
    //       },
    //     }
    //   );
    //   if (response.status === 401) {
    //     navigate("/error/statusCode=401");
    //   }
    //   if (response.status === 400) {
    //     navigate("/error/statusCode=400");
    //   }
    //   if (response.status === 500) {
    //     navigate("/error/statusCode=500");
    //   }
    //   if (response.status === 404) {
    //     navigate("/error/statusCode=404");
    //   }
    //   const rsp = await response.json();
    //   console.log(rsp, "This is dashboard statuis");
    //   setStatusData(rsp);
    // } 
    catch (error) {
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
      console.log("this is error", error);
    }
  };

  return (
    <>
      <div className="" style={{ marginBottom: "5rem" }}>
        <Header
          selectedBatches={selectedBatches}
          setSelectedBatches={setSelectedBatches}
        />
      </div>
      {/* write your code below */}
      <div className="responsivenessM ">
        <>
          <div className="row">
            <div className="col-4 p-0" style={{ marginLeft: "56px" }}>
              <div className="row ">
                <div className="col-6 outer-row-info">
                  <Status data={StatusData} selectedBatches={selectedBatches} />
                </div>
              </div>
              <div className="row">
                <div className="col-6 outer-row-info">
                  <TrainingCalender selectedBatches={selectedBatches} />
                </div>
              </div>
            </div>

            <div className="col-7 p-0" style={{ marginLeft: "-1rem" }}>
              <div className="row">
                <TaskStatus selectedBatches={selectedBatches} />
              </div>
              <div className="row mt-3">
                <SkillAlerts selectedBatches={selectedBatches} />
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default MentorDashboard;
