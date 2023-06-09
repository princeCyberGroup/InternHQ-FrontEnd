import React from "react";
import { ReactComponent as TotalIcon } from "../../../../Assets/total.svg";
import { ReactComponent as ActiveIcon } from "../../../../Assets/active.svg";
import { ReactComponent as InActiveIcon } from "../../../../Assets/inactive.svg";
import { ReactComponent as OnProject } from "../../../../Assets/onProject.svg";

import "../Status/status.css";
export default function Status({ data }) {
  return (
    <>
      <div className="row first-row">
        <div className="col-6">
          <div className="four-cards">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "0.625rem",
              }}
            >
              <TotalIcon />
              <div
               className="count-info"
              >
                <p className="count">{data.totalUsers}</p>
                <p
                  className="status"
                  style={{ marginLeft: "0.625rem" , marginTop: "0.28rem" }}
                >
                  Total
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="four-cards">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "0.625rem",
              }}
            >
              <ActiveIcon />
              <div
            className="count-info"
              >
                <p className="count">{data.totalActive}</p>
                <p
                  className="status d-flex justify-content-center"
                  style={{ marginLeft: "0.625rem" , marginTop: "0.28rem" }}
                >
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row second-row">
        <div className="col-6">
          <div className="four-cards">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "0.625rem",
              }}
            >
              <InActiveIcon />
              <div
         className="count-info"
              >
                <p className="count">{data.totalInactive}</p>
                <p
                  className="status d-flex justify-content-center"
                  style={{ marginLeft: "0.625rem" , marginTop: "0.28rem" }}
                >
                  InActive
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="four-cards">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "0.625rem",
              }}
            >
              <OnProject />
              <div className="count-info"
              >
                <p className="count">{data.onProject}</p>
                <p
                  className="status d-flex justify-content-center"
                  style={{ marginLeft: "0.625rem" , marginTop: "0.28rem" }}
                >
                  On Project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
