import React from "react";
import EmptyDailyUpdateTable from "../../UserPortal/DailyUpdateTable/EmptyDailyUpdateTable";
import "./Reporttable.css";
import { ReactComponent as Advance } from "../../../Assets/advance.svg";
import { ReactComponent as Beginner } from "../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../Assets/intermediate.svg";
import { Data } from "./Fetcheddataobject";
import { useNavigate } from "react-router-dom";

const Reporttable = ({ tableData }) => {
  //data
  let objectCount = 0;
  const navigate = useNavigate();
  //funciton
  const handleOnclick = (index)=>{
    // navigate(`/admin/report/userId?id=${tableData[index][Data.ID]}`);
    sessionStorage.setItem("detailId", tableData[index][Data.ID]);
    navigate(`/admin/report?userId=${tableData[index][Data.ID]}`);
  }

  return (
    <div className="container-fluid container-table">
      <table className="table-report" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th style={{ width: "20.375rem" }}>Name</th>
            <th style={{ width: "20.875rem" }}>Technology Tags</th>
            <th style={{ width: "20.375rem" }}>Skills Achieved</th>
            <th style={{ width: "11.375rem" }}>Duration</th>
          </tr>
        </thead>
        {tableData ? (
          <tbody>
            {tableData?.map((val, ind) => {
              let objectKeyCount = 0;
              return (
                <tr className="report-table-tr" key={ind}
                onClick={()=>{
                  handleOnclick(ind);
                  }}>
                  <td style={{ width: "20.375rem" }}>
                    <div className="name-column">
                      <div className="circle">
                        {val?.[Data.FN].toUpperCase().slice(0, 1)}
                        {val?.[Data.LN].toUpperCase().slice(0, 1)}
                      </div>
                      <div className="tags">
                        <div className="tag1">{`${val?.[Data.FN]} ${
                          val?.[Data.LN]
                        }`}</div>
                        <div className="tag2">{val?.[Data.INTID]}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ width: "20.875rem" }}>
                    <div className="tech-tags">
                      {val?.[Data.TN].map((value, index) => {
                        objectKeyCount++;
                        {/* if (objectCount > 3) {
                          objectCount = 0;
                          return;
                        } else {
                          objectCount++;
                        } */}
                        return (
                          value === null ? <div key={index}></div> :
                          <div key={index} className="tag-tech">
                            <span>{value}</span>
                            <div>
                              {val?.[Data.L][index] === "Beginner" ? (
                                <Beginner />
                              ) : val?.[Data.L][index] === "Intermediate" ? (
                                <Intermediate />
                              ) : (
                                <Advance />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {objectKeyCount > 3 && (
                        <div className="all-tech">
                          <span>+{objectKeyCount - 3}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ width: "20.375rem" }}>
                    <div className="skills-wrapper">
                      <span className="skills">
                        {val?.[Data.BC]} Beginner &nbsp; <span className="dot" />{" "}
                        &nbsp; {val?.[Data.IC]} Intermediate &nbsp;{" "}
                        <span className="dot" /> &nbsp; {val?.[Data.AC]} Advanced
                      </span>
                    </div>
                  </td>
                  <td style={{ width: "11.375rem" }}>
                    <div className="duration">
                      <span>
                        {val?.[Data.D]} {val?.[Data.D] <= 1 ? "month" : "months"}
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
