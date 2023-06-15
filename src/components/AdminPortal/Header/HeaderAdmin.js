import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { ReactComponent as CGlogo } from "../../../Assets/CG-Logo (1) 1CGlogo.svg";
import "../Header/HeaderAdmin.css";
const HeaderAdmin = () => {
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
      <div>
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
            <ul className="navbar-nav nav-bg">
              <li className="nav-item ">
                <NavLink to="/admin-dashboard" className="btn activeBtn">
                  Dashboard<span></span>
                </NavLink>
              </li>

              <li className="nav-item mx-2">
                <NavLink to="/daily-Update" className="btn activeBtn">
                  Assign Task<span></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/skill-Management" className="btn activeBtn ">
                  Report<span></span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="d-flex margin"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="dropdown  background-set">
              <Link id="profileDropDown" className="text-decoration-none ">
                {/* <img
                src="https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg"
                alt="profile-Image"
                className="profile-Image"
              /> */}
                {userData.firstName.toUpperCase().slice(0, 1)}
                {userData.lastName.toUpperCase().slice(0, 1)}
              </Link>
              {/* <button type="button" class="btn btn-danger">Action</button> */}

              <ul className="dropdown-menu " aria-labelledby="profileDropDown">
                <li className="dropdown-item ">
                  <span className="username">
                    {userData.firstName} {userData.lastName} <br />
                  </span>
                  <span
                    style={{
                      color: "#28519E",
                      fontStyle: "italic",
                      fontSize: "14px",
                    }}
                  >
                    {userData.deployed ? "Occupied" : "On Bench"}
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

export default HeaderAdmin;
