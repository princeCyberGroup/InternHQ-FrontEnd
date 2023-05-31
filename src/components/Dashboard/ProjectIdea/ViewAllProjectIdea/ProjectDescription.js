import "./ProjectDescription.css";

export const ProjectDescription = ({ data, indexNumber }) => {
    return (
        <div className="">
             {console.log("This is data" , data[indexNumber])}
            <h5 className="project-detail-name">{data[indexNumber].projectNames}</h5>
            <p>{data[indexNumber].createdAt}</p>
            <p className="project-detail-text">{data[indexNumber].projectText}</p>
            <p className="project-detail-technology-used mb-0">Technology Used:</p>
            {console.log(data[indexNumber].tech_1)}

            {/* <div className="project-detail-technology-badges">
                {data[indexNumber].Technology.map((tech, index) => {
                    return (
                        <p className="technology-badge me-1" key={index}> {tech} </p>
                    )
                })}
            </div> */}

{console.log(data[indexNumber].member_1)}
                {/* <p className="members mb-0">Members:</p>
                <div className="members-name text-center">
                 {data[indexNumber].Members.map((val, index) =>{
                    return (
                        <p className="project-members-name" key={index}> {val} </p>
                    )
                })}
            </div> */}
            {/* <p className="project-detail-link">Project Link:</p>
            <p className="project-link-name">{data[indexNumber].ProjectLink}</p>
            <p className="project-detail-hosted-link">Hosted Link:</p> <p className="hosted-link-name">{data[indexNumber].HostedLink}</p> */}

        </div>
    )
}