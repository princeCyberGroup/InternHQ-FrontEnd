import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewAllIdea.css";
import Header from "../../../../../Header/Header";
import EmptyIdea from "../../../EmptyStates/EmptyProject/MyIdeaViewAll";
import DetailsLeft from "../../ViewDetails/DetailsLeft";
import { ReactComponent as ExpandMore } from "../../../../../../Assets/expand_more.svg";
import TechDropDown from "../../TechDropDown";
import axios from "axios";
import { UserContext } from "../../../../../../Context/Context";
import BreadCrumbs from "../../../../../BreadCrumbs/BreadCrumbs";
import IdeaDetails from "../../ViewDetails/IdeaDetails";
import {ReactComponent as VectorAdd} from "../../../../../../Assets/Vectoradd.svg";
import CryptoJS from "crypto-js";

const ViewAllIdeas = () => {
  // const { idea, setIdea, project, setProject } = useContext(UserContext);
  const [idea, setIdea] = useState([]);
  const [projectIndex, setProjectIndex] = useState(0);
  const [projNameError, setProjNameError] = useState("");
  const [projDescriptionError, setProjDescriptionError] = useState("");
  const [projName, setProjName] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [tech, setTech] = useState({});
  const [error, setError] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [memberNames, setMemberNames] = useState({});
  const [techNames, seTechNames] = useState({});
  const [isProjectNameValid, setIsProjectNameValid] = useState(false);
  const [isProjectDescriptionValid, setIsProjectDescriptionValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handelIndex = (index) => {
    setProjectIndex(index);
  };
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

    const checkboxes = document.querySelectorAll(".tech-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  const handleChangeProjNameError = (e) => {
    e.preventDefault();
    const name = e.target.value;
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
  const handleChangeProjDescriptionError = (e) => {
    e.preventDefault();
    const description = e.target.value;
    setProjDescription(description);
    setIsProjectDescriptionValid(description.match(/^.{50,750}$/) ? true : false);
    if (!description) {
      setError(true);
      setProjDescriptionError("Project Description is required");
    } else {
      setError(false);
      setProjDescriptionError("");
    }
  };
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const isObjectEmpty = (object) => {
    if (object.member1?.length > 0) {
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
      seTechNames({});

      const checkboxes = document.querySelectorAll(".tech-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  useEffect(() => {
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
    axios
     /* .get(process.env.REACT_APP_API_URL+`/api/v3/getProjectIdea?userId=${userId}`,
      {
        headers: {
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
        },
      } */
      .get(
        process.env.REACT_APP_API_URL +
          `/api/v3/getProjectIdea?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      )
      .then((response) => {
        setIdea(response.data.response);
        {console.log("Api",response.data)}
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/error/statusCode=401");
        }
        if (error.response.status === 400) {
          navigate("/error/statusCode=400");
        }
        if (error.response.status === 500) {
          navigate("/error/statusCode=500");
        }
        if (error.response.status === 404) {
          navigate("/error/statusCode=404");
        }
        console.error("Error fetching tasks:", error);
      });
  }, []);

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
      <div className="" style={{ marginBottom: "4rem" }}>
        <Header />
      </div>
      <div className="container page-color">
        <div className="view-all-nav-bar pt-4">
          <BreadCrumbs />
        </div>

        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="sub-text ps-0">My Idea</p>
          </div>

          <div
            className="add-new-project-wrapper me-0"
            data-bs-toggle="modal"
            data-bs-target="#viewAllAddModal"
          >
            <p className="add-new-project"><VectorAdd/> Add New Idea</p>
          </div>

          <div
            className="modal fade"
            id="viewAllAddModal"
            tabIndex="-1"
            aria-labelledby="viewAllAddModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 add-project-wrapper"
                    id="viewAllAddModalLabel"
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
                      {!isProjectNameValid && projName &&(
                    <span style={{ color: "red", fontSize: "11px" }}>
                      Please enter a text with a length between 1 and 100 characters.
                    </span>
                  )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="project-description"
                        className="col-form-label title-text"
                      >
                        Project Description
                        <span style={{ color: "red" }}>*</span>{" "}
                        <span style={{color: "grey"}}>(Minimum 50 characters)</span>
                      </label>
                      <textarea
                        className="form-control"
                        value={projDescription}
                        id="project-description"
                        placeholder="Write Here.."
                        onChange={ (e) => handleChangeProjDescriptionError(e)}
                        rows={3}
                      />
                        {!isProjectDescriptionValid && projDescription &&(
                      <span style={{ color: "red", fontSize: "11px" }}>
                       Maximum description can be of 750 characters.
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
                    data-bs-target="#viewAllAddModal"
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
        </div>
        {idea.length === 0 ? (
          <EmptyIdea />
        ) : (
          <div
            className="all-project-idea-wrapper entire-component ms-0"
            style={{ overFlowY: "scroll" }}
          >
            <div className="">
              <DetailsLeft data={idea} projectDetails={handelIndex} />
            </div>
            <div className="project-detail">
              <IdeaDetails data={idea} indexNumber={projectIndex} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAllIdeas;
