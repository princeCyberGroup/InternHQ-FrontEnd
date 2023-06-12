import "./ViewAllProjectIdea.css";
import React, { useState } from "react";
import { ReactComponent as Arrow } from "./arrow_forward_iosarrow.svg";

export const ProjectNames = (props) => {
  const [isBorder, setIsBorder] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  console.log(props);
  const truncate = (str, maxLength) => {
    if (str.length > maxLength) return str.slice(0, maxLength) + "...";
    else return str;
  };

  return (
    <div className="all-project-names pt-3">
      <div className="child-wrapper">
        {props.data &&
          props.data.map((user, index) => {
            const isBorder = index === selectedIdx;
            return (
              <div
                className={
                  "project-names-wrapper mt-2 pb-0 d-flex justify-content-between" +
                  (isBorder ? " project-names-wrapper-border" : "")
                }
                key={index}
                onClick={() => {
                  props.projectDetails(index);
                  setSelectedIdx(index);
                  setIsBorder(true);
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h5 className="project-names">{user.projectNames}</h5>
                  <span className="click-arrow">
                    <Arrow />
                  </span>
                </div>
                <div>
                  <p className="project-text flex-grow-1">
                    {user.projectText.length > 100
                      ? truncate(user.projectText, 100)
                      : user.projectText}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
