import React from "react";
import Header from "../../Header/Header";
import { NotificationComponent } from "./Notification/Notifications";

const MentorDashboard = () => {
  return (
    <>
      <div className="" style={{ marginBottom: "10rem" }}>
        <Header />
      </div>
      {/* write your code below */}
      <div
                className="mt-2"
                style={{ height: "23.625rem", width: "23.65rem" }}
              >
                <NotificationComponent />
                {/* <EmptyNoti/>*/}
              </div>
    </>
  );
};

export default MentorDashboard;
