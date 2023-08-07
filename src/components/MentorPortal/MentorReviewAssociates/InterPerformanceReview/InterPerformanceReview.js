import React, { useState } from "react";
import Header from "../../../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Chevron } from "../../../../Assets/Vectorchevron.svg";
import { ReactComponent as Usercircle } from "../../../../Assets/Usercircle.svg";
import { ReactComponent as ReviewInfoIcon } from "../../../../Assets/ReviewInfoIcon.svg";
import { ReactComponent as Clock } from "../../../../Assets/Clock.svg";
import { ReactComponent as OverallIcon } from "../../../../Assets/OverallIcon.svg";
import { ReactComponent as Profile } from "../../../../Assets/Profile.svg";
import { ReactComponent as ReviewNo } from "../../../../Assets/ReviewNo.svg";
import { ReactComponent as ReviewNoRed } from "../../../../Assets/ReviewNoRed.svg";
import { ReactComponent as ReviewYes } from "../../../../Assets/ReviewYes.svg";
import { ReactComponent as ReviewYesGreen } from "../../../../Assets/ReviewYesGreen.svg";
import "./InterPerformanceReview.css";
import InterPerformanceReviewSection from "./InterPerformanceReviewSection";

const MentorReview = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="" style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="interper-parent-wrapper">
        <div className="interper-child-wrapper">
          <div className="interper-header">
            <div className="interper-breadcrum">
              <Link to={"/mentor/review-associates"} className="crumb-parent">
                Review Associate
              </Link>
              <Chevron />
              <span>Inter Performance Review</span>
            </div>
          </div>
          <div className="user-detail-info-wrapper">
            <div className="interper-user-info">
              <div className="interper-use-info">
                <span>Inter Performance Review</span>
              </div>
              <div className="interper-info-detail">
                <div className="interper-user-name">
                  <Usercircle />
                  <span>{"John Doe"}</span>
                </div>
                <div className="interper-other-info">
                  <div className="interper-icon-pair">
                    <Profile />
                    <span>{"INT 123"}</span>
                  </div>
                  <div className="interper-det-dot" />
                  <div className="interper-icon-pair">
                    <Clock />
                    <span>{`08 months`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="interper-second-child d-flex flex-column interper-shadow-box">
              <div className="row interper-blue-info mx-3 mt-3">
                <div className="row">
                  <div className="col ps-0">
                    <ReviewInfoIcon />
                    <span className="interper-blue-info-text ms-2">
                      Please rate the Associate in each area using the following
                      guidelines:
                    </span>
                  </div>
                </div>

                <div
                  className="row interper-blue-info-text ms-0"
                  style={{ fontWeight: "500" }}
                >
                  <div className="col">
                    <span style={{ fontWeight: "600" }}>1</span> - Not
                    Acceptable
                  </div>
                  <div className="col">
                    <span style={{ fontWeight: "600" }}>2</span> - Needs
                    Improvement
                  </div>
                  <div className="col">
                    <span style={{ fontWeight: "600" }}>3</span> - Meets
                    Requirements
                  </div>
                  <div className="col">
                    <span style={{ fontWeight: "600" }}>4</span> - Often Exceeds
                    Expectations
                  </div>
                  <div className="col">
                    <span style={{ fontWeight: "600" }}>5</span> - Consistently
                    Exceeds Expectations
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="row performance-parameter">
                  <InterPerformanceReviewSection
                    heading="Productivity"
                    text="Meets productivity standards; completes work in a quick and timely
          manner; strives to increase productivity."
                    isFirst="true"
                  />
                  <InterPerformanceReviewSection
                    heading="Quality of Work"
                    text="Demonstrates accuracy and thoroughness; displays commitment to excellence; looks for ways to improve and promote 
                    quality; shows good attention to detail."
                    isFirst="false"
                  />
                  <InterPerformanceReviewSection
                    heading="Behavior at Work"
                    text="Demonstrates a good work ethic, displays positive outlook and pleasant manner; Is disciplined, offers assistance and 
                    support to coworkers; willing to go the extra mile; makes maximum use of time."
                    isFirst="false"
                  />
                  <InterPerformanceReviewSection
                    heading="Subject Knowledge"
                    text="Competent in required job skills and knowledge; exhibits ability to learn and apply new skills; keeps abreast of current 
                    developments in the project; requires minimal supervision."
                    isFirst="false"
                  />
                  <InterPerformanceReviewSection
                    heading="Willingness to Learn"
                    text="Shows an openness and eagerness to learn from others; accepts criticism and feedback; applies feedback to improve 
                    performance; effectively deals with issues before they become problems; asks for help when needed."
                    isFirst="false"
                  />
                  <InterPerformanceReviewSection
                    heading="Communication"
                    text="Exhibits good listening and comprehension; expresses ideas and thoughts effectively; keeps other adequately informed;
                    resolves conflict effectively and timely."
                    isFirst="false"
                  />
                  <div className="row px-0 mx-0" style={{ marginTop: "24px" }}>
                    <div className="row px-0 mx-0">
                      <h6 className="productivity-parameter-text mb-0 ps-0">
                        Comment on Final Offer (Yes/No):
                      </h6>
                    </div>
                    <div className="row px-0 mx-0" style={{ marginTop: "6px" }}>
                      <div className="col-8 px-0" style={{ width: "47rem" }}>
                        <textarea
                          className="form-control"
                          name="comment"
                          id="comment"
                          cols="30"
                          rows="4"
                        ></textarea>
                      </div>
                      <div
                        className="col-4 px-0"
                        style={{ marginLeft: "105px", width: "343px" }}
                      >
                        <div className="card final-rating-card rating-card">
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn final-review-btn bg-white"
                              onClick={() => handleButtonClick("Yes")}
                              style={{border: `${selectedOption === "Yes" ? "1px solid var(--other-green, #2DC26B)" : "1px solid var(--primary-gray, #343435)"}`}}
                            >
                             {selectedOption === "Yes" ? <ReviewYesGreen/> : <ReviewYes/>}<span style={{marginLeft: "16px"}}>Yes</span>
                            </button>
                            <button
                              className="btn final-review-btn bg-white"
                              onClick={() => handleButtonClick("No")}
                              style={{border: `${selectedOption === "No" ? "1px solid var(--other-red, #E03E2D)" : "1px solid var(--primary-gray, #343435)"}`}}
                            >
                             {selectedOption === "No" ? <ReviewNoRed/> : <ReviewNo/>}<span style={{marginLeft: "16px"}}>No</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="interper-footer d-flex flex-row justify-content-end">
        <button className="btn btn-outline-primary review-outline-btn">
          Cancel
        </button>
        <button className="btn btn-primary mx-3 review-btns">Save</button>
        <button className="btn btn-primary review-btns">Submit</button>
      </div>
    </>
  );
};

export default MentorReview;