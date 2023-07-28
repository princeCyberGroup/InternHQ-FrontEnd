import React from "react";
import axios from "axios";
import { ReactComponent as Alert } from "../../Assets/alert-red.svg";
import { ReactComponent as AlertBlue } from "../../Assets/alert-blue.svg";
import { ReactComponent as Close } from "../../Assets/close.svg";
import "./Confirmation.css";

const Confirmation = ({ id, handleCancel, handleDel,confirmationValue, handleConfirm }) => {
  const handleDelete = () => {
    axios
      .post(process.env.REACT_APP_API_URL + `/api/v3/removeExam`, {
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
        {confirmationValue === "manageskill" && <div className="confirmation-child-wrapper">
          <Alert className="alert-wrapper" fill="green" />
          <div className="delete-task">Delete Task?</div>
          <div className="text-wrapper-confirm">Are you sure you want to delete the task?</div>
          <div className="confirm-btn-wrapper">
            <div className="confirm-cancel-btn" onClick={handleCancel} >No, cancel</div>
            <div className="confirm-delete-btn" onClick={handleDelete}>Yes, delete</div>
          </div>
        </div>}
        {confirmationValue === "report" && <div className="confirmation-child-wrapper">
          <AlertBlue className="alert-wrapper" fill="green" />
          <div className="confirm-task">Confirm</div>
          <div className="text-wrapper-confirm">Are you sure you want to confirm the changes?</div>
          <div className="confirm-btn-wrapper">
            <div className="confirm-cancel-btn" onClick={handleCancel} >No, cancel</div>
            <div className="confirm-deploy-btn" onClick={handleConfirm}>Yes, confirm</div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Confirmation;
