import AddNewIdea from "./Idea/AddNewIdea";
import React, { useEffect, useState, useContext } from "react";
import AddProject from "./Project/AddProject";
import "./ProjectComponent.css";
import "./Idea/AddNewIdea.css";
import "./Project/AddProject.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/Context";
import CryptoJS from "crypto-js";

const ProjectComponent = () => {
  const navigate = useNavigate();
  const { setIdea, setProject } = useContext(UserContext);
  const [pActive, setPActive] = useState(true);
  // const [projectData, setProjectData] = useState([]);
  // const [projectApiData, setProjectApiData] = useState();
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  var parsedObject;
  const data = localStorage.getItem("userData");
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }
  const userId = parsedObject.userId;

  const MyIdeaComponent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          `/api/v3/getProjectIdea?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );

      setIdea(response.data.response);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (error.response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (error.response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (error.response.status === 404) {
        navigate("/error/statusCode=404");
      }
      console.log(error.response?.data.msg);
    }
  };
  const ProjectApi = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v3/getProject?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );

      setProject(response.data.response);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (error.response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (error.response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (error.response.status === 404) {
        navigate("/error/statusCode=404");
      }
      console.log(error.response?.data.msg);
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
          <div className="card-title dtt-hfs-abc m-0 d-flex  d-flex justify-content-center align-item-center">
            <div
              className={"project-idea-btn " + (pActive ? " p-active" : "")}
              onClick={() => {
                setPActive(true);
              }}
            >
              <button className="btn-1 p-0">My Idea</button>
            </div>
            <div
              className={"project-btn" + (pActive ? " " : " p-active")}
              onClick={() => {
                setPActive(false);
              }}
            >
              <button className="btn-2 p-0">Project</button>
            </div>
          </div>
        </div>
        {pActive ? <AddNewIdea /> : <AddProject />}
      </div>
    </>
  );
};
export default ProjectComponent;
