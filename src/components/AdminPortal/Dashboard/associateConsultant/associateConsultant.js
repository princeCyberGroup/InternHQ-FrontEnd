import "../associateConsultant/associateConsultant.css";
import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";
import { ReactComponent as DownArroww } from "../../../../Assets/down-scroll.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-up.svg";
import { ReactComponent as GoldStarOri } from "../../../../Assets/Star-Icon-gold-ori.svg";
import { ReactComponent as SilverStarOri } from "../../../../Assets/Star-Icon-silver-ori.svg";
import { ReactComponent as BronzeStarOri } from "../../../../Assets/Star-Icon-bronze-ori.svg";
import { useNavigate } from "react-router-dom";
import AssociateConsultantSkeleton from "./associateConsultantSkeleton";
import CryptoJS from "crypto-js";

function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase());
  return initials.join("");
}
export default function AssociateConsultant() {
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  const navigate = useNavigate();
  const handleOnclick = (id) => {
    sessionStorage.setItem("detailId", id);
    sessionStorage.setItem("chrumValue", "Dashboard");
    navigate(`/admin/report/detail`);
  };
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [acData, setAcData] = useState([]);
  const [originalTests, setOriginalTests] = useState([]);
  const [showAllTech, setShowAllTech] = useState(false);
  const [expandedMentor, setExpandedMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleFiltersChange = () => {
    const getFilterItems = (items, searchValue) => {
      if (searchValue) {
        let fitlerData = items.filter((item) =>
          item.name?.toLowerCase().startsWith(searchValue.toLowerCase())
        );
        return fitlerData;
      }
      return items;
    };
    const filters = getFilterItems(originalTests, searchFilterValue);
    setAcData(filters);
  };
  useEffect(() => {
    handleFiltersChange();
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

  var parsedObject;
  const data = localStorage.getItem("userData");
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }

  useEffect(() => {
    setTimeout(() => {
      fetchAc();
      setIsLoading(false);
    }, 1000);
  }, [])
  
  const fetchAc = async  () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/v3/get-dashboard-consultant`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      if (response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (response.status === 404) {
        navigate("/error/statusCode=404");
      }
      const data = await response.json();
      setAcData(data.response);
      setOriginalTests(data.response);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (error.response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (error.response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (error.response.status === 404) {
        navigate("/error/statusCode=404");
      }
      console.log("this is error", error);
    }
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
            {isLoading ? 
            <>
            <AssociateConsultantSkeleton />
            <AssociateConsultantSkeleton />
            <AssociateConsultantSkeleton />
            <AssociateConsultantSkeleton />
            <AssociateConsultantSkeleton />
            <AssociateConsultantSkeleton />
            <AssociateConsultantSkeleton />
          </>
            : acData.map((userData) => {
              const initials = getInitials(userData.name);
              return (
                <>
                  <div
                    key={userData.intId}
                    className="card associate-consultant-mapped-card"
                  >
                    <div className="row" style={{width: "24.875rem"}}>
                      <div
                        onClick={() => {
                          handleOnclick(userData.userId);
                        }}
                        className="frame"
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
                        className=" col-4"
                        style={{width: "22rem"}}
                      >
                        <div className="frame-text">{userData.name}</div>
                        <div className="frame-id">{userData.intId}</div>
                      </div>
                      <span
                          style={{cursor: "pointer", position: "absolute", left: "22.5rem", top: "0.8rem", width: "auto" }}
                          onClick={() => handleExpand(userData.intId)}
                          className="expand-arrow p-0"
                        >
                          {expandedMentor === userData?.intId ? (
                            <UpArrow />
                          ) : (
                            <DownArroww />
                          )}
                        </span>
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
           })}
          </div>
        </div>
      </div>
    </>
  );
}
