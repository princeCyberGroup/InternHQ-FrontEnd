import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { ReactComponent as CGlogo } from "../../Assets/CG-Logo (1) 1CGlogo.svg";
import "./Header.css";
import MentorAssignedAlerts from "../UserPortal/Dashboard/MentorAssignedAlerts/MentorAssignedAlerts";

const Header = () => {
  // localStorage.setItem("userData",{"email":"prinec.kumar@cginfinity.com","userId":43,"firstName":"Prince","lastName":"kumar"})
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear("userData");
    navigate("/");
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
            {userData.randomString === "07495d" ? (
              // user */
              <ul className="navbar-nav nav-bg">
                <li className="nav-item ">
                  <NavLink to="/dashboard" className="btn activeBtn">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item mx-2">
                  <NavLink to="/daily-Update" className="btn activeBtn">
                    Daily Update
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/skill-Management" className="btn activeBtn ">
                    Skill Management
                  </NavLink>
                </li>
              </ul>
            ) : (
              // Admin */
              <ul className="navbar-nav nav-bg">
                <li className="nav-item ">
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
                <li className="nav-item">
                  <NavLink to="/admin/reports" className="btn activeBtn ">
                    Report
                  </NavLink>
                </li>
                <li className="nav-item"  onClick={(e) => {
                      e.preventDefault();
                      alert("Developement is in progress");
                      navigate("/")
                    }}>
                  <NavLink
                    to="/admin/logs"
                    className="btn activeBtn "
                  >
                    Logs
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          
          <div>
          <MentorAssignedAlerts/>
          </div>

          <div
            className="d-flex margin"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="dropdown  background-set">
              <Link id="profileDropDown" className="text-decoration-none ">
                {userData.firstName.toUpperCase().slice(0, 1)}
                {userData.lastName.toUpperCase().slice(0, 1)}
              </Link>
              {/* <button type="button" class="btn btn-danger">Action</button> */}

              <ul className="dropdown-menu " aria-labelledby="profileDropDown">
                <li className="dropdown-item ">
                  <span className="username">
                    {userData.firstName} {userData.lastName} <br />
                  </span>
                  <span className="deployed-status">
                    {userData.designation.toLowerCase() ==="user"?userData.deployed ? "Occupied" : "On Bench":""}
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
    </>
  );
};

export default Header;
