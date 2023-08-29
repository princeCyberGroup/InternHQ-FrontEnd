import React from "react";
import { ReactComponent as DeleteVector } from "../../../../../Assets/VectordeleteTsk.svg";
import axios from "axios";
import CryptoJS from "crypto-js";

const DeleteProject = ({
  projectId,
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
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/api/deleteProject",
        {
          userId,
          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      )
      .then((res) => {
        console.log("print", res.data);

        setIsOpen(false);
        setShowDeleteTask(false);
        setTaskVersion((prevVersion) => prevVersion + 1);
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
          <p className="d-flex justify-content-center">Delete Project </p>
          <p className="d-flex justify-content-center">
            {" "}
            Are you sure you want to delete the project?
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

export default DeleteProject;
