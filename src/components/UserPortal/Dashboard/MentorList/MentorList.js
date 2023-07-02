import { useState, useEffect, useContext } from "react";
import "./mentorlist.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MentorComponent = () => {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // setMentors(MentorData);
    // Fetch mentors data from the API
    setTimeout(() => {
      fetchMentors();
    }, 1000);
  }, []);

  const fetchMentors = async () => {
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
      const activeMentors = data.activeMentors;
      setMentors(activeMentors);
      setIsLoading(false);
      // console.log(isLoading, "Fetched data");
    } catch (error) {
      // console.log("Error occurred while fetching mentors:", error);
    }
  };

  return (
    <>
      <div
        className="card"
        style={{
          height: "370px",
          width: "378px",
          alignContent: "center",
          boxShadow: "0px 4px 20px rgba(40, 52, 73, 0.15)",
        }}
      >
        <div className="border-bottom ">
          <h5 className="card-title dtt-hfs">Know Your Mentors</h5>
        </div>
        <div className="box-shadow d-flex justify-content-center align-item-center">
          {isLoading ? (
            <div
              className="card-body pt-4"
              style={{ width: "329px", height: "236px" }}
            >
              <div>
                <div className="d-block rounded-circle">
                  <Skeleton circle={true} width={80} height={80} />
                </div>
                <div className="mentor-text d-flex flex-column align-items-center">
                  <p className="card-text fs mt-2">
                    <Skeleton width={106.61} height={13} />
                  </p>
                  <p className="role-fs">
                    <Skeleton width={68} height={10} />
                  </p>
                  <p className="mx-0 mt-0 p-0" style={{ marginBottom: "10px" }}>
                    <Skeleton
                      inline={true}
                      width={69.72}
                      height={20.38}
                      borderRadius={6}
                      style={{ marginRight: "13px" }}
                    />
                    <Skeleton
                      inline={true}
                      width={41.41}
                      height={20.38}
                      borderRadius={6}
                      style={{ marginRight: "13px" }}
                    />
                    <Skeleton
                      inline={true}
                      width={84.75}
                      height={20.38}
                      borderRadius={6}
                    />
                  </p>
                  <p>
                    <Skeleton
                      inline={true}
                      width={68}
                      height={20.38}
                      borderRadius={6}
                      style={{ marginRight: "13px" }}
                    />
                    <Skeleton
                      inline={true}
                      width={64}
                      height={20.38}
                      borderRadius={6}
                      style={{ marginRight: "13px" }}
                    />
                    <Skeleton
                      inline={true}
                      width={38.42}
                      height={20.38}
                      borderRadius={6}
                    />
                  </p>
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
                {mentors?.map((mentor, index) => (
                  <button
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
                {mentors?.map((mentor, index) => (
                  <div
                    key={index}
                    className={`carousel-item carousel-styling ${
                      index === 0 ? "active" : ""
                    } border`}
                  >
                    <div
                      className="card-body pt-4"
                      style={{ width: "329px", height: "236px" }}
                    >
                      <div>
                        {/* <img
                          src={mentor.imageUrl} // Replace with mentor image URL from API response
                          className="d-block rounded-circle"
                          alt="Mentor"
                        /> */}
                        {mentor.imageUrl ? (
                          <img
                            src={mentor.imageUrl}
                            className="d-block rounded-circle"
                            alt="Mentor"
                          />
                        ) : (
                          <div className="mentor-img">
                            <p style={{ fontSize: "2rem", marginTop: "15px" }}>
                              {mentor.mentorName
                                .split(" ")
                                .map((name) => name.charAt(0).toUpperCase())
                                .join("")}
                            </p>
                          </div>
                        )}
                        <div className="mentor-text">
                          <p className="card-text fs">
                            <b>{mentor.mentorName}</b>{" "}
                            {/* Replace with mentor name from API response */}
                          </p>
                          <p className="role-fs">{mentor.designation}</p>
                          {/* Replace with mentor position from API response */}
                          <div className="row">
                            <div className=" flex">
                              {/* {console.log(mentor.skills[0].length <8 && mentor.skills[1].length <8? "true"+mentor.skills[0]: mentor.skills )} */}
                              {mentor.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="badge badge-color"
                                >
                                  {skill.toUpperCase()}{" "}
                                  {/*Replace with mentorskills from API response */}
                                </span>
                              ))}
                            </div>
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
    </>
  );
};

export default MentorComponent;
