import React, { useContext } from "react";
import { ReactComponent as Cong } from "../../../../Assets/Group 7Congrats.svg";
//import { useLocation } from 'react-router-dom';
import "./Congo.css";
import { UserContext } from "../../../../Context/Context";
// import {ReactComponent as Close} from "../../../../Assets/close.svg";
const Congo = () => {
  const { score, setScore } = useContext(UserContext);
  const onClickHandler = () => {
    setScore(-1);
  };
  return (
    <div>
      <div className="parent-wrapper">
        <div className="child-wrapper">
          <div className="row crossBtn">
            <button
              type="button"
              className="btn-close"
              onClick={onClickHandler}
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
            <p>{score}/100</p>
          </div>
          <div className="row c4">
            <p>
              You have collected the skill and earned a star. Keep up the great
              work!.
            </p>
          </div>
          <div className="row Ccontinue">
            <button type="button" className="view-result-btn">
              View Result
            </button>
            <button
              type="button"
              className="continueBtn"
              onClick={onClickHandler}
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
