import React, { useState } from "react";
import {ReactComponent as SuccessfullVector} from "../../../Assets/VectorSucessfull.svg";
import "./Successfull.css";
const SuccessfullTest = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleCross = (e) =>{
        e.preventDefault();
        setIsOpen(false);
    }
    if(!isOpen){
        return null;
    }

  return (
 
      <div className="pp-popup-wrapper">
          <div className="pp-cross-btn">
            <button
              type="button"
              className="btn-close me-2"
              onClick={(e) => handleCross(e)}
            ></button>
          </div>
          <div className="">
          <SuccessfullVector/>
          </div>
          <div className="successfull-text mt-3">
            New Skill Set Test <br/>
            Uploaded Successfully
          </div>
          <div>
            <button type="button" className="pp-ok-btn mt-4">
              OK
            </button>
           
          </div>
       
      </div>
  );
};

export default SuccessfullTest;
