import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NotificationContentSkeleton = () => {
  return (
    <div className="notification-wrapper">
          <div className="image-wrapper mt-1">
            <div className="image-box">
              <Skeleton width={32} />
            </div>
          </div>
          <div className="text-wrapper mt-3">
            <p className="m-0">
              <Skeleton width={253.46} height={12}/>
              <Skeleton width={120} height={12}/>
            </p>
            <p className="m-0 date-wrapper">
              <Skeleton width={74} height={10}/>
            </p>
          </div>
        </div>
  )
}

export default NotificationContentSkeleton