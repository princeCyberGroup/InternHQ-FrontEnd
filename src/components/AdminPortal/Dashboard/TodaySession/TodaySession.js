import { useState, useEffect } from "react";
import "./TodaySession.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const TodaySession = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch mentors data from the API
    setTimeout(() => {
      fetchSessions();
    }, 1000);
  }, []);

  const fetchSessions = async () => {
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
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v3/getMentorDetails",
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      if (response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (response.status === 404) {
        navigate("/error/statusCode=404");
      }
      const data = await response.json();
      const activeMentors = data.activeMentors;
      setSessions(activeMentors);
      setIsLoading(false);
    } catch (error) {
      console.log("Error occurred while fetching mentors:", error);
    }
  };

  return (
    <>
      <div className="outer-row-info">
        <div className="col sess-head">Today's Session</div>
        <div
          className="card"
          style={{
            padding: "1rem",
            marginTop: "0.9rem",
            height: "12rem",
            width: "410px",
            alignContent: "center",
            boxShadow: "0px 4px 20px rgba(40, 52, 73, 0.15)",
          }}
        >
          <div className="box-shadow d-flex justify-content-center align-item-center">
            {isLoading ? (
              <div
                id="carouselExampleDark"
                className="carousel slide "
                data-bs-ride="carousel"
              >
                <div
                  className="card-body p-2"
                  style={{ width: "370px", height: "142px" }}
                >
                  <div className="session-first-container">
                    <div className="sess-detail">
                      <Skeleton width={106.61} height={13} />
                      <Skeleton width={106.61} height={13} />
                    </div>
                    <div className="sess-name">
                      <Skeleton width={106.61} height={13} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="sess-mentor-detail">
                      <div className="sess-mentor-wrapper">
                        <div className="sess-mentor-img">
                          <Skeleton circle={true} width={25} height={25} />
                        </div>
                        <Skeleton width={106.61} height={13} />{" "}
                      </div>
                      <div className="mentor-pos-wrapper">
                        <Skeleton width={106.61} height={13} />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="carouselExampleDark"
                className="carousel slide "
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators KYM" style={{}}>
                  {sessions?.map((mentor, index) => (
                    <button
                      style={{ width: "1.2rem", height: "2px" }}
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to={index}
                      className={`bg-dark ${index === 0 ? "active" : ""}`}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>

                <div className="carousel-inner crousal-set " role="listbox">
                  {sessions?.map((mentor, index) => (
                    <div
                      key={index}
                      className={`carousel-item carousel-styling ${
                        index === 0 ? "active" : ""
                      } border`}
                    >
                      <div
                        className="card-body p-2"
                        style={{ width: "370px", height: "142px" }}
                      >
                        <div className="session-first-container">
                          <div className="sess-detail">
                            <div>10:30 AM - 1:00 PM</div>
                            <div>Batch_Jan_2023</div>
                          </div>
                          <div className="sess-name">JavaScript</div>
                        </div>
                        <div className="mt-3">
                          <div className="sess-mentor-detail">
                            <div className="sess-mentor-wrapper">
                                {mentor.imageUrl?
                                <div className="sess-mentor-box">
                                <img
                                key={mentor.mentorId}
                                src={mentor.imageUrl}
                                alt=""
                              />
                              </div>
                                :
                                
                              <div className="sess-mentor-img">
                                {mentor.mentorName
                                  .split(" ")
                                  .map((name) => name.charAt(0).toUpperCase())
                                  .join("")}
                              </div>}
                              {mentor.mentorName}
                            </div>
                            <div className="mentor-pos-wrapper">
                              {mentor.designation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default TodaySession;
