import { AddNewIdea } from "./AddNewIdea";
import React, { useState } from "react";
import { AddProject } from "./AddProject";
import "./ProjectComponent.css";
import "./AddProject.css";
import "./AddNewIdea.css";

export const AddNewProjectComponent = () => {
  const [pActive, setPActive] = useState(true);

  // const setProjectScreenType = (input) => {
  //   console.log("Working");
  // };

  return (
    <>
      <div className="card px-0">
        <div className="border-bottom">
        <div className="card-title dtt-hfs-abc m-0 d-flex  d-flex justify-content-center align-item-center ">
          <div className={"project-idea-btn" + (pActive ? " p-active" : "")}>
            <button
              className="btn-1 p-0"
              onClick={() => {
                setPActive(true);
              }}
            >
              Project Idea
            </button>
          </div>
          <div className={"project-btn" + (pActive ? " " : " p-active")}>
            <button
              className="btn-2 p-0"
              onClick={() => {
                setPActive(false);
              }}
            >
              Project
            </button>
          </div>
        </div>
        </div>
        {pActive ? <AddNewIdea /> : <AddProject />}
      </div>
    </>
  );
};
