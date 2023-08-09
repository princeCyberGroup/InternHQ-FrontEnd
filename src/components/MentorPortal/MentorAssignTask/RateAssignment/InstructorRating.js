import React, { useState, useEffect, useRef } from "react";
import "./InstructorRating.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Header/Header";
import { ReactComponent as Chevron } from "../../../../Assets/Vectorchevron.svg";
import { ReactComponent as InfoIcon } from "../../../../Assets/InfoIcon.svg";
import CryptoJS from "crypto-js";
import axios from "axios";

const InstructorRating = () => {
  //data
  const navigate = useNavigate();
  const [originaltableData, setOriginalTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const ratingArray = [
    "Not Acceptable",
    "Needs Improvement",
    "Meets Requirement",
    "Exceeds Expectations",
  ];
  const [editedRows, setEditedRows] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState("");
  const data = localStorage.getItem("userData");
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  const taskIdValue = parseInt(
    CryptoJS.AES.decrypt(
      sessionStorage.getItem("taskId"),
      process.env.REACT_APP_TASK_ID
    ).toString(CryptoJS.enc.Utf8)
  );
  const taskTitle = CryptoJS.AES.decrypt(
    sessionStorage.getItem("title"),
    process.env.REACT_APP_TASK_ID
  ).toString(CryptoJS.enc.Utf8);
  var parsedObject;
  const cancelToken = axios.CancelToken.source();
  //function
  const fetchData = () => {
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      parsedObject = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/v4/task-reviews?taskId=${taskIdValue}`,
        {
          headers: { Authorization: `Bearer ${parsedObject["token"]}` },
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        setOriginalTableData(
          res.data.response.map((value) => {
            return { ...value };
          })
        );
        setTableData(
          res.data.response.map((value) => {
            return { ...value };
          })
        );
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        }
        const errorCode = error.response.status;
        if (errorCode === 401) {
          navigate("/error/statusCode=401");
        }
        if (errorCode === 400) {
          navigate("/error/statusCode=400");
        }
        if (errorCode === 500) {
          navigate("/error/statusCode=500");
        }
        if (errorCode === 404) {
          navigate("/error/statusCode=404");
        }
      });
  };
  const areOtherFieldsEdited = (rowData, column) => {
    const otherColumns = Object.keys(rowData).filter(
      (key) =>
        key !== "firstName" &&
        key !== "lastName" &&
        key !== "userId" &&
        key !== "overall"
    );
    return otherColumns.some((col) => col === column && rowData[col] !== "");
  };
  const handleInputChange = (e, rowIndex, column) => {
    let value = e.target.value;
    value = value.replace(/[^1-4]/g, "").slice(0, 1);
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][column] = value;
    setTableData(updatedTableData);
    const sum = Object.keys(updatedTableData[rowIndex]).reduce((acc, key) => {
      if (
        key !== "userId" &&
        key !== "firstName" &&
        key !== "lastName" &&
        key !== "overall"
      ) {
        const intValue = parseInt(updatedTableData[rowIndex][key], 10);
        if (!isNaN(intValue)) {
          return acc + intValue;
        }
      }
      return acc;
    }, 0);

    updatedTableData[rowIndex]["overall"] =
      sum > 0 ? ((sum / 36) * 100).toFixed(2) + "%" : "--%";
    setTableData(updatedTableData);
    const isRowEdited = areOtherFieldsEdited(tableData[rowIndex], column);
    setEditedRows((prevEditedRows) => {
      const updatedEditedRows = new Set(prevEditedRows);
      if (isRowEdited) {
        updatedEditedRows.add(rowIndex);
      } else {
        updatedEditedRows.delete(rowIndex);
      }
      return updatedEditedRows;
    });
  };
  const sendRatedData = async () => {
    const editedRowsData = Array.from(editedRows).map(
      (index) => tableData[index]
    );
    const hasEmptyFields = editedRowsData.some((rowData, index) =>
      Object.values(rowData).some((value) => {
        if (value === "" || value === null || value === undefined) {
          setSelectedRow(index);
          return true;
        }
        return false;
      })
    );
    if (hasEmptyFields) {
      setErrorMessage("All fields must be filled before sending.");
    } else {
      const updatedRating = editedRowsData.map((obj) => {
        const taskId = taskIdValue;
        const userId = obj.userId;
        const learningAgility = obj.learningAgility;
        const attitude = obj.attitude;
        const progress = obj.progress;
        const listeningSkill = obj.listeningSkill;
        const language = obj.language;
        const problemSolving = obj.problemSolving;
        const teamWorkSkill = obj.teamWorkSkill;
        const businessAcumen = obj.businessAcumen;
        const currentAssignment = obj.currentAssignment;
        const overall = parseFloat(obj.overall);
        return {
          taskId,
          userId,
          learningAgility,
          attitude,
          progress,
          listeningSkill,
          language,
          problemSolving,
          teamWorkSkill,
          businessAcumen,
          currentAssignment,
          overall,
        };
      });
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/api/v4/task-review",
          updatedRating
        );
        if (response.status === 200) {
          //crosscheck after api is done
          fetchData();
        }
      } catch (error) {
        console.log("this is error in report post api", error);
      }
      setErrorMessage("");
      setEditedRows(new Set());
    }
  };
  useEffect(() => {
    fetchData();
    return () => {
      cancelToken.cancel("request cancelled");
    };
  }, []);
  return (
    <div>
      <div style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="inst-rating-parent-wrapper">
        <div className="inst-rating-breadChrum">
          <Link to="/mentor/assign-task" className="crumb-parent">
            AssignTask
          </Link>
          <Chevron />
          <span>Instructor Rating</span>
        </div>
        <div className="inst-rating-data-wrapper">
          <div className="inst-heading-style">
            <h3>Instructor Rating - {taskTitle}</h3>
          </div>
          <div className="inst-table-box-style">
            <div className="table-description-style">
              <div className="desc-child-one">
                <InfoIcon />
              </div>
              <div className="desc-child-two">
                <p style={{ marginBottom: "0", fontWeight: "600" }}>
                  Please rate Associates in each area using the following
                  guidelines:
                </p>
                <div className="rate-info-wrapper">
                  {ratingArray.map((rateVal, rateInd) => {
                    return (
                      <div className="desc-value-wrapper">
                        <span style={{ fontWeight: "600" }}>{`${
                          rateInd + 1
                        }`}</span>{" "}
                        &nbsp;
                        <span>{`- ${rateVal}`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="table-container-parent-wrapper">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th className="align-left">Associates</th>
                      <th>Learning Agility</th>
                      <th>Attitude</th>
                      <th>Progress</th>
                      <th>Listening Skills</th>
                      <th>Communication Skills</th>
                      <th>Problem Solving</th>
                      <th>Interpersonal and Team Work Skill</th>
                      <th style={{ minWidth: "150px" }}>
                        Business Acumen (Underset and the project business
                        details)
                      </th>
                      <th>Current Assignment</th>
                      <th>Overall(%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((rowData, rowIndex) => {
                      const isRowEditable =
                        originaltableData[rowIndex].overall === "--%" ||
                        originaltableData[rowIndex].overall === null ||
                        originaltableData[rowIndex].overall === "";
                      return (
                        <tr
                          key={rowIndex}
                          style={{ opacity: isRowEditable ? 1 : 0.5 }}
                          onClick={() =>
                            setSelectedRow(
                              isRowEditable
                                ? selectedRow === rowIndex
                                  ? null
                                  : rowIndex
                                : null
                            )
                          }
                        >
                          <td className="align-left">
                            {`${rowData?.firstName} ${rowData?.lastName}`}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.learningAgility}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) => {
                                  handleInputChange(
                                    e,
                                    rowIndex,
                                    "learningAgility"
                                  );
                                }}
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.learningAgility
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.attitude}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  handleInputChange(e, rowIndex, "attitude")
                                }
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.attitude
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.progress}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) => {
                                  handleInputChange(e, rowIndex, "progress");
                                }}
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.progress
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.listeningSkill}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    rowIndex,
                                    "listeningSkill"
                                  )
                                }
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.listeningSkill
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.language}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  handleInputChange(e, rowIndex, "language")
                                }
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.language
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.problemSolving}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    rowIndex,
                                    "problemSolving"
                                  )
                                }
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.problemSolving
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.teamWorkSkill}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    rowIndex,
                                    "teamWorkSkill"
                                  )
                                }
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.teamWorkSkill
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.businessAcumen}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    rowIndex,
                                    "businessAcumen"
                                  )
                                }
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.businessAcumen
                            )}
                          </td>
                          <td>
                            {selectedRow === rowIndex ? (
                              <input
                                type="text"
                                value={rowData.currentAssignment}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    rowIndex,
                                    "currentAssignment"
                                  )
                                }
                                readOnly={!isRowEditable}
                              />
                            ) : (
                              rowData.currentAssignment
                            )}
                          </td>
                          <td>
                            {rowData?.overall !== "" &&
                            rowData?.overall !== null
                              ? rowData.overall
                              : "--%"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="inst-save-button-wrapper"
              style={{ alignSelf: "end" }}
            >
              <button onClick={sendRatedData} disabled={editedRows.size === 0}>
                Save
              </button>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorRating;
