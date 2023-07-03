import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ProjectIdea/TechDropDown.css"
const TechDropDown = (props) => {
  const [counter, setCounter] = useState(1);
  const [technologyNames, setTechnolotyNames] = useState([]);
  const [techNames, setTechNames] = useState({});
  const [allTech, setAllTech] = useState();

  useEffect(() => {
    //this api call is for admin portal
    axios
      .get(process.env.REACT_APP_API_URL+`/api/v2/getAllTechnology`,
      {
        headers: {
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
        },
      })
      .then((response) => {
        setAllTech(response.data.response.sort((a, b) => {
          const nameA = a.techName.toUpperCase();
          const nameB = b.techName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0; // names are equal
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          // console.log(t);
        }
      });
    }
    props.techDataComingChild(techNames);
  };
  return (
    <div className="drop-tech">
      {allTech?.map((value, index) => {
        return (
          <div
            key={index}
            className="form-check small checkbox"
            onClick={(e) => {
              handleOptionClick(e);
            }}
            data-value={value.techName}
          >
            <label className="form-check-label tech-label" for={value.techName}>
              {value?.techName}
            </label>
            <input
              className="form-check-input techDrop"
              type="checkbox"
              value="ytch"
              id="nodeJs"
            />
          </div>
        );
      })}
    </div>
  );
};

export default TechDropDown;
