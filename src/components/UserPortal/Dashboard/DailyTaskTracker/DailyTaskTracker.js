import React, { useState, useEffect, useContext } from "react";
import CryptoJS, { AES, enc } from "crypto-js";
import "./DailyTaskTracker.css";
import { ReactComponent as Tick } from "../../../../Assets/tick.svg";
import axios from "axios";
import { ReactComponent as Play } from "../../../../Assets/time trackingplay.svg";
import { ReactComponent as Pause } from "../../../../Assets/time trackingpause.svg";
import { ReactComponent as Stop } from "../../../../Assets/time trackingstop.svg";
import { ReactComponent as StopD } from "../../../../Assets/time trackingStopDisabled.svg";
import { ReactComponent as PlayD } from "../../../../Assets/time trackingStartDisabled.svg";
import { useNavigate } from "react-router";
import { UserContext } from "../../../../Context/Context";
import TopicSelect from "./TopicSelect";

const learningTypeOptions = [
  "CG Learning Videos",
  "Self Learning",
  "Mentor Assigned Task",
  "Project",
  "Session",
];

const secretKey = process.env.REACT_APP_SECRET_KEY;

const MAX_COMMENT_LENGTH = 150;

const DailyTaskTracker = () => {
  const {
    isRunning,
    setIsRunning,
    isPaused,
    setIsPaused,
    elapsedTime,
    setElapsedTime,
    startTime,
    setStartTime,
  } = useContext(UserContext);

  const [learningType, setLearningType] = useState(
    localStorage.getItem("learningType") || ""
  );
  const [topicName, setTopicName] = useState(
    localStorage.getItem("topicName") || ""
  );
  const [comments, setComments] = useState(
    localStorage.getItem("comments") || ""
  );
  const [comDisabled, setComDisabled] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [stopBtnDisabled, setStopBtnDisabled] = useState(true);
  const [resetSelect, setResetSelect] = useState(false);

  const [firstCount, setFirstCount] = useState(true);
  const [commentLength, setCommentLength] = useState(comments.length);
  const [pauseClickCount, setPauseClickCount] = useState(0);

  const navigate = useNavigate();

  const handleBeforeUnload = (e) => {
    if (isRunning) {
      // Cancel the event
      e.preventDefault();

      // Chrome requires the returnValue property to be set
      e.returnValue =
        "You have an active timer. Are you sure you want to leave this page?";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (learningType && topicName) {
      setBtnDisabled(false);
    }
  }, [learningType, topicName]);

  useEffect(() => {
    const commentsWithoutSpaces = comments.replace(/\s/g, ""); // Remove spaces from the comments
    if (commentsWithoutSpaces.length >= MAX_COMMENT_LENGTH) {
      setStopBtnDisabled(false);
    } else {
      setStopBtnDisabled(true);
    }
  }, [comments]);

  useEffect(() => {
    const encryptedData = localStorage.getItem("tD8kFi5j");
    if (encryptedData) {
      const decryptedData = AES.decrypt(encryptedData, secretKey).toString(
        enc.Utf8
      );
      if (decryptedData) {
        const {
          isRunning,
          disabled,
          comDisabled,
          learningType,
          topicName,
          comments,
          startTime,
          elapsedTime,
          isPaused,
          pauseClickCount,
          firstCount,
        } = JSON.parse(decryptedData);
        setIsRunning(isRunning);
        setDisabled(disabled);
        setComDisabled(comDisabled);
        setLearningType(learningType);
        setTopicName(topicName);
        setComments(comments);
        setStartTime(startTime);
        setElapsedTime(elapsedTime);
        setIsPaused(isPaused);
        setPauseClickCount(pauseClickCount);
        setFirstCount(firstCount);
      }
    }
  }, []);

  useEffect(() => {
    const tD8kFi5j = JSON.stringify({
      isRunning,
      disabled,
      comDisabled,
      learningType,
      topicName,
      comments,
      startTime,
      elapsedTime,
      isPaused,
      pauseClickCount,
      firstCount,
    });
    const encryptedData = AES.encrypt(tD8kFi5j, secretKey).toString();
    localStorage.setItem("tD8kFi5j", encryptedData);
  }, [isRunning, startTime, elapsedTime, isPaused, comments]);

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
  var userId = parsedObject.userId;
  const sendStartDataToBackend = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v3/dailyTaskTrackerStartCheck",
        {
          userId,
          learningType,
          topicName,
        }
      );
      localStorage.setItem("DTT-token", response.data.token);
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
      console.error("Error sending start data to backend:", error);
    }
  };

  const sendPauseDataToBackend = async () => {
    try {
      const dttToken = localStorage.getItem("DTT-token");
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v3/dailyTaskTrackerPauseCheck",
        {},
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${dttToken}`,
          },
        }
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
      console.error("Error sending pause data to backend:", error);
    }
  };

  const sendStopDataToBackend = async () => {
    try {
      const token = localStorage.getItem("DTT-token");
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v3/dailyTaskTrackerEndCheck",
        {
          comments,
          elapsedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      console.error("Error sending stop data to backend:", error);
    } finally {
      localStorage.removeItem("tD8kFi5j");
      localStorage.removeItem("DTT-token");
    }
  };

  const handleStop = () => {
    sendStopDataToBackend();

    setFirstCount(true);
    if (isPaused) {
      setIsPaused(false); // Resume the timer
    }
    setIsRunning(false);
    setDisabled(false);
    setCommentLength(0);
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
    setPauseClickCount(0);
  };

  const handlePause = () => {
    if (pauseClickCount < 4) {
      sendPauseDataToBackend();
      setPauseClickCount((prevCount) => prevCount + 1);
      setIsPaused(true);
    } else {
      window.alert("You have exceeded the maximum pause limit!");
    }
  };

  const handleStart = () => {
    if (learningType === "CG Learning Videos" && firstCount) {
      const newTab = window.open("https://cgu.cginfinity.com/login/", "_blank");
      if (newTab) {
        newTab.focus();
      }
    }

    if (firstCount) {
      sendStartDataToBackend();
      setFirstCount(false);
    } else {
      sendPauseDataToBackend();
    }

    setComDisabled(false);
    setDisabled(true);

    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      if (isPaused) {
        const timerStartTime = Date.now() - elapsedTime;
        setStartTime(Date.now() - elapsedTime);
        const timerInterval = setInterval(() => {
          setElapsedTime(Date.now() - timerStartTime);
        }, 1000);

        setIsRunning(true);
        setIsPaused(false);
      } else {
        setStartTime(Date.now());
        setIsRunning(true);
        setElapsedTime(0);
      }
    }
  };

  const onLearningChange = (e) => {
    setLearningType(e.target.value);
    setTopicName("");
  };

  const onTopicChange = (e) => {
    setTopicName(e.target.value);
    if (topicName.length <= 1) setBtnDisabled(true);
  };

  const onCommentsChange = (e) => {
    const inputComments = e.target.value;
    const commentsWithoutSpaces = inputComments.replace(/\s/g, ""); // Remove spaces from the input
    setComments(inputComments);
    setCommentLength(commentsWithoutSpaces.length);
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
      <div className="tracker border card-body p-0">
        <div className="border-bottom ">
          <h5 className="card-title dtt-hfs ">Daily Task Tracker</h5>
        </div>
        <div>
          <label htmlFor="learning" className="form-label mt-3 dtt-lt">
            Learning Type <span style={{ color: "red" }}>*</span>
          </label>
          <select
            key={resetSelect ? "learningTypeReset" : "learningType"}
            disabled={disabled}
            className="form-select dtt-selector "
            id="learning"
            aria-label=""
            value={learningType}
            onChange={(e) => onLearningChange(e)}
            defaultValue=""
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
          <TopicSelect
            disabled={disabled}
            resetSelect={resetSelect}
            learningType={learningType}
            topicName={topicName}
            onChange={(e) => onTopicChange(e)}
          />
        </div>

        <div>
          <label htmlFor="comments" className="form-label dtt-t">
            Comments <span style={{ color: "red" }}>*</span>{" "}
            <span style={{ color: "grey" }}>(Minimum 150 Characters)</span>
          </label>
          <textarea
            placeholder="Type comments"
            id="comments"
            className="form-control dtt-text"
            value={comments}
            onChange={(e) => onCommentsChange(e)}
            disabled={comDisabled} // Add the disabled attribute
          ></textarea>
          <span
            className="charLen"
            style={{
              color: "grey",
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "1rem",
            }}
          >
            {commentLength}/{MAX_COMMENT_LENGTH}
          </span>
        </div>

        <div className="d-flex align-items-center justify-content-end dtt-gap ">
          <p className="dtt-timer">{formatTime(elapsedTime)}</p>
          <div className="d-flex align-items-center justify-content-center iconGap ">
            <p>
              {isRunning && !isPaused ? (
                <Pause onClick={handlePause} disabled={pauseClickCount >= 4} />
              ) : btnDisabled ? (
                <PlayD />
              ) : (
                <Play onClick={btnDisabled ? null : handleStart} />
              )}
            </p>
            <p>
              {stopBtnDisabled ? (
                <StopD />
              ) : (
                <Stop
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                  onClick={stopBtnDisabled ? null : handleStop}
                />
              )}
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
                  <p>Record Saved!</p>
                </div>
                <div className="row l2">
                  <p>We Have Successfully Saved Your Record.</p>
                </div>
                <div className="row continue">
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
    </>
  );
};

export default DailyTaskTracker;
