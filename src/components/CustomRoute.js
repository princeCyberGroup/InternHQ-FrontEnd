// import React from "react";
// import { Route, useLocation, Navigate } from "react-router-dom";

// const CustomRoute = ({ path, element }) => {
//   const location = useLocation();
//   // Check if the current URL is the encoded version of the specified path
//   const encodedPath = encodeURIComponent(path);

//   if(location.pathname === `/${encodedPath}`) {
//     return <Navigate to={path} replace/>;
//   }
// //   const isEncodedPath = location.pathname === `/${encodedPath}`;

//   // If the URL is the encoded version, navigate to the actual path

//   return <Route path={path} element={<element />} />;
// };

// export default CustomRoute;
