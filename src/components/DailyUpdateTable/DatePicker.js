import React, { useEffect, useState } from "react";

const DatePicker = ({ datefunc }) => {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    datefunc(selectedDate); //Passing selectedDate from here to DailyUpdateTable to set the value of dateFilterValue
  }, [selectedDate]);

  return (
    <div>
      <input
        className="form-control"
        type="month"
        value= {selectedDate || "2023-12"}
        // value={selectedDate}
        onChange={(event) => {
          setSelectedDate(event.target.value);
          // datefunc(selectedDate);
        }}
        style={{ width: "75%" }}
      />
    </div>
  );
};

export default DatePicker;
