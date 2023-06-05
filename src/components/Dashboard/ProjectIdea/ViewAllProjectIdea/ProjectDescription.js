import "./ProjectDescription.css";

export const ProjectDescription = ({ data, indexNumber }) => {
    return (
        <div className="">
            {/* {console.log("This is data" , data[indexNumber])} */}
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

            {/* {console.log(data[indexNumber].member_1)} */}
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
            {/* <p className="project-detail-link">Project Link:</p>
            <p className="project-link-name">{data[indexNumber].ProjectLink}</p>
            <p className="project-detail-hosted-link">Hosted Link:</p> <p className="hosted-link-name">{data[indexNumber].HostedLink}</p> */}

        </div>
    )
}