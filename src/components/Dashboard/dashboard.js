import React, { useState } from 'react'
import cgLogo from "./cglogo.svg"
import DailyTaskTracker from './DailyTaskTracker/DailyTaskTracker';
import DailyUpdateTable from '../DailyUpdateTable/DailyUpdateTable';
import { AddNewProjectComponent } from './ProjectIdea/ProjectComponent';
import DashboardGraph from './ReportGraph/DashboardGraph';
import { NotificationComponent } from './Notification/Notifications';
import { MentorComponent } from './MentorList/MentorList';
import SkillManagement from "../SkillManagement/SkillManagement"
import "./dashboard.css"
const Dashboard = () => {

  const [currPage, setCurrPage] = useState("dashboard");
  const [dashNav, setDashNav] = useState("dashboard");


  const changePage = (type) => {
    console.log("working")
    setDashNav(type)
    setCurrPage(type)
  }

  return (
    // <div>Dashboard</div>
    <>
   
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <a className="navbar-brand" href="#">
            <img src={cgLogo} width="148" height="34" className="d-inline-block align-top" alt="" />
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item"> */}
              {dashNav === 'dashboard' ?
                <li className="nav-item active">
                  <a href="#" className="btn btn-primary navlinksHeightWidth" >Dashboard<span></span></a>
                </li>
                :
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => changePage('dashboard')}>Dashboard</a>
                </li>
              }

              {dashNav === 'dailyUpdate' ?
                <li className="nav-item active">
                  <a href="#" className="btn btn-primary " >Daily Update<span></span></a>
                </li>
                :
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => changePage('dailyUpdate')}>Daily Update</a>
                </li>
              }

              {dashNav === 'skillmanagement' ?
                <li className="nav-item active">
                  <a href="#" className="btn btn-primary "   >Skill Management<span></span></a>
                </li>
                :
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => changePage('skillmanagement')}>Skill Management</a>
                </li>
              }
            </ul>
          </div>
        </nav>
      </div>

      <div className='responsiveness'>
      {currPage === 'dashboard' ?
        <>
          <div class="container-fluid">
              <div class="row mt-3">
                <div class=" col-md-4" >
                  <DailyTaskTracker/>
                </div>
                 <div class=" col-md-4" >
                  <AddNewProjectComponent/>
                </div>
                <div class=" col-md-4" >
                  <MentorComponent/>
                </div> 
              </div>
              <div class="row mt-3">
                <div class="col-md-8">
                  <DashboardGraph/>
                </div>
                <div class="col-md-4">
                  <NotificationComponent/>
                </div>
            </div>
          </div>
        </>
        :
        <>
        {currPage === 'dailyUpdate' ?
        <DailyUpdateTable />
        :
        <>
        {/* <h1>Here Goes Skill Management Section</h1> */}
        <SkillManagement/>
        </>
        }
        </> 
        }
        </div>
    </>
  )
}

export default Dashboard