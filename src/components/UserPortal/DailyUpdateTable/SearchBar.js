import React, { useState, useEffect } from "react";

const SearchBar = ({ searchfunc }) => {
  const [searchInnerValue, setSearchInnerValue] = useState("");
  useEffect(() => {
    searchfunc(searchInnerValue); //Passing searchInnerValue from here to DailyUpdateTable to set the value of searchFilterValue
  }, [searchInnerValue]);
  


  
  return (
    <div className="container">
      <form className="d-flex" onSubmit={(event) => event.preventDefault()}>
        <input
          className="form-control me-2 search-bar-input pos-6"
          style={{border: "1px solid #ced4da"}}
          type="text"
          value={searchInnerValue}
          onChange={(event) => {
            setSearchInnerValue(event.target.value)
        }}
          placeholder="Search"
        />
      </form>
    </div>
  );
};

export default SearchBar;
