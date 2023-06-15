import { useState, useEffect,useContext } from "react";
import "./mentorlist.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../../../Context/Context";

export const MentorComponent = () => {
  const obj=useContext(UserContext)
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
        "https://cg-interns-hq.azurewebsites.net/getMentorDetails"
      );

      const data = await response.json();

      setMentors(data.response);
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
              className="card-body pt-3"
              style={{ width: "329px", height: "239px" }}
            >
              <div>
                <div className="d-block rounded-circle">
                  <Skeleton circle={true} width={80} height={80} />
                </div>
                <div className="mentor-text d-flex flex-column align-items-center ">
                  <p className="card-text fs mt-3">
                    <Skeleton width={180} />
                  </p>
                  <p className="role-fs">
                    <Skeleton width={120} />
                  </p>
                  <p className="badge badge-color">
                    <Skeleton width={260} />
                  </p>
                  <p className="badge badge-color">
                    <Skeleton width={260}/>
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
                {mentors.map((mentor, index) => (
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
                {mentors.map((mentor, index) => (
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
                        <img
                          src={mentor.imageUrl} // Replace with mentor image URL from API response
                          className="d-block rounded-circle"
                          alt="Mentor"
                        />
                        <div className="mentor-text">
                          <p className="card-text fs">
                            <b>{mentor.mentorName}</b>
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
                                   {skill.toUpperCase()} {/*Replace with mentorskills from API response */}
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
