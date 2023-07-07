import React, { useState, useEffect } from "react";
import axios from "axios";

const TechDropDown = (props) => {
  const [techOptions, setTechOptions] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [filteredTechOptions, setFilteredTechOptions] = useState([]);

  useEffect(() => {
    const fetchTechOptions = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/v2/getAllTechnology",
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
            },
          }
        );
        const sortedOptions = response.data?.response.sort((a, b) => {
          const nameA = a.techName.toUpperCase();
          const nameB = b.techName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0; // names are equal
        }) || [];
        setTechOptions(sortedOptions);
        setFilteredTechOptions(sortedOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTechOptions();
  }, []);

  const handleOptionClick = (event) => {
    const { value, id } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;

    if (!isChecked && props.technologyNames.some((tech) => tech.techName === value)) {
      // If the checkbox is unchecked and the value is already in the selected technology names,
      // remove it from the selected technology names and selected tech ids.
      props.setTechnologyNames((prevSelectedTech) =>
        prevSelectedTech.filter((techName) => techName.techName !== value)
      );
      props.setSelectedTechIds((prevSelectedTechIds) =>
        prevSelectedTechIds.filter((techId) => techId !== id)
      );
    } else if (isChecked && !props.technologyNames.some((tech) => tech.techName === value)) {
      // If the checkbox is checked and the value is not in the selected technology names,
      // add it to the selected technology names and selected tech ids.
      props.setTechnologyNames((prevSelectedTech) => [
        ...prevSelectedTech,
        { techName: value },
      ]);
      props.setSelectedTechIds((prevSelectedTechIds) => [...prevSelectedTechIds, id]);
    }
  };

  const handleSearchChange = (e) => {
    props.setSearchQuery(e.target.value);
    const filtered = techOptions.filter((tech) =>
      tech.techName.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilteredTechOptions(filtered);
  };

  useEffect(() => {
    if (props.technologyNames) {
      const selectedTechNames = props.technologyNames.map((tech) => tech.techName);
      props.techDataComingChild(selectedTechNames);
    }
  }, [props.technologyNames]);

  return (
    <div className="drop-tech">
      <input
        style={{float:"right", marginRight:"1rem"}}
        type="text"
        // className="form-control"
        placeholder="Search tech..."
        value={props.searchQuery}
        onChange={handleSearchChange}
      />
      {filteredTechOptions.map((tech) => (
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
