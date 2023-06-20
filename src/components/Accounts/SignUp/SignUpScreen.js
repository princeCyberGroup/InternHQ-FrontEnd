import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";

const SignUpScreen = () => {
  const navigate = useNavigate();
  // const [activeIndex, setActiveIndex] = useState(0); //For carousel

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
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
      .post("https://cg-interns-hq.azurewebsites.net/internSignUp", {
        email,
        password,
      })
      .then((response) => {
        console.log("Inside then");
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        setIsLoading(false);
        navigate("/sign-up-verification");
      })
      .catch((error) => {
        console.log("Inside Catch");
        console.log(error.response?.data);
        if (error.response?.data.msg == "Error: User Already Exists!") {
          setIsEmailValid(false);
          setIncorrectemail(true);
        }
        setIsLoading(false);
      });
    console.log(email);
    console.log(`password: ${password} (hidden visible only on backend)`);
  };
  // const handleSlideChange = (index) => {
  //   setActiveIndex(index);
  // };

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
                <p>Intern HQ</p>
              </div>
              <div
                id="carouselExampleIndicators"
                className="carousel slide mt-3"
                data-bs-ride="carousel"
                // data-bs-interval="4000"
                // data-interval="false" //Remove it
              >
                <div className="carousel-indicators">
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                    // onClick={() => handleSlideChange(0)}
                    // className={activeIndex === 0 ? "active" : ""}
                  ></button>
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                    // onClick={() => handleSlideChange(1)}
                    // className={activeIndex === 1 ? "active" : ""}
                  ></button>
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                    // onClick={() => handleSlideChange(2)}
                    // className={activeIndex === 2 ? "active" : ""}
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div
                    style={{ width: "16.25rem" }}
                    // className={`carousel-item ${
                    //   activeIndex === 0 ? "active" : ""
                    // }`}
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

                  <div
                    style={{ width: "16.25rem" }}
                    // className={`carousel-item ${
                    //   activeIndex === 1 ? "active" : ""
                    // }`}
                    className="carousel-item"
                  >
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
                  <div
                    style={{ width: "16.25rem" }}
                    // className={`carousel-item ${
                    //   activeIndex === 2 ? "active" : ""
                    // }`}
                    className="carousel-item"
                  >
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
            style={{ height: "35.125rem",
            width:"423.969px"}}
          >
            <div className="row ">
              <p className="right-container-heading">Sign Up</p>
            </div>
            <div className="row" style={{ height: "15.625rem" }}>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div style={{ height: "11.25rem", marginTop: "1rem" }}>
                  <div className="d-flex flex-column">
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
                          ? "User Already Exists!"
                          : "Please make use of CG-Infinity email only"}
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-column">
                    <label
                      style={{ marginTop: "1.75rem" }}
                      className="input-label-text"
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
                          className="btn password-toggle-button"
                          style={{ border: "none" }}
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
                  className="btn btn-warning border-0 sign-up-btn"
                  style={{width:"inherit"}}
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
