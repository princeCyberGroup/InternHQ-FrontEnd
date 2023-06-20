import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";
import { UserContext } from "../../../Context/Context";
import "bootstrap-icons/font/bootstrap-icons.css";
import { bottom } from "@popperjs/core";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { navigateTo } = useContext(UserContext);
  // const [activeIndex, setActiveIndex] = useState(0); //For carousel

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
  let firstNaming;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await axios
      .post("https://cg-interns-hq.azurewebsites.net/internLogin", {
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
          userType: response.data.userType,
        };
        localStorage.setItem("userData", JSON.stringify(res));
        // const res = {
        //   token:response.data.token,
        //   email:response.data.response[0].email,
        //   id:response.data.response[0].id,
        //   firstName:response.data.response[0].firstname,
        //   lastName:response.data.response[0].lastname,
        //   lastLogin:response.data.response[0].lastlogin
        // };

        // console.log(response.data.response[0].id);
        // console.log(response.data)
        // setCurrentUser(response.data);
        // const token = response.data.token;
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem('userData', JSON.stringify(res));
        // setAuth({ email, password, token });
        setIsLoading(false);
        navigateTo = res.userType.toLowerCase();
        navigate(
          res.userType.toLowerCase() === "u"
            ? "/dashboard"
            : res.userType.toLowerCase() === "a"
            ? "/admin-dashboard"
            : "/mentor-dashboard"
        );
        localStorage.setItem("token");
      })
      .catch((error) => {
        // if(error.response?.data.statusCode == 400) {
        //   navigate(`/error?statusCode=${error.response?.data.statusCode}`)
        // }
        console.log(error.response?.data);
        // console.log(error.response.data);
        // console.log(error.response?.data.msg);
        // console.log(error.response.data.status);

        // localStorage.setItem("login",false);
        if (error.response?.data.msg === "Error: Email does not exist") {
          setIsEmailValid(false);
          setIncorrectemail(true);
        } else {
          setIsPasswordValid(false);
        }
        setIsLoading(false);

        // navigate(`/error?statusCode=${error.response?.data.statusCode}`);
      });
    // console.log(email);
    // console.log(`password: ${password} (hidden visible only on backend)`);
  };
  // const handleSlideChange = (index) => {
  //   setActiveIndex(index);
  // };

  useEffect(() => {
    let login = localStorage.getItem("login");
    console.log("value of authguard in login", navigateTo);
    if (login && navigateTo !== "") {
      navigateTo === "u"
        ? navigate("/dashboard")
        : navigateTo === "a"
        ? navigate("/admin-dashboard")
        : navigate("/mentor-dashboard");
    }
    // const interval = setInterval(() => {
    //   setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    // }, 3000); //Make it 1000

    // return () => {
    //   setNavigateTo();
    // };
  }, []);
  return (
    <div className="container-fluid login-screen-body ">
      {/* {console.log(btoa("sign-up"))}
      {console.log(encodeURIComponent("c2lnbi11cA=="))}
      {console.log(atob("c2lnbi11cA=="))} */}
      <div className="row pos">
        <div className="d-flex justify-content-center  align-items-center flex-row">
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
            style={{ height: "35.125rem" }}
          >
            <div className="row ">
              <p className="right-container-heading">Login</p>
            </div>
            <div className="row" style={{ height: "15.625rem" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ height: "10.625rem", marginTop: "1rem" }}>
                  <div className="d-flex flex-column">
                    <label
                      className="input-label-text"
                      for="exampleInputEmail1"
                    >
                      Email ID
                    </label>
                    <input
                      className="input-login"
                      type="email"
                      id="exampleInputEmail1"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter Your Email ID"
                      required
                    />
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
                      style={{ marginTop: "1.75rem" }}
                      className="input-label-text"
                      for="exampleInputPassword1"
                    >
                      Password
                    </label>
                    {/* <div className="password-input-container"> */}
                    <div className="input-group">
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
                    {!isPasswordValid && password && (
                      <span className="sign-up-warning">
                        Incorrect Password
                      </span>
                    )}

                    {/* <input
                      className="input-fields"
                      type={showPassword ? "text" : "password"}
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      value={password}
                      required
                      onChange={handlePasswordChange}
                    />
                    <span
                      className=""
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </span>
            
                    {!isPasswordValid && password && (
                      <span className="sign-up-warning">
                        Incorrect Password
                      </span>
                    )} */}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning border-0 sign-up-btn mt-3"
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
                className="mt-0 right-container-link"
                style={{ marginBottom: "0.4rem" }}
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
