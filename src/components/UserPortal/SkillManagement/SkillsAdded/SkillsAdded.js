import React, { useEffect, useState, createContext, useContext } from "react";
import EmptySkillsAdded from "./EmptySkillsAdded/EmptySkillsAdded";
import { ReactComponent as GoldStar } from "../../../../Assets/Star-Icon-gold.svg";
import { ReactComponent as SilverStar } from "../../../../Assets/Star-Icon-silver.svg";
import { ReactComponent as BronzeStar } from "../../../../Assets/Star-Icon-bronze.svg";
import "./SkillsAdded.css";
// import nonActiveimageStar from '../Assets/nonActiveimageStar.png';
import { ReactComponent as EmptyStar } from "../../../../Assets/emptystar.svg";
import SkillsAddedSkeleton from "./SkillsAddedSkeleton";
import { TestContext } from "../SkillManagement";
// import { ReactComponent as Star } from "../../../../Assets/Star.svg";

const SkillsAdded = () => {

  const {resultInfo, setResultInfo} = useContext(TestContext);
  var storedObject = localStorage.getItem("userData");
  var parsedObject = JSON.parse(storedObject);
  var userId = parsedObject.userId;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const fetchData = async () => {
    try {
      //const response = await fetch(`https://cg-interns-hq.azurewebsites.net/skillAdded?userId=41`);
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/v3/skillAdded?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData"))["token"]
            }`,
          },
        }
      );
      const data = await response.json();

      setResultInfo(data.response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="heading">
        <p>Skills Added</p>
      </div>
      <div
        className="card skill-added-card"
        style={{
          boxShadow: " 0px 4px 20px 0px rgba(40, 52, 73, 0.15)",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {isLoading ? (
          <>
            <SkillsAddedSkeleton />
            <SkillsAddedSkeleton />
            <SkillsAddedSkeleton />
            <SkillsAddedSkeleton />
            <SkillsAddedSkeleton />
          </>
        ) : resultInfo?.length === 0 ? (
          <EmptySkillsAdded />
        ) : (
          resultInfo?.map((DataUsed, key) => (
            <div style={{ width: "17.9rem" }} key={key}>
              <div
                className="p-0"
                style={{
                  maxHeight: "calc(100vh - 30vh)",
                  borderBottom: "1px solid #E9ECEB",
                }}
              >
                <div className="row cards">
                  <div className="col-12 d-flex mainImg">
                    <img src={DataUsed.techImageLink} alt="" />
                    <p>{DataUsed.techName}</p>
                  </div>
                  <div className="d-flex p-0 stars">
                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examScores[0] >= 80 ? "block" : "grey"
                      }`}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[0] >= 80 ? (
                          <BronzeStar style={{ fontSize: "3.125rem" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      <p className="m-0">{DataUsed.examLevels[0]}</p>
                      {DataUsed.examScores[0] >= 80 ? (
                        <p className="m-0 per">{DataUsed.examScores[0]}%</p>
                      ) : (
                        <p className="m-0">0%</p>
                      )}
                    </div>

                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examScores[1] >= 80 ? "block" : "grey"
                      }`}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[1] >= 80 ? (
                          <SilverStar style={{ fontSize: "3.125rem" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      <p className="m-0">{DataUsed.examLevels[1]}</p>
                      {DataUsed.examScores[1] >= 80 ? (
                        <p className="m-0 per">{DataUsed.examScores[1]}%</p>
                      ) : (
                        <p className="m-0">0%</p>
                      )}
                    </div>

                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examScores[2] >= 80 ? "block" : "grey"
                      }`}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[2] >= 80 ? (
                          <GoldStar style={{ fontSize: "3.125rem" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      <p className="m-0">{DataUsed.examLevels[2]}</p>
                      {DataUsed.examScores[2] >= 80 ? (
                        <p className="m-0 per">{DataUsed.examScores[2]}%</p>
                      ) : (
                        <p className="m-0">0%</p>
                      )}
                    </div>

                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examScores[3] >= 80 ? "block" : "grey"
                      }`}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[3] >= 80 ? (
                          <GoldStar style={{ fontSize: "3.125rem" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      <p className="m-0">{DataUsed.examLevels[3]}</p>
                      {DataUsed.examScores[3] >= 80 ? (
                        <p className="m-0 per">{DataUsed.examScores[3]}%</p>
                      ) : (
                        <p className="m-0">0%</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SkillsAdded;
