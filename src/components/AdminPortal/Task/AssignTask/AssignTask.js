import React, { useState, useEffect } from "react";
import "./AssignTask.css";
import { ReactComponent as Delete } from "../../../../Assets/Buttondelete.svg";
import { ReactComponent as Edit } from "../../../../Assets/Buttonedit.svg";
import { ReactComponent as Plus } from "../../../../Assets/+plusbtn.svg";
import { ReactComponent as NoTask } from "../../../../Assets/Group 3EmpGraph.svg";
import axios from "axios";
import { AddNewTask } from "./AddNewTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import DeleteTask from "../DeleteTask";


const AssignTask = () => {
  const [tasks, setTasks] = useState([]);

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskIdToChild, setTaskIdToChild] = useState(0);
  const [taskVersion, setTaskVersion] = useState(0); // Add task version state
  const [editedTask, setEditedTask] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");


  useEffect(() => {
    setEditedTask(taskToEdit);
   
  }, [taskToEdit]);

  useEffect(() => {
setTaskName(editedTask?.taskName)
   setTaskDescription(editedTask?.taskDescription)
  }, [editedTask]);



  useEffect(() => {
    // Fetch tasks from the API
    axios
      .get(process.env.REACT_APP_API_URL+"/api/v2/getAssignedTask",
      {
        headers: {
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
        },
      })
      .then((response) => {
        setTasks(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [taskVersion]);

  const handleAddTask = () => {
  };

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
          className="add-mentor-button"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
          onClick={() => handleAddTask()}
        >
          <Plus />
          Add New Task
        </button>
      </div>
      <div style={{ maxHeight: "80vh", overflow: "auto", width: "820px" }}>
        {tasks.length === 0 ? (
          <div className="card empty-task-state d-flex justify-content-center align-items-center">
            <div
            className="col-12 d-flex justify-content-center"
            // style={{ marginTop: "70px" }}
          >
            <NoTask />
          </div>
          <div className="col-12 d-flex justify-content-center assign-task-empty">
            <p>No Task Assigned Yet! </p>
          </div>
            </div>
        ) :(
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
                {/* <p className="mb-1 task-title">Task Title</p> */}
                <h5 className="task-name mb-0 mt-2">{task.taskName}</h5>
              </div>
              <div className="card-body p-0 mt-2" style={{ width: "780px" }}>
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
                          {`${task.mentorFirstName} ${task.mentorLastName===null?"":task.mentorLastName}`
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

                        <p className="m-0 pos-wrapper">
                          {/* {task.assignedBydesignation} */}
                          ADMIN
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6>Assigned To</h6>

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
              </div>
            </div>
            
          )))}
      </div>
      {/* <AddNewTask/> */}
      <EditTaskModal
        task={taskToEdit}
        onEditClose={handleEditCloseModal}
        technology={tasks.technology}
        assignedTo={tasks.name}
        editedTask={editedTask}
        taskName={taskName}
        setTaskName={setTaskName}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
      />
      <AddNewTask onAddClose={handleAddCloseModal} />

      {/* {renderAddNewTaskModal()} */}
    </>
  );
};

export default AssignTask;


// USE REDUCER CODE BELOW


// import React, { useState, useEffect, useReducer } from "react";
// import "./AssignTask.css";
// import { ReactComponent as Delete } from "../../../../Assets/Buttondelete.svg";
// import { ReactComponent as Edit } from "../../../../Assets/Buttonedit.svg";
// import { ReactComponent as Plus } from "../../../../Assets/+plusbtn.svg";
// import { ReactComponent as NoTask } from "../../../../Assets/Group 3EmpGraph.svg";
// import axios from "axios";
// import { AddNewTask } from "./AddNewTaskModal";
// import { EditTaskModal } from "./EditTaskModal";
// import DeleteTask from "../DeleteTask";

// // Action types
// const ActionTypes = {
//   SET_SHOW_OPTIONS: "SET_SHOW_OPTIONS",
//   SET_TASKS: "SET_TASKS",
//   SET_TASK_TO_EDIT: "SET_TASK_TO_EDIT",
//   SET_SHOW_DELETE_TASK: "SET_SHOW_DELETE_TASK",
//   SET_IS_OPEN: "SET_IS_OPEN",
//   SET_ON_DELETE: "SET_ON_DELETE",
//   SET_TASK_ID_TO_CHILD: "SET_TASK_ID_TO_CHILD",
//   INCREMENT_TASK_VERSION: "INCREMENT_TASK_VERSION",
//   SET_EDITED_TASK: "SET_EDITED_TASK",
//   SET_TASK_NAME: "SET_TASK_NAME",
//   SET_TASK_DESCRIPTION: "SET_TASK_DESCRIPTION"
// };

// // Reducer function
// const reducer = (state, action) => {
//   switch (action.type) {
//     case ActionTypes.SET_SHOW_OPTIONS:
//       return { ...state, showOptions: action.payload };
//     case ActionTypes.SET_TASKS:
//       return { ...state, tasks: action.payload };
//     case ActionTypes.SET_TASK_TO_EDIT:
//       return { ...state, taskToEdit: action.payload };
//     case ActionTypes.SET_SHOW_DELETE_TASK:
//       return { ...state, showDeleteTask: action.payload };
//     case ActionTypes.SET_IS_OPEN:
//       return { ...state, isOpen: action.payload };
//     case ActionTypes.SET_ON_DELETE:
//       return { ...state, onDelete: action.payload };
//     case ActionTypes.SET_TASK_ID_TO_CHILD:
//       return { ...state, taskIdToChild: action.payload };
//     case ActionTypes.INCREMENT_TASK_VERSION:
//       return { ...state, taskVersion: state.taskVersion + 1 };
//     case ActionTypes.SET_EDITED_TASK:
//       return { ...state, editedTask: action.payload };
//     case ActionTypes.SET_TASK_NAME:
//       return { ...state, taskName: action.payload };
//     case ActionTypes.SET_TASK_DESCRIPTION:
//       return { ...state, taskDescription: action.payload };
//     default:
//       return state;
//   }
// };

// const AssignTask = () => {
//   const initialState = {
//     showOptions: false,
//     tasks: [],
//     taskToEdit: null,
//     showDeleteTask: false,
//     isOpen: false,
//     onDelete: false,
//     taskIdToChild: 0,
//     taskVersion: 0,
//     editedTask: {},
//     taskName: "",
//     taskDescription: ""
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   const {
//     showOptions,
//     tasks,
//     taskToEdit,
//     showDeleteTask,
//     isOpen,
//     onDelete,
//     taskIdToChild,
//     taskVersion,
//     editedTask,
//     taskName,
//     taskDescription
//   } = state;

//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const assignedByFirstName = userData ? userData.firstName : null;
//   const assignedByLastName = userData ? userData.lastName : null;

//   useEffect(() => {
//     // Fetch tasks from the API
//     axios
//       .get("https://cg-interns-hq.azurewebsites.net/getAssignedTask")
//       .then((response) => {
//         dispatch({ type: ActionTypes.SET_TASKS, payload: response.data });
//       })
//       .catch((error) => {
//         console.error("Error fetching tasks:", error);
//       });
//   }, [taskVersion]);

//   useEffect(() => {
//     dispatch({ type: ActionTypes.SET_EDITED_TASK, payload: taskToEdit });
//   }, [taskToEdit]);

//   useEffect(() => {
//     dispatch({ type: ActionTypes.SET_TASK_NAME, payload: editedTask?.taskName });
//     dispatch({ type: ActionTypes.SET_TASK_DESCRIPTION, payload: editedTask?.taskDescription });
//   }, [editedTask]);

//   const handleAddTask = () => {
//     // Add logic for adding a new task
//     // ...

//     // Increment taskVersion to trigger useEffect and fetch updated tasks
//     dispatch({ type: ActionTypes.INCREMENT_TASK_VERSION });
//   };

//   const handleEditTask = (task) => {
//     dispatch({ type: ActionTypes.SET_TASK_TO_EDIT, payload: task });
//   };

//   const deleteTask = (taskId) => {
//     dispatch({ type: ActionTypes.SET_TASK_ID_TO_CHILD, payload: taskId });
//     dispatch({ type: ActionTypes.SET_SHOW_DELETE_TASK, payload: true });
//   };

//   const handleEditCloseModal = () => {
//     dispatch({ type: ActionTypes.SET_TASK_TO_EDIT, payload: null });
//     dispatch({ type: ActionTypes.INCREMENT_TASK_VERSION });
//   };

//   const handleAddCloseModal = () => {
//     dispatch({ type: ActionTypes.INCREMENT_TASK_VERSION });
//   };

//   return (
//     <div className="container">
//       <h1>Assign Task</h1>
//       <button className="add-task-btn" onClick={() => dispatch({ type: ActionTypes.SET_SHOW_OPTIONS, payload: true })}>
//         <Plus /> Assign New Task
//       </button>
//       {tasks.length === 0 ? (
//         <div className="no-task-container">
//           <NoTask />
//           <p>No Task Assigned Yet!</p>
//         </div>
//       ) : (
//         <div className="tasks-container">
//           {Array.isArray(tasks) && tasks.map((task) => (
//             <div key={task.id} className="task-card">
//               <div className="task-info">
//                 <h3>{task.taskName}</h3>
//                 <p>{task.taskDescription}</p>
//                 <p>
//                   Assigned by: {assignedByFirstName} {assignedByLastName}
//                 </p>
//                 <p>Assigned to: {task.assignedTo}</p>
//               </div>
//               <div className="task-actions">
//                 <button className="edit-btn" onClick={() => handleEditTask(task)}>
//                   <Edit />
//                 </button>
//                 <button className="delete-btn" onClick={() => deleteTask(task.id)}>
//                   <Delete />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {showOptions && <AddNewTask onClose={handleAddCloseModal} />}
//       {taskToEdit && (
//         <EditTaskModal
//           task={taskToEdit}
//           taskName={taskName}
//           taskDescription={taskDescription}
//           onClose={handleEditCloseModal}
//         />
//       )}
//       {showDeleteTask && <DeleteTask taskId={taskIdToChild} isOpen={isOpen} onDelete={onDelete} />}
//     </div>
//   );
// };

// export default AssignTask;
