import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";

const TechDropDown = (props) => {
  const [techOptions, setTechOptions] = useState([]);
  const navigate = useNavigate();
  const [filteredTechOptions, setFilteredTechOptions] = useState([]);

  useEffect(() => {
    const fetchTechOptions = async () => {
      const secretkeyUser = process.env.REACT_APP_USER_KEY;
      var parsedObject;
      const data = localStorage.getItem("userData");
      if (data) {
        const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
        const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
        parsedObject = JSON.parse(decryptedJsonString);
      } else {
        console.log("No encrypted data found in localStorage.");
      }
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/v3/getAllTechnology",
          {
            headers: {
              Authorization: `Bearer ${parsedObject["token"]}`,
            },
          }
        );
        const sortedOptions =
          response.data?.response.sort((a, b) => {
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
        if (error.response.status === 401) {
          navigate("/error/statusCode=401");
        }
        if (error.response.status === 400) {
          navigate("/error/statusCode=400");
        }
        if (error.response.status === 500) {
          navigate("/error/statusCode=500");
        }
        if (error.response.status === 404) {
          navigate("/error/statusCode=404");
        }
        console.error(error);
      }
    };
    fetchTechOptions();
  }, []);

  // const handleOptionClick = (event) => {
  //   const { value, id } = event.currentTarget.dataset;
  //   const isChecked = event.currentTarget.querySelector("input").checked;

  //   if (!isChecked && props.technologyNames?.some((tech) => tech === value)) {
  //     // If the checkbox is unchecked and the value is already in the selected technology names,
  //     // remove it from the selected technology names and selected tech ids.
  //     props.setTechnologyNames((prevSelectedTech) =>
  //       prevSelectedTech.filter((techName) => techName !== value)
  //     );
  //     props.setSelectedTechIds((prevSelectedTechIds) =>
  //       prevSelectedTechIds.filter((techId) => techId !== id)
  //     );
  //   } else if (
  //     isChecked &&
  //     !props.technologyNames?.some((tech) => tech === value)
  //   ) {
  //     console.log(props.technologyNames);
      
  //     // If the checkbox is checked and the value is not in the selected technology names,
  //     // add it to the selected technology names and selected tech ids.
  //     props.setTechnologyNames((prevSelectedTech) => [
  //       ...prevSelectedTech,
  //       value,
  //       // { techName: value },
  //     ]);
  //     props.setSelectedTechIds((prevSelectedTechIds) => [
  //       ...prevSelectedTechIds,
  //       id,
  //     ]);
  //     console.log(props.selectedTechIds);
  //   }
  // };

  const handleOptionClick = (e, tech) => {
    if (e.target.checked) {
      props.setTechnologyNames([...props.technologyNames, tech.techName]);
      props.setSelectedTechIds([...props.selectedTechIds, tech.techId]);
      // console.log("this is users id",props.selectedUserIds);
    } else if(!e.target.checked) {
      props.setTechnologyNames(
        props.technologyNames.filter((item) => item !== tech.techName)
      );
      props.setSelectedTechIds(
        props.selectedTechIds.filter((item) => item !== tech.techId)
        );
        console.log("this is tech id",props.selectedTechIds);
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
      const selectedTechNames = props.technologyNames.map((tech) => tech);
      props.techDataComingChild(selectedTechNames);
    }
  }, [props.technologyNames]);

  return (
    <>
      <div
        className="d-flex align-items-center ps-1 associate-search-log-wrapper mb-2"
        style={{ width: "50%" }}
      >
        <SearchIcon />
        <input
          style={{ width: "100%", height: "1.5rem" }}
          className="search-associate-log"
          type="text"
          placeholder="Search tech..."
          value={props.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div style={{ maxHeight: "6rem", overflow: "auto" }}>
        {filteredTechOptions.map((tech) => (
          <div
            key={tech.techId}
            className="form-check small checkbox"
            // onClick={handleOptionClick}
            // data-value={tech.techName}
            // data-id={tech.techId}
          >
            <label
              className="form-check-label tech-label"
              htmlFor={tech.techName}
            >
              {tech.techName}
            </label>
            <input
              className="form-check-input tech-checkbox"
              type="checkbox"
              // value={tech.techName}
              id={tech.techId}
              checked={props.technologyNames?.includes(tech.techName)}
              onClick={(e) => handleOptionClick(e, tech)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TechDropDown;
