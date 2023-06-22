import React, {useContext} from 'react'
import Card from 'react-bootstrap/Card';
import '../Dashboard/DashboardA.css';
import HeaderAdmin from '../Header/HeaderAdmin'
import { Button } from 'bootstrap';
import Uploadcsv from './UploadCsv/Uploadcsv';
import ManageSkillSet from './ManageSkillSet/manageSkillSet';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Status from './Status/Status';
import TopTech from './TopTech/topTech';
import AssociateConsultant from './associateConsultant/associateConsultant';
import Insights from './Insights/insights';
import { ReactComponent as Right } from "./Assets/right.svg";
import Header from '../../Header/Header';


const DashboardA = () => {
  const [StatusData, setStatusData] = useState([]);
  const [acData, setAcData] = useState([]);
  const [insights , setInsights] = useState([]);
  useEffect(() => {
    fetchData();
    InsightData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://cg-interns-hq.azurewebsites.net/getDashboardStatus`);
      const rsp = await response.json();
      setStatusData(rsp)
      setAcData(rsp.response);
    } catch (e) {
      console.log(e);
    }
  };
  const InsightData = async () => {
    try {
      const response = await fetch(`https://cg-interns-hq.azurewebsites.net/getInsights`);
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
          <div className='row'>
            {/* style={{maxWidth : "1280px"}} */}
            <div className='col-8'style={{marginLeft: "0px"}}>
              <div className='about'>Manage Consultant <Right style={{marginBottom:"2px"}} /></div>

              <div className='row div-card-upload'>
                <div className='col-8 outer-row-info'>
                  <Status data={StatusData} />
                </div>
                <div className='col-4 upload-list'>
                  <Uploadcsv />
                </div>
              </div>
              <ManageSkillSet data={StatusData} />
              <div className='row main-div d-flex'>
                <div className='col-3' >
                  <TopTech />
                </div>
                <div className='col-3 associate-div'>
                  <AssociateConsultant data={acData} />
                </div>
              </div>
            </div>
            {/* //insights */}
            <Insights data={insights}/>

          </div>
          </>
        </div>







      </>
      );
}

      export default DashboardA

