import React from "react";
import { ReactComponent as DeleteVector } from "../../../Assets/VectordeleteTsk.svg";
import "./Successfull.css";
import axios from "axios";
const DeleteTask = ({
  taskId,
  setIsOpen,
  setShowDeleteTask,
  setTaskVersion,
}) => {
  const handleCross = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setShowDeleteTask(false);
  };
  const confirmDelete = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/api/v3/deleteTask", {
        taskId,
      })
      .then((res) => {
        console.log("print", res.data);
        if (res.data.taskId === taskId) {
          setIsOpen(false);
          setShowDeleteTask(false);
          setTaskVersion((prevVersion) => prevVersion + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="delete-task-wrapper">
      <div className="pp-popup-wrapper">
        <div className="pp-cross-btn mt-2">
          <button
            type="button"
            className="btn-close me-2"
            onClick={(e) => handleCross(e)}
          ></button>
        </div>
        <div className="row mt-5">
          <DeleteVector />
        </div>
        <div className="row mt-3 d-flex ">
          <p className="d-flex justify-content-center">Delete Task </p>
          <p className="d-flex justify-content-center">
            {" "}
            Are you sure you want to delete the task?
          </p>
        </div>
        <div className="row d-flex justify-content-center">
          <button
            type="button"
            className="pp-no-btn me-1"
            onClick={(e) => handleCross(e)}
          >
            No, Cancel
          </button>
          <button
            type="button"
            className="pp-yes-btn ms-1"
            onClick={() => confirmDelete()}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
