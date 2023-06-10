import React from "react";
import BadRequestImage from "../../Assets/BadRequestImage.png";
import BadRequestTextImage from "../../Assets/BadRequestTextImage.png";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const BadRequest = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col text-center">
            <img src={BadRequestImage} alt="Bad Request Image" />
            <h1
              style={{
                fontFamily: "Lexend Deca",
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: "136.5%",
                color: "#28519E",
              }}
            >
              Bad Request
            </h1>
            <p
              style={{
                fontFamily: "'Lexend Deca'",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "136.5%",
                color: "#6D6D6D",
              }}
            >
              We’re sorry, request header or cookie too large
              <br />
              Please go back to the homepage
            </p>
            <button
              style={{
                padding: "12px 24px",
                background: "#28519E",
                borderRadius: "4px",
                fontFamily: "Lexend Deca",
                lineHeight: "22px",
                color: "#FFFFFF",
              }}
              onClick={() => navigate("/")}
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadRequest;
