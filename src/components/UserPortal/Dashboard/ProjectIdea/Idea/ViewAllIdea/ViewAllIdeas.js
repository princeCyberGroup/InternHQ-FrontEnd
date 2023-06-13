import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewAllIdea.css";
import Header from "../../../../../Header/Header";
import EmptyIdea from "../../../EmptyStates/EmptyProject/MyIdeaViewAll";
import DetailsLeft from "../../ViewDetails/DetailsLeft";
import ProjectDetail from "../../ViewDetails/ProjectDetail";
import { ReactComponent as ExpandMore } from "../../../../../../Assets/expand_more.svg";
import TechDropDown from "../../TechDropDown";
import axios from "axios";

const ViewAllIdeas = () => {
  const navigate = useNavigate();
  // const [first, ...rest] = projectDescript;
  const [projectIndex, setProjectIndex] = useState(0);
  const [projNameError, setProjNameError] = useState("");
  const [projDescriptionError, setProjDescriptionError] = useState("");
  const [projName, setProjName] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [tech, setTech] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState({});


  const location = useLocation();
  const details = location.state;
  //   console.log(details)
  const handelIndex = (index) => {
    setProjectIndex(index);
  };
  const handleClickClear = (event) => {
    event.preventDefault();
    setTextInput("");
    setProjName("");
    setProjDescription("");
    setDropDown(false);
  };
  const handleChangeProjNameError = (event) => {
    event.preventDefault();
    const name = event.target.value;
    setProjName(name);
    if (!name) {
      setProjNameError("Project Name is required");
    } else {
      setProjNameError("");
    }
  };
  const handleChangeProjDescriptionError = (event) => {
    event.preventDefault();
    const description = event.target.value;
    setProjDescription(description);
    if (!description) {
      setProjDescriptionError("Project Description is required");
    } else {
      setProjDescriptionError("");
    }
  };
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const isObjectEmpty = (object) => {
    if (object.member1?.length > 0) {
      return setMemberNames(object);
    } else {
      return setMemberNames("");
    }
  };
  const techDataComingFrmChild = (data) => {
    return setTech(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var storedObject = localStorage.getItem("userData");
    var parsedObject = JSON.parse(storedObject);
    var userId = parsedObject.userId;
    await axios
      .post("https://cg-interns-hq.azurewebsites.net/projectIdea", {
        projName,
        projDescription,
        userId,
        technologyNames: tech,
        memberNames: memberNames,
      })
      .then((res) => {
        console.log("print", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTextInput("");
    setProjName("");
    setProjDescription("");
    setDropDown(false);
  };

  useEffect(() => {
    const texts = textInput.split(",").map((text) => text.trim());
    var membersObj = {};
    texts.forEach((text, index) => {
      membersObj[`member${index + 1}`] = text;
    });

    // technologyNames.forEach((curElem, index) => {
    //   techNames[`tech${index + 1}`] = curElem;
    // });

    isObjectEmpty(membersObj);
  }, [textInput, tech]);

  return (
    // <div>working</div>
    <>
      <Header />
      <div className="container page-color">
        <div className="view-all-nav-bar pt-4">
          <p>Dashboard &gt; MyIdea</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="sub-text ps-0">My Idea</p>
          </div>
         
            <div
              className="add-new-project-wrapper pb-0 me-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              <p className="add-new-project me-2">
                Add New Idea
              </p>
            </div>
         
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 add-project-wrapper"
                    id="exampleModalLabel"
                  >
                    Add your Project Idea
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClickClear}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="project-name"
                        className="col-form-label title-text"
                      >
                        Project Name<span style={{ color: "red" }}>*</span>{" "}
                        {projNameError && (
                          <span style={{ color: "red", fontSize: "11px" }}>
                            ({projNameError})
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={projName}
                        id="project-name"
                        placeholder="Enter Project Name"
                        onChange={handleChangeProjNameError}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="project-description"
                        className="col-form-label title-text"
                      >
                        Project Description<span style={{ color: "red" }}>*</span>{" "}
                        {projDescriptionError && (
                          <span style={{ color: "red", fontSize: "11px" }}>
                            ({projDescriptionError})
                          </span>
                        )}
                      </label>
                      <textarea
                        className="form-control"
                        value={projDescription}
                        id="project-description"
                        placeholder="Write Here.."
                        onChange={handleChangeProjDescriptionError}
                        rows={3}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="technology-used"
                        className="col-form-label title-text"
                        required
                      >
                        Technology Used <span style={{ color: "red" }}>*</span>
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
                            {/* <div
                          class="form-check small"
                          onClick={(e)=>{handleOptionClick(e)}}
                          data-value="NodeJS"
                        >
                          <label
                            class="form-check-label"
                            for="nodeJs"
                          >
                            Node Js 
                          </label>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value="ytch"
                            id="nodeJs"
                          />
                        </div> */}
                          </ul>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="Members(Optional)"
                        className="col-form-label title-text"
                      >
                        Members(Optional)
                      </label>
                      <input
                        className="form-control"
                        id="project-description"
                        placeholder="Member Name"
                        value={textInput}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn cancel-button"
                    data-bs-dismiss="modal"
                    onClick={handleClickClear}
                  >
                    <span className="cancel-text"> Cancel </span>
                  </button>
                  <button
                    type="button"
                    className="btn save-button"
                    data-bs-dismiss="modal"
                    onClick={handleSubmit}
                  >
                    <span className="save-text"> Save </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {details?.length === 0 ? (
          <EmptyIdea />
        ) : (
          <div
            className="all-project-idea-wrapper entire-component ms-0"
            style={{ overFlowY: "scroll" }}
          >
            <div className="">
              <DetailsLeft data={details} projectDetails={handelIndex} />
            </div>
            <div className="project-detail">
              <ProjectDetail data={details} indexNumber={projectIndex} />
            </div>
          </div>
        )}
        {/* <div className="all-project-idea-wrapper entire-component ms-0" style={{ overFlowY: "scroll" }}>
                <div >
                    <ProjectNames data={details} projectDetails={handelIndex} />
                </div>
                <div className="project-detail" >
                    <ProjectDescription data={details} indexNumber={projectIndex} />
                </div>
            </div> */}
      </div>
    </>
  );
};

export default ViewAllIdeas;