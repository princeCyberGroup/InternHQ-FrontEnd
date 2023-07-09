import React from "react";
import axios from "axios";
import { ReactComponent as Alert } from "../../../Assets/alert-red.svg";
import { ReactComponent as Close } from "../../../Assets/close.svg";
import "./Confirmation.css";

const Confirmation = ({ id, handleCancel, handleDel }) => {
  const handleDelete = () => {
    axios
      .post(process.env.REACT_APP_API_URL + `/api/v2/removeExam`, {
        examId: id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    handleDel(id);
  };
  return (
    <div className="confirmation-parent-wrapper" onClick={handleCancel}>
      <div className="child-wrapper">
        <div className="cross-wrapper">
          <Close className="cross-cls" onClick={handleCancel} />
        </div>
        <div className="confirmation-child-wrapper">
          <Alert className="alert-wrapper" />
          <div className="delete-task">Delete Task?</div>
          <div className="text-wrapper">Are you sure you want to delete the task?</div>
          <div className="confirm-btn-wrapper">
            <div className="confirm-cancel-btn" onClick={handleCancel} >No, cancel</div>
            <div className="confirm-delete-btn" onClick={handleDelete}>Yes, delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
