import React, { useEffect, useState } from "react";
import "./MentorAssignTask.css";
import { ReactComponent as Arrorforward } from "../../../Assets/arrow_forward_iosarrow.svg";
import Header from "../../Header/Header";
import MentorAssignNewTask from "./MentorAssignNewTask";
import MentorTaskDetail from "./MentorTaskDetail";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

export const TASKDATA = {
  TID: "taskId",
  TN: "taskName",
  TDES: "taskDescription",
  SD: "startDate",
  ED: "endDate",
  AD: "assignedDate",
  RT: "ratedTask",
  TECH: "technology",
  UI: "userInfo",
  N: "name",
  UID: "userId",
  TD: "taksDone",
  TL: "taskLink",
  OS: "overallScore",
  TCD: "taskCompleteDate",
  MFN: "mentorFirstName",
  MLN: "mentorLastName",
};

const MentorAssignTask = () => {
  //data
  const navigate = useNavigate();
  const [adminTask, setAdminTask] = useState([]);
  const [taskInd, setTaskInd] = useState(0);
  const data = localStorage.getItem("userData");
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  let parsedObject;
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }
  const mentorId = parsedObject["userId"];
  const cancelToken = axios.CancelToken.source();
  const fetchData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/v4/mentor-tasks?mentorId=${parsedObject["userId"]}`,
        {
          headers: { Authorization: `Bearer ${parsedObject["token"]}` },
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        setAdminTask(res.data.response);
      })
      .catch((error) => {
        const errorCode = error.response.status;
        if (errorCode === 401) {
          navigate("/error/statusCode=401");
        }
        if (errorCode === 400) {
          navigate("/error/statusCode=400");
        }
        if (errorCode === 500) {
          navigate("/error/statusCode=500");
        }
        if (errorCode === 404) {
          navigate("/error/statusCode=404");
        }
      });
  };
  //function
  useEffect(() => {
    fetchData();
    return () => {
      cancelToken.cancel("request cancelled");
    };
  }, []);
  return (
    <div className="mentortask-parent-div">
      <div style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="mentortask-parent-wrapper">
        <div className="mentortask-header-wrapper">
          <span>Assign Task</span>
          <MentorAssignNewTask mentorId={mentorId} fetchData={fetchData} />
        </div>
        <div className="mentortask-data-wrapper">
          <div className="task-heading-wrapper">
            {adminTask?.map((task, index) => {
              return (
                <div
                  key={index}
                  className="task-heading-inner-wrapper"
                  onClick={() => setTaskInd(index)}
                >
                  {taskInd === index && <div className="selected-task-style" />}
                  <div className="task-heading-head">
                    <h5 style={{ marginBottom: "0" }}>{task?.[TASKDATA.TN]}</h5>
                    <Arrorforward />
                  </div>
                  <div className="task-heading-body">
                    <p style={{ marginBottom: "0" }}>
                      {task?.[TASKDATA.TDES]?.length > 80
                        ? `${task?.[TASKDATA.TDES].slice(0, 80)}...`
                        : task?.[TASKDATA.TDES]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="task-seperation-line" />
          <MentorTaskDetail detail={adminTask[taskInd]} />
        </div>
      </div>
    </div>
  );
};

export default MentorAssignTask;
