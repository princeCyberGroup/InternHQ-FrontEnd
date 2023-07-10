import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const TechDropDown = (props) => {
  const [techOptions, setTechOptions] = useState([]);
  const navigate = useNavigate();

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
        setTechOptions(
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
          }) || []
        );
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/error/session-expired");
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
      props.setSelectedTechIds((prevSelectedTechIds) => [
        ...prevSelectedTechIds,
        id,
      ]);
    }
  };
  
  // const handleOptionClick = (event) => {
  //   const { value, id } = event.currentTarget.dataset;
  //   const isChecked = event.currentTarget.querySelector("input").checked;
  
  //   // if (value === "Select all") {
  //   //   if (isChecked) {
  //   //     props.setTechnologyNames(techOptions);
  //   //     props.setSelectedTechIds(techOptions.map((tech) => tech.techId));
  //   //   } else {
  //   //     props.setTechnologyNames([]);
  //   //     props.setSelectedTechIds([]);
  //   //   }
  //   // } else {
  //     if (isChecked && !props.technologyNames.includes(value)) {
  //       props.setTechnologyNames((prevSelectedTech) => [
  //         ...prevSelectedTech,
  //         { techName: value },
  //       ]);
  //       props.setSelectedTechIds((prevSelectedTechIds) => [
  //         ...prevSelectedTechIds,
  //         id,
  //       ]);
  //     } else {
  //       props.setTechnologyNames((prevSelectedTech) =>
  //         prevSelectedTech.filter((techName) => techName.techName !== value)
  //       );
  //       props.setSelectedTechIds((prevSelectedTechIds) =>
  //         prevSelectedTechIds.filter((techId) => techId !== id)
  //       );
  //     }
  //   // }
  // };
  
  useEffect(() => {
    if (props.technologyNames) {
      const selectedTechNames = props.technologyNames.map(
        (tech) => tech.techName
      );
      props.techDataComingChild(selectedTechNames);
    }
  }, [props.technologyNames]);

  return (
    <div className="drop-tech">
      {
        // [
        //   { techId: "select-all", techName: "Select all" },
        //   ...techOptions,
        // ]
        techOptions.map((tech) => (
          <div
            key={tech.techId}
            className="form-check small checkbox"
            onClick={handleOptionClick}
            data-value={tech.techName}
            data-id={tech.techId}
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
              value={tech.techName}
              id={tech.techId}
            />
          </div>
        ))
      }
    </div>
  );
};

export default TechDropDown;
