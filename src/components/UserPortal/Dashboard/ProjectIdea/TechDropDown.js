import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ProjectIdea/TechDropDown.css"
const TechDropDown = (props) => {
  const [counter, setCounter] = useState(1);
  // const [props.technologyNames, setTechnologyNames] = useState([]);
  // const [props.techNames, setprops.techNames] = useState({});
  const [allTech, setAllTech] = useState();

  useEffect(() => {
    //this api call is for admin portal
    axios
      .get(`https://cg-interns-hq.azurewebsites.net/getAllTechnology`)
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
        console.log(response.data.response)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOptionClick = (event) => {
    const { value } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;
    if (isChecked && !props.technologyNames.includes(value)) {
      props.technologyNames.push(value);
      props.technologyNames.forEach((curElem, index) => {
        props.techNames[`tech${index + 1}`] = curElem;
      });
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      const index = props.technologyNames.indexOf(value);
      if (index !== -1) {
        props.technologyNames.splice(index, 1);
      }

      const keys = Object.keys(props.techNames);
      keys.forEach((curElem, index) => {
        if (props.techNames[`tech${index + 1}`] === value) {
          const t = delete props.techNames[`tech${index + 1}`];
          setCounter((prevCounter) => prevCounter - 1);
          // console.log(t);
        }
      });
    }
    props.techDataComingChild(props.techNames);
   
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
            <label className="form-check-label" for={value.techName}>
              {value?.techName}
            </label>
            <input
              className="form-check-input tech-checkbox"
              type="checkbox"
              value={value.techName}
            />
          </div>
        );
      })}
    </div>
  );
};
  
export default TechDropDown;
