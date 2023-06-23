import "./AddMentor.css";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddSign } from "../../Assets/addsign.svg";
import uploadImage from "../../Assets/uploadimage.svg";
import { ReactComponent as AlertImage } from "../../Assets/alertimage.svg";
import { ReactComponent as CameraIcon } from "../../Assets/Camera.svg";
import { storage } from "../../config/Firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AddMentor = () => {
    const navigate = useNavigate();
    const [mentorName, setMentorName] = useState("");
    const [skills, setSkills] = useState([]);
    const [emailId, setEmailId] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [designation, setDesignation] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("true");
    const [isCleared, setIsCleared] = useState(false);

    const position = ["Principal 1", "Principal 2", "Principal 3", "Principal", "Manager1", "Manager2", "Manager3", "Associate 1", "Associate 2", "Consultant 1", "Consultant 2"];
    const fileInputRef = useRef(null);

    const handleClickClear = () => {
        setMentorName("");
        setEmailId("");
        setDesignation("");
        setImageUrl("");
        setSkills([]);
        setIsCleared(true);
    }

    const handleImageUpload = (data) => {
        if (data == null) {
            return;
        }
        const imageRef = ref(storage, `userProfilePicture/${data.target.files[0].name}`);
        uploadBytes(imageRef, data.target.files[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                // console.log("URL:", url);
                setImageUrl(url);
            });
        });
    };

    const handleSkillsChange = (e) => {
        const selectedSkills = e.target.value.split(',').map((skill) => skill.trim());
        setSkills(selectedSkills);
    };

    const handleFormSubmit = async (e) => {
        if (mentorName.length == 0 && emailId.length < 2) {
            alert("Please fill out all the fields");
            setError(true);
        }
        else {
            await axios.post("https://cg-interns-hq.azurewebsites.net/postMentorDetails", {
                mentorName,
                emailId,
                imageUrl,
                designation,
                skills
            }).then((res) => {
                // console.log("print", res.data);
            }).catch((err) => {
                // console.log(err);
            })
            setSkills([]);
            setMentorName("");
            setEmailId("");
            setImageUrl("");
            setDesignation("");
            e.preventDefault();
            setError(false);
        }
    };
    const handleSkillTest = (e) => {
        e.preventDefault();
        navigate("/manage-skill-test");
    }

    const handleMentorName = (e) => {
        setMentorName(e.target.value);
    }

    const handleDesignation = (e) => {
        setDesignation(e.target.value);
    }
    const handleEmailId = (e) => {
        const enteredEmail = e.target.value;
        setEmailId(enteredEmail);
        setIsValidEmail(validateEmail(enteredEmail));
      };
    const validateEmail = (email) => {
        const regex = /@cginfinity\.com$/;
        return regex.test(email);
      };


    return (
        <div class="">
            <div className="d-flex align-item-center justify-content-between mb-2 ">
                <div className="d-flex">
                    <p className="heading-name mb-0">Mentor List</p>
                </div>

            </div>
            <button type="button" class="btn add-mentor-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <AddSign /> <span className="add-mentor-text">Add Mentor</span>
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title modalheading-text" id="exampleModalLabel">Add Mentor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClickClear}></button>
                        </div>
                        <div className="align-items-center">

                            <div className="upload-image-box">
                                <div className="d-flex align-items-center mt-4">
                                    <div className="uploaded-image">

                                        <img src={imageUrl || uploadImage} alt="Uploaded" className="uploaded-image" width="58px" height="58px" />

                                    </div>
                                    <div>
                                        <label for="fileUpload" class="file-upload btn btn-block"><CameraIcon /><span className="upload-image-text fw-bold">Upload Image</span>
                                            <input id="fileUpload" ref={fileInputRef} type="file" onChange={(e) => handleImageUpload(e)} />
                                        </label>
                                    </div>

                                </div>
                                <div class="alert alert-info mb-0 image-alert box-for-alert-message" role="alert">
                                    <AlertImage /> <span className="text-for-alert">Please upload recent image ensuring that the face is clearly visible.
                                        Allowed format is JPEG,PNG.</span>
                                    
                                </div>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label for="validationServer01" className="col-form-label d-flex">
                                            Mentor Name<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationServer01"
                                            placeholder="Enter Mentor Name"
                                            onChange={(e) => handleMentorName(e)}
                                            value={mentorName}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="position" className="col-form-label d-flex">
                                            Designation<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <select

                                            className="form-select"
                                            id="position"
                                            onChange={(e) => handleDesignation(e)}
                                            value={designation}
                                            arial-label=""

                                        >

                                            <option value="" hidden>Select position</option>
                                            {position.map((option) => (
                                                <option className="" key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label for="email-id" className="col-form-label d-flex">
                                            Email Id<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email-id"
                                            placeholder="Enter your Email Id"
                                            onChange={(e) => handleEmailId(e)}
                                            value={emailId}
                                        />
                                       {!isValidEmail && !isCleared && <p style={{ color: 'red' }}>Email ID must end with "@cginfinity.com"</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label for="skills" className="col-form-label d-flex">
                                            Technology Tags<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="project-name"
                                            placeholder="Add Technology Tags"
                                            value={skills}
                                            onChange={handleSkillsChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer border-top-0">
                            <button type="button" class="btn cancel-button fw-bold" data-bs-dismiss="modal" onClick={handleClickClear}><span className="cancel-text">Cancel</span></button>
                            <button type="button" class="btn save-button fw-bold" data-bs-dismiss={"modal" ? false : true}
                                onClick={handleFormSubmit}
                            ><span className="save-text">Save</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" onClick={(e) => handleSkillTest(e)}>Skill Test</button>
        </div>
    )
}
