import React, { useState, useEffect } from "react";
import axios from "axios";

const Selectlevel = (props) => {
  const [counter, setCounter] = useState(1);
  const [technologyNames, setTechnolotyNames] = useState([]);
  const [techNames, setTechNames] = useState({});
  const [allTech, setAllTech] = useState();
  const levels = ["Beginner", "Intermediate", "Advance"];
  const handleOptionClick = (event) => {
    const { value } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;
    if (isChecked && !technologyNames.includes(value)) {
      technologyNames.push(value);
      technologyNames.forEach((curElem, index) => {
        techNames[`tech${index + 1}`] = curElem;
      });
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      const index = technologyNames.indexOf(value);
      if (index !== -1) {
        technologyNames.splice(index, 1);
      }

      const keys = Object.keys(techNames);
      keys.forEach((curElem, index) => {
        if (techNames[`tech${index + 1}`] === value) {
          const t = delete techNames[`tech${index + 1}`];
          setCounter((prevCounter) => prevCounter - 1);
        }
      });
    }
    props.techDataComingChild(techNames);
  };
  return (
    <>
      {levels.map((value, index) => {
        return (
          <div
            key={index}
            className="form-check small"
            onClick={(e) => {
              handleOptionClick(e);
            }}
            data-value={value}
          >
            <label className="form-check-label" for="nodeJs">
              {value}
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              value="ytch"
              id="nodeJs"
            />
          </div>
        );
      })}
    </>
  );
};

export default Selectlevel;
