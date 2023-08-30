import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactComponent as Right } from "../../../../Assets/right.svg";
import { ReactComponent as AssignImage } from "../../../../Assets/AssignImage.svg";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import "./AssignReviewer.css";
import UsersDropdown from "../../Task/AssignTask/UsersDropdown";
import ReviewerDropdown from "./ReviewerDropdown";
import CryptoJS from "crypto-js";

const AssignReviewer = () => {
  const [usersDropDown, setUsersDropDown] = useState(false);
  const [reviewerDropDown, setReviewerDropDown] = useState(false);
  const [users, setUsers] = useState({});
  const [reviewers, setReviewers] = useState({});
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [selectedReviewerIds, setSelectedReviewerIds] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [searchReviewerQuery, setSearchReviewerQuery] = useState("");
  const [endDate, setEndDate] = useState("");

  const usersDataComingFrmChild = (data) => {
    setUsers(data);
  };

  const reviewersDataComingFrmChild = (data) => {
    setReviewers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      selectedUserIds.length === 0 ||
      selectedReviewerIds.length === 0 ||
      !endDate
    ) {
      alert("Please fill in the required details");
    } else {
      await axios
        .post(process.env.REACT_APP_API_URL + "/assignReviewer", {
          userId: selectedUserIds,
          mentorId: selectedReviewerIds,
          endDate,
        })
        .then((res) => {
          console.log("print", res.data);
          setEndDate("");
          setSelectedReviewerIds([]);
          setSelectedReviewers([]);
          setSelectedUsers([]);
          setSelectedUserIds([]);
        })
        .catch((err) => {
          console.log(err);
        });

      const checkboxes = document.querySelectorAll(".tech-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  return (
    <div className="container">
      <Link to="/admin/reports" className="about-link">
        Assign Reviewer <Right style={{ marginBottom: "2px" }} />
      </Link>
      <div className="row assign-review-box ms-0 px-3 py-2">
        <div className="row pe-0 assign-review-outer">
          <div className="col px-0">
            <label className="form-label assign-review-text mb-0">
              Select Associate Consultant
            </label>
            <div
              className="input-with-button border"
              style={{
                height: "40px",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "4px",
                border: "1px solid var(--secondary-gray, #B2B2B3)",
              }}
            >
              <button
                type="button"
                className="button-for-dropdown"
                onClick={() => {
                  setUsersDropDown(!usersDropDown);
                }}
              >
                <input
                  type="text"
                  className="custom-input"
                  style={{ width: "21rem" }}
                  placeholder="Select Associate Consultant"
                  value={Object.values(users)}
                  disabled
                />
              </button>
              <button
                type="button"
                className="expand-more"
                onClick={() => {
                  setUsersDropDown(!usersDropDown);
                }}
              >
                <ExpandMore />
              </button>
            </div>
            <div>
              <ul
                style={{
                  height: "10rem",
                  width: "25rem",
                  display: usersDropDown ? "" : "none",
                }}
                className="ul-styling m-0 p-3"
              >
                <UsersDropdown
                  usersDataComingChild={usersDataComingFrmChild}
                  selectAllUsers={selectAllUsers}
                  setSelectedUserIds={setSelectedUserIds}
                  selectedUserIds={selectedUserIds}
                  setSelectedUsers={setSelectedUsers}
                  selectedUsers={selectedUsers}
                  selectAllChecked={selectAllChecked}
                  setSelectAllChecked={setSelectAllChecked}
                  searchUserQuery={searchUserQuery}
                  setSearchUserQuery={setSearchUserQuery}
                />
              </ul>
            </div>
          </div>
        </div>
        <div className="row pe-0 assign-review-outer">
          <div className="col ps-0">
            <label className="form-label assign-review-text mb-0">
              Assigned To
            </label>
            <div
              className="input-with-button border"
              style={{
                height: "40px",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "4px",
                border: "1px solid var(--secondary-gray, #B2B2B3)",
              }}
            >
              <button
                type="button"
                className="button-for-dropdown"
                onClick={() => {
                  setReviewerDropDown(!reviewerDropDown);
                }}
              >
                <input
                  type="text"
                  className="custom-input"
                  style={{ width: "8rem" }}
                  placeholder="Select Reviewer"
                  value={Object.values(reviewers)}
                  disabled
                />
              </button>
              <button
                type="button"
                className="expand-more"
                onClick={() => {
                  setReviewerDropDown(!reviewerDropDown);
                }}
              >
                <ExpandMore />
              </button>
            </div>
            <div>
              <ul
                style={{
                  height: "8rem",
                  width: "12rem",
                  display: reviewerDropDown ? "" : "none",
                }}
                className="ul-styling m-0 p-3"
              >
                <ReviewerDropdown
                  reviewersDataComingChild={reviewersDataComingFrmChild}
                  selectAllChecked={selectAllChecked}
                  selectedReviewerIds={selectedReviewerIds}
                  setSelectedReviewerIds={setSelectedReviewerIds}
                  selectedReviewers={selectedReviewers}
                  setSelectedReviewers={setSelectedReviewers}
                  searchReviewerQuery={searchReviewerQuery}
                  setSearchReviewerQuery={setSearchReviewerQuery}
                />
              </ul>
            </div>
          </div>
          <div className="col px-0">
            <label className="form-label assign-review-text mb-0">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row pe-0 assign-review-outer">
          {/* <div className="col px-0"> */}
          <button
            className="btn btn-primary assign-review-button"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            <AssignImage /> &nbsp;&nbsp;Assign
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AssignReviewer;
