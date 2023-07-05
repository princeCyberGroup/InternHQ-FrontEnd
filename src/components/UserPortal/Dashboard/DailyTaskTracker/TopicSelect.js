import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../Context/Context";


const cgData = [
  "Angular",
  "React",
  ".Net",
  "C Sharp",
  "Salesforce",
  "MSSQL",
  "JavaScript",
  "Azure",
];



const TopicSelect = (props) => {
    const {projectApiData,setProjectApiData}=useContext(UserContext);
  const { onChange, disabled, resetSelect, learningType, topicName } = props;
  const [topics, setTopics] = useState([]);
  const [myProjects, setMyProjects]=useState();


  useEffect(() => {
    Projects();
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL+"/api/v2/getAllTechnology",
        {
          headers: {
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
          },
        }
      );
      setTopics(response.data.response.sort((a, b) => {
        const nameA = a.techName.toUpperCase();
        const nameB = b.techName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0; // names are equal
      }));
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };


const storedObject = localStorage.getItem("userData");
  const parsedObject = JSON.parse(storedObject);
  const userId = parsedObject.userId;
  const Projects = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL+`/api/v2/getProject?userId=${userId}`,
        {
          headers: {
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
          },
        }
      );

      setMyProjects(response.data.response);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };


  const learningTypeSelected = (val) => {
    switch (val) {
      case "CG Learning Videos":
        return (
          <>
            <label htmlFor="topic" className="form-label dtt-t">
              Topic <span style={{ color: 'red' }}>*</span>
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
              Task Name <span style={{ color: 'red' }}>*</span>
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
              Project Name <span style={{ color: 'red' }}>*</span>
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
              {myProjects?.length===0 ? (<option value="default" disabled >
                No Project Added
              </option>) : myProjects?.map((topic, index) => (
                <option className="dtt-opns" key={index} value={topic.projectNames}>
                  {topic.projectNames}
                </option>
              ))}
            </select>
          </>
        );

        case "Session":
        return (
          <>
            <label htmlFor="topic" className="form-label dtt-t">
              Session Name <span style={{ color: 'red' }}>*</span>
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
              Topic <span style={{ color: 'red' }}>*</span>
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
