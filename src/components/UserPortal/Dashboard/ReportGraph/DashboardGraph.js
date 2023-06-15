import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Label,
  LabelList,
} from "recharts";
import "./graph.css";
import { Link } from "react-router-dom";

const dataMonthly = [
  {
    name: "Week 1",
    val: 40,
    // Project: weeklyTotalHours[0].totalProjectHours,
    // "Task by Mentor": weeklyTotalHours[0].totalMentorAssignedTaskHours,
    // "Self Learning": weeklyTotalHours[0].totalSelfLearningHours,
    // "CG Learning Video": weeklyTotalHours[0].totalCGLearningVideoHours,
    // Idle: (40 - (weeklyTotalHours[0].totalProjectHours+weeklyTotalHours[0].totalMentorAssignedTaskHours+weeklyTotalHours[0].totalSelfLearningHours+weeklyTotalHours[0].totalCGLearningVideoHours)),
    // amt: 2400,
  },
  {
    name: "Week 2",
    // Project: weeklyTotalHours[1].totalProjectHours,
    // "Task by Mentor": weeklyTotalHours[1].totalMentorAssignedTaskHours,
    // "Self Learning": weeklyTotalHours[1].totalSelfLearningHours,
    // "CG Learning Video": weeklyTotalHours[1].totalCGLearningVideoHours,
    // Idle: (40 - (weeklyTotalHours[1].totalProjectHours+weeklyTotalHours[1].totalMentorAssignedTaskHours+weeklyTotalHours[1].totalSelfLearningHours+weeklyTotalHours[1].totalCGLearningVideoHours)),
    // amt: 2210,
  },
  {
    name: "Week 3",
    // Project: weeklyTotalHours[2].totalProjectHours,
    // "Task by Mentor": weeklyTotalHours[2].totalMentorAssignedTaskHours,
    // "Self Learning": weeklyTotalHours[2].totalSelfLearningHours,
    // "CG Learning Video": weeklyTotalHours[2].totalCGLearningVideoHours,
    // Idle: (40 - (weeklyTotalHours[2].totalProjectHours+weeklyTotalHours[2].totalMentorAssignedTaskHours+weeklyTotalHours[2].totalSelfLearningHours+weeklyTotalHours[2].totalCGLearningVideoHours)),
    // amt: 2290,
  },
  {
    name: "Week 4",
    // Project: weeklyTotalHours[3].totalProjectHours,
    // "Task by Mentor": weeklyTotalHours[3].totalMentorAssignedTaskHours,
    // "Self Learning": weeklyTotalHours[3].totalSelfLearningHours,
    // "CG Learning Video": weeklyTotalHours[3].totalCGLearningVideoHours,
    // Idle: (40 - (weeklyTotalHours[3].totalProjectHours+weeklyTotalHours[3].totalMentorAssignedTaskHours+weeklyTotalHours[3].totalSelfLearningHours+weeklyTotalHours[3].totalCGLearningVideoHours)),
    // amt: 2000,
  },
  {
    name: "Week 5",
    // Project: weeklyTotalHours[4].totalProjectHours,
    // "Task by Mentor": weeklyTotalHours[4].totalMentorAssignedTaskHours,
    // "Self Learning": weeklyTotalHours[4].totalSelfLearningHours,
    // "CG Learning Video": weeklyTotalHours[4].totalCGLearningVideoHours,
    // Idle: (40 - (weeklyTotalHours[4].totalProjectHours+weeklyTotalHours[4].totalMentorAssignedTaskHours+weeklyTotalHours[4].totalSelfLearningHours+weeklyTotalHours[4].totalCGLearningVideoHours)),
    // amt: 2000,
  },
];

