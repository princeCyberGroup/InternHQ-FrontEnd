import "./Modals.css";
import React, { useState } from "react";

export const AddNewTask = () => {
    const [error, setError] = useState(true);
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologyTag, setTechnologyTag] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const handleClickClear = (e) => {
        e.preventDefault();
        setTaskTitle("");
        setDescription("");
        setTechnologyTag("");
        setAssignedTo("");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.length == 0 && description.length < 2) {
            alert("Please fill out the necessary fields");
            setError(true);
        }
        else {
            setTaskTitle("");
            setDescription("");
            setTechnologyTag("");
            setAssignedTo("");
            setError(false);
        }
    }
    const handleTaskTitle = (e)=>{
        setTaskTitle(e.target.value);
    }
    const handleDescription = (e) =>{
        setDescription(e.target.value);
    }
    const handleTechnologyTag = (e) =>{
        setTechnologyTag(e.target.value);
    }
    const handleAssignedTo = (e) =>{
        setAssignedTo(e.target.value);
    }
    return (
        <div>
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#skillModal">Add New Task</button>
            <div class="modal fade" id="skillModal" tabindex="-1" aria-labelledby="skillModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-1">
                            <h5 class="modal-title modalheading-text" id="skillModalLabel">Add New Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => handleClickClear(e)}></button>

                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label htmlFor="task-title" className="col-form-label form-title-names">
                                        Task Title<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input type="text" class="form-control" id="task-title" placeholder="Enter task name" value={taskTitle} onChange={ (e) => handleTaskTitle(e)} />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="description" class="col-form-label form-title-names">Description<span style={{ color: 'red' }}>*</span></label>
                                    <textarea
                                        class="form-control"
                                        id="description"
                                        rows={3}
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={ (e) => handleDescription(e)}
                                    >
                                    </textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="technology-tag" class="col-form-label form-title-names">Technology Tag<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" class="form-control" id="technology-tag" placeholder="Add technology tag"
                                    value={technologyTag} onChange={ (e) => handleTechnologyTag(e)} />
                                </div>
                                <div class="mb-3">
                                    <label for="assigned-to" class="col-form-label form-title-names">Assigned To<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" class="form-control" id="assigned-to" placeholder="Select Associate Consultant" value={assignedTo} onChange={(e) => handleAssignedTo(e)} />
                                </div>

                                <div className="d-flex align-items-center justify-content-between">
                                   
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Select all Associate Consultant</label>
                                        <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>

                                </div>
                            </form>

                        </div>
                        <div class="modal-footer border-top-0">
                            <button type="button" class="btn modal-cancel-button fw-bold" data-bs-dismiss="modal" onClick={(e) => handleClickClear(e)}><span className="cancel-text">Cancel</span></button>
                            <button type="button" class="btn modal-save-button" data-bs-dismiss={"modal" ? false : true}><span className="save-text-field" onClick={(e)=>handleSubmit(e)}>Save</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}