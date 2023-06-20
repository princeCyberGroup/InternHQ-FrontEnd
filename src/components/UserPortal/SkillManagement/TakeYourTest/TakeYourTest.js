import React from "react";
import { useEffect, useState, useContext } from "react";
import "./TakeYourTest.css";
import { useNavigate ,useLocation } from "react-router-dom";

import { UserContext } from "../../../../Context/Context";

const TakeYourTest = () => {

  // const [score, setScoree] = useState(0);
  // const { score: contextScore, setScore: setContextScore } = useContext(UserContext);

 const { score, setScore } = useContext(UserContext);
//  const [scoreUpdated, setScoreUpdated] = useState(false);

  var storedObject = localStorage.getItem("userData");
  var parsedObject = JSON.parse(storedObject);
  var userId = parsedObject.userId;
  // const [testsData, setTestsData] = useState([]);
  // const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  // const location = useLocation();
  // const { data } = location.state;
  const { examId, examName, examDuration, numberOfQuestion, techName, level } =
    data;
  const [Ques, setTestsQues] = useState([]);
  const [allQuesData, setAllQuesData] = useState([]);
  const [activeRadioButtons, setActiveRadioButtons] = useState();
  const [userAnswers, setUserAnswers] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  // const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  // const [submitAnswer, setSubmitAnswer] = useState({});

  const clickHandler = () => {
    navigate("/skill-Management");
    setFullscreen(false);
  };
  // useEffect(() => {
  //   if (scoreUpdated) {
  //     console.log("Value of score after fetching the data", score);
  //   }
  // }, [score, scoreUpdated]);
  // useEffect(()=>{
  //     // console.log("this is the data from takeyourtest site", data);
  // },[]);
  useEffect(() => {
    if (fullscreen) {
      enterFullscreen();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      exitFullscreen();
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [fullscreen]);

  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const [time, setTime] = useState(0);
  //main use effect
  useEffect(() => {
    fetchTests();
    handleAnswerSelect();
    setFullscreen(true);
    const examDurationInSeconds = parseInt(examDuration) * 60;
    setTime(examDurationInSeconds);
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          // submitQuiz();
          return 0;
        }
      });
    }, 1000);

    console.log(userAnswers);

    return () => {
      clearInterval(timer);
      exitFullscreen();
      // window.removeEventListener("keydown", handleKeyDown);
    };
  }, [score]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const fetchTests = async () => {
    let Quesdata
    try {
      const response = await fetch(
        `https://cg-interns-hq.azurewebsites.net/getAllQuestions?examId=${examId}`
      );
      Quesdata = await response.json();
      setAllQuesData(Quesdata);
      setTestsQues(Quesdata.questions);
      localStorage.setItem("questionToken", Quesdata.token)
      console.log(Quesdata)
    } catch (e) {
      console.log(e);
    }
  };

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));

    //setUserAnswers(prevAnswers => [...prevAnswers,{"qId":[questionId], "choosenOpt": selectedAnswer}])
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
    radioButton.addEventListener("change", () => { });
  });

  // const submitQuiz = () => {
  //   // setFullscreen(false);
  //   // setSubmitted(true);
  //   // clickHandler();
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" || event.key === "F11") {
      event.disabled = true;
      // console.log(event);
    }
  };
  let submitQuesData;
  const api = "https://cg-interns-hq.azurewebsites.net/submitAnswer";
  const submitTest = async () => {
    try {
      // debugger;
      const mappedAnswers = Object.entries(userAnswers).map(
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
      // console.log("this is the total score coming",typeof submitQuesData.totalScore)
      // console.log(score);
       setScore(submitQuesData.totalScore);
      // setScore(submitQuesData.totalScore, () => {
      //   console.log("inside setScore");
      //   setScoreUpdated(true); // Set the flag after the score state has been updated
      // });
      // console.log("value of score after fetching the data", score);

    } catch (error) {
      console.log(error);
    }
    finally {
      localStorage.removeItem("questionToken");
    }
  };

  const checkAnswers = () => {
    
  }

  const modalTarget = () => {
    const a = "#congoModal123";
    const b = "#sorryModal";
    if (score >= 6) {
      return a;
    } else {
      return b;
    }
  };

  const Targetm = modalTarget();

  const renderQuestions = () => {
    return (
      <div>
        {Ques.map((quest, index) => (
          <div key={quest.questionId}>
            <div className="ques-of-quiz">
              {index + 1} {"."} {quest.question}
            </div>
            <div>
              {quest.options.map((option, index) => (
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
        <div class="d-flex flex-column submit-button">
          <button
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            // onClick={() => {
            //   // submitQuiz();
            //   setFullscreen(false);
            //   submitTest();
            //   clickHandler();
            // }}
          >
            Submit Quiz
          </button>
        </div>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <span class="modal-title instruction" id="staticBackdropLabel">
                  Submit Test{" "}
                </span>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
              </div>
              <div class="modal-body"> Sure Want to submit the test ? </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>{" "}
                <button
                  type="button"
                  onClick={() => {
                    // submitQuiz();
                    setFullscreen(false);
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
        {/* <Congo />
        <Sorry /> */}
      </div>
    );
  };
  return (
    <>
      <div className="resp">
        <div class="container-fluid ">
          <div className="row"></div>
          <div className="row testhHeading-and-Timer-Div">
            <div className="col-3">
              <div className="main-heading">
                <p> Take The Test </p>
              </div>
              <div className="quiz-description mx-5 ">
                {examName} {"\u2B24"} {examDuration} mins {"\u2B24"}{" "}
                {numberOfQuestion} Questions
              </div>
            </div>
            <div className="col-3 Timer-and-attemtedQues">
              <div className="col-3 timer-Box">
                <p>{formatTime(time)}</p>
              </div>
              <div className="col-3 active-Radio-Buttons attempted-Ques">
                {/* Attempted Questions: {activeRadioButtons}/{testDetails.numberOfQuestion} */}
                Attempted Questions: {activeRadioCount}/{numberOfQuestion}
              </div>
            </div>
          </div>
          <div className="ques.card ">
            <div className="card insidecard" style={{ width: "1220px" }}>
              {fullscreen && !submitted && <div> {renderQuestions()} </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TakeYourTest;
