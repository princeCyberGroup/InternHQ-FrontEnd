import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
// import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";

const BatchSelect = (props) => {
  const [allBatches, setAllBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);

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
      .get(process.env.REACT_APP_API_URL + "/api/v4/batch-select", {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      })
      .then((response) => {
        
        setAllBatches(response.data.response);
        console.log(response.data.response);
        setFilteredBatches(response.data.response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckAllChange = (e) => {
    if (e.target.checked) {
      const allUser = filteredBatches.map((c) => c.Batch);
      props.setSelectedBatches(allUser);
    //   const allUserId = filteredBatches.map((c) => c.userId);
    //   props.setSelectedUserIds(allUserId);
    } else {
      props.setSelectedBatches([]);
    }
  };

  const handleUsersChange = (e, c) => {
    if (e.target.checked) {
      props.setSelectedBatches([...props.selectedBatches, c.Batch]);
    //   props.setSelectedUserIds([...props.selectedUserIds, c.userId]);
    } else if(!e.target.checked) {
      props.setSelectedBatches(
        props.selectedBatches.filter((item) => item !== c.Batch)
      );
    //   props.setSelectedUserIds(
    //     props.selectedUserIds.filter((item) => item !== c.userId)
    //     );
    }
  };

  useEffect(() => {
    if (props.selectedBatches) {
      const selectedBatchNames = props.selectedBatches;
      props.batchDataComingChild(selectedBatchNames);
    }
  }, [props.selectedBatches]);

  const handleSearchChange = (e) => {
    props.setSearchUserQuery(e.target.value);
    const filtered = allBatches.filter((user) =>
      user.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilteredBatches(filtered);
  
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
      {/* <div
        className="d-flex align-items-center ps-1 associate-search-log-wrapper mb-2"
        style={{ width: "50%"}}
      > */}
        {/* <SearchIcon /> */}
        {/* <input
          style={{ width: "100%",height:"1.5rem" }}
          className="search-associate-log"
          type="text"
          placeholder="Search Batch..."
          value={props.searchUserQuery}
          onChange={handleSearchChange}
        />
      </div> */}
      <div style={{maxHeight:"10rem",overflow:"auto"}}>
      {!props.searchUserQuery && (
      <div className="form-check small checkbox">
        <input
          className="form-check-input"
          type="checkbox"
          id="selectAll"
          checked={props.selectedBatches?.length === filteredBatches.length}
          onChange={handleCheckAllChange}
        />
        <label className="form-check-label" htmlFor="selectAll">
          Select all
        </label>
      </div>)}

      {filteredBatches.map((c) => (
        <div className="form-check small checkbox" key={c.userId}>
          <input
            className="form-check-input"
            type="checkbox"
            id={c.userId}
            checked={props.selectedBatches?.includes(c.Batch)}
            onChange={(e) => handleUsersChange(e, c)}
          />
          <label className="form-check-label" htmlFor={c.userId}>
            {c.Batch}
          </label>
        </div>
      ))}
      
      {/* <input
        type="text"
        className="custom-input"
        value={props.selectedBatches?.join(", ")}
        disabled
      /> */}
      </div>
    </>
  );
};

export default BatchSelect;
