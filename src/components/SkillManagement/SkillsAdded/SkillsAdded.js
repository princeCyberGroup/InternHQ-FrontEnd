import React ,{ useEffect } from "react";
import "./SkillsAdded.css";
import { useState , createContext } from "react";


const SkillsAdded = () => {

  const [tests, setTests] = useState([]);
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        fetchTests();
    }, [])
    const fetchTests = async () => {
        try {
            const response = await fetch("https://cg-interns-hq.azurewebsites.net/getAllExam");
            const data = await response.json();
            // console.log(data);
            setAllData(data);
            setTests(data);
        }
        catch (e) {
            console.log(e);
        }
    }
  return (
    <>
      <div className="heading">
        <p>Skills Added</p>
      </div>
      <div className="card" style={{ width: "288px" }}>
        <div
          class="card-body p-0"
          style={{ maxHeight: "50rem", overflow: "auto" }}
        >
          <div className="row cards">
            <div className="col-12 d-flex mainImg">
              <img
                src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg"
                alt=""
              />
              <p>Angular - The Complete Guide</p>
            </div>
            <div className="d-flex p-0 stars">
              <div
                className="col d-flex flex-column"
                style={{ display: "flex", alignContent: "center" }}
              >
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  alt=""
                />

                <p className="m-0">Beginner</p>
                <p className="m-0 per">80%</p>
              </div>
              <div className="col d-flex flex-column">
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  alt=""
                />

                <p className="m-0">Intermediate</p>
                <p className="m-0 per">80%</p>
              </div>
              <div className="col d-flex flex-column">
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  height={"20px"}
                  width={"20px"}
                  alt=""
                />

                <p className="m-0">Advanced</p>
                <p className="m-0 per">80%</p>
              </div>
              <div className="col d-flex flex-column starImg">
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  height={"20px"}
                  width={"20px"}
                  alt=""
                />

                <p className="m-0">Project</p>
                <p className="m-0 per">80%</p>
              </div>
            </div>
            <div
              className="divider"
              style={{ borderBottom: "1px solid #ccc" }}
            />
            <div className="col-12 d-flex mainImg">
              <img
                src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg"
                alt=""
              />
              <p>Angular - The Complete Guide</p>
            </div>
            <div className="d-flex p-0 stars">
              <div
                className="col d-flex flex-column"
                style={{ display: "flex", alignContent: "center" }}
              >
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  alt=""
                />

                <p className="m-0">Beginner</p>
                <p className="m-0 per">80%</p>
              </div>
              <div className="col d-flex flex-column">
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  alt=""
                />

                <p className="m-0">Intermediate</p>
                <p className="m-0 per">80%</p>
              </div>
              <div className="col d-flex flex-column">
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  height={"20px"}
                  width={"20px"}
                  alt=""
                />

                <p className="m-0">Advanced</p>
                <p className="m-0 per">80%</p>
              </div>
              <div className="col d-flex flex-column starImg">
                <img
                  src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                  height={"20px"}
                  width={"20px"}
                  alt=""
                />

                <p className="m-0">Project</p>
                <p className="m-0 per">80%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsAdded;
