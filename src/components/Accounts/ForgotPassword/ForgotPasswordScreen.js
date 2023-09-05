import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import Cginfinitylogoresponsive from "../../../Assets/Cginfinitylogoresponsive.svg";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";
import InfoIcon from "../../../Assets/InfoIcon.svg";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [incorrectemail, setIncorrectemail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setIncorrectemail(false);
    setEmail(value);
    setIsEmailValid(value.match(/^[\w.-]+@cginfinity\.com$/) ? true : false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_API_URL+"/api/v3/forgetPassword", { email })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        setIsLoading(false);
        navigate("/email-verification");
      })
      .catch((error) => {
        if (error.response?.data[0].response == "Error: Invalid Email!") {
          setIsEmailValid(false);
          setIncorrectemail(true);
        }
        setIsLoading(false);
        if (error.response?.data.statusCode == 400) {
          navigate("/error?statusCode=400");
        }
        if (error.response?.data.statusCode == 500) {
          navigate("/error?statusCode=500");
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
    <div className="container-fluid login-screen-body div-xs">
      <div className="row pos">
        <div className="d-flex justify-content-center  align-items-center flex-row">
          <div
            className="col-md-5 div-bg-height-width-fixed div-hidden-xs"
           
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
                    
                    className="carousel-item active div-width-16-fixed"
                  >
                    <img
                      src={CarouselImage1}
                      className="d-block div-width-mar-fixed"
                      alt="..."
                     
                    />
                    <p className="carousel-text ms-4">
                      Record your daily work items
                    </p>
                  </div>

                  <div className="carousel-item div-width-16-fixed">
                    <img
                      src={CarouselImage2}
                      className="d-block div-width-mar-fixed "
                      alt="..."                      
                    />
                    <p className="carousel-text">
                      Enhance your skills via assessments
                    </p>
                  </div>
                  <div className="carousel-item div-width-16-fixed">
                    <img
                      src={CarouselImage3}
                      className="d-block div-width-mar-fixed"
                      alt="..."                    
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
            className="col-md-7 bg-white p-4 div-hight35-width30-fixed"
            
          >
            <div className="row div-hidden">
              <div className="row cglogoimg">
                <img
                  className="p-0 cglogoimg-xs"
                  src={Cginfinitylogoresponsive}
                  alt="CG-Infinity Logo"
                 
                />
              </div>
            </div>
            <div className="row ">
              <p className="right-container-heading">Forgot Password</p>
            </div>
            <div
              className="row div-container-heading"
             
            >
              <div className="d-flex align-items: flex-start">
                <img
                  src={InfoIcon}
                  className="div-btn-back"
                  alt="Go Back"
                />
                <p className="font-margin">
                  Please enter your email address below. You will receive an OTP
                  to reset your password.
                </p>
              </div>
            </div>
            <div className="row h-10rem">
              <form onSubmit={handleSubmit}>
                <div
                  className="d-flex flex-column"
                  style={{ height: "4.375rem", marginTop: "1rem" }}
                >
                  <label className="input-label-text" for="exampleInputEmail1">
                    Email ID
                  </label>
                  <div className="div-input">
                    <input
                      className="input-login"
                      type="email"
                      id="exampleInputEmail1"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter Your Email ID"
                      required
                    />
                  </div>

                  {!isEmailValid && email && (
                    <span className="sign-up-warning">
                      {incorrectemail
                        ? "Invalid Email!"
                        : "Please make use of CG-Infinity email only"}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  
                  className="btn btn-warning border-0 sign-up-btn top-marbot-width-fixed"
                  disabled={!isEmailValid || isLoading}
                >
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
            <div className="row">
              <Link className="right-container-link right-container-link-xs" to="/">
                Back to login?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
