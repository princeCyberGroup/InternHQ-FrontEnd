import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddProject = ({ projectApiDataa }) => {
    const navigate = useNavigate();
    console.log("Project Name:", projectApiDataa);
    const [first, ...rest] = projectApiDataa;

    const handleClick = async (e) => {
        e.preventDefault();
        const data = { projectApiDataa }
        navigate('/all-projects', { state: projectApiDataa });
    }


    return (
        <>
            <div className="card-body pb-0">
                <div className="project-card-text-row">
                    <p className="project-card-text">
                        A star will be rewarded to you as a token of appreciation
                        for your hardwork and dedication upon the successful
                        completion of the project.
                    </p>
                </div>
                <div className="project-idea">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                            <p class="text mb-0 ms-1">Project</p>
                        </div>
                        <button
                            type="button" onClick={(e) => {
                                handleClick(e)
                            }} class="view-all">
                            View All
                        </button>
                    </div>
                </div>

                <div className="project-recipe-row mb-5">
                    <div className="recipe-text project-recipe-name">
                        <h5 className="fw-bold">{first.projectNames}</h5>
                        <div className="project-link-1">
                            <a>{first.projectLink}</a>
                            {/* Use the Link component from React Router */}
                        </div>

                        <div className="technology-used fw-bold">Technology Used:</div>
                        <div className="technology-badges">
                            {first.technology.map((currElem, index) => {
                                if (currElem != null) {
                                    return(
                                    <div className="technology-badge-1">{currElem}</div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                </div>
                <div
                    className="add-project mt-5  pt-4 pb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                >
                    <p className="project-p fw-bold mb-4 mt-4">
                        <span className="fw-bold">+</span> <b>Add Project</b>
                    </p>
                </div>
            </div>
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 add-project-wrapper" id="exampleModalLabel">
                                Add Project
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="project-name" class="col-form-label title-text">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="project-name"
                                    />
                                </div>

                                <div class="mb-3">
                                    <label
                                        for="project-description"
                                        class="col-form-label title-text"
                                    >
                                        Project Description
                                    </label>
                                    <textarea
                                        class="form-control"
                                        id="project-description"
                                    ></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="technology-used" class="col-form-label title-text">
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
                                                    class="form-control"
                                                    type=""
                                                    id="technology-used"
                                                /> */}
                                </div>
                                <div class="mb-3">
                                    <label for="Project Link" class="col-form-label title-text">
                                        Project Link
                                    </label>
                                    <input class="form-control" id="project-link" />
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="Hosted Link(Optional)"
                                        class="col-form-label title-text"
                                    >
                                        Hosted Link(Optional)
                                    </label>
                                    <input class="form-control" id="hosted-link" />
                                </div>
                                <div class="mb-3">
                                    <label for="Members(Optional)" class="col-form-label title-text">
                                        Members(Optional)
                                    </label>
                                    <input
                                        class="form-control"
                                        id="project-description"
                                    />
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" class="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}