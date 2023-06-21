import { useState } from "react";
import "./Modals.css"
// import {ReactComponent as DeleteStroke} from "../../../..//Assets/Delete.svg";
// import {AddNewSkillTest} from "./AddNewSkillTest";
// import {ReactComponent as vectorAdd} from "../../../../Assets/Vectoradd.svg";



export const ManageSkillTest = () =>{
    const [data, setData] = useState([
        {
          id: 1,
          technology: 'React',
          level: 'Intermediate',
          uploadedQuestions: 10,
          uploadedOn: '2023/06/14 11:00 AM',
        },
        {
          id: 2,
          technology: 'JavaScript',
          level: 'Beginner',
          uploadedQuestions: 5,
          uploadedOn: '2023/06/15 11:00 AM',
        },
      ]);
    
      const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
      };
      const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };
    
      return (
        <div className="container-fluid manage-skill-test-container d-flex flex-column">
        <div className=" ">
          <div className="row ">
            <div className="col-12">
              <div className="manage-skill-test-nav-bar d-flex">
                <p>Dashboard &gt; Manage Skill Test</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="manage-skill-test-heading d-flex justify-content-between mb-0">
                <div>
                <p>Manage Skill Set</p>
                </div>
                {/* <div>
                  <button type="button" className="add-new-skill-test-button mb-4" data-bs-toggle="modal" data-bs-target="#newSkillModal" onClick={handleClick}>
                    <vectorAdd />
                    Add New Skill Test
                  </button>
                  {showComponent && <AddNewSkillTest />}
                 
                </div> */}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="col-12 manage-skill-table-style p-0">
              <div className="table-responsive" style={{overflow: "visible"}}></div>
        <table id="example" className="table table-striped">
          <thead>
            <tr className="color-table">
              <th className="column-technology">Technology</th>
              <th className="levels-colums">Level</th>
              <th className="column-questions">Uploaded Questions</th>
              <th className="column-uploaded-on">Uploaded On</th>
              <th className="column-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item?.id}>
                <td className="technology-rows">{item?.technology}</td>
                <td className="levels-row">{item?.level}</td>
                <td className="questions-row">{item?.uploadedQuestions}</td>
                <td className="uploaded-on-row">{item?.uploadedOn}</td>
                <td>
                  {/* <button type="button" style={{"border":"none", "background":"none"}} onClick={() => handleDelete(item.id)}><DeleteStroke/></button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        
      );
    };