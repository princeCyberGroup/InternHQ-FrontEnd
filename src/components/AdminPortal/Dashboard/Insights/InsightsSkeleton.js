import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InsightsSkeleton = () => {
  return (
    <div className="div-insights">
      <div className="row">
      <div className="col image-div">
        <Skeleton width={32} height={40} />
      </div>
      <div className="col ps-0">
        <div className="exam-name">
          <Skeleton width={127} height={16} />
        </div>
        <div className="number-of-test">
          <Skeleton className="me-2" width={77.92} inline={true} />
          <Skeleton className="me-2" width={98.31} inline={true} />
          <Skeleton width={82} inline={true} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default InsightsSkeleton;
