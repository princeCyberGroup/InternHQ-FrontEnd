import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ReactComponent as DownArroww } from "../../../../Assets/down-scroll.svg";

const associateConsultantSkeleton = () => {
  return (
    <div
    className="card associate-consultant-mapped-card"
  >
    <div className="row" style={{width: "24.875rem"}}>
      <div
        className="frame-skeleton-loading"
      >
        <Skeleton highlightColor='#b8dde1' width={36} height={36} circle style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1.6rem",
          }}/>
      </div>
      <div
        className=" col-4"
        style={{width: "22rem"}}
      >
        <div className="frame-text"><Skeleton width={250} highlightColor='#fff' /></div>
        <div className="frame-id"><Skeleton width={150} highlightColor='#fff' /></div>
      </div>
      <span
                style={{cursor: "pointer", position: "absolute", left: "22.5rem", top: "0.8rem", width: "auto" }}
                className="expand-arrow p-0"
              >
                  <DownArroww />
              </span>
    </div>
  </div>
  )
}

export default associateConsultantSkeleton