import React from "react";
import EmptyDailyUpdateTable from "../../UserPortal/DailyUpdateTable/EmptyDailyUpdateTable";
import "./Reporttable.css";
import { ReactComponent as Advance } from "../../../Assets/advance.svg";
import { ReactComponent as Beginner } from "../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../Assets/intermediate.svg";
import { Data } from "./Fetcheddataobject";
import { useNavigate } from "react-router-dom";
import ReportTableSkeleton from "./ReportTableSkeleton";

const Reporttable = ({ tableData, isLoading }) => {
  const navigate = useNavigate();
  const handleOnclick = (index) => {
    // navigate(`/admin/report/userId?id=${tableData[index][Data.ID]}`);
    sessionStorage.setItem("detailId", tableData[index][Data.ID]);
    navigate(`/admin/report?userId=${tableData[index][Data.ID]}`);
  };

  return (
    <div className="container-fluid container-table">
      <table className="table-report" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th style={{ width: "2rem" }}>S.No</th>
            <th style={{ width: "13.375rem" }}>Name</th>
            <th style={{ width: "28.875rem" }}>Technology Tags</th>
            <th style={{ width: "17.375rem" }}>Skills Achieved</th>
            <th style={{ width: "6.375rem" }}>Duration</th>
          </tr>
        </thead>
        {isLoading ? (
          <>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
          <ReportTableSkeleton/>
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
                  <td className="fw-bold"> {ind+1}</td>
                  <td style={{ width: "10.375rem" }}>
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
                  <td style={{ width: "20.875rem" }}>
                    <div className="tech-tags">
                      {val?.[Data.TN]?.slice(0, 5).map((value, index) => {
                        objectKeyCount++;
                        // {
                        //    if (objectCount > 3) {
                        //   objectCount = 0;
                        //   return;
                        // } else {
                        //   objectCount++;
                        // }
                        // }
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
                      {objectKeyCount > 4 && val?.[Data.TN].slice(5).length!==0 && (
                        <div className="all-tech">
                          <span>+ {val?.[Data.TN].slice(5).length}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ width: "20.375rem" }}>
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
                  <td style={{ width: "11.375rem" }}>
                    <div className="duration">
                      <span>
                        {val?.[Data.D] <= 1
                          ? `0${val?.[Data.D]} month  `
                          : `${val?.[Data.D]} months`}
                      </span>
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