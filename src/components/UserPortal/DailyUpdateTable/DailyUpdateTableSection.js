import React, { useEffect, useState } from "react";
import "./DailyUpdateTable.css";
import DatePicker from "./DatePicker";
import SearchBar from "./SearchBar";
import LearningTypeDropDown from "./LearningTypeDropDown";
import { Modal, Form } from "react-bootstrap";
import EmptyDailyUpdateTable from "./EmptyDailyUpdateTable";
import DurationClock from "../../../Assets/DurationClock.svg";
import ImageTooltip from "./ImageTooltip";
import DailyUpdateTableSectionSkeleton from "./DailyUpdateTableSectionSkeleton";

const DailyUpdateTableSection = (props) => {
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [dropdownFilterValue, setDropdownFilterValue] = useState("");
  const [dateFilterValue, setDateFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalSaveFlag, setModalSaveFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const fetchData = async () => {
    await fetch(
      `https://cg-interns-hq.azurewebsites.net/getDailyTaskTrackerRecords?userId=${props.userId}`
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setTableData(data.response);
        setOriginalTableData(data.response);
        setIsLoading(false);
      });
  };

  //Function to handle read more
  const handleReadMore = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const totalPaginationPages = Math.ceil(tableData?.length / resultsPerPage);
  const arrayStartIndex = (currentPage - 1) * resultsPerPage;
  const arrayEndIndex = arrayStartIndex + resultsPerPage;
  const arrayCurrentResults = tableData?.slice(arrayStartIndex, arrayEndIndex);
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

  const truncate = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    } else {
      return str;
    }
  };

  //Function to format YYYY-MM-DD to MM-DD-YYYY
  const dateFormat = (dateString) => {
    const dateObject = new Date(dateString);
    let formattedDate = dateObject.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate.replace(/\//g, "-");
  };

  //Function to convert a time string in the format "HH:MM:SS" to a 12-hour format with AM/PM.
  const convertTime = (timeString) => {
    const timeComponents = timeString?.split(":");
    let hour = parseInt(timeComponents[0]);
    const minute = timeComponents[1];
    const second = timeComponents[2];
    let meridiem = "AM";
    if (hour >= 12) {
      meridiem = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }
    if (hour === 0) {
      hour = 12;
    }
    const convertedTime = `${hour}:${minute} ${meridiem}`;
    return convertedTime;
  };
  const handleFiltersChange = () => {
    const getFilterItems = (items, searchValue) => {
      if (searchValue) {
        return items?.filter((item) =>
          item.topicName.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      return items;
    };

    const filterDropDown = (items, dropDownValue) => {
      if (dropDownValue && dropDownValue !== "Select learning type") {
        return items?.filter((item) => item.learning === dropDownValue);
      }

      return items;
    };

    const getFilterDate = (items, dateFilterValue) => {
      if (dateFilterValue !== "") {
        const dateObject = new Date(dateFilterValue);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        return items?.filter((item) => {
          const tempDateString = item.startDate;
          const tempDateArr = tempDateString.split("-");
          return (
            year === parseInt(tempDateArr[0]) &&
            month === parseInt(tempDateArr[1])
          );
        });
      }

      return items;
    };

    const filterItemsDropDown = filterDropDown(
      originalTableData,
      dropdownFilterValue
    );
    const filterItems = getFilterItems(filterItemsDropDown, searchFilterValue);
    const filterDate = getFilterDate(filterItems, dateFilterValue);
    setTableData(filterDate);
  };

  useEffect(() => {
    handleFiltersChange();
  }, [
    dropdownFilterValue,
    searchFilterValue,
    dateFilterValue,
    originalTableData,
  ]);

  return (
    <div className="mb-3">
      <div className="col-12 daily-update-table-style p-0">
        <div className="table-responsive" style={{ overflow: "visible" }}>
          <table id="example" className="table table-striped">
            <thead>
              <tr>
                <th className="dut-column-id">#</th>
                <th className="dut-column-date">Date</th>
                <th className="dut-column-learning">Learning Type</th>
                <th className="dut-column-topic">Topic</th>
                <th className="dut-column-comment">Comment</th>
                <th className="dut-column-duration">Duration</th>
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
              {isLoading ? (
                <>
                  <DailyUpdateTableSectionSkeleton />
                  <DailyUpdateTableSectionSkeleton />
                  <DailyUpdateTableSectionSkeleton />
                  <DailyUpdateTableSectionSkeleton />
                  <DailyUpdateTableSectionSkeleton />
                  <DailyUpdateTableSectionSkeleton />
                  <DailyUpdateTableSectionSkeleton />
                  <DailyUpdateTableSectionSkeleton />
                </>
              ) : arrayCurrentResults == undefined ||
                arrayCurrentResults?.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyDailyUpdateTable />
                  </td>
                </tr>
              ) : (
                arrayCurrentResults?.map((item, index) => {
                  const isLastTooltip =
                    index === arrayCurrentResults?.length - 1;
                  const isSecondLastTooltip =
                    index === arrayCurrentResults?.length - 2;
                  const tooltipClassName = isLastTooltip || isSecondLastTooltip;
                  const activityLength = item.activityTime.length; //To calculate length of activityTime array that i'm getting from backend

                  return (
                    <tr key={index}>
                      <td>{arrayStartIndex + index + 1}</td>
                      <td>{dateFormat(item.startDate)}</td>
                      <td>{item.learning}</td>
                      <td>{item.topicName}</td>
                      <td>
                        {truncate(item.comment, 35)}
                        <span
                          className="text-decoration-underline"
                          style={{ color: "#28519E", cursor: "pointer" }}
                          onClick={() => {
                            setModalSaveFlag(true);
                            handleReadMore(item);
                          }}
                        >
                          Read more
                        </span>
                      </td>
                      <td>
                        {item.totalTime}
                        <ImageTooltip
                          src={DurationClock}
                          alt="Clock Icon"
                          tooltipHead="Activity Time"
                          firstActivity={
                            activityLength >= 1
                              ? convertTime(item.activityTime[0].startedAt) +
                                " - " +
                                convertTime(item.activityTime[0].endedAt)
                              : ""
                          }
                          secondActivity={
                            activityLength >= 2
                              ? convertTime(item.activityTime[1].startedAt) +
                                " - " +
                                convertTime(item.activityTime[1].endedAt)
                              : ""
                          }
                          thirdActivity={
                            activityLength >= 3
                              ? convertTime(item.activityTime[0].startedAt) +
                                " - " +
                                convertTime(item.activityTime[0].endedAt)
                              : ""
                          }
                          fourthActivity={
                            activityLength >= 4
                              ? convertTime(item.activityTime[0].startedAt) +
                                " - " +
                                convertTime(item.activityTime[0].endedAt)
                              : ""
                          }
                          fifthActivity={
                            activityLength >= 5
                              ? convertTime(item.activityTime[0].startedAt) +
                                " - " +
                                convertTime(item.activityTime[0].endedAt)
                              : ""
                          }
                          styleclassName={tooltipClassName}
                        />
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
                <Modal.Header
                  closeButton
                  style={{
                    borderBottom:
                      "0.063rem solid var(--bs-modal-header-border-color)",
                  }}
                >
                  <Modal.Title
                    style={{ fontSize: "1.1rem", fontWeight: "600" }}
                  >
                    Daily Update
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    <span>Learning Type:</span>{" "}
                    <span className="opacity-75">
                      {selectedItem && selectedItem.learning}
                    </span>
                  </p>
                  <p>
                    <span>Topic:</span>{" "}
                    <span className="opacity-75">
                      {selectedItem && selectedItem.topicName}
                    </span>
                  </p>

                  <Form.Group>
                    <Form.Label>
                      <span>Comment: </span>
                    </Form.Label>
                    <Form.Control
                      className="opacity-75"
                      disabled
                      as="textarea"
                      style={{ fontSize: "0.813rem" }}
                      defaultValue={selectedItem && selectedItem.comment}
                      rows={4}
                      cols={60}
                    ></Form.Control>
                  </Form.Group>
                </Modal.Body>
              </Modal>
            </tbody>
            <tfoot>
              <tr>
                <td className="f-bold" colSpan={2}>
                  Total Items: {tableData?.length}
                </td>
                <td></td>
                <td></td>
                <td colSpan={2}>
                  <div
                    className="d-flex justify-content-end"
                    style={{ color: "#706F73" }}
                  >
                    <div className="d-flex align-items-center">
                      <p className="me-2 mb-0" style={{ whiteSpace: "nowrap" }}>
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
  );
};

export default DailyUpdateTableSection;
