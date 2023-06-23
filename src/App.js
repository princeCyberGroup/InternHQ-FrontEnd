import React, { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import LoginScreen from "./components/Accounts/Login/LoginScreen";
import SignUpScreen from "./components/Accounts/SignUp/SignUpScreen";
import RegistrationSuccessfulScreen from "./components/Accounts/SignUp/RegistrationSuccessfulScreen";
import SignUpOtpScreen from "./components/Accounts/Otp/SignUpOtpScreen";
import ForgotPasswordScreen from "./components/Accounts/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordOtpScreen from "./components/Accounts/Otp/ForgotPasswordOtpScreen";
import CreateNewPasswordScreen from "./components/Accounts/ForgotPassword/CreateNewPasswordScreen";
import PasswordChangedScreen from "./components/Accounts/ForgotPassword/PasswordChangedSuccessfulScreen";

import Dashboard from "./components/UserPortal/Dashboard/Dashboard";
import ViewAllProjects from "./components/UserPortal/Dashboard/ProjectIdea/Project/ViewAllProject/ViewAllProjects";
import AuthGuard from "./components/AuthGuard";
import TakeYourTest from "./components/UserPortal/SkillManagement/TakeYourTest/TakeYourTest";
import DailyUpdateTable from "./components/UserPortal/DailyUpdateTable/DailyUpdateTable";
import SkillManagement from "./components/UserPortal/SkillManagement/SkillManagement";
import ViewAllIdeas from "./components/UserPortal/Dashboard/ProjectIdea/Idea/ViewAllIdea/ViewAllIdeas";
import TakeTest from "./components/UserPortal/SkillManagement/TakeTest/TakeTest";
import Context from "./Context/Context";

// admin import
import Report from "./components/AdminPortal/Report/Report";
import Task from "./components/AdminPortal/Task/Task";
import DashboardA from "./components/AdminPortal/Dashboard/DashboardA";
import Detailedreport from "./components/AdminPortal/Report/Detailedreport/Detailedreport";
import MentorDashboard from "./components/MentorPortal/MentorDashboard";
import AdminAuthGuard from "./components/AdminAuthGuard";
import MentorAuthGuard from "./components/MentorAuthGuard";
import Error_400 from "./components/ErrorPage/Error_400";
import Error_500 from "./components/ErrorPage/Error_500";
import Error_404 from "./components/ErrorPage/Error_404";
import  PieChart  from "./components/AdminPortal/Report/Detailedreport/PieChart";
import { ManageSkillTest } from "./components/AdminPortal/SkillTest/ManageSkillTest";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  // const encodeUrl = (url) => {
  //   const encodeUrlFromBase = {
  //     0: "L2Rhc2hib2FyZA==",
  //     1: "L2RhaWx5LVVwZGF0ZQ==",
  //     2: "L2FsbC1wcm9qZWN0cw==",
  //     3: "L3NraWxsLU1hbmFnZW1lbnQ=",
  //     4: "L3ZhcnVu",
  //   };
  //   const encode= location.pathname;
  //   if (!encode.includes("/L3") || !encode.includes("/L2") ) {
  //     switch (encode) {
  //       case "/dashboard":
  //         console.log(encode);

  //         <Link to="/L2Rhc2hib2FyZA==" />
  //         // console.log(n)
  //         break;

  //       case "/daily-Update":
  //         navigate(`${encodeUrlFromBase[1]}`)
  //         break;

  //       case "/all-projects":
  //         navigate(`${encodeUrlFromBase[2]}`);
  //         break;

  //       case "/skill-Management":
  //         navigate(`${encodeUrlFromBase[3]}`);
  //         break;

  //       case "/varun":
  //         navigate(`${encodeUrlFromBase[4]}`);
  //         break;

  //       default: navigate("*")
  //     }
  //   }
  //   // console.log("location: ",encode);

  //   const encodeUrl = btoa(url);
  //   return encodeUrl;
  // };

  // const decodeUrl = (encodedUrl) => {
  //   const decodedUrl = decodeURIComponent(encodedUrl);
  //   // console.log(atob(decodedUrl), "decoded");
  //   return atob(decodedUrl);
  // };
  const [dataFromDailyUpdate, setDataFromDailyUpdate] = useState("");
  const handleDataFromDailyUpdate = (data) => {
    setDataFromDailyUpdate(data);
  };
  return (
    <Context>
      <div className="App">
        {/* <Router> */}
        <Routes>
          <Route path="/piechart" element={<PieChart />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
          <Route path="/sign-up-verification" element={<SignUpOtpScreen />} />
          <Route path="/success" element={<RegistrationSuccessfulScreen />} />
          <Route
            path="/email-verification"
            element={<ForgotPasswordOtpScreen />}
          />
          <Route
            path="/change-password"
            element={<CreateNewPasswordScreen />}
          />
          <Route path="/change-success" element={<PasswordChangedScreen />} />
          {/* <Route path={encodeUrl("/dashboard")} element={<Dashboard />} /> */}

          {/* User Protected Routes here */}
          <Route element={<AuthGuard />}>
            <Route
              path="/dashboard"
              element={<Dashboard sendDataToDashboard={dataFromDailyUpdate} />}
            />
            <Route
              path="/daily-update"
              element={
                <DailyUpdateTable
                  sendDataToDailyUpdate={handleDataFromDailyUpdate}
                />
              }
            />
            <Route path="/all-projects" element={<ViewAllProjects />} />
            <Route path="/project-idea" element={<ViewAllIdeas />} />
            <Route path="/skill-management" element={<SkillManagement />} />
            <Route exact path="/take-test" component={<TakeTest />} />
            <Route path="/take-your-test" element={<TakeYourTest />} />
            <Route path="/project-idea-projects" element={<ViewAllIdeas />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminAuthGuard />}>
            <Route path="/admin/dashboard" element={<DashboardA />} />
            <Route path="/admin/reports" element={<Report />} />
            <Route path="/admin/report" element={<Detailedreport />} />
            <Route path="/admin/assign-task" element={<Task />} />
            <Route path="/admin/skill-test" element={<ManageSkillTest />} />

          </Route>

          {/* Mentor routes */}
          <Route element={<MentorAuthGuard />}>
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          </Route>

          <Route path="/error?statusCode=400" element={<Error_400 />} />
          <Route path="/error?statusCode=500" element={<Error_500 />} />
          <Route path="*" element={<Error_404 />} />
        </Routes>
        {/* </Router> */}
      </div>
    </Context>
  );
}

export default App;
