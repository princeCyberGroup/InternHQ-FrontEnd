import React, { useEffect, useState } from "react";
import EmptySkillsAdded from "./EmptySkillsAdded/EmptySkillsAdded";
import { ReactComponent as GoldStar } from "./assetsSkillManagment/Star-Icon-gold.svg";
import { ReactComponent as SilverStar } from "./assetsSkillManagment/Star-Icon-silver.svg";
import { ReactComponent as BronzeStar } from "./assetsSkillManagment/Star-Icon-bronze.svg";
import "./SkillsAdded.css";
// import nonActiveimageStar from '../Assets/nonActiveimageStar.png';
import { ReactComponent as EmptyStar } from "../../../../Assets/emptystar.svg";
// import { ReactComponent as Star } from "../../../../Assets/Star.svg";

const SkillsAdded = () => {
  var storedObject = localStorage.getItem("userData");
  var parsedObject = JSON.parse(storedObject);
  var userId = parsedObject.userId;

  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      return setIsLoading(false);
    }, 2000);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //const response = await fetch(`https://cg-interns-hq.azurewebsites.net/skillAdded?userId=41`);
      const response = await fetch(
        `https://cg-interns-hq.azurewebsites.net/skillAdded?userId=${userId}`
      );
      const data = await response.json();

      // setAllData(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="heading">
        <p>Skills Added</p>
      </div>

      {/* //main card  */}
      <div>
        {allData.length === 0 ? (
          <EmptySkillsAdded />
        ) : (
          allData.map((DataUsed) => (
            <div className="card" style={{ width: "288px" }}>
              <div
                class="card-body p-0"
                style={{ maxHeight: "calc(100vh - 30vh)", overflow: "auto" }}
              >
                <div className="row cards">
                  <div className="col-12 d-flex mainImg">
                    <img src={DataUsed.tech_image_link} alt="" />
                    <p>{DataUsed.tech_name}</p>
                  </div>
                  <div className="d-flex p-0 stars">
                    {/* ///////////// */}
                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examLevels[0] ? "block" : "grey"
                      }`}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[0] >= 8 ? (
                          // <GoldStar />
                          // <SilverStar />
                          <BronzeStar style={{ fontSize: "50px" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      {DataUsed.examLevels[0] ? (
                        <>
                          <p className="m-0">{DataUsed.examLevels[0]}</p>
                          <p className="m-0 per">{DataUsed.examScores[0]}%</p>
                        </>
                      ) : (
                        <>
                          <p className="m-0">Beginner</p>
                          <p className="m-0">0%</p>
                        </>
                      )}
                    </div>

                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examLevels[1] ? "block" : "grey"
                      }`}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[1] >= 8 ? (
                          // <GoldStar />
                          // <SilverStar />
                          <SilverStar style={{ fontSize: "50px" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      {DataUsed.examLevels[1] ? (
                        <>
                          <p className="m-0">{DataUsed.examLevels[1]}</p>
                          <p className="m-0 per">{DataUsed.examScores[1]}%</p>
                        </>
                      ) : (
                        <>
                          <p className="m-0">Intermediate</p>
                          <p className="m-0">0%</p>
                        </>
                      )}
                    </div>

                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examLevels[2] ? "block" : "grey"
                      }`}
                      style={{
                        background:
                          DataUsed.examScores[2] === 0 ? "grey" : "none",
                        color:
                          DataUsed.examScores[2] === 0 ? "grey" : "inherit",
                      }}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[2] >= 8 ? (
                          <GoldStar style={{ fontSize: "50px" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      {DataUsed.examLevels[2] ? (
                        <>
                          <p className="m-0">{DataUsed.examLevels[2]}</p>
                          <p className="m-0 per">{DataUsed.examScores[2]}%</p>
                        </>
                      ) : (
                        <>
                          <p className="m-0">Advanced</p>
                          <p className="m-0">0%</p>
                        </>
                      )}
                    </div>

                    <div
                      className={`col d-flex flex-column ${
                        DataUsed.examLevels[3] ? "block" : "grey"
                      }`}
                    >
                      <div className="my-spacing">
                        {DataUsed.examScores[3] >= 8 ? (
                          <GoldStar style={{ fontSize: "50px" }} />
                        ) : (
                          <EmptyStar />
                        )}
                      </div>
                      {DataUsed.examLevels[3] ? (
                        <>
                          <p className="m-0">{DataUsed.examLevels[3]}</p>
                          <p className="m-0 per">{DataUsed.examScores[3]}%</p>
                        </>
                      ) : (
                        <>
                          <p className="m-0">Project</p>
                          <p className="m-0">0%</p>
                        </>
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
