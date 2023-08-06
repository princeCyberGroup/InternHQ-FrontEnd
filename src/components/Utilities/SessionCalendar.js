import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Header from "../Header/Header";
import "./SessionCalendar.css";
import { ReactComponent as UploadCsvv } from "../../Assets/upload.svg";
import CryptoJS from "crypto-js";

const SessionCalendar = () => {
  //data
  const [events, setEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const data = localStorage.getItem("userData");
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  const taskIdValue = parseInt(
    CryptoJS.AES.decrypt(
      sessionStorage.getItem("taskId"),
      process.env.REACT_APP_TASK_ID
    ).toString(CryptoJS.enc.Utf8)
  );
  var parsedObject;
  const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
  const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
  parsedObject = JSON.parse(decryptedJsonString);
  //function
  useEffect(() => {
    // Fetch events from the backend API here
    // For simplicity, I'll use a dummy data array
    const fetchedEvents = [
      {
        id: 1,
        title: "Meeting",
        start: new Date("2023-08-01T10:00:00"),
        end: new Date("2023-08-01T11:30:00"),
        time: "10:00 AM - 11:30 AM",
        for: "Batch_Jan",
        takenBy: "John Doe",
      },
      {
        id: 2,
        title: "Conference",
        start: new Date("2023-08-02T14:00:00"),
        end: new Date("2023-08-02T18:00:00"),
        time: "2:00 PM - 6:00 PM",
        for: "Batch_Jan",
        takenBy: "Jane Smith",
      },
      {
        id: 4,
        title: "Meeting 2",
        start: new Date("2023-08-01T14:00:00"),
        end: new Date("2023-08-01T15:30:00"),
        time: "2:00 PM - 3:30 PM",
        for: "Batch_Jan",
        takenBy: "Jane Smith",
      },
      {
        id: 5,
        title: "Meeting 3",
        start: new Date("2023-08-11T14:00:00"),
        end: new Date("2023-08-15T15:30:00"),
        time: "4:00 PM - 5:30 PM",
        for: "Batch_Jan",
        takenBy: "Jane Smith",
      },
    ];
    const allEvents = [];
    fetchedEvents.forEach((event) => {
      if (event.start && event.end) {
        const startDate = moment(event.start).startOf("day");
        const endDate = moment(event.end).startOf("day");

        while (startDate.isSameOrBefore(endDate, "day")) {
          const singleDayEvent = {
            ...event,
            start: startDate.toDate(),
            end: startDate.clone().endOf("day").toDate(),
          };
          allEvents.push(singleDayEvent);
          startDate.add(1, "day");
        }
      }
    });

    setEvents(allEvents);
  }, []);

  const localizer = momentLocalizer(moment);
  const CustomToolbar = (toolbar) => {
    const { view, label, onView, onNavigate, localizer } = toolbar;
    return (
      <div className="custom-toolbar-calendar">
        <div className="rbc-btn-group">
          {/* Today button */}
          <button
            type="button"
            className="rbc-btn rbc-today-button"
            onClick={() => onNavigate("TODAY")}
          >
            Today
          </button>
          {/* Previous button */}
          <button
            type="button"
            className="rbc-btn rbc-nav-btn"
            onClick={() => onNavigate("PREV")}
          >
            &lt;
          </button>
          {/* Next button */}
          <button
            type="button"
            className="rbc-btn rbc-nav-btn"
            onClick={() => onNavigate("NEXT")}
          >
            &gt;
          </button>
        </div>
        {/* Render the month and year text in bold */}
        <div className="rbc-toolbar-label">{label}</div>
        {/* Render the month, week, and day buttons */}
        <div className="rbc-btn-group">
          <button
            type="button"
            className={`rbc-btn ${view === "month" ? "rbc-active" : ""}`}
            onClick={() => onView("month")}
          >
            Month
          </button>
          <button
            type="button"
            className={`rbc-btn ${view === "week" ? "rbc-active" : ""}`}
            onClick={() => onView("week")}
          >
            Week
          </button>
          <button
            type="button"
            className={`rbc-btn ${view === "day" ? "rbc-active" : ""}`}
            onClick={() => onView("day")}
          >
            Day
          </button>
        </div>
      </div>
    );
  };

  const handleEventMouseEnter = (event, e) => {
    setHoveredEvent(event);
    setShowTooltip(true);
    positionTooltip(e);
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
    setShowTooltip(false);
  };
  const positionTooltip = (e) => {
    if (tooltipRef.current) {
      const tooltipWidth = tooltipRef.current.offsetWidth;
      const tooltipHeight = tooltipRef.current.offsetHeight;
      const bodyRect = document.body.getBoundingClientRect();
      const eventRect = e.currentTarget.getBoundingClientRect();
      const top = eventRect.top - bodyRect.top + eventRect.height + 80;
      let left =
        eventRect.left - bodyRect.left + eventRect.width / 2 - tooltipWidth / 2;
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 10;
      }
      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left + 5}px`;
      tooltipRef.current.style.zIndex = 9999; // Set zIndex to ensure the tooltip is above the calendar
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="session-parent-wrapper">
        <div className="session-header-wrapper">
          <div className="calendar-heading-style">
            <span>Session Calendar</span>
          </div>
          {parsedObject?.randomString === "cb8715" && (
            <div>
              <button
                className="upload-session-calendar"
                // data-bs-toggle="modal"
                // data-bs-target="#uploadCsv"
              >
                <UploadCsvv />
                Upload Session Calendar CSV
              </button>
            </div>
          )}
        </div>
        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: "#28519E",
                borderRadius: "2px",
                opacity: 0.8,
                color: "white",
                border: "1px solid #28519E",
                display: "block",
                width: "95%",
                margin: "auto",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "16px",
              },
            })}
            components={{
              toolbar: CustomToolbar,
              dayWrapper: ({ children }) => (
                <div style={{ height: "92px" }}>{children}</div>
              ),
              eventWrapper: ({ event, children }) => {
                return (
                  <div
                    onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                    onMouseLeave={handleEventMouseLeave}
                    style={{ position: "relative" }} // Add position: relative to the event container
                  >
                    {children}
                  </div>
                );
              },
            }}
            showMultiDayTimes={false}
            // Other props for customization can be added here
          />
          {hoveredEvent && showTooltip && (
            <div
              ref={tooltipRef}
              className="event-tooltip"
              style={{
                position: "absolute",
                zIndex: 9999,
              }}
            >
              <ul className="event-details">
                <li>{hoveredEvent.time}</li>
                <li>{hoveredEvent.for}</li>
                <li>{hoveredEvent.takenBy}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCalendar;

{
  /* <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              titleAccessor="title"
              // eventPropGetter={(event) => ({
              //   style: {
              //     backgroundColor: "#28519E",
              //     borderRadius: "2px", // Add border-radius: 2px;
              //     opacity: 0.8,
              //     color: "white",
              //     border: "1px solid #28519E",
              //     display: "block",
              //     margin: "4px",
              //     width: "95%",
              //   },
              // })}
              tooltipAccessor={(event) => eventTooltip(event)}
              components={{
                // toolbar: customToolbar,
                // dayWrapper: ({ children }) => (
                //   <div style={{ height: "200px", }}>{children}what is this </div>
                // ),
                // eventWrapper: ({ event, children }) => {
                //   return (
                //     <div
                //       onMouseEnter={() => handleEventMouseEnter(event)}
                //       onMouseLeave={handleEventMouseLeave}
                //     >
                //       {children}
                //     </div>
                //   );
                // },
              }}
            /> */
}
