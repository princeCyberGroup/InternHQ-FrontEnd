import React, { useState, useEffect } from "react";
import "./MentorReviewTable.css";
import { ReactComponent as Advance } from "../../../Assets/advance.svg";
import { ReactComponent as Beginner } from "../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../Assets/intermediate.svg";
import { ReactComponent as ReviewCompleted } from "../../../Assets/review-completed.svg";
import { ReactComponent as ReviewWarning } from "../../../Assets/review-warning.svg";
import { ReactComponent as ReviewFlag } from "../../../Assets/review-flag.svg";
import { useNavigate } from "react-router-dom";

const MentorReviewTable = ({ tableData, isLoading }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //function
  const handleOnclick = (index) => {
    sessionStorage.setItem("detailId", tableData[index].userId);
    navigate(`/mentor/review-associates/inter-performance-review`);
  };
  return (
    <div className="container-fluid review-container-table">
      <table className="review-table-report" cellPadding="0" cellSpacing="0">
        <thead style={{ zIndex: 50 }}>
          <tr>
            <th style={{ width: "32.375rem" }}>Name</th>
            <th style={{ width: "21.5rem" }}>Int ID</th>
            <th style={{ width: "50.875rem" }}>Technology Tags</th>
            <th style={{ width: "11.375rem" }}>Review Status</th>
          </tr>
        </thead>
        {tableData ? (
          <tbody>
            {tableData.map((val, ind) => {
              let objectKeyCount = 0;
              return (
                <tr
                  className="report-table-tr"
                  key={ind}
                  onClick={() => {
                    handleOnclick(ind);
                  }}
                >
                  <td>
                    <div className="review-name-column">
                      <div className="circle">
                        {val.firstName?.toUpperCase().slice(0, 1)}
                        {val.lastName?.toUpperCase().slice(0, 1)}
                      </div>
                      <div className="review-tags">
                        <div className="review-tag1">{`${val.firstName} ${
                          val.lastName === null ? "" : val.lastName
                        }`}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="review-int">{val.internId} </div>
                  </td>
                  <td>
                    <div
                      className="review-tech-tags"
                      onMouseLeave={() => setSelectedIndex(-1)}
                    >
                      {val?.technames
                        ?.slice(
                          0,
                          selectedIndex === ind ? val?.technames?.length : 3
                        )
                        .map((value, index) => {
                          objectKeyCount++;
                          return value === null ? (
                            <div key={index}></div>
                          ) : (
                            <div
                              key={index}
                              className="review-tag-tech d-flex justify-content-center align-items-center"
                            >
                              <span>{value}</span>
                              <div>
                                {val.level[index] === "Beginner" ? (
                                  <Beginner />
                                ) : val.level[index] === "Intermediate" ? (
                                  <Intermediate />
                                ) : (
                                  <Advance />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      {selectedIndex !== ind &&
                        objectKeyCount > 2 &&
                        val?.technames.slice(3).length !== 0 && (
                          <div
                            className="review-all-tech"
                            onMouseEnter={() => setSelectedIndex(ind)}
                          >
                            <span>+ {val?.technames.slice(3).length}</span>
                          </div>
                        )}
                    </div>
                  </td>
                  <td>
                    <div className="review-status">
                      <div style={{ width: "102px" }}>
                        {true ? ( // condition for done or not 
                          <>
                            <div className="review-status-card">
                              <ReviewCompleted />
                              Completed
                            </div>
                            <div className="review-status-date">07-18-2023</div>
                          </>
                        ) : true ? //condition for overdue or done
                         (
                          <>
                            <div className="review-status-card">
                              <ReviewCompleted />
                              Completed
                            </div>
                            <div className="review-status-date">07-18-2023</div>
                          </>
                        ):
                         (
                          <>
                            <div className="review-status-card">
                              <ReviewCompleted />
                              Completed
                            </div>
                            <div className="review-status-date">07-18-2023</div>
                          </>
                        )
                      }
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody className="review-no-data-body">
            <tr>
              <td>No Data</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default MentorReviewTable;
