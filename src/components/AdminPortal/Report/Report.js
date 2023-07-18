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
import Confirmation from "../Confirmation";
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
  const [deployData, setDeployData] = useState([]);
  const [confirmChange, setConfirmChange] = useState(false);
  const [loadFilter, setLoadFilter] = useState(true);
  const navigate = useNavigate();
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  var parsedObject;
  const data = localStorage.getItem("userData");
  //functions

  const handleSelectLevel = (val) => {
    setSelectLevel(val);
  };
  const handleSelectTech = (val) => {
    setSelectTech(val);
  };
  const handleChange = (value) => {
    setSelectedOption(value);
  };
  const handleDeployChange = (userId) => {
    const index = orgTableData.findIndex((item) => item.userId === userId);
    const containValue = deployData?.some(
      (value) => value?.userId === orgTableData[index].userId
    );
    if (containValue) {
      const tempData = deployData.filter((value) => value.userId !== userId);
      setDeployData(tempData);
    } else {
      const tempData = [...deployData];
      tempData.push({
        userId: orgTableData[index].userId,
        status: !orgTableData[index].isDeployed,
      });
      setDeployData(tempData);
    }
    const updatedValues = tableData.map((val) => {
      if (val.userId === userId) return { ...val, isDeployed: !val.isDeployed };
      return val;
    });
    setTableData(updatedValues);
  };
  const handleCancel = () => {
    let tempDeployedTable = [];
    orgTableData.forEach((value) => {
      tempDeployedTable.push({ ...value });
    });
    setTableData(tempDeployedTable);
    setConfirmChange(false);
    setDeployData([]);
  };
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://cg-interns-hq.azurewebsites.net/api/v3/update-deployed",
        deployData.map((value) => {
          return { ...value, status: value.status.toString() };
        })
      );
      console.log("response api data", response.data);
    } catch (error) {
      console.log("this is error in report post api", error);
    }
    // setConfirmChange(false);
    // setLoadFilter((prev) => !prev);
    // fetchData();
    window.location.reload();
  };
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
    // const workingData = filterDep.map((value, index) => {
    //   return { ...value, isDeployed: tableData[index].isDeployed };
    // });
    setTableData(filterDep);
  };
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
      // console.log("object");
      setOrgTableData(
        response?.data.response.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        })
      );
      setTableData(
        response?.data.response.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        })
      );
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
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleFiltersChange();
  }, [query, selectedOption, selectLevel, selectTech]);
  return (
    <>
      {confirmChange && (
        <Confirmation
          confirmationValue={"report"}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}
      <div className="" style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="report-parent-wrapper">
        <div className="report-child-wrapper">
          <div className="report-header">
            <span>Report</span>
            {deployData.length > 0 && (
              <button
                className="report-deploy-btn"
                onClick={() => {
                  setLoadFilter((prev) => !prev);
                  setConfirmChange(true);
                }}
              >
                Update Status
              </button>
            )}
          </div>
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
              <SelectedTech
                loadFilter={loadFilter}
                handleSelectTech={handleSelectTech}
              />
              <Selectlevel
                loadFilter={loadFilter}
                handleSelectLevel={handleSelectLevel}
              />
              <DropdownD loadFilter={loadFilter} handleChange={handleChange} />
            </div>
          </div>
          <div className="report-table-wrapper ">
            <Reporttable
              tableData={tableData}
              isLoading={isLoading}
              deployData={deployData}
              handleDeployChange={handleDeployChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
