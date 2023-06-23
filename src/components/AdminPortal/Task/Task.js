import React from "react";
import AssignTask from "./AssignTask/AssignTask";
import MentorList from "./MentorList/AdminMentorList";
import "./Task.css";

import Header from "../../Header/Header";


const Task = () => {
  return (
    <>

      <div className="" style={{ marginBottom: "5rem" }}>
        <Header />
      </div>

      <div className="assign-task-page">
        <div class="container-fluid ">
          <div class="row mt-4">
            <div class=" col-md-8 p-0 ">
              <AssignTask />
            </div>
            <div
              class=" col-md-4 p-0 skill-added-card"
              // style={{ height: "100vh" }}
            >
              <MentorList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
