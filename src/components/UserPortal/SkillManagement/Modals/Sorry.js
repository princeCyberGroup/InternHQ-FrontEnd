import React, { useEffect, useState, useContext } from "react";
import { ReactComponent as Sor } from "../../../../Assets/EmojiSorry.svg";
import "./Sorry.css";
import { UserContext } from "../../../../Context/Context";

const Sorry = () => {
  const { score, setScore } = useContext(UserContext);

  const continueHandler = () => {
    setScore(-1);
  };
  return (
    <div>
      <div className="sorry-parent-wrapper">
        <div className="sorry-child-wrapper">
          <div className="row crossBtn">
          <button
              type="button"
              className="btn-close"
              onClick={continueHandler}
            ></button>
          </div>
          <div className="row sEmoji">
            <Sor />
          </div>
          <div className="row s1">
            <p>Ohh Sorry!</p>
          </div>
          <div className="row s2">
            <p>Your Score</p>
          </div>
          <div className="row s3">
            <p>{score}/100</p>
          </div>
          <div className="row s4">
            <p>
              Looks like you didn't score high enough to collect the skill. Keep
              practicing and try again to improve your score. You got this!"
            </p>
          </div>
          <div className="row Scontinue">
            {/* <button type="button" className="sorry-view-result-btn">
              View Result
            </button> */}
            <button
              type="button"
              className="continueBtn"
              onClick={continueHandler}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorry;
