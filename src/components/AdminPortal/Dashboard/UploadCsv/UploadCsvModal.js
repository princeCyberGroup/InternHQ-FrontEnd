
import React, { useState, useRef } from "react";
import { ReactComponent as CloudImage } from "../../../../Assets/Cloud.svg";
import { ReactComponent as CloseBtn } from "../../../../Assets/Close-admin.svg"
import { ReactComponent as CloseUpload } from "../../../../Assets/close-upload.svg"
import '../ManageSkillSet/Modals.css';
import axios from "axios";

export const UploadCsv = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef(null);

    const handleCancelClick = (e) => {
        e.preventDefault();

        setSelectedFile(null);
        setFile(null);
        handleRemoveFile()
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`https://cg-interns-hq.azurewebsites.net/associateConsultantDetails`
                , formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Content-Disposition': 'form-data; name="file"; filename="example.csv"'
                    }
                });
            // Reset form inputs

        } catch (error) {
            console.log(error);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        handleFileChange(droppedFile);

    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        setProgress(0);

        if (selectedFile) {
            readFileData(selectedFile);
        }
    };

    const readFileData = (file) => {
        const reader = new FileReader();

        reader.onloadstart = () => {
            setProgress(0);
        };

        reader.onprogress = (e) => {
            if (e.lengthComputable) {
                const progressPercent = Math.round((e.loaded / e.total) * 100);
                setProgress(progressPercent);
            }
        };

        reader.onload = (e) => {
            const contents = e.target.result;
            // Process the file data here if needed
            setProgress(100);
        };

        reader.readAsText(file);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setProgress(0);
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>

            <div className="modal fade" id="uploadCsv" tabIndex="-1" aria-labelledby="uploadCsvLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-1">
                            <h5 className="modal-title modalheading-text" id="uploadCsvLabel">Upload CSV</h5>
                            <div className=""
                                onClick={(e) => { handleCancelClick(e) }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ><CloseUpload />
                            </div>

                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <p className="information-text mb-0">
                                        To add a new batch of associate consultants, please upload the CSV file.
                                        <br></br>
                                        The CSV file should contain the following information:
                                        <div style={{ marginLeft: "0.625rem", marginTop: "0.625rem" }}>
                                            <li className="fw-bold">First & Last Name of Associate Consultant</li>
                                            <li className="fw-bold">Corresponding IDs</li>
                                            <li className="fw-bold">Duration of their Internship</li>
                                            <li className="fw-bold">Contact No.</li>
                                            <li className="fw-bold">Mail Id</li>
                                        </div>
                                    </p>
                                </div>
                                <div className="upload-csv-text align-items-center justify-content-center">
                                    <div className=" mt-4">
                                        <CloudImage />
                                    </div>
                                    <div className="mb-3">
                                        <span className="drag-drop-text d-flex  fw-bold">Drag and drop here <br /> or click to select a file from your computer</span>
                                    </div>
                                    <div className="mb-4">
                                        <div>
                                            <div
                                                onDrop={handleDrop}
                                                onDragOver={handleDragOver}
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={(e) => handleFileChange(e.target.files[0])}
                                                    accept=".csv"
                                                    style={{ display: "none" }}
                                                />
                                                <button type="button" onClick={handleBrowseClick} className="csv-upload-button">Browse from your computer</button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                {file && <div>
                                    <div
                                        className="d-flex align-items-center ps-1 ast-search-wrapper">
                                        <div className="progress-indicator-status"> {file && (
                                            <div style={{ marginLeft: "5.625rem", marginTop: "0.625rem", position: "relative" }} className="d-flex align-items-center">
                                                <div >{file.name}</div>

                                            </div>
                                        )}

                                        </div>
                                        <div className=""
                                            onClick={() => { handleRemoveFile() }}><CloseBtn /> </div>


                                    </div>


                                </div>}
                            </form>
                            <div className="border-top-0 pb-0 row ">
                                <div class="row mt-3 d-flex justify-content-end">
                                    <button className="btn " style={{
                                        width: "6rem",
                                        backgroundColor: "white",
                                        color: "#28519E",
                                        border: "1px solid #28519E",
                                        borderRadius: "4px",
                                    }}
                                        data-bs-dismiss="modal"
                                        onClick={(e) =>
                                            handleCancelClick(e)}>Cancel</button>
                                    <button style={{ width: "6rem", marginLeft: "0.625rem" }}
                                        onClick={(e) => handleSaveClick(e)
                                        }
                                        data-bs-dismiss="modal">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
