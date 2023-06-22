import React, { useContext, useState } from "react";
import { DetailedProvider } from "./Detailedreport";
import { ApiObj } from "../Fetcheddataobject";
import { ReactComponent as ExpandMore } from "../../../../Assets/expand_more.svg";
import { ReactComponent as ShowLess } from "../../../../Assets/chevron-down.svg";
import "./ProjectList.css";
import { useParams } from "react-router-dom";
function ProjectList() {
  //data
  const { data } = useContext(DetailedProvider);
  const [show, setShow] = useState(false);
  const [expandIndex, setExpandIndex] = useState(-1);
  // const val = data[ApiObj.PROJ][0];

  return (
    <div className="list-parent-wrapper">
      {data[ApiObj.PROJ]?.map((val, index) => {
        return (
          <div key={index} className="list-desp-wrapper">
            <div className="list-child-wrapper">
              <div className="list-project-expand">
                <div>{val.projectName}</div>
                {(show && expandIndex === index) ? (
                  <ShowLess
                    className="pointer"
                    onClick={() => {
                      setShow(false);
                      setExpandIndex(-1);
                      //   setExpandIndex(()=> show ? index : -1)
                    }}
                  />
                ) : (
                  <ExpandMore
                    className="pointer"
                    onClick={() => {
                      setShow(true);
                      setExpandIndex(index);
                    }}
                  />
                )}
              </div>
              {(show && expandIndex === index) ? (
                <div className="detail-desp">
                  <div className="list-description">{val.description}</div>
                  <div className="tech-used">
                    <div className="link-title">Technology Used:</div>
                    <div className="list-tech">
                      {Object.values(val.technology).map((tech, index) =>
                        tech !== null ? (
                          <div key={index} className="skill-tag-tech">
                            {tech}
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="brief-desp">
                  {val.description.length > 55
                    ? `${val.description.slice(0, 55)}...`
                    : val.description}
                </div>
              )}
              <div className="list-link project-link">
                <div className="link-title">Project Link:</div>
                <a href={val.projectLink}>{val.projectLink}</a>
              </div>
              {val.hostedLink !== null && show && expandIndex === index && (
                <div className="list-link other-link">
                  <div className="link-title">Git Link:</div>
                  <a href={val.hostedLink}>{val.hostedLink}</a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
