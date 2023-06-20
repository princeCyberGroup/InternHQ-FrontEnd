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
import { UserContext } from '../../../Context/Context';

const DashboardA = () => {
  const { navigateTo} = useContext(UserContext);
  console.log("this is the value of navigateTo in admin", navigateTo);
  const [StatusData, setStatusData] = useState([]);
  const [acData, setAcData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://cg-interns-hq.azurewebsites.net/getDashboardStatus`);
      const rsp = await response.json();
      setStatusData(rsp)
      setAcData(rsp.response);
      // console.log(rsp.response);
      // console.log("data:",rsp.da);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <HeaderAdmin />
      <div className="responsiveness">
        <>
          <div className='row'>
            {/* style={{maxWidth : "1280px"}} */}
            <div className='col-8'>
              <div className='about'>Manage Consultant</div>

              <div className='row div-card-upload'>
                <div className='col-8 outer-row-info'>
                  <Status data={StatusData} />
                </div>
                <div className='col-4 upload-list'>
                  <Uploadcsv />
                </div>
              </div>
              <ManageSkillSet data={StatusData} />
              <div className='main-div d-flex '>
                <div className='col-3' >
                  <TopTech />
                </div>
                <div className='col-3 associate-div'>
                  <AssociateConsultant data={acData} />
                </div>
              </div>
            </div>
            {/* //insights */}
            <Insights />

          </div>
          </>
        </div>







      </>
      );
}

      export default DashboardA

