import React, { useContext } from "react";
import { DetailedProvider } from "./Detailedreport";
import "./Skillsachieved.css";
import { ApiObj } from "../Fetcheddataobject";
import { ReactComponent as Beginner } from "../../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../../Assets/intermediate.svg";
import { ReactComponent as Advance } from "../../../../Assets/advance.svg";

const Skillsachieved = () => {
  //data
  const { data } = useContext(DetailedProvider);
  return (
    <div className="skill-parent-wrapper">
      <div className="skill-star-count">
        <div className="skill-first-container">
            <div className="total-stars">
              <span className="count">{data[ApiObj.TAS]}</span>
              <span>Stars Achieved</span>
            </div>
            <div className="seperated-stars">
              <div>
                <span className="count">{data[ApiObj.BC]}</span>
                <span>Beginner</span>
              </div>
              <div>
                <span className="count">{data[ApiObj.IC]}</span>
                <span>Intermediate</span>
              </div>
              <div>
                <span className="count">{data[ApiObj.AC]}</span>
                <span>Advanced</span>
              </div>
            </div>
        </div>
        <div className="skill-second-container">
          <div>Technology:</div>
          <div className="tag-container">
            {data[ApiObj.BS]?.map((val, index) => {
              return (
                <div key={index} className="tag-tech">
                  <span>{val}</span>
                  <Beginner />
                </div>
              );
            })}
            {data[ApiObj.IS]?.map((val, index) => {
              return (
                <div key={index} className="tag-tech">
                  <span>{val}</span>
                  <Intermediate />
                </div>
              );
            })}
            {data[ApiObj.AS]?.map((val, index) => {
              return (
                <div key={index} className="tag-tech">
                  <span>{val}</span>
                  <Advance />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="star-info">
        <div>
          <Beginner />
        </div>
        <span>Beginner</span>
        <div>
          <Intermediate />
        </div>
        <span>Intermediate</span>
        <div>
          <Advance />
        </div>
        <span>Advanced</span>
      </div>
    </div>
  );
};

export default Skillsachieved;
