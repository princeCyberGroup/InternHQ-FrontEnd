import "./AddNewIdea.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';

export const AddNewIdea = (props) => {
    const [projectDescription, setProjectDescription] = useState([])
    const navigate = useNavigate();
    const handleCLick = async (e) => {
        // state = false
        e.preventDefault();
        await axios.get("https://cg-interns-hq.azurewebsites.net/getProjectIdea?userId=1")
            .then((response) => {
                console.log("project ideas:",response.data.response);
               setProjectDescription(response.data.response)
                navigate('/project-idea-projects', { state: response.data.response});

            }).catch((error) => {

                console.log(error.response?.data);

                console.log(error.response?.data.msg);

            });
        // const data1= {projectDescription}
        // navigate('/project-idea-projects', { state: projectDescription });
    }
    return (
        <>
            <div className="card-body pb-0">
                <div className="text-row-1">
                    <p className="card-textt">
                        {" "}
                        Simply share your project ideas with us, and our experts
                        will review it and provide feedback and guidance on how to
                        take it to the next level.
                    </p>
                </div>

                <div className="share-project">
                    <div className="d-flex align-item-center justify-content-between mb-2 ">
                        <div className="d-flex">
                            <p className="text mb-0 fw-bold">Shared Project Idea</p>
                        </div>

                        <button className="view-all fw-bold" onClick={(e) => { handleCLick(e) }} >View All</button>
                    </div>
                </div>

                <div className="recipe-row">
                    <div className="recipe-text">
                        <h5 className="fw-bold">Recipe Recommendation Engine</h5>
                        <p className="fw-normal mb-1">
                            The Recipe Recommendation Engine is a web-based
                            application that uses machine learning algorithm...
                        </p>
                        <div className="project-link-2">
                            <a href="http.reciperecommendationengine.github">
                                See More
                            </a>
                        </div>
                        <div className="members-div pt-0">
                            <div className="member mb pt-1 fw-bold mb-2">
                                Members:
                            </div>
                            <div className="project-members ml-0">
                                <div className="project-idea-members">
                                    <p>AB</p>
                                </div>
                                <div className="project-idea-members">
                                    <p>CD</p>
                                </div>
                                <div className="project-idea-members">
                                    <p>EF</p>
                                </div>
                                <div className="project-idea-members">
                                    <p>IJ</p>
                                </div>
                                <div className="project-idea-members">
                                    <p>+2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="add-new-idea pt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                >
                    <p className="project-p mb-0 mt-2 pb-2">
                        <span>+</span> Add New Idea
                    </p>
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 add-project-wrapper" id="exampleModalLabel">
                                Add your Project Idea
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="project-name" className="col-form-label title-text">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="project-name"
                                        placeholder='Enter Project Name'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        for="project-description"
                                        className="col-form-label title-text"
                                    >
                                        Project Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="project-description"
                                        placeholder='Write Here..'
                                        rows={3}

                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label for="technology-used" className="col-form-label title-text">
                                        Technology Used
                                    </label>
                                    <select className='form-select'>
                                        <option hidden selected>Select Technology</option>
                                        <option>TypeScript</option>
                                        <option>PHP</option>
                                        <option>React JS</option>
                                        <option>SQL</option>
                                    </select>
                                    {/* <input
                                    className="form-control"
                                    type="text"
                                    id="technology-used"
                                /> */}

                                </div>
                                <div className="mb-3">
                                    <label for="Members(Optional)" className="col-form-label title-text">
                                        Members(Optional)
                                    </label>
                                    <input
                                        className="form-control"
                                        id="project-description"
                                        placeholder='Member Name'
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}