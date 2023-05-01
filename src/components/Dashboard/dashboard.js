import React, { useState } from 'react'
import cgLogo from "./cglogo.svg"


const Dashboard = () => {

  const [dashNav, setDashNav] = useState("dashboard");

  const changeNavLink = (type) =>{
    console.log("working")
    setDashNav(type)
  }

  return (
    // <div>Dashboard</div>
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src={cgLogo} width="148" height="34" className="d-inline-block align-top" alt="" />
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item"> */}
              {dashNav === 'dashboard' ?
                <li className="nav-item active">
                  <a href="#" className="btn btn-primary navlinksHeightWidth" sx="navlinksHeightWidth">Dashboard<span></span></a>
                </li>
                :
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={()=>setDashNav('dashboard')}>Dashboard</a>
                </li>
              }

              {dashNav === 'dailyUpdate' ?
                <li className="nav-item active">
                  <a href="#" className="btn btn-primary navlinksHeightWidth" sx="navlinksHeightWidth">Daily Update<span></span></a>
                </li>
                :
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={()=>setDashNav('dailyUpdate')}>Daily Update</a>
                </li>
              }

              {dashNav === 'skillmanagement' ?
                <li className="nav-item active">
                  <a href="#" className="btn btn-primary navlinksHeightWidth" sx="navlinksHeightWidth">Skill Management<span></span></a>
                </li>
                :
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={()=>setDashNav('skillmanagement')}>Skill Management</a>
                </li>
              }
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Dashboard