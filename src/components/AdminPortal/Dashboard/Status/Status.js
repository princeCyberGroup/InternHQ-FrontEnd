import React, { useState, useEffect } from "react";
import { ReactComponent as TotalIcon } from "../../../../Assets/total.svg";
import { ReactComponent as ActiveIcon } from "../../../../Assets/active.svg";
import { ReactComponent as InActiveIcon } from "../../../../Assets/inactive.svg";
import { ReactComponent as OnProject } from "../../../../Assets/onProject.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Status/status.css";
import { Link } from 'react-router-dom';
import { ReactComponent as Right } from "../../../../Assets/right.svg";

export default function Status({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])
  
  return (
    <>
    <Link to="/admin/reports" className="about-link">
                  Manage Consultant <Right style={{ marginBottom: "2px" }} />
                </Link>
      <div className="row first-row">
        <div className="col-6">
          {isLoading ? <Skeleton width={190} height={90.72} highlightColor="#fff" style={{marginTop: "10px", boxShadow: "0px 0.25rem 1.25rem rgba(40, 52, 73, 0.15)"}}/> : <div className="four-cards">
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
          </div>}
        </div>
        <div className="col-6">
        {isLoading ? <Skeleton width={190} height={90.72} highlightColor="#fff" style={{marginTop: "10px", boxShadow: "0px 0.25rem 1.25rem rgba(40, 52, 73, 0.15)"}}/> : <div className="four-cards">
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
          </div> }
        </div>
      </div>
      <div className="row second-row">
        <div className="col-6">
        {isLoading ? <Skeleton width={190} height={90.72} highlightColor="#fff" style={{marginTop: "10px", boxShadow: "0px 0.25rem 1.25rem rgba(40, 52, 73, 0.15)"}}/> : <div className="four-cards">
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
          </div>}
        </div>
        <div className="col-6">
        {isLoading ? <Skeleton width={190} height={90.72} highlightColor="#fff" style={{marginTop: "10px", boxShadow: "0px 0.25rem 1.25rem rgba(40, 52, 73, 0.15)"}}/> : <div className="four-cards">
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
          </div>}
        </div>
      </div>
    </>
  );
}
