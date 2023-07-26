import React, { useEffect, useState } from "react";
import "./DailyUpdateTable.css";
import DatePicker from "./DatePicker";
import SearchBar from "./SearchBar";
import LearningTypeDropDown from "./LearningTypeDropDown";
import { Modal, Form } from "react-bootstrap";
import EmptyDailyUpdateTable from "./EmptyDailyUpdateTable";
import Header from "../../Header/Header";
import DurationClock from "../../../Assets/DurationClock.svg";
import ImageTooltip from "./ImageTooltip";
import BreadCrumbs from "../../BreadCrumbs/BreadCrumbs";
import DailyUpdateTableSection from "./DailyUpdateTableSection";
import CryptoJS from "crypto-js";

const DailyUpdateTable = (props) => {
  // const sendDataToParent = () => {
  //   const data = "Hello World From Daily Update Component";
  //   props.sendData(data);
  // }
  // sendDataToParent();
  // const [loading, setLoading] = useState(false);

  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  var parsedObject;
  const data = localStorage.getItem("userData");
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }
  var userId = parsedObject.userId;

  return (
    <>
      <div className="" style={{ marginBottom: "3rem" }}>
        <Header />
      </div>
      <div className="container-fluid daily-update-table-container d-flex flex-column">
        <div className="daily-update-table-wrapper ">
          <div className="row ">
            <div className="col-12">
              <div className="daily-update-nav-bar">
                <BreadCrumbs />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="daily-update-heading">
                <p>Daily Update</p>
              </div>
            </div>
          </div>
          <DailyUpdateTableSection userId={userId} />
        </div>
      </div>
    </>
  );
};

export default DailyUpdateTable;
