import React from "react";
import EmptyTable from "../../Assets/EmptyTable.svg"
const EmptyDailyUpdateTable = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-6 text-center">
            <img src={EmptyTable} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default EmptyDailyUpdateTable;
