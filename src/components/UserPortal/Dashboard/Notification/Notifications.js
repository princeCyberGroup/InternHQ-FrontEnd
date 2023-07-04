import { useState, useEffect } from "react";
import "./Notification.css";
import NotificationContentSkeleton from "./NotificationContentSkeleton";
import EmptyNotification from "../EmptyStates/EmptyNoti/EmptyNoti"

export const NotificationComponent = () => {
  return (
    <div className=" notification-card card">
      {/* <div className="card-header-notification">Notifications</div> */}
      <div className="border-bottom ">
        <h5 className="card-title dtt-hfs ">Skill Alerts</h5>
      </div>
      <div className="abc">
        <NewNotifications />
      </div>
    </div>
  );
};

export const NewNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetchNotifications();
    }, 1000);
  }, []);

  const fetchNotifications = async () => {
    try {
      // Make an API request to fetch data
      const response = await fetch(
        process.env.REACT_APP_API_URL+"/api/v2/getNotification",
        {
          headers: {
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
          },
        }
      );
      const data = await response.json();
      setNotifications(data.response);
      setIsLoading(false);
    } catch (error) {
      console.log("Error occurred while fetching notificatons:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
          <NotificationContentSkeleton />
        </>
      ) : (
        notifications?.length === 0 ? <EmptyNotification/> :
        notifications?.map((user) => {
          return (
            <>
              <div key={user.userId} className="notification-wrapper">
                <div className="image-wrapper mt-1">
                  <div className="image-box">
                    <img
                    key={user.userId}

                      src={user.techImage}
                      width={32}
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-wrapper mt-3">
                  <p key={user.userId} className="m-0">
                    <b>{user.firstName} {user.lastName}</b> has achieved <b>{user.level}</b>
                    <b> skill </b> on <b>{user.techName}</b>
                  </p>
                  <p className="m-0 date-wrapper">{user.examDate} </p>
                </div>
              </div>
            </>
          );
        })
      )}
    </>
  );
};
