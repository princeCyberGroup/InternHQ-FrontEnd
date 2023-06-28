import React, { useContext, useEffect } from "react";
import "./skillmanagement.css";
import TakeTest from "./TakeTest/TakeTest";
import SkillsAdded from "./SkillsAdded/SkillsAdded";
import Header from "../../Header/Header";
import { UserContext } from "../../../Context/Context";
import Congo from "../SkillManagement/Modals/Congo";
import Sorry from "../SkillManagement/Modals/Sorry";
import BreadCrumbs from "../../BreadCrumbs/BreadCrumbs";
const SkillManagement = () => {
  const { score } = useContext(UserContext);
  return (
    <>
      <div className="" style={{ marginBottom: "3rem" }}>
        <Header />
      </div>
      <>
        {score == -1 ? "" : score >= 80 ? <Congo /> : <Sorry />}
        <div className="mainDiv">
          <div className="container-fluid " style={{height: "780px"}}>
            <div className="row">
              <div className="col-12">
                <div className="SM-breadcrumbs">
                  <BreadCrumbs />
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className=" col-md-9 p-0 " style={{ width: "58.125rem" }}>
                <TakeTest />
              </div>
              <div className=" col-md-3 ps-0 skill-added-card">
                <SkillsAdded />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
export default SkillManagement;
