import React, { useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../../../../Assets/chevron-downdown-arrow.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-upUpArrow.svg";
import { ReactComponent as UserPlus } from "../../../../Assets/AddUserPlus.svg";
import { ReactComponent as UserSlash } from "../../../../Assets/user-slashUserSlash.svg";
import { ReactComponent as Plus } from "../../../../Assets/+plusbtn.svg";
import "./AdminMentorList.css";
import { AddMentorModal } from "./AddMentorModal";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MentorList = () => {
  const [expandedMentor, setExpandedMentor] = useState(null);
  const navigate = useNavigate();
  const [mentor, setMentor] = useState([]);

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

  const addMentor = async (newMentor) => {
    try {
      // Update the mentor list after adding a new mentor
      setMentor((prevMentor) => [...prevMentor, newMentor]);
    } catch (err) {
      console.log(err);
    } finally {
      fetchMentorList();
    }
  };

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
          data-bs-toggle="modal"
          data-bs-target="#addMentorModal"
        >
          <Plus />
          Add Mentor
        </button>
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
      <AddMentorModal onAddMentor={addMentor} />
    </>
  );
};

export default MentorList;
