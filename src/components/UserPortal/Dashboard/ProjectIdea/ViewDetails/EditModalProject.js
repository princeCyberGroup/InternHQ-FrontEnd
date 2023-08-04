import { useEffect, useState } from "react";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";
import axios from "axios";

const ProjectModalEdit = ({ projectName, projectDescriptions, indexNumber, projectTechnology, projectLinks, hostedLinks, memberName, projectId, selectedTechIds, setSelectedTechIds }) => {
    const [projName, setProjName] = useState(projectName);
    const [description, setDescription] = useState(projectDescriptions);
    const [projectLink, setProjectLink] = useState(projectLinks);
    const [hostedLink, setHostedLink] = useState(hostedLinks);
    const [textInput, setTextInput] = useState("");
    const [dropDown, setDropDown] = useState(false);
    const [error, setError] = useState(true);
    const [projLinkError, setProjLinkError] = useState("");
    const [technologyNames, setTechnologyNames] = useState([]);
    const [isProjectLinkValid, setIsProjectLinkValid] = useState(false);
    const [editProject,setEditProject]=useState({});
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    // const [memberNames, setMemberNames] = useState({memberName});
    const techArray = Object.entries(projectTechnology)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => (value
        ));
    const [tech, setTech] = useState(techArray);
    let techObj = {};
    technologyNames?.forEach((val, ind) => {
        techObj[`tech${ind + 1}`] = (val === null) ? '' : val;
    })
    
    const memberArray = Object.entries(memberName)
    .filter(([key,value]) => value !== null)
    .map(([key, value]) => (value));
    const [memberNames, setMemberNames] = useState(memberArray);
    const texts = textInput.split(",").map((text) => text.trim());
        const membersObj = {};
        memberArray.forEach((text, index) => {
            membersObj[`member${index + 1}`] = text;
        });
       
   
    const handleProjectNameChange = (e) => {

        setProjName(e.target.value);
        if (e.target.value > 0) {
            setError(false);
        }
        else {
            setError(true);
        }

    };
    const handleProjectDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleChangeTechnology = (e) => {
        setTech(e.target.value);
    }

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
        if (JSON.stringify(data) !== JSON.stringify(tech))
            setTech(data);
    };
    const handleMemberChange = (e) => {
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
    const handleEditCloseModal = () => {
        setProjectToEdit(null);
        const checkboxes = document.querySelectorAll(".tech-checkbox");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }
    const handleProjectTask=(task) =>{
        setProjectToEdit(task);
    }
    useEffect(() => {
        const texts = textInput.split(",").map((text) => text.trim());
        const membersObj = {};
        texts.forEach((text, index) => {
            membersObj[`member${index + 1}`] = text;
        });

        // isObjectEmpty(membersObj);
    }, [textInput]);

    const handleSubmit =  (e) => {

        // var storedObject = localStorage.getItem("userData");
        // var parsedObject = JSON.parse(storedObject);
        // var projectId = parsedObject.projectId;
       if(projectId !== null){
        axios
            .put(process.env.REACT_APP_API_URL +"/api/v4/project-task", {
                projectId,
                projName,
                description,
                projectLink,
                hostedLink,
                technologyNames: techObj,
                memberNames: membersObj
            })

            .then((res) => {
                console.log("print", res.data);

            })
            .catch((err) => {
                console.log(err);
            });
        }
    };

    useEffect(() => {
        setEditProject(projectToEdit);
    }, [projectToEdit]);

    useEffect(() => {
        setProjName(editProject?.projName);
        setDescription(editProject?.description);
        setProjectLink(editProject?.projectLink);
        setHostedLink(editProject?.hostedLink);
        // setMemberNames(editProject?.memberNames);
        setTechnologyNames(editProject?.tech);
    }, [editProject]);

    useEffect(() => {
        setProjName(projectName);
        setDescription(projectDescriptions);
        setProjectLink(projectLinks);
        setHostedLink(hostedLinks);
        const memberArray = Object.entries(memberName)
        .filter(([key,value]) => value !== null)
        .map(([key, value]) => (value));
        setMemberNames(memberArray);
        setTechnologyNames(projectTechnology);
    }, [indexNumber]);

    
    return (
        <div class="modal fade" id="editProjectModal" tabindex="-1" aria-labelledby="editProjectModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editProjectModalLabel">Edit your project</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                                value={tech}
                                                onChange={(e) => handleChangeTechnology(e)}
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
                                                setTechnologyNames={setTech}
                                                technologyNames={tech}
                                                searchQuery={searchQuery}
                                                setSearchQuery={setSearchQuery}
                                            />
                                        </ul>
                                    </div>
                                </div>
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
                                    value={ memberNames}
                                    onChange={handleMemberChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleEditCloseModal()}>Cancel</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}> Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProjectModalEdit;