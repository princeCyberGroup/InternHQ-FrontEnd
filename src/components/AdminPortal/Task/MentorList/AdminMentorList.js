import React, { useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../../../../Assets/chevron-downdown-arrow.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-upUpArrow.svg";
import "./AdminMentorList.css";
import { AddMentorModal } from "./AddMentorModal";

const MentorList = () => {
  const [expandedMentor, setExpandedMentor] = useState(null);
  const [mentor, setMentor] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // setMentors(MentorData);
    // Fetch mentors data from the API
    fetchMentorList();
  }, []);

  const fetchMentorList = async () => {
    try {
      // Make an API request to fetch mentors data
      const response = await fetch(
        "https://cg-interns-hq.azurewebsites.net/getMentorDetails"
      );

      const data = await response.json();

      setMentor(data.response);
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

  const handleAddMentor = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
          class="btn add-mentor-button"
          data-bs-toggle="modal"
          data-bs-target="#addMentorModal"
          onClick={(e)=>{handleAddMentor(e)}}
        >
          Add Mentor
        </button>

      </div>

      {/* //main card  */}

      <div
        className="card mentor-card"
        style={{ maxHeight: "40rem", overflow: "auto", width: "420px" }}
      >
        <div
          className="card-body p-0"
          style={{ maxHeight: "640px", overflow: "auto" }}
        >
          {mentor.map((user) => {
            return (
              <>
                <div key={user.mentorId} className="card mentor-head">
                  <div className="mentor-wrapper">
                    <div className="image-wrapper1">
                      <div className="image-box1">
                        <img
                          key={user.mentorId}
                          src={user.imageUrl}
                          width={38}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text-wrapper1">
                      <p key={user.mentorId} className="m-0">
                        <b>{user.mentorName}</b>
                      </p>

                      <p className="m-0 pos-wrapper">{user.designation} </p>
                    </div>
                    <div className="arrow-wrapper1">
                      <button>
                        <p>Remove</p>
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
                    </div>
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
                <AddMentorModal isOpen={modalOpen} onClose={handleCloseModal} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MentorList;
