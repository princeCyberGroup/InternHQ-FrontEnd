import "../associateConsultant/associateConsultant.css";
import React, { useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../../../../Assets/chevron-down.svg";
import { ReactComponent as UpArrow } from "../../../../Assets/chevron-up.svg";
import { useNavigate } from "react-router-dom";

function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase());
  return initials.join("");
}
export default function AssociateConsultant(props) {
  const navigate = useNavigate();
  const handleOnclick = (index) => {
    navigate(`/admin/report?userId=${33}`);
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
                  marginTop: "15px",
                }}
              >
                {initials}
              </p>
            </div>
            <div
              onClick={() => {
                handleOnclick(userData.intId);
              }}
              className=" col-4 pointer"
            >
              <div className="frame-text">{userData.name}</div>
              <div className="frame-id">{userData.intId}</div>
            </div>
            <div className=" col-4">
              <span
                style={{ marginLeft: "150px", cursor: "pointer" }}
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
                {userData &&
                  userData.techNames &&
                  userData.techNames.map((skill, skillIndex) => (
                    <span key={skillIndex} className="tech-badge">
                      {skill && skill.toUpperCase()}
                    </span>
                  ))}
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
          marginLeft: "194px",
        }}
      >
        <div className="about-associate" style={{ marginLeft: "15px" }}>
          Associate Consultant
        </div>

        <div
          className=" associate-card  "
          style={{ maxHeight: "370px", overflow: "auto" }}
        >
          <div>
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
          {props.data && props.data.map((userData) => {})}
          {originalTests?.length === 0
            ? props.data?.map((userData) => renderAssociates(userData))
            : originalTests?.map((userData) => renderAssociates(userData))}
        </div>
      </div>
    </>
  );
}
