import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./SelectedTech.css";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import { useNavigate } from "react-router-dom";
const SelectedTech = ({ handleSelectTech }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [techOptions, setTechOptions] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    handleSelectTech(selectedOptions);
  },
  [selectedOptions])
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
          response.data.response.map((value, index) => {
            return value.techName;
          })
        );
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
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        )
      );
    } else {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        option,
      ]);
    }
  };

  return (
    <div className=" report-drop-down-tech">
      <div className="inner-drop-down-tech">
        <div className="input-with-button-tech">
          <button
            type="button"
            className="button-for-dropdown-tech"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <input
              type="text"
              value={selectedOptions}
              className="custom-input-tech"
              placeholder="Select Technology"
              disabled
            />
          </button>
          <button
            className="expand-more-tech"
            type="button"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <ExpandMore className="expand-tech" />
          </button>
        </div>
        {showDropdown && (
          <div className="data-display-tech">
            {techOptions.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => {
                    handleCheckboxChange(option);
                  }}
                />{" "}
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedTech;
