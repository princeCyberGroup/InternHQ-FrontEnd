import React, { useState, useEffect } from "react";
import "./DailyTaskTracker.css";

const learningTypeOptions = [
  "CG Learning Video",
  "Self Learning",
  "Mentor Assigned Task",
  "Project",
];
const topics = ["React", "Angular", "DotNet", "SQL"];

const DailyTaskTracker = () => {
  const [learningType, setLearningType] = useState();
  const [topic, setTopic] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [comments, setComments] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [stopBtnDisabled, setStopBtnDisabled] = useState(true);
  const [resetSelect, setResetSelect] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  useEffect(() => {
    if (learningType && topic) {
      setBtnDisabled(false);
    } 
  }, [learningType, topic]);

  useEffect(() => {
    if (comments.length >= 150) {
      setStopBtnDisabled(false);
    } 
  }, [comments]);

  useEffect(() => {
    const selectedLearningType = localStorage.getItem('selectedLearningType');
    if (selectedLearningType) {
      setLearningType(selectedLearningType);
    }
  }, []);

  const handleStartStop = () => {
    if (isRunning) {
      //A function for sending data to backend
      
      
      setIsRunning(false);
      setDisabled(false);
      setResetSelect((val) => {
        return !val;
      });
      setElapsedTime(0);
      setBtnDisabled(true);
      setComments("");

    } else {
      setDisabled(true);
      setIsRunning(true);
      setStartTime(Date.now());
      setElapsedTime(0);
      setStopBtnDisabled(true);
    }
  };

  const onLearningChange = (e) => {
    setLearningType(e.target.value);
  };

  const onTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const formatTime = (timeInMs) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
          <div className="tracker border p-0">
            <div className="card-body p-0">
              <div className="border-bottom ">
                <h5 className="card-title dtt-hfs ">Daily Task Tracker</h5>
              </div>
              <div>
                <label htmlFor="learning" className="form-label mt-3 dtt-lt">
                  Learning Type
                </label>
                <select
                  key={resetSelect ? "learningTypeReset" : "learningType"}
                  disabled={disabled}
                  className="form-select dtt-selector "
                  id="learning"
                  aria-label=""
                  onChange={(e) => onLearningChange(e)}
                >
                  <option value="default" disabled selected hidden>
                    Select learning type
                  </option>
                  {learningTypeOptions.map((option) => (
                    <option className="dtt-opns" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="topic" className="form-label dtt-t">
                  Topic
                </label>
                <select
                  key={resetSelect ? "topicReset" : "topic"}
                  disabled={disabled}
                  className="form-select dtt-selector"
                  id="topic"
                  aria-label=""
                  onChange={(e) => onTopicChange(e)}
                >
                  <option value="" disabled selected hidden>
                    Select Topic
                  </option>
                  {topics.map((option) => (
                    <option className="dtt-opns" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="comments" className="form-label dtt-t">
                  Comments
                </label>
                <textarea
                  placeholder="Type comments (Minimum 150 characters)"
                  id="comments"
                  className="form-control dtt-text"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>

              <div className="d-flex align-items-center justify-content-end dtt-gap ">
                <p className="dtt-timer">{formatTime(elapsedTime)}</p>
                <p>
                  <button
                    disabled={isRunning ? stopBtnDisabled : btnDisabled}
                    className={` ${
                      isRunning ? "dtt-button-stop" : "dtt-button-start"
                    }`}
                    onClick={handleStartStop}
                  >
                    {isRunning ? "Stop" : "Start"}
                  </button>
                </p>
              </div>
            </div>
          </div>
    </>
  );
};

export default DailyTaskTracker;
