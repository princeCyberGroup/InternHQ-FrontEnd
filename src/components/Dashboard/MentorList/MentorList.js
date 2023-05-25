import { useState, useEffect } from 'react';import "./mentorlist.css";
import { MentorData } from './MentorData';

export const MentorComponent = () => {

  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    setMentors(MentorData);
    // Fetch mentors data from the API
    // fetchMentors();
  }, []);

  // const fetchMentors = async () => {
  //   try {
  //     // Make an API request to fetch mentors data
  //     const response = await fetch('https://api.example.com/mentors');
  //     const data = await response.json();

  //     // Update the mentors state with the fetched data
  //     setMentors(data);
  //   } catch (error) {
  //     console.log('Error occurred while fetching mentors:', error);
  //   }
  // };

  return (
    <>
      <div className="card" style={{ height: "370px", alignContent: "center" }}>
        <div className="border-bottom ">
          <h5 className="card-title dtt-hfs">Know Your Mentors</h5>
        </div>
        <div className="box-shadow d-flex justify-content-center align-item-center">
          <div
            id="carouselExampleDark"
            className="crousel slide "
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {mentors.map((mentor, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index.toString()}
                  className={`bg-dark ${index === 0 ? 'active' : ''}`}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner crousal-set" role="listbox">
              {mentors.map((mentor, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''} border`}
                >
                  <div className="card-body pt-4" style={{width:"329px",height:"236px"}}>
                    <img
                      src="https://th.bing.com/th/id/OIP.08bGE4YPB9q_OZ9hS45YpgHaGm?pid=ImgDet&rs=1" // Replace with mentor image URL from API response
                      className="d-block rounded-circle"
                      alt="Mentor"
                    />
                    <div className="mentor-text">
                      <p className="card-text fs">
                        <b>{mentor.name}</b> {/* Replace with mentor name from API response */}
                      </p>
                      <p className="role-fs">{mentor.position}</p> {/* Replace with mentor position from API response */}
                      <div className="row">
                        <div className=" flex">
                          {mentor.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="badge badge-color">
                              {skill.toUpperCase()} {/* Replace with mentor skills from API response */}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <br />


      </div>
    </>
  );
};
