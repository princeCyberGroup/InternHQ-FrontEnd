import { useState } from "react";

const DashboardGraphMonthlyData = () => {

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [tableData, setTableData] = useState([])
    const handleMonthClick = (monthIndex) => {
        setCurrentMonth(monthIndex);
      };

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
  console.log(weekStartDate, "weekstartdate");
  function getFirstSunday(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstSunday = 1 + ((7 - firstDayOfMonth.getDay()) % 7);
    return firstSunday;
  }
  const firstSundayOfThisMonth = getFirstSunday(currentYear, currentMonth);
  let weekEndDate = new Date(currentMonthStart);
  weekEndDate.setDate(firstSundayOfThisMonth);
  console.log(weekEndDate, "weekEnddate");

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
      Idle:
        weeklyTotalHours[0].projectHours === 0
          ? "0"
          : Number.isInteger(
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
      Idle:
        weeklyTotalHours[1].projectHours === 0
          ? "0"
          : Number.isInteger(
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
      Idle:
        weeklyTotalHours[2].projectHours === 0
          ? "0"
          : Number.isInteger(
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
      Idle:
        weeklyTotalHours[3].projectHours === 0
          ? "0"
          : Number.isInteger(
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
      Idle:
        weeklyTotalHours[4].projectHours === 0
          ? "0"
          : Number.isInteger(
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
    },
  ];
};

export default DashboardGraphMonthlyData;
