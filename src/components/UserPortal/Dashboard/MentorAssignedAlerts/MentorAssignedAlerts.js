// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import "../Notification/Notification.css";
// import { useEffect, useState } from "react";
// import { ReactComponent as EmptyMentorAssigned } from "../../../../Assets/EmptyMentorAssigned.svg";

// const MentorAssignedAlerts = (props) => {
//   const [hasNewNotification, setHasNewNotification] = useState(props.setState);
//   const [mentorTask, setMentorTask] = useState([]);
//   const [notification, setNotification] = useState(false);


//   props.func(mentorTask);

//   const handleNotificationClick = () => {
//     if (hasNewNotification) {
//       setHasNewNotification(false);
//     }
//     setNotification(!notification);
//   };

//   var storedObject = localStorage.getItem("userData");
//   var parsedObject = JSON.parse(storedObject);
//   var userId = parsedObject.userId;

//   useEffect(() => {
//     setHasNewNotification(props.setState);
//     fetchData();
//   }, [props.setState]);

//   const fetchData = async () => {
//     await fetch(
//       process.env.REACT_APP_API_URL+`/api/v2/getAssignedNotification?userId=${userId}`,
//       {
//         headers: {
//           Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
//         },
//       }
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then(async (data) => {
//         setMentorTask(data.response);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <FontAwesomeIcon
//           icon={faBell}
//           shake={hasNewNotification}
//           size="lg"
//           onClick={handleNotificationClick}
//           style={{
//             color: "#002c3f",
//             cursor: "pointer",
//             marginRight: "2rem",
//           }}
//         />
//         <div
//           style={{
//             backgroundColor:hasNewNotification && !notification ? "red" : "",
//             width: "0.5rem",
//             height: "0.5rem",
//             borderRadius: "50%",
//             position: "absolute",
//             right: "8.813rem",
//             top: "1.313rem",
//           }}
//         ></div>
//       </div>
//       <div style={{ display: notification ? "block" : "none" }}>
//         {
//           mentorTask.length!==0 ? (
//             <div
//               className="card"
//               style={{
//                 position: "absolute",
//                 right: "1.5rem",
//                 top: "3.8rem",
//                 width: "21rem",
//                 zIndex: 4,
//                 boxShadow: "0 0.25rem 1.25rem rgba(40, 52, 73, 0.15)",
//                 borderRadius: "0.5rem",
//               }}
//             >
//               <div className="card-header p-0 border-0">
//                 <div
//                   className="border-bottom p-0"
//                   style={{
//                     borderRadius: "0.438rem 0.438rem 0 0",
//                     position: "sticky",
//                     top: "0",
//                     zIndex: "3",
//                     backgroundColor: "#fff",
//                   }}
//                 >
//                   <h5
//                     className="card-title p-3 m-0"
//                     style={{
//                       fontFamily: "Roboto",
//                       fontWeight: 600,
//                       fontSize: "1rem",
//                       lineHeight: "1.18rem",
//                       color: "#343435",
//                     }}
//                   >
//                     Mentor Assigned Task
//                   </h5>
//                 </div>
//               </div>
//               <div
//                 className="card-body pt-0 pb-0"
//                 style={{ height: "20rem", overflow: "scroll" }}
//               >
//                 {mentorTask?.map((data, key) => {
//                   return (
//                     <div
//                       className="notification-wrapper px-0"
//                       style={{ width: "18.9rem", alignItems: "center" }}
//                       key={key}
//                     >
//                       <div
//                         className=""
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <div className="background-set">
//                           {data.firstName?.toUpperCase().slice(0, 1)}
//                           {data.lastName?.toUpperCase().slice(0, 1)}
//                         </div>
//                       </div>
//                       <div className="text-wrapper ps-0 ">
//                         <p className="card-text ">
//                           <b>
//                             {data.firstName} {data.lastName}
//                           </b>{" "}
//                           has assigned you <b>{data.taskName}</b> task
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ) : (
//             // empty state
//             <div
//               className="card"
//               style={{
//                 position: "absolute",
//                 right: "1.5rem",
//                 top: "3.8rem",
//                 maxWidth: "21rem",
//                 zIndex: 4,
//                 boxShadow: "0 0.25rem 1.25rem rgba(40, 52, 73, 0.15)",
//                 borderRadius: "0.5rem",
//               }}
//             >
//               <div className="card-header p-0 border-0">
//                 <div
//                   className="border-bottom p-0"
//                   style={{
//                     borderRadius: "0.438rem 0.438rem 0 0",
//                     position: "sticky",
//                     top: "0",
//                     zIndex: "3",
//                     backgroundColor: "#fff",
//                   }}
//                 >
//                   <h5
//                     className="card-title p-3 m-0"
//                     style={{
//                       fontFamily: "Roboto",
//                       fontWeight: 600,
//                       fontSize: "1rem",
//                       lineHeight: "1.18rem",
//                       color: "#343435",
//                     }}
//                   >
//                     Mentor Assigned Task
//                   </h5>
//                 </div>
//               </div>
//               <div
//                 className="card-body d-flex justify-content-center align-items-center"
//                 style={{ height: "20rem" }}
//               >
//                 <div className="row">
//                   <div className="row">
//                     <div className="col d-flex justify-content-center">
//                       <EmptyMentorAssigned />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col">
//                       <h2
//                         className="text-center"
//                         style={{
//                           fontFamily: "'Roboto'",
//                           marginTop: "0.75rem",
//                           fontStyle: "normal",
//                           width: "18.9rem",
//                           fontWeight: 600,
//                           fontSize: "1.25rem",
//                           lineHeight: "1.438rem",
//                           color: "#343435",
//                         }}
//                       >
//                         No Notifications
//                       </h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )
//         }
//       </div>
//     </>
//   );
// };

// export default MentorAssignedAlerts;
