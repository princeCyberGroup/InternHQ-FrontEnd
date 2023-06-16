import React from "react";
import Error_InternalServer from "../../Assets/Error_InternalServer.png";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const Error_500 = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex align-items-center vh-100">
      <div className="row">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <img src={Error_InternalServer} alt="Error 500 Image" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1
              className="text-center error-heading mt-3"
              style={{
                fontSize: "72px",
              }}
            >
              500
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="text-center error-heading">Internal Server Error</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text-center error-desc mt-0">
              Apologies for the inconvenience caused. <br />
              Our team is actively addressing the issue <br />
              and working towards a solution.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <button className="btn error-btn" onClick={() => {navigate('/dashboard')}}>Back to home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error_500;
