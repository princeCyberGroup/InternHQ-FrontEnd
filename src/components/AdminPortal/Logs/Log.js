import React from "react";
import { useState } from "react";
import Header from "../../Header/Header";
import LogCard from "./LogCard/LogCard";
import DetailedCard from "./DetailedLog/DetailedLog";

const Log = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [logData, setLogData] = useState([]);
  return (
    <>
      <div className="" style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="assign-task-page">
        <div className="container-fluid ">
          <div className="row mt-4">
            <div className=" col-md-4 p-0 ">
              <LogCard
                setSelectedUser={setSelectedUser}
                setSelectedMentor={setSelectedMentor}
                setLogData={setLogData}
              />
            </div>
            <div className=" col-md-8 p-0 ">
              <DetailedCard
                selectedUser={selectedUser}
                selectedMentor={selectedMentor}
                logData={logData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Log;
