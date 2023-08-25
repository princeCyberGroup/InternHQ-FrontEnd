import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ProjectDetail from "../../ViewDetails/ProjectDetail";
import Header from "../../../../../Header/Header";
import EmptyProjectState from "../../../EmptyStates/EmptyProject/Project";
import DetailsLeft from "../../ViewDetails/DetailsLeft";
import { UserContext } from "../../../../../../Context/Context";
import TechDropDown from "../../TechDropDown";
import EmptyProjectView from "../../../EmptyStates/EmptyProject/ProjectViewAll";
import { ReactComponent as ExpandMore } from "../../../../../../Assets/expand_more.svg";
import BreadCrumbs from "../../../../../BreadCrumbs/BreadCrumbs";
import { ReactComponent as VectorAdd } from "../../../../../../Assets/Vectoradd.svg";
import TechnologyDropDown from "../../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";

import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const ViewAllProjects = () => {
  const [nameError, setNameError] = useState(true);
  const [descError, setDescError] = useState(true);
  const [projLinkError, setProjLinkError] = useState(true);
  const [project, setProject] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [projName, setProjName] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [hostedLink, setHostedLink] = useState("");
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState([]);
  const [techNames, seTechNames] = useState({});
  const [projectIndex, setProjectIndex] = useState(0);
  const [mentorIndex, setMentorIndex] = useState(0);
  const [tech, setTech] = useState({});
  const [mentorAssignData, setMentorAssignData] = useState([]);
  const [isProjectNameValid, setIsProjectNameValid] = useState(false);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] =
    useState(false);
  const [isProjectLinkValid, setIsProjectLinkValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskVersion, setTaskVersion] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [technologyNames, setTechnologyNames] = useState([]);

  const navigate = useNavigate();

  const techDataComingFrmChild = (data) => {
    return setTech(data);
  };

  const handleProjectNameChange = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setProjName(name);
    setIsProjectNameValid(name.match(/^.{1,100}$/) ? true : false);
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const handleProjectDescriptionChange = (e) => {
    const description = e.target.value;
    setProjDescription(description);
    setIsProjectDescriptionValid(
      description.match(/^.{50,750}$/) ? true : false
    );
    if (!description) {
      setDescError(true);
    } else {
      setDescError(false);
    }
  };
  const handleProjectLinkChange = (e) => {
    const link = e.target.value;
    setProjectLink(link);
    setIsProjectLinkValid(link.match(/^https?:\/\//) ? true : false);
    if (!link) {
      setProjLinkError(true);
    } else {
      setProjLinkError(false);
    }
  };

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setTextInput(inputText);
    const memberNamesArray = inputText.split(",").map((name) => name.trim());
    const membersObj = {};
    memberNamesArray.forEach((name, index) => {
      membersObj[`member${index + 1}`] = name;
    });
    isObjectEmpty(membersObj);
  };

  const clear = () => {
    setTextInput("");
    setProjName("");
    setProjDescription("");
    setProjectLink("");
    setHostedLink("");
    setDropDown(false);
    setTech({});
    seTechNames({});
    setTechnologyNames([]);

    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const isObjectEmpty = (object) => {
    const memberNamesArray = Object.values(object).filter(
      (value) => value.trim() !== ""
    );
    setMemberNames(memberNamesArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const secretkeyUser = process.env.REACT_APP_USER_KEY;
    var parsedObject;
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      parsedObject = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    var userId = parsedObject.userId;
    if (
      nameError ||
      descError ||
      projLinkError ||
      technologyNames.length === 0
    ) {
      alert("Please fill in the required details");
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + "/user/dashboard/project", {
          name: projName,
          description: projDescription,
          userId,
          projectLink,
          hostedLink,
          technology: technologyNames,
          members: memberNames,
        })
        .then((res) => {
          setTaskVersion((prevVersion) => prevVersion + 1);
        })
        .catch((err) => {
          console.log(err);
        });
      setTextInput("");
      setProjName("");
      setProjDescription("");
      setProjectLink("");
      setHostedLink("");
      setTech({});
      seTechNames({});
      setTechnologyNames([]);

      const checkboxes = document.querySelectorAll(".tech-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  useEffect(() => {
    const texts = textInput.split(",").map((text) => text.trim());
    const membersObj = {};
    texts.forEach((text, index) => {
      membersObj[`member${index + 1}`] = text;
    });

    isObjectEmpty(membersObj);
  }, [textInput]);

  useEffect(() => {
    const secretkeyUser = process.env.REACT_APP_USER_KEY;
    var parsedObject;
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      parsedObject = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    var userId = parsedObject.userId;
    const projectDataFrmApi = axios.get(
      process.env.REACT_APP_API_URL + `/api/v3/getProject?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      }
    );

    const mentorTaskFrmApi = axios.get(
      process.env.REACT_APP_API_URL +
        `/api/v3/getAssignedNotification?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      }
    );
    Promise.all([projectDataFrmApi, mentorTaskFrmApi])
      .then((responses) => {
        const projectAndMentorData = responses[0]?.data.response.concat(
          responses[1]?.data.response
        );
        console.log("object", projectAndMentorData);
        setProject(projectAndMentorData);
      })
      .catch((error) => {
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
        console.error("Error fetching tasks:", error);
      });
  }, [taskVersion]);

  useEffect(() => {
    const texts = textInput.split(",").map((text) => text.trim());
    const membersObj = {};
    texts.forEach((text, index) => {
      membersObj[`member${index + 1}`] = text;
    });
    isObjectEmpty(membersObj);
  }, [textInput, tech]);

  const handelIndex = (index) => {
    console.log(index);
    setProjectIndex(index);
  };

  return (
    <>
      <div className="" style={{ marginBottom: "4rem" }}>
        <Header />
      </div>
      <div className="container page-color">
        <div className="view-all-nav-bar pt-4">
          <BreadCrumbs />
        </div>

        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="sub-text ps-0">Project</p>
          </div>

          <div className="mr-3">
            <button
              type="button"
              className="add-your-project-wrapper me-0"
              data-bs-toggle="modal"
              data-bs-target="#xampleModal"
            >
              <p className="me-2 add-your-project">
                <VectorAdd />
                <span className="text-for-the-modal">Add Project</span>
              </p>
            </button>
          </div>

          <div
            className="modal fade"
            id="xampleModal"
            tabindex="-1"
            aria-labelledby="projectExampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 add-project-wrapper"
                    id="projectExampleModalLabel"
                  >
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={clear}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label
                        for="project-name"
                        className="col-form-label title-text"
                      >
                        Project Name<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="project-name"
                        value={projName}
                        placeholder="Enter Project Name"
                        onChange={handleProjectNameChange}
                      />
                      {!isProjectNameValid && projName && (
                        <span style={{ color: "red", fontSize: "11px" }}>
                          Please enter a name with only letters and spaces,
                          between 1 and 100 characters.
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        for="project-description"
                        className="col-form-label title-text"
                      >
                        Project Description
                        <span style={{ color: "red" }}>*</span>{" "}
                        <span style={{ color: "grey" }}>
                          (Minimum 50 characters)
                        </span>
                      </label>
                      <textarea
                        className="form-control"
                        id="project-description"
                        value={projDescription}
                        placeholder="Write Here..."
                        onChange={handleProjectDescriptionChange}
                        rows={3}
                      />
                      {!isProjectDescriptionValid && projDescription && (
                        <span style={{ color: "red", fontSize: "11px" }}>
                          Please enter a description with a length between 50
                          and 750 characters.
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="technology-used"
                        className="col-form-label title-text"
                        required
                      >
                        Technology Used <span style={{ color: "red" }}>*</span>
                        <span style={{ color: "grey" }}>
                          (Select atleast 1 technology)
                        </span>
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
                            <TechnologyDropDown
                              techDataComingChild={techDataComingFrmChild}
                              selectedTechIds={selectedTechIds}
                              setSelectedTechIds={setSelectedTechIds}
                              setTechnologyNames={setTechnologyNames}
                              technologyNames={technologyNames}
                              searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                            />
                          </ul>
                        </div>
                      </div>
                      {!Object.values(tech).length && (
                        <span style={{ color: "grey", fontSize: "11px" }}>
                          Maximum 10 technologies
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        for="Project Link"
                        className="col-form-label title-text"
                      >
                        Project Link<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        id="project-link"
                        placeholder="Enter Project Link"
                        value={projectLink}
                        onChange={handleProjectLinkChange}
                      />
                      {!isProjectLinkValid && projectLink && (
                        <span style={{ color: "red", fontSize: "11px" }}>
                          Invalid project link. Please enter a valid URL
                          starting with http:// or https://.
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        for="Hosted Link(Optional)"
                        className="col-form-label title-text"
                      >
                        Hosted Link(Optional)
                      </label>
                      <input
                        className="form-control"
                        id="hosted-link"
                        placeholder="Enter Hosted Link"
                        value={hostedLink}
                        onChange={(event) => setHostedLink(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        for="Members(Optional)"
                        className="col-form-label title-text"
                      >
                        Members(Optional)
                        <span style={{ color: "grey" }}>
                          (Minimum 8 members)
                        </span>
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
                    onClick={clear}
                  >
                    <span className="cancel-text"> Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary save-button"
                    data-bs-target="#xampleModal"
                    data-bs-dismiss={
                      !nameError &&
                      !descError &&
                      !projLinkError &&
                      technologyNames.length !== 0
                        ? "modal"
                        : ""
                    }
                    onClick={(e) => {
                      handleSubmit(e);
                      setIsModalOpen(true);
                    }}
                  >
                    <span className="save-text"> Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {project && project?.length === 0 ? (
          <EmptyProjectView />
        ) : (
          <div
            className="all-project-idea-wrapper entire-component ms-0"
            style={{ overFlowY: "scroll" }}
          >
            <div>
              <DetailsLeft
                project={project}
                mentorApiData={mentorAssignData}
                projectDetails={handelIndex}
              />
            </div>
            <div className="project-detail">
              <ProjectDetail
                data={project}
                mentorApiData={mentorAssignData}
                indexNumber={projectIndex}
                mentorIndexNumber={mentorIndex}
                setTaskVersion={setTaskVersion}
                taskVersion={taskVersion}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAllProjects;
