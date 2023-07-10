import React from "react";
import Error_NotFound from "../../Assets/Error_NotFound.png";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex align-items-center vh-100">
      <div className="row">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <img src={Error_NotFound} alt="Error 404 Image" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1 className="text-center error-heading">Your Session has expired</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text-center error-desc">
              Please go back to login page
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <button
              className="btn error-btn"
              onClick={() => {
                localStorage.clear();
                navigate("/")}}
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
