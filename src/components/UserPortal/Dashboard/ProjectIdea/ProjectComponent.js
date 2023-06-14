import  AddNewIdea  from "./Idea/AddNewIdea";
import React, { useEffect, useState, useContext } from "react";
import AddProject  from "./Project/AddProject";
import "./ProjectComponent.css";
import "./Idea/AddNewIdea.css";
import "./Project/AddProject.css";
import axios from "axios";
import { UserContext } from "../../../../Context/Context";

export const AddNewProjectComponent = () => {
  const [pActive, setPActive] = useState(true);
  const [projectData, setProjectData] = useState([]);
  // const [projectApiData, setProjectApiData] = useState();
  const {projectApiData,setProjectApiData}=useContext(UserContext);
  const storedObject = localStorage.getItem("userData");
  const parsedObject = JSON.parse(storedObject);
  const userId = parsedObject.userId;
  
  const MyIdeaComponent = async () => {
    try {
      const response = await axios.get(
        `https://cg-interns-hq.azurewebsites.net/getProjectIdea?userId=${userId}`
      );

      setProjectData(response.data.response);
    } catch (error) {
      console.log("Error ",error.response?.data);
      // console.log(error.response?.data.msg);
    }
  };
  const ProjectApi = async () => {
    try {
      const response = await axios.get(
        `https://cg-interns-hq.azurewebsites.net/getProject?userId=${userId}`
      );

      setProjectApiData(response.data.response);
    } catch (error) {
      // console.log(error.response?.data);
      // console.log(error.response?.data.msg);
    }
  };
  useEffect(() => {
    ProjectApi();
    MyIdeaComponent();
  }, []);
  return (
    <>
      <div className="card whole-card-wrapper px-0">
        <div className="border-bottom">
          <div className="card-title dtt-hfs-abc m-0 d-flex  d-flex justify-content-center align-item-center ">
            <div
              className={"project-idea-btn pe-auto" + (pActive ? " p-active" : "")}
              onClick={() => {
                setPActive(true);
              }}
            >
              <button className="btn-1 p-0">My Idea</button>
            </div>
            <div
              className={"project-btn pe-auto" + (pActive ? " " : " p-active")}
              onClick={() => {
                setPActive(false);
              }}
            >
              <button className="btn-2 p-0">Project</button>
            </div>
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
};
