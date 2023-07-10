import React from "react";
import { useEffect, useState, useContext } from "react";
import "./TakeYourTest.css";
import CryptoJS from "crypto-js";
import { useNavigate ,useLocation } from "react-router-dom";
// import { ReactCompont as Dot } from "../../../../Assets/Ellipsestakeyourtest.svg";
import { ReactComponent as DotTYT } from "../../../../Assets/Ellipsestakeyourtest.svg";
import { UserContext } from "../../../../Context/Context";
import { BsCheckLg } from "react-icons/bs";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const TakeYourTest = () => {
  // const [score, setScoree] = useState(0);
  // const { score: contextScore, setScore: setContextScore } = useContext(UserContext);

  const { score, setScore } = useContext(UserContext);
  //  const [scoreUpdated, setScoreUpdated] = useState(false);

  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  var parsedObject;
  const dataU = localStorage.getItem("userData");
  if (dataU) {
    const bytes = CryptoJS.AES.decrypt(dataU, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }
  var userId = parsedObject.userId;
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { examId, examName, examDuration, numberOfQuestion, techName, level } =
    data;
  const [Ques, setTestsQues] = useState([]);
  const [allQuesData, setAllQuesData] = useState([]);
  const [activeRadioButtons, setActiveRadioButtons] = useState();
  const [userAnswers, setUserAnswers] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  // const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const clickHandler = () => {
    navigate("/skill-Management");
    setFullscreen(false);
    // exitFullscreen();
  };

  // useEffect(() => {
  //   if (fullscreen) {
  //     enterFullscreen();
  //     window.addEventListener("keydown", handleKeyDown);
  //   } else {
  //     exitFullscreen();
  //     window.removeEventListener("keydown", handleKeyDown);
  //   }
  // }, [fullscreen]);

  // const enterFullscreen = () => {
  //   const element = document.documentElement;
  //   if (element.requestFullscreen) {
  //     element.requestFullscreen();
  //   } else if (element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen();
  //   } else if (element.webkitRequestFullscreen) {
  //     element.webkitRequestFullscreen();
  //   } else if (element.msRequestFullscreen) {
  //     element.msRequestFullscreen();
  //   }
  // };

  // const exitFullscreen = () => {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen();
  //   } else if (document.webkitExitFullscreen) {
  //     document.webkitExitFullscreen();
  //   } else if (document.msExitFullscreen) {
  //     document.msExitFullscreen();
  //   }
  //   console.log("is this working after escaping");
  // };


  // const handleKeyDown = (event) => {
  //   event.preventDefault();
    
  //   if (event.key === "Escape" || event.key === "F11") {
  //     event.disabled = true;
  //   }
  // };
  const [time, setTime] = useState(0);
  let timer;

  const startTimer = () => {
    const examDurationInSeconds = parseInt(examDuration) * 60;
    setTime(examDurationInSeconds);
    timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          submitTest();
          window.alert("Time's up!");
          clickHandler();
        }
      });
    }, 1000);
  };

  useEffect(() => {
    fetchTests();
    handleAnswerSelect();
    setFullscreen(true);
    startTimer();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  const fetchTests = async () => {
    let Quesdata;
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/api/v3/getAllQuestions?examId=${examId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      Quesdata = await response.json();
      setAllQuesData(Quesdata);
      setTestsQues(Quesdata.questions);
      localStorage.setItem("questionToken", Quesdata.token);
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
      console.log(error);
    }
  };
  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
    setActiveRadioButtons(getActiveRadioCount());
  };

  const getActiveRadioCount = () => {
    let count = 0;
    Object.values(userAnswers).forEach((answer) => {
      if (answer) {
        count++;
      }
    });
    return count;
  };

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const activeRadioCount = getActiveRadioCount();
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {});
  });

  let submitQuesData;
  const api = process.env.REACT_APP_API_URL + "/api/v3//submitAnswer";
  const submitTest = async () => {
    try {
      // debugger;
      const mappedAnswers = Object.entries(userAnswers)?.map(
        ([questionId, selectedAnswer]) => ({
          qId: parseInt(questionId),
          choosenOpt: selectedAnswer,
        })
        );
        const response = await fetch(
          api ,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("questionToken")}`
            },
            body: JSON.stringify({
              userId: userId,
              technology: techName,
              level: level,
              optRequest: mappedAnswers.splice(0, mappedAnswers.length - 1),
            }),
          }
          );
          submitQuesData = await response.json();
          setScore(Math.floor(submitQuesData.scorePercentage));
        } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("questionToken");
    }
  };
  const renderQuestions = () => {
    return (
      <div>
        {Ques?.map((quest, index) => (
          <div key={quest.questionId}>
            <div className="ques-of-quiz">
              {index + 1} {"."} {quest.question}
            </div>
            <div>
              {quest.options?.map((option, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="start-input">
                    <input
                      type="radio"
                      // id = "select"
                      name={`question_${quest.questionId}`}
                      value={option}
                      onChange={() =>
                        handleAnswerSelect(quest.questionId, option)
                      }
                      checked={userAnswers[quest.questionId] === option}
                    />
                  </div>
                  <label className="options-of-quiz"> {option} </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="d-flex flex-column submit-button">
          <button
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Submit Quiz
          </button>
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <span
                  className="modal-title instruction"
                  id="staticBackdropLabel"
                >
                  Submit Test{" "}
                </span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"> Sure Want to submit the test ? </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>{" "}
                <button
                  type="button"
                  onClick={() => {
                    setFullscreen(false);
                    // exitFullscreen();
                    submitTest();
                    clickHandler();
                  }}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="resp">
          <div className="row testhHeading-and-Timer-Div">
            <div className="col-3">
              <div className="main-heading">
                <p> Take The Test </p>
              </div>
              <div className="quiz-description ">
                {examName} &nbsp; <DotTYT/> &nbsp; {examDuration} mins &nbsp; <DotTYT/> &nbsp;
                {numberOfQuestion} Questions
              </div>
            </div>
            <div className="col-3 Timer-and-attemtedQues">
              <div className="col-3 timer-Box">
                <p>{formatTime(time)}</p>
              </div>
              <div className="col-3 active-Radio-Buttons attempted-Ques">
               &nbsp; Attempted Questions: {activeRadioCount}/{numberOfQuestion}
              </div>
            </div>
          </div>
            <div className="card insidecard" >
              {fullscreen && !submitted && <div> {renderQuestions()} </div>}
            </div>
        </div>
    </>
  );
};
export default TakeYourTest;
