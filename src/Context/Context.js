import React, { useState, createContext } from "react";

export const UserContext = createContext();
const Context = (props) => {
  const [score, setScore] = useState(12);
  return (
    <>
      <UserContext.Provider value={{ score, setScore }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default Context;
