import "./AddMentorModal.css";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../../../Assets/VectorUpload.svg";
import { ReactComponent as AlertImage } from "../../../../Assets/Vectoralert.svg";
import { ReactComponent as CameraIcon } from "../../../../Assets/Cameracamera.svg";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import TechDropDown from "../../../UserPortal/Dashboard/ProjectIdea/TechDropDown";
import { storage } from "../config/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AddMentorModal = ({ isOpen, onClose, onAddMentor }) => {
  // console.log(props);
  const navigate = useNavigate();

  const [mentorName, setMentorName] = useState("");
  const [skills, setSkills] = useState([]);
  const [emailId, setEmailId] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [designation, setDesignation] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("true");
  const [isCleared, setIsCleared] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [tech, setTech] = useState({});

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

  const handleClickClear = () => {
    setMentorName("");
    setEmailId("");
    setDesignation("");
    setImageUrl("");
    setSkills([]);
    setIsCleared(true);
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
        // console.log("URL:", url);

        setImageUrl(url);
      });
    });
  };

  // const handleSkillsChange = (event) => {
  //   const selectedSkills = event.target.value
  //     .split(",")
  //     .map((skill) => skill.trim());

  //   setSkills(selectedSkills);
  // };
  
  const handleSkillsChange = (event) => {
    const selectedSkills = Array.from(event.target.selectedOptions, (option) => option.value.trim());
    setSkills(selectedSkills);
  };
  
  const techDataComingFrmChild = (data) => {
    return setTech(data);
    
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
  
    if (mentorName.length === 0 && emailId.length < 2) {
      alert("Please fill out all the fields");
      setError(true);
      return;
    }
  
    try {
      await axios.post("https://cg-interns-hq.azurewebsites.net/postMentorDetails", {
        mentorName,
        emailId,
        imageUrl,
        designation,
        skills:Object.values(tech)
      });
      onAddMentor({ mentorName, emailId, imageUrl, designation, skills });
  
      setSkills([]);
      setMentorName("");
      setEmailId("");
      setImageUrl("");
      setDesignation("");
      setError(false);
      setTech({});
      onClose();
  
      if (!error) {
        const closeButton = document.querySelector("#addMentorModal .btn-close");
        closeButton.click();
      }
    } catch (err) {
      // console.log(err);
    }
  };
  
  // const handleFormSubmit = async (e) => {
  //   if (mentorName.length == 0 && emailId.length < 2) {
  //     alert("Please fill out all the fields");

  //     setError(true);
  //   } else {
  //     await axios
  //       .post("https://cg-interns-hq.azurewebsites.net/postMentorDetails", {
  //         mentorName,
  //         emailId,
  //         imageUrl,
  //         designation,
  //         skills,
  //       })
  //       .then((res) => {
  //         console.log("print", res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     setSkills([]);
  //     setMentorName("");
  //     setEmailId("");
  //     setImageUrl("");
  //     setDesignation("");
  //     e.preventDefault();
  //     setError(false);

      
  //   }
  // };

  const handleSkillTest = (e) => {
    e.preventDefault();

    navigate("/manage-skill-test");
  };

  const handleMentorName = (e) => {
    setMentorName(e.target.value);
  };

  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };

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
      {/* <button
        type="button"
        class="btn add-mentor-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <AddSign /> <span className="add-mentor-text">Add Mentor</span>
      </button> */}


      <div
        // class="modal fade"
        // id="addMentorModal"
        // tabindex="-1"
        // aria-labelledby="mentorAddmodal"
        // aria-hidden="true"

        class="modal fade"
        id="addMentorModal"
        tabindex="-1"
        aria-labelledby="skillModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false" 

      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title modalheading-text" id="mentorAddmodal">
                Add Mentor
              </h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClickClear}
              ></button>
            </div>

            <div className="align-items-center">
              <div className="upload-image-box">
                <div className="d-flex align-items-center mt-4">
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
                    <label for="fileUpload" class="file-upload btn btn-block">
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
                  class="alert alert-info mb-0 image-alert box-for-alert-message"
                  role="alert"
                >
                  <AlertImage />{" "}
                  <span className="text-for-alert">
                    Please upload recent image ensuring that the face is clearly
                    visible. Allowed format is JPEG,PNG.
                  </span>
                </div>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
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

                  <div className="mb-3">
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
                    <label for="email-id" className="col-form-label d-flex">
                      Email Id<span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="email-id"
                      placeholder="Enter your Email Id"
                      onChange={(e) => handleEmailId(e)}
                      value={emailId}
                    />

                    {!isValidEmail && !isCleared && (
                      <p style={{ color: "red" }}>
                        Email ID must end with "@cginfinity.com"
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label for="skills" className="col-form-label d-flex">
                      Technology Tags<span style={{ color: "red" }}>*</span>
                    </label>

                    <div className="container border p-0">
                        <div className="input-with-button">
                          <button
                            type="button"
                            className="button-for-dropdown"
                            onClick={() => {
                              setDropDown(!dropDown);
                            }}
                          >
                            <input
                              type="text"
                              className="custom-input"
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
                            style={{ display: dropDown ? "" : "none" }}
                            className="ul-styling"
                          >
                            <TechDropDown
                              techDataComingChild={techDataComingFrmChild}
                            />
                          </ul>
                        </div>
                        {/* </div> */}
                      </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="modal-footer border-top-0">
              <button
                type="button"
                class="btn cancel-button fw-bold"
                data-bs-dismiss="modal"
                onClick={handleClickClear}
              >
                <span className="cancel-text">Cancel</span>
              </button>

              <button
                type="button"
                class="btn save-button fw-bold"
                // {...(!error && { "data-bs-dismiss": "modal" })}
                data-bs-dismiss={error?"":"modal"}
                onClick={handleFormSubmit}
              >
                <span className="save-text">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
