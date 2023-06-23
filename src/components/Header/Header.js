import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { ReactComponent as CGlogo } from "../../Assets/CG-Logo (1) 1CGlogo.svg";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "../UserPortal/Dashboard/Notification/Notification.css";
const Header = () => {
  // localStorage.setItem("userData",{"email":"prinec.kumar@cginfinity.com","userId":43,"firstName":"Prince","lastName":"kumar"})
  const [hasNewNotification, setHasNewNotification] = useState(true);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear("userData");
    navigate("/");
  };
  const handleNotificationClick = () => {
    setHasNewNotification(!hasNewNotification);
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
                <NavLink to="/dashboard" className="btn activeBtn">
                  Dashboard<span></span>
                </NavLink>
              </li>

              <li className="nav-item mx-2">
                <NavLink to="/daily-Update" className="btn activeBtn">
                  Daily Update<span></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/skill-Management" className="btn activeBtn ">
                  Skill Management<span></span>
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/assign-task" className="btn activeBtn ">
                  Assign Task<span></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin-dashboard" className="btn activeBtn ">
                  Admin Dashboard<span></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/report" className="btn activeBtn ">
                  Report<span></span>
                </NavLink>
              </li> */}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faBell}
              shake={hasNewNotification}
              size="lg"
              onClick={handleNotificationClick}
              style={{
                color: "#002c3f",
                cursor: "pointer",
                marginRight: "2rem",
                // position: "relative",
                // top: "5px",
              }}
            />
            {hasNewNotification ? (
                <div
                  style={{
                    backgroundColor: "red",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    position: "absolute",
                    right: "141px",
                    top: "21px",
                    border: "1px solid white",
                  }}
                ></div>
            ) : (<div
              class="card"
              style={{
                position: "absolute",
                right: "1.5rem",
                top: "3.4rem",
                zIndex: 4,
                maxWidth: "21rem",
                boxShadow: "0px 4px 20px rgba(40, 52, 73, 0.15)",
                borderRadius: "8px",
              }}
            >
              <div class="card-body">
                <div className="border-bottom ">
                  <h5
                    class="card-title"
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: 600,
                      fontSize: "1rem",
                      lineHeight: "1.18rem",
                      color: "#343435",
                    }}
                  >
                    Mentor Assigned Task
                  </h5>
                </div>
                <div style={{maxHeight: "17.9rem", overflowY: "scroll"}}>
                  <div
                    style={{
                      padding: "16px 0px",
                      borderBottom: "1px solid #E9ECEB",
                    }}
                  >
                    <div className="text-wrapper ps-0">
                      <p class="card-text">
                        <b>Lagnesh</b> has assigned you{" "}
                        <b>Full Stack Engineering Project</b> task
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "16px 0px",
                      borderBottom: "1px solid #E9ECEB",
                    }}
                  >
                    <div className="text-wrapper ps-0">
                      <p class="card-text">
                        <b>Lagnesh</b> has assigned you{" "}
                        <b>Full Stack Engineering Project</b> task
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "16px 0px",
                      borderBottom: "1px solid #E9ECEB",
                    }}
                  >
                    <div className="text-wrapper ps-0">
                      <p class="card-text">
                        <b>Lagnesh</b> has assigned you{" "}
                        <b>Full Stack Engineering Project</b> task
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "16px 0px",
                      borderBottom: "1px solid #E9ECEB",
                    }}
                  >
                    <div className="text-wrapper ps-0">
                      <p class="card-text">
                        <b>Lagnesh</b> has assigned you{" "}
                        <b>Full Stack Engineering Project</b> task
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "16px 0px",
                      borderBottom: "1px solid #E9ECEB",
                    }}
                  >
                    <div className="text-wrapper ps-0">
                      <p class="card-text">
                        <b>Lagnesh</b> has assigned you{" "}
                        <b>Full Stack Engineering Project</b> task
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
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
                {userData.firstName?.toUpperCase().slice(0, 1)}
                {userData.lastName?.toUpperCase().slice(0, 1)}
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

export default Header;
