import "../ManageSkillSet/manageSkillSet.css";
import React, { useEffect, useState } from "react";
import { ReactComponent as Add } from "../../../../Assets/add.svg";
import { ReactComponent as Right } from "../../../../Assets/right.svg";
import { AddNewSkillTest } from "./AddNewSkillTest";
import "../ManageSkillSet/Modals.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import { ReactComponent as Pipe } from "../Assets/pipe.svg"
export default function ManageSkillSet({ data }) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])
  
  return (
    <>
      <div className="about">
        <Link to="/admin/skill-test" className="about-link">
          Manage Skill Set <Right style={{ marginBottom: "2px" }} />
        </Link>
        <div className="about-div-total-skill">Total Test Taken</div>
      </div>
      <div className="row addNew-manage " >
        <div
          className="add-new-skill-test col-5"
          data-bs-toggle="modal"
          data-bs-target="#newSkillModal"
        >
          <Add /> &nbsp; Add New Skill Test
        </div>

        <div className="beg-int-advance col-7 d-flex ">
          {isLoading ? <Skeleton width={633.6} height={59} highlightColor="#fff" style={{marginBottom: "0.3rem"}}/> : <><div className="col-4 insideContent-totalTest">
            <div className="row inside-manage-skills justify-content-center">
              <div className="col-2 inside-manage-skills-number">
                {data.beginner}
              </div>
              <div className="col-10 inside-manage-skills-text">Beginner</div>
            </div>
          </div>
          <div
            style={{ width: 0, height: "1.375rem", border: "1px solid black" }}
          ></div>
          <div className="col-4 insideContent-totalTest">
            <div className="row inside-manage-skills justify-content-center">
              <div className="col-2 inside-manage-skills-number">
                {data.intermediate}
              </div>
              <div className="col-10 inside-manage-skills-text">Intermediate</div>
            </div>
          </div>
          <div
            style={{ width: 0, height: "1.375rem", border: "1px solid black" , marginLeft:"0.5rem" }}
          ></div>
          <div className="col-4 insideContent-totalTest">
            <div className="row inside-manage-skills justify-content-center">
              <div className="col-2 inside-manage-skills-number">
                {data.advanced}
              </div>
              <div className="col-10 inside-manage-skills-text">Advanced</div>
            </div>
          </div></>}
          
        </div>
      </div>
      <AddNewSkillTest />
    </>
  );
}
