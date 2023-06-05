import React from "react";
import ErrorImage from "../../Assets/ErrorImage.png";
import "./ErrorPage.css";
import { useLocation, useParams } from "react-router-dom";

const ErrorPage = () => {
  // const params = useParams();
  const location = useLocation();
  // console.log(location.search.slice(12), "HEr is ldosa")
  // console.log(params)
  // let errorCode = params["*"];
  // if(errorCode != '*')
  let errorCode = location.search.slice(12);
  console.log(errorCode);

  let errorMessage = "";

  switch (errorCode) {
    // case '404':
    //   errorMessage = 'Page not found';
    //   break;
    case "400":
      errorMessage = "Bad request";
      break;
    case "500":
      errorMessage = "Internal server error";
      break;
    // Add more cases for other error codes

    default:
      errorMessage = "Page not found";
      errorCode = "404";
  }
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center error-page-body"
      style={{ height: "100vh", maxWidth: "1100px" }}
    >
      <div
        className="row "
        style={{ position: "relative", width: "36%", minHeight: "50%" }}
        // style={{ border: "1px solid red" }}
      >
        <div
          className="col"
          style={{ position: "absolute", right:"8.5rem", zIndex: "1" }}
          // style={{ border: "1px solid black" }}
        >
          <img src={ErrorImage} alt="Error Image" />
        </div>
        <div
          className="col"
          style={{ position: "absolute", top: "38px",left:"83px"}}
          // style={{ border: "1px solid cginfinity" }}
        >
          <div className="row">
            <div className="col">
              <h1 className="error-heading">{errorCode}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="error-description ms-2">{errorMessage}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="error-description mt-3 ms-2" style={{ fontWeight: "700" }}>
                Please try again later !
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="border-0 error-btn mt-3 ms-2">Back to home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
