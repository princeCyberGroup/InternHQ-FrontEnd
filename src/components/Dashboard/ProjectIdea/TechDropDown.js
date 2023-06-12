import React, { useState, useEffect } from "react";

const TechDropDown = (props) => {
  const [counter, setCounter] = useState(1);
  const [technologyNames] = useState([]);
  const [techNames, seTechNames] = useState({});

  const handleOptionClick = (event) => {
    // console.log(event)
    const { value } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;
    if (isChecked && !technologyNames.includes(value)) {
      //   setSelectedOptions((prevSelectedOptions) => [
      //     ...prevSelectedOptions,
      //     optionObject,
      //   ]);
      technologyNames.push(value);
      technologyNames.forEach((curElem, index) => {
        techNames[`tech${index + 1}`] = curElem;
      });
      setCounter((prevCounter) => prevCounter + 1);
      //   }
      //   console.log("data", techNames);
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
          console.log(t);
        }
      });
    }
    props.techDataComingChild(techNames);
  };
  return (
    <>
      <div
        class="form-check small"
        onClick={(e) => {
          handleOptionClick(e);
        }}
        data-value="NodeJS"
      >
        <label class="form-check-label" for="nodeJs">
          Node Js
        </label>
        <input
          class="form-check-input"
          type="checkbox"
          value="ytch"
          id="nodeJs"
        />
      </div>
      <div
        class="form-check small"
        onClick={(e) => {
          handleOptionClick(e);
        }}
        data-value="react"
      >
        <label class="form-check-label" for="react">
          React Js
        </label>
        <input
          class="form-check-input"
          type="checkbox"
          value="ytch"
          id="react"
        />
      </div>
      <div
        class="form-check small"
        onClick={(e) => {
          handleOptionClick(e);
        }}
        data-value="Angular"
      >
        <label class="form-check-label" for="angular">
          Angular Js
        </label>
        <input
          class="form-check-input"
          type="checkbox"
          value="ytch"
          id="angular"
        />
      </div>
      <div
        class="form-check small"
        onClick={(e) => {
          handleOptionClick(e);
        }}
        data-value="DotNet"
      >
        <label class="form-check-label" for="DotNet">
          DotNet
        </label>
        <input
          class="form-check-input"
          type="checkbox"
          value="ytch"
          id="DotNet"
        />
      </div>
    </>
  );
};

export default TechDropDown;
