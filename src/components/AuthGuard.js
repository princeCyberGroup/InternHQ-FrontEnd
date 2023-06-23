import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthGuard = () => {
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
        console.log("this is user auth", str);
        str === "07495d" ? navigate(location.pathname) : (str === "cb8715" ? navigate("/admin/dashboard") : navigate("/mentor/dashboard"));
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

export default AuthGuard;
