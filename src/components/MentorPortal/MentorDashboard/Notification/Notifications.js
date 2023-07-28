import { lazy, Suspense } from "react";
import "./Notification.css";
import NotificationContentSkeleton from "./NotificationContentSkeleton";

const LazyNewNotifications = lazy(() =>
  import("./NewNotifications")
);

export const NotificationComponent = () => {
  return (
    <div className="notification-card card">
      <div className="border-bottom">
        <h5 className="card-title dtt-hfs">Skill Alerts</h5>
      </div>
      <div className="notification-cover">
        <Suspense fallback={<NotificationContentSkeleton />}>
          <LazyNewNotifications />
        </Suspense>
      </div>
    </div>
  );
};


