import React,{useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cgLogo from "../Assets/cglogo.svg";
import { BsChevronDown } from "react-icons/bs";
import "./Header.css";
const Header = () => {
  // localStorage.setItem("userData",{"email":"prinec.kumar@cginfinity.com","userId":43,"firstName":"Prince","lastName":"kumar"})
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
  const navigate=useNavigate();
  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.clear("userData");
    navigate("/")
  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <NavLink className="navbar-brand" to="/dashboard">
            <img
              src={cgLogo}
              width="148"
              height="34"
              className="d-inline-block align-top"
              alt=""
            />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item"> */}

              <li className="nav-item ">
                <NavLink to="/dashboard" className="btn activeBtn">
                  Dashboard<span></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/daily-Update" className="btn activeBtn">
                  Daily Update<span></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/skill-Management" className="btn activeBtn ">
                  Skill Management<span></span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="dropdown margin">
            <Link
              id="profileDropDown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg"
                alt="profile-Image"
                className="profile-Image"
              />
              <span className="ms-2" style={{ color: "#000" }}>
                <BsChevronDown />
              </span>
            </Link>
            {/* <button type="button" class="btn btn-danger">Action</button> */}

            <ul className="dropdown-menu " aria-labelledby="profileDropDown">
              <li className="dropdown-item">
                <span className="username">{userData.firstName} {userData.lastName}</span>
              </li>
              <li
                className="dropdown-item"
                style={{
                  wordBreak: "break-word",
                  whiteSpace:"normal",
                }}
              >
                <span className="email">{userData.email}</span>
              </li>
              <li className="dropdown-item" onClick={(e)=>{handleLogout(e)}}>
                <span className="logout">Logout</span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
