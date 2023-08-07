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

export const TaskStatus = () => {
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
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/api/v4/dashboard-task-status?mentorId=${userId}`, //&batch=${batch}
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
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
    // <>
    //   <Link
    //     to=""
    //     className="about-link p-0"
    //     style={{ width: "757px", maxHeight: "360px", overflow: "auto" }}
    //   >
    //     Manage Associate Task Status <Right style={{ marginBottom: "2px" }} />
    //   </Link>
    //   <div
    //     className="card task-status-card mt-3"
    //     //   style={{width:"757px",maxHeight:"360px",overflow:"auto"}}
    //   >
    //     <div className="each-task mb-2" style={{ width: "100%"}}>
    //       <h5 className="mb-3">Ecospace</h5>
    //     <div class="accordion mb-3" id="accordionExample" style={{ width: "100%"}}>
    //       <div class="accordion-item">
    //         <h2 class="accordion-header" id="headingOne">
    //           <button
    //             class="accordion-button"
    //             type="button"
    //             data-bs-toggle="collapse"
    //             data-bs-target="#collapseOne"
    //             aria-expanded="true"
    //             aria-controls="collapseOne"
    //           >
    //             Batch #1
    //           </button>
    //         </h2>
    //         <div
    //           id="collapseOne"
    //           class="accordion-collapse collapse show"
    //           aria-labelledby="headingOne"
    //           data-bs-parent="#accordionExample"
    //         >
    //           <div class="accordion-body">
    //             <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     John Doe
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 100
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Completed/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     Marvin McKinney
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 101
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Overdue/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     Cameron Williamson
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 102
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Ongoing/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="accordion-item">
    //         <h2 class="accordion-header" id="headingTwo">
    //           <button
    //             class="accordion-button collapsed"
    //             type="button"
    //             data-bs-toggle="collapse"
    //             data-bs-target="#collapseTwo"
    //             aria-expanded="false"
    //             aria-controls="collapseTwo"
    //           >
    //             Batch #2
    //           </button>
    //         </h2>
    //         <div
    //           id="collapseTwo"
    //           class="accordion-collapse collapse"
    //           aria-labelledby="headingTwo"
    //           data-bs-parent="#accordionExample"
    //         >
    //           <div class="accordion-body">
    //           <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     John Doe
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 100
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Completed/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="accordion-item">
    //         <h2 class="accordion-header" id="headingThree">
    //           <button
    //             class="accordion-button collapsed"
    //             type="button"
    //             data-bs-toggle="collapse"
    //             data-bs-target="#collapseThree"
    //             aria-expanded="false"
    //             aria-controls="collapseThree"
    //           >
    //             Batch #3
    //           </button>
    //         </h2>
    //         <div
    //           id="collapseThree"
    //           class="accordion-collapse collapse"
    //           aria-labelledby="headingThree"
    //           data-bs-parent="#accordionExample"
    //         >
    //           <div class="accordion-body">
    //           <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     John Doe
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 100
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Completed/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     </div>

    //     <div className="each-task mb-2" style={{ width: "100%"}}>
    //       <h5 className="mb-3">Create the user flow for the mentor conducting the sessions.</h5>
    //     <div class="accordion mb-3" id="accordionExample" style={{ width: "100%"}}>
    //       <div class="accordion-item">
    //         <h2 class="accordion-header" id="headingOne">
    //           <button
    //             class="accordion-button"
    //             type="button"
    //             data-bs-toggle="collapse"
    //             data-bs-target="#collapseOne"
    //             aria-expanded="true"
    //             aria-controls="collapseOne"
    //           >
    //             Batch #1
    //           </button>
    //         </h2>
    //         <div
    //           id="collapseOne"
    //           class="accordion-collapse collapse show"
    //           aria-labelledby="headingOne"
    //           data-bs-parent="#accordionExample"
    //         >
    //           <div class="accordion-body">
    //             <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     John Doe
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 100
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Completed/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="accordion-item">
    //         <h2 class="accordion-header" id="headingTwo">
    //           <button
    //             class="accordion-button collapsed"
    //             type="button"
    //             data-bs-toggle="collapse"
    //             data-bs-target="#collapseTwo"
    //             aria-expanded="false"
    //             aria-controls="collapseTwo"
    //           >
    //             Batch #2
    //           </button>
    //         </h2>
    //         <div
    //           id="collapseTwo"
    //           class="accordion-collapse collapse"
    //           aria-labelledby="headingTwo"
    //           data-bs-parent="#accordionExample"
    //         >
    //           <div class="accordion-body">
    //           <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     John Doe
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 100
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Completed/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="accordion-item">
    //         <h2 class="accordion-header" id="headingThree">
    //           <button
    //             class="accordion-button collapsed"
    //             type="button"
    //             data-bs-toggle="collapse"
    //             data-bs-target="#collapseThree"
    //             aria-expanded="false"
    //             aria-controls="collapseThree"
    //           >
    //             Batch #3
    //           </button>
    //         </h2>
    //         <div
    //           id="collapseThree"
    //           class="accordion-collapse collapse"
    //           aria-labelledby="headingThree"
    //           data-bs-parent="#accordionExample"
    //         >
    //           <div class="accordion-body">
    //           <div
    //               //   key={userData.userId}
    //               className="card associate-mapped-card-task"
    //             >
    //               <div className=" row d-flex justify-content-space-between">
    //                 <div className="col-8 d-flex align-items-center">
    //                   <div className="row">
    //                 <div
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className="col-4 frame pointer"
    //                 >
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       marginTop: "0.938rem",
    //                     }}
    //                   >
    //                     {initials}
    //                   </p>
    //                 </div>
    //                 <div
    //                 //   style={{ width: "19.75rem" }}
    //                   //   onClick={() => {
    //                   //     handleOnUserclick(userData.userId);
    //                   //   }}
    //                   className=" col-4 pointer"
    //                 >
    //                   <div className="frame-text">
    //                     {/* {userData.name} */}
    //                     John Doe
    //                     </div>
    //                   <div className="frame-id-task">
    //                     {/* {userData.intId} */}
    //                     INT 100
    //                     </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //               <div className="col-4 task-status">
    //               <div className="">
    //                     {/* {userData.name} */}
    //                     <Completed/>
    //                     </div>
    //                   <div className="mt-1 frame-id-task">
    //                     {/* {userData.intId} */}
    //                     26-07-2023
    //                     </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     </div>
    //   </div>
    // </>

    <>
      <Link
        to="/mentor/assign-task"
        className="about-link p-0"
        style={{ width: "757px", maxHeight: "360px", overflow: "auto" }}
      >
        Manage Associate Task Status <Right style={{ marginBottom: "2px" }} />
      </Link>
      <div className="card task-status-card mt-3">
        {taskStatus?.map((task) => (
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
                                <>
                                  <Overdue />
                                  <div className="mt-1 frame-id-task">
                                    {formatDate(task.endDate)}
                                  </div>
                                </>
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
