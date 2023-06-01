import React from "react";
import { useEffect, useState } from "react";
import "./TakeYourTest.css";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Congo from "../SkillManagement/Modals/Congo.js";
import Sorry from "../SkillManagement/Modals/Sorry.js";

const TakeYourTest = () => {
    const { examId } = useParams();
    const [testsData, setTestsData] = useState([]);
    const [allData, setAllData] = useState([]);
    const navigate = useNavigate();
    const [Ques, setTestsQues] = useState([]);
    const [allQuesData, setAllQuesData] = useState([]);
    const [testDetails, setTestDetails] = useState({});
    const [activeRadioButtons, setActiveRadioButtons] = useState();
    const [userAnswers, setUserAnswers] = useState([]);
    const fetchTestsForExams = async (examIdToCheck) => {
        try {
            // console.log("Working")
            const response = await fetch("https://cg-interns-hq.azurewebsites.net/getAllExam");
            const data = await response.json();
            console.log(data);
            data.forEach((i) => {
                if (i.examId == examId) {
                    setTestDetails(i);
                }
            })
            setAllData(data);
            setTestsData(data);
        }
        catch (e) {
            console.error('Error fetching exam details:', e);
        }
    };
    const [time, setTime] = useState(0);
    useEffect(() => {
        fetchTests();
        fetchTestsForExams();
        handleAnswerSelect();
        const examDurationInSeconds = parseInt(testDetails.examDuration) * 60;
        setTime(examDurationInSeconds);
        // console.log(testDetails.examDuration)
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    return 0;
                }
            });
        }, 1000);

        return () => {
            clearInterval(timer); 
        };
    }, [testDetails.examDuration]);


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    const fetchTests = async () => {
        try {
            const response = await fetch("https://cg-interns-hq.azurewebsites.net/getAllQuestions?examId=1");
            // console.log(response)
            const Quesdata = await response.json();
            // console.log(Quesdata);
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
        // console.log(userAnswers)
        setActiveRadioButtons(getActiveRadioCount());
    };
    //////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    const calculateScore = () => {
        let score = 0;
        Ques.forEach((quest) => {
            if (userAnswers[quest.questionId] === quest.answer) {
                score++;
            }
        });
        return score;
    };
    ///////////////////////////////////////////////////////
    const submitQuiz = () => {
        const score = calculateScore();

        console.log("Quiz submitted! Score:", score);
    };
    const clickHandler = () => {
        navigate("/skill-Management");
    };
    const score = calculateScore();
    const modalTarget = () => {

        const a = '#congoModal123'
        const b = '#sorryModal'
        if (score >= 5) {
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
                                            name={`question_${quest.questionId}`}
                                            value={option}
                                            onChange={() => handleAnswerSelect(quest.questionId, option)}
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
                                        submitQuiz();
                                        clickHandler();
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
                <Congo />
                <Sorry />
            </div >
        );
    };
    return (
        <>
            <Header />
            <div className="resp">
                <div class="container-fluid ">
                    <div className="row">
                        <div className="col-12 mt-4  ">
                            <div className="textfornow">
                                Dashboard {">"}
                                Skill Management {">"}
                                Name of the Test{" "}
                            </div>
                        </div>
                    </div>
                    <div className="row testhHeading-and-Timer-Div">
                        <div className="col-3" >
                            <div className="main-heading">
                                <p> Take The Test </p>
                            </div>
                            <div className="quiz-description mx-5 ">
                                {testDetails.examName}{" "}{'\u2B24'}{" "}{testDetails.examDuration}{" "}mins{" "}{'\u2B24'}{" "}{testDetails.numberOfQuestion}{" "}Questions
                            </div>
                        </div>
                        <div className="col-3 Timer-and-attemtedQues">
                            <div className="col-3 timer-Box" >
                                <p>{formatTime(time)}</p>
                            </div>
                            <div className="col-3 active-Radio-Buttons attempted-Ques">
                           
                                {/* Attempted Questions: {activeRadioButtons}/{testDetails.numberOfQuestion} */}
                                Attempted Questions: {activeRadioCount}/{testDetails.numberOfQuestion}
                            </div>
                        </div>
                    </div>
                    <div className="ques.card ">
                        <div className="card insidecard" style={{ width: "1220px" }}>
                            <div> {renderQuestions()} </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default TakeYourTest;
