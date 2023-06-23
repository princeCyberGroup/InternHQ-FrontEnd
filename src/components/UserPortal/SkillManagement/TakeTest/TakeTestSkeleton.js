import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TakeTestSkeleton = () => {
  return (
    <div className="exam">
      <div class="card outer-card">
        <div class="d-flex align-items-center">
          <div class="ml-3 w-100">
            <div className="d-flex justify-content-start ">
              <div
                className="p-0"
                style={{
                  marginTop: "17px",
                  marginLeft: "20px",
                  padding: "2.5px 5px",
                  gap: "8px",
                  marginRight: "12px",
                }}
              >
                <Skeleton width={54} height={54} />
              </div>
              <div>
                <div className="" style={{ marginTop: "17px" }}>
                  <Skeleton highlightColor="#B8DDE1" width={80} height={19} />
                </div>
                <div className=" About_box justify-content-center">
                  <span className="About">
                    <Skeleton width={280} />
                  </span>
                </div>
              </div>
            </div>
            <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
              <div class="d-flex flex-column justify-content-center noOfQues">
                <div class="articles d-flex justify-content-center">
                  <Skeleton width={80} style={{ marginRight: "5px" }} />
                </div>
              </div>
              <div class="d-flex flex-column justify-content-center testTime">
                <div class="articles d-flex justify-content-center ">
                  <Skeleton width={60} style={{ marginRight: "5px" }} />
                </div>
              </div>
              <div class="d-flex flex-column">
                <Skeleton
                  highlightColor="#28519E"
                  width={150}
                  height={36}
                  style={{ padding: "10px 12px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTestSkeleton;
