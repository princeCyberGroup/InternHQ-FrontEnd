import React, { useState } from "react";
import { ReactComponent as CloudImage } from "../../Assets/Cloud.svg";
import FileUploadButton from "./DragandDropFile";
import axios from "axios";

export const UploadCsv = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleCancelClick = (e) => {
        e.preventDefault();
        setSelectedFile(null);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);


            axios
                .post("your-api-endpoint", formData)
                .then((response) => {
                    // Handle the response from the backend
                    // console.log(response.data);
                })
                .catch((error) => {
                    // Handle the error
                    // console.log(error);
                });
        }
        // console.log("filename:",selectedFile);
    };

    return (
        <div>
            <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#uploadCsv"
            >
                Upload Csv
            </button>
            <div className="modal fade" id="uploadCsv" tabIndex="-1" aria-labelledby="uploadCsvLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-1">
                            <h5 className="modal-title modalheading-text" id="uploadCsvLabel">Upload CSV</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <p className="information-text mb-0">
                                        To add a new batch of associate consultants, please upload the CSV file.
                                    </p>
                                    <p className="information-text d-flex">
                                        The CSV file should contain the following information:
                                    </p>
                                    <div className="styling-of-list mb-3 mt-3">
                                        <li className="fw-bold">First & Last Name of Associate Consultant</li>
                                        <li className="fw-bold">Corresponding IDs</li>
                                        <li className="fw-bold">Duration of their Internship</li>
                                        <li className="fw-bold">Contact No.</li>
                                        <li className="fw-bold">Mail Id</li>
                                    </div>
                                </div>
                                <div className="upload-csv-text align-items-center justify-content-center">
                                    <div className="mb-3 mt-4">
                                        <CloudImage />
                                    </div>
                                    <div className="mb-3">
                                        <span className="drag-drop-text d-flex align-items-center justify-content-center fw-bold">Drag and drop here or click to select a file from your computer</span>
                                    </div>
                                    <div className="mb-4">
                                        <FileUploadButton
                                            setSelectedFile={setSelectedFile}
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="modal-footer border-top-0 pb-0">
                                <button
                                    type="button"
                                    className="btn cancel-button fw-bold"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => handleCancelClick(e)}
                                >
                                    <span className="cancel-text">Cancel</span>
                                </button>
                                <button
                                    type="button"
                                    className="btn save-button"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => handleSaveClick(e)}
                                >
                                    <span className="save-text">Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}