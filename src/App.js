import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import LoginScreen from "./components/Accounts/Login/LoginScreen";
import SignUpScreen from "./components/Accounts/SignUp/SignUpScreen";
import RegistrationSuccessfulScreen from "./components/Accounts/SignUp/RegistrationSuccessfulScreen";
import SignUpOtpScreen from "./components/Accounts/Otp/SignUpOtpScreen";
import ForgotPasswordScreen from "./components/Accounts/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordOtpScreen from "./components/Accounts/Otp/ForgotPasswordOtpScreen";
import CreateNewPasswordScreen from "./components/Accounts/ForgotPassword/CreateNewPasswordScreen";
import PasswordChangedScreen from "./components/Accounts/ForgotPassword/PasswordChangedSuccessfulScreen";
import { ViewAll } from "./components/Dashboard/ProjectIdea/ViewAllComponent/ViewAll";
import AuthGuard from "./components/AuthGuard";
import TakeYourTest from "./components/TakeYourTest/TakeYourTest";
import DailyUpdateTable from "./components/DailyUpdateTable/DailyUpdateTable";
import SkillManagement from "./components/SkillManagement/SkillManagement";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/dashboard"  element={<Dashboard/>}  />
            <Route path="/daily-Update" element={<DailyUpdateTable />} />
            <Route path="/all-projects" element={<ViewAll/>} />
            <Route path="/skill-Management" element={< SkillManagement/>} />
            <Route path="/varun" element={<TakeYourTest/>}/>
          </Route>
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
          <Route path="*" element={<h1>Hello WRONg</h1>} />

          {/* </div> */}
        </Routes>
      </Router>
      {/* <TakeYourTest/> */}
    </div>
  );
}

export default App;
