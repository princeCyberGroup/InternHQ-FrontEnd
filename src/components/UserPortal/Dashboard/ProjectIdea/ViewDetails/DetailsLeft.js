import React, { useState,useContext, useEffect } from "react";
import { ReactComponent as Arrow } from "../../../../../Assets/arrow_forward_iosarrow.svg";
import { UserContext } from "../../../../../Context/Context";
import "./DetailsLeft.css";

const DetailsLeft = (props) => {

  const [isBorder, setIsBorder] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [mentorSelectedIndex,setMentorSelectedIndex]= useState(null);
  const [test,settes]=useState(false)
  const truncate = (str, maxLength) => {
    if (str.length > maxLength) return str.slice(0, maxLength) + "...";
    else return str;
  };
  useEffect(() => {
    if (selectedIdx === null && mentorSelectedIndex === null && props.data.length > 0) {
      setSelectedIdx(0);
      setMentorSelectedIndex(0);
    }
  }, [props.data]);
  return (
    <>
    <div className="all-project-names pt-3 border-end">
      <div className="child-wrapper-1">
      {props.mentorApiData && Array.isArray(props.mentorApiData) && props.mentorApiData.map((user, indexForMentor) => {
      
      const isBorder = indexForMentor === mentorSelectedIndex;
      return (
        <div
          className={
            "project-names-wrapper mt-3 pb-0 d-flex justify-content-between" +
            (isBorder ? " project-names-wrapper-border" : "")
          }
          key={indexForMentor}
          onClick={(e) => {
            e.preventDefault();
            props.projectDetails("MT", indexForMentor);
            // props.settest(true)
            setMentorSelectedIndex(indexForMentor);
            setSelectedIdx(-1);
            
          }}
        >
         {user.firstName ? (
      <div className="mentor-assigned-task-badges">
        <p className="mentor-assigned-badge mb-2">Mentor Assigned</p>
      </div>
    ) : null}
           
          <div className="d-flex justify-content-between w-100"         >
            <h5 className="project-names">{user.taskName}</h5>
          
            <span className="click-arrow">
              <Arrow />
            </span>
          </div>

          <div>
            <p className="project-text flex-grow-1">
              {user.taskDescription?.length > 100
                ? truncate(user.taskDescription, 100)
                : user.taskDescription}
            </p>
          </div>
        </div>
      );
    })}
        {props.data?.map((user, index) => {
          const isBorder = index === selectedIdx;
          return (
            <div
              className={
                "project-names-wrapper mt-3 pb-0 d-flex justify-content-between" +
                (isBorder ? " project-names-wrapper-border" : "")
              }
              key={index}
              onClick={(e) => {
                e.preventDefault();
                props.projectDetails(index,"MT");
                {console.log("Index Value:",index)}
                setSelectedIdx(index);
                setMentorSelectedIndex(-1);
              
              }}
            >
  
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
  </>
  );
};

export default DetailsLeft;
