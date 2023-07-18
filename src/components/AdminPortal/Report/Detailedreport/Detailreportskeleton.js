import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ReactComponent as Usercircle } from "../../../../Assets/Usercircle.svg";
import { ReactComponent as Clock } from "../../../../Assets/Clock.svg";
import { ReactComponent as Mail } from "../../../../Assets/Mail.svg";
import { ReactComponent as Profile } from "../../../../Assets/Profile.svg";
import { ReactComponent as Call } from "../../../../Assets/Call.svg";
import { ReactComponent as Beginner } from "../../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../../Assets/intermediate.svg";
import { ReactComponent as Advance } from "../../../../Assets/advance.svg";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import NoData from "../../../../Assets/NoData.svg";

const Detailreportskeleton = () => {
  return (
    <div>
      <div className="detailrep-user-info">
        <div className="use-info">
          <span>User Information</span>
        </div>
        <div className="info-detail">
          <div className="user-name">
            <Usercircle />
            {/* <span>{`${data[ApiObj.FN]} ${data[ApiObj.LN]}`}</span> */}
            <Skeleton width={200} highlightColor="#B2B2B3" />
          </div>
          <div className="other-info">
            <div className="icon-pair">
              <Profile />
              {/* <span>{data.internId}</span> */}
              <Skeleton width={50} highlightColor="#B2B2B3" />
            </div>
            <div className="det-dot" />
            <div className="icon-pair">
              <Clock />
              {/* <span>{`${data[ApiObj.DOI]} months`}</span> */}
              <Skeleton width={100} highlightColor="#B2B2B3" />
            </div>
            <div className="det-dot" />
            <div className="icon-pair">
              <Mail />
              {/* <span>{data[ApiObj.EID]}</span> */}
              <Skeleton width={150} highlightColor="#B2B2B3" />
            </div>
            <div className="det-dot" />
            <div className="icon-pair">
              <Call />
              {/* <span>{data[ApiObj.PN]}</span> */}
              <Skeleton width={100} highlightColor="#B2B2B3" />
            </div>
          </div>
        </div>
      </div>
      <div className="detailrep-second-child">
        <div className="detail-child spent-hours">
          <span>Most Spent Hours</span>
          <div className="most-skill-hr">
            {/* <PieChart /> */}
            <div className="container" style={{ height: "inherit" }}>
              <div className="row">
                <div style={{ padding: "0", margin: "0" }}>
                  <div
                    className="dropdown"
                    style={{
                      marginLeft: "1rem",
                      marginTop: "0.594rem",
                      marginBottom: "0.594rem",
                    }}
                  >
                    <button
                      className="btn dropdown-toggle dropdown-button"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Month
                    </button>
                  </div>
                  <div>
                    <div
                      style={{
                        width: "410px",
                        height: "220px",
                      }}
                    >
                      <div className="no-data-div">
                        <img
                          className="no-data-img"
                          src={NoData}
                          alt="No Data"
                        />
                        <h1
                          style={{
                            fontFamily: "'Roboto'",
                            fontWeight: 600,
                            fontSize: "30px",
                            color: "#343435",
                          }}
                        >
                          No data found
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-child">
          <span>Skills Achieved</span>
          <div className="skills-achieved">
            {/* <Skillsachieved /> */}
            <div className="skill-parent-wrapper">
              <div className="skill-star-count">
                <div className="skill-first-container">
                  <div className="total-stars">
                    <span className="count">0</span>
                    <span>Stars Achieved</span>
                  </div>
                  <div className="seperated-stars">
                    <div>
                      <span className="count">0</span>
                      <span>Beginner</span>
                    </div>
                    <div>
                      <span className="count">0</span>
                      <span>Intermediate</span>
                    </div>
                    <div>
                      <span className="count">0</span>
                      <span>Advanced</span>
                    </div>
                  </div>
                </div>
                <div className="skill-second-container">
                  <div>Technology:</div>
                  <div className="tag-container">
                    <Skeleton width={73} height={24} highlightColor="#B2B2B3" />{" "}
                    &nbsp;
                    <Skeleton
                      width={73}
                      height={24}
                      highlightColor="#B2B2B3"
                    />{" "}
                    &nbsp;
                    <Skeleton
                      width={73}
                      height={24}
                      highlightColor="#B2B2B3"
                    />{" "}
                    &nbsp;
                    <Skeleton
                      width={73}
                      height={24}
                      highlightColor="#B2B2B3"
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="star-info">
                <div>
                  <Beginner />
                </div>
                <span>Beginner</span>
                <div>
                  <Intermediate />
                </div>
                <span>Intermediate</span>
                <div>
                  <Advance />
                </div>
                <span>Advanced</span>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-child">
          <span>Project Details</span>
          <div className="project-details">
            {/* <ProjectList /> */}
            <div className="list-parent-wrapper">
              <div className="list-desp-wrapper">
                <div className="list-child-wrapper">
                  <div className="list-project-expand">
                    {/* <div>{val?.projectName}</div> */}
                    <Skeleton width={150} highlightColor="#B2B2B3" />
                    <ExpandMore className="pointer" />
                  </div>
                  <Skeleton width="90%" highlightColor="#B2B2B3" />
                  <div className="list-link project-link">
                    <div className="link-title">Project Link:</div>
                    {/* <a href={val?.projectLink}>{val?.projectLink}</a> */}
                    <Skeleton
                      width={190}
                      height={12}
                      highlightColor="#28519E"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="list-parent-wrapper">
              <div className="list-desp-wrapper">
                <div className="list-child-wrapper">
                  <div className="list-project-expand">
                    {/* <div>{val?.projectName}</div> */}
                    <Skeleton width={150} highlightColor="#B2B2B3" />
                    <ExpandMore className="pointer" />
                  </div>
                  <Skeleton width="90%" highlightColor="#B2B2B3" />
                  <div className="list-link project-link">
                    <div className="link-title">Project Link:</div>
                    {/* <a href={val?.projectLink}>{val?.projectLink}</a> */}
                    <Skeleton
                      width={190}
                      height={12}
                      highlightColor="#28519E"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailreportskeleton;
