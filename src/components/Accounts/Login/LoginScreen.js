import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import Cginfinitylogoresponsive from "../../../Assets/Cginfinitylogoresponsive.svg";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import CryptoJS, { enc } from "crypto-js";
import { bottom } from "@popperjs/core";

const LoginScreen = () => {
  const navigate = useNavigate();
  //login screen
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const [incorrectemail, setIncorrectemail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setIncorrectemail(false);
    setIsEmailValid(value.match(/^[\w.-]+@cginfinity\.com$/) ? true : false);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setIsPasswordValid(true);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await axios
      .post(process.env.REACT_APP_API_URL + "/api/v3/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("login", true);
        const res = {
          token: response.data.token,
          email: response.data.email,
          userId: response.data.userId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          deployed: response.data.isDeployed,
          randomString: response.data.randomString,
          designation: response.data.designation,
          ...(response.data.mentorType !== undefined &&
          response.data.mentorType !== null
            ? { mentorType: response.data.mentorType }
            : {}),
        };
        const secretKey = process.env.REACT_APP_USER_KEY;
        // const userData = JSON.stringify(res);
        const userDataE = JSON.stringify(res);
        const encryptedData = CryptoJS.AES.encrypt(
          userDataE,
          secretKey
        ).toString();
        localStorage.setItem("userData", encryptedData);
        setIsLoading(false);
        let str = res.randomString.toLowerCase();
        str === "07495d"
          ? navigate("/dashboard")
          : str === "cb8715"
          ? navigate("/admin/dashboard")
          : navigate("/mentor/dashboard");
        localStorage.setItem("token");
      })
      .catch((error) => {
        console.log("this is the error ", error.response?.data);
        if (error.response?.data.msg === "Error: Email does not exist") {
          setIsEmailValid(false);
          setIncorrectemail(true);
        } else {
          setIsPasswordValid(false);
        }
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const navigateAccordingToPermission = (str) => {
      const permissionArray = str.split(",");
      let session, review, project;
      permissionArray.forEach((element) => {
        if (element === "Session") session = true;
        if (element === "Project") project = true;
        if (element === "Review") review = true;
      });
      if (session) navigate("/mentor/dashboard");
      else if (project) navigate("/mentor/assign-task");
      else if (review) navigate("/mentor/review-associates");
    };
    let login = localStorage.getItem("login");
    const secretkeyUser = process.env.REACT_APP_USER_KEY;
    let userData;
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      userData = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    if (login && userData) {
      let str = userData.randomString;
      str === "07495d"
        ? navigate("/dashboard")
        : str === "cb8715"
        ? navigate("/admin/dashboard")
        : navigateAccordingToPermission(userData?.mentorType);
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

                  <div 
                  className="carousel-item div-width-16-fixed">
                    <img
                      src={CarouselImage2}
                      className="d-block div-width-mar-fixed"
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
            className="col-md-7 bg-white p-4 div-height-35-fixed"           
          >
             <div className="row div-hidden-xs">
              <p className="right-container-heading">Login</p>
            </div>
                <div className="row div-hidden">
              <div className="row cglogoimg">
                <img
                  className="p-0 cglogoimg-xs"
                  src={Cginfinitylogoresponsive}
                  alt="CG-Infinity Logo"                
                />
              </div>
              <p className="right-container-heading">CGI SkillFinity</p>
            </div>
           
            <div className="row div-height-156-fixed">
              <form onSubmit={handleSubmit}>
                <div className="div-hight106-martop-fixed">
                  <div className="d-flex flex-column">
                    <label
                      className="input-label-text"
                      for="exampleInputEmail1"
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
                          ? "Email does not exist"
                          : "Please make use of CG-Infinity email only"}
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-column">
                    <label                      
                      className="input-label-text div-martop-fixed"
                      for="exampleInputPassword1"
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
                        Incorrect Password
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning border-0 sign-up-btn mt-3 width-inherit-fixed"                  
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
                    "Login"
                  )}
                </button>
              </form>
            </div>
            <div className="row mt-4">
              <Link className="right-container-link mb-3" to="/forgot-password">
                Forgot Password?
              </Link>
              <Link
                className="mt-0 right-container-link div-marbottom-fixed"
                
                to="/sign-up"
              >
                Sign Up if you are a first time user
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
