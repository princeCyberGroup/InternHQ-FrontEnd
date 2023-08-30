import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import "./graph.css";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export default function DashboardGraph() {
  const [graphType, setGraphType] = useState("daily");
  const [tableData, setTableData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const setGraphData = (type) => {
    setGraphType(type);
  };
  const [active, setActive] = useState(true);
  const handleMonthClick = (monthIndex) => {
    setCurrentMonth(monthIndex);
  };

  const DropdownItems = () => {
    if (graphType === "daily") {
      return (
        <>
          <li>
            <Link
              className="dropdown-item pe-0"
              style={{ paddingLeft: "0.5rem", fontSize: "0.875rem" }}
            >
              This Week
            </Link>
          </li>
        </>
      );
    } else if (graphType === "monthly") {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months.map((month, index) => (
        <li key={index}>
          <Link
            className="dropdown-item pe-0"
            href="#"
            style={{ paddingLeft: "0.5rem", fontSize: "0.875rem" }}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </Link>
        </li>
      ));
    }
  };

  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  var parsedObject;
  const dataU = localStorage.getItem("userData");
  if (dataU) {
    const bytes = CryptoJS.AES.decrypt(dataU, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }
  var userId = parsedObject.userId;
  const fetchData = async () => {
    await fetch(
      process.env.REACT_APP_API_URL +
        `/api/v3/dailyTaskTrackerRecords?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${parsedObject["token"]}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setTableData(data.response);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/error/statusCode=401");
        }
        if (error.response.status === 400) {
          navigate("/error/statusCode=400");
        }
        if (error.response.status === 500) {
          navigate("/error/statusCode=500");
        }
        if (error.response.status === 404) {
          navigate("/error/statusCode=404");
        }
        console.log(error);
      });
  };

  function getMonthName(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthNumber >= 0 && monthNumber <= 11) {
      return months[monthNumber];
    }
  }

  function convertToPercentageMonthly(timeString) {
    // 40 hrs 00 min ==> 100 and 20 hrs 00 min ==> 50
    const regex = /(\d+)\s*hrs\s*(\d+)\s*min/;
    const matches = timeString.match(regex);
    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);
    const totalMinutes = hours * 60 + minutes;
    const percentage = (totalMinutes / 2400) * 100;
    return Number.isInteger(percentage) ? percentage : percentage.toFixed(2);
  }

  // Getting the start and end dates of the current month
  const currentDateForMonth = new Date();
  const currentYear = currentDateForMonth.getFullYear();
  const currentMonthStart = new Date(currentYear, currentMonth, 1);

  // Initializing an array to hold the total hours for each week
  const weeklyTotalHours = [];
  // Calculating the start and end dates for each week in the month
  let weekStartDate = new Date(currentMonthStart);
  function getFirstSunday(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstSunday = 1 + ((7 - firstDayOfMonth.getDay()) % 7);
    return firstSunday;
  }
  const firstSundayOfThisMonth = getFirstSunday(currentYear, currentMonth);
  let weekEndDate = new Date(currentMonthStart);
  weekEndDate.setDate(firstSundayOfThisMonth);

  // Iterate over each week in the month
  for (let i = 0; i < 5; i++) {
    // Filter task records for the current week
    const currentWeekTaskRecords = tableData?.filter((record) => {
      let recordDate = new Date(record.startDate);
      return recordDate >= weekStartDate && recordDate <= weekEndDate;
    });

    // Calculate the total hours for each category in the current week
    let projectHours = 0;
    let cgLearningHours = 0;
    let selfLearningHours = 0;
    let mentorHours = 0;
    let sessionHours = 0;

    currentWeekTaskRecords?.forEach((record) => {
      let hours = record.totalTime;
      hours = convertHoursToDecimal(hours); // 1 hrs 53 min ===> 1.8833333333333 and 8hrs 00 min ===> 100
      if (record.learning === "CG Learning Videos") cgLearningHours += hours;
      else if (record.learning === "Mentor Assigned Task") mentorHours += hours;
      else if (record.learning === "Self Learning") selfLearningHours += hours;
      else if(record.learning === "Session") sessionHours += hours;
      else projectHours += hours;
    });

    // Store the total hours for the current week in the array
    weeklyTotalHours.push({
      weekStartDate: new Date(weekStartDate),
      weekEndDate: new Date(weekEndDate),
      projectHours,
      cgLearningHours,
      selfLearningHours,
      mentorHours,
      sessionHours
    });

    // Update the start and end dates for the next week
    weekStartDate.setDate(weekEndDate.getDate() + 1); // Set start date to 3 days after the previous end date
    weekEndDate.setDate(weekStartDate.getDate() + 6); // Set end date to 4 days after the new start date
  }

  const dataMonthly = [
    {
      name: "Week 1",
      Project:
        weeklyTotalHours[0].projectHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[0].projectHours)
            ),
      "Task by Mentor":
        weeklyTotalHours[0].mentorHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[0].mentorHours)
            ),
      "Self Learning":
        weeklyTotalHours[0].selfLearningHours === 0
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(weeklyTotalHours[0].selfLearningHours)
            ),
      "CG Learning Video":
        weeklyTotalHours[0].cgLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[0].cgLearningHours)
            ),
      "Session":
        weeklyTotalHours[0].sessionHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[0].sessionHours)
            ),
      Idle:
        weeklyTotalHours[0].projectHours === 0 &&
        weeklyTotalHours[0].mentorHours === 0 &&
        weeklyTotalHours[0].cgLearningHours === 0 &&
        weeklyTotalHours[0].selfLearningHours === 0 &&
        weeklyTotalHours[0].sessionHours === 0
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentageMonthly(
                  convertDecimalToHours(
                    weeklyTotalHours[0].projectHours +
                      weeklyTotalHours[0].mentorHours +
                      weeklyTotalHours[0].selfLearningHours +
                      weeklyTotalHours[0].cgLearningHours +
                      weeklyTotalHours[0].sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[0].projectHours +
                  weeklyTotalHours[0].mentorHours +
                  weeklyTotalHours[0].selfLearningHours +
                  weeklyTotalHours[0].cgLearningHours +
                  weeklyTotalHours[0].sessionHours
              )
            )
          : (
              100 -
              convertToPercentageMonthly(
                convertDecimalToHours(
                  weeklyTotalHours[0].projectHours +
                    weeklyTotalHours[0].mentorHours +
                    weeklyTotalHours[0].selfLearningHours +
                    weeklyTotalHours[0].cgLearningHours +
                    weeklyTotalHours[0].sessionHours
                )
              )
            ).toFixed(2),
    },
    {
      name: "Week 2",
      Project:
        weeklyTotalHours[1].projectHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[1].projectHours)
            ),
      "Task by Mentor":
        weeklyTotalHours[1].mentorHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[1].mentorHours)
            ),
      "Self Learning":
        weeklyTotalHours[1].selfLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[1].selfLearningHours)
            ),
      "CG Learning Video":
        weeklyTotalHours[1].cgLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[1].cgLearningHours)
            ),
       "Session":
        weeklyTotalHours[1].sessionHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[1].sessionHours)
            ),      
      Idle:
        weeklyTotalHours[1].projectHours === 0 &&
        weeklyTotalHours[1].mentorHours === 0 &&
        weeklyTotalHours[1].cgLearningHours === 0 &&
        weeklyTotalHours[1].selfLearningHours === 0 &&
        weeklyTotalHours[1].sessionHours === 0
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentageMonthly(
                  convertDecimalToHours(
                    weeklyTotalHours[1].projectHours +
                      weeklyTotalHours[1].mentorHours +
                      weeklyTotalHours[1].selfLearningHours +
                      weeklyTotalHours[1].cgLearningHours +
                      weeklyTotalHours[1].sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[1].projectHours +
                  weeklyTotalHours[1].mentorHours +
                  weeklyTotalHours[1].selfLearningHours +
                  weeklyTotalHours[1].cgLearningHours +
                  weeklyTotalHours[1].sessionHours
              )
            )
          : (
              100 -
              convertToPercentageMonthly(
                convertDecimalToHours(
                  weeklyTotalHours[1].projectHours +
                    weeklyTotalHours[1].mentorHours +
                    weeklyTotalHours[1].selfLearningHours +
                    weeklyTotalHours[1].cgLearningHours +
                    weeklyTotalHours[1].sessionHours
                )
              )
            ).toFixed(2),
    },
    {
      name: "Week 3",
      Project:
        weeklyTotalHours[2].projectHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[2].projectHours)
            ),
      "Task by Mentor":
        weeklyTotalHours[2].mentorHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[2].mentorHours)
            ),
      "Self Learning":
        weeklyTotalHours[2].selfLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[2].selfLearningHours)
            ),
      "CG Learning Video":
        weeklyTotalHours[2].cgLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[2].cgLearningHours)
            ),
       "Session":
        weeklyTotalHours[2].sessionHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[2].sessionHours)
            ),  
      Idle:
        weeklyTotalHours[2].projectHours === 0 &&
        weeklyTotalHours[2].mentorHours === 0 &&
        weeklyTotalHours[2].cgLearningHours === 0 &&
        weeklyTotalHours[2].selfLearningHours === 0 &&
        weeklyTotalHours[2].sessionHours === 0
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentageMonthly(
                  convertDecimalToHours(
                    weeklyTotalHours[2].projectHours +
                      weeklyTotalHours[2].mentorHours +
                      weeklyTotalHours[2].selfLearningHours +
                      weeklyTotalHours[2].cgLearningHours +
                      weeklyTotalHours[2].sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[2].projectHours +
                  weeklyTotalHours[2].mentorHours +
                  weeklyTotalHours[2].selfLearningHours +
                  weeklyTotalHours[2].cgLearningHours +
                  weeklyTotalHours[2].sessionHours
              )
            )
          : (
              100 -
              convertToPercentageMonthly(
                convertDecimalToHours(
                  weeklyTotalHours[2].projectHours +
                    weeklyTotalHours[2].mentorHours +
                    weeklyTotalHours[2].selfLearningHours +
                    weeklyTotalHours[2].cgLearningHours +
                    weeklyTotalHours[2].sessionHours

                )
              )
            ).toFixed(2),
    },
    {
      name: "Week 4",
      Project:
        weeklyTotalHours[3].projectHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[3].projectHours)
            ),
      "Task by Mentor":
        weeklyTotalHours[3].mentorHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[3].mentorHours)
            ),
      "Self Learning":
        weeklyTotalHours[3].selfLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[3].selfLearningHours)
            ),
      "CG Learning Video":
        weeklyTotalHours[3].cgLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[3].cgLearningHours)
            ),
       "Session":
        weeklyTotalHours[3].sessionHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[3].sessionHours)
            ),  
      Idle:
        weeklyTotalHours[3].projectHours === 0 &&
        weeklyTotalHours[3].mentorHours === 0 &&
        weeklyTotalHours[3].cgLearningHours === 0 &&
        weeklyTotalHours[3].selfLearningHours === 0 &&
        weeklyTotalHours[3].sessionHours === 0
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentageMonthly(
                  convertDecimalToHours(
                    weeklyTotalHours[3].projectHours +
                      weeklyTotalHours[3].mentorHours +
                      weeklyTotalHours[3].selfLearningHours +
                      weeklyTotalHours[3].cgLearningHours +
                      weeklyTotalHours[3].sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[3].projectHours +
                  weeklyTotalHours[3].mentorHours +
                  weeklyTotalHours[3].selfLearningHours +
                  weeklyTotalHours[3].cgLearningHours +
                  weeklyTotalHours[3].sessionHours
              )
            )
          : (
              100 -
              convertToPercentageMonthly(
                convertDecimalToHours(
                  weeklyTotalHours[3].projectHours +
                    weeklyTotalHours[3].mentorHours +
                    weeklyTotalHours[3].selfLearningHours +
                    weeklyTotalHours[3].cgLearningHours +
                    weeklyTotalHours[3].sessionHours
                )
              )
            ).toFixed(2),
    },
    {
      name: "Week 5",
      Project:
        weeklyTotalHours[4].projectHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[4].projectHours)
            ),
      "Task by Mentor":
        weeklyTotalHours[4].mentorHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[4].mentorHours)
            ),
      "Self Learning":
        weeklyTotalHours[4].selfLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[4].selfLearningHours)
            ),
      "CG Learning Video":
        weeklyTotalHours[4].cgLearningHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[4].cgLearningHours)
            ),
       "Session":
        weeklyTotalHours[4].sessionHours === 0
          ? "0"
          : convertToPercentageMonthly(
              convertDecimalToHours(weeklyTotalHours[4].sessionHours)
            ),  
      Idle:
        weeklyTotalHours[4].projectHours === 0 &&
        weeklyTotalHours[4].mentorHours === 0 &&
        weeklyTotalHours[4].cgLearningHours === 0 &&
        weeklyTotalHours[4].selfLearningHours === 0 &&
        weeklyTotalHours[4].sessionHours === 0
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentageMonthly(
                  convertDecimalToHours(
                    weeklyTotalHours[4].projectHours +
                      weeklyTotalHours[4].mentorHours +
                      weeklyTotalHours[4].selfLearningHours +
                      weeklyTotalHours[4].cgLearningHours +
                      weeklyTotalHours[4].sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[4].projectHours +
                  weeklyTotalHours[4].mentorHours +
                  weeklyTotalHours[4].selfLearningHours +
                  weeklyTotalHours[4].cgLearningHours +
                  weeklyTotalHours[4].sessionHours
              )
            )
          : (
              100 -
              convertToPercentageMonthly(
                convertDecimalToHours(
                  weeklyTotalHours[4].projectHours +
                    weeklyTotalHours[4].mentorHours +
                    weeklyTotalHours[4].selfLearningHours +
                    weeklyTotalHours[4].cgLearningHours +
                    weeklyTotalHours[4].sessionHours
                )
              )
            ).toFixed(2),
    },
  ];

  const formatPercentage = (tickItem) => `${tickItem}%`;

  function convertToPercentage(timeDuration) {
    // Extracting hours and minutes from the time duration string using regex
    const [hours, minutes] = timeDuration.match(/\d+/g);
    // Converting hours and minutes to numbers
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const percentage = (totalMinutes / (8 * 60)) * 100;

    return Number.isInteger(percentage) ? percentage : percentage.toFixed(2); // Returning the percentage with 2 decimal places if it is not integer
  }

  function convertHoursToDecimal(hoursString) {
    const regex = /(\d+)\s*hrs\s*(\d+)\s*min/;
    const match = hoursString.match(regex);

    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const decimalHours = hours + minutes / 60;
      return decimalHours;
    }
  }

  function convertDecimalToHours(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    const hoursString = hours + " hrs";
    const minutesString = minutes.toString().padStart(2, "0") + " min ";

    return hoursString + " " + minutesString;
  }

  const currentDate = new Date();
  // Calculating the start date (Monday) of the current week
  const currentDay = currentDate.getDay();
  console.log(currentDay, "This is currentDay")
  console.log(currentMonth, "This is month")
  var diff;
  if(new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate()==30){
     diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjusting for Sunday

  }else if(new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate()==29){ // Adjust for february month
    diff=  currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 2); // Adjusting for Sunday
  }
  else if(new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate()==28){ // Adjust for february month
    diff=  currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 2); // Adjusting for Sunday

  }
  else{
     diff=  currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 2); // Adjusting for Sunday

  }
  console.log(diff, "This diff")
  const startDate = new Date(currentDate.setDate(diff));
 console.log(startDate, "this srarrt datar")
  // console.log(new Date(currentDate.setDate(-4)), "New date")
  // Calculating the end date (Friday) of the current week
  const endDate = new Date(currentDate.setDate(diff + 4));
  const startDateFormatted = startDate.toISOString().split("T")[0];
  console.log(startDateFormatted, "startdateformatted")
  const endDateFormatted = endDate.toISOString().split("T")[0];
  console.log(endDateFormatted, "enddateformatted")

  const weekTaskRecords = tableData?.filter((record) => {
    const recordDate = new Date(record.startDate);
    const recordDateFormatted = recordDate.toISOString().split("T")[0];
    return (
      recordDateFormatted >= startDateFormatted &&
      recordDateFormatted <= endDateFormatted
    );
  });
  // Calculating the total hours for each type for each day
  const totalHoursByDay = {};
  weekTaskRecords?.forEach((record) => {
    const dayOfWeek = new Date(record.startDate).toLocaleString("en-US", {
      weekday: "long",
    });

    if (!totalHoursByDay[dayOfWeek]) {
      totalHoursByDay[dayOfWeek] = {
        projectHours: 0,
        cgLearningHours: 0,
        selfLearningHours: 0,
        mentorHours: 0,
        sessionHours: 0,
      };
    }

    let hours = record.totalTime;
    hours = convertHoursToDecimal(hours); // 1 hrs 53 min ===> 1.8833333333333 and 8hrs 00 min ===> 100

    if (record.learning === "CG Learning Videos") {
      totalHoursByDay[dayOfWeek].cgLearningHours += hours;
    } else if (record.learning === "Self Learning")
      totalHoursByDay[dayOfWeek].selfLearningHours += hours;
    else if (record.learning === "Mentor Assigned Task")
      totalHoursByDay[dayOfWeek].mentorHours += hours;
    else if (record.learning === "Session")
      totalHoursByDay[dayOfWeek].sessionHours += hours;
    else totalHoursByDay[dayOfWeek].projectHours += hours;
  });

  console.log(totalHoursByDay, "This is total hours ")
  const data = [
    {
      name: "Mon",
      Project:
        totalHoursByDay.Monday?.projectHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Monday?.mentorHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Monday?.selfLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Monday?.cgLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.cgLearningHours)
            ),
      "Session":
        totalHoursByDay.Monday?.sessionHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.sessionHours)
            ),
      Idle:
        totalHoursByDay.Monday === undefined
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Monday?.projectHours +
                      totalHoursByDay.Monday?.mentorHours +
                      totalHoursByDay.Monday?.selfLearningHours +
                      totalHoursByDay.Monday?.cgLearningHours +
                      totalHoursByDay.Monday?.sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Monday?.projectHours +
                  totalHoursByDay.Monday?.mentorHours +
                  totalHoursByDay.Monday?.selfLearningHours +
                  totalHoursByDay.Monday?.cgLearningHours +
                  totalHoursByDay.Monday?.sessionHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Monday?.projectHours +
                    totalHoursByDay.Monday?.mentorHours +
                    totalHoursByDay.Monday?.selfLearningHours +
                    totalHoursByDay.Monday?.cgLearningHours +
                    totalHoursByDay.Monday?.sessionHours
                )
              )
            ).toFixed(2),
    },
    {
      name: "Tues",
      Project:
        totalHoursByDay.Tuesday?.projectHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Tuesday?.mentorHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Tuesday?.selfLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Tuesday?.cgLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.cgLearningHours)
            ),
      "Session":
        totalHoursByDay.Tuesday?.sessionHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.sessionHours)
            ),
      Idle:
        totalHoursByDay.Tuesday === undefined
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Tuesday?.projectHours +
                      totalHoursByDay.Tuesday?.mentorHours +
                      totalHoursByDay.Tuesday?.selfLearningHours +
                      totalHoursByDay.Tuesday?.cgLearningHours +
                      totalHoursByDay.Tuesday?.sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Tuesday?.projectHours +
                  totalHoursByDay.Tuesday?.mentorHours +
                  totalHoursByDay.Tuesday?.selfLearningHours +
                  totalHoursByDay.Tuesday?.cgLearningHours +
                  totalHoursByDay.Tuesday?.sessionHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Tuesday?.projectHours +
                    totalHoursByDay.Tuesday?.mentorHours +
                    totalHoursByDay.Tuesday?.selfLearningHours +
                    totalHoursByDay.Tuesday?.cgLearningHours +
                    totalHoursByDay.Tuesday?.sessionHours
                )
              )
            ).toFixed(2),
    },
    {
      name: "Wed",
      Project:
        totalHoursByDay.Wednesday?.projectHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Wednesday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Wednesday?.mentorHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Wednesday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Wednesday?.selfLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Wednesday?.selfLearningHours
              )
            ),
      "CG Learning Video":
        totalHoursByDay.Wednesday?.cgLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Wednesday?.cgLearningHours)
            ),
      "Session":
        totalHoursByDay.Wednesday?.sessionHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Wednesday?.sessionHours)
            ),
      Idle:
        totalHoursByDay.Wednesday === undefined
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Wednesday?.projectHours +
                      totalHoursByDay.Wednesday?.mentorHours +
                      totalHoursByDay.Wednesday?.selfLearningHours +
                      totalHoursByDay.Wednesday?.cgLearningHours +
                      totalHoursByDay.Wednesday?.sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Wednesday?.projectHours +
                  totalHoursByDay.Wednesday?.mentorHours +
                  totalHoursByDay.Wednesday?.selfLearningHours +
                  totalHoursByDay.Wednesday?.cgLearningHours +
                  totalHoursByDay.Wednesday?.sessionHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Wednesday?.projectHours +
                    totalHoursByDay.Wednesday?.mentorHours +
                    totalHoursByDay.Wednesday?.selfLearningHours +
                    totalHoursByDay.Wednesday?.cgLearningHours +
                    totalHoursByDay.Wednesday?.sessionHours
                )
              )
            ).toFixed(2),
    },
    {
      name: "Thu",
      Project:
        totalHoursByDay.Thursday?.projectHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Thursday?.mentorHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Thursday?.selfLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Thursday?.cgLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.cgLearningHours)
            ),
      "Session":
        totalHoursByDay.Thursday?.sessionHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.sessionHours)
            ),
      Idle:
        totalHoursByDay.Thursday === undefined
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Thursday?.projectHours +
                      totalHoursByDay.Thursday?.mentorHours +
                      totalHoursByDay.Thursday?.selfLearningHours +
                      totalHoursByDay.Thursday?.cgLearningHours +
                      totalHoursByDay.Thursday?.sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Thursday?.projectHours +
                  totalHoursByDay.Thursday?.mentorHours +
                  totalHoursByDay.Thursday?.selfLearningHours +
                  totalHoursByDay.Thursday?.cgLearningHours +
                  totalHoursByDay.Thursday?.sessionHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Thursday?.projectHours +
                    totalHoursByDay.Thursday?.mentorHours +
                    totalHoursByDay.Thursday?.selfLearningHours +
                    totalHoursByDay.Thursday?.cgLearningHours +
                    totalHoursByDay.Thursday?.sessionHours
                )
              )
            ).toFixed(2),
    },
    {
      name: "Fri",
      Project:
        totalHoursByDay.Friday?.projectHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Friday?.mentorHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Friday?.selfLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Friday?.cgLearningHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.cgLearningHours)
            ),
      "Session":
        totalHoursByDay.Friday?.sessionHours === undefined
          ? "0"
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.sessionHours)
            ),
      Idle:
        totalHoursByDay.Friday === undefined
          ? "0"
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Friday?.projectHours +
                      totalHoursByDay.Friday?.mentorHours +
                      totalHoursByDay.Friday?.selfLearningHours +
                      totalHoursByDay.Friday?.cgLearningHours +
                      totalHoursByDay.Friday?.sessionHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Friday?.projectHours +
                  totalHoursByDay.Friday?.mentorHours +
                  totalHoursByDay.Friday?.selfLearningHours +
                  totalHoursByDay.Friday?.cgLearningHours +
                  totalHoursByDay.Friday?.sessionHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Friday?.projectHours +
                    totalHoursByDay.Friday?.mentorHours +
                    totalHoursByDay.Friday?.selfLearningHours +
                    totalHoursByDay.Friday?.cgLearningHours +
                    totalHoursByDay.Friday?.sessionHours
                )
              )
            ).toFixed(2),
    },
  ];

  const formatTooltipLabel = (value) => `${value}%`;
  return (
    <>
      <div className="card text-center report">
        <div
          className="card-header bg-white pt-0 pb-0"
          style={{ paddingRight: "1.375rem" }}
        >
          <div className="d-flex justify-content-between">
            <div className="btn-group" role="group">
              <div
                className={`daily center ${
                  active ? "card-heading-active" : "border-bottom-0"
                }`}
                style={{
                  width: "6.563rem",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setGraphData("daily");
                  setActive(true);
                }}
              >
                <p className="txt fw-bold "> Daily Hours </p>
              </div>
              <div
                className={`monthly center ${
                  active ? "border-bottom-0" : "card-heading-active"
                }`}
                style={{
                  width: "7.813rem",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setGraphData("monthly");
                  setActive(false);
                }}
              >
                <p className="txt fw-bold"> Monthly Hours </p>
              </div>
            </div>
            <div
              className="dropdown"
              style={{ marginTop: "0.694rem", marginBottom: "0.594rem" }}
            >
              <button
                className="btn dropdown-toggle dropdown-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={graphType === "daily"}
              >
                {graphType === "daily"
                  ? "This Week"
                  : getMonthName(currentMonth)}
              </button>
              <ul
                className="dropdown-menu"
                style={{
                  width: "7.688rem",
                  "--bs-dropdown-min-width": 0,
                  borderRadius: "0.25rem",
                }}
              >
                <DropdownItems />
              </ul>
            </div>
          </div>
        </div>
        <div className="chart">
          <BarChart
            width={700}
            height={350}
            style={{
              fontSize: "0.938rem",
              position: "relative",
              left: "0.5rem",
            }}
            data={graphType === "daily" ? data : dataMonthly}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 40,
            }}
            layout="vertical"
          >
            <Tooltip
              wrapperStyle={{ backgroundColor: "#ccc", fontSize: "0.813rem" }}
              itemStyle={{ textAlign: "left" }}
              labelStyle={{ fontSize: "0.875rem", fontWeight: "600" }}
              formatter={(value) => formatTooltipLabel(value)}
              labelFormatter={(label) =>
                label === "Wed"
                  ? "Wednesday"
                  : label === "Thu"
                  ? `${label}rsday`
                  : label === "Week 1"
                  ? "Week 1"
                  : label === "Week 2"
                  ? "Week 2"
                  : label === "Week 3"
                  ? "Week 3"
                  : label === "Week 4"
                  ? "Week 4"
                  : label === "Week 5"
                  ? "Week 5"
                  : `${label}day`
              }
            />
            <CartesianGrid
              vertical={false}
              horizontal={false}
              strokeDasharray="2"
              stroke="#B2B2B3"
            />
            <XAxis
              tick={{ stroke: "#000", strokeWidth: 0.6 }}
              padding={{ left: 8, right: 20 }}
              tickMargin={5}
              type="number"
              domain={[0, 100]}
              tickFormatter={formatPercentage}
              tickLine={false}
              dataKey="val"
            />
            <YAxis
              tick={{ stroke: "#000", strokeWidth: 0.6 }}
              padding={{ top: 30 }}
              tickMargin={5}
              tickLine={false}
              dataKey="name"
              type="category"
            />
            <Legend
              layout="vertical"
              iconSize={17}
              iconType="square"
              verticalAlign="center"
              align="right"
            />
            <Bar dataKey="Project" stackId="a" fill="#2DC26B" barSize={35} />
            <Bar dataKey="Task by Mentor" stackId="a" fill="#28519E" />
            <Bar dataKey="Self Learning" stackId="a" fill="#FFB81C" />
            <Bar dataKey="CG Learning Video" stackId="a" fill="#FF8311" />
            <Bar dataKey="Session" stackId="a" fill="rgba(0, 44, 63, 1)" />
            <Bar dataKey="Idle" stackId="a" fill="#B2B2B3" />
          </BarChart>
        </div>
      </div>
    </>
  );
}
