import { useState } from "react";
import "./ProjectDetail.css";
import { Link } from "react-router-dom";
import { ReactComponent as EditButton } from "../../../../../Assets/Buttonedit.svg";
import { ReactComponent as DeleteButton } from "../../../../../Assets/Buttondelete.svg";
import ProjectModalEdit from "./EditModalProject";
import DeleteProject from "./DeleteProject";
import { ReactComponent as Complete } from "../../../../../Assets/ButtonCompleteTag.svg";
import { ReactComponent as Clock } from "../../../../../Assets/clock-regular 1logClock.svg";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const ProjectDetail = ({
  data,
  mentorApiData,
  indexNumber,
  mentorIndexNumber,
  setTaskVersion,
  taskVersion,
}) => {
  const [projectIdToChild, setProjectIdToChild] = useState(0);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [isOpen, setIsOpen] = useState(indexNumber === 0);
  const [textInput, setTextInput] = useState("");

  const props = {
    idProp: data[indexNumber].projectId ? "projectId" : "taskId",
    idValue: data[indexNumber].projectId || data[indexNumber].taskId,
    nameProp: data[indexNumber].projectId ? "projectName" : "taskName",
    descriptionProp: data[indexNumber].projectId
      ? "projectDescriptions"
      : "taskDescription",
  };

  const deleteTask = (e, projectId, index) => {
    e.preventDefault();
    setProjectIdToChild(projectId);
    setShowDeleteTask(true);
    setIsOpen(true);
  };

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

      {data !== null && data.length > indexNumber && mentorIndexNumber === 0 ? (
        <div className="">
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <h5 className="project-detail-name">
                {data[indexNumber]?.projectNames} {data[indexNumber]?.taskName}
              </h5>
            </div>
            <div>
              <EditButton
                className="mx-3"
                data-bs-toggle="modal"
                data-bs-target="#editProjectModal"
                onClick={(e) => {
                  setTextInput(
                    data[indexNumber]?.members
                      ?.filter((tech) => tech !== null)
                      .join(",")
                  );
                }}
              />

              <ProjectModalEdit
                setTaskVersion={setTaskVersion}
                taskVersion={taskVersion}
                {...props}
                projectName={
                  data[indexNumber]?.projectNames || data[indexNumber]?.taskName
                }
                projectDescriptions={
                  data[indexNumber]?.projectText ||
                  data[indexNumber]?.taskDescription
                }
                projectTechnology={
                  data[indexNumber]?.technology?.filter(
                    (tech) => tech !== null
                  ) || data[indexNumber]?.techNames
                }
                projectLinks={data[indexNumber]?.projectLink || ""}
                hostedLinks={data[indexNumber]?.hostedLink || ""}
                memberName={
                  data[indexNumber]?.members?.filter((tech) => tech !== null) ||
                  ""
                }
                textInput={textInput}
                setTextInput={setTextInput}
                indexNumber={indexNumber}
                projectVersion={true}
              />

              {data[indexNumber]?.projectId && (
                <DeleteButton
                  projectId={data[indexNumber].projectId}
                  onClick={(e) => {
                    deleteTask(e, data[indexNumber].projectId, indexNumber);
                  }}
                />
              )}
            </div>
          </div>
          <div className="task-deadline d-flex">
            <Clock />
            <p className="mx-2">
              {data[indexNumber]?.createdAt
                ? formatDate(data[indexNumber]?.createdAt)
                : formatDate(data[indexNumber]?.startDate)}
            </p>
          </div>
          <p className="project-detail-text">
            {data[indexNumber]?.projectText}{" "}
            {data[indexNumber]?.taskDescription}
          </p>
          {data[indexNumber]?.technology &&
            !data[indexNumber]?.technology?.every(
              (value) => value === null
            ) && (
              <p className="project-detail-technology-used mb-2">
                Technology Used:
              </p>
            )}
          {data[indexNumber]?.techNames &&
            !data[indexNumber]?.techNames?.every((value) => value === null) && (
              <p className="project-detail-technology-used mb-2">
                Technology Used:
              </p>
            )}

          <div className="project-detail-technology-badges">
            {data[indexNumber]?.technology?.map &&
              data[indexNumber]?.technology?.map((tech) => {
                if (tech != null) {
                  return <p className="technology-badge me-1"> {tech} </p>;
                }
              })}
            {data[indexNumber]?.techNames?.map &&
              data[indexNumber]?.techNames?.map((tech) => {
                if (tech != null) {
                  return <p className="technology-badge me-1"> {tech} </p>;
                }
              })}
          </div>
          <div>
            {data[indexNumber]?.projectLink && (
              <>
              <p className="project-detail-link">Project Link:</p>
              <p className="project-link-name">
                <Link to={data[indexNumber]?.projectLink} target="_blank">
                  {data[indexNumber]?.projectLink}
                </Link>
              </p>
              </>
            )}
          </div>

          <div>
            {data[indexNumber]?.hostedLink && (
              <>
              <p className="project-detail-hosted-link">Hosted Link:</p>
              <p className="hosted-link-name text-decoration-none">
                <Link to={data[indexNumber].hostedLink} target="_blank">
                  {data[indexNumber].hostedLink}
                </Link>
              </p>
              </>
            )}
          </div>
          <div className="members-div pt-0">
            {data[indexNumber]?.members &&
              !data[indexNumber]?.members?.every((value) => value === null) && (
                <div className="member mb pt-1 fw-bold mb-2">Members:</div>
              )}
            <div className="project-members ml-0">
              {data[indexNumber]?.members?.map((curElem, index) => {
                if (curElem != null) {
                  const [firstName, lastName] = curElem.split(" ");

                  const initials = `${firstName[0]}${
                    lastName ? lastName[0] : ""
                  }`.toUpperCase();
                  return (
                    <div className="project-idea-members" key={index}>
                      <p className="name-of-members" title={curElem}>
                        {initials}
                      </p>
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
          <div className="members-div mt-4">
            {data[indexNumber]?.taskId && data[indexNumber]?.projectLink && (
              <Complete />
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {mentorIndexNumber !== null && mentorApiData !== null ? (
        <div className="">
          <h5 className="project-detail-name">
            {mentorApiData[mentorIndexNumber]?.taskName}
          </h5>
          <p className="created-at">
            {mentorApiData[mentorIndexNumber]?.assignedDate}
          </p>
          <p className="project-detail-text">
            {mentorApiData[mentorIndexNumber]?.taskDescription}
          </p>
          {mentorApiData[mentorIndexNumber]?.techNames && (
            <p className="project-detail-technology-used mb-2">
              Technology Used:
            </p>
          )}
          <div className="project-detail-technology-badges">
            {mentorApiData[mentorIndexNumber]?.techNames?.map &&
              mentorApiData[mentorIndexNumber]?.techNames?.map((tech) => {
                if (tech != null) {
                  return <p className="technology-badge me-1"> {tech} </p>;
                }
              })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ProjectDetail;
