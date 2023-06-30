import axios from "axios";
import React, { useEffect, useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import EmptyProjectView from "../../EmptyStates/EmptyProject/ProjectViewAll";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../TechDropDown";
import { UserContext } from "../../../../../Context/Context";

const AddProject = () => {
  const {project} =useContext(UserContext);
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

  const handleProjectNameChange = (event) => {
    const name = event.target.value;
    setProjName(name);
    if (!name) {
      setProjNameError("Project name is required");
    } else {
      setProjNameError("");
    }
  };
  const handleProjectDescriptionChange = (event) => {
    const description = event.target.value;
    setProjDescription(description);
    if (!description) {
      setDesError("Project description is required");
    } else {
      setDesError("");
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
  };
  const handleProjectLinkChange = (event) => {
    const link = event.target.value;
    setProjectLink(link);
    if (!link) {
      setProjLinkError("Project link is required");
    } else {
      setProjLinkError("");
    }
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
    var storedObject = localStorage.getItem("userData");
    var parsedObject = JSON.parse(storedObject);
    var userId = parsedObject.userId;
    if (projName.length === 0 && projDescription.length < 2) {
      alert("Please fill in the required details");
      setError(true);
    } else {
      axios
        .post(process.env.REACT_APP_API_URL+"/api/v2/Project", {
          projName,
          projDescription,
          userId,
          projectLink,
          hostedLink,
          technologyNames: techNames,
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
      setError(false);
      setTech({});
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
        {project.length === 0 ? (
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
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          <p className="project-p">
            <span className="fw-bold">+</span> <b>Add Project</b>
          </p>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
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
                  <label for="project-name" className="col-form-label title-text">
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
                    id="project-name"
                    value={projName}
                    placeholder="Enter Project Name"
                    onChange={handleProjectNameChange}
                  />
                </div>

                <div className="mb-3">
                  <label
                    for="project-description"
                    className="col-form-label title-text"
                  >
                    Project Description
                    <span style={{ color: "red" }}>*</span>{" "}
                    {desError && (
                      <span style={{ color: "red", fontSize: "11px" }}>
                        ({desError})
                      </span>
                    )}
                  </label>
                  <textarea
                    className="form-control"
                    id="project-description"
                    value={projDescription}
                    placeholder="Write Here..."
                    onChange={handleProjectDescriptionChange}
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
                          </ul>
                        </div>
                      </div>
                    </div>

                <div className="mb-3">
                  <label for="Project Link" className="col-form-label title-text">
                    Project Link<span style={{ color: "red" }}>*</span>{" "}
                    {projLinkError && (
                      <span style={{ color: "red", fontSize: "11px" }}>
                        ({projLinkError})
                      </span>
                    )}
                  </label>
                  <input
                    className="form-control"
                    id="project-link"
                    placeholder="Enter Project Link"
                    value={projectLink}
                    onChange={handleProjectLinkChange}
                  />
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
                className="btn save-button"
                data-bs-dismiss={error ? "" : "modal"}
                onClick={(e) => handleSubmit(e)}
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
