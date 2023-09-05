import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import Cginfinitylogoresponsive from "../../../Assets/Cginfinitylogoresponsive.svg";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";

const SignUpScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [incorrectemail, setIncorrectemail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setIncorrectemail(false);
    setIsEmailValid(value.match(/^[\w.-]+@cginfinity\.com$/) ? true : false);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setIsPasswordValid(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)
        ? true
        : false
    );
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_API_URL+"/api/v3/signUp", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        setIsLoading(false);
        navigate("/sign-up-verification");
      })
      .catch((error) => {
        if (error.response?.data.msg) {
          setIsEmailValid(false);
          setIncorrectemail(true);
          setErrorMsg(error.response?.data.msg)
        }
        setIsLoading(false);
        if(error.response?.data.statusCode == 400) {
          navigate('/error?statusCode=400')
        } 
         if(error.response?.data.statusCode == 500) {
          navigate('/error?statusCode=500')
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
        <div className="d-flex justify-content-center align-items-center flex-row">
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
                      className="d-block div-width-mar-fixed "
                      alt="..."                 
                    />
                    <p className="carousel-text ms-4">
                      Record your daily work items
                    </p>
                  </div>

                  <div                    
                    className="carousel-item div-width-16-fixed"
                  >
                    <img
                      src={CarouselImage2}
                      className="d-block div-width-mar-fixed"
                      alt="..."
                      
                    />
                    <p className="carousel-text">
                      Enhance your skills via assessments
                    </p>
                  </div>
                  <div                    
                    className="carousel-item div-width-16-fixed"
                  >
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
            className="col-md-7 bg-white p-4 div-height-35-fixed"            
          >
            <div className="row div-hidden-xs">
              <p className="right-container-heading">Sign Up</p>        
            </div>
            <div className="row  div-hidden">
            <div className="row cglogoimg">
                <img
                  className="p-0 cglogoimg-xs"
                  src={Cginfinitylogoresponsive}
                  alt="CG-Infinity Logo"                 
                />
              </div>
              <div className="row">
              <p className="right-container-heading">CGI SkillFinity</p>
              </div>
            </div>          
            <div className="row div-height-166-fixed" >
              <form 
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="div-hight-martop-fixed ">
                  <div className="d-flex flex-column ">
                    <label
                      className="input-label-text"
                      htmlFor="exampleInputEmail1"
                    >
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
                          ? errorMsg
                          : "Please make use of CG-Infinity email only"}
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-column">
                    <label
                      
                      className="input-label-text div-martop-fixed"
                      htmlFor="exampleInputPassword1"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <div className="div-input pass-input-div">
                        <input
                      className="input-login"
                      type={showPassword ? "password" : "text"}
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      value={password}
                      required
                      onChange={handlePasswordChange}
                    />
                     <button
                        className="btn password-toggle-button btn-border-none-fixed"
                        
                        type="button"
                        onClick={handleTogglePasswordVisibility}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye"></i>
                        ) : (
                          <i className="bi bi-eye-slash"></i>
                        )}
                      </button>
                      </div>
                    </div>
                    {!isPasswordValid && password && (
                      <span className="sign-up-warning">
                        Atleast 8 characters, one uppercase, number & special
                        characters required.
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning border-0 sign-up-btn width-inherit-fixed"
                  
                  disabled={!isEmailValid || !isPasswordValid || isLoading}
                >
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </div>
            <div className="row p-3">
              <Link className="right-container-link" to="/">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
