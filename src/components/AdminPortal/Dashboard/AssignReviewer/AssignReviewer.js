import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Right } from "../../../../Assets/right.svg";
import { ReactComponent as AssignImage } from "../../../../Assets/AssignImage.svg";
import "./AssignReviewer.css";

const AssignReviewer = () => {
  return (
    <div className="container">
      <Link to="/admin/reports" className="about-link">
        Assign Reviewer <Right style={{ marginBottom: "2px" }} />
      </Link>
      <div className="row assign-review-box ms-0 px-3 py-2">
        <div className="row pe-0 assign-review-outer">
          <div className="col px-0">
            <label className="form-label assign-review-text mb-0">Select Associate Consultant</label>
            <select className="form-select">
              <option hidden>Select Associate Consultant</option>
              <option>Some values</option>
              <option>Some values</option>
              <option>Some values</option>
            </select>
          </div>
        </div>
        <div className="row pe-0 assign-review-outer">
          <div className="col ps-0">
            <label className="form-label assign-review-text mb-0">Assigned To</label>
            <select className="form-select">
              <option hidden>Select Reviewer</option>
              <option>Some values</option>
              <option>Some values</option>
              <option>Some values</option>
            </select>
          </div>
          <div className="col px-0">
            <label className="form-label assign-review-text mb-0">End Date</label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <div className="row pe-0 assign-review-outer">
          <div className="col px-0">
          <button className="btn btn-primary assign-review-button">
            <AssignImage/> &nbsp;&nbsp;Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignReviewer;
