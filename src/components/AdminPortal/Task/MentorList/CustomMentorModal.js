// To Add Mentor....
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import uploadImage from "../../../../Assets/VectorUpload.svg";
import { ReactComponent as AlertImage } from "../../../../Assets/Vectoralert.svg";
import { ReactComponent as CameraIcon } from "../../../../Assets/Cameracamera.svg";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import { ReactComponent as ProfileDetails } from "../../../../Assets/ProfileDetails.svg";
import { ReactComponent as PermissionsDisabled } from "../../../../Assets/PermissionsDisabled.svg";
import { ReactComponent as HorizontalLine } from "../../../../Assets/HorizontalLine.svg";
import { ReactComponent as ProfileDetailsDone } from "../../../../Assets/ProfileDetailsDone.svg";
import { ReactComponent as PermissionsEnabled } from "../../../../Assets/PermissionsEnabled.svg";
import TechnologyDropDown from "../AssignTask/TechnologyDropdown(Admin)";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./AddMentorModal.css";

const CustomMentorModal = ({ show, onHide, onAddMentor }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mentorName, setMentorName] = useState("");
  const [technologyNames, setTechnologyNames] = useState([]);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [designation, setDesignation] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [isCleared, setIsCleared] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [tech, setTech] = useState({});
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNext, setisNext] = useState(false);
  const [isChecked, setIsChecked] = useState(false); //Activate Mentor Toggle
  const [permissions, setPermissions] = useState([]);

  const position = [
    "Principal 1",
    "Principal 2",
    "Principal 3",
    "Principal",
    "Manager1",
    "Manager2",
    "Manager3",
    "Associate 1",
    "Associate 2",
    "Consultant 1",
    "Consultant 2",
  ];

  const fileInputRef = useRef(null);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleClickClear = () => {
    onHide();
    setMentorName("");
    setEmail("");
    setDesignation("");
    setImageUrl("");
    setTechnologyNames([]);
    setPermissions([]);
    setIsCleared(true);
    setIsChecked(false);
    setCurrentPage(1);
    setTech({});
    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleImageUpload = (data) => {
    if (data == null) {
      return;
    }

    const imageRef = ref(
      storage,
      `userProfilePicture/${data.target.files[0].name}`
    );

    uploadBytes(imageRef, data.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  const handleSkillsChange = (event) => {
    const selectedSkills = Array.from(event.target.selectedOptions, (option) =>
      option.value.trim()
    );
    setTechnologyNames(selectedSkills);
  };

  const handlePermissionsChange = (event, value) => {
    if (event.target.checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter(item => item !== value));
    }
  };

  const techDataComingFrmChild = (data) => {
    return setTech(data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
        try {
          await axios.post(
            process.env.REACT_APP_API_URL + "/addNewMentor",
            {
              mentorName,
              email,
              imageUrl,
              designation,
              skills: technologyNames,
              isActive: isChecked,
              permissionType: permissions,            
            }
          );
          // onAddMentor({
          //   mentorName,
          //   email,
          //   imageUrl,
          //   designation,
          //   technologyNames,
          //   isChecked,
          //   permissions,
          // });

          setTechnologyNames([]);
          setPermissions([]);
          setMentorName("");
          setEmail("");
          setImageUrl("");
          setDesignation("");
          setNameError(true);
          setTech({});
          setEmailError(true);
        } catch (err) {
          console.log(err);
        }
        onHide();
  };

  const handleMentorName = (e) => {
    setMentorName(e.target.value);
    if (mentorName.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };

  const handleEmailId = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(validateEmail(enteredEmail));
    if (email.length < 2) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /@cginfinity\.com$/;

    return regex.test(email);
  };

  const handleNext = () => {
    if (
      nameError ||
      !designation ||
      emailError ||
      selectedTechIds.length === 0
    ) {
      alert("Please fill out the necessary fields");
    } else 
    setCurrentPage(2);
  };

  const handlePrevious = () => {
    setCurrentPage(1);
  };

  // console.log(permissions, "This is permissions")
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="modalheading-text">Add Mentor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentPage === 1 && (
          <>
            <div className="mentor-step">
              <div className="row">
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <div className="row">{<ProfileDetails />}</div>
                  <div
                    className="row fw-bold permissions-text"
                    style={{ width: "6rem" }}
                  >
                    Profile Details
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <HorizontalLine />
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <div className="row">{<PermissionsDisabled />}</div>
                  <div
                    className={`row permissions-text ${
                      isNext ? "fw-bold" : "permissions-disabled-text"
                    }`}
                    style={{ width: "6rem" }}
                  >
                    Permissions
                  </div>
                </div>
              </div>
            </div>
            <div className="align-items-center">
              <div className="upload-image-box">
                <div className="d-flex align-items-center mt-3">
                  <div className="uploaded-image">
                    <img
                      src={imageUrl || uploadImage}
                      alt="Uploaded"
                      className="uploaded-image"
                      width="58px"
                      height="58px"
                    />
                  </div>

                  <div>
                    <label
                      for="fileUpload"
                      className="file-upload btn btn-block"
                    >
                      <CameraIcon />
                      <span className="upload-image-text fw-bold">
                        Upload Image
                      </span>

                      <input
                        id="fileUpload"
                        ref={fileInputRef}
                        type="file"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </label>
                  </div>
                </div>

                <div
                  class="alert alert-info mb-0 box-for-alert-message mt-1"
                  role="alert"
                >
                  <div>
                    <AlertImage />
                  </div>
                  <div className="text-for-alert">
                    <p className="m-0 mx-2">
                      Please upload recent image ensuring that the face is
                      clearly visible.
                    </p>
                    <p className="m-0 mx-2">Allowed format is JPEG,PNG.</p>
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <label
                      for="validationServer01"
                      className="col-form-label d-flex"
                    >
                      Mentor Name<span style={{ color: "red" }}>*</span>
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

                  <div className="mb-2">
                    <label for="email-id" className="col-form-label d-flex">
                      Email<span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="email-id"
                      placeholder="Enter Email"
                      onChange={(e) => handleEmailId(e)}
                      value={email}
                    />

                    {!isValidEmail && !isCleared && (
                      <p style={{ color: "red" }}>
                        Email ID must end with "@cginfinity.com"
                      </p>
                    )}
                  </div>

                  <div className="mb-2">
                    <label for="position" className="col-form-label d-flex">
                      Designation<span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      className="form-select"
                      id="position"
                      onChange={(e) => handleDesignation(e)}
                      value={designation}
                      arial-label=""
                    >
                      <option value="" hidden>
                        Select position
                      </option>

                      {position.map((option) => (
                        <option className="" key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label for="skills" className="col-form-label d-flex">
                      Technology Tags<span style={{ color: "red" }}>*</span>
                    </label>

                    <div className="container border p-0" style={{borderRadius: "0.375rem"}}>
                      <div className="input-with-button">
                        <button
                          type="button"
                          className="button-for-dropdown"
                          style={{width: "23.7rem"}}
                          onClick={() => {
                            setDropDown(!dropDown);
                          }}
                        >
                          <input
                            type="text"
                            className="custom-input"
                            placeholder="Select Technology"
                            onChange={(e) => handleSkillsChange(e)}
                            value={Object.values(tech)}
                            disabled
                          />
                        </button>
                        <button
                          type="button"
                          className="expand-more"
                          onClick={() => {
                            setDropDown(!dropDown);
                          }}
                        >
                          <ExpandMore />
                        </button>
                      </div>
                      <div>
                        <ul
                          style={{ display: dropDown ? "" : "none", width: "27rem" }}
                          className="ul-styling"
                        >
                          <TechnologyDropDown
                            techDataComingChild={techDataComingFrmChild}
                            setTechnologyNames={setTechnologyNames}
                            technologyNames={technologyNames}
                            selectedTechIds={selectedTechIds}
                            setSelectedTechIds={setSelectedTechIds}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                          />
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn cancel-button fw-bold"
                // data-bs-dismiss="modal"
                
                onClick={handleClickClear}
              >
                <span className="cancel-text">Cancel</span>
              </button>

              <button
                type="button"
                className="btn mentor-save-button fw-bold"
                // data-bs-dismiss={
                //   !nameError &&
                //   designation &&
                //   !emailError &&
                //   selectedTechIds.length !== 0
                //     ? "modal"
                //     : ""
                // }
                disabled={!isValidEmail}
                onClick={handleNext}
              >
                <span className="save-text">Next</span>
              </button>
            </div>
          </>
        )}
        {currentPage === 2 && (
          <>
            <div className="mentor-step">
              <div className="row">
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <div className="row">{<ProfileDetailsDone />}</div>
                  <div
                    className="row fw-bold permissions-text"
                    style={{ width: "6rem" }}
                  >
                    Profile Details
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <HorizontalLine />
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <div className="row">{<PermissionsEnabled />}</div>
                  <div
                    className={`row permissions-text ${
                      isNext ? "fw-bold" : "permissions-disabled-text"
                    }`}
                    style={{ width: "6rem" }}
                  >
                    Permissions
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "28rem"
                }}
              >
                <h5
                  className="m-0 modalheading-text"
                  style={{ fontSize: "14px" }}
                >
                  Activate Mentor
                </h5>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="toggleButton"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                </div>
              </div>

              <div
                className="alert alert-info mb-0 box-for-alert-message mt-2 ms-0"
                role="alert"
              >
                <div className="d-flex justify-content-center align-items-center">
                  <AlertImage />
                </div>
                <div className="text-for-alert">
                  <p className="m-0 mx-2">
                    Activating a mentor will require to select any permission
                    level from below.
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox1"
                    onChange={(e) => {handlePermissionsChange(e, 'Session')}}
                    disabled={!isChecked}
                  />
                  <label className="form-check-label " style={{fontWeight: "600", fontSize: "14px"}} htmlFor="checkbox1">
                    Training Session
                  </label>
                  <ul
                      style={{
                        listStyleType: "disc",
                        margin: "0 0 0 20px",
                        paddingLeft: 10,
                        fontSize: "13px",
                        color: isChecked ? "inherit" : "rgba(0, 0, 0, 0.5)"
                      }}
                    >
                      <li>Dashboard access</li>
                      <li>
                        Can conduct training sessions and assign & review tasks
                      </li>
                      <li>Can see the session calendar</li>
                      <li>Know your mentor will be automatically activated</li>
                    </ul>
                </div>

                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox2"
                    onChange={(e) => {handlePermissionsChange(e, 'Project')}}
                    disabled={!isChecked}
                  />
                  <label className="form-check-label" style={{fontWeight: "600", fontSize: "14px"}} htmlFor="checkbox2">
                    Project
                  </label>
                  <ul
                      style={{
                        listStyleType: "disc",
                        margin: "0 0 0 20px",
                        paddingLeft: 10,
                        fontSize: "13px",
                        color: isChecked ? "inherit" : "rgba(0, 0, 0, 0.5)"
                      }}
                    >
                      <li>Can assign tasks to associate consultants</li>
                      <li>Can give ratings as per the task</li>
                      <li>Know your mentor will be automatically activated</li>
                    </ul>
                </div>

                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox3"
                    onChange={(e) => {handlePermissionsChange(e, 'Review')}}
                    disabled={!isChecked}
                  />
                  <label className="form-check-label" style={{fontWeight: "600", fontSize: "14px"}} htmlFor="checkbox3">
                    Final Review
                  </label>
                  <ul
                      style={{
                        listStyleType: "disc",
                        margin: "0 0 0 20px",
                        paddingLeft: 10,
                        fontSize: "13px",
                        color: isChecked ? "inherit" : "rgba(0, 0, 0, 0.5)"
                      }}
                    >
                      <li>Only review the associate consultant</li>
                    </ul>
                </div>

                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox4"
                    onChange={(e) => {handlePermissionsChange(e, 'Know Your Mentor')}}
                    disabled={!isChecked}
                  />
                  <label className="form-check-label" style={{fontWeight: "600", fontSize: "14px"}} htmlFor="checkbox4">
                    Know Your Mentor - Widget
                  </label>
                  <ul
                      style={{
                        listStyleType: "disc",
                        margin: "0 0 0 20px",
                        paddingLeft: 10,
                        fontSize: "13px",
                        color: isChecked ? "inherit" : "rgba(0, 0, 0, 0.5)"
                      }}
                    >
                      <li>
                        Only the mentor's details will be displayed on user
                        portal
                      </li>
                      <li>
                        Will be automatically activated for Training Session and
                        Project access
                      </li>
                    </ul>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0">
              <div
                className="d-flex justify-content-between"
                style={{ width: "466px" }}
              >
                <button
                  type="button"
                  className="btn cancel-button"
                  onClick={handlePrevious}
                >
                  <span className="cancel-text">Back</span>
                </button>

                <div className="">
                  <button
                    type="button"
                    className="btn cancel-button fw-bold me-2"
                    data-bs-dismiss="modal"
                    onClick={handleClickClear}
                  >
                    <span className="cancel-text">Cancel</span>
                  </button>

                  <button
                    type="button"
                    className="btn mentor-save-button fw-bold"
                    // data-bs-dismiss={
                    //   !nameError &&
                    //   designation &&
                    //   !emailError &&
                    //   selectedTechIds.length !== 0
                    //     ? "modal"
                    //     : ""
                    // }
                    onClick={handleFormSubmit}
                  >
                    <span className="save-text">Add</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CustomMentorModal;
