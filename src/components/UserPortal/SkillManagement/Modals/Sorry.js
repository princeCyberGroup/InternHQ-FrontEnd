import React,{ useEffect,useState,useContext }  from "react";
import { ReactComponent as Sor } from "../../../../Assets/EmojiSorry.svg";
import "./Sorry.css"
import { UserContext } from "../../../../Context/Context";

const Sorry = ( ) => {
const {score} = useContext(UserContext);
console.log("sorry is called");

 // const location =useLocation()
// console.log(score);
  return (
    <div
      className="modal fade"
      id="sorryModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content srSize">
          <div className="row crossBtn">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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
            <p>{score}/10</p>
          </div>
          <div className="row s4">
            <p>
              Looks like you didn't score high enough to collect the skill. Keep
              practicing and try again to improve your score. You got this!"
            </p>
          </div>
          <div className="row Scontinue">
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

export default Sorry;
