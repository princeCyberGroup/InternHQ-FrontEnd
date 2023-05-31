import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthGuard = () => {
  const navigate = useNavigate();
  const location =useLocation();
  console.log(location)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuth = () => {
    if (localStorage.getItem("login")) {
      if (localStorage.getItem("login") === "true") {
        navigate(location.pathname)
        setIsAuthenticated(true);
        // navigate({
        //     pathname:path
        // });
        // console.log("first", isAuthenticated);
        // return true;
      } else {
        navigate("/");

        setIsAuthenticated(false);
        // console.log("2first", isAuthenticated);
        // return false;
      }
    } else {
      navigate("/");

      //   console.log("3first", isAuthenticated);
      setIsAuthenticated(false);

      // return false;
    }
  };
  useEffect(() => {
    handleAuth();
    // const storedAuth = localStorage.getItem("login") == "true" ? true : false;
    // storedAuth = localStorage.getItem("login") == "false" ? false : true;
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet/> : <Navigate to="/"/>;
};

export default AuthGuard;
