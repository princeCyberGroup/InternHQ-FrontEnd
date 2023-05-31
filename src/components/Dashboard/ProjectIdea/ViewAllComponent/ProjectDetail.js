import "./ProjectDetail.css";

export const ProjectDetail = ({data, indexNumber}) => {
    return (
        <div className="">
            {console.log("This is data" , data[indexNumber])}
            <h5 className="project-detail-name">{data[indexNumber].name}</h5>
            <p>{data[indexNumber].created_at}</p>
            <p className="project-detail-text">{data[indexNumber].description}</p>
            <p className="project-detail-technology-used mb-0">Technology Used:</p>

            {console.log(data[indexNumber].tech_1)}

            {/* <div className="project-detail-technology-badges">
                {data[indexNumber].Technology.map((tech) => {
                    return <p className="technology-badge me-1"> {tech} </p>
                })}
            </div> */}

            <p className="project-detail-link">Project Link:</p>
            <p className="project-link-name">{data[indexNumber].project_link}</p>
            <p className="project-detail-hosted-link">Hosted Link:</p> <p className="hosted-link-name">{data[indexNumber].hosted_link}</p>
        
        </div>
    )
}