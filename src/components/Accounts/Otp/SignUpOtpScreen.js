import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";
import BackArrow from "../../../Assets/BackArrow.svg";

const SignUpOtpScreen = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setIsOtpValid(false);
    if (inputValue.length <= 6 && /^\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
    if (inputValue.trim().length <= 6) {
      setOtp(inputValue.trim());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    axios
      .post(
        process.env.REACT_APP_API_URL+"/api/v3/verifyOtp",
        { email, otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const res = {
          email: response.data.email,
          userId: response.data.userId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        };
        localStorage.setItem("userData", JSON.stringify(res));
        setIsLoading(false);
        navigate("/success");
        localStorage.setItem("token");
      })
      .catch((error) => {
        console.log(error.response?.data);
        setIsOtpValid(true);
        setIsLoading(false);
        if (error.response?.data.statusCode == 400) {
          navigate("/error/statusCode=400");
        }
        if (error.response?.data.statusCode == 500) {
          navigate("/error/statusCode=500");
        }
      });
  };

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="container-fluid login-screen-body ">
      <div className="row pos">
        <div className="d-flex justify-content-center align-items-center flex-row">
          <div
            className="col-md-5"
            style={{
              backgroundColor: "#002C3F",
              height: "35.125rem",
              width: "23.125rem",
            }}
          >
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="row cglogoimg">
                <img
                  className="p-0"
                  src={Cginfinitylogo}
                  alt="CG-Infinity Logo"
                />
              </div>
              <div className="row card-left-heading">
                <p>CGI SkillFinity</p>
              </div>
              <div
                id="carouselExampleIndicators"
                className="carousel slide mt-3"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div
                    style={{ width: "16.25rem" }}
                    className="carousel-item active"
                  >
                    <img
                      src={CarouselImage1}
                      className="d-block "
                      alt="..."
                      style={{ width: "13rem", marginLeft: "1.5rem" }}
                    />
                    <p className="carousel-text ms-4">
                      Record your daily work items
                    </p>
                  </div>

                  <div style={{ width: "16.25rem" }} className="carousel-item">
                    <img
                      src={CarouselImage2}
                      className="d-block "
                      alt="..."
                      style={{ width: "13rem", marginLeft: "1.5rem" }}
                    />
                    <p className="carousel-text">
                      Enhance your skills via assessments
                    </p>
                  </div>
                  <div style={{ width: "16.25rem" }} className="carousel-item">
                    <img
                      src={CarouselImage3}
                      className="d-block "
                      alt="..."
                      style={{ width: "13rem", marginLeft: "1.5rem" }}
                    />
                    <p className="carousel-text">
                      Get certificate and share achievement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-7 bg-white p-4"
            style={{ height: "35.125rem" }}
          >
            <div className="row ">
              <p className="right-container-heading">Enter Code</p>
            </div>
            <div className="row mb-4">
              <img
                src={BackArrow}
                style={{
                  width: "1.8rem",
                  paddingRight: "0.188rem",
                  cursor: "pointer",
                }}
                alt="Go Back"
                onClick={() => navigate("/sign-up")}
              />
              <span style={{ display: "contents", fontSize: "0.875rem" }}>
                {" "}
                {localStorage.getItem("email")}
              </span>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "1.9rem",
                  color: "#8A8A8A",
                  lineHeight: "1.188rem",
                }}
              >
                Please type the Six digit code we have sent on your
                <br /> Microsoft account.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                  <div className="div-input">
                    <input
                      className="input-login"
                      type="text"
                      pattern="\d*" // Used the "pattern" attribute to enforce digits only
                      value={value}
                      onChange={handleChange}
                      placeholder="Code"
                    />
                  </div>
                  {isOtpValid && otp && (
                    <span className="sign-up-warning">Invalid OTP</span>
                  )}
                </div>
                <button
                  className="btn btn-warning border-0 sign-up-btn mt-3"
                  disabled={value.length < 6 || isLoading}
                >
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </button>
              </form>
            </div>
            <div className="row">
              <Link className="right-container-link" to="/">
                Use Another Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpOtpScreen;
