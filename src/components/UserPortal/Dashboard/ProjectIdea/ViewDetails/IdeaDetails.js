import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteProjectIdea from "./DeleteProjectIdea";
import { ReactComponent as EditButton } from "../../../../../Assets/Buttonedit.svg";
import { ReactComponent as DeleteButton } from "../../../../../Assets/Buttondelete.svg";
import EditProjectIdeaModal from "./EditProjectIdeaModal";

const IdeaDetails = ({ data, indexNumber, setTaskVersion, taskVersion }) => {
  const [projectIdToChild, setProjectIdToChild] = useState(0);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [isOpen, setIsOpen] = useState(indexNumber === 0);
  const [textInput, setTextInput] = useState("");

  const deleteTask = (e, projectId, index) => {
    e.preventDefault();
    setProjectIdToChild(projectId);
    setShowDeleteTask(true);
    setIsOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (indexNumber === null) {
        indexNumber(0);
      }
    }, 5000);
  }, [data]);

  return (
    <>
      {showDeleteTask ? (
        <DeleteProjectIdea
          projectId={projectIdToChild}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowDeleteTask={setShowDeleteTask}
          setTaskVersion={setTaskVersion}
        />
      ) : (
        ""
      )}

      <div className="">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div>
            <h5 className="project-detail-name">
              {data[indexNumber]?.projectNames}
            </h5>
          </div>
          <div>
            <EditButton
              className="mx-3"
              data-bs-toggle="modal"
              data-bs-target="#editProjectIdeaModal"
              onClick={(e) => {
                setTextInput(
                  data[indexNumber]?.members
                    ?.filter((tech) => tech !== null)
                    .join(",")
                );
              }}
            />

            <EditProjectIdeaModal
              setTaskVersion={setTaskVersion}
              projectId={data[indexNumber]?.projectId}
              projectName={data[indexNumber]?.projectNames}
              projectDescriptions={data[indexNumber]?.projectText}
              projectTechnology={data[indexNumber]?.technology?.filter(
                (tech) => tech !== null
              )}
              memberName={
                data[indexNumber]?.members?.filter((tech) => tech !== null) ||
                ""
              }
              indexNumber={indexNumber}
              textInput={textInput}
              setTextInput={setTextInput}
              projectVersion={true}
              taskVersion={taskVersion}
            />

            <DeleteButton
              projectId={data[indexNumber]?.projectId}
              onClick={(e) => {
                deleteTask(e, data[indexNumber].projectId, indexNumber);
              }}
            />
          </div>
        </div>
        <p className="created-at">{data[indexNumber]?.createdAt}</p>
        <p className="project-detail-text">{data[indexNumber]?.projectText}</p>
        {data[indexNumber]?.technology &&
          !data[indexNumber]?.technology?.every((value) => value === null) && (
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
      </div>
    </>
  );
};
export default IdeaDetails;
