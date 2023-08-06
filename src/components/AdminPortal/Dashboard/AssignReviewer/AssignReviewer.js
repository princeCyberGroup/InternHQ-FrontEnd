import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Right } from "../../../../Assets/right.svg";
import { ReactComponent as AssignImage } from "../../../../Assets/AssignImage.svg";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import "./AssignReviewer.css";
import UsersDropdown from "../../Task/AssignTask/UsersDropdown";

const AssignReviewer = () => {
  const [usersDropDown, setUsersDropDown] = useState(false);
  const [users, setUsers] = useState({});
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchUserQuery, setSearchUserQuery] = useState("");

  const usersDataComingFrmChild = (data) => {
    setUsers(data);
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
                  placeholder="Select Assigned To"
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
                  height: "8rem",
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
            {/* <select className="form-select">
              <option hidden>Select Associate Consultant</option>
              <option>Some values</option>
              <option>Some values</option>
              <option>Some values</option>
            </select> */}
          </div>
        </div>
        <div className="row pe-0 assign-review-outer">
          <div className="col ps-0">
            <label className="form-label assign-review-text mb-0">
              Assigned To
            </label>
            <select className="form-select">
              <option hidden>Select Reviewer</option>
              <option>Some values</option>
              <option>Some values</option>
              <option>Some values</option>
            </select>
          </div>
          <div className="col px-0">
            <label className="form-label assign-review-text mb-0">
              End Date
            </label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <div className="row pe-0 assign-review-outer">
          <div className="col px-0">
            <button className="btn btn-primary assign-review-button">
              <AssignImage /> &nbsp;&nbsp;Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignReviewer;
