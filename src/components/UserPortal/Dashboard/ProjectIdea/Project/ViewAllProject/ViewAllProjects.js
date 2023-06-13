import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ProjectDetail from "../../ViewDetails/ProjectDetail";
import Header from "../../../../../Header/Header";
import EmptyProjectState from "../../../EmptyStates/EmptyProject/Project";
import DetailsLeft from "../../ViewDetails/DetailsLeft";

const ViewAllProjects = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const location = useLocation();
  const details = location.state;

  const handelIndex = (index) => {
    setProjectIndex(index);
  };
  return (
    <>
      <Header />
      <div className="container page-color">
        <nav
          style={{ "--bs-breadcrumb-divider: '>';": "" }}
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb">
            <li className="breadcrumb-item header-text ps-0">
              {" "}
              <Link
                className="view-all fw-bold"
                to={{ pathname: "/dashboard" }}
              >
                Dashboard
              </Link>
            </li>
            <li
              className="breadcrumb-item active header-text"
              aria-current="page"
            >
              Project
            </li>
          </ol>
        </nav>

        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="sub-text ps-0">Project</p>
          </div>

          <div className="mr-3">
            <button type="button" className="add-your-project-wrapper me-0">
              <p className="me-2 add-your-project">Add Project</p>
            </button>
          </div>
        </div>
        {details && details.length === 0 ? (
          <EmptyProjectState />
        ) : (
          <div
            className="all-project-idea-wrapper entire-component ms-0"
            style={{ overFlowY: "scroll" }}
          >
            <div>
              <DetailsLeft data={details} projectDetails={handelIndex} />
            </div>
            <div className="project-detail">
              <ProjectDetail data={details} indexNumber={projectIndex} />
            </div>
          </div>
        )}
        {/* <div className="all-project-idea-wrapper entire-component ms-0" style={{ overFlowY: "scroll" }}>
                    <div >
                        <ProjectIdeas data={details} projectDetails={handelIndex} />
                    </div>
                    <div className="project-detail" >
                        <ProjectDetail data={details} indexNumber={projectIndex} />
                    </div>
                </div> */}
      </div>
    </>
  );
};
export default ViewAllProjects;

