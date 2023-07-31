import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const cgData = [
  "Angular",
  "React",
  "DotNet",
  "CSharp",
  "Salesforce",
  "MsSQL",
  "JavaScript",
  "Azure",
];

const TopicSelect = (props) => {
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
  const { onChange, disabled, resetSelect, learningType, topicName } = props;
  const [topics, setTopics] = useState([]);
  const [myProjects, setMyProjects] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Projects();
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v3/getAllTechnology",
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      setTopics(
        response.data?.response.sort((a, b) => {
          const nameA = a.techName.toUpperCase();
          const nameB = b.techName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0; // names are equal
        })
      );
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
      console.error("Error fetching topics:", error);
    }
  };

  const userId = parsedObject.userId;
  const Projects = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v3/getProject?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );

      setMyProjects(response.data.response);
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
      console.error("Error fetching projects:", error);
    }
  };

  const learningTypeSelected = (val) => {
    switch (val) {
      case "CG Learning Videos":
        return (
          <>
            <label htmlFor="topic" className="form-label dtt-t">
              Topic <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-select dtt-selector"
              key={resetSelect ? "topicReset" : "topicName"}
              disabled={disabled}
              value={topicName}
              onChange={onChange}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Topic
              </option>
              {cgData.map((topic, index) => (
                <option className="dtt-opns" key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </>
        );

      case "Mentor Assigned Task":
        return (
          <>
            <label htmlFor="topic" className="form-label dtt-t">
              Task Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="taskName"
              disabled={disabled}
              value={topicName}
              className="form-control dtt-selector"
              placeholder="Enter Task Name"
              onChange={onChange}
            />
          </>
        );

      case "Project":
        return (
          <>
            <label htmlFor="topic" className="form-label dtt-t">
              Project Name <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-select dtt-selector"
              key={resetSelect ? "topicReset" : "topicName"}
              disabled={disabled}
              value={topicName}
              onChange={onChange}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Project
              </option>
              {myProjects?.length === 0 ? (
                <option value="default" disabled>
                  No Project Added
                </option>
              ) : (
                myProjects?.map((topic, index) => (
                  <option
                    className="dtt-opns"
                    key={index}
                    value={topic.projectNames}
                  >
                    {topic.projectNames}
                  </option>
                ))
              )}
            </select>
          </>
        );

      case "Session":
        return (
          <>
            <label htmlFor="topic" className="form-label dtt-t">
              Session Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="taskName"
              disabled={disabled}
              value={topicName}
              className="form-control dtt-selector"
              placeholder="Enter Session Name"
              onChange={onChange}
            />
          </>
        );

      default:
        return (
          <>
            <label htmlFor="topic" className="form-label dtt-t">
              Topic <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-select dtt-selector"
              key={resetSelect ? "topicReset" : "topicName"}
              disabled={disabled}
              onChange={onChange}
              value={topicName}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Topic
              </option>
              {topics.sort().map((topic) => (
                <option
                  className="dtt-opns"
                  key={topic.techId}
                  value={topic.techName}
                >
                  {topic.techName}
                </option>
              ))}
            </select>
          </>
        );
    }
  };

  return learningTypeSelected(learningType);
};

export default TopicSelect;
