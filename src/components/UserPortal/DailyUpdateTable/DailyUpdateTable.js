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

const DailyUpdateTable = (props) => {
    // const sendDataToParent = () => {
  //   const data = "Hello World From Daily Update Component";
  //   props.sendData(data);
  // }
  // sendDataToParent();
  // const [loading, setLoading] = useState(false);

  var storedObject = localStorage.getItem("userData");
  var parsedObject = JSON.parse(storedObject);
  var userId = parsedObject.userId;

  return (
    <>
      <Header />
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
          <DailyUpdateTableSection/>
        </div>
      </div>
    </>
  );
};

export default DailyUpdateTable;
