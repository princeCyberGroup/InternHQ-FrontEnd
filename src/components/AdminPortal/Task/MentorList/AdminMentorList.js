import React, { useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../../../../Assets/chevron-downdown-arrow.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-upUpArrow.svg";
import { ReactComponent as UserPlus } from "../../../../Assets/AddUserPlus.svg";
import { ReactComponent as UserSlash } from "../../../../Assets/user-slashUserSlash.svg";
import { ReactComponent as Edit } from "../../../../Assets/Buttonedit.svg";
import { ReactComponent as Plus } from "../../../../Assets/+plusbtn.svg";
import EditMentorModal from "./EditMentorModal";
import "./AdminMentorList.css";
// import { AddMentorModal } from "./AddMentorModal";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CustomMentorModal from "./CustomMentorModal";

const MentorList = () => {
  const [expandedMentor, setExpandedMentor] = useState(null);
  const navigate = useNavigate();
  const [mentor, setMentor] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState({}); // The mentor to edit
  const [fetchedMentorData, setFetchedMentorData] = useState({});

  // const [mentorName, setMentorName] = useState("");
  // const [technologyNames, setTechnologyNames] = useState([]);
  // const [email, setEmail] = useState("");
  // const [designation, setDesignation] = useState("");
  // const [imageUrl, setImageUrl] = useState(null);
  // const [isChecked, setIsChecked] = useState(false); //Activate Mentor Toggle
  // const [permissions, setPermissions] = useState([]);

  const handleEditClick = (mentorId) => {
    setSelectedMentor(
      mentor.filter((men) => {
        return men.mentorId === mentorId;
      })
    );
    // setMentorName(selectedMentor[0]?.mentorName)
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editedMentor) => {
    setIsEditModalOpen(false);
    setSelectedMentor(null);
  };

  const openModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  useEffect(() => {
    // Fetch mentors data from the API
    fetchMentorList();
  }, []);

  const removeMentor = async (mentorId) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/v3/removeMentor", {
        mentorId: mentorId,
        isAssigned: "Remove",
      });
      setMentor((prevMentor) =>
        prevMentor.map((mentor) => {
          if (mentor.mentorId === mentorId) {
            return { ...mentor, isActive: false };
          }
          return mentor;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const assignMentor = async (mentorId) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/v3/removeMentor", {
        mentorId: mentorId,
        isAssigned: "Assign",
      });
      setMentor((prevMentor) =>
        prevMentor.map((mentor) => {
          if (mentor.mentorId === mentorId) {
            return { ...mentor, isActive: true };
          }
          return mentor;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // const handleEdit = async (mentorId) => {
  //   console.log(mentorId, "This is mentor Id");
  // }

  // const addMentor = async (newMentor) => {
  //   try {
  //     console.log('New Mentor Object:', newMentor);

  //   // ... (rest of the code)

  //   const { email, designation } = newMentor;
  //   console.log('New Mentor Email:', email);
  //   console.log('New Mentor Designation:', designation);
  //     // Update the mentor list after adding a new mentor
  //     // setMentor((prevMentor) => [...prevMentor, newMentor]);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     fetchMentorList();
  //   }
  //   console.log(newMentor.mentorName, "Mentor Name")
  //   console.log(newMentor.email, "Mentor email")
  //   console.log(newMentor.imageUrl, "Mentor image url")
  //   console.log(newMentor.designation, "Mentor designation")
  //   console.log(newMentor.technologyNames, "Mentor tech names")
  //   console.log(newMentor.isChecked, "Mentor is checked?")
  //   console.log(newMentor.permissions, "Mentor permissions")
  // };

  const fetchMentorList = async () => {
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
    try {
      // Make an API request to fetch mentors data
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v3/getMentorDetails",
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );

      const data = await response.json();
      const mentors = [...data.activeMentors, ...data.inActiveMentors];
      setMentor(mentors);
    } catch (error) {
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
    }
  };

  const handleExpand = (mentorId) => {
    if (expandedMentor === mentorId) {
      setExpandedMentor(null);
    } else {
      setExpandedMentor(mentorId);
    }
  };

  return (
    <>
      <div
        className="mentor-list-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>Mentor List</p>
        <button
          // style={{ marginRight: "8px" }}
          type="button"
          className="add-mentor-button"
          // data-bs-toggle="modal"
          // data-bs-target="#addMentorModal"
          onClick={openModal}
        >
          <Plus />
          Add Mentor
        </button>
        <CustomMentorModal show={modalShow} onHide={closeModal} />
      </div>

      <div
        className="card mentor-card"
        // style={{ maxHeight: "80vh", width: "396px", overflow: "auto" }}
      >
        <div className="card-body p-0">
          {mentor?.map((user) => {
            return (
              <>
                <div key={user.mentorId} className="card mentor-head">
                  <div
                    onClick={() => handleExpand(user.mentorId)}
                    className="mentor-wrapper"
                  >
                    <div className="image-wrapper1">
                      <div className="image-box1">
                        {user.imageUrl ? (
                          <img
                            key={user.mentorId}
                            src={user.imageUrl}
                            width={38}
                            alt=""
                          />
                        ) : (
                          <div className="d-flex justify-content-center noMentor-img">
                            <span className="initials">
                              {user.mentorName
                                .split(" ")
                                .map((name) => name.charAt(0).toUpperCase())
                                .join("")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-wrapper1">
                      <p key={user.mentorId} className="m-0">
                        <b>{user.mentorName}</b>
                      </p>

                      <p className="m-0 pos-wrapper">{user.designation} </p>
                    </div>
                    <div className="arrow-wrapper1">
                      <Edit
                        className="assign-btn"
                        onClick={() => {
                          handleEditClick(user.mentorId);
                        }}
                      />
                      <span className="expand-arrow">
                        {expandedMentor === user.mentorId ? (
                          <UpArrow />
                        ) : (
                          <DownArrow />
                        )}
                      </span>
                    </div>
                  </div>
                  {expandedMentor === user.mentorId && (
                    <div className="row mt-2">
                      <div className="technology">
                        <p className="tech">Skilled In:</p>
                        {user.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="badge tech-badge">
                            {skill.toUpperCase()}{" "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <CustomMentorModal
      //  onAddMentor={addMentor}
      />
      {console.log(selectedMentor[0])}
      {selectedMentor && (
        <EditMentorModal
          selectedMentorName={selectedMentor[0]?.mentorName || ""}
          selectedMentorEmail={selectedMentor[0]?.email || ""}
          selectedMentorDesignation={selectedMentor[0]?.designation || ""}
          selectedMentorTechTags={selectedMentor[0]?.skills || []}
          selectedMentorImage={selectedMentor[0]?.imageUrl || null}
          selectedMentorChecked={selectedMentor[0]?.isActive || false}
          selectedMentorPermissions={selectedMentor[0]?.permissions || []}
          show={isEditModalOpen}
          onHide={() => setIsEditModalOpen(false)}
          initialData={fetchedMentorData}
          onSave={handleEditSave}
        />
      )}
      {/* <AddMentorModal onAddMentor={addMentor} /> */}
    </>
  );
};

export default MentorList;
