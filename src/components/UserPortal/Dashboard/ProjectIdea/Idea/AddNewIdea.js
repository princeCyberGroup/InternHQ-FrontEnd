import "./AddNewIdea.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import EmptyProject from "../../EmptyStates/EmptyProject/MyIdea";
import { ReactComponent as ExpandMore } from "../../../../../Assets/expand_more.svg";
import TechDropDown from "../TechDropDown";
import { UserContext } from "../../../../../Context/Context";

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
  };
  const handleChangeProjNameError = (event) => {
    event.preventDefault();
    const name = event.target.value;
    setProjName(name);
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
    var storedObject = localStorage.getItem("userData");
    var parsedObject = JSON.parse(storedObject);
    var userId = parsedObject.userId;
    if (error) {
      alert("Please fill in the required details");

    } else {
      await axios
        .post("https://cg-interns-hq.azurewebsites.net/projectIdea", {
          projName,
          projDescription,
          userId,
          technologyNames: tech,
          memberNames: memberNames,
        })
        .then((res) => {
          // console.log("print", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setTextInput("");
      setProjName("");
      setProjDescription("");
      setDropDown(false);
      // setError(true);
      setTech({});
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
        {idea.length === 0 ? (
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
                <div className="member mb pt-1 fw-bold mb-2">Members:</div>
                <div className="project-members ml-0">
                  {first.members.length > 4 ? (
                    first.members.map((curElem, index) => {
                      if (curElem != null) {
                        const initials = curElem
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .toUpperCase();

                        return (
                          <div className="project-idea-members" key={index}>
                            <p className="name-of-members">{initials}</p>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div className="project-idea-members">
                      <p className="name-of-members">
                        + {first.members.length}
                      </p>
                    </div>
                  )}
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
                    {projNameError && (
                      <span style={{ color: "red", fontSize: "11px" }}>
                        ({projNameError})
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={projName}
                    id="project-name"
                    placeholder="Enter Project Name"
                    onChange={handleChangeProjNameError}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="project-description"
                    className="col-form-label title-text"
                  >
                    Project Description<span style={{ color: "red" }}>*</span>{" "}
                    {projDescriptionError && (
                      <span style={{ color: "red", fontSize: "11px" }}>
                        ({projDescriptionError})
                      </span>
                    )}
                  </label>
                  <textarea
                    className="form-control"
                    value={projDescription}
                    id="project-description"
                    placeholder="Write Here.."
                    onChange={(e) => handleChangeProjDescriptionError(e)}
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
                          seTechNames={seTechNames}
                          techNames={techNames}
                        />
                      </ul>
                    </div>
                    {/* </div> */}
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="Members(Optional)"
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
                onClick={handleClickClear}
              >
                <span className="cancel-text"> Cancel </span>
              </button>
              <button
                type="button"
                className="btn save-button"
                data-bs-target="#myIdeaModal"
                data-bs-dismiss={!error ? 'modal' : ''}
                
                onClick={(e) => {
                  handleSubmit(e);
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
