import { useEffect, useState } from "react";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../TechDropDown";
import axios from "axios";
import TechnologyDropDown from "../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";

const EditProjectIdeaModal = ({
  projectName,
  projectDescriptions,
  indexNumber,
  projectTechnology,
  memberName,
}) => {
  const [projName, setProjName] = useState(projectName);
  const [projDescription, setProjDescription] = useState(projectDescriptions);
  const [projDescriptionError, setProjDescriptionError] = useState("");
//   const [description, setDescription] = useState(projectDescriptions);
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState([memberName]);
  const [techNames, seTechNames] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState(true);
  const [projNameError, setProjNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [projLinkError, setProjLinkError] = useState("");
  const [tech, setTech] = useState({ projectTechnology });
  const [technologyNames, setTechnologyNames] = useState([]);
  const [isProjectNameValid, setIsProjectNameValid] = useState(false);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] =
    useState(false);
  const [isProjectLinkValid, setIsProjectLinkValid] = useState(false);
  const [editProject, setEditProject] = useState({});
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectId, setProjectId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


//   const handleClickClear = (event) => {
//     event.preventDefault();
//     setTextInput("");
//     setProjName("");
//     setProjDescription("");
//     setDropDown(false);
//     setProjNameError("");
//     setProjDescriptionError("");
//     setTech({});
//     seTechNames({});
//     setTechnologyNames([]);

//     const checkboxes = document.querySelectorAll(".tech-checkbox");
//     checkboxes.forEach((checkbox) => {
//       checkbox.checked = false;
//     });
//   };

  const handleChangeProjNameError = (event) => {
    event.preventDefault();
    const name = event.target.value;
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

  const handleChangeProjDescriptionError = (event) => {
    event.preventDefault();
    const description = event.target.value;
    setProjDescription(description);
    setIsProjectDescriptionValid(description.match(/^.{50,750}$/) ? true : false);
    if (!description) {
      setError(true);
      setProjDescriptionError("Project Description is required");
    } else {
      setProjDescriptionError("");
      setError(false);
    }
  };

  const truncate = (str, maxLength) => {
    if (str.length > maxLength) return str.slice(0, maxLength) + "...";
    else return str;
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const isObjectEmpty = (object) => {
    if (object.member1.length > 0) {
      return setMemberNames(object);
    } else {
      return setMemberNames("");
    }
  };
  const techDataComingFrmChild = (data) => {
    return setTech(data);
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
        //   description,

          technologyNames: techNames,
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
    // setDescription(editProject?.description);

    setMemberNames(editProject?.memberNames);
    setTechnologyNames(editProject?.technologyNames);
  }, [editProject]);

  useEffect(() => {
    setProjName(projectName);
    // setDescription(projectDescriptions);
    setMemberNames(memberName);
    setTechnologyNames(projectTechnology);
    {
      console.log("names", memberName);
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
                      Please enter a name with only letters and spaces, between 1 and 100 characters.
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="project-description"
                    className="col-form-label title-text"
                  >
                    Project Description<span style={{ color: "red" }}>*</span>{" "}
                    <span style={{color: "grey"}}>(Minimum 50 characters)</span>

                  </label>
                  <textarea
                    className="form-control"
                    value={projDescription}
                    id="project-description"
                    placeholder="Write Here.."
                    onChange={(e) => handleChangeProjDescriptionError(e)}
                    rows={3}
                  ></textarea>
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
                    <span style={{color: "grey"}}>(Select atleast 1 technology)</span>
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
                        <TechDropDown
                          techDataComingChild={techDataComingFrmChild}
                          seTechNames={seTechNames}
                          techNames={techNames}
                          technologyNames={technologyNames}
                        />
                      </ul>
                    </div>
                    {/* </div> */}
                
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
                    <span style={{color: "grey"}}>(Minimum 8 members)</span>
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
                disabled={!isProjectNameValid || !isProjectDescriptionValid || isModalOpen}
                data-bs-target="#myIdeaModal"
                data-bs-dismiss={!error ? 'modal' : ''}
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
