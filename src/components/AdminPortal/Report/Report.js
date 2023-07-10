import React, { useState, useEffect } from "react";
import "./Report.css";
import { ReactComponent as Filter } from "../../../Assets/Filter.svg";
import TechDropDown from "../../UserPortal/Dashboard/ProjectIdea/TechDropDown";
import { ReactComponent as ExpandMore } from "../../../Assets/expand_more.svg";
import Reporttable from "./Reporttable";
import { Dummydata } from "./Dummydata";
import Selectlevel from "./Selectlevel";
import axios from "axios";
import Header from "../../Header/Header";
import DropdownD from "./DropdownD";
import CryptoJS from "crypto-js";
const Report = () => {
  //data
  // const [level, setLevel] = useState({});
  const [tech, setTech] = useState({});
  const [dropDownTech, setDropDownTech] = useState(false);
  const [dropDownLevel, setDropDownLevel] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [orgTableData, setOrgTableData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    "Select Deployment Type"
  );
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

  //functions

  // function for fetching the data level
  // const dataComingFrmLevel = (data) => {
  //   setLevel(data);
  // };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  useEffect(() => {
    handleFiltersChange();
  }, [query, dropDownTech, selectedOption]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v2/getuserReport`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      setOrgTableData(
        // response?.data.response
        response?.data.response.sort(function (a, b) {
          // if (!b?.techNames) return -1;
          return b?.techNames?.length - a?.techNames?.length;
        })
      );
      setTableData(
        // response?.data.response
        response?.data.response.sort(function (a, b) {
          // if (!b?.techNames) return -1;
          return b?.techNames?.length - a?.techNames?.length;
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const techDataComingFrmTech = (data) => {
    setTech(data);
  };
  const handleFiltersChange = () => {
    const getFilterItems = (items, query) => {
      if (query != "") {
        return items.filter((item) =>
          `${item.firstName} ${item.lastName}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      }
      return items;
    };

    const getfilterTech = (items, tech) => {
      if (Object.keys(tech)?.length > 0) {
        const filteredData = items?.filter((data) => {
          return data?.techNames?.some((element) => {
            return tech ? Object.values(tech)?.includes(element) : false;
          });
        });
        return filteredData;
      }
      return items;
    };
    const getfilterDep = (item, optionVal) => {
      if (optionVal === "Deployed") {
        return item.filter((val) => val.isDeployed);
      } else if (optionVal === "Undeployed") {
        return item.filter((val) => !val.isDeployed);
      } else {
        return item;
      }
    };

    //filter for level
    // const getFilterLevel = (items, level) => {
    //   if (Object.keys(level).length > 0) {
    //     const filteredData = items.filter((person) => {
    //       const personSkills = Object.values(person.skills);
    //       console.log("personal skills",personSkills);
    //       return personSkills.some((element) =>
    //         Object.values(level).includes(element)
    //       );
    //     });
    //     return filteredData;
    //   }
    //   return items;
    // };

    const filterItems = getFilterItems(orgTableData, query);
    const filterTech = getfilterTech(filterItems, tech);
    const filterDep = getfilterDep(filterTech, selectedOption);

    // const filterLevel = getFilterLevel(filterTech, level);
    setTableData(filterDep);
  };
  const handleChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <div className="" style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="report-parent-wrapper">
        <div className="report-child-wrapper">
          <div className="report-header">Report</div>
          <div className="report-filter-wrapper ">
            <div className="report-search">
              <div className="search-icon" />
              <input
                type="text"
                className="report-input-bar"
                placeholder="Search Associate Consultant"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="inner-filter">
              <div className="report-filter">
                <Filter /> Filter:
              </div>
              <div className=" report-drop-down-tech">
                <div className="inner-drop-down-tech">
                  <div className="input-with-button-tech">
                    <button
                      type="button"
                      className="button-for-dropdown-tech"
                      onClick={() => {
                        setDropDownTech(!dropDownTech);
                      }}
                    >
                      <input
                        type="text"
                        className="custom-input-tech"
                        value={Object.values(tech)}
                        placeholder="Select Technology"
                        disabled
                      />
                    </button>
                    <button
                      className="expand-more-tech"
                      type="button"
                      onClick={() => {
                        setDropDownTech(!dropDownTech);
                      }}
                    >
                      <ExpandMore />
                    </button>
                  </div>
                  {dropDownTech && (
                    <div
                      className="data-display-tech"
                      style={{
                        top: "1.938rem",
                      }}
                    >
                      <TechDropDown
                        techDataComingChild={techDataComingFrmTech}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* below is the code for select level dropdown */}
              {/* <div className=" report-drop-down-level">
                <div className="inner-drop-down-level">
                  <div className="input-with-button-level">
                    <button
                      type="button"
                      className="button-for-dropdown-level"
                      onClick={() => {
                        setDropDownLevel(!dropDownLevel);
                      }}
                    >
                      <input
                        type="text"
                        className="custom-input-level"
                        value={Object.values(level)}
                        placeholder="Select level"
                        disabled
                      />
                    </button>
                    <button
                      className="expand-more-level"
                      type="button"
                      onClick={() => {
                        setDropDownLevel(!dropDownLevel);
                      }}
                    >
                      <ExpandMore />
                    </button>
                  </div>
                  {dropDownLevel && (
                    <div
                      className="data-display-tech"
                      style={{
                        top: "1.938rem",
                      }}
                    >
                      <Selectlevel techDataComingChild={dataComingFrmLevel} />
                    </div>
                  )}
                </div>
              </div> */}
              <DropdownD handleChange={handleChange} />
            </div>
          </div>
          <div className="report-table-wrapper ">
            <Reporttable tableData={tableData} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
