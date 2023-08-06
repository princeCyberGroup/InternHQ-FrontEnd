import React, { useState, useEffect } from "react";
import "./AssignTask.css";
import { ReactComponent as Delete } from "../../../../Assets/Buttondelete.svg";
import { ReactComponent as Edit } from "../../../../Assets/Buttonedit.svg";
import { ReactComponent as Plus } from "../../../../Assets/+plusbtn.svg";
import { ReactComponent as NoTask } from "../../../../Assets/Group 3EmpGraph.svg";
import { ReactComponent as Clock } from "../../../../Assets/clock-regular 1logClock.svg";

import axios from "axios";
import { AddNewTask } from "./AddNewTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import DeleteTask from "../DeleteTask";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function formatEditDate(dateString) {
  const date = dateString === undefined ? new Date() : new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

const AssignTask = () => {
  const [tasks, setTasks] = useState([]);

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskIdToChild, setTaskIdToChild] = useState(0);
  const [taskVersion, setTaskVersion] = useState(0);
  const [editedTask, setEditedTask] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startEditDate, setStartEditDate] = useState("");
  const [endEditDate, setEndEditDate] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [technologyNames, setTechnologyNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setEditedTask(taskToEdit);
  }, [taskToEdit]);

  useEffect(() => {
    setTaskName(editedTask?.taskName);
    setTaskDescription(editedTask?.taskDescription);
    setStartEditDate(new Date(formatEditDate(editedTask?.startDate)));
    setEndEditDate(new Date(formatEditDate(editedTask?.endDate)));
    setTechnologyNames(editedTask?.technology);
    setSelectedTechIds(editedTask?.techId);
    setSelectedUsers(editedTask?.name);
    setSelectedUserIds(editedTask?.userId);
  }, [editedTask]);

  useEffect(() => {
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
    // Fetch tasks from the API
    axios
      .get(process.env.REACT_APP_API_URL + "/api/v3/getAssignedTask", {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      })
      .then((response) => {
        setTasks(response.data.response);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/error/statusCode=401");
        }
        if (error.response.status === 400) {
          navigate("/error/statusCode=400");
        }
        if (error.response.status === 500) {
          navigate("/error/statusCode=500");
        }
        if (error.response.status === 404) {
          navigate("/error/statusCode=404");
        }
        console.error("Error fetching tasks:", error);
      });
  }, [taskVersion]);

  const handleAddTask = () => {};

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const deleteTask = (e, taskId, index) => {
    e.preventDefault();
    setTaskIdToChild(taskId);
    setShowDeleteTask(true);
    setIsOpen(true);
  };

  const handleEditCloseModal = () => {
    setTaskToEdit(null);
    setTaskVersion((prevVersion) => prevVersion + 1);

    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    const userCheckboxes = document.querySelectorAll(".user-checkbox");
    userCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleAddCloseModal = () => {
    setTaskVersion((prevVersion) => prevVersion + 1); // Update task version when modal is closed
  };

  return (
    <>
      {showDeleteTask ? (
        <DeleteTask
          taskId={taskIdToChild}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowDeleteTask={setShowDeleteTask}
          setTaskVersion={setTaskVersion}
        />
      ) : (
        ""
      )}
      <div className="assign-task-container">
        <p>Assigned Task</p>
        <button
          type="button"
          className="add-task-button"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
          onClick={() => handleAddTask()}
        >
          <Plus />
          Add New Task
        </button>
      </div>
      <div style={{ maxHeight: "80vh", overflow: "auto"}}>
        {tasks.length === 0 ? (
          <div className="card empty-task-state d-flex justify-content-center align-items-center">
            <div className="col-12 d-flex justify-content-center">
              <NoTask />
            </div>
            <div className="col-12 d-flex justify-content-center assign-task-empty">
              <p>No Task Assigned Yet! </p>
            </div>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div className="card task-card" key={task.taskId}>
              <div className="dots">
                <Edit
                  className="mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editTaskModal"
                  onClick={() => handleEditTask(task)}
                  style={{ cursor: "pointer" }}
                />
                <Delete
                  taskId={task.taskId}
                  onClick={(e) => {
                    deleteTask(e, task.taskId, index);
                  }}
                />
              </div>
              <div className="card-title mb-0">
                <h5 className="task-name mb-0">{task.taskName}</h5>
                <div className="d-flex mt-2 task-timeStamp">
                  <Clock />
                  {formatDate(task.startDate)} - {formatDate(task.endDate)}
                </div>
              </div>
              <div className="card-body p-0 mt-2">
                <h6>Description</h6>
                <p className="card-text">{task.taskDescription}</p>
                <h6>Technology</h6>
                {task.technology?.map((skill, skillIndex) => (
                  <span key={skillIndex} className="badge tech-badge">
                    {skill.toUpperCase()}{" "}
                  </span>
                ))}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "1rem",
                  }}
                >
                  <div>
                    <h6>Assigned By</h6>
                    <div className="mentor-wrapper">
                      <div className="image-wrapper1">
                        <div className="assignedBy-img">
                          {`${task.mentorFirstName} ${
                            task.mentorLastName === null
                              ? ""
                              : task.mentorLastName
                          }`
                            .split(" ")
                            .map((name) => name.charAt(0).toUpperCase())
                            .join("")}
                        </div>
                      </div>
                      <div className="text-wrapper1">
                        <p className="m-0">
                          <b>
                            {task.mentorFirstName} {task.mentorLastName}
                          </b>
                        </p>

                        <p className="m-0 pos-wrapper">ADMIN</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6>Assigned To</h6>

                    <div className="assigned-to ml-0">
                      {task.name.length > 5 ? (
                        <>
                          {task.name.slice(0, 5).map((name, index) => {
                            const initials = name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase();

                            return (
                              <div className="project-idea-members" key={index}>
                                <p className="name-of-members" title={name}>
                                  {initials}
                                </p>
                              </div>
                            );
                          })}
                          <div className="project-idea-members-aditional">
                            <p
                              className="name-of-members"
                              title={task.name.slice(5).join(", ")}
                            >
                              + {task.name.length - 5}
                            </p>
                          </div>
                        </>
                      ) : (
                        task.name.map((name, index) => {
                          const initials = name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase();

                          return (
                            <div className="project-idea-members" key={index}>
                              <p className="name-of-members" title={name}>
                                {initials}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <EditTaskModal
        task={taskToEdit}
        onEditClose={handleEditCloseModal}
        editedTask={editedTask}
        taskName={taskName}
        setTaskName={setTaskName}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        startEditDate={startEditDate}
        setStartEditDate={setStartEditDate}
        endEditDate={endEditDate}
        setEndEditDate={setEndEditDate}
        technologyNames={technologyNames}
        setTechnologyNames={setTechnologyNames}
        selectedTechIds={selectedTechIds}
        setSelectedTechIds={setSelectedTechIds}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        selectedUserIds={selectedUserIds}
        setSelectedUserIds={setSelectedUserIds}
      />
      <AddNewTask
        onAddClose={handleAddCloseModal}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </>
  );
};

export default AssignTask;
