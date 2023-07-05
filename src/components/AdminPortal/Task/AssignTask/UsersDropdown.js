import React, { useState, useEffect } from "react";
import axios from "axios";


const UsersDropdown = (props) => {
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // const [selectAllChecked, setSelectAllChecked] = useState(false);




  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL+"/api/v2/getAllUsers",
      {
        headers: {
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
        },
      })
      .then((response) => {
        setAllUsers(response.data.response.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0; // names are equal
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOptionClick = (event) => {
    const { value, id } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;
  
    if (value === "Select all") {
      props.setSelectAllChecked(isChecked);
  
      if (isChecked) {
        props.setSelectedUsers(allUsers);
        props.setSelectedUserIds(allUsers.map((user) => user.userId));
      } else {
        props.setSelectedUsers([]);
        props.setSelectedUserIds([]);
      }
    } else {

        // Handle individual user selection
        if (!isChecked && props.selectedUsers.some((user) => user.name === value)) {
          props.setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.filter((user) => user.name !== value)
          );
          props.setSelectedUserIds((prevSelectedUserIds) =>
            prevSelectedUserIds.filter((userId) => userId !== id)
          );
  
        } else if(isChecked && !props.selectedUsers.some((user) => user.name === value)) {

          props.setSelectedUsers((prevSelectedUsers) => [
            ...prevSelectedUsers,
            { name: value },
          ]);
          props.setSelectedUserIds((prevSelectedUserIds) => [...prevSelectedUserIds, id]);

          
        }
      
    }
  };


  useEffect(() => {
    if(props.selectedUsers){
    const selectedUsersNames = props.selectedUsers?.map((user) => user.name);
    props.usersDataComingChild(selectedUsersNames);
    }
  }, [props.selectedUsers]);
  

  return (
    <div className="drop-tech">
      {[{ userId: "select-all", name: "Select all" }, ...allUsers].map((user) => (
        <div
          key={user.userId}
          className="form-check small checkbox"
          onClick={handleOptionClick}
          data-value={user.name}
          data-id={user.userId}
        >
          <label className="form-check-label tech-label" htmlFor={user.name}>
            {user.name}
          </label>
          <input
            className="form-check-input user-checkbox"
            type="checkbox"
            value={user.name}
            id={user.userId}
            checked={props.selectAllChecked || props.selectedUserIds?.includes(user.userId)}

          />
        </div>
      ))}
      <input
        type="text"
        className="custom-input"
        value={props.selectedUsers?.map((user) => user.name).join(", ")}
        disabled
      />
    </div>
  );
};

export default UsersDropdown;



