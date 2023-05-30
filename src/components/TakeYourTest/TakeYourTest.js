import React from "react";
import { useState } from "react";
import "./TakeYourTest.css";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
//import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import TakeTest from "../SkillManagement/TakeTest/TakeTest.js";
import Congo from "../SkillManagement/Modals/Congo.js";
import Sorry from "../SkillManagement/Modals/Sorry.js";

//import Button from 'react-bootstrap/Button';
const TakeYourTest = () => {
    //   const location = useLocation();
    //   const searchParams = new URLSearchParams(location.search);
    //   const selectedData = searchParams.get("selectedData");


    const navigate = useNavigate();
    // const [res, setScore] = useState(0);

    //TODO: THIS IS THE CLICK FUNCTION START TEST

    const [Ques, setTestsQues] = useState([]);
    const [allQuesData, setAllQuesData] = useState([]);
    useEffect(() => {
        fetchTests();
    }, [])
    const fetchTests = async () => {
        try {
            const response = await fetch("https://cg-interns-hq.azurewebsites.net/getAllQuestions?examId=1");
            const Quesdata = await response.json();
            console.log(Quesdata);
            setAllQuesData(Quesdata);
            setTestsQues(Quesdata);
        }
        catch (e) {
            console.log(e);
        }
    }


    // const [showChildModal, setShowChildModal] = useState(false);

    // const openChildModal = () => {
    //   setShowChildModal(true);
    // };

    // const closeChildModal = () => {
    //   setShowChildModal(false);
    // };
    // const questions = [
    //     {
    //         id: 1,
    //         text: "What is the capital of France?",
    //         options: ["Paris", "London", "Rome"],
    //         answer: "Paris",
    //     },
    //     {
    //         id: 2,
    //         text: "Which planet is known as the Red Planet?",
    //         options: ["Mars", "Venus", "Jupiter"],
    //         answer: "Mars",
    //     },
    //     // Add more questions here
    // ];
    /////////////////////////////////////////////////////
    const [userAnswers, setUserAnswers] = useState([]);

    const handleAnswerSelect = (questionId, selectedAnswer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedAnswer,
        }));
    };
    //////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    const calculateScore = () => {
        let score = 0;
        Ques.forEach((quest) => {
            if (userAnswers[quest.questionId] === quest.answer) {
                score++;
            }
        });
        // setScore(calculateScore);
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
                            Quiz {"\u2B24"}
                            20 mins {"\u2B24"}
                            10 Questions
                        </div>
                    </div>
                    <div className="col-3 Timer-and-attemtedQues">
                        <div className="col-3 timer-Box" >
                                00:00:00
                              </div>
                              <div  className="col-3 attempted-Ques">
                                Attempted Questions: 02/10
                              </div>
                        </div>
                        
                </div>
                <div className="ques.card ">
                    <div className="card insidecard" style={{ width: "1220px" }}>
                        <div> {renderQuestions()} </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </>
    );
};
export default TakeYourTest;
