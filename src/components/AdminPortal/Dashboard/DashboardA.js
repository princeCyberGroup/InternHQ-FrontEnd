import "../Dashboard/DashboardA.css";
import Uploadcsv from "./UploadCsv/Uploadcsv";
import ManageSkillSet from "./ManageSkillSet/manageSkillSet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Status from "./Status/Status";
// import TopTech from "./TopTech/topTech";
import PieChartTopTech from "./TopTech/PieChartTopTech";
import AssociateConsultant from "./associateConsultant/associateConsultant";
import Insights from "./Insights/insights";
import { ReactComponent as Right } from "../../../Assets/right.svg";
import Header from "../../Header/Header";
import CryptoJS from "crypto-js";

const DashboardA = () => {
  const [StatusData, setStatusData] = useState([]);
  const [acData, setAcData] = useState([]);
  const [insights, setInsights] = useState([]);
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
  useEffect(() => {
    fetchData();
    // InsightData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/v2/getDashboardStatus`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
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
        process.env.REACT_APP_API_URL + `/api/v2/getInsights`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
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
      <div className="responsivenessA ">
        <>
          <div className="row">
            <div className="col-8 component-div"  >
            <div className="about">
               
              </div>
              <div className="row div-staus-upload">
                 <Link to="/admin/reports" className="about-link">
                  Manage Consultant <Right style={{ marginBottom: "2px" }} />
                </Link>
                <div className="col-6 outer-row-info">
                  <Status data={StatusData} />
                </div>
                <div className="col-6 upload-list">
                  <Uploadcsv />
                </div>
              </div>
              <ManageSkillSet data={StatusData} />
              <div className="row manage-total-test d-flex">
                <div className="col-6"style={{ padding: 0 }}>
                  <PieChartTopTech />
                </div>
                <div className="col-6 associate-div " style={{ padding: 0 }}>
                  <AssociateConsultant data={acData} />
                </div>
              </div>
            </div>
            {/* //insights */}
            <div className="col-4 " style={{marginTop:"1rem"}}>
              <Insights />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default DashboardA;
