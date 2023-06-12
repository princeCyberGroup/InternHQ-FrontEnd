import React from "react";
import { useEffect, useState } from "react";
import "./TakeYourTest.css";
import Header from "../Header";
import { ScrollRestoration, resolvePath, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import Congo from "../SkillManagement/Modals/Congo.js";
import Sorry from "../SkillManagement/Modals/Sorry.js";

const TakeYourTest = () => {
    var storedObject = localStorage.getItem('userData');
    var parsedObject = JSON.parse(storedObject);
    var userId = parsedObject.userId;
    // const { examId } = useParams();
    const [testsData, setTestsData] = useState([]);
    const [allData, setAllData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    // const location = useLocation();
    // const { data } = location.state;
    const { examId, examName, examDuration, numberOfQuestion, techName, level } = data;
    const [Ques, setTestsQues] = useState([]);
    const [allQuesData, setAllQuesData] = useState([]);
    const [activeRadioButtons, setActiveRadioButtons] = useState();
    const [userAnswers, setUserAnswers] = useState([]);
    const [fullscreen, setFullscreen] = useState(false);
    const [score , setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [submitAnswer, setSubmitAnswer] = useState([]);
    const clickHandler = () => {
        navigate("/skill-Management");
        setFullscreen(false);
    };
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
        // fetchTestsForExams();
        handleAnswerSelect();
        setFullscreen(true);
        // window.addEventListener("keydown", handleKeyDown);
        const examDurationInSeconds = parseInt(examDuration) * 60;
        setTime(examDurationInSeconds);
        // console.log(testDetails.examDuration)
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    submitQuiz();
                    return 0;
                }
            });
        }, 1000);
      
        return () => {
            clearInterval(timer);
            exitFullscreen();
            // window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
 


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const fetchTests = async () => {
        try {
            const response = await fetch(`https://cg-interns-hq.azurewebsites.net/getAllQuestions?examId=${examId}`);
            const Quesdata = await response.json();
            setAllQuesData(Quesdata);
            setTestsQues(Quesdata);
        }
        catch (e) {
            console.log(e);
        }
    }

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
        radioButton.addEventListener('change', () => {
        }
        );

    });

    const submitQuiz = () => {
        setFullscreen(false);
        setSubmitted(true);
        clickHandler();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape" || event.key === "F11") {
            event.disabled = true 
            // console.log(event);
        }
    };
    let submitQuesData;
    let totalScore;
    let resp;

    const submitTest = async () => {
        try {
            const mappedAnswers = Object.entries(userAnswers).map(([questionId, selectedAnswer]) => ({
                qId: questionId,
                choosenOpt: selectedAnswer
            }));
            const response = await fetch('https://cg-interns-hq.azurewebsites.net/submitAnswer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    "userId": userId,
                    "technology": techName,
                    "level":level,
                    "optRequest": mappedAnswers

                })
            });
            submitQuesData = await response.json();
            setScore(submitQuesData.totalScore);
            // console.log(submitQuesData);

        } catch (error) {
            console.log(error);
        }

    };

    

    const modalTarget = () => {

        const a = '#congoModal123'
        const b = '#sorryModal'
        if (score >= 6) {
            return a;
        }
        else {
            return b;
        }
    }

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
                                            onChange={() => handleAnswerSelect(quest.questionId, option)}
                                            checked={userAnswers[quest.questionId] === option}
                                        />
                                    </div>
                                    <label  className="options-of-quiz"> {option} </label>
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
                                {submitted && (
                                    <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                )}
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
                                        submitQuiz();
                                         setFullscreen(false);
                                        clickHandler();
                                        submitTest();
                                    }}
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target={Targetm}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Congo scoreValue = {score} />
                <Sorry scoreValue = {score} />
            </div >
        );
    };
    return (
        <>
            <div className="resp">
                <div class="container-fluid ">
                    <div className="row">
                    </div>
                    <div className="row testhHeading-and-Timer-Div">
                        <div className="col-3" >
                            <div className="main-heading">
                                <p> Take The Test </p>
                            </div>
                            <div className="quiz-description mx-5 ">
                                {examName}{" "}{'\u2B24'}{" "}{examDuration}{" "}mins{" "}{'\u2B24'}{" "}{numberOfQuestion}{" "}Questions
                            </div>
                        </div>
                        <div className="col-3 Timer-and-attemtedQues">
                            <div className="col-3 timer-Box" >
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

                            {fullscreen && !submitted && (
                                <div> {renderQuestions()} </div>

                            )}

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default TakeYourTest;




