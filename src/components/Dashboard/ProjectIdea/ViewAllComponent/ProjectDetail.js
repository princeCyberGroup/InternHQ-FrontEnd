import "./ProjectDetail.css";
import { Link } from "react-router-dom";
export const ProjectDetail = ({ data, indexNumber }) => {
  return (
    <div className="">
      <h5 className="project-detail-name">{data[indexNumber].projectNames}</h5>
      <p className="created-at">{data[indexNumber].createdAt}</p>
      <p className="project-detail-text">{data[indexNumber].projectText}</p>
      <p className="project-detail-technology-used mb-0">Technology Used:</p>

      <div className="project-detail-technology-badges">
        {data[indexNumber].technology.map && data[indexNumber].technology.map((tech) => {
          if (tech != null) {
            return <p className="technology-badge me-1"> {tech} </p>;
          }
        })}
      </div>

      <p className="project-detail-link">Project Link:</p>
      <p className="project-link-name">
        <Link to={data[indexNumber].projectLink} target="_blank">
          {data[indexNumber].projectLink}
        </Link>
      </p>
      <p className="project-detail-hosted-link">Hosted Link:</p>
      <p className="hosted-link-name text-decoration-none">
        {data[indexNumber].hostedLink
          ? data[indexNumber].hostedLink
          : "No Link Provided"}
      </p>
      <p className="members fw-bold">Members:</p>
            <div className="project-detail-technology-badges">
                {data[indexNumber].technologyNames && data[indexNumber].technologyNames.map((tech) => {
                    if (tech != null){
                    return <p className="technology-badge me-1"> {tech} </p>
                    }
                })}
            </div>
      <div className="members-name project-members text-center">
        {data[indexNumber].members && data[indexNumber].members.length > 4 ? (
          data[indexNumber].members.map((curElem, index) => {
            if (curElem != null) {
              const nameParts = curElem.split(" ");
              const initials =
                nameParts[0][0].toUpperCase() +
                nameParts[nameParts.length - 1][0].toUpperCase();
              return (
                <div className="project-idea-members" key={index}>
                  <p className="name-of-members">{initials}</p>
                </div>
              );
            }
          })
        ) : (
          <div className="project-idea-members">
            <p className="name-of-members">
              + {data[indexNumber].members.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
