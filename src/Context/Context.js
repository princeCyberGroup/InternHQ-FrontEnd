import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();
const Context = (props) => {
  const [score, setScore] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(
    parseInt(localStorage.getItem("elapsedTimeMain")) || 0
  );
  const [projectApiData, setProjectApiData] = useState();
  const [startTime, setStartTime] = useState(
    localStorage.getItem("startTime")
      ? parseInt(localStorage.getItem("startTime"))
      : null
  );
  const [idea, setIdea] = useState([]);
  const [project, setProject] = useState([]);
  useEffect(() => {
    let interval;
    let timerStartTime;

    if (isRunning) {
      if (isPaused) {
        clearInterval(interval);
      } else {
        timerStartTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
          const currentElapsedTime = Date.now() - timerStartTime;
          setElapsedTime(currentElapsedTime);
          localStorage.setItem(
            "elapsedTimeMain",
            currentElapsedTime.toString()
          );
        }, 1000);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  useEffect(() => {
    if (!isRunning && elapsedTime === 0) {
      localStorage.removeItem("elapsedTimeMain");
    }
  }, [isRunning, elapsedTime]);

  useEffect(() => {
    const storedElapsedTime = parseInt(localStorage.getItem("elapsedTimeMain"));
    if (isRunning && !isPaused && !isNaN(storedElapsedTime)) {
      setElapsedTime(storedElapsedTime);
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          score,
          setScore,
          isRunning,
          setIsRunning,
          isPaused,
          setIsPaused,
          elapsedTime,
          setElapsedTime,
          projectApiData,
          setProjectApiData,
          startTime,
          setStartTime,
          idea,
          setIdea,
          project,
          setProject,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default Context;
