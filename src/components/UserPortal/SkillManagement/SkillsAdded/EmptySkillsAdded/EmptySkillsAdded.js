import React from "react";
import { ReactComponent as SkillAddedEmpty } from "../../../../../Assets/SkillAddedEmpty.svg";
import "./EmptySkillsAdded.css"

const EmptySkillsAdded = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body empty-skill-body d-flex justify-content-center flex-column align-items-center pb-0">
              <div className="row">
                <div className="col">
                  <SkillAddedEmpty />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p className="empty-skill-heading">No Skill added right now!</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p className="empty-skill-desc">
                    Challenge yourself and explore new abilities by taking the
                    test.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptySkillsAdded;
