import React, { useState, useEffect } from "react";
import axios from "axios";
import TechnologyDropDown from "./TechnologyDropdown(Admin)";
import UsersDropdown from "./UsersDropdown";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as CalendarIcon } from "../../../../Assets/eventcalender-icon.svg";

function CustomInput({ value, onClick }) {
  return (
    <div className="row addTask-date-filter m-0" onClick={onClick}>
      <input
        placeholder="Select Date"
        type="text"
        value={value}
        className="col-11 addTask-date-filter-input m-0"
        readOnly
      />
      <span className="col-1 p-0">
        <CalendarIcon />
      </span>
    </div>
  );
}

export const EditTaskModal = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const [usersDropDown, setUsersDropDown] = useState(false);
  const [tech, setTech] = useState({});
  const [users, setUsers] = useState({});
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [error, setError] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const techDataComingFrmChild = (data) => {
    setTech(data);
  };

  const usersDataComingFrmChild = (data) => {
    setUsers(data);
  };
  const handleOnEditClose = () => {
    setSelectAllChecked(false);
    setTech(props.editedTask?.technology);
    setUsers(props.editedTask?.name);
    props.onEditClose();
  };

  const handleTaskTitle = (e) => {
    props.setTaskName(e.target.value);
    if (props.taskName.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    // if (e.target.value.length > 0) {
    //   setError(false);
    // } else {
    //   setError(true);
    // }
  };

  const handleDescription = (e) => {
    props.setTaskDescription(e.target.value);
    if (props.taskDescription.length < 2 || props.taskDescription.length > 500) {
      setDescError(true);
    } else {
      setDescError(false);
    }
    // if (e.target.value.length > 2) {
    //   setError(false);
    // } else {
    //   setError(true);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nameError ||
      descError ||
      !props.startEditDate ||
      !props.endEditDate ||
      props.selectedTechIds?.length === 0 ||
      props.selectedUserIds?.length === 0
    ) {
      alert("Please fill out the necessary fields");
    } else {
      try {
        await axios.post(process.env.REACT_APP_API_URL + `/api/v3/editTask`, {
          taskId: props.task.taskId,
          taskName: props.taskName,
          taskDescription: props.taskDescription,
          startDate: props.startEditDate,
          endDate: props.endEditDate,
          taskTech: props.selectedTechIds,
          taskUsers: props.selectedUserIds,
        });

        // Handle success, update the task or display a success message
        console.log("Task updated successfully");
        props.onEditClose();
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
        tabIndex="-1"
        aria-labelledby="editTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
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
                onClick={props.onEditClose}
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
                    value={props.taskName}
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
                    value={props.taskDescription}
                    onChange={handleDescription}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label
                        htmlFor="start-date"
                        className="col-form-label form-title-names"
                      >
                        Start Date<span style={{ color: "red" }}>*</span>
                      </label>
                      <DatePicker
                        selected={props.startEditDate}
                        onChange={(date) => props.setStartEditDate(date)}
                        dateFormat="MM-dd-yyyy"
                        customInput={<CustomInput />}
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor="end-date"
                        className="col-form-label form-title-names"
                      >
                        End Date<span style={{ color: "red" }}>*</span>
                      </label>
                      <DatePicker
                        selected={props.endEditDate}
                        onChange={(date) => props.setEndEditDate(date)}
                        dateFormat="MM-dd-yyyy"
                        customInput={<CustomInput />}
                      />
                    </div>
                  </div>
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
                          value={
                            (Object.values(tech).length === 0
                              ? null
                              : Object.values(tech)) ||
                            props.editedTask?.technology
                          }
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
                          selectedTechIds={props.selectedTechIds}
                          setSelectedTechIds={props.setSelectedTechIds}
                          setTechnologyNames={props.setTechnologyNames}
                          technologyNames={props.technologyNames}
                          selectedTech={props.editedTask?.technology}
                          searchQuery={searchQuery}
                          setSearchQuery={setSearchQuery}
                        />
                      </ul>
                    </div>
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
                          value={
                            (Object.values(users).length === 0
                              ? null
                              : Object.values(users)) || props.editedTask?.name
                          }
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
                          selectedUserIds={props.selectedUserIds}
                          setSelectedUserIds={props.setSelectedUserIds}
                          setSelectedUsers={props.setSelectedUsers}
                          selectedUsers={props.selectedUsers}
                          selectAllChecked={selectAllChecked}
                          setSelectAllChecked={setSelectAllChecked}
                          searchUserQuery={searchUserQuery}
                          setSearchUserQuery={setSearchUserQuery}
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
                data-bs-target="#editTaskModal"
                // data-bs-dismiss={!error ? "modal" : ""}
                data-bs-dismiss={
                  !nameError &&
                  !descError &&
                  props.startEditDate &&
                  props.endEditDate &&
                  props.selectedTechIds?.length !== 0 &&
                  props.selectedUserIds?.length !== 0
                    ? "modal"
                    : ""
                }
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
