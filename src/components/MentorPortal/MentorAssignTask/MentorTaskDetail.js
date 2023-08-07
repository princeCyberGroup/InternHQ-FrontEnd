import React from "react";
import { ReactComponent as Clock } from "../../../Assets/Clock.svg";
import { ReactComponent as Completecircle } from "../../../Assets/CheckCircle.svg";
import { ReactComponent as Overduewarning } from "../../../Assets/Warning.svg";
import { ReactComponent as Ongoingflag } from "../../../Assets/Flag.svg";
import "./MentorAssignTask.css";
import { useNavigate } from "react-router-dom";
import { TASKDATA } from "./MentorAssignTask";
import CryptoJS from "crypto-js";
const MentorTaskDetail = ({ detail }) => {
  //data
  const navigate = useNavigate();
  let startDate, endDate, taskOngoing;
  let todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month number
  const day = todayDate.getDate();
  // Create a string representation of today's date in the format "YYYY-MM-DD"
  const todayDateString = `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
  //function
  const changeDate = (date) => {
    if (date === null || date === undefined) return "";
    const updatedDate = date?.split("T")[0]?.split("-");
    return `${updatedDate[1]}/${updatedDate[2]}/${updatedDate[0]}`;
  };
  const checkOverDue = () => {
    const endDateValue = endDate.split("/");
    if (parseInt(endDateValue[2]) > year) return false;
    if (parseInt(endDateValue[2]) === year && parseInt(endDateValue[0]) > month)
      return false;
    if (parseInt(endDateValue[0]) === month && parseInt(endDateValue[1]) > day)
      return false;
    return true;
  };
  const handleNavigate = () => {
    const taskId = CryptoJS.AES.encrypt(
      (detail?.[TASKDATA.TID]).toString(),
      process.env.REACT_APP_TASK_ID
    ).toString();
    const taskName = CryptoJS.AES.encrypt(
      detail?.[TASKDATA.TN],
      process.env.REACT_APP_TASK_ID
    ).toString();
    sessionStorage.setItem("taskId", taskId);
    sessionStorage.setItem("title", taskName);
    navigate("/mentor/project-rating");
  };
  startDate = changeDate(detail?.[TASKDATA.SD]);
  endDate = changeDate(detail?.[TASKDATA.ED]);
  return (
    <div className="task-detail-wrapper">
      <div className="mentortask-heading-style">{detail?.[TASKDATA.TN]}</div>
      <div
        className="mentortask-description-style"
        style={{ marginBottom: "1.5rem" }}
      >
        {detail?.[TASKDATA.TDES]}
      </div>
      <div className="mentortask-duration-wrapper">
        <div className="mentortask-meta-heading">
          <span>Duration:</span>
        </div>
        <div className="mentortask-duration-style">
          <Clock />
          <span>{`${startDate} - ${endDate}`}</span>
        </div>
      </div>
      <div className="mentortask-technology-wrapper">
        <div className="mentortask-meta-heading">
          <span>Technology Used:</span>
        </div>
        <div className="tech-used-wrapper">
          {detail?.[TASKDATA.TECH]?.map((tech, index) => {
            return (
              <div key={index} className="tech-used-div-box ">
                <span>{tech}</span>
              </div>
            );
          })}
        </div>
      </div>
      {true ? ( //show task is rated or not
        <div className="mentortask-assigned-wrapper">
          <div className="mentortask-meta-heading assign-header-style">
            <span>Assigned To:</span>
            <button onClick={handleNavigate}>Rate Assignment</button>
          </div>
          <div className="assigned-list-wrapper">
            {detail?.[TASKDATA.UI]?.map((info, index) => {
              return (
                <div key={index} className="assigned-to-wrapper">
                  <div className="name-status-wrapper">
                    <div className="name-percentage-wrapper">
                      <span>{info?.[TASKDATA.N]}</span>
                      {info?.[TASKDATA.OS] && (
                        <div>{`${info?.[TASKDATA.OS]} %`}</div>
                      )}
                    </div>
                    {info?.[TASKDATA.TD] ? ( // condition if completed
                      <div className="task-status-wrapper">
                        <div
                          className="task-completed-wrapper"
                          style={{
                            background: "#CEF0DC",
                          }}
                        >
                          <Completecircle />
                          <span>{"Completed On"}</span>
                        </div>
                        <div>{"Jul 23, 2023"}</div>
                      </div>
                    ) : !checkOverDue() ? ( // to check if it is over last date
                      <div className="task-status-wrapper">
                        <div
                          className="task-ongoing-wrapper"
                          style={{
                            background: "#F9E1C9",
                          }}
                        >
                          <Ongoingflag />
                          <span>{"Ongoing"}</span>
                        </div>
                        <div>{todayDateString}</div>
                      </div>
                    ) : (
                      <div className="task-status-wrapper">
                        <div
                          className="task-overdue-wrapper"
                          style={{
                            background: "#FAD3CE",
                          }}
                        >
                          <Overduewarning />
                          <span>{"Overdue"}</span>
                        </div>
                        <div>{todayDateString}</div>
                      </div>
                    )}
                  </div>
                  {info?.[TASKDATA.TL] !== null &&
                    info?.[TASKDATA.TL] !== undefined && (
                      <div>
                        <span>GitHub Link:</span>
                        <a href="#">{info?.[TASKDATA.TL]}</a>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>It is unrated task</div>
      )}
    </div>
  );
};

export default MentorTaskDetail;
