import { useEffect, useState } from "react";
import "./ProjectDetail.css";
import { Link } from "react-router-dom";
import { ReactComponent as EditButton } from "../../../../../Assets/Buttonedit.svg";
import { ReactComponent as DeleteButton } from "../../../../../Assets/Buttondelete.svg";
import ProjectModalEdit from "./EditModalProject";
import AddProject from "../Project/AddProject";
import DeleteProject from "./DeleteProject";


const ProjectDetail = ({ data, mentorApiData, indexNumber, mentorIndexNumber,setTaskVersion}) => {
  const [projectIdToChild, setProjectIdToChild] = useState(0);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [isOpen, setIsOpen] = useState(indexNumber===0);
 
  // const deleteTask = (e, projectId, index) => {
  //   e.preventDefault();
  //   setTaskIdToChild(projectId);
  // };
  const deleteTask = (e, projectId, index) => {
    e.preventDefault();
    setProjectIdToChild(projectId);
    setShowDeleteTask(true);
    setIsOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (indexNumber === null && mentorIndexNumber === null) {
        indexNumber(0);
        mentorIndexNumber(0);
      }
    }, 5000);
  }, [data, mentorApiData]);
  // let test=useState(false)  
  // let memberCount = 0 //8
  // data[indexNumber].members.map((mem) => {
  //   if(mem != null) memberCount++;
  // })
  // const membersCounts = data.map((item) => item.members.length);
  // const displayMembersCounts = membersCounts.slice(0,3);
  //   const remainingMembersCounts = memberCount - 3;
  // console.log(data, "This is dara")

  return (
    <>
    {showDeleteTask ? (
        <DeleteProject
          projectId={projectIdToChild}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowDeleteTask={setShowDeleteTask}
          setTaskVersion={setTaskVersion}
        />
      ) : (
        ""
      )}
      {data !== null && Array.isArray(data) && data.length > indexNumber && mentorIndexNumber != 0 ? (
        <div className="" >
          <div className="d-flex" style={{justifyContent:"space-between"}}>
            <div>
            <h5 className="project-detail-name">{data[indexNumber]?.projectNames}</h5>
            </div>
            <div>
              {/* <button className="border-0 bg-transparent"> */}
                <EditButton
                  className="mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editProjectModal"
                  onClick={(e) => {
                   console.log(data[indexNumber]?.technology);
                  }}
                />
              {/* </button> */}
              <ProjectModalEdit
                projectName={data[indexNumber]?.projectNames}
                projectDescriptions={data[indexNumber]?.projectText}
                projectTechnology={data[indexNumber]?.technology.filter(tech => tech !== null)}
                projectLinks={data[indexNumber]?.projectLink}
                hostedLinks={data[indexNumber]?.hostedLink}
                memberName = {data[indexNumber]?.members.filter(tech => tech !== null)}
                indexNumber={indexNumber}
              />
              {/* <button  
                projectId={data[indexNumber].projectId}
                onClick = {(e) => {
                  deleteTask(e,data[indexNumber].projectId,indexNumber)
                }}> */}
                <DeleteButton 
                projectId={data[indexNumber].projectId}
                onClick={(e) => {
                  deleteTask(e, data[indexNumber].projectId, indexNumber);
                }}
                />
                {/* </button> */}
            </div>
          </div>
          <p className="created-at">{data[indexNumber]?.createdAt}</p>
          <p className="project-detail-text">{data[indexNumber]?.projectText}</p>
          {data[indexNumber]?.technology && !(data[indexNumber]?.technology?.every((value) => value === null)) && (
        <p className="project-detail-technology-used mb-2">Technology Used:</p>
        )}

          <div className="project-detail-technology-badges">
            {data[indexNumber]?.technology?.map && data[indexNumber]?.technology?.map((tech) => {
              if (tech != null) {
                return <p className="technology-badge me-1"> {tech} </p>
              }
            })}
          </div>
          <div>
            {data[indexNumber]?.projectLink && (
              <p className="project-detail-link">Project Link:</p>
            )}
            {data[indexNumber].projectLink && (
              <p className="project-link-name">
                <Link to={data[indexNumber]?.projectLink} target="_blank">
                  {data[indexNumber]?.projectLink}
                </Link>
              </p>
            )}
          </div>

          <div>
            {data[indexNumber]?.hostedLink && (
              <p className="project-detail-hosted-link">Hosted Link:</p>
            )}
            {data[indexNumber]?.hostedLink && (
              <p className="hosted-link-name text-decoration-none">
                <Link to={data[indexNumber].hostedLink} target="_blank">
                  {data[indexNumber].hostedLink}
                </Link>
              </p>
            )}
          </div>
          <div className="members-div pt-0">
            {data[indexNumber]?.members && !(data[indexNumber]?.members?.every((value) => value === null)) && (
              <div className="member mb pt-1 fw-bold mb-2">Members:</div>
            )}
            <div className="project-members ml-0">
              {data[indexNumber]?.members?.map((curElem, index) => {
                if (curElem != null) {
                  const [firstName, lastName] = curElem.split(" ");

                  const initials = `${firstName[0]}${lastName ? lastName[0] : ''}`.toUpperCase();
                  return (
                    <div className="project-idea-members" key={index}>
                      <p className="name-of-members" title={curElem}>{initials}</p>
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
      ) : (<div></div>)}


      {mentorIndexNumber !== null && mentorApiData !== null ? (

        <div className="">
          <h5 className="project-detail-name">{mentorApiData[mentorIndexNumber]?.taskName}</h5>
          <p className="created-at">{mentorApiData[mentorIndexNumber]?.assignedDate}</p>
          <p className="project-detail-text">{mentorApiData[mentorIndexNumber]?.taskDescription}</p>
          {mentorApiData[mentorIndexNumber]?.techNames && (
            <p className="project-detail-technology-used mb-2">Technology Used:</p>
          )}
          <div className="project-detail-technology-badges">
            {mentorApiData[mentorIndexNumber]?.techNames?.map && mentorApiData[mentorIndexNumber]?.techNames?.map((tech) => {
              if (tech != null) {
                return <p className="technology-badge me-1"> {tech} </p>;
              }
            })}
          </div>
        </div>
      )
        : (<div></div>)}

    </>
  );
};

export default ProjectDetail;
