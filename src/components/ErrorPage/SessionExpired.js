import React from "react";
import Error_SessionExpired from "../../Assets/Error_SessionExpired.png";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex align-items-center vh-100">
      <div className="row">
        <div className="row mb-5">
          <div className="col d-flex justify-content-center">
            <img src={Error_SessionExpired} alt="Error 404 Image" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1 className="text-center error-heading">Session Expired</h1>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <p
              className="text-center error-desc "
              style={{ width: "330px", margin: "auto" }}
            >
            Your Session is Expired. Please login again.

            </p>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <button
              className="btn error-btn"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
