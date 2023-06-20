import React, { createContext, useState, useEffect } from "react";
import "./Detailedreport.css";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as Chevron } from "../../../../Assets/Vectorchevron.svg";
import { ReactComponent as Download } from "../../../../Assets/Download.svg";
import { ReactComponent as DownloadPdf } from "../../../../Assets/DownloadPDF.svg";
import { ReactComponent as Usercircle } from "../../../../Assets/Usercircle.svg";
import { ReactComponent as Clock } from "../../../../Assets/Clock.svg";
import { ReactComponent as Mail } from "../../../../Assets/Mail.svg";
import { ReactComponent as Profile } from "../../../../Assets/Profile.svg";
import { ReactComponent as Call } from "../../../../Assets/Call.svg";
import DailyUpdateTableSection from "../../../UserPortal/DailyUpdateTable/DailyUpdateTableSection";
import { Detailreportdata } from "../Dummydata";
import { ApiObj } from "../Fetcheddataobject";
import Skillsachieved from "./Skillsachieved";
import ProjectList from "./ProjectList";
import axios from "axios";
import PieChart from "./PieChart";

export const DetailedProvider = createContext();

const Detailedreport = () => {
  //data
  const { userId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const idVal = params.get("id");
  const [data, setData] = useState(Detailreportdata);
  //functions
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://cg-interns-hq.azurewebsites.net/getAllDetailsOfIntern?userId=${idVal}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <DetailedProvider.Provider
      value={{
        data,
      }}
    >
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
                <span>{data[ApiObj.IN]}</span>
              </div>
              <div className="other-info">
                <div className="icon-pair">
                  <Profile />
                  <span>{data[ApiObj.IID]}</span>
                </div>
                <div className="det-dot" />
                <div className="icon-pair">
                  <Clock />
                  <span>{data[ApiObj.DOI]}</span>
                </div>
                <div className="det-dot" />
                <div className="icon-pair">
                  <Mail />
                  <span>{data[ApiObj.EID]}</span>
                </div>
                <div className="det-dot" />
                <div className="icon-pair">
                  <Call />
                  <span>{data[ApiObj.PN]}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="detailrep-second-child">
            <div className="detail-child spent-hours">
              <span>Most Spent Hours</span>
              <div className="most-skill-hr">
              <PieChart />
              </div>
            </div>
            <div className="detail-child">
              <span>Skills Achieved</span>
              <div className="skills-achieved">
                <Skillsachieved />
              </div>
            </div>
            <div className="detail-child">
              <span>Project Details</span>
              <div className="project-details">
                <ProjectList />
              </div>
            </div>
          </div>
          <div className="detailrep-table">
            <DailyUpdateTableSection userId={idVal} />
          </div>
        </div>
      </div>
    </DetailedProvider.Provider>
  );
};

export default Detailedreport;
