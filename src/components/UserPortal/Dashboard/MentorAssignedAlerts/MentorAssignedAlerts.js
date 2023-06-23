import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "../Notification/Notification.css";
import { useEffect, useState } from "react";
import MentorAssignedAlertsData from "./MentorAssignedAlertsData";

const MentorAssignedAlerts = () => {
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const [mentorTask, setMentorTask] = useState([]);
  const handleNotificationClick = () => {
    setHasNewNotification(!hasNewNotification);
  };

  var storedObject = localStorage.getItem("userData");
  var parsedObject = JSON.parse(storedObject);
  var userId = parsedObject.userId;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(
      `https://cg-interns-hq.azurewebsites.net/getAssignedNotification?userId=${userId}`
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setMentorTask(data.response);
        // console.log(data.response, "This is response");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesomeIcon
        icon={faBell}
        shake={hasNewNotification}
        size="lg"
        onClick={handleNotificationClick}
        style={{
          color: "#002c3f",
          cursor: "pointer",
          marginRight: "2rem",
          // position: "relative",
          // top: "5px",
        }}
      />
      {hasNewNotification ? (
        <div
          style={{
            backgroundColor: "red",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            position: "absolute",
            right: "141px",
            top: "21px",
            border: "1px solid white",
          }}
        ></div>
      ) : (
        <div
          class="card"
          // style={{
          //   position: "absolute",
          //   right: "1.5rem",
          //   top: "3.4rem",
          //   zIndex: 4,
          //   maxWidth: "21rem",
          //   boxShadow: "0px 4px 20px rgba(40, 52, 73, 0.15)",
          //   borderRadius: "8px",
          // }}
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "3.8rem",
            maxWidth: "21rem",
                 zIndex: 4,
            boxShadow: "0px 4px 20px rgba(40, 52, 73, 0.15)",
            borderRadius: "8px",
          }}
        >
          <div class="card-header p-0">
            <div
              className="border-bottom p-0"
              style={{
                borderRadius: "7px 7px 0 0",
                position: "sticky",
                top: "0",
                zIndex: "3",
                backgroundColor: "#fff",
              }}
            >
              <h5
                class="card-title p-3 m-0"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 600,
                  fontSize: "1rem",
                  lineHeight: "1.18rem",
                  color: "#343435",
                }}
              >
                Mentor Assigned Task
              </h5>
            </div>
          </div>
          <div className="card-body pt-0 pb-0" style={{height:"20rem",overflow:"scroll"}}>
            {mentorTask.map((data) => {
              return (
                <div
                  className="notification-wrapper px-0"
                  style={{ width: "18.9rem", alignItems: "center" }}
                >
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="background-set">
                      {data.firstName.toUpperCase().slice(0, 1)}
                      {data.lastName.toUpperCase().slice(0, 1)}
                    </div>
                  </div>
                  <div className="text-wrapper ps-0">
                    <p class="card-text">
                      <b>
                        {data.firstName} {data.lastName}
                      </b>{" "}
                      has assigned you <b>{data.taskDescription}</b> task
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorAssignedAlerts;
