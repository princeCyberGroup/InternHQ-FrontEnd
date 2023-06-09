import React, { useState, useEffect } from "react";
import "./LogCard.css";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";

function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase());
  return initials.join("");
}

export default function AssociateConsultant(props) {
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [acData, setAcData] = useState([]);
  const [filterAcData, setFilterAcData] = useState([]);
  const [mentorData, setMentorData] = useState([]);
  const [activeButton, setActiveButton] = useState("Associates");
  const [isLoading, setIsLoading] = useState(false);

  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  var parsedObject;
  const data = localStorage.getItem("userData");
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }
  const userId = parsedObject.userId;

  const navigate = useNavigate();
  const handleOnUserclick = async (id) => {
    const selectedUserData = acData.find((user) => user.userId === id);
    props.setSelectedUser(selectedUserData);
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v3/getActivityLog?userId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );

      props.setLogData(response.data.response);
      //   console.log(response.data.response);
    } catch (error) {
      //uncomment it after merging
      // if (error.response?.data.statusCode === 401) {
      //   return navigate("/error/statusCode=401");
      // }
      // if (error.response?.data.statusCode === 400) {
      //   return navigate("/error/session-expired");
      // }
      // if (error.response?.data.statusCode === 500) {
      //   return navigate("/error/statusCode=500");
      // }
      // if (error.response?.data.statusCode === 404) {
      //   return navigate("/error/statusCode=404");
      // }
      if (error.response?.data.statusCode === 401) {
        return navigate("/error?statusCode=401");
      }

      // console.log("Error ", error.response?.data);
      // console.log(error.response?.data.msg);
    }
  };
  const handleOnMentorclick = (id) => {
    const selectedMentorData = mentorData.find(
      (mentor) => mentor.mentorId === id
    );
    props.setSelectedMentor(selectedMentorData);
  };

  const handleFiltersChange = () => {
    const getFilterItems = (items, searchValue) => {
      if (searchValue) {
        let filterData = acData.filter((item) =>
          item.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
        return filterData;
      }
      return items;
    };
    const filters = getFilterItems(
      activeButton === "Associates" ? filterAcData : mentorData,
      searchFilterValue
    );
    if (activeButton === "Associates") {
      setFilterAcData(filters);
    } else {
      setMentorData(filters);
    }
  };

  useEffect(() => {
    handleFiltersChange();
  }, [searchFilterValue, activeButton]);

  useEffect(() => {
    fetchData();
    fetchMentorData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/v2/getDashboardStatus`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      const rsp = await response.json();
      //   setStatusData(rsp);
      setAcData(rsp.response);
      setFilterAcData(rsp.response);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  const fetchMentorData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v2/getMentorDetails",
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      const rsp = await response.json();
      //   setStatusData(rsp);

      setMentorData(rsp.activeMentors);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  function renderAssociates(userData) {
    const initials = getInitials(userData.name);
    return (
      <>
        <div key={userData.userId} className="card associate-mapped-card-log">
          <div className=" row mentor-wrapper">
            <div
              onClick={() => {
                handleOnUserclick(userData.userId);
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
                handleOnUserclick(userData.userId);
              }}
              className=" col-4 pointer"
            >
              <div className="frame-text">{userData.name}</div>
              <div className="frame-id">{userData.intId}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderMentors(data) {
    const initials = getInitials(data.mentorName);
    return (
      <>
        <div key={data.mentorId} className="card associate-mapped-card-log">
          <div className="row mentor-wrapper">
            <div
              // onClick={() => {
              //   handleOnMentorclick(data.mentorId);
              // }}
              className="col-4 frame-log pointer"
            >
              <div className="image-box1">
                {data.imageUrl ? (
                  <img
                    key={data.mentorId}
                    src={data.imageUrl}
                    width={38}
                    alt=""
                  />
                ) : (
                  { initials }
                )}
              </div>
            </div>
            <div
              // onClick={() => {
              //   handleOnMentorclick(data.mentorId);
              // }}
              className="col-4 pointer"
            >
              <div className="frame-text-log">{data.mentorName}</div>
              <div className="frame-id-log">{data.designation}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <p className="log-head">Activity Logs</p>

        <div
          className="card mentor-card pt-0"
          style={{ maxHeight: "80vh", width: "420px", overflow: "auto" }}
        >
          <div className="log-header-nav">
            <div
              className={`nav-btn pointer ${
                activeButton === "Associates" ? "activated" : ""
              }`}
              onClick={() => {
                setActiveButton("Associates");
              }}
            >
              <button className="btn-nav p-0">Associates</button>
            </div>
            <div
              className={`nav-btn pointer ${
                activeButton === "Mentors" ? "activated" : ""
              }`}
              onClick={() => {
                setActiveButton("Mentors");
              }}
            >
              <button className="btn-nav p-0">Mentors</button>
            </div>
          </div>
          <div className="d-flex align-items-center ps-1 associate-search-log-wrapper">
            <SearchIcon />
            <input
              className="search-associate-log "
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
            {activeButton === "Associates"
              ? filterAcData?.map((userData) => renderAssociates(userData))
              : mentorData?.map((data) => renderMentors(data))}
          </div>
        </div>
      </div>
    </>
  );
}
