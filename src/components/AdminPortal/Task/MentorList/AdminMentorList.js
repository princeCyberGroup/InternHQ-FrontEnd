import React, { useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../../../../Assets/chevron-downdown-arrow.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-upUpArrow.svg";
import { ReactComponent as UserPlus } from "../../../../Assets/AddUserPlus.svg";
import { ReactComponent as UserSlash } from "../../../../Assets/user-slashUserSlash.svg";
import { ReactComponent as Plus } from "../../../../Assets/+plusbtn.svg";
import "./AdminMentorList.css";
import { AddMentorModal } from "./AddMentorModal";
import axios from "axios";

const MentorList = () => {
  const [expandedMentor, setExpandedMentor] = useState(null);
  const [mentor, setMentor] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // setMentors(MentorData);
    // Fetch mentors data from the API
    fetchMentorList();
  }, []);

  const removeMentor = async (mentorId) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL+"/api/v2/removeMentor", {
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
      // console.log(err);
    }
  };
  const assignMentor = async (mentorId) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL+"/api/v2/removeMentor", {
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
      // console.log(err);
    }
  };
  // const addMentor = (newMentor) => {
  //   // Update the mentor list after adding a new mentor
  //   setMentor(prevMentor => [...prevMentor, newMentor]);
  // };
  const addMentor = async (newMentor) => {
    try {
      // Assign the mentor immediately after adding
      // await assignMentor(newMentor.mentorId);

      // Update the mentor list after adding a new mentor
      setMentor((prevMentor) => [...prevMentor, newMentor]);
    } catch (err) {
      // console.log(err);
    } finally {
      fetchMentorList();
    }
  };

  const fetchMentorList = async () => {
    try {
      // Make an API request to fetch mentors data
      const response = await fetch(
        process.env.REACT_APP_API_URL+"/api/v2/getMentorDetails",
        {
          headers: {
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
          },
        }
      );

      const data = await response.json();
      const mentors = [...data.activeMentors, ...data.inActiveMentors];
      setMentor(mentors);
      // console.log(isLoading, "Fetched data");
    } catch (error) {
      // console.log("Error occurred while fetching mentors:", error);
    }
  };

  const handleExpand = (mentorId) => {
    if (expandedMentor === mentorId) {
      setExpandedMentor(null);
    } else {
      setExpandedMentor(mentorId);
    }
  };

  // const handleAddMentor = (e) => {
  //   e.preventDefault();
  //   setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <>
      <div
        className="assign-task-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>Mentor List</p>
        <button
          style={{ marginRight: "8px" }}
          type="button"
          className="add-mentor-button"
          data-bs-toggle="modal"
          data-bs-target="#addMentorModal"
        >
          <Plus />
          Add Mentor
        </button>
      </div>

      {/* //main card  */}

      <div
        className="card mentor-card"
        style={{ maxHeight: "80vh", width: "420px", overflow: "auto" }}
      >
        <div
          className="card-body p-0"
          // style={{ maxHeight: "640px", overflow: "auto" }}
        >
          {mentor?.map((user) => {
            return (
              <>
                <div key={user.mentorId} className="card mentor-head">
                  <div onClick={() => handleExpand(user.mentorId)} className="mentor-wrapper">
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
                      
                      {user.isActive ? (
                        <button
                          className="remove-btn"
                          onClick={() => removeMentor(user.mentorId)}
                        >
                          <UserSlash />
                          Remove
                        </button>
                      ) : user.isActive === false ? (
                        <button
                          className="assign-btn"
                          onClick={() => assignMentor(user.mentorId)}
                        >
                          <UserPlus />
                          Assign
                        </button>
                      ) : null}
                      <span
                        
                        className="expand-arrow"
                      >
                        {expandedMentor === user.mentorId ? (
                          <UpArrow />
                        ) : (
                          <DownArrow />
                        )}
                      </span>
                    </div>

                    {/* <div className="arrow-wrapper1">
                      <button className="remove-btn">
                        Remove
                      </button>
                      <span
                        onClick={() => handleExpand(user.mentorId)}
                        className="expand-arrow"
                      >
                        {expandedMentor === user.mentorId ? (
                          <UpArrow />
                        ) : (
                          <DownArrow />
                        )}
                      </span>
                    </div> */}
                  </div>
                  {expandedMentor === user.mentorId && (
                    <div className="row mt-2">
                      <div className="technology">
                        <p className="tech">Skilled In:</p>
                        {/* {console.log(mentor.skills[0].length <8 && mentor.skills[1].length <8? "true"+mentor.skills[0]: mentor.skills )} */}
                        {user.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="badge tech-badge">
                            {skill.toUpperCase()}{" "}
                            {/*Replace with mentorskills from API response */}
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
      <AddMentorModal
        // isOpen={modalOpen} onClose={handleCloseModal}
        onAddMentor={addMentor}
      />
    </>
  );
};

export default MentorList;
