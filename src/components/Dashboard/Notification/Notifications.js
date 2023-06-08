import { useState, useEffect } from "react";
import "./Notification.css";
import NotificationContentSkeleton from "./NotificationContentSkeleton";
// import angular from '../Notification/angular.svg';

export const NotificationComponent = () => {
  return (
    <div className=" notification-card card">
      {/* <div className="card-header-notification">Notifications</div> */}
      <div className="border-bottom ">
        <h5 className="card-title dtt-hfs ">Notifications</h5>
      </div>
      <div className="abc">
        <NewNotifications />
      </div>
    </div>
  );
};

export const NewNotifications = () => {
  //   const data = [
  //     {
  //       id: 1,
  //       FullName: "John Doe",
  //       Skill: "Angular skill",
  //       Technology: "Angular",
  //     },
  //     {
  //       id: 2,
  //       FullName: "John Doe",
  //       Skill: "Android Skill",
  //       Technology: "Android",
  //     },
  //     {
  //       id: 3,
  //       FullName: "John Doe",
  //       Skill: "HTML 5 Skill",
  //       Technology: "Html",
  //     },
  //     {
  //       id: 4,
  //       FullName: "John Doe",
  //       Skill: "SQL Skill",
  //       Technology: "SQL",
  //     },
  //     {
  //       id: 5,
  //       FullName: "John Doe",
  //       Skill: "Angular Skill",
  //       Technology: "Angular",
  //     },
  //     {
  //       id: 6,
  //       FullName: "John Doe",
  //       Skill: "Android Skill",
  //       Technology: "android",
  //     },
  //     {
  //       id: 7,
  //       FullName: "John Doe",
  //       Skill: "HTML 5 Skill",
  //       Technology: "Html",
  //     },
  //     {
  //       id: 8,
  //       FullName: "John Doe",
  //       Skill: "SQL Skill",
  //       Technology: "SQL",
  //     },
  //     {
  //       id: 9,
  //       FullName: "John Doe",
  //       Skill: "Angular Skill",
  //       Technology: "Angular",
  //     },
  //   ];
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetchNotifications();
    }, 5000);
  }, []);

  const fetchNotifications = async () => {
    try {
      // Make an API request to fetch data
      const response = await fetch(
        "https://cg-interns-hq.azurewebsites.net/getNotification"
      );

      const data = await response.json();

      setNotifications(data.response);
      setIsLoading(false);
    } catch (error) {
      console.log("Error occurred while fetching notificatons:", error);
    }
  };

  return (
    <div className="">
      {" "}
      {/* Notification parent */}
      {isLoading ? (
        <div>
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
        </div>
      ) : (
        notifications.map((user) => {
          return (
            <>
              <div key={user.userId} className="notification-wrapper">
                <div className="image-wrapper mt-1">
                  <div className="image-box">
                    <img
                      key={user.userId}
                      src={`https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${user.technology.toLowerCase()}/${user.technology.toLowerCase()}.png`}
                      width={32}
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-wrapper mt-3">
                  <p key={user.userId} className="m-0">
                    <b>{user.firstName}</b> has achieved <b>{user.level}</b>
                    <b> skill </b> on <b>{user.technology}</b>
                  </p>
                  <p className="m-0 date-wrapper"> 02-06-2023</p>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};
