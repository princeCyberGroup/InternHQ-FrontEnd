import React, { useEffect, useState } from "react";

const DatePicker = ({ datefunc }) => {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    datefunc(selectedDate); //Passing selectedDate from here to DailyUpdateTable to set the value of dateFilterValue
  }, [selectedDate]);

  const currentDate = new Date();
  const currentYear = String(currentDate.getFullYear());
  let currentMonth = String(currentDate.getMonth() + 1);
  if (currentMonth.length == 1) currentMonth = "0" + currentMonth;

  return (
    <div>
      <input
        className="form-control"
        type="month"
        value={selectedDate || `${currentYear}-${currentMonth}`}
        onChange={(event) => {
          setSelectedDate(event.target.value);
        }}
        style={{ width: "75%" }}
      />
    </div>
  );
};

export default DatePicker;
