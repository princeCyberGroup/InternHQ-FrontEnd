import React, { useEffect } from "react";
import { useContext } from "react";
import { useState, createContext } from "react";
import { ReactComponent as LeftToRetake } from "../../../../Assets/leftToReatake.svg";
import { ReactComponent as Completed } from "../../../../Assets/Testcompleted.svg";
import { ReactComponent as GoldStarOri } from "../../../../Assets/Star-Icon-gold-ori.svg";
import { ReactComponent as SilverStarOri } from "../../../../Assets/Star-Icon-silver-ori.svg";
import { ReactComponent as BronzeStarOri } from "../../../../Assets/Star-Icon-bronze-ori.svg";
import CryptoJS from "crypto-js";
// import logo from '../../../Assets/image 13.png';
import "./TakeTest.css";
import { BsClock } from "react-icons/bs";
import { MdOutlineBallot } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "../../../../Context/Context";
import TakeTestSkeleton from "./TakeTestSkeleton";

export const TestContext = createContext();

const TakeTest = ({ test }) => {
  const [activeButton, setActiveButton] = useState("all");
  const { score } = useContext(UserContext);

  const [daysDifference, setDaysDifference] = useState(
    calculateDaysDifference()
  );

  // const [searchQuery, setSearchQuery] = useState("");
  const [tests, setTests] = useState([]);
  const [originalTests, setOriginalTests] = useState([]);
  const [allData, setAllData] = useState([]);
  const [data, setdata] = useState();
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      fetchTests();
    }, 1000);
  }, []);
  const fetchTests = async (examId) => {
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
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v2/getAllExam",
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      const data = await response.json();
      setAllData(data);
      setTests(data);
      setOriginalTests(data);
      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching exam details:", e);
    }
  };
  const handleFiltersChange = () => {
    const getFilterItems = (items, searchValue) => {
      if (searchValue) {
        return items.filter((item) =>
          item.techName?.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      return items;
    };
    const filters = getFilterItems(originalTests, searchFilterValue);
    setTests(filters);
  };

  useEffect(() => {
    handleFiltersChange();
  }, [searchFilterValue]);

  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (
    examId,
    examName,
    examDuration,
    numberOfQuestion,
    techName,
    level
  ) => {
    setdata({
      examId: examId,
      examName: examName,
      examDuration: examDuration,
      numberOfQuestion: numberOfQuestion,
      techName: techName,
      level: level,
    });
  };
  const clickCont = () => {
    navigate("/take-your-test", { state: data });
  };

  function calculateDaysDifference() {
    const currentDate = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return Math.floor(
      (currentDate.getTime() - twoDaysAgo.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
  let statusDiv;
  if (score > 8) {
    statusDiv = (
      <div className="statusOfTEstCompleted">
        <Completed />
      </div>
    );
  } else if (daysDifference >= 2) {
    statusDiv = (
      <div className="statusOftest">
        <LeftToRetake />
      </div>
    );
  }
  return (
    <>
      <div className="TTheading">
        <p>Take The Test</p>
      </div>
      <div className="card maincard">
        <div className="card-header-nav mt-1">
          <div
            className={`nav-btn pointer ${
              activeButton === "all" ? "activated" : ""
            }`}
            onClick={() => {
              setActiveButton("all");
              setTests(allData);
            }}
          >
            <button className="btn-nav p-0">All</button>
          </div>
          <div
            className={`nav-btn pointer ${
              activeButton === "beginner" ? "activated" : ""
            }`}
            onClick={() => {
              setActiveButton("beginner");
              setTests(allData.filter((tests) => tests.level === "Beginner"));
            }}
          >
            <button className="btn-nav p-0">Beginner</button>
          </div>
          <div
            className={`nav-btn pointer ${
              activeButton === "inter" ? "activated" : ""
            }`}
            onClick={() => {
              setActiveButton("inter");
              setTests(
                allData.filter((tests) => tests.level === "Intermediate")
              );
            }}
          >
            <button className="btn-nav p-0">Intermediate</button>
          </div>
          <div
            className={`nav-btn pointer ${
              activeButton === "advanced" ? "activated" : ""
            }`}
            onClick={() => {
              setActiveButton("advanced");
              setTests(allData.filter((tests) => tests.level === "Advance"));
            }}
          >
            <button className="btn-nav p-0">Advanced</button>
          </div>
          <div className="search-bar" style={{ margin: "auto" }}>
            <input
              className="sea"
              type="text"
              value={searchFilterValue}
              placeholder="Search"
              onChange={(event) => {
                event.preventDefault();
                setSearchFilterValue(event.target.value);
              }}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="card-body  p-0">
            <div className="row cards main-card-inside mx-0">
              <div className="row">
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
                <TakeTestSkeleton />
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body p-0">
            <div className="row cards main-card-inside mx-0">
              <div className="row">
                {tests?.map((test, key) => (
                  <div
                    className="exam"
                    style={{ marginLeft: "9px", marginRight: "8px" }}
                    key={key}
                  >
                    <div className="card outer-card">
                      <div className="d-flex align-items-center">
                        <div className="ml-3 w-100">
                          <div className="d-flex justify-content-start ">
                            <div className="imagespace">
                              <img
                                src={test.techImageLink}
                                className="imageLogo"
                                width="1.875rem"
                                height="2.188rem"
                              />
                            </div>
                            <div>
                              <div className="Category_box justify-content-center">
                                <span className="Category">
                                  {test.level} &nbsp;
                                  {test.level === "Beginner" ? (
                                    <BronzeStarOri />
                                  ) : test.level === "Intermediate" ? (
                                    <SilverStarOri />
                                  ) : test.level === "Advance" ? (
                                    <GoldStarOri />
                                  ) : null}
                                </span>
                              </div>
                              <div className=" About_box justify-content-center">
                                <span className="About">{test.examName}</span>
                              </div>
                            </div>
                          </div>
                          <div className=" col d-flex justify-content-between eounded text-grey quesTimeClick ">
                            <div className="d-flex flex-column justify-content-center noOfQues">
                              <div className="articles d-flex justify-content-center">
                                <MdOutlineBallot
                                  style={{ marginRight: "0.313rem" }}
                                />
                                {test.numberOfQuestion} Questions
                              </div>
                            </div>
                            <div className="d-flex flex-column justify-content-center testTime">
                              <div className="articles d-flex justify-content-center ">
                                <BsClock style={{ marginRight: "0.313rem" }} />
                                {test.examDuration} mins
                              </div>
                            </div>
                            <div className="d-flex flex-column">
                              <Button
                                onClick={() =>
                                  clickHandler(
                                    test.examId,
                                    test.examName,
                                    test.examDuration,
                                    test.numberOfQuestion,
                                    test.techName,
                                    test.level
                                  )
                                }
                                className="btnclick"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                              >
                                Start Test
                              </Button>
                            </div>
                            <div
                              className="modal fade"
                              id="staticBackdrop"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabIndex="-1"
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
                                      Instructions
                                    </span>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <ol style={{ listStyleType: "decimal" }}>
                                      <li>
                                        {" "}
                                        It is important to adhere to the given
                                        time limit and complete all the required
                                        tasks within the period
                                      </li>
                                      <li>
                                        {" "}
                                        To receive a star as a recognition of
                                        your performance, you need to meet a
                                        requirement of achieving a score of 80%
                                        or higher.
                                      </li>
                                      <li>
                                        If you do not achieve a minimum score of
                                        80%, you will be required to take the
                                        test again after a period of 2 days.
                                      </li>
                                    </ol>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-outline-primary"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => clickCont()}
                                      data-bs-dismiss="modal"
                                      className="btn btn-primary"
                                    >
                                      Continue
                                    </button>
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
        )}
      </div>
    </>
  );
};

export default TakeTest;
