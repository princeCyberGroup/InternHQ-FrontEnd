import "../associateConsultant/associateConsultant.css";
import React, { useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../../../../Assets/chevron-down.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-up.svg";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";
import { ReactComponent as Advance } from "../../../../Assets/advance.svg";
import { ReactComponent as Beginner } from "../../../../Assets/beginner.svg";
import { ReactComponent as Intermediate } from "../../../../Assets/intermediate.svg";
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
    navigate(`/admin/report?userId=${id}`);
  };
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [originalTests, setOriginalTests] = useState(props.data);
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
                handleOnclick(userData.intId);
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
                style={{ marginLeft: "9.375rem", cursor: "pointer" }}
                onClick={() => handleExpand(userData.intId)}
                className="expand-arrow"
              >
                {expandedMentor === userData.intId ? (
                  <UpArrow />
                ) : (
                  <DownArrow />
                )}
              </span>
            </div>
          </div>
          {expandedMentor === userData.intId && (
            <div className="row mt-3">
              <div className="technology">
                <p className="tech">Technology:</p>
                {/* {userData &&
                  userData.techNames &&
                  userData.techNames.map((skill, skillIndex) => (
                    <span key={skillIndex} className="tech-badge">
                      {skill && skill.toUpperCase()}
                    </span>
                  ))} */}
                   <div className="tech-tags">
                      {userData?.techNames?.slice(0, 4).map((value, index) => {
                        return value === null ? (
                          <div key={index}></div>
                        ) : (
                          <div
                            key={index}
                            className="tag-tech d-flex justify-content-center align-items-center"
                          >
                            <span>{value}</span>
                            <div>
                              {value === "Beginner" ? (
                                <Beginner />
                              ) : value === "Intermediate" ? (
                                <Intermediate />
                              ) : (
                                <Advance />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {userData?.techNames?.slice(4).length!==0 && (
                        <div className="all-tech">
                          <span>+ {userData?.techNames?.slice(4).length}</span>
                        </div>
                      )}
                    </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          marginLeft: "12.125rem",
        }}
      >
        <div className="about-associate" style={{ marginLeft: "0.938rem" }}>
          Associate Consultant
        </div>

        <div
          ///change here
          className=" associate-card  "
          style={{ maxHeight: "23.125", overflow: "auto" }}
        >
          <div className="d-flex align-items-center ps-1 insights-search-wrapper">
            <SearchIcon />
            <input
              className="search-associate border-none"
              type="text"
              value={searchFilterValue}
              placeholder="Search"
              onChange={(event) => {
                event.preventDefault();
                setSearchFilterValue(event.target.value);
              }}
            />
          </div>
          {originalTests?.length === 0
            ? props.data?.map((userData) => renderAssociates(userData))
            : originalTests?.map((userData) => renderAssociates(userData))}
        </div>
      </div>
    </>
  );
}
