import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../ProjectIdea/TechDropDown.css";

const TechDropDown = (props) => {
  const [techOptions, setTechOptions] = useState([]);
  // const [technologyNames, setTechnolotyNames] = useState([]);

  useEffect(() => {
    const fetchTechOptions = async () => {
      try {
        const response = await axios.get(
          "https://cg-interns-hq.azurewebsites.net/getAllTechnology"
        );
        setTechOptions(response.data?.response || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechOptions();
  }, []);

  const handleOptionClick = (event) => {
    const { value, id } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;

    if (value === "Select all") {
      if (isChecked) {
        props.setTechnolotyNames(techOptions)
        props.setSelectedTechIds(techOptions.map((tech) => tech.techId));
      } else {
        props.setTechnolotyNames([]);
        props.setSelectedTechIds([]);
      }
    } else {
      if (isChecked) {
        props.setTechnolotyNames((prevSelectedTech) => [
          ...prevSelectedTech,
          { techName: value },
        ]);
        props.setSelectedTechIds((prevSelectedTechIds) => [...prevSelectedTechIds, id]);
      } else {
        props.setTechnolotyNames((prevSelectedTech) =>
        prevSelectedTech.filter((techName) => techName !== value)
        );
        props.setSelectedTechIds((prevSelectedTechIds) =>
          prevSelectedTechIds.filter((techId) => techId !== id)
        );
      }
    }
  };

  useEffect(() => {
    if (props.technologyNames) {
      const selectedTechNames = props.technologyNames.map((tech) => tech.techName);
      props.techDataComingChild(selectedTechNames);
    }
  }, [props.technologyNames]);
  

  // useEffect(() => {
  //   const selectedTechNames = props.technologyNames.map((tech) => tech.techName);
  //   props.techDataComingChild(selectedTechNames);
  // }, [props.technologyNames]);

  return (
    <div className="drop-tech">
      {[
        { techId: "select-all", techName: "Select all" },
        ...techOptions,
      ].map((tech) => (
        <div
          key={tech.techId}
          className="form-check small checkbox"
          onClick={handleOptionClick}
          data-value={tech.techName}
          data-id={tech.techId}
        >
          <label className="form-check-label tech-label" htmlFor={tech.techName}>
            {tech.techName}
          </label>
          <input
            className="form-check-input tech-checkbox"
            type="checkbox"
            value={tech.techName}
            id={tech.techId}
          />
        </div>
      ))}
    </div>
  );
};

export default TechDropDown;