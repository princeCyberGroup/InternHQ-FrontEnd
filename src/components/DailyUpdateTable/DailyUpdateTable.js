import React, { useEffect, useState } from "react";
import "./DailyUpdateTable.css";
import DatePicker from "./DatePicker";
import SearchBar from "./SearchBar";
import tableArr from "./TableArr";
import LearningTypeDropDown from "./LearningTypeDropDown";
import { Modal, Button, Form } from "react-bootstrap";
import ReadMore from "../../Assets/ReadMore.svg";
import EmptyDailyUpdateTable from "./EmptyDailyUpdateTable";
import Header from "../Header";
import axios from "axios";
import DurationClock from "../../Assets/DurationClock.svg"
import ImageTooltip from "./ImageTooltip";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import {Tooltip} from 'react-tooltip';
// import 'react-tooltip/dist/index.css';

const DailyUpdateTable = () => {
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [dropdownFilterValue, setDropdownFilterValue] = useState("");
  const [dateFilterValue, setDateFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [datemodalSaveFlag, setDatemodalSaveFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [modalSaveFlag, setModalSaveFlag] = useState(true);
  const [timeLeftmessage, setTimeLeftMessage] = useState(""); //Time left to edit comment in modal
  useEffect(() => {
    // setLoading(true);
    fetchData();
    // loading?"":
    // handleFiltersChange();
  }, []);
  
  // useEffect(() => {
  //   handleFiltersChange();
  // }, [searchFilterValue, dropdownFilterValue, dateFilterValue]);

  const fetchData = async () => {
    await fetch(
      "https://cg-interns-hq.azurewebsites.net/getDailyTaskTrackerRecords?userId=30"
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
          setTableData(data.response);
          console.log(data.response);
      });
  };
  let editableTime = Date.now();
  let currentTime = Date.now();

  const handleReadMore = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // console.log(tableData, "This table data is null")
  const totalPaginationPages = Math.ceil(tableData.length / resultsPerPage);
  const arrayStartIndex = (currentPage - 1) * resultsPerPage;
  const arrayEndIndex = arrayStartIndex + resultsPerPage;
  const arrayCurrentResults = tableData.slice(arrayStartIndex, arrayEndIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); //To scroll all the way up whenever page gets clicked
  };
  const handlePrevPageChange = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo(0, 0);
  };
  const handleNextPageChange = () => {
    if (currentPage != totalPaginationPages) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(event.target.value);
    setCurrentPage(1);
  };


  // const handleSave = () => {
  //   const updatedTableArr = [...tableArr];
  //   updatedTableArr[selectedItem.id - 1].comment = editedComment;
  //   setTableData(updatedTableArr);
  // };
  // const handleEdit = (event) => {
  //   var editableTime = selectedItem.timestamp + 48 * 60 * 60 * 1000; //48 hours in milliseconds
  //   var currentTime = Date.now();
  //   if (currentTime <= editableTime) {
  //     console.log(currentTime);
  //     console.log(editableTime);
  //     // setEditedComment(event.target.value);
  //     // setModalSaveFlag(false);
  //   } else {
  //     console.log(currentTime);
  //     console.log(editableTime);
  //     // setModalSaveFlag(true);
  //   }
  // };

  // const handleFiltersChange = () => {
  //   // console.log("dwdw",tableData);
  //   let filteredData = tableData;

  //   console.log("object",filteredData   );
  //   if (searchFilterValue !== "") {
  //     console.log(searchFilterValue ," I am the search filter Value");
  //     filteredData = filteredData.filter(

  //       (item) =>(

  //         item.topic_name
  //           .toLowerCase().includes((searchFilterValue.toLowerCase())))

  //           // (searchFilterValue.toLowerCase()))
  //            //Instead of includes we can use startsWith
  //     );

  //     // console.log(filteredData,"printing one by one")
  //   }

  //   if (
  //     dropdownFilterValue !== "" &&
  //     dropdownFilterValue !== "Select learning type"
  //   ) {
  //     console.log("I am here",dropdownFilterValue);
  //     filteredData = filteredData.filter(
  //       (item) => item.learning_type === dropdownFilterValue
  //     );
  //     console.log(filteredData ,"just now")
  //   }
  //   // else if (dropdownFilterValue === "Select learning type") {
  //   //   filteredData = tableArr; // Reset the filtered data to the original array
  //   // }

  //   if (dateFilterValue !== "") {
  //     const dateObject = new Date(dateFilterValue);
  //     const year = dateObject.getFullYear();
  //     const month = dateObject.getMonth() + 1;

  //     filteredData = filteredData.filter((item) => {
  //       const tempDateString = item.start_date;
  //       const tempDateArr = tempDateString.split("-");
  //       return (
  //         year === parseInt(tempDateArr[0]) &&
  //         month === parseInt(tempDateArr[1])
  //       );
  //     });

  //     setDatemodalSaveFlag(true);
  //   } else if (datemodalSaveFlag && dateFilterValue == "") {
  //     filteredData = tableData; // Reset the filtered data to the original array
  //   }

  //   // if(!searchFilterValue && (!dropdownFilterValue && dropdownFilterValue==='Select learning type') && !dateFilterValue ){
  //   //   setTableData(copydata);
  //   //   return;
  //   // }
  //   console.log(filteredData ," before setting");
  //   setTableData(filteredData);
  // };

  const truncate = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str.slice(0, maxLength);
    } else {
      return str;
    }
  };

  // const handleFiltersChange = () => {
  //   // let filteredData = tableData
  //   const filterItemsDropDown = filterDropDown(tableData, dropdownFilterValue);
  //   const filterDropDown = (filteredData, dropdownFilterValue) => {
  //     if (dropdownFilterValue && dropdownFilterValue !== "Select learning type") {
  //       // console.log("I am here", dropDownValue);
  
  //       return filteredData.filter((item) => item.learning_type === dropdownFilterValue);
  //     }
  
  //     return filteredData;
  //   };
  //   const filterItems = getFilterItems(filterItemsDropDown, searchFilterValue);
  //   const getFilterItems = (filterDropDown, searchValue) => {
  //     // console.log(searchValue);
  
  //     if (searchValue) {
  //       return filterDropDown.filter((item) =>
  //         item.topic_name.toLowerCase().includes(searchValue.toLowerCase())
  //       );
  //     }
  
  //     return filterDropDown;
  //   };
  
  //   const filterDate = getFilterDate(filterItems, dateFilterValue);
  //   const getFilterDate = (getFilterItems, dateFilterValue) => {
  //     if (dateFilterValue !== "") {
  //       const dateObject = new Date(dateFilterValue);
  
  //       const year = dateObject.getFullYear();
  
  //       const month = dateObject.getMonth() + 1;
  
  //       return getFilterItems.filter((item) => {
  //         const tempDateString = item.start_date;
  
  //         const tempDateArr = tempDateString.split("-");
  
  //         return (
  //           year === parseInt(tempDateArr[0]) &&
  //           month === parseInt(tempDateArr[1])
  //         );
  //       });
  //     }
  
  //     return getFilterItems;
  //   };
  //   // filteredData = getFilterDate;
  //   console.log(filterDate, "Filter Items");
  // }
  const getFilterItems = (items, searchValue) => {
    // console.log(searchValue);

    if (searchValue) {
      return items.filter((item) =>
        item.topic_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return items;
  };

  const filterDropDown = (items, dropDownValue) => {
    if (dropDownValue && dropDownValue !== "Select learning type") {
      // console.log("I am here", dropDownValue);

      return items.filter((item) => item.learning_type === dropDownValue);
    }

    return items;
  };

  const getFilterDate = (items, dateFilterValue) => {
    if (dateFilterValue !== "") {
      const dateObject = new Date(dateFilterValue);

      const year = dateObject.getFullYear();

      const month = dateObject.getMonth() + 1;

      return items.filter((item) => {
        const tempDateString = item.start_date;

        const tempDateArr = tempDateString.split("-");

        return (
          year === parseInt(tempDateArr[0]) &&
          month === parseInt(tempDateArr[1])
        );
      });
    }

    return items;
  };

  const filterItemsDropDown = filterDropDown(tableData, dropdownFilterValue);

  const filterItems = getFilterItems(filterItemsDropDown, searchFilterValue);

  const filterDate = getFilterDate(filterItems, dateFilterValue);

  // useEffect(() => {
  //   setTableData(filterDate)
  // }, [filterDate])

  // console.log(filterDate, "Now this is filtered")
  return (
    <>
      <Header />
        <div className="container-fluid daily-update-table-container d-flex flex-column align-items-center">
          <div className="daily-update-table-wrapper ">
          <div className="row ">
            <div className="col-12">
              <div className="daily-update-nav-bar">
                <p>Dashboard &gt; Daily Update</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="daily-update-heading">
                <p>Daily Update</p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="col-12 daily-update-table-style p-0">
              <div className="table-responsive">
                <table id="example" className="table table-striped">
                  <thead>
                    <tr>
                      <th className="column-id">#</th>
                      <th className="column-date">Date</th>
                      <th className="column-learning">Learning Type</th>
                      <th className="column-topic">Topic</th>
                      <th className="column-comment">Comment</th>
                      <th className="column-duration">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    <tr>
                      <td></td>
                      <td>
                        <DatePicker
                          datefunc={(dateFilterValue) => {
                            //Getting the value for dateFilterValue from DatePicker Component
                            setDateFilterValue(dateFilterValue);
                          }}
                        />
                      </td>
                      <td>
                        <LearningTypeDropDown
                          dropdownfunc={(
                            dropdownFilterValue //Getting the value for dropdownFilterValue from LearningTypeDropDown Component
                          ) => setDropdownFilterValue(dropdownFilterValue)}
                        />
                      </td>
                      <td>
                        <SearchBar
                          searchfunc={(searchFilterValue) =>
                            setSearchFilterValue(searchFilterValue)
                          } //Getting the value for searchFilterValue from SearchBar Component
                        />
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    {arrayCurrentResults.length === 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <EmptyDailyUpdateTable />
                        </td>
                      </tr>
                    ) : (
                      arrayCurrentResults.map((item, index) => {
                        const isLastTooltip = index === arrayCurrentResults.length - 1;
  const isSecondLastTooltip = index === arrayCurrentResults.length - 2;
  const tooltipClassName = isLastTooltip || isSecondLastTooltip;
                        return (
                          <tr key={index}>
                            <td>{arrayStartIndex + index + 1}</td>
                            <td>{item.start_date}</td>
                            <td>{item.learning_type}</td>
                            <td>{item.topic_name}</td>
                            <td>
                            {/* Azure is a powerful and widely used cloud computing platform offered by Microsoft. It provides a vast array of services and tools for building, deploying, and managing various applications and services */}
                                 {/* <div> */}
                                 {/* {item.comment} */}
                                  {truncate(item.comment, 35)} &nbsp;
                                  <img
                                    src={ReadMore}
                                    alt="..."
                                    onClick={() => {
                                      setModalSaveFlag(true);
                                      handleReadMore(item);
                                    }}
                                  />
                                  {/* </p> */}
                                 {/* </div> */}
                              
                            </td>
                            <td>{item.total_time}
                            <ImageTooltip
                            src={DurationClock}
                            alt="Clock Icon"
                            tooltipHead="Activity Time"
                            tooltipBody="10:45 AM - 11:05 AM\n12:05 AM - 12:25 AM\n02:05 AM - 02:45 AM\n05:00 AM - 06:10 AM"
                            styleClass = {tooltipClassName}
                            />
                            {/* <img src={DurationClock} alt="Clock Icon" data-tip="Tooltip Text"/>
                            <Tooltip effect="solid" /> */}
                            </td>
                          </tr>
                        );
                      })
                    )}

                    <Modal
                      size="lg"
                      dialogClassName="modal-90w"
                      centered
                      show={showModal}
                      onHide={() => setShowModal(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: "1.4rem" }}>
                          Daily Update
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          <span className="fw-bold">Learning Type:</span>{" "}
                          <span className="opacity-75">
                            {selectedItem && selectedItem.learningType}
                          </span>
                        </p>
                        <p>
                          <span className="fw-bold">Topic:</span>{" "}
                          <span className="opacity-75">
                            {selectedItem && selectedItem.topics}
                          </span>
                        </p>

                        <Form.Group>
                          <Form.Label>
                            <span className="fw-bold">Comment: </span>
                          </Form.Label>
                          <Form.Control
                            className="opacity-75"
                            as="textarea"
                            // onChange={handleEdit}
                            style={{ fontSize: "0.813rem" }}
                            defaultValue={selectedItem && selectedItem.comment}
                            rows={4}
                            cols={60}
                          ></Form.Control>
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <span className="text-danger">{timeLeftmessage}</span>
                          <div>
                            <Button
                              variant="outline-primary"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="ms-2"
                              variant="primary"
                              disabled={modalSaveFlag}
                              onClick={() => {
                                setShowModal(false);
                                // handleSave();
                              }}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </Modal.Footer>
                    </Modal>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="f-bold" colSpan={2}>
                        Total Items: {tableData.length}
                      </td>
                      <td></td>
                      <td></td>
                      <td colSpan={2}>
                        <div
                          className="d-flex justify-content-end"
                          style={{ color: "#706F73" }}
                        >
                          <div className="d-flex align-items-center">
                            <p
                              className="me-2 mb-0"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Results per page
                            </p>
                            <select
                              style={{ color: "#706F73" }}
                              className="form-select m-2"
                              value={resultsPerPage}
                              onChange={handleResultsPerPageChange}
                            >
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="30">30</option>
                            </select>
                            <ul className="pagination mb-0">
                              <li
                                className={`page-item me-1 ${
                                  currentPage === 1 ? "page-item disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={handlePrevPageChange}
                                >
                                  <svg
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7 1.5L1.5 7L7 12.5"
                                      stroke={
                                        currentPage === 1
                                          ? "#A4A3A7"
                                          : "#28519E"
                                      }
                                      strokeWidth="1.5"
                                    />
                                  </svg>
                                </button>
                              </li>
                              {Array.from(
                                { length: totalPaginationPages },
                                (_, i) => i + 1
                              ).map((page) => (
                                <li
                                  key={page}
                                  className={`page-item me-1 ${
                                    page === currentPage ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link rounded pagination-styling"
                                    onClick={() => handlePageChange(page)}
                                  >
                                    {page}
                                  </button>
                                </li>
                              ))}
                              <li
                                className={`page-item ${
                                  currentPage === totalPaginationPages
                                    ? "page-item disabled"
                                    : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={handleNextPageChange}
                                >
                                  <svg
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1 12.5L6.5 7L1 1.5"
                                      stroke={
                                        currentPage === totalPaginationPages
                                          ? "#A4A3A7"
                                          : "#28519E"
                                      }
                                      strokeWidth="1.5"
                                    />
                                  </svg>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          </div>
        </div>
      
    </>
  );
};

export default DailyUpdateTable;
