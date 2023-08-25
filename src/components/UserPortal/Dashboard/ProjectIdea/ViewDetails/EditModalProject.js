import { useEffect, useState } from "react";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../TechDropDown";
import axios from "axios";
import TechnologyDropDown from "../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";

const ProjectModalEdit = ({
  taskVersion,
  setTaskVersion,
  idProp,
  idValue,
  projectName,
  projectDescriptions,
  indexNumber,
  projectTechnology,
  projectLinks,
  hostedLinks,
  memberName,
  textInput,
  setTextInput,
  projectVersion,
}) => {
  const [projName, setProjName] = useState(projectName);
  const [proVersion, setProVersion] = useState(false);
  const [description, setDescription] = useState(projectDescriptions);
  const [projectLink, setProjectLink] = useState(projectLinks);
  const [hostedLink, setHostedLink] = useState(hostedLinks);
  const [memberNames, setMemberNames] = useState(memberName);
  const [dropDown, setDropDown] = useState(false);
  const [projNameError, setProjNameError] = useState(false);
  const [desError, setDesError] = useState(false);
  const [projLinkError, setProjLinkError] = useState(false);
  const [tech, setTech] = useState({ projectTechnology });
  const [technologyNames, setTechnologyNames] = useState(projectTechnology);
  const [isProjectNameValid, setIsProjectNameValid] = useState(true);
  const [isProjectLinkValid, setIsProjectLinkValid] = useState(false);
  const [editProject, setEditProject] = useState({});
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechIds, setSelectedTechIds] = useState([]);

  const handleProjectNameChange = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setProjName(name);
    if (!name) {
      setProjNameError(true);
    } else {
      setProjNameError(false);
    }
    setIsProjectNameValid(e.target.value.match(/^.{1,100}$/) ? true : false);
  };
  const handleProjectDescriptionChange = (e) => {
    const desc = e.target.value;
    setDescription(desc);
    if (!desc) {
      setDesError(true);
    } else {
      setDesError(false);
    }
  };
  const handleChangeTechnology = (e) => {
    setTech(e.target.value);
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
  const techDataComingFrmChild = (data) => {
    return setTech(data);
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

  const isObjectEmpty = (object) => {
    const memberNamesArray = Object.values(object).filter(
      (value) => value.trim() !== ""
    );
    setMemberNames(memberNamesArray);
  };

  const handleSubmit = (e) => {
    if (
      projNameError ||
      desError ||
      projLinkError ||
      technologyNames?.length === 0
    ) {
      alert("Please fill in the required details");
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/v4/project-task", {
          [idProp === "projectId" ? "projectId" : "taskId"]: idValue,
          name: projName,
          description,
          projectLink,
          hostedLink,
          technology: technologyNames,
          members: memberNames,
        })

        .then((res) => {
          console.log("print", res.data);
          setTaskVersion((prevVersion) => prevVersion + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const texts = textInput?.split(",").map((text) => text.trim());
    const membersObj = {};
    texts?.forEach((text, index) => {
      membersObj[`member${index + 1}`] = text;
    });

    isObjectEmpty(membersObj);
  }, [textInput]);

  useEffect(() => {
    setEditProject(projectToEdit);
  }, [projectToEdit]);

  useEffect(() => {
    setProjName(editProject?.projName);
    setDescription(editProject?.description);
    setProjectLink(editProject?.projectLink);
    setHostedLink(editProject?.hostedLink);
    setMemberNames(editProject?.memberNames);
    setTechnologyNames(editProject?.technologyNames);
  }, [editProject]);

  useEffect(() => {
    setProjName(projectName);
    setDescription(projectDescriptions);
    setProjectLink(projectLinks);
    setHostedLink(hostedLinks);
    setMemberNames(memberName);
    setTechnologyNames(projectTechnology);
    setProVersion(projectVersion);
    // }
  }, [indexNumber, proVersion]);

  const handleEditCloseModal = () => {
    setProjectToEdit(null);
    setProjName(projectName);
    setDescription(projectDescriptions);
    setProjectLink(projectLinks);
    setHostedLink(hostedLinks);
    setMemberNames(memberName);
    setTechnologyNames(projectTechnology);
    setProjNameError(false);
    setDesError(false);
    setProjLinkError(false);
    setIsProjectNameValid(true);
    setIsProjectLinkValid(true);

    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  return (
    <div
      class="modal fade"
      id="editProjectModal"
      tabindex="-1"
      aria-labelledby="editProjectModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editProjectModalLabel">
              Edit your project
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              onClick={() => handleEditCloseModal()}
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label
                  htmfor="edit-project-name"
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
                  onChange={(e) => {
                    handleProjectNameChange(e);
                  }}
                />
                {!isProjectNameValid && projName && (
                  <span style={{ color: "red", fontSize: "11px" }}>
                    Please enter a name with only letters and spaces, between 1
                    and 100 characters.
                  </span>
                )}
              </div>
              <div class="mb-3">
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
                  value={description}
                  placeholder="Write Here..."
                  onChange={handleProjectDescriptionChange}
                  rows={3}
                />
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
                        value={technologyNames}
                        onChange={handleChangeTechnology}
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
              </div>
              <div className="mb-3">
                <label for="Project Link" className="col-form-label title-text">
                  Project Link<span style={{ color: "red" }}>*</span>{" "}
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
              {idProp === "projectId" ? (
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
              ) : (
                ""
              )}
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn cancel-button"
              data-bs-dismiss="modal"
              onClick={() => handleEditCloseModal()}
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary save-button"
              data-bs-target="#editProjectModal"
              data-bs-dismiss={
                !projNameError &&
                !desError &&
                !projLinkError &&
                technologyNames?.length !== 0
                  ? "modal"
                  : ""
              }
              onClick={() => handleSubmit()}
            >
              {" "}
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectModalEdit;
