import React, { useEffect, useState,useContext } from "react";
import { UserContext } from "../../Context/Context";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { ReactComponent as CGlogo } from "../../Assets/CG-Logo (1) 1CGlogo.svg";
import "./Header.css";
import MentorAssignedAlerts from "../UserPortal/Dashboard/MentorAssignedAlerts/MentorAssignedAlerts";
import CryptoJS from "crypto-js";
import { ReactComponent as UploadCsvv } from "../../Assets/upload.svg";
import { UploadCsv } from "../AdminPortal/Dashboard/UploadCsv/UploadCsvModal";
import "../AdminPortal/Dashboard/UploadCsv/uploadCsv.css";
import axios from "axios";

const Header = () => {
  const { resetTimer } = useContext(UserContext);
  const secretKey = process.env.REACT_APP_USER_KEY;
  const [userData, setUserData] = useState({});

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
        process.env.REACT_APP_API_URL +
          "/api/v3/postLogoutLog",
        {
          userId,
        }
      ).catch((error) => {
        console.log("this is error", error.response.status);
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
      });
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

  return (
    <>
      <div style={{ position: "fixed", top: "0", zIndex: "99", width: "100%" }}>
        <nav
          className="navbar navbar-expand-lg navbar-light  border-bottom"
          style={{ backgroundColor: "#FFFFFF" }}
        >
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
            {userData.randomString === process.env.REACT_APP_USER_DES_USER ? (
              // user */
              <ul
                className="navbar-nav nav-bg d-flex align-items-center"
                style={{ height: "2.7rem" }}
              >
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
              </ul>
            ) : userData.randomString ===
              process.env.REACT_APP_USER_DES_ADMIN ? (
              // Admin */
              <ul
                className="navbar-nav nav-bg d-flex align-items-center"
                style={{ height: "2.7rem" }}
              >
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
              </ul>
            ) : (
              // Mentor */
              <ul
                className="navbar-nav nav-bg d-flex align-items-center"
                style={{ height: "2.7rem" }}
              >
                <li className="nav-item ps-1">
                  <NavLink to="/mentor/dashboard" className="btn activeBtn">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item mx-2">
                  <NavLink to="/mentor/assign-task" className="btn activeBtn">
                    Assign Task
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/mentor/review-associates"
                    className="btn activeBtn "
                  >
                    Review Associates
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {userData.randomString === process.env.REACT_APP_USER_DES_USER ? (
            <>
              <MentorAssignedAlerts func={anotherFunc} setState={isTodayDate} />
            </>
          ) : userData.randomString === process.env.REACT_APP_USER_DES_ADMIN ? (
            <button
              className="upload-list-button"
              data-bs-toggle="modal"
              data-bs-target="#uploadCsv"
              style={{ marginRight: "24px" }}
            >
              <UploadCsvv />
              Upload CSV
            </button>
          ) : (
            ""
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
