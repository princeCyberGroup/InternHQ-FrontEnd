import { ReactComponent as CloudImage } from "../../../Assets/Cloud.svg";
import { ReactComponent as CloseBtn } from "../../../Assets/Close-admin.svg";
import { ReactComponent as CSVIcon } from "../../../Assets/CSVIcon.svg";
import React, { useState, useRef, useEffect } from "react";
import "./Modals.css";
import axios from "axios";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

//This needs to be fix
export const AddNewSkillTest = () => {
  const [technology, setTechnology] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState("");

  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState("");
  const [setError] = useState(true);
  const [setBeginnerChecked] = useState(false);
  const [setIntermediateChecked] = useState(false);
  const [setAdvancedChecked] = useState(false);

  const [level, setLevel] = useState("");
  const handleOptionChange = (event) => {
    const selectedLevel = event.target.value;
    setLevel(selectedLevel);
  };
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [apitechnology, setApiTechnology] = useState([]);
  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(
        "https://cg-interns-hq.azurewebsites.net/getAllTechnology"
      );
      setApiTechnology(response?.data?.response);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (error.response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (error.response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (error.response.status === 404) {
        navigate("/error/statusCode=404");
      }
      console.error("Error fetching topics:", error);
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
    const file = selectedFile.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      setFormData(contents);
    };
    reader.onerror = (e) => {
      console.log("error in reader", e);
    };
    reader.readAsText(file);

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
    // setProgress(0);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeTechnology = (e) => {
    setTechnology(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleClickClear = (e) => {
    e.preventDefault();
    setTechnology("");
    setName("");
    setLevel("");
    setQuestion("");
    setDuration("");
    setFile(null);
    handleRemoveFile();
    // document.getElementById("flexRadioDefault1").checked = false;
    // setBeginnerChecked(false);
    // setIntermediateChecked(false);
    // setAdvancedChecked(false);
  };
  const handleSubmit = async (e) => {
    // debugger;
    e.preventDefault();
    if (technology.length === 0 || name.length < 2) {
      alert("Please fill out the necessary details");
      setError(true);
      return;
    }
    // const formData = new FormData();
    // formData.append('technology', technology);
    // formData.append('level', level);
    // formData.append('name', name);
    // formData.append("file", file);
    // formData.append('question', question);
    // formData.append('duration', duration);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL +
          // `/api/v3/questions?technology=${technology}&level=${level}&examName=${name}&noOfQuestion=${question}&examDuration=${duration}`,
          `/testQuestions?technology=${technology}&level=${level}&examName=${name}&noOfQuestion=${question}&examDuration=${duration}`,
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "text/csv",
          },
        }
      );
      // console.log(response);
      // Reset form inputs
      setTechnology("");
      setName("");
      setLevel("");
      setQuestion("");
      setDuration("");
      document.getElementById("flexRadioDefault1").checked = false;
      setBeginnerChecked(false);
      setIntermediateChecked(false);
      setAdvancedChecked(false);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id="newSkillModal"
        tabindex="-1"
        aria-labelledby="newSkillModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title modalheading-text"
                id="newSkillModalLabel"
              >
                Add New Skill Test
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ fontSize: "1rem" }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="technology"
                    className="col-form-label form-title-names"
                  >
                    Technology<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-select "
                    //   key={resetSelect ? "topicReset" : "topicName"}
                    //   disabled={disabled}
                    onChange={(e) => handleChangeTechnology(e)}
                    value={technology}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Select Technology
                    </option>
                    {apitechnology.map((tech) => (
                      <option
                        className="dtt-opns"
                        key={tech.techId}
                        value={tech.techName}
                      >
                        {tech.techName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="col-form-label form-title-names"
                  >
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Add Name"
                    onChange={(e) => handleChangeName(e)}
                    value={name}
                  />
                </div>
                <span className="d-flex mb-2 form-title-names">
                  Level<span style={{ color: "red" }}>*</span>
                </span>
                <div className="d-flex">
                  <div className="form-check">
                    <label
                      style={{
                        marginLeft: "0.313rem",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      <input
                        className="form-check-input skill-test-color-of-radio"
                        type="radio"
                        name="options"
                        value="Beginner"
                        checked={level === "Beginner"}
                        onChange={handleOptionChange}
                      />
                      Beginner
                    </label>
                    <label
                      style={{
                        marginLeft: "3.125rem",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      <input
                        className="form-check-input skill-test-color-of-radio"
                        type="radio"
                        name="options"
                        value="Intermediate"
                        checked={level === "Intermediate"}
                        onChange={handleOptionChange}
                      />
                      Intermediate
                    </label>
                    <label
                      style={{
                        marginLeft: "3.125rem",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      <input
                        className="form-check-input skill-test-color-of-radio"
                        type="radio"
                        name="options"
                        value="Advance"
                        checked={level === "Advance"}
                        onChange={handleOptionChange}
                      />
                      Advance
                    </label>
                  </div>
                </div>
                <span className="d-flex mt-4 mb-3 form-title-names">
                  Upload CSV<span style={{ color: "red" }}>*</span>
                </span>
                <div className="upload-csv-text align-items-center justify-content-center">
                  <div className=" mt-4">
                    <CloudImage />
                  </div>
                  <div className="mb-3">
                    <span className="drag-drop-text d-flex align-items-center justify-content-center fw-bold">
                      Drag and drop here or click to select a file from your
                      computer
                    </span>
                  </div>
                  <div className="mb-4">
                    <div>
                      <div onDrop={handleDrop} onDragOver={handleDragOver}>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleFileChange(e.target.files[0])}
                          accept=".csv"
                          style={{ display: "none" }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            handleBrowseClick();
                          }}
                          className="add-new-skill-test-btn"
                          style={{
                            width: "246.19px",
                            height: "45px",
                            fontSize: "16px",
                          }}
                        >
                          Browse from your computer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {file && (
                  <div>
                    <div className="d-flex align-items-center ps-1 ast-search-wrapper">
                      <div className="progress-indicator-status">
                        {" "}
                        {file && (
                          <div
                            style={{
                              marginLeft: "0.625rem",
                              marginTop: "0.225rem",
                              position: "relative",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                            className="d-flex align-items-center"
                          >
                            <CSVIcon />
                            <div style={{ marginLeft: "0.5rem" }}>
                              {file.name}
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleRemoveFile();
                        }}
                      >
                        <CloseBtn />{" "}
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between">
                  <div>
                    <label
                      htmlFor="questions"
                      className="col-form-label form-title-names"
                    >
                      Questions<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-select select-drop-down-style"
                      onChange={(e) => handleChangeQuestion(e)}
                      value={question}
                    >
                      <option value="" hidden>
                        Select Questions
                      </option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="col-form-label form-title-names"
                    >
                      Duration<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-select select-drop-down-style"
                      onChange={(e) => handleChangeDuration(e)}
                      value={duration}
                    >
                      <option value="" hidden>
                        Select Duration
                      </option>
                      <option value="10">10 mins</option>
                      <option value="15">15 mins</option>
                      <option value="20">20 mins</option>
                      <option value="30">30 mins</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn cancel-button fw-bold"
                data-bs-dismiss="modal"
                onClick={(e) => handleClickClear(e)}
              >
                <span className="cancel-text">Cancel</span>
              </button>
              <button
                type="button"
                className="btn save-button"
                data-bs-dismiss={"modal" ? false : true}
              >
                <span
                  className="save-text"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Save
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
