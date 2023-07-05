import React, { useState, useEffect } from "react";
import axios from "axios";

const TechDropDownUser = (props) => {
  const [allTech, setAllTech] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    axios
      .get("https://cg-interns-hq.azurewebsites.net/getAllTechnology")
      .then((response) => {
        const sortedTech = response.data.response.sort((a, b) => {
          const nameA = a.techName.toUpperCase();
          const nameB = b.techName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setAllTech(sortedTech);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      const newTechNames = { ...props.techNames, [`tech${counter}`]: value };
      props.seTechNames(newTechNames);
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      const updatedTechNames = { ...props.techNames };
      for (const key in updatedTechNames) {
        if (updatedTechNames[key] === value) {
          delete updatedTechNames[key];
          break;
        }
      }
      props.seTechNames(updatedTechNames);
      setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" type="button" data-toggle="dropdown">
        
      </button>
      <div className="dropdown-menu">
        {allTech.map((tech) => (
          <div key={tech.techId} className="dropdown-item">
            <label>
              <input
                type="checkbox"
                value={tech.techName}
                onChange={handleCheckboxChange}
              />
              {tech.techName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
}
export default TechDropDownUser;
