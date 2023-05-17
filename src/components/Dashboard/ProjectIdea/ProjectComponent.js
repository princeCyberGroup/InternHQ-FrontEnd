import './AddNewIdea.css';

export const AddNewProjectComponent = () => {
    const divStyle = {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: "#ffffff",
    }
    return (
        <>
            <div class="card">
                <div class="card-header">
                    Project
                </div>
                <div className="card-body">
                    <div class="row">
                        <p class="card-text">A star will be rewarded to you as a token of appreciation for your hardwork and dedication upon the successful completion of the project.</p>
                    </div>
                    <div className="row">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <p class='text mb-0 ms-1'><b>Project</b></p></div>
                            <button type="button" class="view-all">
                                <p class="me-2">View All</p>
                            </button>
                        </div>
                    </div>
                    <div className="row third-div">
                        <div className="">
                            <h5>Recipe Recommendation Engine</h5>
                            <p>Recipe Recommendation Engine
                                The Recipe Recommendation Engine is a web-based application that uses machine learning algorithm...</p>
                            <div className='project-link'>
                                <a href="http.reciperecommendationengine.github">See More</a>
                            </div>
                            <div className="row">
                                <div className="techno">
                                    Members:
                                </div>
                                <div style={{ display: "flex", gap: "-5px" }}>
                                    <div style={divStyle}>JD</div>
                                    <div style={divStyle}>JD</div>
                                    <div style={divStyle}>JD</div>
                                    <div style={divStyle}>JD</div>
                                    <div style={divStyle}>JD</div>
                                </div>

                            </div>
                        </div>
                        <div className="" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><b>+</b> Add Project</div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Project</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="project-name" class="col-form-label">Project Name</label>
                                        <input type="text" class="form-control" id="project-name" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="project-description" class="col-form-label">Project Description</label>
                                        <textarea class="form-control" id="project-description"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="technology-used" class="col-form-label">Technology Used</label>
                                        <input class="form-control" type='' id="technology-used" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="Project Link" class="col-form-label">Project Link</label>
                                        <input class="form-control" id="project-link" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="Hosted Link(Optional)" class="col-form-label">Hosted Link(Optional)</label>
                                        <input class="form-control" id="hosted-link" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="Members(Optional)" class="col-form-label">Members(Optional)</label>
                                        <input class="form-control" id="project-description" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>

    )
}