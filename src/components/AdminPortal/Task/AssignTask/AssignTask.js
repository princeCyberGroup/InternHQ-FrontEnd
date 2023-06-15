import React,{useState,useEffect} from "react";
import "./AssignTask.css";
import { ReactComponent as Delete } from "../../../../Assets/Buttondelete.svg"
import { ReactComponent as Edit } from "../../../../Assets/Buttonedit.svg"
import axios from "axios";
import { AddNewTask } from "./AddNewTaskModal";

// const assignedTo = ["Prince", "Nikhil", "Karan","Pankaj","Varun"];

const AssignTask = () => {

  const [showOptions, setShowOptions] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch tasks from the API
    axios.get("https://cg-interns-hq.azurewebsites.net/getAssignedTask")
      .then(response => {
        setTasks(response.data.response);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);


  const handleAddTask = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="assign-task-container"
      >
        <p>Assign Task</p>
        <button type="button"
        className="btn add-mentor-button"
        data-bs-toggle="modal"
        data-bs-target="#addTaskModal"
        onClick={handleAddTask}
         >
          Add New Task
          </button>
      </div>
      <div style={{maxHeight:"40rem",overflow:"auto",width:"820px"}}>
      {tasks.map(task => (
        <div className="card task-card" key={task.taskId}>
          <div className="dots">
            <Edit className="mx-3"/>
            <Delete/>
          </div>
          <div className="card-title mb-0">
            <p className="mb-1 task-title">Task Title</p>
            <h5 className="task-name mb-0">{task.taskName}</h5>
          </div>
          <div className="card-body p-0" style={{width:"780px"}}>
            <h6>Description</h6>
            <p className="card-text">{task.taskDescription}</p>
            <h6>Technology</h6>
            {task.technology.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="badge tech-badge"
                          >
                             {skill.toUpperCase()} {/*Replace with mentorskills from API response */}
                          </span>
                        ))}
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"1rem"}}>
              <div>
            <h6>Assigned By</h6>
            <div className="mentor-wrapper">
                <div className="image-wrapper1">
                  <div className="image-box1">
                    <img
                      src=""
                      width={38}
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-wrapper1">
                  <p className="m-0" >
                    <b>Lagnesh Thakur</b> 
                  </p>
                  
                  <p className="m-0 pos-wrapper">Manager 3 </p>
                  
                  
                </div>
                </div>
            </div>
            <div style={{marginRight:"15rem"}}>
            <h6>Assigned To</h6>
            <div className="project-members ml-0">
            {task.name.length > 2 ? (
    <>
      {task.name.slice(0, 2).map((name, index) => {
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
        <p className="name-of-members">+ {task.name.length - 2}</p>
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
      <AddNewTask isOpen={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AssignTask;

