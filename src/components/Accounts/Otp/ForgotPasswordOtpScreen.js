import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Accounts.css";
import Cginfinitylogo from "../../../Assets/Cginfinitylogo.png";
import CarouselImage1 from "../../../Assets/CarouselImage1.svg";
import CarouselImage2 from "../../../Assets/CarouselImage2.svg";
import CarouselImage3 from "../../../Assets/CarouselImage3.svg";
import BackArrow from "../../../Assets/BackArrow.svg";

const ForgotPasswordOtpScreen = () => {
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
    navigate("/change-password");
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
                onClick={() => navigate("/forgot-password")}
              />
              <span style={{ display: "contents", fontSize: "14px" }}>
                {" "}
                email@email.com
              </span>
            </div>
            <div className="row">
              <p
                style={{
                  marginBottom: "1.9rem",
                  color: "#8A8A8A",
                  lineHeight: "19px",
                }}
              >
                Please type the Six digit code we have sent on your Microsoft
                account.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
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
              <Link className="right-container-link" to="/forgot-password">
                Use Another Account
              </Link>
            </div>
            {/* <div className="bg-white d-flex flex-column justify-content-center align-items-center form-padding"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOtpScreen;
