// className="fw-bold d-flex justify-content-center align-items-center" this is data
import React, { useState, useEffect } from "react";
import "./Reporttable.css";
import { ReactComponent as Advance } from "../../../Assets/advance.svg";
import { ReactComponent as Beginner } from "../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../Assets/intermediate.svg";
import { Data } from "./Fetcheddataobject";
import { useNavigate } from "react-router-dom";
import ReportTableSkeleton from "./ReportTableSkeleton";

const Reporttable = ({
  tableData,
  isLoading,
  deployData,
  handleDeployChange,
}) => {
  //data
  const navigate = useNavigate();
  const [indexOfUserId, setIndexOfUserId] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //function
  const handleOnclick = (index) => {
    sessionStorage.setItem("detailId", tableData[index][Data.ID]);
    sessionStorage.setItem("chrumValue", "Report");
    navigate(`/admin/report/detail`);
  };
  console.log(deployData);
  return (
    <div className="container-fluid container-table">
      <table className="table-report" cellPadding="0" cellSpacing="0">
        <thead style={{ zIndex: 50 }}>
          <tr>
            <th style={{ width: "2.5rem" }}>#</th>
            <th style={{ width: "13.375rem" }}>Name</th>
            <th style={{ width: "20.875rem" }}>Technology Tags</th>
            <th style={{ width: "23.375rem" }}>Skills Achieved</th>
            <th style={{ width: "11.375rem" }}>Duration</th>
            <th style={{ width: "2.5rem" }}>Status</th>
          </tr>
        </thead>
        {isLoading ? (
          <>
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
            <ReportTableSkeleton />
          </>
        ) : tableData ? (
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
                  <td>{ind + 1}.</td>
                  <td>
                    <div className="name-column">
                      <div className="circle">
                        {val[Data.FN]?.toUpperCase().slice(0, 1)}
                        {val[Data.LN]?.toUpperCase().slice(0, 1)}
                      </div>
                      <div className="tags">
                        <div className="tag1">{`${val[Data.FN]} ${
                          val[Data.LN] === null ? "" : val[Data.LN]
                        }`}</div>
                        <div className="tag2">{val[Data.INTID]}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="tech-tags"
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setSelectedIndex((prev) => (prev === -1 ? ind : -1));
                      // }}
                      onMouseEnter={() => setSelectedIndex(ind)}
                      onMouseLeave={() => setSelectedIndex(-1)}
                    >
                      {val?.[Data.TN]
                        ?.slice(
                          0,
                          selectedIndex === ind ? val?.[Data.TN]?.length : 3
                        )
                        .map((value, index) => {
                          objectKeyCount++;
                          return value === null ? (
                            <div key={index}></div>
                          ) : (
                            <div
                              key={index}
                              className="tag-tech d-flex justify-content-center align-items-center"
                            >
                              <span>{value}</span>
                              <div>
                                {val[Data.L][index] === "Beginner" ? (
                                  <Beginner />
                                ) : val[Data.L][index] === "Intermediate" ? (
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
                        val?.[Data.TN].slice(3).length !== 0 && (
                          <div className="all-tech">
                            <span>+ {val?.[Data.TN].slice(3).length}</span>
                          </div>
                        )}
                    </div>
                  </td>
                  <td>
                    <div className="skills-wrapper">
                      <span className="skills">
                        {val?.[Data.BC] === null ? "0" : val?.[Data.BC]}{" "}
                        Beginner &nbsp;
                        <span className="dot" /> &nbsp;{" "}
                        {val?.[Data.IC] === null ? "0" : val?.[Data.IC]}{" "}
                        Intermediate &nbsp;
                        <span className="dot" /> &nbsp;{" "}
                        {val?.[Data.AC] === null ? "0" : val?.[Data.AC]}{" "}
                        Advanced
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="duration">
                      <span>
                        {val?.[Data.D] <= 1
                          ? `0${val?.[Data.D]} month  `
                          : `${val?.[Data.D]} months`}
                      </span>
                    </div>
                  </td>
                  <td
                    // style={{ border: "1px solid black" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="status-input"
                        onChange={() => {
                          handleDeployChange(val.userId);
                        }}
                        checked={
                          deployData.some(
                            (value) => value?.userId === val?.userId
                          )
                            ? deployData.find((value) => {
                                console.log(
                                  "value deploy ",
                                  value?.userId,
                                  " value user ",
                                  val?.userId,
                                  " equal ? ",
                                  value?.userId === val?.userId
                                );

                                return value?.userId === val?.userId;
                              }).status
                            : (() => {
                                const dataDEValue = val[Data.DE];
                                console.log("val[Data.DE]: ", dataDEValue);
                                return dataDEValue;
                              })()
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody className="no-data-body">
            <tr>
              <td>No Data</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Reporttable;
