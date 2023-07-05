import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const UsersDropdown = (props) => {
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

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
      .get(process.env.REACT_APP_API_URL + "/api/v2/getAllUsers", {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      })
      .then((response) => {
        setAllUsers(
          response.data.response.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0; // names are equal
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const handleOptionClick = (event) => {
  //   const { value, id } = event.currentTarget.dataset;
  //   const isChecked = event.currentTarget.querySelector("input").checked;

  //   if (value === "Select all") {
  //     setSelectAllChecked(isChecked);

  //     if (isChecked) {
  //       props.setSelectedUsers(allUsers);
  //       props.setSelectedUserIds(allUsers.map((user) => user.userId));
  //     } else {
  //       props.setSelectedUsers([]);
  //       props.setSelectedUserIds([]);
  //     }
  //   } else {
  //     if (selectAllChecked) {
  //       // Individual checkbox clicked when "Select all" is checked
  //       setSelectAllChecked(false); // Uncheck "Select all"
  //       props.setSelectedUsers([{ name: value }]);
  //       props.setSelectedUserIds([id]);
  //     } else {
  //       // Handle individual user selection
  //       if (isChecked) {
  //         props.setSelectedUsers((prevSelectedUsers) => [
  //           ...prevSelectedUsers,
  //           { name: value },
  //         ]);
  //         props.setSelectedUserIds((prevSelectedUserIds) => [...prevSelectedUserIds, id]);

  //       } else {
  //         props.setSelectedUsers((prevSelectedUsers) =>
  //           prevSelectedUsers.filter((user) => user.name !== value)
  //         );
  //         props.setSelectedUserIds((prevSelectedUserIds) =>
  //           prevSelectedUserIds.filter((userId) => userId !== id)
  //         );
  //       }
  //     }
  //   }
  // };

  const handleOptionClick = (event) => {
    const { value, id } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;

    // const userIds = selectedUsers.map((user) => user.id);
    // setSelectedUserIds(userIds);

    if (value === "Select all") {
      setSelectAllChecked(isChecked);

      if (isChecked) {
        props.setSelectedUsers(allUsers);
        props.setSelectedUserIds(allUsers.map((user) => user.userId));
      } else {
        props.setSelectedUsers([]);
        props.setSelectedUserIds([]);
      }
    } else {
      if (isChecked) {
        props.setSelectedUsers((prevSelectedUsers) => [
          ...prevSelectedUsers,
          { name: value },
        ]);
        props.setSelectedUserIds((prevSelectedUserIds) => [
          ...prevSelectedUserIds,
          id,
        ]);
      } else {
        props.setSelectedUsers((prevSelectedUsers) =>
          prevSelectedUsers.filter((user) => user.name !== value)
        );
        props.setSelectedUserIds((prevSelectedUserIds) =>
          prevSelectedUserIds.filter((userId) => userId !== id)
        );
      }
    }
  };

  // const handleOptionClick = (event) => {
  //   const { value } = event.currentTarget.dataset;
  //   const isChecked = event.currentTarget.querySelector("input").checked;

  //   if (value === "Select all") {
  //     if (isChecked) {
  //       setSelectedUsers(allUsers);
  //     } else {
  //       setSelectedUsers([]);
  //     }
  //   } else {
  //     if (isChecked) {
  //       setSelectedUsers((prevSelectedUsers) => [
  //         ...prevSelectedUsers,
  //         { name: value },
  //       ]);
  //     } else {
  //       setSelectedUsers((prevSelectedUsers) =>
  //         prevSelectedUsers.filter((user) => user.name !== value)
  //       );
  //     }
  //   }
  // };

  //   const handleOptionClick = (event) => {
  //     const { value } = event.currentTarget.dataset;
  //     const isChecked = event.currentTarget.querySelector("input").checked;

  //     if (isChecked) {
  //       setSelectedUsers((prevSelectedUsers) => {
  //         if (!prevSelectedUsers.find((user) => user.name === value)) {
  //           return [...prevSelectedUsers, { name: value }];
  //         }
  //         return prevSelectedUsers;
  //       });
  //     } else {
  //       setSelectedUsers((prevSelectedUsers) =>
  //         prevSelectedUsers.filter((user) => user.name !== value)
  //       );
  //     }
  //   };

  useEffect(() => {
    if (props.selectedUsers) {
      const selectedUsersNames = props.selectedUsers?.map((user) => user.name);
      props.usersDataComingChild(selectedUsersNames);
    }
  }, [props.selectedUsers]);

  return (
    <div className="drop-tech">
      {[{ userId: "select-all", name: "Select all" }, ...allUsers].map(
        (user) => (
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
              checked={
                selectAllChecked || props.selectedUserIds?.includes(user.userId)
              }
            />
          </div>
        )
      )}
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
