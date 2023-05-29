import { ProjectDetail } from "./ProjectDetail";
import "./ViewAll.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

export const ViewAll = () => {
    const [projectIndex, setProjectIndex] = useState(0);

    const location = useLocation();
    const details = location.state;
    console.log("Details:", details)
    const handelIndex = (index) => {
        setProjectIndex(index);
    }
    return (
        <div className="container page-color">
            <nav style={{ "--bs-breadcrumb-divider: '>';": '' }} aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item header-text ps-0"> <Link className="view-all fw-bold" to={{ pathname: '/dashboard' }} >
                        Dashboard
                    </Link></li>
                    <li className="breadcrumb-item active header-text" aria-current="page">Project</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between">

                <div className="d-flex">
                    <p className="sub-text ps-0">Project</p>
                </div>

                <div className="mr-3">
                    <button type="button" className="add-your-project-wrapper me-0">
                        <p className="me-2 add-your-project">Add Project</p></button>
                </div>
            </div>

            <div className="all-project-idea-wrapper entire-component ms-0" style={{ overFlowY: "scroll" }}>
                <div >
                    <ProjectIdeas data={details} projectDetails={handelIndex} />
                </div>
                <div className="project-detail" >
                    <ProjectDetail data={details} indexNumber={projectIndex} />
                </div>
            </div>

        </div>
    )
}

export const ProjectIdeas = (props) => {

    const truncate = (str, maxLength) => {
        if (str.length > maxLength) return (str.slice(0, maxLength) + "...");
        else return str;
    }

    return (

        <div className="all-project-names pt-3" >
            {props.data.map((user, index) => {
                return (
                    <div className="project-names-wrapper mt-2 pb-0 d-flex justify-content-between" key={index}
                        onClick={() => {
                            props.projectDetails(index);
                        }}>

                        <div
                            style={{
                                display: "flex",
                            }}>
                            <h5
                                className="project-names"
                            >{user.ProjectNames}
                            </h5>
                            <span
                                className="click-arrow"
                            // style={{ border:"1px solid black" }}
                            >
                                &gt;
                            </span>
                        </div>


                        <div>
                            <p className="project-text flex-grow-1">{truncate(user.ProjectText, 100)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}