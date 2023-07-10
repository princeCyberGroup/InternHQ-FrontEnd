import "../associateConsultant/associateConsultant.css";
import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";
import { ReactComponent as DownArroww } from "../../../../Assets/down-scroll.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-up.svg";
import { ReactComponent as GoldStarOri } from "../../../../Assets/Star-Icon-gold-ori.svg";
import { ReactComponent as SilverStarOri } from "../../../../Assets/Star-Icon-silver-ori.svg";
import { ReactComponent as BronzeStarOri } from "../../../../Assets/Star-Icon-bronze-ori.svg";
import { useNavigate } from "react-router-dom";

function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase());
  return initials.join("");
}
export default function AssociateConsultant(props) {
  const navigate = useNavigate();
  const handleOnclick = (id) => {
    sessionStorage.setItem("detailId", id);
    sessionStorage.setItem("chrumValue", "Dashboard");
    navigate(`/admin/report?userId=${id}`);
  };
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [originalTests, setOriginalTests] = useState(props.data);
  const [showAllTech, setShowAllTech] = useState(false);
  const [expandedMentor, setExpandedMentor] = useState(null);
  const handleFiltersChange = () => {
    const getFilterItems = (items, searchValue) => {
      if (searchValue) {
        let fitlerData = items.filter((item) =>
          item.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
        return fitlerData;
      }
      return items;
    };
    const filters = getFilterItems(props.data, searchFilterValue);
    setOriginalTests(filters);
  };
  useEffect(() => {
    handleFiltersChange();
    // handleExpand();
  }, [searchFilterValue]);

  const handleExpand = (intId) => {
    if (expandedMentor === intId) {
      setExpandedMentor(null);
    } else {
      setExpandedMentor(intId);
    }
  };
  const renderStars = (level) => {
    if (level === "Beginner") {
      return <BronzeStarOri />;
    } else if (level === "Intermediate") {
      return <SilverStarOri />;
    } else if (level === "Advance") {
      return <GoldStarOri />;
    } else {
      return null;
    }
  };

  function renderAssociates(userData) {
    const initials = getInitials(userData.name);
    return (
      <>
        <div
          key={userData.intId}
          className="card associate-consultant-mapped-card"
        >
          <div className=" row mentor-wrapper">
            <div
              onClick={() => {
                handleOnclick(userData.userId);
              }}
              className="col-4 frame pointer"
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "0.938rem",
                }}
              >
                {initials}
              </p>
            </div>
            <div
              onClick={() => {
                handleOnclick(userData.userId);
              }}
              className=" col-4 pointer"
            >
              <div className="frame-text">{userData.name}</div>
              <div className="frame-id">{userData.intId}</div>
            </div>
            <div className=" col-4">
              <span
                style={{ marginLeft: "10.5rem", cursor: "pointer" }}
                onClick={() => handleExpand(userData.intId)}
                className="expand-arrow"
              >
                {expandedMentor === userData?.intId ? (
                  <UpArrow />
                ) : (
                  <DownArroww />
                )}
              </span>
            </div>
          </div>
          {expandedMentor === userData?.intId && (
            <div className="row mt-3">
              <div className="technology">
                <p className="tech">Technology:</p>

                {userData &&
                  userData.techNames &&
                  userData.techNames.slice(0, 4).map(
                    (skill, skillIndex) =>
                      skill && (
                        <span key={skillIndex} className="tech-div-badge">
                          {skill.toUpperCase()}
                          &nbsp;
                          {renderStars(userData.level[skillIndex])}
                        </span>
                      )
                  )}
                {userData &&
                  userData.techNames &&
                  userData.techNames.length > 4 && (
                    <div className="all-tech">
                      {showAllTech ? (
                        userData.techNames.slice(4).map(
                          (skill, skillIndex) =>
                            skill && (
                              <span key={skillIndex} className="tech-div-badge">
                                {skill.toUpperCase()}
                                &nbsp;
                                {renderStars(userData.level[skillIndex + 4])}
                              </span>
                            )
                        )
                      ) : (
                        <button
                          className="more-tech-stacks"
                          onClick={() => setShowAllTech(true)}
                        >
                          + {userData.techNames.length - 4}
                        </button>
                      )}
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="about-associate" style={{ marginLeft: "0.938rem" }}>
          Associate Consultant
        </div>

        <div className="associate-card">
          <div className="d-flex align-items-center ps-3 associate-search-wrapper">
            <SearchIcon />
            <input
              className="search-associate "
              type="text"
              value={searchFilterValue}
              placeholder="Search"
              onChange={(event) => {
                event.preventDefault();
                setSearchFilterValue(event.target.value);
              }}
            />
          </div>
          <div style={{ overflow: "auto" }}>
            {originalTests?.length === 0
              ? props.data?.map((userData) => renderAssociates(userData))
              : originalTests?.map((userData) => renderAssociates(userData))}
          </div>
        </div>
      </div>
    </>
  );
}
