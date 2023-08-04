import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import EmptyProjectView from "../../EmptyStates/EmptyProject/ProjectViewAll";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";
import { UserContext } from "../../../../../Context/Context";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CryptoJS from "crypto-js";

const AddProject = () => {
  const { project } = useContext(UserContext);
  const navigate = useNavigate();
  const [first, ...rest] = project;
  const [projName, setProjName] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [hostedLink, setHostedLink] = useState("");
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState({});
  const [techNames, seTechNames] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState(true);
  const [projNameError, setProjNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [projLinkError, setProjLinkError] = useState("");
  const [tech, setTech] = useState({});
  const [technologyNames, setTechnologyNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectNameValid, setIsProjectNameValid] = useState(false);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] = useState(false);
  const [isProjectLinkValid, setIsProjectLinkValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechIds, setSelectedTechIds] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleProjectNameChange = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setProjName(name);
    setIsProjectNameValid(name.match(/^.{1,100}$/) ? true : false);
    if (!name) {
      setError(true);
      setProjNameError("Project Name is required");
    } else {
      setError(false);
      setProjNameError("");
    }
  };
  const handleProjectDescriptionChange = (e) => {
    e.preventDefault();
    const description = e.target.value;
    setProjDescription(description);
    setIsProjectDescriptionValid(description.match(/^.{50,750}$/) ? true : false);
    if (!description) {
      setError(true);
      setDesError("Project Description is required");
    } else {
      setDesError("");
      setError(false);
    }
  };

  const handleProjectLinkChange = (e) => {
    const link = e.target.value;
    setProjectLink(link);
    setIsProjectLinkValid(link.match(/^https?:\/\//) ? true : false)
    if (!link) {
      setError(true);
      setProjLinkError("Project link is required");
    } else {
      setProjLinkError("");
      setError(false);
    }
  };

  const techDataComingFrmChild = (data) => {
    return setTech(data);
  };
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/all-projects");
  };
  const clear = () => {
    setTextInput("");
    setProjName("");
    setProjDescription("");
    setProjectLink("");
    setHostedLink("");
    setDropDown(false);
    setProjNameError("");
    setDesError("");
    setProjLinkError("");
    setTech({});
    seTechNames({});
    setTechnologyNames([]);

    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };


  const isObjectEmpty = (object) => {
    if (object.member1.length > 0) {
      setMemberNames(object);
      return;
    } else {
      return setMemberNames("");
    }
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
    let techObj = {};
    technologyNames.forEach((val,ind) =>{
      techObj[`tech${ind + 1}`] = val;
    })
    {console.log("name",techObj)}
    var userId = parsedObject.userId;
    if (error) {
      alert("Please fill in the required details");
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/v3/Project", {
          projName,
          projDescription,
          userId,
          projectLink,
          hostedLink,
          technologyNames: techObj,
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
      setProjectLink("");
      setHostedLink("");

      setTech({});

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

  return (
    <>
      <div className="card-body pb-0">
        <div className="project-card-text-row">
          <p className="project-card-text">
            A star will be rewarded to you as a token of appreciation for your
            hardwork and dedication upon the successful completion of the
            project.
          </p>
        </div>
        <div className="project-idea">
          <div className="d-flex justify-content-between">
            <div className="d-flex pt-2">
              <p className="text mb-0 ms-1 fw-bold">Project</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                handleClick(e);
              }}
              className="view-all fw-bold"
            >
              View All
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="project-recipe-row pb-3">
            <div className="recipe-text project-recipe-name">
              <h5 className="fw-bold">
                <Skeleton width={252} />
              </h5>
              <div className="project-link-1">
                <p className="project-link-name">
                  <Skeleton
                    width={190}
                    height={10}
                    highlightColor="#D3E1FA"
                    borderRadius={10}
                  />
                </p>
              </div>

              <div className="technology-used fw-bold pt-0">
                <Skeleton width={112} height={16} />
              </div>
              <div className="technology-badges">
                <div className="pe-2">
                  <Skeleton width={57} height={24} highlightColor="#D3E1FA" />
                </div>
                <div className="pe-2">
                  <Skeleton width={47} height={24} highlightColor="#D3E1FA" />
                </div>
                <div>
                  <Skeleton width={84} height={24} highlightColor="#D3E1FA" />
                </div>
              </div>
            </div>
          </div>
        ) : project.length === 0 ? (
          <EmptyProjectView />
        ) : (
          <div className="project-recipe-row pb-3">
            <div className="recipe-text project-recipe-name">
              <h5 className="fw-bold">{first.projectNames}</h5>
              <div className="project-link-1">
                <p className="project-link-name">
                  <Link to={first.projectLink} target="_blank">
                    {first.projectLink}
                  </Link>
                </p>
              </div>

              <div className="technology-used fw-bold pt-0">
                Technology Used:
              </div>
              <div className="technology-badges">
                {first.technology.map((currElem, index) => {
                  if (currElem != null) {
                    return <div className="technology-badge-1">{currElem}</div>;
                  }
                })}
              </div>
            </div>
          </div>
        )}

        <div
          className="add-project"
          data-bs-toggle="modal"
          data-bs-target="#projectExampleModal"
          data-bs-whatever="@mdo"
        >
          <p className="project-p">
            <span className="fw-bold">+</span> <b>Add Project</b>
          </p>
        </div>
      </div>
      <div
        className="modal fade"
        id="projectExampleModal"
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
                      Please enter a name with only letters and spaces, between 1 and 100 characters.
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
                    <span style={{ color: "grey" }}>(Minimum 50 characters)</span>
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
                      Please enter a description with a length between 50 and 750 characters.
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
                    <span style={{ color: "grey" }}>(Select atleast 1 technology)</span>
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
                      Invalid project link. Please enter a valid URL starting with http:// or https://.
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
                    <span style={{ color: "grey" }}>(Minimum 8 members)</span>
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
                disabled={!isProjectNameValid || !isProjectDescriptionValid || !isProjectLinkValid || isModalOpen}
                data-bs-target="#projectExampleModal"
                data-bs-dismiss={!error ? 'modal' : ''}
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
    </>
  );
};

export default AddProject;
