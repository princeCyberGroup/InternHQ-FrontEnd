import React, { useState, useEffect } from "react";

const LearningTypeDropDown = ({ dropdownfunc }) => {
  const learningTypeOptions = [
    "Select learning type",
    "CG Learning Videos",
    "Self Learning",
    "Mentor Assigned Task",
    "Project",
    "Session"
  ];
  const [learningType, setLearningType] = useState("");

  useEffect(() => {
    dropdownfunc(learningType); //Passing learningType from here to DailyUpdateTable to set the value of dropdownFilterValue
  }, [learningType]);

  return (
    <div className="container">
      <form className="d-flex">
        <select
          className="form-select pos-6"
          id="learning"
          aria-label=""
          onChange={(event) => {
            setLearningType(event.target.value);
          }}
        >
          {learningTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default LearningTypeDropDown;
