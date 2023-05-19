import React from "react";
import "./SkillsAdded.css";

const SkillsAdded = () => {
  return (
    <div className="container-fluid mx-5 my-5">
      <div className="row">
        <div className="col-4">
          <div className="heading">
            <p>Skills Added</p>
          </div>
          <div className="card">
            <div
              class="card-body p-0"
              style={{ maxHeight: "50rem", overflow: "auto" }}
            >
              
              <div className="row cards">
                <div className="col-12 d-flex mainImg">
                  <img
                    src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg"
                    height={"50px"}
                    width={"50px"}
                    alt=""
                  />
                  <p>
                    Angular - The Complete Guide
                  </p>
                </div>
                <div className="row p-0" style={{marginLeft:"24px",marginRight:"24px",flexShrink:"1",marginBottom:"24px"}}>
                  <div className="col d-flex flex-column" style={{display:"flex",alignContent:"center"}}>
                    <img 
                      style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0" >Beginner</p>
                    <p className="m-0" >80%</p>
                  </div>
                  <div className="col d-flex flex-column">
                    <img
                    style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0">Intermediate</p>
                    <p className="m-0">80%</p>
                  </div>
                  <div className="col d-flex flex-column">
                    <img
                      style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0">Advanced</p>
                    <p className="m-0">80%</p>
                  </div>
                  <div className="col d-flex flex-column starImg">
                    <img
                      style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0">Project</p>
                    <p className="m-0">80%</p>
                  </div>
                </div>
                <div
                className="divider"
                style={{ borderBottom: "1px solid #ccc" }}
                />
                <div className="col-12 d-flex mainImg">
                  <img
                    src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg"
                    height={"50px"}
                    width={"50px"}
                    alt=""
                  />
                  <p>
                    React - The Complete Guide
                  </p>
                </div>
                <div className="row p-0" style={{marginLeft:"24px",marginRight:"24px",flexShrink:"1"}}>
                  <div className="col d-flex flex-column">
                    <img
                      style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0">Beginner</p>
                    <p className="m-0">80%</p>
                  </div>
                  <div className="col d-flex flex-column">
                    <img
                      style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0">Intermediate</p>
                    <p className="m-0">80%</p>
                  </div>
                  <div className="col d-flex flex-column">
                    <img
                      style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0">Advanced</p>
                    <p className="m-0">80%</p>
                  </div>
                  <div className="col d-flex flex-column starImg">
                    <img
                      style={{margin:"auto"}}
                      src="https://pixlok.com/wp-content/uploads/2021/07/Rating-SVG-Icon-s9fd.png"
                      height={"35px"}
                      width={"35px"}
                      alt=""
                    />

                    <p className="m-0">Project</p>
                    <p className="m-0">80%</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAdded;
