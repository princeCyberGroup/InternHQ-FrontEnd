import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";

const ReviewerDropdown = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
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
    axios
      .get(process.env.REACT_APP_API_URL + "/api/v4/reviewerList", {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      })
      .then((response) => {
        const sortedUsers = response.data.response.sort((a, b) => {
          const nameA = a.mentorName.toUpperCase();
          const nameB = b.mentorName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0; // names are equal
        });
        setAllUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckAllChange = (e) => {
    if (e.target.checked) {
      const allUser = filteredUsers.map((c) => c.mentorName);
      props.setSelectedReviewers(allUser);
      const allUserId = filteredUsers.map((c) => c.mentorId);
      props.setSelectedReviewerIds(allUserId);
    } else {
      props.setSelectedReviewers([]);
    }
  };

  const handleUsersChange = (e, c) => {
    if (e.target.checked) {
      props.setSelectedReviewers([...props.selectedReviewers, c.mentorName]);
      props.setSelectedReviewerIds([...props.selectedReviewerIds, c.mentorId]);
    } else if (!e.target.checked) {
      props.setSelectedReviewers(
        props.selectedReviewers.filter((item) => item !== c.mentorName)
      );
      props.setSelectedReviewerIds(
        props.selectedReviewerIds.filter((item) => item !== c.mentorId)
      );
    }
  };

  useEffect(() => {
    if (props.selectedReviewers) {
      const selectedUsersNames = props.selectedReviewers;
      props.reviewersDataComingChild(selectedUsersNames);
    }
  }, [props.selectedReviewers]);

  const handleSearchChange = (e) => {
    props.setSearchReviewerQuery(e.target.value);
    const filtered = allUsers.filter((user) =>
      user.mentorName.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);

    // const searchInputValue = e.target.value;
    // const selectAllCheckbox = document.querySelector("#selectAll");
    // if (searchInputValue === "") {
    //   selectAllCheckbox.style.display = "block";
    // } else {
    //   selectAllCheckbox.checked=false;
    // }
  };

  return (
    <>
      <div
        className="d-flex align-items-center ps-1 associate-search-log-wrapper mb-2"
        style={{ width: "100%" }}
      >
        <SearchIcon />
        <input
          style={{ width: "100%", height: "1.5rem" }}
          className="search-associate-log"
          type="text"
          placeholder="Search..."
          value={props.searchReviewerQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div style={{ maxHeight: "6rem", overflow: "auto" }}>
        {/* {!props.searchUserQuery && (
      <div className="form-check small checkbox">
        <input
          className="form-check-input"
          type="checkbox"
          id="selectAll"
          checked={props.selectedReviewers?.length === filteredUsers.length}
          onChange={handleCheckAllChange}
        />
        <label className="form-check-label" htmlFor="selectAll">
          Select all
        </label>
      </div>)} */}

        {filteredUsers.map((c) => (
          <div className="form-check small checkbox" key={c.mentorId}>
            <input
              className="form-check-input"
              type="checkbox"
              id={c.mentorId}
              checked={props.selectedReviewers?.includes(c.mentorName)}
              onChange={(e) => handleUsersChange(e, c)}
            />
            <label className="form-check-label" htmlFor={c.mentorId}>
              {c.mentorName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewerDropdown;
