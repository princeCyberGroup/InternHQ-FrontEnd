import { useEffect, useState } from "react";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../TechDropDown";
import axios from "axios";
import TechnologyDropDown from "../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";

const ProjectModalEdit = ({
  projectName,
  projectDescriptions,
  indexNumber,
  projectTechnology,
  projectLinks,
  hostedLinks,
  memberName,
}) => {
  const [projName, setProjName] = useState(projectName);
  const [description, setDescription] = useState(projectDescriptions);
  const [projectLink, setProjectLink] = useState(projectLinks);
  const [hostedLink, setHostedLink] = useState(hostedLinks);
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState([memberName]);
  const [techNames, seTechNames] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState(true);
  const [projNameError, setProjNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [projLinkError, setProjLinkError] = useState("");
  const [tech, setTech] = useState({ projectTechnology });
  const [technologyNames, setTechnologyNames] = useState([projectTechnology]);
  const [isProjectNameValid, setIsProjectNameValid] = useState(false);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] =
    useState(false);
  const [isProjectLinkValid, setIsProjectLinkValid] = useState(false);
  const [editProject, setEditProject] = useState({});
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectId, setProjectId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechIds, setSelectedTechIds] = useState([]);

  const handleProjectNameChange = (e) => {
    setProjName(e.target.value);
    if (e.target.value > 0) {
      setError(false);
    } else {
      setError(true);
    }
    // setIsProjectNameValid(name.match(/^.{1,100}$/) ? true : false);
  };
  const handleProjectDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeTechnology = (e) => {
    setTech(e.target.value);
  };

  const handleProjectLinkChange = (e) => {
    const link = e.target.value;
    setProjectLink(link);
    setIsProjectLinkValid(link.match(/^https?:\/\//) ? true : false);
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
  const handleInputChange = (e) => {
    setMemberNames(e.target.value);
  };
  const isObjectEmpty = (object) => {
    if (object.member1.length > 0) {
      setMemberNames(object);
      return;
    } else {
      return setMemberNames("");
    }
  };
  // const handleOnEditClose = () => {
  //     onEditClose();
  //   }
  const handleSubmit = (e) => {
    // var storedObject = localStorage.getItem("userData");
    // var parsedObject = JSON.parse(storedObject);
    // var projectId = parsedObject.projectId;
    if (error) {
      alert("Please fill in the required details");
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/v4/project-task", {
          projectId,
          projName,
          description,
          projectLink,
          hostedLink,
          technologyNames: technologyNames,
          memberNames: memberNames,
        })

        .then((res) => {
          console.log("print", res.data);
          handleEditCloseModal();
        })
        .catch((err) => {
          console.log(err);
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
    {
      console.log("names", memberName);
      console.log("tech",projectTechnology);
    }
  }, [indexNumber]);

  const handleEditProject = (project) => {
    setProjectToEdit(project);
  };
  const handleEditCloseModal = () => {
    setProjectToEdit(null);
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
                  onChange={handleProjectNameChange}
                />
                {/* {!isProjectNameValid && projName && (
                                    <span style={{ color: "red", fontSize: "11px" }}>
                                        Please enter a name with only letters and spaces, between 1 and 100 characters.
                                    </span>
                                )} */}
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
                {/* {!isProjectDescriptionValid && description && (
                                    <span style={{ color: "red", fontSize: "11px" }}>
                                        Please enter a description with a length between 50 and 750 characters.
                                    </span>
                                )} */}
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
                        // seTechNames={seTechNames}
                        // techNames={techNames}
                        // technologyNames={technologyNames}
                        // selectedTech={editProject?.technologyNames}
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
                {/* {!Object.values(tech).length && (
                                    <span style={{ color: "grey", fontSize: "11px" }}>
                                        Maximum 10 technologies
                                    </span>
                                )} */}
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
                {/* {!isProjectLinkValid && projectLink && (
                                    <span style={{ color: "red", fontSize: "11px" }}>
                                        Invalid project link. Please enter a valid URL starting with http:// or https://.
                                    </span>
                                )} */}
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
                  value={memberNames}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => handleEditCloseModal()}
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
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
