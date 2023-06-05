import { AddNewIdea } from './AddNewIdea';
import React, { useEffect, useState } from 'react';
import { AddProject } from './AddProject';
import './ProjectComponent.css';
import './AddProject.css';
import './AddNewIdea.css';
import axios from "axios";
import { ProjectIdeaApi } from "./ProjectIdeaApi";

export const AddNewProjectComponent = () => {


    const [pActive, setPActive] = useState(true);
    const [projectData, setProjectData] = useState(ProjectIdeaApi)
    const [projectApiData, setProjectApiData] = useState()
    // const userId=1;

    const MyIdeaComponent = async () => {
        try {
            const response = await axios.get("https://cg-interns-hq.azurewebsites.net/getProjectIdea?userId=1");
            setProjectData(response.data.response);
        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.data.msg);
        }
    }
    const ProjectApi = async () => {
        try {
            const response = await axios.get("https://cg-interns-hq.azurewebsites.net/getProject?userId=1");
            setProjectApiData(response.data.response);
        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.data.msg);
        }
    }
    useEffect(() => {
        ProjectApi();
        MyIdeaComponent();
    }, []);
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
                            My Idea
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
                    <AddNewIdea projectDescript={projectData} />
                ) : (
                    <AddProject projectApiDataa={projectApiData} />
                )}
            </div>
        </>
    );
}