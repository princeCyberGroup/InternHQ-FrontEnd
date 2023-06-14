import React, { useState, createContext } from "react";

export const UserContext = createContext();
const Context = (props) => {
  const [score, setScore] = useState(0);
  const [idea, setIdea] = useState([]);
  const [project, setProject] = useState([])
  return (
    <>
      <UserContext.Provider value={{ score, setScore ,idea,setIdea,project,setProject}}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default Context;
