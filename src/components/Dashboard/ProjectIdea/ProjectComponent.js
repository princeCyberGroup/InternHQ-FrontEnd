import './AddNewIdea.css';
import React, { useState } from 'react';

export const AddNewProjectComponent = () => {


    const [projectScreen, setProjectScreen] = useState('projectIdea');
    const [pActive, setPActive] = useState(true);

    // const divStyle = {
    //     width: "2.5rem",
    //     height: "2.5rem",
    //     borderRadius: "50%",
    //     background: "#ffffff",
    //     backgroundColor: "red",
    //     alignItems: "center"
    // }

    const setProjectScreenType = (input) => {
        console.log("Working")
        setProjectScreen(input)
    }



    return (
      <>
        <div class="card">
          <div class="card-header  d-flex  d-flex justify-content-center align-item-center ">
            {/* <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex justify-content-center">
                                    <a type="button" class="btn" onClick={() => { setProjectScreenType('projectIdea') }}>Project Idea</a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="d-flex justify-content-center">
                                    <button type="button" class="btn" onClick={() => { setProjectScreenType('addNewProject') }}>Project</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className={"project-idea-btn" + (pActive ? " p-active" : "")}>
              <button
                class="btn-1 p-0"
                onClick={() => {
                  setProjectScreenType("projectIdea");
                  setPActive(true);
                }}
              >
                Project Idea
              </button>
            </div>
            <div className={"project-btn" + (pActive ? " " : " p-active")}>
              <button
                class="btn-2 p-0"
                onClick={() => {
                  setProjectScreenType("addNewProject");
                  setPActive(false);
                }}
              >
                Project
              </button>
            </div>
          </div>
          {projectScreen === "projectIdea" ? (
            <>
              <div className="card-body">
                <div class="row-1">
                  <p class="card-text">
                    {" "}
                    Simply share your project ideas with us, and our experts
                    will review it and provide feedback and guidance on how to
                    take it to the next level.
                  </p>
                </div>

                <div className="share-project">
                  <div class="d-flex align-item-center justify-content-between mb-2 ">
                    <div class="d-flex">
                      <p class="text mb-0 fw-bold">Shared Project Idea</p>
                    </div>
                    <button type="button" class="view-all fw-bold">
                      View All
                    </button>
                  </div>
                </div>

                <div className="idea-div">
                  <div className="div3">
                    <h5 className="fw-bold">Recipe Recommendation Engine</h5>
                    <p className="fw-normal mb-1">
                      The Recipe Recommendation Engine is a web-based
                      application that uses machine learning algorithm...
                    </p>
                    <div className="project-link">
                      <a href="http.reciperecommendationengine.github">
                        See More
                      </a>
                    </div>
                    <div className="members-div pt-0">
                      <div className="member mb pt-1 fw-bold mb-2">
                        Members:
                      </div>
                      <div className="project-members ml-0">
                        <div className="project-idea-members">
                          <p>AB</p>
                        </div>
                        <div className="project-idea-members">
                          <p>CD</p>
                        </div>
                        <div className="project-idea-members">
                          <p>EF</p>
                        </div>
                        <div className="project-idea-members">
                          <p>IJ</p>
                        </div>
                        <div className="project-idea-members">
                          <p>+2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="add-new-idea pt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                >
                  <p className="project-p mb-0 mt-1">
                    <span>+</span> Add New Idea
                  </p>
                </div>
              </div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Add your Project Idea
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="project-name" class="col-form-label">
                            Project Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="project-name"
                          />
                        </div>
                        <div class="mb-3">
                          <label
                            for="project-description"
                            class="col-form-label"
                          >
                            Project Description
                          </label>
                          <textarea
                            class="form-control"
                            id="project-description"
                          ></textarea>
                        </div>

                        <div class="mb-3">
                          <label for="technology-used" class="col-form-label">
                            Technology Used
                          </label>
                          <input
                            class="form-control"
                            type=""
                            id="technology-used"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="Members(Optional)" class="col-form-label">
                            Members(Optional)
                          </label>
                          <input
                            class="form-control"
                            id="project-description"
                          />
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card-body">
                <div className="row-2">
                  <p className="paragraph">
                    A star will be rewarded to you as a token of appreciation
                    for your hardwork and dedication upon the successful
                    completion of the project.
                  </p>
                </div>
                <div className="project-idea">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <p class="text mb-0 ms-1">Project</p>
                    </div>
                    <button type="button" class="view-all">
                      <p class="me-2">View All</p>
                    </button>
                  </div>
                </div>

                <div className="row-3 mb-5">
                  <div className="div3">
                    <h5>Recipe Recommendation Engine</h5>
                    <div className="project-link">
                      <a href="#">http.reciperecommendationengine.github</a>{" "}
                      {/* Use the Link component from React Router */}
                    </div>

                    <div className="technology-used">Technology Used:</div>
                    <div className="technology-badges">
                      <div className="technology-badge-1">HTML</div>
                      <div className="technology-badge-2">CSS</div>
                      <div className="technology-badge-3">Java Script</div>
                    </div>
                  </div>
                </div>
                <div
                  className="add-project mt-5  pt-4 pb-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                >
                  <p className="project-p fw-bold mb-0">
                    <span className="fw-bold">+</span> Add Project
                  </p>
                </div>
              </div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Add Project
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="project-name" class="col-form-label">
                            Project Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="project-name"
                          />
                        </div>

                        <div class="mb-3">
                          <label
                            for="project-description"
                            class="col-form-label"
                          >
                            Project Description
                          </label>
                          <textarea
                            class="form-control"
                            id="project-description"
                          ></textarea>
                        </div>

                        <div class="mb-3">
                          <label for="technology-used" class="col-form-label">
                            Technology Used
                          </label>
                          <input
                            class="form-control"
                            type=""
                            id="technology-used"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="Project Link" class="col-form-label">
                            Project Link
                          </label>
                          <input class="form-control" id="project-link" />
                        </div>
                        <div class="mb-3">
                          <label
                            for="Hosted Link(Optional)"
                            class="col-form-label"
                          >
                            Hosted Link(Optional)
                          </label>
                          <input class="form-control" id="hosted-link" />
                        </div>
                        <div class="mb-3">
                          <label for="Members(Optional)" class="col-form-label">
                            Members(Optional)
                          </label>
                          <input
                            class="form-control"
                            id="project-description"
                          />
                        </div>
                      </form>
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
}