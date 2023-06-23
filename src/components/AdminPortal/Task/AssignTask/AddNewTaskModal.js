import "./OtherModals.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import TechnologyDropDown from "./TechnologyDropdown(Admin)";
import UsersDropdown from "./UsersDropdown";

export const AddNewTask = ({ onAddClose }) => {
  const [error, setError] = useState(true);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTech, setTaskTech] = useState([]);
  const [taskUsers, setTaskUsers] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [usersDropDown, setUsersDropDown] = useState(false);
  const [tech, setTech] = useState({});
  const [users, setUsers] = useState({});
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [taskTechIds, setTaskTechIds] = useState([]);
  const [taskUserIds, setTaskUserIds] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [technologyNames, setTechnologyNames] = useState([]);

 const handleClickClear = (e) => {
    e.preventDefault();

    onAddClose();
    setTaskName("");
    setTaskDescription("");
    setSelectedTechIds([]);
    setSelectedUserIds([]);
    setTechnologyNames([]);
    setSelectedUsers([]);
    setTech({});
    setUsers({});

    const userCheckboxes = document.querySelectorAll(".user-checkbox");
    userCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Reset TechDropDown component state
    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

  };
  const techDataComingFrmChild = (data) => {
    setTech(data);
  };

  const usersDataComingFrmChild = (data) => {
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var storedObject = JSON.parse(localStorage.getItem("userData"));
    var userId = storedObject.userId;
    var assignedByDesignation = storedObject.designation;
    var assignedByfullName =
      storedObject.firstName + " " + storedObject.lastName;

    if (error) {
      alert("Please fill out the necessary fields");
    } else {


      await axios
        .post("https://cg-interns-hq.azurewebsites.net/addNewTask", {
          taskName,

          taskDescription,

          taskTech: selectedTechIds, // Send the array of tech IDs
          taskUsers: selectedUserIds, // Send the array of user IDs
          assignedBy: userId,
        })
        .then((res) => {
          console.log("print", res.data);
          onAddClose();
        })
        .catch((err) => {
          console.log(err);
        });

      setTaskName("");
      setTaskDescription("");
      setSelectedTechIds([]);
      setSelectedUserIds([]);
      setTechnologyNames([]);
      setSelectedUsers([]);
      setTech({});
      setUsers({});
      setError(true);

      const userCheckboxes = document.querySelectorAll(".user-checkbox");
      userCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      // Reset TechDropDown component state
      const checkboxes = document.querySelectorAll(".tech-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  const handleTaskTitle = (e) => {
    setTaskName(e.target.value);
    if (taskName.length === 0) {
      setError(true);
    }
    else{setError(false)}
  };

  const handleDescription = (e) => {
    setTaskDescription(e.target.value);
    if (taskDescription.length < 2) {
      setError(true);
    }
    else{setError(false)}
  };
  const handleAssignedTo = (e) => {
    setTaskUsers(e.target.value);
  };

  return (
    <div>
      <div
        class="modal fade"
        id="addTaskModal"
        data-bs-backdrop="static"
        tabindex="-1"
        data-bs-keyboard="false" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-bottom-1">
              <h5 class="modal-title modalheading-text" id="skillModalLabel">
              Add New Task
              </h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => handleClickClear(e)}
              ></button>
            </div>

            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label
                    htmlFor="task-title"
                    className="col-form-label form-title-names"
                  >
                    Task Title<span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="task-title"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(e) => handleTaskTitle(e)}
                  />
                </div>

                <div class="mb-3">
                  <label
                    htmlFor="description"
                    class="col-form-label form-title-names"
                  >
                    Description<span style={{ color: "red" }}>*</span>
                  </label>

                  <textarea
                    class="form-control"
                    id="description"
                    rows={3}
                    placeholder="Enter description"
                    value={taskDescription}
                    onChange={(e) => handleDescription(e)}
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label
                    for="technology-tag"
                    class="col-form-label form-title-names"
                  >
                    Technology Tag<span style={{ color: "red" }}>*</span>
                  </label>

                  <div className="container border p-0">
                    <div className="input-with-button">
                      <button
                        type="button"
                        className="button-for-dropdown"
                        onClick={() => {
                          setDropDown(!dropDown);
                        }}
                      >
                        <input
                          type="text"
                          className="custom-input"
                          value={Object.values(tech)}
                          disabled
                        />
                      </button>
                      <button
                        type="button"
                        className="expand-more"
                        onClick={() => {
                          setDropDown(!dropDown);
                        }}
                      >
                        <ExpandMore />
                      </button>
                    </div>
                    <div>
                      <ul
                        style={{ display: dropDown ? "" : "none" }}
                        className="ul-styling"
                      >
                        <TechnologyDropDown
                          techDataComingChild={techDataComingFrmChild}
                          setSelectedTechIds={setSelectedTechIds}
                          setTechnologyNames={setTechnologyNames}
                          technologyNames={technologyNames}
                        />
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label
                    for="assigned-to"
                    class="col-form-label form-title-names"
                  >
                    Assigned To<span style={{ color: "red" }}>*</span>
                  </label>

                  <div className="container border p-0">
                    <div className="input-with-button">
                      <button
                        type="button"
                        className="button-for-dropdown"
                        onClick={() => {
                          setUsersDropDown(!usersDropDown);
                        }}
                      >
                        <input
                          type="text"
                          className="custom-input"
                          value={Object.values(users)}
                          disabled
                        />
                      </button>
                      <button
                        type="button"
                        className="expand-more"
                        onClick={() => {
                          setUsersDropDown(!usersDropDown);
                        }}
                      >
                        <ExpandMore />
                      </button>
                    </div>
                    <div>
                      <ul
                        style={{ display: usersDropDown ? "" : "none" }}
                        className="ul-styling"
                      >
                        <UsersDropdown
                          usersDataComingChild={usersDataComingFrmChild}
                          selectAllUsers={selectAllUsers}
                          setSelectedUserIds={setSelectedUserIds}
                          setSelectedUsers={setSelectedUsers}
                          selectedUsers={selectedUsers}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="modal-footer border-top-0">
              <button
                type="button"
                class="btn modal-cancel-button fw-bold"
                data-bs-dismiss="modal"
                onClick={(e) => handleClickClear(e)}
              >
                <span className="cancel-text">Cancel</span>
              </button>

              <button
                type="button"
                class="btn modal-save-button"
                data-bs-dismiss={!error ? 'modal': ''  }
                data-bs-target="#addTaskModal"
                onClick={(e) => handleSubmit(e)}
              >
                <span
                  className="save-text-field"
                  
                >
                  Save
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
