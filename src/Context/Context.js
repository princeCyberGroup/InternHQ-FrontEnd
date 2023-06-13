import React, { useState, createContext } from "react";

export const UserContext = createContext();
// export const AdminContext = createContext();
const Context = (props) => {
  const [score, setScore] = useState(0);
  return (
    <>
      <UserContext.Provider value={{ score, setScore }}>
        {props.children}
      </UserContext.Provider>
      {/* <AdminContext.Provider value={{ score, setScore }}>
        {props.children}
      </AdminContext.Provider> */}
    </>
  );
};

export default Context;
