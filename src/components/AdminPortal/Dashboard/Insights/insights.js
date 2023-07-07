import "../Insights/insights.css";
import { ReactComponent as Bullet } from "../../../../Assets/bullet.svg";
import { ReactComponent as SearchIcon } from "../../../../Assets/search.svg";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InsightsSkeleton from "./InsightsSkeleton";

export default function Insights(props) {
  const [searchFilterValue, setSearchFilterValue] = useState("");
  // const [originalTests, setOriginalTests] = useState(props.data);
  const [insights, setInsights] = useState([]);
  const [originalInsights, setOriginalInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFiltersChange = () => {
    const getFilterItems = (items, searchValue) => {
      if (searchValue) {
        let fitlerData = items.filter((item) =>
          item.techName?.toLowerCase().includes(searchValue.toLowerCase())
        );
        return fitlerData;
      }
      return items;
    };
    const filters = getFilterItems(originalInsights, searchFilterValue);
    setInsights(filters);
  };

  useEffect(() => {
    setTimeout(() => {
      InsightData();
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    handleFiltersChange();
  }, [searchFilterValue]);

  const InsightData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/v2/getInsights`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData"))["token"]
            }`,
          },
        }
      );
      const insData = await response.json();
      setInsights(insData.response);
      setOriginalInsights(insData.response);
      console.log(insights, "Thois");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="about-insight col">Insights</div>
      <div className="insights-card">
        <div className="d-flex align-items-center ps-3 insights-search-wrapper mb-0">
          <SearchIcon />
          <input
            className="search-insights"
            type="text"
            value={searchFilterValue}
            placeholder="Search"
            onChange={(event) => {
              event.preventDefault();
              setSearchFilterValue(event.target.value);
            }}
          />
        </div>
        <div
          className=" insights"
        >
          {isLoading ? (
            <>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            <InsightsSkeleton/>
            </>
          ) : (
            insights?.map((insights) => {
              return (
                <div className="div-insights">
                  <div className="row">
                    <div className="col image-div">
                      <img
                        src={insights.techLink}
                        alt="Description of the image"
                      />
                    </div>
                    <div className="col ps-0">
                      <div className="exam-name">{insights.techName}</div>
                      <div className="number-of-test">
                        {insights.beginner} Beginner <Bullet />{" "}
                        {insights.intermediate} Intermediate <Bullet />{" "}
                        {insights.advanced} Advanced
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
