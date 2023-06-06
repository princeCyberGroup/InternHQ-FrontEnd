import React, { useState, useEffect } from "react";
import "./DailyTaskTracker.css";
import { ReactComponent as Tick } from "./tick.svg";
import axios from "axios";
import { ReactComponent as Play} from "./time trackingplay.svg"
import { ReactComponent as Pause} from "./time trackingpause.svg"
import { ReactComponent as Stop} from "./time trackingstop.svg"
import { ReactComponent as StopD} from "./time trackingStopDisabled.svg"
import { ReactComponent as PlayD} from "./time trackingStartDisabled.svg"


const learningTypeOptions = [
  "CG Learning Videos",
  "Self Learning",
  "Mentor Assigned Task",
  "Project",
];
const topics = ["React", "Angular", "C# .Net", "AWS", "Azure", "JavaScript", "Salesforce"];


const DailyTaskTracker = () => {
  const [learningType, setLearningType] = useState(localStorage.getItem("learningType") || "");
  const [topicName, setTopicName] = useState(localStorage.getItem("topicName") || "");
  const [isRunning, setIsRunning] = useState( localStorage.getItem("isRunning") || false);
  const [startTime, setStartTime] = useState( localStorage.getItem("startTime") ? parseInt(localStorage.getItem("startTime")) : null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [comments, setComments] = useState(localStorage.getItem("comments") || "");
  const [comDisabled, setComDisabled] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [stopBtnDisabled, setStopBtnDisabled] = useState(true);
  const [resetSelect, setResetSelect] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const[firstCount,setFirstCount] = useState(true);

  // useEffect(() => {
  //   let interval;
  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setElapsedTime(Date.now() - startTime);
  //     }, 1);
  //   }
  //   return () => clearInterval(interval);
  // }, [isRunning, startTime]);

  // useEffect(() => {
  //   let interval;
  //   if (isRunning && !isPaused) {
  //     interval = setInterval(() => {
  //       setElapsedTime(Date.now() - startTime);
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [isRunning, isPaused, startTime]);



  useEffect(() => {
    let interval;
    let timerInterval;
  
    if (isRunning) {
      if (isPaused) {
        clearInterval(timerInterval);
      } else {
        const timerStartTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
          setElapsedTime(Date.now() - timerStartTime);
        }, 1000);
      }
    }
  
    return () => {
      clearInterval(interval);
      clearInterval(timerInterval);
    };
  }, [isRunning, isPaused, elapsedTime]);


  useEffect(() => {
    if (learningType && topicName) {
      setBtnDisabled(false);
    }
  }, [learningType, topicName]);

  useEffect(() => {
    if (comments.length >= 150) {
      setStopBtnDisabled(false);
    }
  }, [comments]);

  // useEffect(() => {
  //   const disabledState = localStorage.getItem('disabled');
  //   if (disabledState === 'true') {
  //     setDisabled(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   const isRunningState = localStorage.getItem('isRunning');
  //   if (isRunningState === 'true') {
  //     setIsRunning(true);
  //   }
  // }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('taskData');
    if (storedData) {
      const { isRunning, disabled, comDisabled, learningType, topicName, comments, startTime } = JSON.parse(storedData);
      setIsRunning(isRunning);
      setDisabled(disabled);
      setComDisabled(comDisabled)
      setLearningType(learningType);
      setTopicName(topicName);
      setComments(comments);
      setStartTime(startTime);
    }
  }, []);

  useEffect(() => {
    const taskData = JSON.stringify({ isRunning, disabled, comDisabled, learningType, topicName, comments, startTime });
    localStorage.setItem('taskData', taskData);
  }, [isRunning, disabled, comDisabled, learningType, topicName, comments, startTime]);

  // useEffect(() => {
  //   const selectedLearningType = localStorage.getItem("selectedLearningType");
  //   if (selectedLearningType) {
  //     setLearningType(selectedLearningType);
  //   }
  // }, []);

  var userId = 30;

  const sendStartDataToBackend = async () => {
    try {
      const response = await axios.post("https://cg-interns-hq.azurewebsites.net/dailyTaskTrackerStart", {
        userId,
        learningType,
        topicName,
      })
      localStorage.setItem("token",response.data.token);
      console.log(response.data.token);
      ;
      console.log("Data sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const sendStopDataToBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://cg-interns-hq.azurewebsites.net/dailyTaskTrackerEnd", {
        comments
      },{headers:{
        Authorization:`Bearer ${token}`,
      }});
      console.log("Data sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };


  const handleStop = () => {
    //A function for sending data to backend
    sendStopDataToBackend();

    setFirstCount(true);
    if (isPaused) {
      setIsPaused(false); // Resume the timer
    }
    setIsRunning(false);
    setDisabled(false);
    setComDisabled(true);
    setResetSelect((val) => {
      return !val;
    });

    setElapsedTime(0);
    setBtnDisabled(true);
    setStopBtnDisabled(true);
    setComments("");
    setLearningType("");
    setTopicName("");


    // localStorage.removeItem('isRunning'); // Remove the isRunning state from local storage
    // localStorage.removeItem('disabled'); // Remove the disabled state from local storage
    // localStorage.removeItem("startTime");
    // localStorage.removeItem("learningType");
    // localStorage.removeItem("topic");
  };

  const handlePause = () => {
    setIsPaused(true);
    setComDisabled(false);
  }

  const handleStart = () => {
    // setComDisabled(false);
    // setDisabled(true);
    // setIsRunning(true);
    // setStartTime(Date.now());
    // setElapsedTime(0);
    // setStopBtnDisabled(true);

    if(firstCount){
      sendStartDataToBackend();
      setFirstCount(false);
    }

    setComDisabled(true);
    setDisabled(true);
    // setStopBtnDisabled(true);
  
    if (isRunning) {
      setIsPaused(!isPaused);
      // setComDisabled(true);
    } else {
      if (isPaused) {
        // setComDisabled(false);
        const timerStartTime = Date.now() - elapsedTime;
        setStartTime(Date.now() - elapsedTime);
        const timerInterval = setInterval(() => {
          setElapsedTime(Date.now() - timerStartTime);
        }, 1000);

        setIsRunning(true);
        setIsPaused(false);
      } else {
        // setComDisabled(false);
        setStartTime(Date.now());
        setIsRunning(true);
        setElapsedTime(0);
      }
    }


    // localStorage.setItem('isRunning', true); // Store the isRunning state in local storage
    // localStorage.setItem('disabled', true);
    // localStorage.setItem("learningType", learningType);
    // localStorage.setItem("topic", topic);
    // localStorage.setItem("startTime", Date.now().toString());


  };

  const onLearningChange = (e) => {
    setLearningType(e.target.value);
  };

  const onTopicChange = (e) => {
    setTopicName(e.target.value);
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
      {/* <div className="tracker border p-0"> */}
        <div className="tracker border card-body p-0">
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
              value={learningType}
              onChange={(e) => onLearningChange(e)}
            >
              <option value="" disabled selected hidden>
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
              key={resetSelect ? "topicReset" : "topicName"}
              disabled={disabled}
              className="form-select dtt-selector"
              id="topic"
              aria-label=""
              value={topicName}
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
              disabled={comDisabled} // Add the disabled attribute
            ></textarea>
          </div>


          <div className="d-flex align-items-center justify-content-end dtt-gap ">

            <p className="dtt-timer" >{formatTime(elapsedTime)}</p>
            <div className="d-flex align-items-center justify-content-center iconGap ">
            <p>
              {isRunning && !isPaused ? (
                <Pause
                onClick={handlePause}
                // onClick={() => setIsPaused(true)} // Pause the timer
                />
                // <button
                //   // disabled={isRunning ? stopBtnDisabled : btnDisabled}
                //   className="dtt-button-pause"
                //   // data-bs-toggle="modal"
                //   // data-bs-target="#exampleModal1"
                //   // onClick={handlePause}
                // >
                //   Pause
                // </button>
              ) : (
                btnDisabled ? <PlayD/> :
                <Play
                // disabled={isRunning ? stopBtnDisabled : btnDisabled}
                onClick={btnDisabled ? null : handleStart}
                />
                // <button
                //   disabled={isRunning ? stopBtnDisabled : btnDisabled}
                //   className="dtt-button-start"
                //   onClick={handleStart}
                // >
                //   Start
                // </button>
              )}
            </p>
            <p>
              {stopBtnDisabled ? (<StopD/>) :
              (<Stop
                // disabled={isRunning ? stopBtnDisabled : btnDisabled}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
                onClick={stopBtnDisabled ? null : handleStop}
              />
              )}
              
            {/* <button
                  disabled={isRunning ? stopBtnDisabled : btnDisabled}
                  className="dtt-button-stop"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                  onClick={handleStop}
                >
                  Stop
                </button> */}
            </p>
            </div>

            {/* SUCCESS MODAL */}
            <div
              className="modal fade"
              id="exampleModal1"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content sSize">
                  <div className="row crossBtn">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="row tick">
                    <Tick />
                  </div>
                  <div className="row l1">
                    <p>
                      Record Saved!
                    </p>
                  </div>
                  <div className="row l2">
                    <p>
                      We Have Successfully Saved Your Record.
                    </p>
                  </div>
                  <div
                    className="row continue"
                  >
                    <button
                      type="button"
                      className="continueBtn"
                      data-bs-dismiss="modal"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default DailyTaskTracker;

// ORIGINAL CODE UP




// import React, { useState, useEffect } from "react";
// import "./DailyTaskTracker.css";
// import { ReactComponent as Tick } from "./tick.svg";
// import Congo from "../../SkillManagement/Modals/Congo";
// import Sorry from "../../SkillManagement/Modals/Sorry";

// const learningTypeOptions = [
//   "CG Learning Videos",
//   "Self Learning",
//   "Mentor Assigned Task",
//   "Project",
// ];
// const topics = ["React", "Angular", "C# .Net", "AWS", "Azure", "JavaScript", "Salesforce"];

// const DailyTaskTracker = () => {
//   const [learningType, setLearningType] = useState("");
//   const [topic, setTopic] = useState("");
//   const [isRunning, setIsRunning] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [comments, setComments] = useState("");
//   const [disabled, setDisabled] = useState(false);
//   const [btnDisabled, setBtnDisabled] = useState(true);
//   const [stopBtnDisabled, setStopBtnDisabled] = useState(true);
//   const [resetSelect, setResetSelect] = useState(false);

//   useEffect(() => {
//     const storedStartTime = localStorage.getItem("startTime");
//     const storedElapsedTime = localStorage.getItem("elapsedTime");

//     if (storedStartTime && storedElapsedTime && isRunning) {
//       const currentTime = Date.now();
//       const storedTime = parseInt(storedStartTime, 10);
//       const storedElapsed = parseInt(storedElapsedTime, 10);
//       const timeDifference = currentTime - storedTime;
//       const updatedElapsedTime = storedElapsed + timeDifference;
//       setElapsedTime(updatedElapsedTime);
//     }

//     if (isRunning) {
//       setStartTime(Date.now());
//       localStorage.setItem("startTime", Date.now().toString());
//     }
//   }, [isRunning]);

//   useEffect(() => {
//     const storedLearningType = localStorage.getItem("learningType");
//     const storedTopic = localStorage.getItem("topic");

//     if (storedLearningType && storedTopic) {
//       setLearningType(storedLearningType);
//       setTopic(storedTopic);
//     }
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (isRunning) {
//       interval = setInterval(() => {
//         setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
//         localStorage.setItem("elapsedTime", (elapsedTime + 1000).toString());
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning, elapsedTime]);

//   useEffect(() => {
//     if (learningType && topic) {
//       setBtnDisabled(false);
//       localStorage.setItem("learningType", learningType);
//       localStorage.setItem("topic", topic);
//     }
//   }, [learningType, topic]);

//   useEffect(() => {
//     if (comments.length >= 150) {
//       setStopBtnDisabled(false);
//     }
//   }, [comments]);

//   const handleStop = () => {
//     //A function for sending data to backend

//     setIsRunning(false);
//     setDisabled(false);
//     setResetSelect((val) => {
//       return !val;
//     });

//     setElapsedTime(0);
//     setBtnDisabled(true);
//     setComments("");
//     setLearningType("");
//     setTopic("");

//     localStorage.removeItem("startTime");
//     localStorage.removeItem("elapsedTime");
//     localStorage.removeItem("learningType");
//     localStorage.removeItem("topic");
//   };

//   const handleStart = () => {
//     setDisabled(true);
//     setIsRunning(true);
//   };

//   const onLearningChange = (e) => {
//     setLearningType(e.target.value);
//   };

//   const onTopicChange = (e) => {
//     setTopic(e.target.value);
//   };

//   const formatTime = (timeInMs) => {
//     const totalSeconds = Math.floor(timeInMs / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
//     const seconds = totalSeconds - hours * 3600 - minutes * 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <>
//       <div className="tracker border card-body p-0">
//         <div className="border-bottom ">
//           <h5 className="card-title dtt-hfs">Daily Task Tracker</h5>
//         </div>
//         <div>
//           <label htmlFor="learning" className="form-label mt-3 dtt-lt">
//             Learning Type
//           </label>
//           <select
//             key={resetSelect ? "learningTypeReset" : "learningType"}
//             disabled={disabled}
//             className="form-select dtt-selector"
//             id="learning"
//             aria-label=""
//             onChange={(e) => onLearningChange(e)}
//             value={learningType}
//           >
//             <option value="default" disabled hidden>
//               Select learning type
//             </option>
//             {learningTypeOptions.map((option) => (
//               <option className="dtt-opns" key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="topic" className="form-label dtt-t">
//             Topic
//           </label>
//           <select
//             key={resetSelect ? "topicReset" : "topic"}
//             disabled={disabled}
//             className="form-select dtt-selector"
//             id="topic"
//             aria-label=""
//             onChange={(e) => onTopicChange(e)}
//             value={topic}
//           >
//             <option value="" disabled hidden>
//               Select Topic
//             </option>
//             {topics.map((option) => (
//               <option className="dtt-opns" key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label htmlFor="comments" className="form-label dtt-t">
//             Comments
//           </label>
//           <textarea
//             placeholder="Type comments (Minimum 150 characters)"
//             id="comments"
//             className="form-control dtt-text"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           ></textarea>
//         </div>

//         <div className="d-flex align-items-center justify-content-end dtt-gap ">
//           <p className="dtt-timer">{formatTime(elapsedTime)}</p>
//           <p>
//             {isRunning ? (
//               <button
//                 disabled={isRunning ? stopBtnDisabled : btnDisabled}
//                 className="dtt-button-stop"
//                 data-bs-toggle="modal"
//                 data-bs-target="#exampleModal1"
//                 onClick={handleStop}
//               >
//                 Stop
//               </button>
//             ) : (
//               <button
//                 disabled={isRunning ? stopBtnDisabled : btnDisabled}
//                 className="dtt-button-start"
//                 onClick={handleStart}
//               >
//                 Start
//               </button>
//             )}
//           </p>
//         </div>

//         {/* SUCCESS MODAL */}
//         <div
//           className="modal fade"
//           id="exampleModal1"
//           tabIndex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content sSize">
//               <div className="row crossBtn">
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="row tick">
//                 <Tick />
//               </div>
//               <div className="row l1">
//                 <p>Record Saved!</p>
//               </div>
//               <div className="row l2">
//                 <p>We Have Successfully Saved Your Record.</p>
//               </div>
//               <div className="row continue">
//                 <button
//                   type="button"
//                   className="continueBtn"
//                   data-bs-dismiss="modal"
//                 >
//                   Continue
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DailyTaskTracker;
