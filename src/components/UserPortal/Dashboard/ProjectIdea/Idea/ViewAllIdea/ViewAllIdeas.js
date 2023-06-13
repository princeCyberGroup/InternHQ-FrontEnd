import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewAllIdea.css";
import Header from "../../../../../Header/Header";
import EmptyIdea from "../../../EmptyStates/EmptyProject/MyIdeaViewAll";
import DetailsLeft from "../../ViewDetails/DetailsLeft";
import ProjectDetail from "../../ViewDetails/ProjectDetail";

const ViewAllIdeas = () => {
  const [projectIndex, setProjectIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state;
  //   console.log(details)
  const handelIndex = (index) => {
    setProjectIndex(index);
  };

  return (
    // <div>working</div>
    <>
      <Header />
      <div className="container page-color">
        <div className="view-all-nav-bar pt-4">
          <p>Dashboard &gt; MyIdea</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="sub-text ps-0">My Idea</p>
          </div>

          <div className="mr-3">
            <button type="button" className="add-your-project-wrapper me-0">
              <p className="me-2 add-your-project">Add New Idea</p>
            </button>
          </div>
        </div>

        {details.length === 0 ? (
          <EmptyIdea />
        ) : (
          <div
            className="all-project-idea-wrapper entire-component ms-0"
            style={{ overFlowY: "scroll" }}
          >
            <div className="">
              <DetailsLeft data={details} projectDetails={handelIndex} />
            </div>
            <div className="project-detail">
              <ProjectDetail data={details} indexNumber={projectIndex} />
            </div>
          </div>
        )}
        {/* <div className="all-project-idea-wrapper entire-component ms-0" style={{ overFlowY: "scroll" }}>
                <div >
                    <ProjectNames data={details} projectDetails={handelIndex} />
                </div>
                <div className="project-detail" >
                    <ProjectDescription data={details} indexNumber={projectIndex} />
                </div>
            </div> */}
      </div>
    </>
  );
};

export default ViewAllIdeas;