import React, { useState } from "react";
import "./DropdownD.css";

const DropdownD = ({ handleChange }) => {
  //data
  const [selectedOption, setSelectedOption] = useState("None");

  //function
  const handlechange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="deploy-parent-wrapper">
      <select
        value={
          selectedOption === "None" ? "Select Deployment Type" : selectedOption
        }
        onChange={(event) => {
          handlechange(event.target.value);
          handleChange(event.target.value);
        }}
        style={{
          color: selectedOption === "None" ? "rgb(53, 53, 54, 0.7)" : "#343435",
        }}
        className="dropdown-deploy dropdown-default"
      >
        <option
          className="dropdown-default "
          value="selectdep"
          style={{ display: "none" }}
        >
          Status type
        </option>
        <option className="dropdown-default " value="None">
          None
        </option>
        <option className="option-wrapper" value="Deployed">
          Deployed
        </option>
        <option className="option-wrapper" value="Undeployed">
          Undeployed
        </option>
      </select>
    </div>
  );
};

export default DropdownD;
