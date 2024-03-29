import "../Dashboard/DashboardA.css";
import Uploadcsv from "./UploadCsv/Uploadcsv";
import ManageSkillSet from "./ManageSkillSet/manageSkillSet";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Status from "./Status/Status";
// import TopTech from "./TopTech/topTech";
import PieChartTopTech from "./TopTech/PieChartTopTech";
import AssociateConsultant from "./associateConsultant/associateConsultant";
import Insights from "./Insights/insights";
import { ReactComponent as Right } from "../../../Assets/right.svg";
import Header from "../../Header/Header";
import CryptoJS from "crypto-js";
import AssignReviewer from "./AssignReviewer/AssignReviewer";
import TodaySession from "./TodaySession/TodaySession";

const DashboardA = () => {
  const [StatusData, setStatusData] = useState([]);
  // const [insights, setInsights] = useState([]);
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  const navigate = useNavigate();
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
        process.env.REACT_APP_API_URL + `/api/v3/getDashboardStatus`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      if (response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (response.status === 404) {
        navigate("/error/statusCode=404");
      }
      const rsp = await response.json();
      console.log(rsp, "This is dashboard statuis")
      setStatusData(rsp);
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
      console.log("this is error", error);
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
            <div className="about"></div>
              <div className="row div-staus-upload">
                <div className="col-6 outer-row-info">
                  <Status data={StatusData} />
                </div>
                <div className="col-6">
                  <AssignReviewer />
                </div>
              </div>
              <ManageSkillSet data={StatusData} />
              <div className="row manage-total-test d-flex">
                <div className="col-6"style={{ padding: 0 }}>
                  <PieChartTopTech />
                </div>
                <div className="col-6 associate-div " style={{ padding: 0 }}>
                  <AssociateConsultant />
                </div>
              </div>
            </div>
            {/* //insights */}
            <div className="col-4 " 
            // style={{marginTop:"1rem"}}
            >
            <div className="about"></div>
              <TodaySession/>
              <Insights />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default DashboardA;
