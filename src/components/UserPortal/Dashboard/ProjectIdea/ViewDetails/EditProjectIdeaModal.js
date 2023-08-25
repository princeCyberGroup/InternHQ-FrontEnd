import { useEffect, useState } from "react";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../TechDropDown";
import axios from "axios";
import TechnologyDropDown from "../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";

const EditProjectIdeaModal = ({
  taskVersion,
  setTaskVersion,
  projectId,
  projectName,
  projectDescriptions,
  indexNumber,
  projectTechnology,
  memberName,
  textInput,
  setTextInput,
  projectVersion,
}) => {
  const [projName, setProjName] = useState(projectName);
  const [proVersion, setProVersion] = useState(false);

  const [description, setDescription] = useState(projectDescriptions);
  const [memberNames, setMemberNames] = useState(memberName);
  const [dropDown, setDropDown] = useState(false);
  const [projNameError, setProjNameError] = useState(false);
  const [desError, setDesError] = useState(false);
  const [tech, setTech] = useState({ projectTechnology });
  const [technologyNames, setTechnologyNames] = useState(projectTechnology);
  const [isProjectNameValid, setIsProjectNameValid] = useState(true);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] =
    useState(true);
  const [editProject, setEditProject] = useState({});
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeProjNameError = (event) => {
    event.preventDefault();
    const name = event.target.value;
    setProjName(name);
    setIsProjectNameValid(name.match(/^.{1,100}$/) ? true : false);
    if (!name) {
      setProjNameError(true);
    } else {
      setProjNameError(false);
    }
  };

  const handleChangeProjDescriptionError = (event) => {
    event.preventDefault();
    const description = event.target.value;
    setDescription(description);
    setIsProjectDescriptionValid(
      description.match(/^.{50,750}$/) ? true : false
    );
    if (!description) {
      setDesError(true);
    } else {
      setDesError(false);
    }
  };

  const truncate = (str, maxLength) => {
    if (str.length > maxLength) return str.slice(0, maxLength) + "...";
    else return str;
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
  const techDataComingFrmChild = (data) => {
    return setTech(data);
  };

  const handleSubmit = (e) => {
    if (projNameError || desError || technologyNames?.length === 0) {
      alert("Please fill in the required details");
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/v4/project-task", {
          projectIdeaId: projectId,
          name: projName,
          description,

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

    setMemberNames(editProject?.memberNames);
    setTechnologyNames(editProject?.technologyNames);
  }, [editProject]);

  useEffect(() => {
    setProjName(projectName);
    setDescription(projectDescriptions);
    setMemberNames(memberName);
    setTechnologyNames(projectTechnology);
    setProVersion(projectVersion);
    {
      console.log("names", memberName);
    }
  }, [indexNumber, proVersion]);

  const handleEditProject = (project) => {
    setProjectToEdit(project);
  };
  const handleEditCloseModal = () => {
    setProjectToEdit(null);
    setProjName(projectName);
    setDescription(projectDescriptions);
    setDropDown(false);
    setTechnologyNames(projectTechnology);
    setMemberNames(memberName);
    setProjNameError(false);
    setDesError(false);
    setIsProjectNameValid(true);
    setIsProjectDescriptionValid(true);

    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  return (
    <div
      className="modal fade"
      id="editProjectIdeaModal"
      tabIndex="-1"
      aria-labelledby="editProjectIdeaModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5 add-project-wrapper"
              id="editProjectIdeaModalLabel"
            >
              Edit your Project Idea
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleEditCloseModal}
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
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={projName}
                  id="project-name"
                  placeholder="Enter Project Name"
                  onChange={handleChangeProjNameError}
                />
                {!isProjectNameValid && projName && (
                  <span style={{ color: "red", fontSize: "11px" }}>
                    Please enter a name with only letters and spaces, between 1
                    and 100 characters.
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="project-description"
                  className="col-form-label title-text"
                >
                  Project Description<span style={{ color: "red" }}>*</span>{" "}
                  <span style={{ color: "grey" }}>(Minimum 50 characters)</span>
                </label>
                <textarea
                  className="form-control"
                  value={description}
                  id="project-description"
                  placeholder="Write Here.."
                  onChange={(e) => handleChangeProjDescriptionError(e)}
                  rows={3}
                ></textarea>
                {!isProjectDescriptionValid && description && (
                  <span style={{ color: "red", fontSize: "11px" }}>
                    Please enter a description with a length between 50 and 750
                    characters.
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
                        className="custom-input border-none"
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
                  htmlFor="Members(Optional)"
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
              onClick={handleEditCloseModal}
            >
              <span className="cancel-text"> Cancel </span>
            </button>
            <button
              type="button"
              class="btn btn-primary save-button"
              data-bs-target="#myIdeaModal"
              data-bs-dismiss={
                !projNameError && !desError && technologyNames?.length !== 0
                  ? "modal"
                  : ""
              }
              onClick={(e) => {
                handleSubmit(e);
                setIsModalOpen(true);
              }}
            >
              <span className="save-text"> Save </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProjectIdeaModal;
