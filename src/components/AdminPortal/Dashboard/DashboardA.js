import "../Dashboard/DashboardA.css";
import Uploadcsv from "./UploadCsv/Uploadcsv";
import ManageSkillSet from "./ManageSkillSet/manageSkillSet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Status from "./Status/Status";
import TopTech from "./TopTech/topTech";
import AssociateConsultant from "./associateConsultant/associateConsultant";
import Insights from "./Insights/insights";
import { ReactComponent as Right } from "../../../Assets/right.svg";
import Header from "../../Header/Header";

const DashboardA = () => {
  const [StatusData, setStatusData] = useState([]);
  const [acData, setAcData] = useState([]);
  const [insights, setInsights] = useState([]);
  useEffect(() => {
    fetchData();
    InsightData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL+`/api/v2/getDashboardStatus`,
        {
          headers: {
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
          },
        }
      );
      const rsp = await response.json();
      setStatusData(rsp);
      setAcData(rsp.response);
    } catch (e) {
      console.log(e);
    }
  };
  const InsightData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL+`/api/v2/getInsights`,
        {
          headers: {
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))['token']}`,
          },
        }
      );
      const insData = await response.json();
      setInsights(insData.response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="" style={{ marginBottom: "3rem" }}>
        <Header />
      </div>
      <div className="responsiveness">
        <>
          <div className="row">
            <div className="col-8">
              <div className="about">
                <Link to="/admin/reports" className="about-link">
                  Manage Consultant <Right style={{ marginBottom: "2px" }} />
                </Link>
              </div>

              <div className="row div-card-upload">
                <div className="col-8 outer-row-info">
                  <Status data={StatusData} />
                </div>
                <div className="col-4 upload-list">
                  <Uploadcsv />
                </div>
              </div>
              <ManageSkillSet data={StatusData} />
              <div className="row main-div d-flex">
                <div className="col-3">
                  <TopTech />
                </div>
                <div className="col-3 associate-div">
                  <AssociateConsultant data={acData} />
                </div>
              </div>
            </div>
            {/* //insights */}
            <div className="col-4 ">
              <Insights data={insights} />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default DashboardA;
