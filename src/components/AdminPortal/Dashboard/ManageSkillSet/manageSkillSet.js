import '../ManageSkillSet/manageSkillSet.css'
import React from 'react';
import { ReactComponent as Add } from "../Assets/add.svg"

// import { ReactComponent as Pipe } from "../Assets/pipe.svg"
export default function ManageSkillSet ({data}){
    return(
<>
<div className='about'>Manage Skill Set</div>
<div className='row'>
            <div className='add-new-skill-test col-3'>
              <Add /> Add New Skill Test
            </div>

            <div className='beg-int-advance col-5 d-flex' >
              <div className='col-4'>
                <div className='row inside-manage-skills'>
                  <div className='col inside-manage-skills-number'>{data.beginner}</div>
                  <div className='col inside-manage-skills-text'>Beginner </div>
                </div>
              </div>
              <div style={{width:0, height:"22px", border:"1px solid black"}}></div>
              <div className='col-4'>
                <div className='row inside-manage-skills justify-content-center'>
                  <div className='col inside-manage-skills-number'>{data.intermediate}</div>
                  <div className='col inside-manage-skills-text'>Intermediate</div>
                </div>
              </div>
              <div style={{width:0, height:"22px", border:"1px solid black"}}></div>
              <div className='col-4'>
                <div className='row inside-manage-skills'>
                  <div className='col inside-manage-skills-number'>{data.advanced}</div>
                  <div className='col inside-manage-skills-text'>Advanced</div>
                </div>
              </div>
            </div>
          </div></>
    );
}