import React, { useEffect, useState, useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const MentorAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const secretKey = process.env.REACT_APP_USER_KEY;
  const data = localStorage.getItem("userData");
  let decryptedObject;
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    decryptedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }
  const str = decryptedObject?.randomString;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuth = () => {
    if (localStorage.getItem("login")) {
      if (localStorage.getItem("login") === "false") {
        navigate("/");
        setIsAuthenticated(false);
      } else {
        str === "07495d"
          ? navigate("/dashboard")
          : str === "cb8715"
          ? navigate("/admin/dashboard")
          : navigate(location.pathname);
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
