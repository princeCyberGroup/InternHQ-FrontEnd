import React,{useState} from "react";
import "./DetailedLog.css";
import { ReactComponent as NoTask } from "../../../../Assets/Group 3EmpGraph.svg";
import { ReactComponent as Clock } from "../../../../Assets/clock-regular 1logClock.svg";
import { ReactComponent as Filter } from "../../../../Assets/Filter.svg";



function formatDate(dateString) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getInitials(name) {
  const names = name?.split(" ");
  const initials = names?.map((n) => n.charAt(0).toUpperCase());
  return initials?.join("");
}

const DetailedCard = (props) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState(null);

  const initials = getInitials(props.selectedUser?.name);
  console.log(props.logData);


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
          <div className="row">
          <div className="col p-0 report-filter">
                <Filter /> Filter:
              </div> 
      <div className="col filter-container" >
      <input
        className="log-date-filter"
          type="date"
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value)}
        />
      </div>
      </div>


            </div>
            <div className="card-body p-0" style={{maxHeight:"100vh",overflow:"auto",width:"49rem"}}>
            {props.logData
            .filter((log) =>
            selectedDateFilter ? log.logDate === selectedDateFilter : true
          )
            .map((log, index) => (
        <div className="pb-3 mb-4" style={{borderBottom:"1px solid #E9ECEB"}} key={index}>
          <p className="log-date">{formatDate(log.logDate)}</p>
          
            {log.logTime.map((timeActivity, i) => {
              const [time, activity] = Object.entries(timeActivity)[0];
              return (
                <div className="row mx-2 mb-3">
                 <div className="clock-icon col-1 p-0">
                  <Clock/> 
                  </div>
                  <div className="clock-time col-2 p-0">
                  {time} 
                  </div>
                  <div className="log-item col-9 p-0"> 
                  {activity}
                  </div>
                 </div>
              );
            })}
          
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
