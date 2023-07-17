import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";

const UsersDropdown = (props) => {
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
      .get(process.env.REACT_APP_API_URL + "/api/v3/getAllUsers", {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      })
      .then((response) => {
        const sortedUsers = response.data.response.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
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
      const allUser = filteredUsers.map((c) => c.name);
      props.setSelectedUsers(allUser);
      const allUserId = filteredUsers.map((c) => c.userId);
      props.setSelectedUserIds(allUserId);
    } else {
      props.setSelectedUsers([]);
    }
  };

  const handleUsersChange = (e, c) => {
    if (e.target.checked) {
      props.setSelectedUsers([...props.selectedUsers, c.name]);
      props.setSelectedUserIds([...props.selectedUserIds, c.userId]);
    } else if(!e.target.checked) {
      props.setSelectedUsers(
        props.selectedUsers.filter((item) => item !== c.name)
      );
      props.setSelectedUserIds(
        props.selectedUserIds.filter((item) => item !== c.userId)
        );
    }
  };

  useEffect(() => {
    if (props.selectedUsers) {
      const selectedUsersNames = props.selectedUsers;
      props.usersDataComingChild(selectedUsersNames);
    }
  }, [props.selectedUsers]);

  const handleSearchChange = (e) => {
    props.setSearchUserQuery(e.target.value);
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  
    const searchInputValue = e.target.value;
    const selectAllCheckbox = document.querySelector("#selectAll");
    if (searchInputValue === "") {
      selectAllCheckbox.style.display = "block";
    } else {
      selectAllCheckbox.checked=false;
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center ps-1 associate-search-log-wrapper mb-2"
        style={{ width: "50%"}}
      >
        <SearchIcon />
        <input
          style={{ width: "100%",height:"1.5rem" }}
          className="search-associate-log"
          type="text"
          placeholder="Search users..."
          value={props.searchUserQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div style={{maxHeight:"6rem",overflow:"auto"}}>
      {!props.searchUserQuery && (
      <div className="form-check small checkbox">
        <input
          className="form-check-input"
          type="checkbox"
          id="selectAll"
          checked={props.selectedUsers?.length === filteredUsers.length}
          onChange={handleCheckAllChange}
        />
        <label className="form-check-label" htmlFor="selectAll">
          Select all
        </label>
      </div>)}

      {filteredUsers.map((c) => (
        <div className="form-check small checkbox" key={c.userId}>
          <input
            className="form-check-input"
            type="checkbox"
            id={c.userId}
            checked={props.selectedUsers?.includes(c.name)}
            onChange={(e) => handleUsersChange(e, c)}
          />
          <label className="form-check-label" htmlFor={c.userId}>
            {c.name}
          </label>
        </div>
      ))}
      
      <input
        type="text"
        className="custom-input"
        value={props.selectedUsers?.join(", ")}
        disabled
      />
      </div>
    </>
  );
};

export default UsersDropdown;
