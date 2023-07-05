import "./ProjectDetail.css";
import { Link } from "react-router-dom";
const ProjectDetail = ({ data, indexNumber }) => {
  {console.log("This is length:", data[indexNumber])}
  // let memberCount = 0 //8
  // data[indexNumber].members.map((mem) => {
  //   if(mem != null) memberCount++;
  // })
  // const membersCounts = data.map((item) => item.members.length);
  // const displayMembersCounts = membersCounts.slice(0,3);
//   const remainingMembersCounts = memberCount - 3;
// console.log(data, "This is dara")

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
      <div className="members-div pt-0">
        <div className="member mb pt-1 fw-bold mb-2">Members:</div>
        <div className="project-members ml-0">
          {data[indexNumber].members.map((curElem, index) => {
            if (curElem != null) {
              const [firstName, lastName] = curElem.split(" ");
              const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

              return (
                <div className="project-idea-members" key={index}>
                  <p className="name-of-members">{initials}</p>
                </div>
              );
            }
          })}
          {/* {remainingMembersCounts > 0 ? (
            <div className="project-idea-members">
              <p className="name-of-members">+ {remainingMembersCounts}</p>
              {console.log("count: ", remainingMembersCounts)}
            </div>
          )
            :
            <div>        {console.log("count: ", data)}</div>
          } */}
        </div>

      </div>
    </div >
  );
};

export default ProjectDetail;
