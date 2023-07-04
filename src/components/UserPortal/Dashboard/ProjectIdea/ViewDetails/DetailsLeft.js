import React, { useState,useContext } from "react";
import { ReactComponent as Arrow } from "../../../../../Assets/arrow_forward_iosarrow.svg";
import { UserContext } from "../../../../../Context/Context";
import "./DetailsLeft.css";

const DetailsLeft = (props) => {

  const [isBorder, setIsBorder] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const truncate = (str, maxLength) => {
    if (str.length > maxLength) return str.slice(0, maxLength) + "...";
    else return str;
  };

  return (
    <div className="all-project-names pt-3 border-end">
      <div className="child-wrapper">
        {props.data?.map((user, index) => {
          const isBorder = index === selectedIdx;
          return (
            <div
              className={
                "project-names-wrapper mt-3 pb-0 d-flex justify-content-between" +
                (isBorder ? " project-names-wrapper-border" : "")
              }
              key={index}
              onClick={() => {
                props.projectDetails(index);
                setSelectedIdx(index);
                setIsBorder(true);
              }}
            >
              {/* <div className="mentor-assigned-task-badges">
               <p className="mentor-assigned-badge mb-2"> Mentor Assigned</p>
              </div> */}
              <div className="d-flex justify-content-between w-100"         >
                <h5 className="project-names">{user.projectNames}</h5>
                <span className="click-arrow">
                  <Arrow />
                </span>
              </div>

              <div>
                <p className="project-text flex-grow-1">
                  {user.projectText?.length > 100
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

export default DetailsLeft;
