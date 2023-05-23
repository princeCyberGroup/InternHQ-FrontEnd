import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";
import BackArrow from "../../../Assets/BackArrow.svg";

const SignUpOtpScreen = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); //For carousel
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 6 && /^\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };
  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000); //Make it 1000

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container-fluid login-screen-body ">
      <div className="row pos">
        <div className="d-flex justify-content-center align-items-center flex-row">
        <div className="col-md-5" style={{ backgroundColor: "#002C3F", width: "22rem"}}>
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
                className="carousel slide"
                data-bs-ride="true"
                // data-interval="false" //Remove it
              >
                <div className="carousel-indicators">
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    onClick={() => handleSlideChange(0)}
                    className={activeIndex === 0 ? "active" : ""}
                  ></button>
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    onClick={() => handleSlideChange(1)}
                    className={activeIndex === 1 ? "active" : ""}
                  ></button>
                  <button
                    data-bs-target="#carouselExampleIndicators"
                    onClick={() => handleSlideChange(2)}
                    className={activeIndex === 2 ? "active" : ""}
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div
                    style={{ width: "260px" }}
                    className={`carousel-item ${
                      activeIndex === 0 ? "active" : ""
                    }`}
                  >
                    <img
                      src={CarouselImage1}
                      className="d-block "
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
                      className="d-block "
                      alt="..."
                      style={{ width: "13rem", marginLeft: "24px" }}
                    />
                    <p className="carousel-text">
                      Enhance your skills via assessments
                    </p>
                  </div>
                  <div
                    style={{ width: "260px" }}
                    className={`carousel-item ${
                      activeIndex === 2 ? "active" : ""
                    }`}
                  >
                    <img
                      src={CarouselImage3}
                      className="d-block "
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
          <div className="col-md-7 bg-white p-4" style={{height: "517.328px"}}>
            <div className="row ">
              <p className="right-container-heading">Enter Code</p>
            </div>
            <div className="row mb-4">
              <img
                src={BackArrow}
                style={{
                  width: "1.8rem",
                  paddingRight: "3px",
                  cursor: "pointer",
                }}
                alt="Go Back"
                onClick={() => navigate("/sign-up")}
              />
              <span style={{ display: "contents", fontSize: "14px" }}>
                {" "}
                email@email.com
              </span>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "1.9rem",
                  color: "#8A8A8A",
                  lineHeight: "19px",
                }}
              >
                Please type the Six digit code we have sent on your<br/> Microsoft
                account.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                  <input
                  className="input-fields"
                    type="text"
                    pattern="\d*" // Used the "pattern" attribute to enforce digits only
                    value={value}
                    onChange={handleChange}
                    placeholder="Code"
                  />
                </div>
                <button
                  class="btn btn-warning border-0 sign-up-btn"
                  disabled={value.length < 6}
                >
                  Verify
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
