import "./OtherModals.css";

import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import TechnologyDropDown from "./TechnologyDropdown(Admin)";
import UsersDropdown from "./UsersDropdown";
import CryptoJS from "crypto-js";
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

export const AddNewTask = ({
  onAddClose,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [nameError, setNameError] = useState(true);
  const [descError, setDescError] = useState(true);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [usersDropDown, setUsersDropDown] = useState(false);
  const [tech, setTech] = useState({});
  const [users, setUsers] = useState({});
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [technologyNames, setTechnologyNames] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const handleClickClear = (e) => {
    e.preventDefault();

    onAddClose();
    setTaskName("");
    setStartDate("");
    setEndDate("");
    setTaskDescription("");
    setSelectedTechIds([]);
    setSelectedUserIds([]);
    setTechnologyNames([]);
    setSelectedUsers([]);
    setTech({});
    setUsers({});
    setSearchQuery("");
    setSearchUserQuery("");
    setDropDown(false);
    setUsersDropDown(false);

    setSelectAllChecked(false);

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

    const secretkeyUser = process.env.REACT_APP_USER_KEY;
    var parsedObject;
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      parsedObject = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    var userId = parsedObject.userId;

    if (
      nameError ||
      descError ||
      !startDate ||
      !endDate ||
      selectedTechIds.length === 0 ||
      selectedUserIds.length === 0
    ) {
      alert("Please fill out the necessary fields");
    } else {
      await axios
        .post(process.env.REACT_APP_API_URL + "/api/v3/addNewTask", {
          taskName,
          taskDescription,
          startDate,
          endDate,
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
      setStartDate("");
      setEndDate("");
      setSelectedTechIds([]);
      setSelectedUserIds([]);
      setTechnologyNames([]);
      setSelectedUsers([]);
      setTech({});
      setUsers({});
      setNameError(true);
      setDescError(true);
      setSearchQuery("");
      setSearchUserQuery("");
      setDropDown(false);
      setUsersDropDown(false);
      setSelectAllChecked(false);

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
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleDescription = (e) => {
    setTaskDescription(e.target.value);
    if (taskDescription.length < 2 || taskDescription.length > 500) {
      setDescError(true);
    } else {
      setDescError(false);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addTaskModal"
        tabindex="-1"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-1">
              <h5
                className="modal-title modalheading-text"
                id="skillModalLabel"
              >
                Add New Task
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => handleClickClear(e)}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="task-title"
                    className="col-form-label form-title-names"
                  >
                    Task Title<span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="task-title"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(e) => handleTaskTitle(e)}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="col-form-label form-title-names"
                  >
                    Description<span style={{ color: "red" }}>*</span>
                    {taskDescription.length > 500 && (
                      <span style={{ color: "red" }}>
                        Exceeded maximum word limit of 500
                      </span>
                    )}
                  </label>

                  <textarea
                    className="form-control"
                    id="description"
                    rows={3}
                    placeholder="Enter description"
                    value={taskDescription}
                    onChange={(e) => handleDescription(e)}
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
                        selected={startDate}
                        onChange={(date) => {
                          console.log("data", startDate);
                          setStartDate(date);
                        }}
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
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
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
                          placeholder="Select Technology"
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
                          selectedTechIds={selectedTechIds}
                          setSelectedTechIds={setSelectedTechIds}
                          setTechnologyNames={setTechnologyNames}
                          technologyNames={technologyNames}
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
                          placeholder="Select Assigned To"
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
                        style={{
                          height: "10rem",
                          display: usersDropDown ? "" : "none",
                        }}
                        className="ul-styling"
                      >
                        <UsersDropdown
                          usersDataComingChild={usersDataComingFrmChild}
                          selectAllUsers={selectAllUsers}
                          setSelectedUserIds={setSelectedUserIds}
                          selectedUserIds={selectedUserIds}
                          setSelectedUsers={setSelectedUsers}
                          selectedUsers={selectedUsers}
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
                onClick={(e) => handleClickClear(e)}
              >
                <span className="cancel-text">Cancel</span>
              </button>

              <button
                type="button"
                className="btn modal-save-button"
                data-bs-dismiss={
                  !nameError &&
                  !descError &&
                  startDate &&
                  endDate &&
                  selectedTechIds.length !== 0 &&
                  selectedUserIds.length !== 0
                    ? "modal"
                    : ""
                }
                data-bs-target="#addTaskModal"
                onClick={(e) => handleSubmit(e)}
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
