import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";
import InfoIcon from "../../../Assets/InfoIcon.svg";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); //For carousel

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setIsEmailValid(
      value.match(/^[\w.-]+@cginfinity\.com$/)
        ? true
        : false
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/email-verification")
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 1000); //Make it 1000

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container login-screen-body ">
      <div className="row pos">
        <div className="d-flex justify-content-center justify-content-center align-items-center flex-row">
          <div className="col-md-4" style={{ backgroundColor: "#002C3F" }}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="row cglogoimg">
                <img
                  className="p-0"
                  src={Cginfinitylogo}
                  alt="CG-Infinity Logo"
                />
              </div>
              <div className="row card-left-heading">
                <p>Intern HQ</p>
              </div>
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-bs-ride="true"
                // data-interval="false" //Remove it
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className={activeIndex === 0 ? "active" : ""}
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    className={activeIndex === 1 ? "active" : ""}
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    className={activeIndex === 2 ? "active" : ""}
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div
                    style={{ width: "260px" }}
                    className={`carousel-item ${
                      activeIndex === 0 ? "active" : ""
                    }`}
                  >
                    <img
                      src={CarouselImage1}
                      class="d-block "
                      alt="..."
                      style={{ width: "13rem", marginLeft: "24px" }}
                    />
                    <p className="carousel-text ms-4">
                      Record your daily work items
                    </p>
                  </div>

                  <div
                    style={{ width: "260px" }}
                    className={`carousel-item ${
                      activeIndex === 1 ? "active" : ""
                    }`}
                  >
                    <img
                      src={CarouselImage2}
                      class="d-block "
                      alt="..."
                      style={{ width: "13rem", marginLeft: "24px" }}
                    />
                    <p className="carousel-text">
                      Enhance your skills via assessments
                    </p>
                  </div>
                  <div
                    style={{ width: "269px" }}
                    className={`carousel-item ${
                      activeIndex === 2 ? "active" : ""
                    }`}
                  >
                    <img
                      src={CarouselImage3}
                      class="d-block "
                      alt="..."
                      style={{ width: "13rem", marginLeft: "24px" }}
                    />
                    <p className="carousel-text">
                      Get certificate and share achievement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 bg-white p-4">
            <div className="row ">
              <p className="right-container-heading">Forgot Password</p>
            </div>
            <div
              className="row"
              style={{
                width: "407px",
                background: "rgba(184, 221, 225, 0.54)",
                borderRadius: "4px",
                padding: "5px",
                marginLeft: "0px",
                paddingLeft: "0",
                marginBottom: "2.2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <img
                  src={InfoIcon}
                  style={{
                    width: "1.2rem",
                    padding: "0",
                    marginTop: "3px",
                    marginRight: "10px",
                  }}
                  alt="Go Back"
                />
                <p style={{ fontSize: "16px", margin: "0" }}>
                  Please enter your email address below. You will receive an OTP
                  to reset your password.
                </p>
              </div>
            </div>
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="input-label-text" for="exampleInputEmail1">
                    Email ID
                  </label>
                  {!isEmailValid && email && (
                    <span className="sign-up-warning ms-2">
                      Please make use of CG-Infinity email only
                    </span>
                  )}
                  <input
                    type="email"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter Your Email ID"
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-warning border-0 sign-up-btn"
                  disabled={
                    (!isEmailValid)
                  }
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="row">
              <Link className="right-container-link" to="/">Back to login?</Link>
            </div>
            {/* <div className="bg-white d-flex flex-column justify-content-center align-items-center form-padding"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
