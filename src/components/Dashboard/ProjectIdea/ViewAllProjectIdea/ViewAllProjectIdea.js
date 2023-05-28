import { ProjectNames } from "./ProjectNames";
import { ProjectDescription } from "./ProjectDescription";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

export const ViewProjectIdeas = () => {

    const [projectIndex, setProjectIndex] = useState(0);

    const location = useLocation();
    const details = location.state;
    console.log("Details:", details)
    const handelIndex = (index) => {
        setProjectIndex(index);
    }

    return (
        <div className="container">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link className="view-all fw-bold" to={{ pathname: '/dashboard' }} >Dashboard</Link></li>
                    <li class="breadcrumb-item " aria-current="page">Project Idea</li>
                </ol>
            </nav>
            <div className="d-flex justify-content-between">

                <div className="d-flex">
                    <p className="sub-text ps-0">Project Idea</p>
                </div>

                <div className="mr-3">
                    <button type="button" className="add-your-project-wrapper me-0">
                        <p className="me-2 add-your-project">Add New Idea</p></button>
                </div>
            </div>

            <div className="all-project-idea-wrapper entire-component ms-0" style={{ overFlowY: "scroll" }}>
                <div >
                    <ProjectNames data={details} projectDetails={handelIndex} />
                </div>
                <div className="project-detail" >
                    <ProjectDescription data={details} indexNumber={projectIndex} />
                </div>
            </div>
        </div>
    )
}