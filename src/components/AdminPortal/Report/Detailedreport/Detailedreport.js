import React, { createContext, useEffect, useState } from "react";
import "./Detailedreport.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import Header from "../../../Header/Header";

export const DetailedProvider = createContext();

const Detailedreport = () => {
  //data
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const idVal = parseInt(sessionStorage.getItem("detailId"));
  //functions
  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL+`/api/v2/getAllDetailsOfIntern?userId=${idVal}`,
        {
          headers: {
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
          },
        }
      );
      setData(response.data?.userDetails);
    } catch (error) {
      navigate("/pagenotfound");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DetailedProvider.Provider
        value={{
          data,
        }}
      >
        <div className="" style={{ marginBottom: "5rem" }}>
          <Header />
        </div>
        <div className="detailedrep-parent-wrapper">
          <div className="detailedrep-child-wrapper">
            <div className="detailrep-header">
              <div className="detailrep-breadcrum">
                <Link to="/admin/reports" className="crumb-parent">
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
                  <span>{`${data[ApiObj.FN]} ${data[ApiObj.LN]}`}</span>
                </div>
                <div className="other-info">
                  <div className="icon-pair">
                    <Profile />
                    <span>{data.internId}</span>
                  </div>
                  <div className="det-dot" />
                  <div className="icon-pair">
                    <Clock />
                    <span>{`${data[ApiObj.DOI]} months`}</span>
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
            <div className="progress-div"><span>Progress Report</span></div>
              <DailyUpdateTableSection userId={idVal} />
            </div>
          </div>
        </div>
      </DetailedProvider.Provider>
    </>
  );
};

export default Detailedreport;
