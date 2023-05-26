import React from "react";
import { useState } from "react";
import logo from '../../../Assets/image 13.png';
// import {TakeYourTest} from"../../TakeTest/TakeYourTest.js";
import "./TakeTest.css";
// import {BiTime } from "react-icons/fa";
// import { BsClock } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { MdOutlineBallot } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
const TakeTest = () => {
    const [activeButton, setActiveButton] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    let data=[{difficult:"advance"},{difficult:"beginner"},{difficult:"intermediate"},{difficult:"advance"},{difficult:"advance"},{difficult:"intermediate"},{difficult:"advance"},{difficult:"beginner"},{difficult:"beginner"}]
    const [item,setItems]=useState(data);
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const navigate = useNavigate();

    //TODO: THIS IS THE CLICK FUNCTION START TEST
    const clickHandler = () => {
        navigate("/varun");
    }


  

    return (
        <>
            <div className="TTheading">
                <p>Take The Test</p>
            </div>

            <div className="card" style={{ width: "950px" }}>
                <div className="card-header-nav">
                    <div
                        className={`nav-btn ${activeButton === "all" ? "activated" : ""}`}
                    >
                        <button
                            className="btn-nav p-0"
                            onClick={() => {
                                setActiveButton("all");
                                setItems(data);
                            }}
                        >
                            All
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
                               setItems(data.filter(item=>item.difficult==='beginner'));

                            }}
                        >
                            Beginner
                        </button>
                    </div>

                    <div
                        className={`nav-btn ${activeButton === "inter" ? "activated" : ""}`}
                    >
                        <button
                            className="btn-nav p-0"
                            onClick={() => {
                                setActiveButton("inter");
                                setItems(data.filter(item=>item.difficult==='intermediate'));
                                
                            }}
                        >
                            Intermediate
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
                                setItems(data.filter(item=>item.difficult==='advance'));
                            }}
                        >
                            Advanced
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


                            {item.map(item=>(
                                   <div className='exam'>
                                   <div class="card outer-card">
                                       <div class="d-flex align-items-center">
                                           <div class="ml-3 w-100">
                                               <div className="d-flex justify-content-start ">
                                                   <div className="imagespace">
                                                       <img src={logo} class="imageLogo" width="30px" height="35px" />
                                                   </div>
                                                   <div >
                                                       <div className="Category_box justify-content-center">
                                                           <span className="Category" >{item.difficult}</span>
                                                       </div>
                                                       <div className=" About_box justify-content-center">
                                                           <span className="About">React course content mentioned bellow the line hbvburvbu</span>
                                                       </div>
                                                   </div>
                                               </div>
                                               <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
                                                   <div class="d-flex flex-column justify-content-center noOfQues">
                                                       <span class="articles"> <MdOutlineBallot class='me-1.5' /> Questions</span>
                                                   </div>
                                                   <div class="d-flex flex-column justify-content-center testTime">
                                                       <span class="articles"><BsClock class='me-1.5' />  20 mins</span>
                                                   </div>
                                                   <div class="d-flex flex-column">
                                                       <Button className='btnclick' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Start Test</Button>{' '}
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
                                                                   <button type="button" onClick={()=>{clickHandler()}} data-bs-dismiss="modal" class="btn btn-primary">Continue</button>
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
                            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                            {/* <div className='exam'>
                                <div class="card outer-card">
                                    <div class="d-flex align-items-center">
                                        <div class="ml-3 w-100">
                                            <div className="d-flex justify-content-start ">
                                                <div className="imagespace">
                                                    <img src={logo} class="imageLogo" width="30px" height="35px" />
                                                </div>
                                                <div >
                                                    <div className="Category_box justify-content-center">
                                                        <span className="Category" >Advance</span>
                                                    </div>
                                                    <div className=" About_box justify-content-center">
                                                        <span className="About">React course content mentioned bellow the line hbvburvbu</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
                                                <div class="d-flex flex-column justify-content-center noOfQues">
                                                    <span class="articles"> <MdOutlineBallot class='me-1.5' /> Questions</span>
                                                </div>
                                                <div class="d-flex flex-column justify-content-center testTime">
                                                    <span class="articles"><BsClock class='me-1.5' />  20 mins</span>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <Button className='btnclick' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Start Test</Button>{' '}
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
                                                                <button type="button" onClick={()=>{clickHandler()}} data-bs-dismiss="modal" class="btn btn-primary">Continue</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                            {/* <div className='exam'>
                                <div class="card outer-card">
                                    <div class="d-flex align-items-center">
                                        <div class="ml-3 w-100">
                                            <div className="d-flex justify-content-start ">
                                                <div className="imagespace">
                                                    <img src={logo} class="imageLogo" width="30px" height="35px" />
                                                </div>
                                                <div >
                                                    <div className="Category_box justify-content-center">
                                                        <span className="Category" >Intermideate</span>
                                                    </div>
                                                    <div className=" About_box justify-content-center">
                                                        <span className="About">React course content mentioned bellow the line hbvburvbu</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
                                                <div class="d-flex flex-column justify-content-center noOfQues">
                                                    <span class="articles"> <MdOutlineBallot class='me-1.5' /> Questions</span>
                                                </div>
                                                <div class="d-flex flex-column justify-content-center testTime">
                                                    <span class="articles"><BsClock class='me-1.5' />  20 mins</span>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <Button className='btnclick' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Start Test</Button>{' '}
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
                                                                <button type="button" onClick={()=>{clickHandler()}} data-bs-dismiss="modal" class="btn btn-primary">Continue</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className='exam'>
                                <div class="card outer-card">
                                    <div class="d-flex align-items-center">
                                        <div class="ml-3 w-100">
                                            <div className="d-flex justify-content-start ">
                                                <div className="imagespace">
                                                    <img src={logo} class="imageLogo" width="30px" height="35px" />
                                                </div>
                                                <div >
                                                    <div className="Category_box justify-content-center">
                                                        <span className="Category" >Beginner</span>
                                                    </div>
                                                    <div className=" About_box justify-content-center">
                                                        <span className="About">React course content mentioned bellow the line hbvburvbu</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
                                                <div class="d-flex flex-column justify-content-center noOfQues">
                                                    <span class="articles"> <MdOutlineBallot class='me-1.5' /> Questions</span>
                                                </div>
                                                <div class="d-flex flex-column justify-content-center testTime">
                                                    <span class="articles"><BsClock class='me-1.5' />  20 mins</span>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <Button className='btnclick' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Start Test</Button>{' '}
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
                                                                <button type="button" onClick={()=>{clickHandler()}} data-bs-dismiss="modal" class="btn btn-primary">Continue</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='exam'>
                                <div class="card outer-card">
                                    <div class="d-flex align-items-center">
                                        <div class="ml-3 w-100">
                                            <div className="d-flex justify-content-start ">
                                                <div className="imagespace">
                                                    <img src={logo} class="imageLogo" width="30px" height="35px" />
                                                </div>
                                                <div >
                                                    <div className="Category_box justify-content-center">
                                                        <span className="Category" >Beginner</span>
                                                    </div>
                                                    <div className=" About_box justify-content-center">
                                                        <span className="About">React course content mentioned bellow the line hbvburvbu</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
                                                <div class="d-flex flex-column justify-content-center noOfQues">
                                                    <span class="articles"> <MdOutlineBallot class='me-1.5' /> Questions</span>
                                                </div>
                                                <div class="d-flex flex-column justify-content-center testTime">
                                                    <span class="articles"><BsClock class='me-1.5' />  20 mins</span>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <Button className='btnclick' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Start Test</Button>{' '}
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
                                                                <button type="button" onClick={()=>{clickHandler()}} data-bs-dismiss="modal" class="btn btn-primary">Continue</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            
                            {/* ////////Demo////// */}


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TakeTest;
