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
import TakeYourTest from "./components/TakeYourTest/TakeYourTest";
import DailyUpdateTable from "./components/DailyUpdateTable/DailyUpdateTable";
import SkillManagement from "./components/SkillManagement/SkillManagement";
import TakeTest from "./components/SkillManagement/TakeTest/TakeTest";
function App() {
  return (
    <div className="App">
      <Router>
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
          {/* <div> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily-Update" element={<DailyUpdateTable />} />
            <Route path="/skill-Management" element={< SkillManagement/>} />
            <Route exact path="/TakeTest" component={<TakeTest />} />
            <Route path="/take-your-test/:examId" element={<TakeYourTest/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-projects" element={<ViewAll />} />
          {/* </div> */}
        </Routes>
      </Router>
      {/* <TakeYourTest/> */}
    </div>
  );
}

export default App;
