import React, { useState, useEffect } from "react";
import axios from "axios";

const TechDropDown = (props) => {
  
  const [techOptions, setTechOptions] = useState([]);

  useEffect(() => {
    const fetchTechOptions = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL+"/api/v2/getAllTechnology",
          {
            headers: {
              Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
            },
          }
        );
        setTechOptions(response.data?.response.sort((a, b) => {
          const nameA = a.techName.toUpperCase();
          const nameB = b.techName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0; // names are equal
        }) || []);
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
        props.setTechnologyNames(techOptions);
        props.setSelectedTechIds(techOptions.map((tech) => tech.techId));
      } else {
        props.setTechnologyNames([]);
        props.setSelectedTechIds([]);
      }
    } else {
      if (isChecked) {
        props.setTechnologyNames((prevSelectedTech) => [
          ...prevSelectedTech,
          { techName: value },
        ]);
        props.setSelectedTechIds((prevSelectedTechIds) => [
          ...prevSelectedTechIds,
          id,
        ]);
      } else {
        props.setTechnologyNames((prevSelectedTech) =>
          prevSelectedTech.filter((techName) => techName.techName !== value)
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