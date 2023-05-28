
export const ProjectDescription = ({data1, indexNumber}) => {
    return (
        <div className="">
            <h5 className="project-detail-name">{data1[indexNumber].ProjectNames}</h5>
            <p className="project-detail-text">{data1[indexNumber].ProjectText}</p>
            <p className="project-detail-technology-used">Technology Used:</p>

            {console.log(data1[indexNumber].Technology)}

            <div className="project-detail-technology-badges">
                {data1[indexNumber].Technology.map((tech) => {
                    return <p className="technology-badge me-1"> {tech} </p>
                })}
            </div>
            
            <div>
                Members:
               <p> {data1[indexNumber].Members}</p>
            </div>
            {/* <p className="project-detail-link">Project Link:</p>
            <p className="project-link-name">{data[indexNumber].ProjectLink}</p>
            <p className="project-detail-hosted-link">Hosted Link:</p> <p className="hosted-link-name">{data[indexNumber].HostedLink}</p> */}
        
        </div>
    )
}