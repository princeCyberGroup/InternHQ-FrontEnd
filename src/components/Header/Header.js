import React, { useEffect, useState, useContext, useMemo } from "react";
import { UserContext } from "../../Context/Context";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { ReactComponent as CGlogo } from "../../Assets/CG-Logo (1) 1CGlogo.svg";
import { ReactComponent as ExpandMore } from "../../Assets/expand_more.svg";

import "./Header.css";
import MentorAssignedAlerts from "../UserPortal/Dashboard/MentorAssignedAlerts/MentorAssignedAlerts";
import CryptoJS from "crypto-js";
import { ReactComponent as UploadCsvv } from "../../Assets/upload.svg";
import { UploadCsv } from "../AdminPortal/Dashboard/UploadCsv/UploadCsvModal";
import "../AdminPortal/Dashboard/UploadCsv/uploadCsv.css";
import axios from "axios";
import BatchSelect from "./BatchSelect";

const Header = (props) => {
  const [batchDropdown, setBatchDropdown] = useState(false);
  const [batches, setBatches] = useState({});
  // const [selectedBatches,setSelectedBatches]= useState([]);
  const [selectAllChecked,setSelectAllChecked]= useState(false);
  const { resetTimer } = useContext(UserContext);
  const secretKey = process.env.REACT_APP_USER_KEY;
  const [userData, setUserData] = useState({});
  let permission = new Set();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      setUserData(JSON.parse(decryptedJsonString));
    } else {
      console.log("No encrypted data found in localStorage.");
    }
  }, []);

  const [isTodayDate, setIsTodayDate] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    if (userData.randomString !== process.env.REACT_APP_USER_DES_ADMIN) {
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
      var userId = parsedObject.userId;
      await axios.post(
        process.env.REACT_APP_API_URL + "/api/v3/postLogoutLog",
        {
          userId,
        }
      );
    }
    localStorage.clear("userData");
    localStorage.clear("tD8kFi5j");
    resetTimer();
    navigate("/");
  };

  const anotherFunc = (mentorTask) => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    const isToday = mentorTask?.some((record) => {
      const assignedDate = record.assignedDate;
      if (assignedDate === formattedToday) {
        return true;
      } else {
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - 1);
        const formattedPreviousDate = previousDate.toISOString().split("T")[0];
        return assignedDate === formattedPreviousDate;
      }
    });
    setIsTodayDate(isToday);
  };
  if (userData?.mentorType !== undefined) {
    const arr = userData?.mentorType.split(",");
    arr.forEach((element) => {
      permission.add(`${element}`);
    });
  }
  const batchDataComingFrmChild = (data) => {
    setBatches(data);
  };

  return (
    <>
      <div style={{ position: "fixed", top: "0", zIndex: "99", width: "100%" }}>
        <nav
          className="navbar navbar-expand-lg navbar-light  border-bottom"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* NavLink is converted to div because of authentication and work needs to be done in it */}
          <NavLink
            className="navbar-brand"
            to="/dashboard"
            style={{ marginLeft: "10px", marginRight: "0px" }}
          >
            <div className="d-flex flex-column border-right">
              <CGlogo />
            </div>
          </NavLink>
          <div className="collapse navbar-collapse border-Side" id="navbarNav">
            <ul
              className="navbar-nav nav-bg d-flex align-items-center"
              style={{ height: "2.7rem" }}
            >
              {userData.randomString === process.env.REACT_APP_USER_DES_USER ? (
                <>
                  <li className="nav-item ps-1">
                    <NavLink to="/dashboard" className="btn activeBtn">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item mx-2">
                    <NavLink to="/daily-Update" className="btn activeBtn">
                      Daily Update
                    </NavLink>
                  </li>

                  <li className="nav-item pe-1">
                    <NavLink to="/skill-Management" className="btn activeBtn ">
                      Skill Management
                    </NavLink>
                  </li>
                </>
              ) : userData.randomString ===
                process.env.REACT_APP_USER_DES_ADMIN ? (
                <>
                  <li className="nav-item ps-1">
                    <NavLink to="/admin/dashboard" className="btn activeBtn">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item mx-2">
                    <NavLink to="/admin/assign-task" className="btn activeBtn">
                      Assign Task
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/skill-test" className="btn activeBtn ">
                      Skill Test
                    </NavLink>
                  </li>
                  <li className="nav-item mx-2">
                    <NavLink to="/admin/reports" className="btn activeBtn ">
                      Report
                    </NavLink>
                  </li>
                  <li className="nav-item pe-1">
                    <NavLink to="/admin/logs" className="btn activeBtn ">
                      Logs
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {permission.has("Session") && (
                    <li className="nav-item ps-1">
                      <NavLink to="/mentor/dashboard" className="btn activeBtn">
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {(permission.has("Session") || permission.has("Project")) && (
                    <li className="nav-item mx-2">
                      <NavLink
                        to="/mentor/assign-task"
                        className="btn activeBtn"
                      >
                        Assign Task
                      </NavLink>
                    </li>
                  )}
                  {permission.has("Review") && (
                    <li className="nav-item">
                      <NavLink
                        to="/mentor/review-associates"
                        className="btn activeBtn "
                      >
                        Review Associates
                      </NavLink>
                    </li>
                  )}
                </>
              )}
              {(userData?.mentorType === undefined ||
                (userData?.mentorType !== null &&
                  permission.has("Session"))) && (
                <li className="nav-item">
                  <NavLink to="/session-calendar" className="btn activeBtn ">
                    Session Calendar
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {userData.randomString !== process.env.REACT_APP_USER_DES_USER ? (
            // <div className="container border p-0" style={{width:"20rem"}}>
            //           <div className="input-with-button"style={{width:"20rem"}}>
            //             <button
            //               type="button"
            //               className="button-for-dropdown"
            //               onClick={() => {
            //                 // setUsersDropDown(!usersDropDown);
            //                 setBatchDropdown(!batchDropdown);
            //               }}
            //             >
            //               <input
            //               style={{width:"20rem"}}
            //                 type="text"
            //                 className="custom-input"
            //                 placeholder="Select Batch"
            //                 // value={Object.values(users)}
            //                 disabled
            //               />
            //             </button>
            //             <button
            //               type="button"
            //               className="expand-more"
            //               onClick={() => {
            //                 // setUsersDropDown(!usersDropDown);
            //                 setBatchDropdown(!batchDropdown);
            //               }}
            //             >
            //               {/* <ExpandMore /> */}
            //             </button>
            //           </div>
            //           <div>
            //             <ul
            //               style={{
            //                 height: "10rem",
            //                 display: batchDropdown ? "" : "none",
            //               }}
            //               className="ul-styling"
            //             >
            //               <BatchSelect
            //                 // usersDataComingChild={usersDataComingFrmChild}
            //                 // selectAllUsers={selectAllUsers}
            //                 // setSelectedUserIds={setSelectedUserIds}
            //                 // selectedUserIds={selectedUserIds}
            //                 // setSelectedUsers={setSelectedUsers}
            //                 // selectedUsers={selectedUsers}
            //                 // selectAllChecked={selectAllChecked}
            //                 // setSelectAllChecked={setSelectAllChecked}
            //                 // searchUserQuery={searchUserQuery}
            //                 // setSearchUserQuery={setSearchUserQuery}
            //               />
            //             </ul>
            //           </div>
            //         </div>
            <div className="container border p-0" style={{ width: "10rem",marginRight:"2rem", cursor:"pointer" }}>
              <div
                className="input-with-btn"
                style={{ width: "10rem",cursor:"pointer",border:"none" }}
                onClick={() => {
                  // setUsersDropDown(!usersDropDown);
                  setBatchDropdown(!batchDropdown);
                }}
              >
                <input
                style={{width:"8rem",outline:"none"}}
                  type="text"
                  className="custom-input"
                  placeholder="Select Batch"
                  value={Object.values(batches)}
                  disabled
                />
                <ExpandMore />
                
              </div>
              {/* divider */}
              <div
                className="ul-styling p-2"
                style={{
                  width:"10rem",
                  marginTop: "13rem",
                  height: "10rem",
                  display: batchDropdown ? "" : "none",
                }}
              >
                <BatchSelect
                batchDataComingChild={batchDataComingFrmChild}
                // selectAllBatches={selectAllBatches}
                setSelectedBatches={props.setSelectedBatches}
                selectedBatches={props.selectedBatches}
                selectAllChecked={selectAllChecked}
                setSelectAllChecked={setSelectAllChecked}
                // searchUserQuery={searchUserQuery}
                // setSearchUserQuery={setSearchUserQuery}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {userData.randomString === process.env.REACT_APP_USER_DES_USER ? (
            <>
              <MentorAssignedAlerts func={anotherFunc} setState={isTodayDate} />
            </>
          ) : (
            userData.randomString === process.env.REACT_APP_USER_DES_ADMIN && (
              <>
                <button
                  className="upload-list-button"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadCsv"
                  style={{ marginRight: "24px" }}
                >
                  <UploadCsvv />
                  Upload CSV
                </button>
              </>
            )
          )}

          <div
            className="d-flex margin"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="dropdown  background-set">
              <Link id="profileDropDown" className="text-decoration-none ">
                {userData.firstName?.toUpperCase().slice(0, 1)}
                {userData.lastName?.toUpperCase().slice(0, 1)}
              </Link>

              <ul className="dropdown-menu " aria-labelledby="profileDropDown">
                <li className="dropdown-item ">
                  <span className="username">
                    {userData.firstName} {userData.lastName} <br />
                  </span>
                  <span className="deployed-status">
                    {userData?.designation?.toLowerCase() === "user"
                      ? userData?.deployed
                        ? "Occupied"
                        : "On Bench"
                      : ""}
                  </span>
                </li>
                <li
                  className="dropdown-item "
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  <span className="email">{userData.email}</span>
                </li>
                <li
                  className="dropdown-item logout-hover"
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                >
                  <span className="logout">Logout</span>
                </li>
              </ul>
            </div>

            <span className="ms-2 mt-2" style={{ color: "#000" }}>
              <BsChevronDown />
            </span>
          </div>
        </nav>
      </div>
      <UploadCsv />
    </>
  );
};

export default Header;
