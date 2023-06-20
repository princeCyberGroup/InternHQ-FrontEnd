import './App.css';
import { AddMentor } from "./components/Dashboard/AddMentor";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import  {AddNewTask}  from "./components/Modals/AddNewTask";
import { AddNewSkillTest } from "./components/Modals/AddNewSkillTest";
import { ManageSkillTest } from "./components/Modals/ManageSkillTest";
import {UploadCsv} from "./components/Modals/UploadCsv";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <AddNewTask/>
      <AddNewSkillTest/>
      <UploadCsv/>
        <Routes>
          <Route path="/" element={<AddMentor/>}/>
         <Route path="/manage-skill-test" element={<ManageSkillTest/>}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
