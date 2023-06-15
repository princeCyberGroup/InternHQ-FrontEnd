import React from 'react'
import AssignTask from './AssignTask/AssignTask';
import MentorList from './MentorList/AdminMentorList';

const Task = () => {
  return (
    <>
    
    <>
    <div className="mainDiv">
        <div class="container-fluid ">
            <div class="row mt-4">
                <div class=" col-md-8 p-0 ">
                    <AssignTask />
                </div>
                <div class=" col-md-4 p-0 skill-added-card">
                    <MentorList />
                </div>
            </div>
        </div>
        </div>
    </>
   
    </>
);
}

export default Task