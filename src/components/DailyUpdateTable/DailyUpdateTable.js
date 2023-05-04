import React, { useEffect, useState } from "react";
import "./DailyUpdateTable.css";
import DatePicker from "./DatePicker";
import SearchBar from "./SearchBar";
import tableArr from "./TableArr";
import LearningTypeDropDown from "./LearningTypeDropDown";
import { Modal, Button, Form } from "react-bootstrap";
import ReadMore from "../../Assets/ReadMore.svg"

const DailyUpdateTable = () => {
  const [tableData, setTableData] = useState(tableArr);
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [dropdownFilterValue, setDropdownFilterValue] = useState("");
  const [dateFilterValue, setDateFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [flag, setFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const handleReadMore = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  }

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

  const handleSave = () => {
    const updatedTableArr = [...tableArr];
    updatedTableArr[selectedItem.id - 1].comment = editedComment;
    setTableData(updatedTableArr);
    // handleCloseModal();
  };

  const handleFiltersChange = () => {
    let filteredData = tableArr;
    if (searchFilterValue !== "") {
      console.log("Inside search")
      filteredData = filteredData.filter(
        (item) =>
          item.topics.toLowerCase().includes(searchFilterValue.toLowerCase()) //Instead of includes we can use startsWith
      );
    }
    if (
      dropdownFilterValue !== "" &&
      dropdownFilterValue !== "Select learning type"
    ) {
      console.log("Hemlo drop")
      filteredData = filteredData.filter(
        (item) => item.learningType === dropdownFilterValue
      );
    }
    // else if (dropdownFilterValue === "Select learning type") {
    //   console.log("Hemlo drop part 2")
    //   filteredData = tableArr; // Reset the filtered data to the original array
    // }

    if (dateFilterValue !== "") {
      const dateObject = new Date(dateFilterValue);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;

      filteredData = filteredData.filter((item) => {
        const tempDateString = item.date;
        const tempDateArr = tempDateString.split("-");
        return (
          year === parseInt(tempDateArr[2]) &&
          month === parseInt(tempDateArr[1])
        );
      });

      setFlag(true);
      console.log("first");
    } else if (flag && dateFilterValue == "") {
      filteredData = tableArr; // Reset the filtered data to the original array
      console.log("Hi");
    }
    setTableData(filteredData);
  };

  useEffect(() => {
    handleFiltersChange();
  }, [searchFilterValue, dropdownFilterValue, dateFilterValue]);

  const truncate = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength);
    } else {
      return str;
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
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
      <div className="row mb-3">
        <div className="col-11 daily-update-table-style p-0">
          <div className="table-responsive">
            <table id="example" className="table table-striped">
              <thead>
                <tr>
                  <th className="column-id">#</th>
                  <th className="column-date">Date</th>
                  <th className="column-learning">Learning Type</th>
                  <th className="column-topic">Topic/Description</th>
                  <th className="column-comment">Comment</th>
                  <th className="column-duration">Duration</th>
                </tr>
              </thead>
              <tbody>
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

                {arrayCurrentResults.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{arrayStartIndex + index + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.learningType}</td>
                      <td>{item.topics}</td>
                      <td>{
                        <div>
                          {truncate(item.comment, 120)}&nbsp;
                          <img src={ReadMore} alt="..." onClick={() => {
                            handleReadMore(item)
                          }}/>
                        </div>
                      }
                      </td>
                      <td>{item.duration}</td>
                    </tr>
                  );
                })}
                <Modal size="lg" dialogClassName="modal-90w" centered show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{fontSize: "1.4rem"}}>Daily Update</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p><span className="fw-bold">Learning Type:</span> <span className="opacity-75">{selectedItem && selectedItem.learningType}</span></p>
                    <p><span className="fw-bold">Topic:</span> <span className="opacity-75">{selectedItem && selectedItem.topics}</span></p>

                    <Form.Group>
                      <Form.Label><span className="fw-bold">Comment: </span></Form.Label>
                      <Form.Control className="opacity-75" as="textarea" onChange={(event) => setEditedComment(event.target.value)} style={{fontSize: "0.813rem"}} rows={4} cols={60}>{selectedItem && selectedItem.comment}</Form.Control>
                    </Form.Group>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-primary" onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                      setShowModal(false);
                      handleSave()
                    }}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>

              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Total Items: {tableData.length}</td>
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
                            className={`page-item me-1 ${currentPage === 1 ? "page-item disabled" : ""
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
                                    currentPage === 1 ? "#A4A3A7" : "#28519E"
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
                              className={`page-item me-1 ${page === currentPage ? "active" : ""
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                              >
                                {page}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`page-item ${currentPage === totalPaginationPages
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
  );
};

export default DailyUpdateTable;
