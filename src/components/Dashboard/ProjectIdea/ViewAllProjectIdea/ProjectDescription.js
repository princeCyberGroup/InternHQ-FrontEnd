import "./ProjectDescription.css";

export const ProjectDescription = ({ data, indexNumber }) => {
    return (
        <>
            <h5 className="project-detail-name">{data[indexNumber].projectNames}</h5>
            <p className="created-at">{data[indexNumber].createdAt}</p>
            <p className="project-detail-text">{data[indexNumber].projectText}</p>
            <p className="project-detail-technology-used mb-0">Technology Used:</p>


            <div className="project-detail-technology-badges">
                {data[indexNumber].technology.map((tech, index) => {
                    if (tech != null) {
                        return (
                            <p className="technology-badge me-1" key={index}> {tech} </p>
                        )
                    }
                })}
            </div>
            <p className="members mb-0">Members:</p>
            <div className="members-name project-members text-center">
                {data[indexNumber].members.map((val, index) => {
                    if(val != null){
                    return (
                        <p className="project-idea-members" key={index}> {val.slice(0,2).toUpperCase()} </p>
                    )
                    }
                })}
            </div>
        </>
    )
}