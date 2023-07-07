// import React, { useState, useEffect } from "react";
// import "./DetailedLog.css";
// import { ReactComponent as NoTask } from "../../../../Assets/Group 3EmpGraph.svg";
// import axios from "axios";
// import CryptoJS from "crypto-js";
// const DetailedCard = () => {


 
// //   useEffect(() => {
// //     const secretkeyUser = process.env.REACT_APP_USER_KEY;
// //     var parsedObject;
// //     const data = localStorage.getItem("userData");
// //     if (data) {
// //       const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
// //       const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
// //       parsedObject = JSON.parse(decryptedJsonString);
// //     } else {
// //       console.log("No encrypted data found in localStorage.");
// //     }
// //     // Fetch logs from the API
// //     axios
// //       .get(process.env.REACT_APP_API_URL + "/api/v2/getAssignedTask", {
// //         headers: {
// //           Authorization: `Bearer ${parsedObject["token"]}`,
// //         },
// //       })
// //       .then((response) => {
// //         setLogs(response.data.response);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching tasks:", error);
// //       });
// //   }, []);



//   return (
//     <>
      
//           <div className="card empty-log-state d-flex justify-content-center align-items-center" style={{marginTop:"39px"}}>
//             <div
//               className="col-12 d-flex justify-content-center"
//               // style={{ marginTop: "70px" }}
//             >
//               <NoTask />
//             </div>
//             <div className="col-12 d-flex justify-content-center assign-task-empty">
//               <p>No Logs Yet! </p>
//             </div>
//           </div>
        
              
        

//     </>
//   );
// };

// export default DetailedCard;



import React, { useState, useEffect } from "react";
import "./DetailedLog.css";
import { ReactComponent as NoTask } from "../../../../Assets/Group 3EmpGraph.svg";
import axios from "axios";
import CryptoJS from "crypto-js";



function getInitials(name) {
  const names = name?.split(" ");
  const initials = names?.map((n) => n.charAt(0).toUpperCase());
  return initials?.join("");
}

const DetailedCard = (props) => {
  const initials = getInitials(props.selectedUser?.name);
  console.log(props.logData);
// const [logs,setLogs]=useState([]);

  // useEffect(() => {
  //   // Fetch logs from the API based on the selected user
  //   if (props.selectedUser) {
  //     const secretkeyUser = process.env.REACT_APP_USER_KEY;
  //     var parsedObject;
  //     const data = localStorage.getItem("userData");
  //     if (data) {
  //       const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
  //       const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
  //       parsedObject = JSON.parse(decryptedJsonString);
  //     } else {
  //       console.log("No encrypted data found in localStorage.");
  //     }

  //     axios
  //       .get(
  //         process.env.REACT_APP_API_URL + "/api/v2/getMentorDetails",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${parsedObject["token"]}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         setLogs(response.data.response);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching tasks:", error);
  //       });
  //   }
  // }, [props.selectedUser]);

  return (
    <>

        {props.selectedMentor ? (
          // Display user details if props.selectedUser is not null
          <div className="card empty-log-state d-flex " style={{marginTop:"39px"}}>
            <div className="log-header-detailed">
            <div className="row mentor-wrapper">
            <div
                
              className="col-4 frame pointer"
            >
              <div className="image-box1">
                {props.selectedMentor.imageUrl ? (
                  <img
                    key={props.selectedMentor.mentorId}
                    src={props.selectedMentor.imageUrl}
                    width={38}
                    alt=""
                  />
                ) : (
                  { initials }
                )}
              </div>
            </div>
            <div
              className="col-4 pointer"
            >
              <div className="frame-text">{props.selectedMentor.mentorName}</div>
              <div className="frame-id">{props.selectedMentor.designation}</div>
            </div>
          </div>
          </div>
          </div>
        ) : props.selectedUser ?
        (
          <div className="card empty-log-state d-flex " style={{marginTop:"39px"}}>
             <div className="log-header-detailed">
            <div className=" row mentor-wrapper">
            <div
                
              className="col-4 frame pointer"
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "0.938rem",
                }}
              >
                {initials}
              </p>
            </div>
            <div
                
              className=" col-4 pointer"
            >
              <div className="frame-text">{props.selectedUser.name}</div>
              <div className="frame-id">{props.selectedUser.intId}</div>
            </div>
          </div>
            </div>
            <div className="card-body" style={{maxHeight:"100vh",overflow:"auto"}}>
            {props.logData.map((log, index) => (
        <div key={index}>
          <p>Date: {log.logDate}</p>
          <ul>
            {log.logTime.map((timeActivity, i) => {
              const [time, activity] = Object.entries(timeActivity)[0];
              return (
                <li key={i}>
                  Time: {time}, Activity: {activity}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
            </div>
          </div>
        )
        :
         (
          
          <div className="card empty-log-state d-flex justify-content-center" style={{marginTop:"39px"}}>
          <div className="col-12 d-flex justify-content-center">
            <NoTask />
          </div>
          <div className="col-12 d-flex justify-content-center assign-task-empty">
            <p>No Logs Yet! </p>
          </div>
          </div>
          
        )}
      
    </>
  );
};

export default DetailedCard;
