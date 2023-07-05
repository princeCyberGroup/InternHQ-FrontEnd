import { ReactComponent as CloudImage } from "../../Assets/Cloud.svg";
// import FileUploadButton from "./DragandDropFile";
import { ReactComponent as DropDown } from "../../Assets/dropdown.svg";
import React, { useState } from "react";

export const AddNewSkillTest = () => {
    const [technology, setTechnology] = useState("");
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const [question, setQuestion] = useState("");
    const [duration, setDuration] = useState("");
    const [error, setError] = useState(true);
    const [beginnerChecked, setBeginnerChecked] = useState(false);
    const [intermediateChecked, setIntermediateChecked] = useState(false);
    const [advancedChecked, setAdvancedChecked] = useState(false);

    const handleChangeTechnology = (e) =>{
        setTechnology(e.target.value);
    }
    const handleChangeName = (e) =>{
        setName(e.target.value);
    }
    const handleChangeQuestion = (e) =>{
        setQuestion(e.target.value);
    }
    const handleChangeDuration = (e) =>{
        setDuration(e.target.value);
    }
    const handleClickClear = (e) => {
        e.preventDefault();
        setTechnology("");
        setName("");
        setLevel("");
        setQuestion("");
        setDuration("");
        document.getElementById("flexRadioDefault1").checked = false;
        setBeginnerChecked(false);
        setIntermediateChecked(false);
        setAdvancedChecked(false);
    }

    const handleSubmit = (e) => {
        if (technology.length == 0 && name.length < 2) {
            alert("Please fill out the necessary details");
            setError(true);
        }
        else {
            setError(false);
            setTechnology("");
            setName("");
            setQuestion("");
            setDuration("");
            e.preventDefault();
        }
    }
    return (
        <div>
            {/* <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#newSkillModal">Add New Skill Test</button> */}
            <div className="modal fade" id="newSkillModal" tabindex="-1" aria-labelledby="newSkillModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title modalheading-text" id="newSkillModalLabel">Add New Skill Test</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="technology" className="col-form-label form-title-names">
                                        Technology<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input type="text" className="form-control" id="technology" placeholder="Select Technology"
                                    onChange={(e) => handleChangeTechnology(e)}
                                    value={technology} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label form-title-names">
                                        Name<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input type="text" className="form-control" id="name" placeholder="Add Name"
                                    onChange={(e) => handleChangeName(e)}
                                    value={name}
                                    />
                                </div>
                                <span className="d-flex mb-2 form-title-names">Level<span style={{ color: 'red' }}>*</span></span>
                                <div className="d-flex">
                                    <div className="form-check">
                                        <input className="form-check-input color-of-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={beginnerChecked} />
                                        <label className="form-check-label ps-2 pe-3" for="flexRadioDefault1">
                                            Beginner
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input color-of-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={intermediateChecked} />
                                        <label className="form-check-label ps-2 pe-3" for="flexRadioDefault1">
                                            Intermediate
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input color-of-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={advancedChecked} />
                                        <label className="form-check-label ps-2 pe-3" for="flexRadioDefault1">
                                            Advanced
                                        </label>
                                    </div>
                                </div>
                                <span className="d-flex mt-4 mb-3 form-title-names">Upload CSV<span style={{ color: 'red' }}>*</span></span>
                                <div className="upload-csv-text align-items-center justify-content-center">
                                    <div className="mb-3 mt-4">
                                        <CloudImage />
                                    </div>
                                    <div className="mb-3">
                                        <span className="drag-drop-text d-flex align-items-center justify-content-center fw-bold">Drag and drop here or click to select a file from your computer</span>
                                    </div>
                                    <div className="mb-4">
                                        <FileUploadButton />
                                    </div>
                                </div>
                                {/* <div className="d-flex justify-content-between">
                                    <div>
                                        <label htmlFor="questions" className="col-form-label form-title-names">Questions<span style={{ color: 'red' }}>*</span></label>
                                        <select className="form-select select-drop-down-style"
                                        onChange={(e) => handleChangeQuestion(e)}
                                        value={question}
                                        >
                                            <option value="" hidden>Select Questions</option>
                                            <option value="option-1">10</option>
                                            <option value="option-2">15</option>
                                            <option value="option-3">20</option>
                                            <option value="option-4">30</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="duration" className="col-form-label form-title-names">Duration<span style={{ color: 'red' }}>*</span></label>
                                        <select className="form-select select-drop-down-style"
                                        onChange={(e) => handleChangeDuration(e)}
                                        value={duration}
                                        >
                                            <option value="" hidden>Select Duration</option>
                                            <option value="option-1">10 mins</option>
                                            <option value="option-2">15 mins</option>
                                            <option value="option-3">20 mins</option>
                                            <option value="option-4">30 mins</option>
                                        </select>
                                    </div>
                                </div> */}
                            </form>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button" className="btn cancel-button fw-bold" data-bs-dismiss="modal" onClick={(e) => handleClickClear(e)}><span className="cancel-text">Cancel</span></button>
                            <button type="button" className="btn save-button" data-bs-dismiss={"modal" ? false : true}><span className="save-text" onClick= { handleSubmit}>Save</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}