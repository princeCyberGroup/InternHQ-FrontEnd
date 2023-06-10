import React, { useState, useEffect } from "react";

const SearchBar = ({ searchfunc }) => {
  const [searchInnerValue, setSearchInnerValue] = useState("");
  useEffect(() => {
    searchfunc(searchInnerValue); //Passing searchInnerValue from here to DailyUpdateTable to set the value of searchFilterValue
  }, [searchInnerValue]);
  


  
  return (
    <div className="container">
      <form className="d-flex" >
        <input
          className="form-control me-2 search-bar-input pos-6"
          type="text"
          value={searchInnerValue}
          onChange={(event) => {
            event.preventDefault();
            setSearchInnerValue(event.target.value)
        }}
          placeholder="Search"
        />
      </form>
    </div>
  );
};

export default SearchBar;
