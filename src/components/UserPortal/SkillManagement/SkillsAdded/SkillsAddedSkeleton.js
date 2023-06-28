import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkillsAddedSkeleton = () => {
  return (
    <div style={{ width: "17.9rem" }}>
      <div
        className="p-0"
        style={{
          maxHeight: "calc(100vh - 30vh)",
          borderBottom: "1px solid #E9ECEB",
        }}
      >
        <div className="row cards">
          <div className="col-12 d-flex">
            <Skeleton
              width={44}
              height={44}
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
            />
            <p>
              <Skeleton
                width={100}
                style={{
                  marginTop: "1.25rem",
                  marginRight: "1.125rem",
                  marginLeft: "0.875rem",
                }}
              />
            </p>
          </div>
          <div className="d-flex p-0 stars" style={{ marginTop: "0.5rem" }}>
            <div className={`col d-flex flex-column `}>
              <Skeleton
                width={20}
                height={20}
                style={{ marginLeft: "1.25rem" }}
              />
              <p className="m-0">
                <Skeleton width={44} height={8} />
              </p>
              <p className="m-0">
                <Skeleton width={21} height={8} />
              </p>
            </div>

            <div className={`col d-flex flex-column`}>
              <Skeleton
                width={20}
                height={20}
                style={{ marginLeft: "1.25rem" }}
              />
              <p className="m-0">
                <Skeleton width={63} height={8} />
              </p>
              <p className="m-0">
                <Skeleton width={21} height={8} />
              </p>
            </div>

            <div className={`col d-flex flex-column`}>
              <Skeleton
                width={20}
                height={20}
                style={{ marginLeft: "1.25rem" }}
              />
              <p className="m-0">
                <Skeleton width={49} height={8} />
              </p>
              <p className="m-0">
                <Skeleton width={21} height={8} />
              </p>
            </div>

            <div className={`col d-flex flex-column`}>
              <Skeleton
                width={20}
                height={20}
                style={{ marginLeft: "1.25rem" }}
              />
              <p className="m-0">
                <Skeleton width={36} height={8} />
              </p>
              <p className="m-0">
                <Skeleton width={21} height={8} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAddedSkeleton;
