import React, { useState, useEffect } from "react";
import axios from "axios";

const TechDropDown = (props) => {
  const [counter, setCounter] = useState(1);
  const [technologyNames, setTechnolotyNames] = useState([]);
  const [techNames, setTechNames] = useState({});
  const [allTech, setAllTech] = useState();

  useEffect(() => {
    //this api call is for admin portal
    axios
      .get(`https://cg-interns-hq.azurewebsites.net/getAllTechnology`)
      .then((response) => {
        setAllTech(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      {allTech?.response.map((value, index) => {
            return (
              <div
                key={index}
                class="form-check small"
                onClick={(e) => {
                  handleOptionClick(e);
                }}
                data-value={value.techName}
              >
                <label class="form-check-label" for="nodeJs">
                  {value?.techName}
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="ytch"
                  id="nodeJs"
                />
              </div>
            );
          })}
      {/* <div
        class="form-check small"
        onClick={(e) => {
          handleOptionClick(e);
        }}
        data-value="ReactJs"
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
      </div> */}
    </>
  );
};

export default TechDropDown;
