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
import { ReactComponent as Right } from "../../../../Assets/chevron-right.svg";
import { ReactComponent as Completed } from "../../../../Assets/Task Status.svg";
import { ReactComponent as Ongoing } from "../../../../Assets/Task StatusOngoing.svg";
import { ReactComponent as Overdue } from "../../../../Assets/Task Statusoverdue.svg";
import { Link } from "react-router-dom";
import "./TaskStatus.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

function getInitials(name) {
  const names = name?.split(" ");
  const initials = names?.map((n) => n.charAt(0).toUpperCase());
  return initials?.join("");
}

export const TaskStatus = (props) => {
  const [taskStatus, setTaskStatus] = useState();

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
  var userId = parsedObject.userId;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [props.selectedBatches]);

  const fetchData = async () => {
    try {
      let apiUrl = `${process.env.REACT_APP_API_URL}/api/v4/dashboard-task-status?mentorId=${userId}`;
      
      if (props.selectedBatches.length > 0) {
        // const batchNames = props.selectedBatches.map(Batch => Batch.batchName);
        // const batchNamesQuery = batchNames.join(',');
        // console.log(batchNamesQuery);
        // apiUrl += `&batch=${batchNamesQuery}`;
        const batchNamesQuery = props.selectedBatches.join(',');
        console.log(batchNamesQuery);
      apiUrl += `&batch=${encodeURIComponent(batchNamesQuery)}`;
      }
      
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      });
  
      const data = await response.json();
  
      setTaskStatus(data.response);
      console.log(data.response, "This is task Status");
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
    }
  };
  


  return (


    <>
    <p className="p-0 m-0">
      <Link
        to="/mentor/assign-task"
        className="about-link p-0"
        // style={{ width: "757px", maxHeight: "360px", overflow: "auto" }}
      >
        Manage Associate Task Status <Right style={{marginBottom: "2px" }} />
      </Link>
      </p>
      <div className="card task-status-card ">
        {taskStatus && taskStatus?.map((task) => (
          <div
            key={task.taskId}
            className="each-task mb-2"
            style={{ width: "100%" }}
          >
            <h5 className="mb-3">{task.taskName}</h5>
            <div
              className="accordion "
              id={`accordion-${task.taskId}`}
              style={{ width: "100%" }}
            >
              {task.batchUsers.map((batchUser, index) => (
                <div className="mb-3 batch-accord" key={index}>
                  <h2
                    className="accordion-header"
                    id={`heading-${task.taskId}-${index}`}
                  >
                    <button
                      className="accordion-button batch-accord-btn collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${task.taskId}-${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${task.taskId}-${index}`}
                    >
                      {batchUser.batchName}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${task.taskId}-${index}`}
                    className="accordion-collapse collapse "
                    aria-labelledby={`heading-${task.taskId}-${index}`}
                    data-bs-parent={`#accordion-${task.taskId}`}
                  >
                    <div className="accordion-body">
                      {batchUser.users.map((user, userIndex) => (
                        <div
                          key={user.user_id}
                          className="card associate-mapped-card-task"
                        >
                          <div className="row d-flex justify-content-space-between">
                            <div className="col-8 d-flex align-items-center">
                              <div className="row">
                                <div className="col-4 frame pointer">
                                  <p
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginTop: "0.938rem",
                                    }}
                                  >
                                    {getInitials(user.name)}
                                  </p>
                                </div>
                                <div className="col-4 pointer">
                                  <div className="frame-text">{user.name}</div>
                                  <div className="frame-id-task">
                                    {user.internId}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 task-status">
                              {/* {user.task_done ? (
                                user.task_complete_date ? (
                                  <>
                                    <Completed />
                                    <div className="mt-1 frame-id-task">
                                      {formatDate(user.task_complete_date)}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <Ongoing />
                                    <div className="mt-1 frame-id-task">
                                      {formatDate(task.endDate)}
                                    </div>
                                  </>
                                )
                              ) : (
                                <>
                                  <Overdue />
                                  <div className="mt-1 frame-id-task">
                                    {formatDate(task.endDate)}
                                  </div>
                                </>
                              )} */}
                              {user.task_done ? (
                                  user.task_complete_date ? (
                                    <>
                                      <Completed />
                                      <div className="mt-1 frame-id-task">
                                        {formatDate(user.task_complete_date)}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <Ongoing />
                                      <div className="mt-1 frame-id-task">
                                        {formatDate(task.endDate)}
                                      </div>
                                    </>
                                  )
                                ) : (
                                  new Date() <= new Date(task.endDate) ? (
                                    <>
                                      <Ongoing />
                                      <div className="mt-1 frame-id-task">
                                        {formatDate(task.endDate)}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <Overdue />
                                      <div className="mt-1 frame-id-task">
                                        {formatDate(task.endDate)}
                                      </div>
                                    </>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
