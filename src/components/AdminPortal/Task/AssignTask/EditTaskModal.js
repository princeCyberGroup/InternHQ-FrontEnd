import React, { useState, useEffect } from "react";
import axios from "axios";
import TechnologyDropDown from "./TechnologyDropdown(Admin)";
import UsersDropdown from "./UsersDropdown";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";

export const EditTaskModal = ({ task, onEditClose, technology, assignedTo, editedTask,taskName,setTaskName, taskDescription,setTaskDescription }) => {

  const [dropDown, setDropDown] = useState(false);
  const [usersDropDown, setUsersDropDown] = useState(false);
  const [tech, setTech] = useState({});
  const [users, setUsers] = useState({});
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [technologyNames, setTechnologyNames] = useState([]);
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [error, setError] = useState(false);



  const techDataComingFrmChild = (data) => {
    setTech(data);
  };

  const usersDataComingFrmChild = (data) => {
    setUsers(data);

  };
  const handleOnEditClose = () => {
    onEditClose();
  }

  const handleTaskTitle = (e) => {
    setTaskName(e.target.value);

    if (e.target.value.length > 0) {
        setError(false);
      }
      else{setError(true)}
  };

  const handleDescription = (e) => {
    setTaskDescription(e.target.value);
    if (e.target.value.length > 2) {
        setError(false);
      }
      else{setError(true)}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (error) {
        alert("Please fill out the necessary fields");
      } else {
    try {
      await axios.post(
        `https://cg-interns-hq.azurewebsites.net/editTask`,
        {
            taskId:task.taskId,
            taskName:taskName,
            taskDescription:taskDescription,
            taskTech:selectedTechIds,
            taskUsers:selectedUserIds
        }
      );

      // Handle success, update the task or display a success message
      console.log("Task updated successfully");
      onEditClose();
    } catch (error) {
      console.log("Error updating task:", error);
      // Handle error, display an error message or show an error notification
    }
}

  };

  return (
    <div>
      <div
        className="modal fade"
        id="editTaskModal"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-labelledby="editTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-bottom-1">
              <h5
                className="modal-title modalheading-text"
                id="editTaskModalLabel"
              >
                Edit Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onEditClose}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                {/* Task Title */}
                <div className="mb-3">
                  <label
                    htmlFor="edit-task-title"
                    className="col-form-label form-title-names"
                  >
                    Task Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-task-title"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={handleTaskTitle}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label
                    htmlFor="edit-description"
                    className="col-form-label form-title-names"
                  >
                    Description<span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="edit-description"
                    rows={3}
                    placeholder="Enter description"
                    value={taskDescription}
                    onChange={handleDescription}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label
                    for="technology-tag"
                    className="col-form-label form-title-names"
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
                          value={ (Object.values(tech).length === 0 ? null : Object.values(tech)) || editedTask?.technology}
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
                          selectedTech = {editedTask?.technology}
                        />
                      </ul>
                    </div>
                    {/* </div> */}
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    for="assigned-to"
                    className="col-form-label form-title-names"
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
                          value={ (Object.values(users).length === 0 ? null : Object.values(users)) || editedTask?.name}
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

            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn modal-cancel-button fw-bold"
                data-bs-dismiss="modal"
                onClick={handleOnEditClose}
              >
                <span className="cancel-text">Cancel</span>
              </button>

              <button
                type="button"
                className="btn modal-save-button"
                data-bs-target ="#editTaskModal"
                data-bs-dismiss={!error ? 'modal': ''  }
                onClick={handleSubmit}
              >
                <span className="save-text-field">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
