import React, { useEffect, useState } from "react";
import CircleRadioButton from "./CircleRadioButton";

const InterPerformanceReviewSection = ({ onDataSent, isFirst, heading, text }) => {
  const [comment, setComment] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioButtonClick = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    onDataSent(comment, selectedValue);
  }, [comment, selectedValue])
  
 
  return (
    <div className="row px-0 mx-0" style={{ marginTop: isFirst==="true" ? "" : "24px" }}>
      <div className="row productivity-parameter mx-0">
        <h6 className="productivity-parameter-text mb-0 ps-0">{heading}</h6>
      </div>
      <div className="row px-0 mx-0" style={{ width: "47rem" }}>
        <p className="productivity-parameter-subtext px-0">
          {text}
        </p>
      </div>
      <div className="row px-0 mx-0">
        <div className="col-8 px-0" style={{ width: "47rem" }}>
          <label
            for="comment"
            className="form-label productivity-parameter-subtext"
            style={{ fontWeight: "500" }}
          >
            Add Comment
          </label>
          <textarea
            className="form-control"
            name="comment"
            id="comment"
            cols="30"
            rows="4"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div
          className="col-4 px-0"
          style={{ marginLeft: "105px", width: "343px" }}
        >
          <div class="card rating-card">
            <div class="">
              <div className="row">
                <p className="rating-card-text">Rating</p>
              </div>
              <div className="row">
                <div className="circle-radio-container">
                  <CircleRadioButton
                    value={1}
                    selected={selectedValue === 1}
                    onClick={handleRadioButtonClick}
                  />
                  <CircleRadioButton
                    value={2}
                    selected={selectedValue === 2}
                    onClick={handleRadioButtonClick}
                  />
                  <CircleRadioButton
                    value={3}
                    selected={selectedValue === 3}
                    onClick={handleRadioButtonClick}
                  />
                  <CircleRadioButton
                    value={4}
                    selected={selectedValue === 4}
                    onClick={handleRadioButtonClick}
                  />
                  <CircleRadioButton
                    value={5}
                    selected={selectedValue === 5}
                    onClick={handleRadioButtonClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterPerformanceReviewSection;
