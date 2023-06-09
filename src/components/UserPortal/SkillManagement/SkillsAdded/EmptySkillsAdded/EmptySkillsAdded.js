import React from "react";
import { ReactComponent as SkillAddedEmpty } from "../../../../../Assets/SkillAddedEmpty.svg";
import "./EmptySkillsAdded.css"

const EmptySkillsAdded = () => {
  return (
 
          
          
            <div className="card-body empty-skill-body d-flex justify-content-center flex-column align-items-center pb-0" style={{ width: "18.4rem" }}>
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
            
         
       
  );
};

export default EmptySkillsAdded;
