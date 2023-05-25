// import React from "react";
// import { useState } from "react";
// import "./TakeYourTest.css";
// import "./TakeTest.js";
// import Button from 'react-bootstrap/Button';
// const TakeYourTest = () => {
//     const [activeButton, setActiveButton] = useState("all");
//     const [searchQuery, setSearchQuery] = useState("");
//     const handleSearch = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     return (
//         <>
//             <div className="TTheading">
//                 <p>Name from previous tab </p>
//             </div>

//             <div className="card" style={{ width: "950px" }}>
//                 <div className="card-header-nav">
//                     <div
//                         className={`nav-btn ${activeButton === "all" ? "activated" : ""}`}
//                     >
//                         <button
//                             className="btn-nav p-0"
//                             onClick={() => {
//                                 setActiveButton("all");
//                             }}
//                         >
//                             All
//                         </button>
//                     </div>

//                     <div
//                         className={`nav-btn ${activeButton === "beginner" ? "activated" : ""
//                             }`}
//                     >
//                         <button
//                             className="btn-nav p-0"
//                             onClick={() => {
//                                 setActiveButton("beginner");
//                             }}
//                         >
//                             Beginner
//                         </button>
//                     </div>

//                     <div
//                         className={`nav-btn ${activeButton === "inter" ? "activated" : ""}`}
//                     >
//                         <button
//                             className="btn-nav p-0"
//                             onClick={() => {
//                                 setActiveButton("inter");
//                             }}
//                         >
//                             Intermediate
//                         </button>
//                     </div>

//                     <div
//                         className={`nav-btn ${activeButton === "advanced" ? "activated" : ""
//                             }`}
//                     >
//                         <button
//                             className="btn-nav p-0"
//                             onClick={() => {
//                                 setActiveButton("advanced");
//                             }}
//                         >
//                             Advanced
//                         </button>
//                     </div>

//                     <div className="search-bar" style={{ margin: "auto" }}>
//                         <input
//                             className="sea"
//                             type="text"
//                             value={searchQuery}
//                             onChange={handleSearch}
//                             placeholder="Search"
//                         />
//                     </div>
//                 </div>

//                 <div
//                     class="card-body p-0"
//                     style={{ maxHeight: "50rem", overflow: "auto" }}
//                 >
//                     <div className="row cards">
//                             <div className="row d-flex justify-content-evenly">
// {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
//                                 {/* <div className='exam'>
//                                     <div class="card">
//                                         <div class="d-flex align-items-center">
//                                             <div class="ml-3 w-100">
//                                                 <div className="d-flex justify-content-start ">
//                                                     <div className="imagespace">
//                                                         <img src={logo} class="imageLogo" width="30px" height="35px" />
//                                                     </div>
//                                                     <div >
//                                                         <div className="Category_box justify-content-center">
//                                                             <span className="Category" >Beginner</span>
//                                                         </div>
//                                                         <div className=" About_box justify-content-center">
//                                                             <span className="About">React course content mentioned bellow the line hbvburvbu</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div class=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
//                                                     <div class="d-flex flex-column justify-content-center noOfQues">
//                                                         <span class="articles"> <MdOutlineBallot class='me-1.5' /> Questions</span>
//                                                     </div>
//                                                     <div class="d-flex flex-column justify-content-center testTime">
//                                                         <span class="articles"><BsClock class='me-1.5' />  20 mins</span>
//                                                     </div>
//                                                     <div class="d-flex flex-column">
//                                                         <Button className='btnclick'>Start Test</Button>{' '}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div> */}
// {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

//                     </div>
//                 </div>
//             </div>
//             </div>
//         </>
//     );
// };

// export default TakeYourTest;
