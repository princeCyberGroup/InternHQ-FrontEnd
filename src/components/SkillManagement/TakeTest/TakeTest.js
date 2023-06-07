import React, { useEffect } from "react";
import { useState, createContext } from "react";
// import logo from '../../../Assets/image 13.png';
import "./TakeTest.css";
import { BsClock } from "react-icons/bs";
import { MdOutlineBallot } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const TestContext = createContext();

const TakeTest = ({ test }) => {
    const [activeButton, setActiveButton] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [tests, setTests] = useState([]);
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        fetchTests();
    }, [])
    const fetchTests = async (examId) => {
        try {
            const response = await fetch("https://cg-interns-hq.azurewebsites.net/getAllExam");
            const data = await response.json();
            setAllData(data);
            setTests(data);
        }
        catch (e) {
            console.error('Error fetching exam details:', e);
        }
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const navigate =useNavigate();
    // const location = useLocation();
    
    const clickHandler = (examId,examName,examDuration,numberOfQuestion,techName,level) => {
        const data={
            examId:examId,
            examName:examName,
            examDuration:examDuration,
            numberOfQuestion:numberOfQuestion,
            techName:techName,
            level:level
        };
        // const locationstate=location.state;

        navigate("/take-your-test",{
            state:{ data }
        });
        
    }
    return (
        <> <div className="TTheading">
        <p>Take The Test</p>
    </div>
            <div className="card maincard">
                <div className="card-header-nav">
                    <div
                        className={`nav-btn ${activeButton === "all" ? "activated" : ""}`}
                    >
                        <button
                            className="btn-nav p-0"
                            onClick={() => {
                                setActiveButton("all");
                                setTests(allData);
                            }}
                        > All
                        </button>
                    </div>
                    <div
                        className={`nav-btn ${activeButton === "beginner" ? "activated" : ""
                            }`}
                    >
                        <button
                            className="btn-nav p-0"
                            onClick={() => {
                                setActiveButton("beginner");
                                setTests(allData.filter(tests => tests.level === 'Beginner'));

                            }}
                        >Beginner
                        </button>
                    </div>
                    <div
                        className={`nav-btn ${activeButton === "inter" ? "activated" : ""}`}
                    >
                        <button
                            className="btn-nav p-0"
                            onClick={() => {
                                setActiveButton("inter");
                                setTests(allData.filter(tests => tests.level === 'Intermediate'));
                            }}
                        >Intermediate
                        </button>
                    </div>
                    <div
                        className={`nav-btn ${activeButton === "advanced" ? "activated" : ""
                            }`}
                    >
                        <button
                            className="btn-nav p-0"
                            onClick={() => {
                                setActiveButton("advanced");
                                setTests(tests.filter(tests => tests.level === 'Advanced'));
                            }}
                        >Advanced
                        </button>
                    </div>
                    <div className="search-bar" style={{ margin: "auto" }}>
                        <input
                            className="sea"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div
                    class="card-body p-0"
                    style={{ maxHeight: "50rem", overflow: "auto" }}
                >
                    <div className="row cards">
                        <div className="row d-flex justify-content-evenly">

                            {tests.map(test => (
                                <div className='exam'>
                                    <div class="card outer-card">
                                        <div class="d-flex align-items-center">
                                            <div class="ml-3 w-100">
                                                <div className="d-flex justify-content-start ">
                                                    <div className="imagespace">
                                                        <img src={`https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${test.techName.toLowerCase()}/${test.techName.toLowerCase()}.png`} class="imageLogo" width="30px" height="35px" />
                                                    </div>
                                                    <div >
                                                        <div className="Category_box justify-content-center">
                                                            <span className="Category" >{test.level}</span>
                                                        </div>
                                                        <div className=" About_box justify-content-center">
                                                            <span className="About">{test.examName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
                                                    <div class="d-flex flex-column justify-content-center noOfQues">
                                                        <div class="articles d-flex justify-content-center">
                                                            <MdOutlineBallot style={{ marginRight: "5px" }} />{test.numberOfQuestion} Questions</div>
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center testTime">
                                                        <div class="articles d-flex justify-content-center ">
                                                            <BsClock style={{ marginRight: "5px" }} />{test.examDuration} mins</div>
                                                    </div>
                                                    <div class="d-flex flex-column">

                                                        <Button className='btnclick' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Start Test</Button>
                                                        {/* </Link>{' '} */}
                                                    </div>
                                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <span class="modal-title instruction" id="staticBackdropLabel">Instructions</span>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <ol style={{ listStyleType: 'decimal' }}>
                                                                        <li> It is important to adhere to the given time limit and complete all the required tasks within the period</li>
                                                                        <li> To receive a star as a recognition of your performance, you need to meet a requirement of achieving a score of 80% or higher.</li>
                                                                        <li>If you do not achieve a minimum score of 80%, you will be required to take the test again after a period of 2 days.</li>
                                                                    </ol>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                                                                    {/* <Link key={test.examId} to={`/take-your-test`}> */}
                                                                        <button type="button" 
                                                                          onClick={() => clickHandler(test.examId, test.examName, test.examDuration, test.numberOfQuestion, test.techName, test.level)}
                                                                        // onClick={() => { clickHandler(test.examId,test.examName,test.examDuration,test.numberOfQuestion,test.techName,test.level) }} 
                                                                        data-bs-dismiss="modal" class="btn btn-primary">Continue</button>
                                                                    {/* </Link> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TakeTest;
