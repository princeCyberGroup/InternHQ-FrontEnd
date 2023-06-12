import React from "react";
import { ReactComponent as Cong } from "../../../../Assets/Group 7Congrats.svg";
//import { useLocation } from 'react-router-dom';
import "./Congo.css";

const Congo = ({scoreValue}) => {
  return (
    <div
      className="modal fade"
      id="congoModal123"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content mSize">
          <div className="row crossBtn">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="row cStar">
            <Cong />
          </div>
          <div className="row c1">
            <p>Congratulations!</p>
          </div>
          <div className="row c2">
            <p>Your Score</p>
          </div>
          <div className="row c3">
            <p>{scoreValue}/10</p>

          </div>
          <div className="row c4">
            <p>
              You have collected the skill and earned a star. Keep up the great
              work!.
            </p>
          </div>
          <div className="row Ccontinue">
            <button
              type="button"
              className="continueBtn"
              data-bs-dismiss="modal"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congo;
