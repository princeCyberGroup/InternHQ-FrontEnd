import "./AddNewIdea.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import EmptyProject from "../../EmptyStates/EmptyProject/MyIdea";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../../../../AdminPortal/Task/AssignTask/TechnologyDropdown(Admin)";
import { UserContext } from "../../../../../Context/Context";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CryptoJS from "crypto-js";

const AddNewIdea = () => {
  const { idea } = useContext(UserContext);
  const navigate = useNavigate();
  const [first, ...rest] = idea;
  const [projName, setProjName] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState({});
  const [tech, setTech] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [projNameError, setProjNameError] = useState("");
  const [projDescriptionError, setProjDescriptionError] = useState("");
  const [error, setError] = useState(true);
  const [techNames, seTechNames] = useState({});
  const [technologyNames, setTechnologyNames] = useState([]);
  const [isProjectNameValid, setIsProjectNameValid] = useState(false);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] = useState(false);
  const [technologySelected, setTechnologySelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  let memberCount = 0;
  // {
  //   first.members.map((mem) => {

  //     if (mem != null) memberCount++;
  //   })
  // }
  // let memberCount = 0 //8
  // first.members.map((mem) => {
  //   if(mem != null) memberCount++;
  // })
  // const remainingMembersCounts = memberCount - 3;

  // if (first && first.members) {
  //   first.members.map((mem) => {
  //     if (mem != null) memberCount++;

  //   });

  // }
  const remainingMembersCounts = memberCount - 3;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  const handleClickClear = (event) => {
    event.preventDefault();
    setTextInput("");
    setProjName("");
    setProjDescription("");
    setDropDown(false);
    setProjNameError("");
    setProjDescriptionError("");
    setTech({});
    seTechNames({});
    setTechnologyNames([]);

    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

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
  const handleChangeTechnology = (e) => {
    e.preventDefault();
    const technology = e.target.value;
    setTechnologySelected(technology);

  }
  const truncate = (str, maxLength) => {
    if (str.length > maxLength) return str.slice(0, maxLength) + "...";
    else return str;
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/project-idea");
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
  const handleSubmit = async (e) => {
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
    if (error) {
      alert("Please fill in the required details");
    } else {
      await axios
        .post(process.env.REACT_APP_API_URL + "/api/v3/projectIdea", {
          projName,
          projDescription,
          userId,
          technologyNames: tech,
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
      setDropDown(false);
      setTech({});
      seTechNames([]);

      const checkboxes = document.querySelectorAll(".tech-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  useEffect(() => {
    const texts = textInput.split(",").map((text) => text.trim());
    var membersObj = {};
    texts.forEach((text, index) => {
      membersObj[`member${index + 1}`] = text;
    });
    isObjectEmpty(membersObj);
  }, [textInput, tech]);

  return (
    <>
      <div className="card-body pb-0">
        <div className="text-row-1">
          <p className="card-textt">
            Simply share your project ideas with us, and our experts will review
            it and provide feedback and guidance on how to take it to the next
            level.
          </p>
        </div>
        <div className="share-project">
          <div className="d-flex align-item-center justify-content-between mb-2 ">
            <div className="d-flex">
              <p className="text mb-0 fw-bold">Got Any Idea ?</p>
            </div>
            <button
              className="view-all fw-bold"
              onClick={(e) => handleClick(e)}
            >
              View All
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="recipe-row">
            <div className="recipe-text">
              <h5 className="fw-bold">
                <Skeleton width={252} />
              </h5>
              <p className="fw-normal mb-1">
                <Skeleton height={60} />
              </p>
              <div className="members-div pt-0">
                <div className="member mb pt-1 fw-bold mb-2">
                  <Skeleton width={84} height={16} />
                </div>
                <div className="project-members ml-0">
                  <div className="project-idea-members-skeleton">
                    <p className="name-of-members m-0">
                      <Skeleton
                        width={40}
                        height={40}
                        circle
                        highlightColor="#fff"
                      />
                    </p>
                  </div>
                  <div className="project-idea-members-skeleton">
                    <p className="name-of-members m-0">
                      <Skeleton
                        width={40}
                        height={40}
                        circle
                        highlightColor="#fff"
                      />
                    </p>
                  </div>
                  <div className="project-idea-members-skeleton">
                    <p className="name-of-members m-0">
                      <Skeleton
                        width={40}
                        height={40}
                        circle
                        highlightColor="#fff"
                      />
                    </p>
                  </div>
                  <div className="project-idea-members-skeleton">
                    <p className="name-of-members m-0">
                      <Skeleton
                        width={40}
                        height={40}
                        circle
                        highlightColor="#fff"
                      />
                    </p>
                  </div>
                  <div className="project-idea-members-skeleton">
                    <p className="name-of-members m-0">
                      <Skeleton
                        width={40}
                        height={40}
                        circle
                        highlightColor="rgba(40, 81, 158, 0.2)"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : idea.length === 0 ? (
          <EmptyProject />
        ) : (
          <div className="recipe-row">
            <div className="recipe-text">
              <h5 className="fw-bold">{first.projectNames}</h5>
              <p className="fw-normal mb-1">
                {first.projectText.length > 100
                  ? truncate(first.projectText, 100)
                  : first.projectText}
              </p>
              <div className="members-div pt-0">
              {first?.members && !(first?.members?.every((value) => value === null)) && (
          <div className="member mb pt-1 fw-bold mb-2">Members:</div>
        )}
                <div className="project-members ml-0">
                  {first.members.slice(0, 8)?.map((curElem, index) => {
                    if (curElem != null) {
                      const [firstName, lastName] = curElem.split(" ");
                      const initials = `${firstName[0]}${lastName ? lastName[0] : ''}`.toUpperCase();
                      return (
                        <div className="project-idea-members" key={index}>
                          <p className="name-of-members" data-title={`${firstName} ${lastName}`}>
                            {initials}
                          </p>
                        </div>

                      );
                    }
                  })}

                  {first.members?.map((mem) => {

                    if (mem != null) memberCount++;
                    const remainingMembersCounts = memberCount - 8; {
                    }

                    remainingMembersCounts > 0 ? (
                      <div className="count-of-members">

                        + {remainingMembersCounts}


                      </div>)
                      :
                      <></>
                  }
                  )}
                  {/* {remainingMembersCounts > 0 ? (
            <div className="count-of-members">
              <p className="remaining-members">+{remainingMembersCounts}</p>
              {console.log("count: ", remainingMembersCounts)}
            </div>
          )
            :
            <div>        {console.log("count: ")}</div>
          } */}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="add-new-idea-container">
          <div
            className="add-new-idea pt-2"
            data-bs-toggle="modal"
            data-bs-target="#myIdeaModal"
          >
            <p className="project-p mb-0 fw-bold">
              <span>+</span> Add New Idea
            </p>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="myIdeaModal"
        tabIndex="-1"
        aria-labelledby="myIdeaModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 add-project-wrapper"
                id="myIdeaModalLabel"
              >
                Add your Project Idea
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClickClear}
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
                          selectedTechIds={selectedTechIds}
                          setSelectedTechIds={setSelectedTechIds}
                          setTechnologyNames={setTechnologyNames}
                          technologyNames={technologyNames}
                          searchQuery={searchQuery}
                          setSearchQuery={setSearchQuery}
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
                    <span style={{color: "grey"}}>(Maximum 8 members)</span>
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
                onClick={handleClickClear}
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
    </>
  );
};

export default AddNewIdea;