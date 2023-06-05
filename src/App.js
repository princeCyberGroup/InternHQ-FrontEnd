import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
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
import ErrorPage from "./components/ErrorPage/ErrorPage";
// import CustomRoute from "./components/CustomRoute";
import TakeTest from "./components/SkillManagement/TakeTest/TakeTest";
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

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthGuard />}> 
            <Route path="/dashboard"  element={<Dashboard/>}  />
            <Route path="/daily-Update" element={<DailyUpdateTable />} />
            <Route path="/all-projects" element={<ViewAll/>} />
            <Route path="/skill-Management" element={< SkillManagement/>} />
             <Route exact path="/TakeTest" component={<TakeTest />} />
            <Route path="/take-your-test/:examId" element={<TakeYourTest/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-projects" element={<ViewAll />} />
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
        </Routes>
      </Router>
      {/* <Router> */}
      <Routes>
        {/* <Route path={encodeUrl("/dashboard")} element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route element={<AuthGuard />}> */}

        <Route path="/daily-update" element={<DailyUpdateTable />} />
        {/* <Route path={encodeUrl("/all-projects")} element={<ViewAll />} /> */}
        <Route path="/skill-management" element={<SkillManagement />} />
        <Route path="/take-test" element={<TakeYourTest />} />
        {/* </Route> */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
        <Route path="/sign-up-verification" element={<SignUpOtpScreen />} />
        <Route path="/success" element={<RegistrationSuccessfulScreen />} />
        <Route
          path="/email-verification"
          element={<ForgotPasswordOtpScreen />}
        />
        <Route path="/change-password" element={<CreateNewPasswordScreen />} />
        <Route path="/change-success" element={<PasswordChangedScreen />} />
        <Route path="*" element={<ErrorPage />} />

        {/* </div> */}
      </Routes>
      {/* </Router> */}
      {/* <TakeYourTest/> */}
    </div>
  );
}

export default App;
