import React from "react";
import "./Detailedreport.css";
import { Link } from "react-router-dom";
import { ReactComponent as Chevron } from "../../../../Assets/Vectorchevron.svg";
import { ReactComponent as Download } from "../../../../Assets/Download.svg";
import { ReactComponent as DownloadPdf } from "../../../../Assets/DownloadPDF.svg";
import { ReactComponent as Usercircle } from "../../../../Assets/Usercircle.svg";
import { ReactComponent as Clock } from "../../../../Assets/Clock.svg";
import { ReactComponent as Mail } from "../../../../Assets/Mail.svg";
import { ReactComponent as Profile } from "../../../../Assets/Profile.svg";
import { ReactComponent as Call } from "../../../../Assets/Call.svg";
import DailyUpdateTableSection from "../../../UserPortal/DailyUpdateTable/DailyUpdateTableSection";

const Detailedreport = () => {
  return (
    <div className="detailedrep-parent-wrapper">
      <div className="detailedrep-child-wrapper">
        <div className="detailrep-header">
          <div className="detailrep-breadcrum">
            <Link to="/admin/report" className="crumb-parent">
              Report
            </Link>
            <Chevron />
            <span>User Information</span>
          </div>
          <div className="report-download">
            <span>Download</span>
            <div>
              <Download />
            </div>
            <div>
              <DownloadPdf />
            </div>
          </div>
        </div>
        <div className="detailrep-user-info">
          <div className="use-info">
            <span>User Information</span>
          </div>
          <div className="info-detail">
            <div className="user-name">
              <Usercircle />
              <span>User Name</span>
            </div>
            <div className="other-info">
              <div className="icon-pair">
                <Profile />
                <span>INT 123</span>
              </div>
              <div className="det-dot" />
              <div className="icon-pair">
                <Clock />
                <span>08 Months</span>
              </div>
              <div className="det-dot" />
              <div className="icon-pair">
                <Mail />
                <span>user.name@example.com</span>
              </div>
              <div className="det-dot" />
              <div className="icon-pair">
                <Call />
                <span>9898989898</span>
              </div>
            </div>
          </div>
        </div>
        <div className="detailrep-second-child">
        <div className="detail-child">
        <span>
          Most Spent Hours
        </span>
        <div className="most-skill-hr">

        </div>
        </div>
        <div className="detail-child">
        <span>
          Skills Achieved
        </span>
        <div className="skills-achieved">

        </div>
        </div>
        <div className="detail-child">
        <span>
          Project Details
        </span>
        <div className="project-details">

        </div>
        </div>
        </div>
        <div className="detailrep-table">
        <DailyUpdateTableSection userId = {35}/>
        </div>
      </div>
    </div>
  );
};

export default Detailedreport;
