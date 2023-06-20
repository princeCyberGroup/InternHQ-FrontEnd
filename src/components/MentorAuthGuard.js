import React, { useEffect, useState, useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";

const MentorAuthGuard = () => {
    const { navigateTo } = useContext(UserContext);
    console.log("this is the value of navigateto", navigateTo);
    const navigate = useNavigate();
    const location = useLocation();
    console.log("this is the value of location", location);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleAuth = () => {
      if (localStorage.getItem("login")) {
        if (localStorage.getItem("login") === "false") {
        //   setNavigateTo("");
          navigate("/");
          setIsAuthenticated(false);
        } else {
          // setNavigateTo("u");
          console.log("navigateTo value in mentor auth", navigateTo);
          navigate(location.pathname);
          setIsAuthenticated(true);
        } 
      } else {
        // setNavigateTo("");
        navigate("/");
        setIsAuthenticated(false);
      }
    };
    useEffect(() => {
      handleAuth();
    }, [isAuthenticated]);
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default MentorAuthGuard;
