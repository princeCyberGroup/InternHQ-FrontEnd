import React from 'react'
import { NavLink } from 'react-router-dom'
import cgLogo from "../Assets/cglogo.svg";
import './Header.css'
const Header = () => {
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
        </nav>
      </div>
    </>
  )
}

export default Header