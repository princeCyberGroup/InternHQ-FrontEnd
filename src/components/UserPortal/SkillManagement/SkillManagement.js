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
      <div className="" style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <>
        {score == -1 ? "" : score >= 8 ? <Congo /> : <Sorry />}
        <div className="mainDiv">
          <div class="container-fluid ">
            <div className="row">
              <div className="col-12">
                <div className="SM-breadcrumbs">
                  <BreadCrumbs />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class=" col-md-9 p-0 " style={{ width: "58.125rem" }}>
                <TakeTest />
              </div>
              <div class=" col-md-3 p-0 skill-added-card">
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
