import React, { useState, useEffect } from "react";
import "./Selectlevel.css";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
const Selectlevel = ({ handleSelectLevel }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    handleSelectLevel(selectedOptions);
  }, [selectedOptions]);
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

  const options = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div>
      <div className=" report-drop-down-level">
        <div className="inner-drop-down-level">
          <div className="input-with-button-level">
            <button
              type="button"
              className="button-for-dropdown-level"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <input
                type="text"
                className="custom-input-level"
                value={selectedOptions}
                placeholder="Select level"
                disabled
              />
            </button>

            <button
              className="expand-more-level"
              type="button"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <ExpandMore className="expand-level" />
            </button>
          </div>
          {showDropdown && (
            <div className="data-display-level">
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => {
                      handleCheckboxChange(option);
                    }}
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Selectlevel;
