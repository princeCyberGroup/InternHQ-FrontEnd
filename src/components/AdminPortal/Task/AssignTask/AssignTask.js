import React, { useState, useEffect } from "react";
import "./AssignTask.css";
import { ReactComponent as Delete } from "../../../../Assets/Buttondelete.svg";
import { ReactComponent as Edit } from "../../../../Assets/Buttonedit.svg";
import { ReactComponent as Plus } from "../../../../Assets/+plusbtn.svg";
import axios from "axios";
import { AddNewTask } from "./AddNewTaskModal";
import DeleteTask from "../DeleteTask";

// const assignedTo = ["Prince", "Nikhil", "Karan","Pankaj","Varun"];

const AssignTask = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [taskIdToChild, setTaskIdToChild] = useState(0);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const assignedByFirstName = userData ? userData.firstName : null;
  const assignedByLastName = userData ? userData.lastName : null;

  useEffect(() => {
    // Fetch tasks from the API
    axios
      .get("https://cg-interns-hq.azurewebsites.net/getAssignedTask")
      .then((response) => {
        setTasks(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const deleteTask = (e, taskId, index) => {
    e.preventDefault();
    setTaskIdToChild(taskId);
    setShowDeleteTask(true);
    setIsOpen(true);
    console.log("delete task", taskId, index);
  };
  // const deleteTask = (e,taskId,index,onDelete) => {
  //   e.preventDefault();
  //   setShowDeleteTask(true);
  //   setIsOpen(true)
  //   console.log("delete task",taskId,index);
  //   if(onDelete===true){
  //      axios
  //       .post("https://cg-interns-hq.azurewebsites.net/deleteTask", {
  //       taskId
  //       })
  //       .then((res) => {
  //         console.log("print", res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //   }
  // };

  const handleAddTask = () => {
    setModalOpen(true);
  };


  const handleCloseModal = () => {
    setModalOpen(false);
    setTaskToEdit(null);
    setEditModalOpen(false);
  };
  // const renderAddNewTaskModal = () => {
  //   if (editModalOpen) {
  //     return (
  //       <AddNewTask task={taskToEdit} onClose={handleCloseModal} />
  //     );
  //   }
  //   return null;
  // };

  return (
    <>
      {showDeleteTask ? (
        <DeleteTask
          taskId={taskIdToChild}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowDeleteTask={setShowDeleteTask}
        />
      ) : (
        ""
      )}
      <div className="assign-task-container">
        <p>Assign Task</p>
        <button
          type="button"
          className="add-mentor-button"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
          // onClick={handleAddTask}
        >
          <Plus />
          Add New Task
        </button>
      </div>
      <div style={{ maxHeight: "90vh", overflow: "auto", width: "820px" }}>
        {tasks?.map((task, index) => (
          <div className="card task-card" key={task.taskId}>
            <div className="dots">
              <Edit
                className="mx-3"
                data-bs-toggle="modal"
                data-bs-target="#addTaskModal"
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
              <p className="mb-1 task-title">Task Title</p>
              <h5 className="task-name mb-0">{task.taskName}</h5>
            </div>
            <div className="card-body p-0" style={{ width: "780px" }}>
              <h6>Description</h6>
              <p className="card-text">{task.taskDescription}</p>
              <h6>Technology</h6>
              {task.technology?.map((skill, skillIndex) => (
                <span key={skillIndex} className="badge tech-badge">
                  {skill.toUpperCase()}{" "}
                  {/*Replace with mentorskills from API response */}
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
                      
                              {`${task.mentorFirstName} ${task.mentorLastName}`
                            .split(" ")
                            .map((name) => name.charAt(0).toUpperCase())
                            .join("")}
                           
                      </div>
                    </div>
                    <div className="text-wrapper1">
                      <p className="m-0">
                        <b>{task.mentorFirstName} {task.mentorLastName}</b>
                      </p>

                      <p className="m-0 pos-wrapper">
                        {/* {task.assignedBydesignation} */}
                        ADMIN
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h6>Assigned To</h6>
                  {/* <div className="assigned-to ml-0">
                    {task.name.length > 4 ? (
                      <>
                        {task.name.slice(0, 4).map((name, index) => {
                          const initials = name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase();

                          return (
                            <div className="project-idea-members" key={index}>
                              <p className="name-of-members">{initials}</p>
                            </div>
                          );
                        })}
                        <div className="project-idea-members">
                          <p className="name-of-members">
                            + {task.name.length - 4}
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
                            <p className="name-of-members">{initials}</p>
                          </div>
                        );
                      })
                    )}
                  </div> */}
                  <div className="assigned-to ml-0">
                    {task.name.length > 4 ? (
                      <>
                        {task.name.slice(0, 4).map((name, index) => {
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
                        <div className="project-idea-members">
                          <p className="name-of-members">
                            + {task.name.length - 4}
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
              <div
                className="row cards main-card-inside"
                style={{ maxHeight: "470px", overflow: "auto" }}
              >
                <div className="row d-flex justify-content-evenly"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <AddNewTask/> */}
      {editModalOpen && (
        <AddNewTask task={taskToEdit} onClose={handleCloseModal} />
      )}
      {!editModalOpen && <AddNewTask onClose={handleCloseModal} />}

      {/* {renderAddNewTaskModal()} */}
    </>
  );
};

export default AssignTask;
