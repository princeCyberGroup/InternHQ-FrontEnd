import React, { useState } from "react";
import "./DetailedLog.css";
import { ReactComponent as NoTask } from "../../../../Assets/Group 3EmpGraph.svg";
import { ReactComponent as Clock } from "../../../../Assets/clock-regular 1logClock.svg";
import { ReactComponent as Filter } from "../../../../Assets/Filter.svg";
import { ReactComponent as CalendarIcon } from "../../../../Assets/eventcalender-icon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function getInitials(name) {
  const names = name?.split(" ");
  const initials = names?.map((n) => n.charAt(0).toUpperCase());
  return initials?.join("");
}

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  let period = "AM";
  let convertedHours = parseInt(hours, 10);

  if (convertedHours === 0) {
    convertedHours = 12;
  } else if (convertedHours === 12) {
    period = "PM";
  } else if (convertedHours > 12) {
    convertedHours -= 12;
    period = "PM";
  }
  convertedHours = convertedHours.toString().padStart(2, "0");

  return `${convertedHours}:${minutes} ${period}`;
}

function CustomInput({ value, onClick }) {
  return (
    <div className="row log-date-filter m-0" onClick={onClick}>
      <input
        placeholder="Select Date"
        type="text"
        value={value}
        className="col-11 log-date-filter-input m-0"
        readOnly
      />
      <span className="col-1 p-0">
        <CalendarIcon />
      </span>
    </div>
  );
}

const DetailedCard = (props) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState(null);

  const initials = getInitials(props.selectedUser?.name);

  return (
    <>
      {props.selectedMentor ? (
        // Display user details if props.selectedUser is not null
        <div
          className="card empty-log-state d-flex "
          style={{ marginTop: "39px" }}
        >
          <div className="log-header-detailed">
            <div className="row mentor-wrapper">
              <div className="col-4 frame pointer">
                <div className="image-box1">
                  {props.selectedMentor.imageUrl ? (
                    <img
                      key={props.selectedMentor.mentorId}
                      src={props.selectedMentor.imageUrl}
                      width={38}
                      alt=""
                    />
                  ) : (
                    { initials }
                  )}
                </div>
              </div>
              <div className="col-4 pointer">
                <div className="frame-text">
                  {props.selectedMentor.mentorName}
                </div>
                <div className="frame-id">
                  {props.selectedMentor.designation}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : props.selectedUser ? (
        <div
          className="card empty-log-state d-flex "
          style={{ marginTop: "39px" }}
        >
          <div className="log-header-detailed">
            <div className=" row mentor-wrapper">
              <div className="col-4 frame pointer">
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0.938rem",
                  }}
                >
                  {initials}
                </p>
              </div>
              <div className=" col-4 pointer">
                <div className="frame-text">{props.selectedUser.name}</div>
                <div className="frame-id">{props.selectedUser.intId}</div>
              </div>
            </div>
            <div className="row">
              <div className="col p-0 report-filter mt-1">
                <Filter /> Filter:
              </div>
              <div className="col filter-container">
                <DatePicker
                  selected={selectedDateFilter}
                  onChange={(date) => setSelectedDateFilter(date)}
                  dateFormat="MM/dd/yyyy"
                  customInput={<CustomInput />}
                />
              </div>
            </div>

          </div>
          <div
            className="card-body p-0"
            style={{ maxHeight: "100vh", overflow: "auto", width: "49rem" }}
          >

            {props.logData
              .filter((log) =>
                selectedDateFilter
                  ? formatDate(log.logDate) === formatDate(selectedDateFilter)
                  : true
              )
              .map((log, index) => (
                <div
                  className="pb-3 mb-4"
                  style={{ borderBottom: "1px solid #E9ECEB" }}
                  key={index}
                >
                  <p className="log-date">{formatDate(log.logDate)}</p>

                  {log.logTime.map((timeActivity, i) => {
                    const [time, activity] = Object.entries(timeActivity)[0];
                    const convertedTime = convertTo12HourFormat(time);
                    return (
                      <div className="row mx-2 mb-3">
                        <div className="clock-icon col-1 p-0">
                          <Clock />
                        </div>
                        <div className="clock-time col-2 p-0">
                          {convertedTime}
                        </div>
                        <div className="log-item col-9 p-0">{activity}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div
          className="card empty-log-state d-flex justify-content-center"
          style={{ marginTop: "39px" }}
        >
          <div className="col-12 d-flex justify-content-center">
            <NoTask />
          </div>
          <div className="col-12 d-flex justify-content-center assign-task-empty">
            <p>No User Selected! </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedCard;
