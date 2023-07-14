import React, { createContext, useEffect, useState } from "react";
import "./Detailedreport.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Chevron } from "../../../../Assets/Vectorchevron.svg";
import { ReactComponent as Download } from "../../../../Assets/Download.svg";
import { ReactComponent as DownloadPdf } from "../../../../Assets/DownloadPDF.svg";
import { ReactComponent as Usercircle } from "../../../../Assets/Usercircle.svg";
import { ReactComponent as Clock } from "../../../../Assets/Clock.svg";
import { ReactComponent as Mail } from "../../../../Assets/Mail.svg";
import { ReactComponent as Profile } from "../../../../Assets/Profile.svg";
import { ReactComponent as Call } from "../../../../Assets/Call.svg";
import DailyUpdateTableSection from "../../../UserPortal/DailyUpdateTable/DailyUpdateTableSection";
import { ApiObj } from "../Fetcheddataobject";
import Skillsachieved from "./Skillsachieved";
import ProjectList from "./ProjectList";
import axios from "axios";
import PieChart from "./PieChart";
import Header from "../../../Header/Header";
import CryptoJS from "crypto-js";
import Detailreportskeleton from "./Detailreportskeleton";

export const DetailedProvider = createContext();

const Detailedreport = () => {
  //data
  const chrumValue = sessionStorage.getItem("chrumValue");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const idVal = parseInt(sessionStorage.getItem("detailId"));
  const [isLoading, setIsLoading] = useState(true);
  //functions
  const fetchData = async () => {
    const secretkeyUser = process.env.REACT_APP_USER_KEY;
    var parsedObject;
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      parsedObject = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          `/api/v3/getAllDetailsOfIntern?userId=${idVal}`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      setData(response.data?.userDetails);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (error.response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (error.response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (error.response.status === 404) {
        navigate("/error/statusCode=404");
      }
      navigate("/pagenotfound");
    }
  };
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
                <Link
                  to={
                    chrumValue === "Report"
                      ? "/admin/reports"
                      : "/admin/dashboard"
                  }
                  className="crumb-parent"
                >
                  {chrumValue}
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
            <div className="detail-info-wrapper">
              {isLoading ? (
                <Detailreportskeleton />
              ) : (
                <>
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
                </>
              )}
              <div className="detailrep-table">
                <div className="progress-div">
                  <span>Progress Report</span>
                </div>
                <DailyUpdateTableSection userId={idVal} />
              </div>
            </div>
          </div>
        </div>
      </DetailedProvider.Provider>
    </>
  );
};

export default Detailedreport;
