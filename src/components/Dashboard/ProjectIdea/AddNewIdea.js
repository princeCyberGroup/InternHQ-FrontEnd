import './AddNewIdea.js';

export const AddNewIdea = () => {
    return (
        <>
            <div className="card-body pb-0">
                <div class="text-row-1">
                    <p class="card-textt">
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

                <div className="recipe-row">
                    <div className="recipe-text">
                        <h5 className="fw-bold">Recipe Recommendation Engine</h5>
                        <p className="fw-normal mb-1">
                            The Recipe Recommendation Engine is a web-based
                            application that uses machine learning algorithm...
                        </p>
                        <div className="project-link-2">
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
                    <p className="project-p mb-0 mt-2 pb-2 fw-bold">
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
                            <h1 class="modal-title fs-5 add-project-wrapper" id="exampleModalLabel">
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
                                    <label for="project-name" class="col-form-label title-text">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="project-name"
                                        placeholder='Enter Project Name'
                                    />
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="project-description"
                                        class="col-form-label title-text"
                                    >
                                        Project Description
                                    </label>
                                    <textarea
                                        class="form-control"
                                        id="project-description"
                                        placeholder='Write Here..'
                                        rows={3}

                                    ></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="technology-used" class="col-form-label title-text">
                                        Technology Used
                                    </label>
                                    <select className='form-select'>
                                        <option hidden selected>Select Technology</option>
                                        <option>TypeScript</option>
                                        <option>PHP</option>
                                        <option>React JS</option>
                                        <option>SQL</option>
                                    </select>
                                    {/* <input
                                    class="form-control"
                                    type="text"
                                    id="technology-used"
                                /> */}

                                </div>
                                <div class="mb-3">
                                    <label for="Members(Optional)" class="col-form-label title-text">
                                        Members(Optional)
                                    </label>
                                    <input
                                        class="form-control"
                                        id="project-description"
                                        placeholder='Member Name'
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
    )
}