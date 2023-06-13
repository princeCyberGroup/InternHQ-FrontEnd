import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import  EmptyProjectView  from "../../EmptyStates/EmptyProject/ProjectViewAll";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";

const AddProject = ({ projectApiDataa }) => {
  const navigate = useNavigate();
  const [first, ...rest] = projectApiDataa;
  const [projName, setProjName] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [technologyNames, setTechnologyNames] = useState([]);
  const [projectLink, setProjectLink] = useState("");
  const [hostedLink, setHostedLink] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [counter, setCounter] = useState(1);
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState({});
  const [techNames, seTechNames] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState("");
  const [desError, setDesError] = useState("");
  const [projLinkError, setProjLinkError] = useState("");
  const [technologyError, setTechnologyError] = useState("");

  const handleProjectNameChange = (event) => {
    const name = event.target.value;
    setProjName(name);
    if (!name) {
      setError("Project name is required");
    } else {
      setError("");
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
  //     const link = event.target.value;
  //     setProjectLink(link);
  //     if (!link) {
  //         setProjLinkError('Project link is required');
  //     } else {
  //         setProjLinkError('');
  //     }
  // };
  const handleTechnologyChange = (event) => {
    const technology = event.target.value;
    setTechnologyNames(technology);
    if (!technology) {
      setTechnologyError("Technology is required");
    } else {
      setTechnologyError("");
    }
  };
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleOptionClick = (event) => {
    const { value } = event.currentTarget.dataset;
    const isChecked = event.currentTarget.querySelector("input").checked;

    if (isChecked) {
      var optionObject = `tech${counter}`;
      technologyNames.push(value);
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        optionObject,
      ]);
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter(
          (option) => Object.values(option)[0] !== value
        )
      );
      setTechnologyNames((prevTechnologyNames) =>
        prevTechnologyNames.filter((technology) => technology !== value)
      );
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = { projectApiDataa };
    navigate("/all-projects", { state: projectApiDataa });
  };
  const clear = () => {
    setTextInput("");
    setProjName("");
    setProjDescription("");
    setProjectLink("");
    setHostedLink("");
    setTechnologyNames({});
    setDropDown(false);
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
    axios
      .post("https://cg-interns-hq.azurewebsites.net/Project", {
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
  };

  useEffect(() => {
    const texts = textInput.split(",").map((text) => text.trim());
    const membersObj = {};
    texts.forEach((text, index) => {
      membersObj[`member${index + 1}`] = text;
    });

    technologyNames.forEach((curElem, index) => {
      techNames[`tech${index + 1}`] = curElem;
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
          <div class="d-flex justify-content-between">
            <div class="d-flex pt-2">
              <p class="text mb-0 ms-1 fw-bold">Project</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                handleClick(e);
              }}
              class="view-all fw-bold"
            >
              View All
            </button>
          </div>
        </div>
        {projectApiDataa.length === 0 ? (
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
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 add-project-wrapper"
                id="exampleModalLabel"
              >
                Add Project
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={clear}
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="project-name" class="col-form-label title-text">
                    Project Name<span style={{ color: "red" }}>*</span>{" "}
                    {error && (
                      <span style={{ color: "red", fontSize: "11px" }}>
                        ({error})
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="project-name"
                    value={projName}
                    placeholder="Enter Project Name"
                    onChange={handleProjectNameChange}
                  />
                </div>

                <div class="mb-3">
                  <label
                    for="project-description"
                    class="col-form-label title-text"
                  >
                    Project Description<span style={{ color: "red" }}>*</span>{" "}
                    {desError && (
                      <span style={{ color: "red", fontSize: "11px" }}>
                        ({desError})
                      </span>
                    )}
                  </label>
                  <textarea
                    class="form-control"
                    id="project-description"
                    value={projDescription}
                    placeholder="Write Here..."
                    onChange={handleProjectDescriptionChange}
                    rows={3}
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label
                    for="technology-used"
                    class="col-form-label title-text"
                  >
                    Technology Used
                  </label>
                </div>
                <div className="container border">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="button-group">
                        <button
                          type="button"
                          className="btn btn-default btn-sm dropdown-toggle drop-down-technology"
                          onClick={() => {
                            setDropDown(!dropDown);
                          }}
                        ></button>
                        <ul
                          style={{ display: dropDown ? "" : "none" }}
                          className="ul-styling"
                        >
                          <p
                            href="#"
                            className="text-decoration-none"
                            data-value="ReactJs"
                            tabIndex="-1"
                            onClick={handleOptionClick}
                          >
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">ReactJs</span>
                            </label>
                          </p>
                          <p
                            href="#"
                            className="small text-decoration-none"
                            data-value="TypeScript"
                            tabIndex="-1"
                            onClick={handleOptionClick}
                          >
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">TypeScript</span>
                            </label>
                          </p>
                          <p
                            href="#"
                            className="small text-decoration-none"
                            data-value=".Net"
                            tabIndex="-1"
                            onClick={handleOptionClick}
                          >
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">DotNet</span>
                            </label>
                          </p>
                          <p
                            href="#"
                            className="small text-decoration-none"
                            data-value="Angular"
                            tabIndex="-1"
                            onClick={handleOptionClick}
                          >
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">Angular</span>
                            </label>
                          </p>
                          <p
                            href="#"
                            className="small text-decoration-none"
                            data-value="Salesforce"
                            tabIndex="-1"
                            onClick={handleOptionClick}
                          >
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">Salesforce</span>
                            </label>
                          </p>
                          <p
                            href="#"
                            className="small text-decoration-none"
                            data-value="NodeJS"
                            tabIndex="-1"
                            onClick={handleOptionClick}
                          >
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">NodeJs</span>
                            </label>
                          </p>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Project Link" class="col-form-label title-text">
                    Project Link<span style={{ color: "red" }}>*</span>{" "}
                    {projLinkError && (
                      <span style={{ color: "red", fontSize: "11px" }}>
                        ({projLinkError})
                      </span>
                    )}
                  </label>
                  <input
                    class="form-control"
                    id="project-link"
                    value={projectLink}
                    onChange={handleProjectLinkChange}
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="Hosted Link(Optional)"
                    class="col-form-label title-text"
                  >
                    Hosted Link(Optional)
                  </label>
                  <input
                    class="form-control"
                    id="hosted-link"
                    value={hostedLink}
                    onChange={(event) => setHostedLink(event.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="Members(Optional)"
                    class="col-form-label title-text"
                  >
                    Members(Optional)
                  </label>
                  <input
                    class="form-control"
                    id="project-description"
                    placeholder="Member Name"
                    value={textInput}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1
                      class="modal-title fs-5 add-project-wrapper"
                      id="exampleModalLabel"
                    >
                      Add Project
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={clear}
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label
                          for="project-name"
                          class="col-form-label title-text"
                        >
                          Project Name<span style={{ color: "red" }}>*</span>{" "}
                          {error && (
                            <span style={{ color: "red", fontSize: "11px" }}>
                              ({error})
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="project-name"
                          value={projName}
                          placeholder="Enter Project Name"
                          onChange={handleProjectNameChange}
                        />
                      </div>

                      <div class="mb-3">
                        <label
                          for="project-description"
                          class="col-form-label title-text"
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
                          class="form-control"
                          id="project-description"
                          value={projDescription}
                          placeholder="Write Here..."
                          onChange={handleProjectDescriptionChange}
                          rows={3}
                        ></textarea>
                      </div>

                      <div class="mb-3">
                        <label
                          for="technology-used"
                          class="col-form-label title-text"
                        >
                          Technology Used<span style={{ color: "red" }}>*</span>
                          {technologyError && (
                            <span style={{ color: "red", fontSize: "11px" }}>
                              ({technologyError})
                            </span>
                          )}
                        </label>
                      </div>
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
                              disabled
                              value={technologyNames.join(",")}
                              placeholder="Select Technology"
                              onChange={handleTechnologyChange}
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
                            <p
                              href="#"
                              className="text-decoration-none"
                              data-value="ReactJs"
                              tabIndex="-1"
                              onClick={handleOptionClick}
                            >
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  className="checkbox-input"
                                />
                                <span className="checkbox-text">ReactJs</span>
                              </label>
                            </p>
                            <p
                              href="#"
                              className="small text-decoration-none"
                              data-value="TypeScript"
                              tabIndex="-1"
                              onClick={handleOptionClick}
                            >
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  className="checkbox-input"
                                />
                                <span className="checkbox-text">
                                  TypeScript
                                </span>
                              </label>
                            </p>
                            <p
                              href="#"
                              className="small text-decoration-none"
                              data-value=".Net"
                              tabIndex="-1"
                              onClick={handleOptionClick}
                            >
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  className="checkbox-input"
                                />
                                <span className="checkbox-text">DotNet</span>
                              </label>
                            </p>
                            <p
                              href="#"
                              className="small text-decoration-none"
                              data-value="Angular"
                              tabIndex="-1"
                              onClick={handleOptionClick}
                            >
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  className="checkbox-input"
                                />
                                <span className="checkbox-text">Angular</span>
                              </label>
                            </p>
                            <p
                              href="#"
                              className="small text-decoration-none"
                              data-value="Salesforce"
                              tabIndex="-1"
                              onClick={handleOptionClick}
                            >
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  className="checkbox-input"
                                />
                                <span className="checkbox-text">
                                  Salesforce
                                </span>
                              </label>
                            </p>
                            <p
                              href="#"
                              className="small text-decoration-none"
                              data-value="NodeJS"
                              tabIndex="-1"
                              onClick={handleOptionClick}
                            >
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  className="checkbox-input"
                                />
                                <span className="checkbox-text">NodeJs</span>
                              </label>
                            </p>
                          </ul>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label
                          for="Project Link"
                          class="col-form-label title-text"
                        >
                          Project Link<span style={{ color: "red" }}>*</span>{" "}
                          {projLinkError && (
                            <span style={{ color: "red", fontSize: "11px" }}>
                              ({projLinkError})
                            </span>
                          )}
                        </label>
                        <input
                          class="form-control"
                          id="project-link"
                          placeholder="Enter Project Link"
                          value={projectLink}
                          onChange={handleProjectLinkChange}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="Hosted Link(Optional)"
                          class="col-form-label title-text"
                        >
                          Hosted Link(Optional)
                        </label>
                        <input
                          class="form-control"
                          id="hosted-link"
                          placeholder="Enter Hosted Link"
                          value={hostedLink}
                          onChange={(event) =>
                            setHostedLink(event.target.value)
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="Members(Optional)"
                          class="col-form-label title-text"
                        >
                          Members(Optional)
                        </label>
                        <input
                          class="form-control"
                          id="project-description"
                          placeholder="Member Name"
                          value={textInput}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer">
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
                      data-bs-dismiss="modal"
                      onClick={handleSubmit}
                    >
                      <span className="save-text"> Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;