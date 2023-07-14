import React, { useState, useEffect } from "react";
import "./Report.css";
import { ReactComponent as Filter } from "../../../Assets/Filter.svg";
import Reporttable from "./Reporttable";
import Selectlevel from "./SelectLevel/Selectlevel";
import axios from "axios";
import Header from "../../Header/Header";
import DropdownD from "./DropdownD";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import SelectedTech from "./SelectedTech/SelectedTech";
import { Data } from "./Fetcheddataobject";
const Report = () => {
  //data
  const [selectLevel, setSelectLevel] = useState([]);
  const [selectTech, setSelectTech] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [orgTableData, setOrgTableData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    "Select Deployment Type"
  );
  const navigate = useNavigate();

  //functions
  const handleSelectLevel = (val) => {
    setSelectLevel(val);
  };
  const handleSelectTech = (val) => {
    setSelectTech(val);
  };

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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + `/api/v3/getuserReport`,
          {
            headers: {
              Authorization: `Bearer ${parsedObject["token"]}`,
            },
          }
        );
        setOrgTableData(response?.data.response);
        setTableData(response?.data.response);
        setIsLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/error/statusCode=401");
        }
        if (error.response.status === 400) {
          navigate("/error/statusCode=400");
        }
        if (error.response.status === 500) {
          navigate("/error/statusCode=500");
        }
        if (error.response.status === 404) {
          navigate("/error/statusCode=404");
        }
        console.error("Error fetching data:", error.message);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  useEffect(() => {
    handleFiltersChange();
  }, [query, selectedOption, selectLevel, selectTech]);

  const handleFiltersChange = () => {
    const getFilterItems = (items, query) => {
      if (query != "") {
        return items.filter((item) =>
          `${item[Data.FN]} ${item[Data.LN]}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      }
      return items;
    };

    const getfilterTech = (items) => {
      if (selectTech.length > 0 && selectLevel.length > 0) {
        const filteredData = items?.filter((data) => {
          return data?.technames?.some((element, index) => {
            return (
              selectTech.includes(element) &&
              selectLevel.includes(data[Data.L][index])
            );
          });
        });
        return filteredData;
      } else if (selectTech.length > 0) {
        const filteredData = items?.filter((data) => {
          return data?.technames?.some((element) => {
            return selectTech.includes(element);
          });
        });
        return filteredData;
      } else if (selectLevel.length > 0) {
        const filteredData = items?.filter((data) => {
          if (
            (data[Data.BC] !== null &&
              data[Data.BC] > 0 &&
              selectLevel.includes("Beginner")) ||
            (data[Data.IC] !== null &&
              data[Data.IC] > 0 &&
              selectLevel.includes("Intermediate")) ||
            (data[Data.AC] !== null &&
              data[Data.AC] > 0 &&
              selectLevel.includes("Advanced"))
          )
            return true;
          return false;
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
    const filterItems = getFilterItems(orgTableData, query);
    const filterTech = getfilterTech(filterItems);
    const filterDep = getfilterDep(filterTech, selectedOption);
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
              <SelectedTech handleSelectTech={handleSelectTech} />
              <Selectlevel handleSelectLevel={handleSelectLevel} />
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
