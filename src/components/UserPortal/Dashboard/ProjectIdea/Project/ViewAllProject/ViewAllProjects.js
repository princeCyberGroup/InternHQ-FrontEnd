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
import {ReactComponent as VectorAdd} from "../../../../../../Assets/Vectoradd.svg";

const ViewAllProjects = () => {
  // const { project } = useContext(UserContext);
  const [project, setProject] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [projName, setProjName] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [hostedLink, setHostedLink] = useState("");
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState({});
  const [techNames, seTechNames] = useState({});
  const [error, setError] = useState(true);
  const [projNameError, setProjNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [projLinkError, setProjLinkError] = useState("");
  const [projectIndex, setProjectIndex] = useState(0);
  const [mentorIndex, setMentorIndex] = useState(0);
  const [tech, setTech] = useState({});
  const [mentorAssignData, setMentorAssignData] = useState([]);
  const [isProjectNameValid, setIsProjectNameValid] = useState(false);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] = useState(false);
  const [isProjectLinkValid, setIsProjectLinkValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const details = project;

  const techDataComingFrmChild = (data) => {
    return setTech(data);
  };

  const handleProjectNameChange = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setProjName(name);
    setIsProjectNameValid(name.match(/^.{1,100}$/) ? true : false);
    if (!name) {
      setError(true);
      setProjNameError("Project name is required");
    } else {
      setError(false);
      setProjNameError("");
    }
  };
  const handleProjectDescriptionChange = (e) => {
    const description = e.target.value;
    setProjDescription(description);
    setIsProjectDescriptionValid(description.match(/^.{50,750}$/) ? true : false);
    if (!description) {
      setError(true);
      setDesError("Project description is required");
    } else {
      setError(false);
      setDesError("");
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
      setError(false);
      setProjLinkError("");
    }
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
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
    var storedObject = localStorage.getItem("userData");
    var parsedObject = JSON.parse(storedObject);
    var userId = parsedObject.userId;
    if (error) {
      alert("Please fill in the required details");

    }
    else {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/v2/Project", {
          projName,
          projDescription,
          userId,
          projectLink,
          hostedLink,
          technologyNames: techNames,
          memberNames: memberNames,
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

      const checkboxes = document.querySelectorAll(".tech-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  // useEffect(() => {
  //   var storedObject = localStorage.getItem("userData");
  //   var parsedObject = JSON.parse(storedObject);
  //   var userId = parsedObject.userId;

  //   axios.all([
  //     axios.get(`https://cg-interns-hq.azurewebsites.net/getProject?userId=${userId}`),
  //     axios.get("https://cg-interns-hq.azurewebsites.net/getAssignedTask")
  //   ])
  //     .then(axios.spread((projectResponse, mentorTaskApiResponse) => {
  //       const combinedResponse = {
  //         project: projectResponse.data.response,
  //         anotherData: mentorTaskApiResponse.data.response
  //       };
  //       setProject(combinedResponse);
  //     }))
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    var storedObject = localStorage.getItem("userData");
    var parsedObject = JSON.parse(storedObject);
    var userId = parsedObject.userId;
    const firstAPIPromise = axios
      .get(
        process.env.REACT_APP_API_URL + `/api/v3/getProject?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
        },
      }
      );

    const secondAPIPromise = axios
      .get(process.env.REACT_APP_API_URL + `/api/v3/getAssignedNotification?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
        },
      })
    Promise.all([firstAPIPromise, secondAPIPromise])
      .then((responses) => {
        const firstAPIData = responses[0].data.response;
        const mentorAssignedData = responses[1].data.response;
        { console.log("Forst:", mentorAssignData) }
        setProject(firstAPIData);
        setMentorAssignData(mentorAssignedData);

      })

      //   process.env.REACT_APP_API_URL+`/api/v2/getProject?userId=${userId}`,
      //   {
      //     headers: {
      //       Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
      //     },
      //   }
      // )
      .then((response) => {
        setProject(response.data.response);
        setMentorAssignData(response);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });


    //   .then((responsedata) => {
    //     const mentorAssignData = responsedata.data;
    //     console.log("Second API data:", mentorAssignData);
    //     setProject(prevData => [...prevData, mentorAssignData]);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data from another API:", error);
    // });
  }, []);

  useEffect(() => {
    const texts = textInput.split(",").map((text) => text.trim());
    const membersObj = {};
    texts.forEach((text, index) => {
      membersObj[`member${index + 1}`] = text;
    });
    isObjectEmpty(membersObj);
  }, [textInput, tech]);

  const handelIndex = (index, indexForMentor) => {
    setProjectIndex(index);
    setMentorIndex(indexForMentor);

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
              <p className="me-2 add-your-project"><VectorAdd/> 
              <span className="text-for-the-modal">Add Project</span></p>
            </button>
          </div>
          <div
            className="modal fade"
            id="xampleModal"
            tabindex="-1"
            aria-labelledby="xampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 add-project-wrapper"
                    id="xampleModalLabel"
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
                        <span style={{color: "grey"}}>(Minimum 50 characters)</span>
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
                              seTechNames={seTechNames}
                              techNames={techNames}
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
                        <span style={{color: "grey"}}>(Minimum 8 members)</span>
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
                    data-bs-target="#xampleModal"
                    data-bs-dismiss={!error ? 'modal' : ''}
                    onClick={(e) => {
                      handleSubmit(e);
                      setIsModalOpen(true);}}
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
              <DetailsLeft data={project} mentorApiData={mentorAssignData} projectDetails={handelIndex} />
            </div>
            <div className="project-detail">
              <ProjectDetail data={project} mentorApiData={mentorAssignData} indexNumber={projectIndex} mentorIndexNumber={mentorIndex} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAllProjects;
