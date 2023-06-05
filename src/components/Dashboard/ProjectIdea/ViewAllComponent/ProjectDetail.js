import "./ProjectDetail.css";

export const ProjectDetail = ({data, indexNumber}) => {
    return (
        <div className="">
            {console.log("This is props data of perticular index data" , data[indexNumber])}
            <h5 className="project-detail-name">{data[indexNumber].projectNames}</h5>
            <p className="created-at">{data[indexNumber].createdAt}</p>
            <p className="project-detail-text">{data[indexNumber].projectText}</p>
            <p className="project-detail-technology-used mb-0">Technology Used:</p>

           
{/* 
            <div className="project-detail-technology-badges">
                {data[indexNumber].technology.map((tech) => {
                    return <p className="technology-badge me-1"> {tech} </p>
                })}
            </div> */}

            <p className="project-detail-link">Project Link:</p>
            <p className="project-link-name">{data[indexNumber].projectLink}</p>
            <p className="project-detail-hosted-link">Hosted Link:</p> <p className="hosted-link-name">{data[indexNumber].hostedLink}</p>
        
        </div>
    )
}