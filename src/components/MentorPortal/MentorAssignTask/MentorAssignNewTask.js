import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import "./MentorAssignNewTask.css";
import axios from "axios";
import { ReactComponent as ExpandMore } from "../../../Assets/expand_more.svg";
import UsersDropdown from "../../AdminPortal/Task/AssignTask/UsersDropdown";
import TechnologyDropDown from "../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";
const MentorAssignNewTask = ({ mentorId, fetchData }) => {
  //data
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [technologyTag, setTechnologyTag] = useState("");
  // const [assignedTo, setAssignedTo] = useState("");
  const [selectAllAssociate, setSelectAllAssociate] = useState(false);
  const [ratedTask, setRatedTask] = useState(false);

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
  //function
  const techDataComingFrmChild = (data) => {
    setTech(data);
  };

  const usersDataComingFrmChild = (data) => {
    setUsers(data);
  };
  const handleCancel = () => {
    // Clear all form fields
    setStartDate("");
    setEndDate("");
    setTaskTitle("");
    setDescription("");
    // setSelectAllAssociate(false);
    setRatedTask(false);
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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data as a JSON object
    const formData = {
      taskName: taskTitle,
      taskDescription: description,
      ratedTask,
      assignedBy: mentorId,
      taskTech: selectedTechIds,
      taskUsers: selectedUserIds,
      startDate: startDate,
      endDate: endDate,
    };

    console.log("this is sending data", formData);
    // Send the form data to the backend API
    await axios
      .post(process.env.REACT_APP_API_URL + "/api/v4/tasks", formData)
      .then((response) => {
        // Handle the API response if needed
        console.log("API response:", response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("API error:", error);
      });
    handleCancel();
    fetchData();
    // window.location.reload();
  };
  return (
    <>
      <button
        className="mentor-task-btn"
        data-bs-toggle="modal"
        data-bs-target="#mentorAssignModal"
      >
        <span className="plus-style">+</span>
        <span>Assign New Task</span>
      </button>
      <div className="modal fade" id="mentorAssignModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <span>Assign New Task</span>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              {/* <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClose}>
                Close
              </button> */}
              <Form className="custom-form">
                <Form.Group controlId="taskTitle">
                  <Form.Label className="mb-1 custom-form-label">
                    Task Title *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label className="mb-1 custom-form-label">
                    Description *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="startDate">
                      <Form.Label className="mb-1 custom-form-label">
                        Start Date *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="endDate">
                      <Form.Label className="mb-1 custom-form-label">
                        End Date *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="technologyTag">
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
                </Form.Group>

                <Form.Group controlId="assignedTo">
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
                </Form.Group>
                {/* <Row className="mb-3 d-flex align-items-center">
                  <Col md={10}>
                    <Form.Label className="mb-1 custom-form-label">
                      Select All Associate Consultant
                    </Form.Label>
                  </Col>
                  <Col md={2}>
                    <Form.Check
                      type="switch"
                      id="selectAllAssociateSwitch"
                      checked={selectAllAssociate}
                      className="custom-switch-container"
                      onChange={() =>
                        setSelectAllAssociate(!selectAllAssociate)
                      }
                    />
                  </Col>
                </Row> */}

                <Row className="mb-3 d-flex align-items-center">
                  <Col md={10}>
                    <Form.Label className="mb-1 custom-form-label">
                      This is the Rated Task
                    </Form.Label>
                  </Col>
                  <Col md={2}>
                    <Form.Check
                      type="switch"
                      id="ratedTaskSwitch"
                      checked={ratedTask}
                      onChange={() => setRatedTask(!ratedTask)}
                      className="custom-switch-container"
                    />
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn modal-cancel-button fw-bold"
                data-bs-dismiss="modal"
                onClick={(e) => handleCancel(e)}
              >
                <span className="cancel-text">Cancel</span>
              </button>

              <button
                type="button"
                className="btn modal-save-button"
                data-bs-dismiss={"modal"}
                data-bs-target="#addTaskModal"
                onClick={(e) => handleSubmit(e)}
              >
                <span className="save-text-field">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorAssignNewTask;