export default function DashboardGraph(props) {
  // const graphDataFromDailyUpdate = props.sendDataToGraph
  // function convertTimeStringToNumber(timeString) {
  //   const [hoursPart, minutesPart] = timeString.split(' hrs ');
  //   const hours = parseInt(hoursPart, 10);
  //   // console.log(hours, "This is hours")
  //   const minutes = parseInt(minutesPart, 10) || 0;
  //   // console.log(minutes, "This is minutes")
  //   const decimalHours = hours + (minutes / 60);
  //   return decimalHours;
  // }
  const [graphType, setGraphType] = useState("daily");
  const [tableData, setTableData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); //start from hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

  useEffect(() => {
    // setLoading(true);
    fetchData();
    // loading?"":
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
              // href="#"
              style={{ paddingLeft: "8px", fontSize: "14px" }}
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
            style={{ paddingLeft: "8px", fontSize: "14px" }}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </Link>
        </li>
      ));
    }
  };

  var storedObject = localStorage.getItem("userData");
  var parsedObject = JSON.parse(storedObject);
  var userId = parsedObject.userId;
  const fetchData = async () => {
    await fetch(
      `https://cg-interns-hq.azurewebsites.net/getDailyTaskTrackerRecords?userId=${userId}`
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setTableData(data.response);
        // Get the start and end dates of the current week
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

  // console.log(tableData);

  function convertToPercentageMonthly(timeString) {
    // 40 hrs 00 min ==> 100 and 20 hrs 00 min ==> 50
    const regex = /(\d+)\s*hrs\s*(\d+)\s*min/;
    const matches = timeString.match(regex);

    // if (!matches) {
    //   throw new Error("Invalid time string format");
    // }

    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);
    const totalMinutes = hours * 60 + minutes;
    const percentage = (totalMinutes / 2400) * 100;
    return Number.isInteger(percentage) ? percentage : percentage.toFixed(2);
  }

  // Get the start and end dates of the current month
  const currentDateForMonth = new Date();
  // const currentMonth = currentDateForMonth.getMonth(); // Remove from here
  // console.log(currentMonth, "currentMonth")
  const currentYear = currentDateForMonth.getFullYear();
  // console.log(currentYear, "currentYear")
  const currentMonthStart = new Date(currentYear, currentMonth, 1);
  // console.log(currentMonthStart, "currentMonthStart")
  const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);
  // console.log(currentMonthEnd, "currentMonthEnd")

  // Initialize an array to hold the total hours for each week
  const weeklyTotalHours = [];

  // Calculate the start and end dates for each week in the month
  let weekStartDate = new Date(currentMonthStart);
  console.log(weekStartDate, "weekstartdate");
  function getFirstSunday(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstSunday = 1 + ((7 - firstDayOfMonth.getDay()) % 7);
    return firstSunday;
  }
  const firstSundayOfThisMonth = getFirstSunday(currentYear, currentMonth);
  // console.log(firstSundayOfThisMonth)
  // let weekEndDate = new Date(firstSundayOfThisMonth);
  let weekEndDate = new Date(currentMonthStart);
  weekEndDate.setDate(firstSundayOfThisMonth);
  console.log(weekEndDate, "weekEnddate");

  // Iterate over each week in the month
  for (let i = 0; i < 5; i++) {
    // Filter task records for the current week
    const currentWeekTaskRecords = tableData?.filter((record) => {
      let recordDate = new Date(record.startDate);
      // recordDate = recordDate.getDate();
      // console.log(recordDate, "This is the recorderd date")
      // console.log(weekStartDate, "This is the week start date")
      // console.log(weekEndDate, "This is the week end date")
      // console.log(recordDate >= weekStartDate.getDate() && recordDate <= weekEndDate.getDate())
      return recordDate >= weekStartDate && recordDate <= weekEndDate;
    });

    // Calculate the total hours for each category in the current week
    let projectHours = 0;
    let cgLearningHours = 0;
    let selfLearningHours = 0;
    let mentorHours = 0;

    currentWeekTaskRecords?.forEach((record) => {
      let hours = record.totalTime;
      hours = convertHoursToDecimal(hours); // 1 hrs 53 min ===> 1.8833333333333 and 8hrs 00 min ===> 100
      if (record.learning === "CG Learning Videos") cgLearningHours += hours;
      else if (record.learning === "Mentor Assigned Task") mentorHours += hours;
      else if (record.learning === "Self Learning") selfLearningHours += hours;
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
    });

    // Update the start and end dates for the next week
    weekStartDate.setDate(weekEndDate.getDate() + 1); // Set start date to 3 days after the previous end date
    weekEndDate.setDate(weekStartDate.getDate() + 6); // Set end date to 4 days after the new start date
  }

  // Print the weekly total hours
  // weeklyTotalHours.forEach((week, index) => {
  //   console.log(`Week ${index + 1}`);
  //   console.log("Start Date:", week.weekStartDate);
  //   console.log("End Date:", week.weekEndDate);
  //   console.log("Total Project Hours:", week.projectHours);
  //   console.log("Total CG Learning Video Hours:", week.cgLearningHours);
  //   console.log("Total Self Learning Hours:", week.selfLearningHours);
  //   console.log("Total Mentor Assigned Task Hours:", week.mentorHours);
  // });
  // console.log(weeklyTotalHours);

  const dataMonthly = [
    {
      name: "Week 1",
      Project: convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[0].projectHours)
      ),
      "Task by Mentor": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[0].mentorHours)
      ),
      "Self Learning": convertToPercentage(
        convertDecimalToHours(weeklyTotalHours[0].selfLearningHours)
      ),
      "CG Learning Video": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[0].cgLearningHours)
      ),
      Idle: Number.isInteger(
        100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[0].projectHours +
                weeklyTotalHours[0].mentorHours +
                weeklyTotalHours[0].selfLearningHours +
                weeklyTotalHours[0].cgLearningHours
            )
          )
      )
        ? 100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[0].projectHours +
                weeklyTotalHours[0].mentorHours +
                weeklyTotalHours[0].selfLearningHours +
                weeklyTotalHours[0].cgLearningHours
            )
          )
        : (
            100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[0].projectHours +
                  weeklyTotalHours[0].mentorHours +
                  weeklyTotalHours[0].selfLearningHours +
                  weeklyTotalHours[0].cgLearningHours
              )
            )
          ).toFixed(2),
      // amt: 2400,
    },
    {
      name: "Week 2",
      Project: convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[1].projectHours)
      ),
      "Task by Mentor": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[1].mentorHours)
      ),
      "Self Learning": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[1].selfLearningHours)
      ),
      "CG Learning Video": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[1].cgLearningHours)
      ),
      Idle: Number.isInteger(
        100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[1].projectHours +
                weeklyTotalHours[1].mentorHours +
                weeklyTotalHours[1].selfLearningHours +
                weeklyTotalHours[1].cgLearningHours
            )
          )
      )
        ? 100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[1].projectHours +
                weeklyTotalHours[1].mentorHours +
                weeklyTotalHours[1].selfLearningHours +
                weeklyTotalHours[1].cgLearningHours
            )
          )
        : (
            100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[1].projectHours +
                  weeklyTotalHours[1].mentorHours +
                  weeklyTotalHours[1].selfLearningHours +
                  weeklyTotalHours[1].cgLearningHours
              )
            )
          ).toFixed(2),
      // amt: 2210,
    },
    {
      name: "Week 3",
      Project: convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[2].projectHours)
      ),
      "Task by Mentor": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[2].mentorHours)
      ),
      "Self Learning": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[2].selfLearningHours)
      ),
      "CG Learning Video": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[2].cgLearningHours)
      ),
      Idle: Number.isInteger(
        100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[2].projectHours +
                weeklyTotalHours[2].mentorHours +
                weeklyTotalHours[2].selfLearningHours +
                weeklyTotalHours[2].cgLearningHours
            )
          )
      )
        ? 100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[2].projectHours +
                weeklyTotalHours[2].mentorHours +
                weeklyTotalHours[2].selfLearningHours +
                weeklyTotalHours[2].cgLearningHours
            )
          )
        : (
            100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[2].projectHours +
                  weeklyTotalHours[2].mentorHours +
                  weeklyTotalHours[2].selfLearningHours +
                  weeklyTotalHours[2].cgLearningHours
              )
            )
          ).toFixed(2),
      // amt: 2290,
    },
    {
      name: "Week 4",
      Project: convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[3].projectHours)
      ),
      "Task by Mentor": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[3].mentorHours)
      ),
      "Self Learning": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[3].selfLearningHours)
      ),
      "CG Learning Video": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[3].cgLearningHours)
      ),
      Idle: Number.isInteger(
        100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[3].projectHours +
                weeklyTotalHours[3].mentorHours +
                weeklyTotalHours[3].selfLearningHours +
                weeklyTotalHours[3].cgLearningHours
            )
          )
      )
        ? 100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[3].projectHours +
                weeklyTotalHours[3].mentorHours +
                weeklyTotalHours[3].selfLearningHours +
                weeklyTotalHours[3].cgLearningHours
            )
          )
        : (
            100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[3].projectHours +
                  weeklyTotalHours[3].mentorHours +
                  weeklyTotalHours[3].selfLearningHours +
                  weeklyTotalHours[3].cgLearningHours
              )
            )
          ).toFixed(2),
      // amt: 2000,
    },
    {
      name: "Week 5",
      Project: convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[4].projectHours)
      ),
      "Task by Mentor": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[4].mentorHours)
      ),
      "Self Learning": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[4].selfLearningHours)
      ),
      "CG Learning Video": convertToPercentageMonthly(
        convertDecimalToHours(weeklyTotalHours[4].cgLearningHours)
      ),
      Idle: Number.isInteger(
        100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[4].projectHours +
                weeklyTotalHours[4].mentorHours +
                weeklyTotalHours[4].selfLearningHours +
                weeklyTotalHours[4].cgLearningHours
            )
          )
      )
        ? 100 -
          convertToPercentageMonthly(
            convertDecimalToHours(
              weeklyTotalHours[4].projectHours +
                weeklyTotalHours[4].mentorHours +
                weeklyTotalHours[4].selfLearningHours +
                weeklyTotalHours[4].cgLearningHours
            )
          )
        : (
            100 -
            convertToPercentageMonthly(
              convertDecimalToHours(
                weeklyTotalHours[4].projectHours +
                  weeklyTotalHours[4].mentorHours +
                  weeklyTotalHours[4].selfLearningHours +
                  weeklyTotalHours[4].cgLearningHours
              )
            )
          ).toFixed(2),
      // amt: 2000,
    },
  ];

  // const currentDate = new Date();
  //   const currentWeekStart = (currentDate.getDate() - currentDate.getDay()) + 1;
  //   console.log(currentWeekStart, "This is week start")
  //   const currentWeekEnd = currentWeekStart + 4;
  //   console.log(currentWeekEnd, "This is week end")
  //   const currentWeekStartDate = new Date(currentDate.setDate(currentWeekStart));
  //   console.log(currentWeekStartDate, "currentWeekStartDate")
  //   const currentWeekEndDate = new Date(currentDate.setDate(currentWeekEnd));

  //   // Filter task records for the current week
  //   const currentWeekTaskRecords = tableData.filter(record => {
  //     let recordDate = new Date(record.startDate);
  //     recordDate = recordDate.getDate();
  //     // console.log(recordDate, "RecordDAte")
  //     // console.log(currentWeekStartDate.getDate(), "Week start data")
  //     // console.log(currentWeekEndDate.getDate(), "Week end data")
  //     // console.log(recordDate.getDate(), "recordDAte")
  //     console.log(recordDate >= currentWeekStartDate.getDate() && recordDate <= currentWeekEndDate.getDate())
  //     return recordDate >= currentWeekStartDate.getDate() && recordDate <= currentWeekEndDate.getDate();
  //   });
  //   console.log(currentWeekTaskRecords, "currentWeekTaskRecords")

  //   // Calculate the total hours for each category
  //   let totalProjectHours = 0;
  //   let totalCGLearningVideoHours = 0;
  //   let totalSelfLearningHours = 0;
  //   let totalMentorAssignedTaskHours = 0;

  //   currentWeekTaskRecords.forEach(record => {
  //     let hours = record.totalTime;
  //     hours = getHoursFromString(hours);
  //     if(record.learning == "CG Learning Videos") {
  //       console.log("Inside CG one")
  //       totalCGLearningVideoHours += hours}
  //     else if(record.learning == "Self Learning") totalSelfLearningHours += hours;
  //     else if(record.learning == "Mentor Assigned Task") totalMentorAssignedTaskHours += hours;
  //     else totalProjectHours += hours
  //   });
  //    // Print the total hours for each category
  //    console.log("Total Project Hours:", totalProjectHours);
  //    console.log("Total CG Learning Video Hours:", totalCGLearningVideoHours);
  //    console.log("Total Self Learning Hours:", totalSelfLearningHours);
  //    console.log("Total Mentor Assigned Task Hours:", totalMentorAssignedTaskHours);

  const formatPercentage = (tickItem) => `${tickItem}%`;

  function convertToPercentage(timeDuration) {
    // Extracting hours and minutes from the time duration string using regex
    const [hours, minutes] = timeDuration.match(/\d+/g);
    // Converting hours and minutes to numbers
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const percentage = (totalMinutes / (8 * 60)) * 100;

    return Number.isInteger(percentage) ? percentage : percentage.toFixed(2); // Returning the percentage with 2 decimal places if it is not integer
  }
  // console.log(convertToPercentage("40 hrs 00 min"))

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
  // console.log(convertHoursToDecimal("8hrs 00 min"), "This is logging");

  function convertDecimalToHours(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    const hoursString = hours + " hrs";
    const minutesString = minutes.toString().padStart(2, "0") + " min ";

    return hoursString + " " + minutesString;
  }
  // console.log(convertDecimalToHours(40), "decimal to hours");

  const currentDate = new Date();
  // Calculating the start date (Monday) of the current week
  const currentDay = currentDate.getDay();
  const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjusting for Sunday
  const startDate = new Date(currentDate.setDate(diff));
  // Calculating the end date (Friday) of the current week
  const endDate = new Date(currentDate.setDate(diff + 4));
  const startDateFormatted = startDate.toISOString().split("T")[0];
  const endDateFormatted = endDate.toISOString().split("T")[0];

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
    else totalHoursByDay[dayOfWeek].projectHours += hours;
    // console.log(totalHoursByDay, dayOfWeek);
  });

  const data = [
    {
      name: "Mon",
      Project:
        totalHoursByDay.Monday?.projectHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Monday?.mentorHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Monday?.selfLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Monday?.cgLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Monday?.cgLearningHours)
            ),
      Idle:
        totalHoursByDay.Monday?.mentorHours === undefined
          ? ""
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Monday?.projectHours +
                      totalHoursByDay.Monday?.mentorHours +
                      totalHoursByDay.Monday?.selfLearningHours +
                      totalHoursByDay.Monday?.cgLearningHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Monday?.projectHours +
                  totalHoursByDay.Monday?.mentorHours +
                  totalHoursByDay.Monday?.selfLearningHours +
                  totalHoursByDay.Monday?.cgLearningHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Monday?.projectHours +
                    totalHoursByDay.Monday?.mentorHours +
                    totalHoursByDay.Monday?.selfLearningHours +
                    totalHoursByDay.Monday?.cgLearningHours
                )
              )
            ).toFixed(2),
      // amt: 2400,
    },
    {
      name: "Tues",
      Project:
        totalHoursByDay.Tuesday?.projectHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Tuesday?.mentorHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Tuesday?.selfLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Tuesday?.cgLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Tuesday?.cgLearningHours)
            ),
      Idle:
        totalHoursByDay.Tuesday?.mentorHours === undefined
          ? ""
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Tuesday?.projectHours +
                      totalHoursByDay.Tuesday?.mentorHours +
                      totalHoursByDay.Tuesday?.selfLearningHours +
                      totalHoursByDay.Tuesday?.cgLearningHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Tuesday?.projectHours +
                  totalHoursByDay.Tuesday?.mentorHours +
                  totalHoursByDay.Tuesday?.selfLearningHours +
                  totalHoursByDay.Tuesday?.cgLearningHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Tuesday?.projectHours +
                    totalHoursByDay.Tuesday?.mentorHours +
                    totalHoursByDay.Tuesday?.selfLearningHours +
                    totalHoursByDay.Tuesday?.cgLearningHours
                )
              )
            ).toFixed(2),
      // amt: 2400,
    },
    {
      name: "Wed",
      Project:
        totalHoursByDay.Wednesday?.projectHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Wednesday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Wednesday?.mentorHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Wednesday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Wednesday?.selfLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Wednesday?.selfLearningHours
              )
            ),
      "CG Learning Video":
        totalHoursByDay.Wednesday?.cgLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Wednesday?.cgLearningHours)
            ),
      Idle:
        totalHoursByDay.Wednesday?.mentorHours === undefined
          ? ""
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Wednesday?.projectHours +
                      totalHoursByDay.Wednesday?.mentorHours +
                      totalHoursByDay.Wednesday?.selfLearningHours +
                      totalHoursByDay.Wednesday?.cgLearningHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Wednesday?.projectHours +
                  totalHoursByDay.Wednesday?.mentorHours +
                  totalHoursByDay.Wednesday?.selfLearningHours +
                  totalHoursByDay.Wednesday?.cgLearningHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Wednesday?.projectHours +
                    totalHoursByDay.Wednesday?.mentorHours +
                    totalHoursByDay.Wednesday?.selfLearningHours +
                    totalHoursByDay.Wednesday?.cgLearningHours
                )
              )
            ).toFixed(2),
      // amt: 2400,
    },
    {
      name: "Thu",
      Project:
        totalHoursByDay.Thursday?.projectHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Thursday?.mentorHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Thursday?.selfLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Thursday?.cgLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Thursday?.cgLearningHours)
            ),
      Idle:
        totalHoursByDay.Thursday?.mentorHours === undefined
          ? ""
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Thursday?.projectHours +
                      totalHoursByDay.Thursday?.mentorHours +
                      totalHoursByDay.Thursday?.selfLearningHours +
                      totalHoursByDay.Thursday?.cgLearningHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Thursday?.projectHours +
                  totalHoursByDay.Thursday?.mentorHours +
                  totalHoursByDay.Thursday?.selfLearningHours +
                  totalHoursByDay.Thursday?.cgLearningHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Thursday?.projectHours +
                    totalHoursByDay.Thursday?.mentorHours +
                    totalHoursByDay.Thursday?.selfLearningHours +
                    totalHoursByDay.Thursday?.cgLearningHours
                )
              )
            ).toFixed(2),
      // amt: 2400,
    },
    {
      name: "Fri",
      Project:
        totalHoursByDay.Friday?.projectHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.projectHours)
            ),
      "Task by Mentor":
        totalHoursByDay.Friday?.mentorHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.mentorHours)
            ),
      "Self Learning":
        totalHoursByDay.Friday?.selfLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.selfLearningHours)
            ),
      "CG Learning Video":
        totalHoursByDay.Friday?.cgLearningHours === undefined
          ? ""
          : convertToPercentage(
              convertDecimalToHours(totalHoursByDay.Friday?.cgLearningHours)
            ),
      Idle:
        totalHoursByDay.Friday?.mentorHours === undefined
          ? ""
          : Number.isInteger(
              100 -
                convertToPercentage(
                  convertDecimalToHours(
                    totalHoursByDay.Friday?.projectHours +
                      totalHoursByDay.Friday?.mentorHours +
                      totalHoursByDay.Friday?.selfLearningHours +
                      totalHoursByDay.Friday?.cgLearningHours
                  )
                )
            )
          ? 100 -
            convertToPercentage(
              convertDecimalToHours(
                totalHoursByDay.Friday?.projectHours +
                  totalHoursByDay.Friday?.mentorHours +
                  totalHoursByDay.Friday?.selfLearningHours +
                  totalHoursByDay.Friday?.cgLearningHours
              )
            )
          : (
              100 -
              convertToPercentage(
                convertDecimalToHours(
                  totalHoursByDay.Friday?.projectHours +
                    totalHoursByDay.Friday?.mentorHours +
                    totalHoursByDay.Friday?.selfLearningHours +
                    totalHoursByDay.Friday?.cgLearningHours
                )
              )
            ).toFixed(2),
      // amt: 2400,
    },
  ];

  const formatTooltipLabel = (value) => `${value}%`;
  return (
    <>
      <div className="card text-center report">
        <div
          className="card-header bg-white pt-0 pb-0"
          style={{ paddingRight: "22px" }}
        >
          <div className="d-flex justify-content-between">
            <div className="btn-group" role="group">
              <div
                className={`daily center ${
                  active ? "card-heading-active" : "border-bottom-0"
                }`}
                style={{width: "105px", display: "flex", justifyContent: "center" }}
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
                  width: "125px", display: "flex", justifyContent: "center"
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
                  width: "123px",
                  "--bs-dropdown-min-width": 0,
                  borderRadius: "4px",
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
            style={{ fontSize: "15px", position: "relative", left: "0.5rem" }}
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
              wrapperStyle={{ backgroundColor: "#ccc", fontSize: "13px" }}
              // itemStyle={{fontSize: "18px"}}
              itemStyle={{ textAlign: "left" }}
              labelStyle={{ fontSize: "14px", fontWeight: "600" }}
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
            <Bar dataKey="Idle" stackId="a" fill="#B2B2B3" />
          </BarChart>
        </div>
      </div>
    </>
  );
}
