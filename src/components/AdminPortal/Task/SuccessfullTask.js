import React, { useState } from "react";
import {ReactComponent as SuccessfullVector} from "../../Assets/VectorSucessfull.svg";
import "./Successfull.css";

const SuccessfullTask = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleCross = (e) =>{
        e.preventDefault();
        setIsOpen(false);
    }
    if(!isOpen){
        return null;
    }

  return (
 
      <div className="sucessfull-popup-wrapper">
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
            <p>Task Uploaded Successfully</p>
          </div>
          <div className="">
            <button type="button" className="pp-ok-btn">
              OK
            </button>
           
          </div>
       
      </div>

  );
};

export default SuccessfullTask;
