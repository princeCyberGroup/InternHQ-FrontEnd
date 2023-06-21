import React, { useEffect, useState, useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";

const MentorAuthGuard = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const str = JSON.parse(localStorage.getItem("userData")).randomString;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuth = () => {
    if (localStorage.getItem("login")) {
      if (localStorage.getItem("login") === "false") {
        navigate("/");
        setIsAuthenticated(false);
      } else {
        str === "07495d" ? navigate("/dashboard") : (str === "cb8715" ? navigate("/admin/dashboard") : navigate(location.pathname));
        setIsAuthenticated(true);
      } 
    } else {
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
