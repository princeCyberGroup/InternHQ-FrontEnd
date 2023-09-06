import React, { useState, useEffect } from "react";
import { ReactComponent as Arrow } from "../../../../../Assets/arrow_forward_iosarrow.svg";
import "./DetailsLeft.css";
import { ReactComponent as Clock } from "../../../../../Assets/clock-regular 1logClock.svg";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const DetailsLeft = (props) => {
  const [isBorderForMT, setIsBorderForMT] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [mentorSelectedIndex, setMentorSelectedIndex] = useState(null);
  const truncate = (str, maxLength) => {
    if (str.length > maxLength) return str.slice(0, maxLength) + "...";
    else return str;
  };
  useEffect(() => {
    if (
      selectedIdx === null &&
      (mentorSelectedIndex === null || props.project.length > 0)
    ) {
      setSelectedIdx(0);
      setMentorSelectedIndex(0);
    }
    props.mentorApiData?.length > 0
      ? setIsBorderForMT(true)
      : setIsBorderForMT(false);
  }, [props.project]);
  return (
    <>
      <div className="all-project-names border-end">
        <div className="child-wrapper-1">
          {props.project?.map((user, index) => {
            const isSelected = selectedIdx === index;
            const isBorderForMT = isSelected || selectedIdx === index;
            return (
              <div
                className={`project-names-wrapper mt-3 pb-0 d-flex justify-content-between ${
                  isBorderForMT ? "project-names-wrapper-border" : ""
                }`}
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  props.projectDetails(index);
                  setMentorSelectedIndex(-1);
                  setSelectedIdx(index);
                }}
              >
                {user.taskId ? (
                  <div className="mentor-assigned-task-badges">
                    <p className="mentor-assigned-badge mb-2">
                      Mentor Assigned
                    </p>
                  </div>
                ) : null}

                <div className="d-flex justify-content-between w-100">
                  <h5 className="project-names">
                    {user.projectNames} {user.taskName}
                  </h5>
                  <span className="click-arrow">
                    <Arrow />
                  </span>
                </div>

                {user.taskId ? (
                  <div className="task-deadline d-flex">
                    <Clock />
                    <p className="mb-2 mx-2">
                      {formatDate(user.startDate)} - {formatDate(user.endDate)}
                    </p>
                  </div>
                ) : null}

                <div>
                  <p className="project-text flex-grow-1">
                    {user.projectText?.length > 100
                      ? truncate(user.projectText, 100)
                      : user.projectText}
                    {user.taskDescription?.length > 100
                      ? truncate(user.taskDescription, 100)
                      : user.taskDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DetailsLeft;
