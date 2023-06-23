import React from "react";
import { Link } from "react-router-dom";
import  {useState}  from "react";

const CardWithLinks = () => {
  const [activeLink, setActiveLink] = useState(1);

  const handleLinkClick = (linkNumber) => {
    setActiveLink(linkNumber);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <Link
              to="/link1"
              className={`card-link ${activeLink === 1 ? "active" : ""}`}
              onClick={() => handleLinkClick(1)}
            >
              Link 1
            </Link>
          </div>
          <div className="col">
            <Link
              to="/link2"
              className={`card-link ${activeLink === 2 ? "active" : ""}`}
              onClick={() => handleLinkClick(2)}
            >
              Link 2
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithLinks;
