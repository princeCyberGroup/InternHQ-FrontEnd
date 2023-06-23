import "../ManageSkillSet/manageSkillSet.css";
import React from "react";
import { ReactComponent as Add } from "../../../../Assets/add.svg";
import { ReactComponent as Right } from "../../../../Assets/right.svg";
import { AddNewSkillTest } from "./AddNewSkillTest";
import "../ManageSkillSet/Modals.css";
import { Link } from "react-router-dom";

// import { ReactComponent as Pipe } from "../Assets/pipe.svg"
export default function ManageSkillSet({ data }) {
  return (
    <>
{/* <<<<<<< HEAD
      <div className='about'>Manage Skill Set <Right style={{marginBottom:"2px"}} /></div>
      <div className='row' style={{ width: "838px" }}>
        <button className='add-new-skill-test col-3'
            data-bs-toggle="modal" 
            data-bs-target="#newSkillModal">
          <Add /> &nbsp; Add New Skill Test
       
        </button>
        
        <div className='beg-int-advance col-5 d-flex'>
  <div className='col-4'>
    <div className='row inside-manage-skills justify-content-center'>
      <div className='col inside-manage-skills-number'>{data.beginner}</div>
      <div className='col inside-manage-skills-text'>Beginner</div>
    </div>
  </div>
  <div style={{ width: 0, height: '22px', border: '1px solid black' }}></div>
  <div className='col-4'>
    <div className='row inside-manage-skills justify-content-center'>
      <div className='col inside-manage-skills-number'>{data.intermediate}</div>
      <div className='col inside-manage-skills-text'>Intermediate</div>
    </div>
  </div>
  <div style={{ width: 0, height: '22px', border: '1px solid black' }}></div>
  <div className='col-4'>
    <div className='row inside-manage-skills justify-content-center'>
      <div className='col inside-manage-skills-number'>{data.advanced}</div>
      <div className='col inside-manage-skills-text'>Advanced</div>
    </div>
  </div>
</div>
======= */}
      <div className="about">
        <Link to="/admin/skill-task" className="about-link">
          Manage Skill Set <Right style={{ marginBottom: "2px" }} />
        </Link>
        <div className="about-div">Total Test Taken</div>
      </div>
      <div className="row" style={{ width: "838px" }}>
        <div
          className="add-new-skill-test col-3"
          data-bs-toggle="modal"
          data-bs-target="#newSkillModal"
        >
          <Add /> &nbsp; Add New Skill Test
        </div>

        <div className="beg-int-advance col-5 d-flex ">
          <div className="col-4">
            <div className="row inside-manage-skills justify-content-center">
              <div className="col inside-manage-skills-number">
                {data.beginner}
              </div>
              <div className="col inside-manage-skills-text">Beginner</div>
            </div>
          </div>
          <div
            style={{ width: 0, height: "22px", border: "1px solid black" }}
          ></div>
          <div className="col-4">
            <div className="row inside-manage-skills justify-content-center">
              <div className="col inside-manage-skills-number">
                {data.intermediate}
              </div>
              <div className="col inside-manage-skills-text">Intermediate</div>
            </div>
          </div>
          <div
            style={{ width: 0, height: "22px", border: "1px solid black" }}
          ></div>
          <div className="col-4">
            <div className="row inside-manage-skills justify-content-center">
              <div className="col inside-manage-skills-number">
                {data.advanced}
              </div>
              <div className="col inside-manage-skills-text">Advanced</div>
            </div>
          </div>
        </div>
{/* >>>>>>> f4a23977b3ff118e9d924d3c1bfe5d5d5217e70e */}
      </div>
      <AddNewSkillTest />
    </>
  );
}
