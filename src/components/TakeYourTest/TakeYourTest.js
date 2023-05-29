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

    //TODO: THIS IS THE CLICK FUNCTION START TEST
    const clickHandler = () => {
        navigate("/skill-Management");
    };
    
    //   const [allData, setAllData] = useState([]);
    //   const [tests, setTests] = useState([]);
    //     useEffect(() => {
    //         fetchTests();
    //     }, [])
    //     const fetchTests = async () => {
    //         try {
    //             const response = await fetch("https://cg-interns-hq.azurewebsites.net/getAllExam");
    //             const data = await response.json();
    //             setAllData(data);
    //             setTests(data);
    //         }
    //         catch (e) {
    //             console.log(e);
    //         }
    //     }


    // const [showChildModal, setShowChildModal] = useState(false);
  
    // const openChildModal = () => {
    //   setShowChildModal(true);
    // };
  
    // const closeChildModal = () => {
    //   setShowChildModal(false);
    // };
    const questions = [
        {
            id: 1,
            text: "What is the capital of France?",
            options: ["Paris", "London", "Rome"],
            answer: "Paris",
        },
        {
            id: 2,
            text: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter"],
            answer: "Mars",
        },
        // Add more questions here
    ];
    /////////////////////////////////////////////////////
    const [userAnswers, setUserAnswers] = useState([]);

    const handleAnswerSelect = (questionId, selectedAnswer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedAnswer,
        }));
    };
    //////////////////////////////////////////////////////
    const renderQuestions = () => {
        return (
            <div>
                {questions.map((question, index) => (
                    <div key={question.id}>
                        <div className="ques-of-quiz">
                            {" "}
                            {index + 1} {"."} {question.text}
                        </div>
                        <div>
                            {" "}
                            {question.options.map((option, index) => (
                                <div
                                    key={index}
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <div className="start-input">
                                        <input
                                            type="radio"
                                            name={`question_${question.id}`}
                                            value={option}
                                            onChange={() => handleAnswerSelect(question.id, option)}
                                            checked={userAnswers[question.id] === option}
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
                                        // event.preventDefault();
                                         submitQuiz();
                                         clickHandler();
                                        // {console.log(submitQuiz)}

                                    }}
                                     data-bs-dismiss="modal"
                                     data-bs-target="#congoModal123"
                                    class="btn btn-primary"
                                    data-bs-toggle= "modal"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Congo /> */}
                <div>
                    
                </div>
            </div>
            
        
        );
    };
    /////////////////////////////////////////////////////
    const calculateScore = () => {
        let score = 0;
        questions.forEach((question) => {
            if (userAnswers[question.id] === question.answer) {
                score++;
            }
        });
        return score;
    };
    ///////////////////////////////////////////////////////
    const submitQuiz = () => {
        const score = calculateScore();

        console.log("Quiz submitted! Score:", score);
         score>=1 ? <Congo score={score} /> : <Sorry />       
    
    };
  


    return (
        <>
            <Header />
            <div class="container-fluid ">
                <div className="row">
                    <div className="col-12 mt-4 mx-4 ">
                        <div className="navDiv">
                            Dashboard {">"}
                            Skill Management {">"}
                            Name of the Test{" "}
                        </div>
                    </div>
                </div>
                <div className="main-heading mt-4 mx-4">
                    <p> Take The Test </p>
                </div>
                <div className="quiz-description mx-4">
                    Quiz {"\u2B24"}
                    20 mins {"\u2B24"}
                    10 Questions
                </div>
                <div className="ques.card mt-1 mx-4 me-10 ">
                    <div className="card " style={{ width: "1220px" }}>
                        <div> {renderQuestions()} </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </>
    );
};
export default TakeYourTest;
