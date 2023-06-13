import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import BadRequest from "./components/ErrorPage/BadRequest";
import Context from "./Context/Context";
function App() {
  const location = useLocation();
  const navigate = useNavigate();

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
  // console.log(dataFromDailyUpdate, "This is data from daily update")

  // // Example usage
  // const timeString = '2 hrs 00 min';
  // const result = convertTimeStringToNumber(timeString);
  // console.log(result, "This is result"); // Output: 1.5

  return (
    <Context>
      <div className="App">
        {/* <Router> */}
        <Routes>
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
          {/* Protected Routes here */}
          <Route element={<AuthGuard />}>
            {/* <div> */}
              <Route
                path="/dashboard"
                element={
                  <Dashboard sendDataToDashboard={dataFromDailyUpdate} />
                }
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
              <Route path="/project-idea-projects" element={<ViewAllIdeas />} />
              <Route path="/skill-management" element={<SkillManagement />} />
              <Route exact path="/take-test" component={<TakeTest />} />
              <Route path="/take-your-test" element={<TakeYourTest />} />
            {/* </div> */}
          </Route>
          <Route path="*" element={<BadRequest />} />
        </Routes>
      </div>
    </Context>
  );
}

export default App;
