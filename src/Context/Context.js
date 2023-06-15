import React, { useState, createContext } from "react";

export const UserContext = createContext();
const Context = (props) => {
  const [score, setScore] = useState(-1);
  const [idea, setIdea] = useState([]);
  const [project, setProject] = useState([]);
  // const [levelarray, setLevelArray] = useState(false);

  return (
    <>
      <UserContext.Provider
        value={{ score, setScore, idea, setIdea, project, setProject }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default Context;
