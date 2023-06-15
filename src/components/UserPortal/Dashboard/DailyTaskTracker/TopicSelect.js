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

    if(projectApiData){
    var arr =[];
    for (var i=0; i<projectApiData.length; i++){
        arr.push(projectApiData[i].projectNames)
    }
   
}
  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(
        "https://cg-interns-hq.azurewebsites.net/getAllTechnology"
      );
      setTopics(response.data.response);
    } catch (error) {
      console.error("Error fetching topics:", error);
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
              {arr.length===0 ? (<option value="default" disabled >
                No Project Added
              </option>) : arr?.map((topic, index) => (
                <option className="dtt-opns" key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
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
              {topics.map((topic) => (
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
