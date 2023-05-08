import { NewComponent } from "./ProjectComponent";
import React, { useState } from 'react';
import './AddNewIdea.css';

export const NewIdea = () => {

    const [value, setValue] = useState();
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className='row'>
                            <div className='col-6'>

                                <button className="w-100">Project Idea</button>
                            </div>

                            <div className='col-6'>
                                <button className="w-100">Project</button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <p className='paragraph'>
                            Simply share your project ideas with us, and our experts will review it and provide feedback and guidance on how to take it to the next level.<br />
                        </p>
                    </div>

                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                            <p class='text mb-0 ms-1'><b>Shared Project Idea</b></p>
                        </div>
                        <button type="button" class="view-all">
                            <p class="me-2">View All</p>
                        </button>
                    </div>

                    <div className='row'>
                        <div className="third-div">
                            <h5>Recipe Recommendation Engine</h5>
                            <p>
                                The Recipe Recommendation Engine is a web-based application that uses machine learning algorithm...<br />
                            </p>
                            <a href='#' class="stretched-link" >See More</a> {/* Use the Link component from React Router */}

                            <div className="row">
                                <div className="member">
                                    Members:
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Open modal for @getbootstrap</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>

                                    <div class="mb-3">
                                        <label for="project-name" class="col-form-label">Project Name</label>
                                        <input type="text" class="form-control" id="project-name" />
                                    </div>

                                    <div class="mb-3">
                                        <label for="project-description" class="col-form-label">Project Description</label>
                                        <textarea class="form-control" id="project-description"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="technology-used" class="col-form-label">Technology Used</label>
                                        <input class="form-control" type='' id="technology-used" />
                                    </div>

                                    <div class="mb-3">
                                        <label for="Members(Optional)" class="col-form-label">Members(Optional)</label>
                                        <input class="form-control" id="project-description" />
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Send message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};