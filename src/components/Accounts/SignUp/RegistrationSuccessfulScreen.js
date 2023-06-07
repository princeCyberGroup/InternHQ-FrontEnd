import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessCgLogo from "../../../Assets/SuccessCgLogo.svg";
import SuccessIcon from "../../../Assets/SuccessIcon.svg";

const RegistrationSuccessfulScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard");
    }
    // const interval = setInterval(() => {
    //   setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    // }, 3000); //Make it 1000

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);
  return (
    <div className="container-fluid flex-column justify-content-center success-body-container">
      <div className="row">
        <div className="col text-center success-logo-container">
          <img src={SuccessCgLogo} alt="CG-Infinity Logo" />
        </div>
      </div>
      <div className="row">
        <div className="col text-center success-icon-container">
          <img src={SuccessIcon} alt="Success Icon" />
        </div>
      </div>
      <div className="row">
        <div className="col text-center success-title-container">
          <p>Registration Successful</p>
        </div>
      </div>
      <div className="row">
        <div className="col text-center success-description-container">
          <p>Please continue to use</p>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <button
            class="btn btn-warning border-0 success-button-container"
            onClick={() => navigate("/dashboard")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessfulScreen;
