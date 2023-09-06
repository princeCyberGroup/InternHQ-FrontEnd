import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkillAlertSkeleton = () => {
  return (
    <div className="notification-pass-wrapper" style={{maxHeight:"290px",overflow:"auto"}}>
          <div className="image-wrapper mt-1">
            <div className="image-box">
              <Skeleton width={32} />
            </div>
          </div>
          <div className="text-wrapper mt-2">
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

export default SkillAlertSkeleton