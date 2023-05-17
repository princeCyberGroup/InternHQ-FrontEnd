import { AddNewIdea } from './AddNewIdea';
import React, { useState } from 'react';
import { AddProject } from './AddProject';
import './ProjectComponent.css';
import './AddProject.css';
import './AddNewIdea.css';

export const AddNewProjectComponent = () => {


    const [pActive, setPActive] = useState(true);

    const setProjectScreenType = (input) => {
        console.log("Working")
    }



    return (
        <>
            <div class="card">
                <div class="card-header-1  d-flex  d-flex justify-content-center align-item-center ">
                    <div className={"project-idea-btn" + (pActive ? " p-active" : "")}>
                        <button
                            class="btn-1 p-0"
                            onClick={() => {
                                setPActive(true);
                            }}
                        >
                            Project Idea
                        </button>
                    </div>
                    <div className={"project-btn" + (pActive ? " " : " p-active")}>
                        <button
                            class="btn-2 p-0"
                            onClick={() => {
                                setPActive(false);
                            }}
                        >
                            Project
                        </button>
                    </div>
                </div>
                {pActive ? (
                    <AddNewIdea />
                ) : (
                    <AddProject />
                )}
            </div>
        </>
    );
}