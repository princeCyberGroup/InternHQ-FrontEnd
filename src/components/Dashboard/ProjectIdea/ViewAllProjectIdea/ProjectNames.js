import "./ViewAllProjectIdea.css";

export const ProjectNames = (props) => {
    const truncate = (str, maxLength) => {
        if (str.length > maxLength) return (str.slice(0, maxLength) + "...");
        else return str;
    }
    return (
        <div className="all-project-names pt-3">
            {props.data.map((user, index) => {
                return (
                    <div className="project-names-wrapper mt-2 pb-0 d-flex justify-content-between" key={index}
                        onClick={() => {
                            props.projectDetails(index);
                        }}>

                        <div
                            style={{
                                display: "flex",
                            }}>
                            <h5
                                className="project-names"
                            >{user.projectNames}
                            </h5>
                            <span
                                className="click-arrow"
                            // style={{ border:"1px solid black" }}
                            >
                                &gt;
                            </span>
                        </div>
                        <div>
                            <p className="project-text flex-grow-1">{truncate(user.projectText, 100)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}