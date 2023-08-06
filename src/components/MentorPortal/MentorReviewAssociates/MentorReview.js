import React, { useState, useEffect } from "react";
import "./MentorReview.css";
import Header from "../../Header/Header";
import MentorReviewTable from "./MentorReviewTable";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MentorReview = () => {
  const [tableData, setTableData] = useState([]);
  const [orgTableData, setOrgTableData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const secretkeyUser = process.env.REACT_APP_USER_KEY;
  var parsedObject;
  const data = localStorage.getItem("userData");

  const handleFiltersChange = () => {
    const getFilterItems = (items, query) => {
      if (query != "") {
        return items.filter((item) =>
          `${item.firstName} ${item.lastName}`
            .toLowerCase()
            .startsWith(query.toLowerCase())
        );
      }
      return items;
    };

    const filterItems = getFilterItems(orgTableData, query);
    setTableData(filterItems);
  };

  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    parsedObject = JSON.parse(decryptedJsonString);
  } else {
    console.log("No encrypted data found in localStorage.");
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v3/getuserReport`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      console.log(response.data.response, "object");
      setOrgTableData(
        response?.data.response.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        })
      );
      setTableData(
        response?.data.response.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        })
      );
      console.log(tableData, "This is table data")
      setIsLoading(false);
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
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleFiltersChange();
  }, [query]);

  return (
    <>
      <div className="" style={{ marginBottom: "5rem" }}>
        <Header />
      </div>
      <div className="review-parent-wrapper">
        <div className="review-child-wrapper">
          <div className="review-header">
            <span>Review Associates</span>
          </div>
          <div className="review-filter-wrapper ">
            <div className="review-search">
              <div className="review-search-icon" />
              <input
                type="text"
                className="review-input-bar"
                placeholder="Search Associate Consultant"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="review-table-wrapper ">
            <MentorReviewTable tableData={tableData} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorReview;
