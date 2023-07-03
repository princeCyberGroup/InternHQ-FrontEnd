import "./ProjectDetail.css";
import { Link } from "react-router-dom";
const ProjectDetail = ({ data, indexNumber }) => {
  return (
    <div className="">
      <h5 className="project-detail-name">{data[indexNumber].projectNames}</h5>
      <p className="created-at">{data[indexNumber].createdAt}</p>
      <p className="project-detail-text">{data[indexNumber].projectText}</p>
      <p className="project-detail-technology-used mb-2">Technology Used:</p>

      <div className="project-detail-technology-badges">
        {data[indexNumber].technology?.map && data[indexNumber].technology.map((tech) => {
          if (tech != null) {
            return <p className="technology-badge me-1"> {tech} </p>;
          }
        })}
      </div>
      <div>
        {data[indexNumber].projectLink && (
          <p className="project-detail-link">Project Link:</p>
        )}
        {data[indexNumber].projectLink && (
          <p className="project-link-name">
            <Link to={data[indexNumber].projectLink} target="_blank">
              {data[indexNumber].projectLink}
            </Link>
          </p>
        )}
      </div>

      <div>
        {data[indexNumber].hostedLink && (
          <p className="project-detail-hosted-link">Hosted Link:</p>
        )}
        {data[indexNumber].hostedLink && (
          <p className="hosted-link-name text-decoration-none">
            <Link to={data[indexNumber].hostedLink} target="_blank">
              {data[indexNumber].hostedLink}
            </Link>
          </p>
        )}
      </div>

      {data[indexNumber].members && (
        <p className="members fw-bold mb-2">Members:</p>
      )}
      <div className="members-name project-members text-center">
        {data[indexNumber].members && data[indexNumber].members?.length > 4 ? (
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
          data[indexNumber].members && (
            <div className="project-idea-members">
              <p className="name-of-members">
                + {data[indexNumber].members.length}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;