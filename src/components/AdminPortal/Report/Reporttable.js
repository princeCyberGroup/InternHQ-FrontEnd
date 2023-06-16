import React from "react";
import EmptyDailyUpdateTable from "../../UserPortal/DailyUpdateTable/EmptyDailyUpdateTable";
import "./Reporttable.css";
import { ReactComponent as Advance } from "../../../Assets/advance.svg";
import { ReactComponent as Beginner } from "../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../Assets/intermediate.svg";
import { Data } from "./Fetcheddataobject";

const Reporttable = ({ tableData }) => {
  //data
  let objectCount = 0;

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
                <tr key={ind}>
                  <td>
                    <div className="name-column">
                      <div className="circle">
                        {val[Data.FN].toUpperCase().slice(0, 1)}
                        {val[Data.LN].toUpperCase().slice(0, 1)}
                      </div>
                      <div className="tags">
                        <div className="tag1">{`${val[Data.FN]} ${
                          val[Data.LN]
                        }`}</div>
                        <div className="tag2">{val[Data.INTID]}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="tags tech-tags">
                      {Object?.keys(val[Data.SKILLS]).map((key) => {
                        objectKeyCount++;
                        if (objectCount > 2) {
                          objectCount = 0;
                          return;
                        } else {
                          objectCount++;
                        }
                        return (
                          <div key={key} className="tag-tech">
                            <span>{key}</span>
                            {/* svg */}
                            <div>
                              {val[Data.SKILLS][key] == "Beginner" ? (
                                <Beginner />
                              ) : val[Data.SKILLS][key] == "Intermediate" ? (
                                <Intermediate />
                              ) : (
                                <Advance />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {objectKeyCount > 3 && (
                        <div
                          className="all-tech"
                          onClick={() => {
                            //work to be done
                          }}
                        >
                          <span>+{objectKeyCount - 3}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="skills-wrapper">
                    <span className="skills">
                      {val[Data.BC]} Beginner &nbsp; <span className="dot" />{" "}
                      &nbsp; {val[Data.IC]} Intermediata &nbsp;{" "}
                      <span className="dot" /> &nbsp; {val[Data.AC]} Advanced
                    </span>
                  </td>
                  <td>
                    <span className="duration">
                      {val[Data.D]} {val[Data.D] <= 1 ? "month" : "months"}
                    </span>
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
