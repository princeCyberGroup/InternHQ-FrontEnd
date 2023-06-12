import { ProjectDetail } from "./ProjectDetail";
import "./ViewAll.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from "../../../Header";
import {EmptyProjectState} from "../../EmptyStates/EmptyProject/Project";
import { ReactComponent as Arrow } from "./arrow_forward_iosarrow.svg";

export const ViewAll = () => {
    const [projectIndex, setProjectIndex] = useState(0);
   
    const location = useLocation();
    const details = location.state;

    const handelIndex = (index) => {
        setProjectIndex(index);
    }
    return (
        <>
            <Header />
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
                 {details && details.length === 0 ? (
                    <EmptyProjectState/>
                 ):
                 ( <div className="all-project-idea-wrapper entire-component ms-0" style={{ overFlowY: "scroll" }}>
                 <div >
                     <ProjectIdeas data={details} projectDetails={handelIndex} />
                 </div>
                 <div className="project-detail" >
                     <ProjectDetail data={details} indexNumber={projectIndex} />
                 </div>
             </div>)}
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
    )
}

export const ProjectIdeas = (props) => {
    const [isBorder, setIsBorder] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(0);

    const truncate = (str, maxLength) => {
        if (str.length > maxLength) return (str.slice(0, maxLength) + "...");
        else return str;
    }

    return (

        <div className="all-project-names pt-3" >
            <div className="child-wrapper">
                {props.data.map((user, index) => {
                    const isBorder = index === selectedIdx;
                    return (
                        <div className={"project-names-wrapper mt-2 pb-0 d-flex justify-content-between" + 
                        (isBorder ? " project-names-wrapper-border" : "")} 
                        key={index}
                            onClick={() => {
                                props.projectDetails(index);
                                setSelectedIdx(index);
                                setIsBorder(true);
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                }}>
                                <h5
                                    className="project-names"
                                >
                                    {user.projectNames}

                                </h5>
                                <span
                                    className="click-arrow"
                                >
                                    <Arrow />
                                </span>
                            </div>


                            <div>
                                <p className="project-text flex-grow-1">

                                    {user.projectText.length > 100 ? truncate(user.projectText, 100) : user.projectText}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}