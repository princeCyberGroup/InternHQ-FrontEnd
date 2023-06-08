import "./ProjectDescription.css";

export const ProjectDescription = ({ data, indexNumber }) => {
    return (
        <>
            <h5 className="project-detail-name">{data[indexNumber].projectNames}</h5>
            <p className="created-at">{data[indexNumber].createdAt}</p>
            <p className="project-detail-text">{data[indexNumber].projectText}</p>
            <p className="project-detail-technology-used mb-0 fw-bold">Technology Used:</p>


            <div className="project-detail-technology-badges">
                {data[indexNumber].technology.map((tech, index) => {
                    if (tech != null) {
                        return (
                            <p className="technology-badge me-1" key={index}> {tech} </p>
                        )
                    }
                })}
            </div>
            <p className="members fw-bold">Members:</p>
            
            <div className="members-name project-members text-center">
                {data[indexNumber].members.length > 4 ? (
                    data[indexNumber].members.map((curElem, index) => {
                        if (curElem != null) {
                            const nameParts = curElem.split(" ");
                            const initials = nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();

                            return (
                                <div className="project-idea-members" key={index}>
                                    <p className="name-of-members">{initials}</p>
                                </div>
                            );
                        }
                    })
                ) : (
                    <div className="project-idea-members">
                        <p className="name-of-members">+ {data[indexNumber].members.length}</p>
                    </div>
                )}
            </div>
            
            {/* {data[indexNumber].members.map((val, index) => {
                    if(val != null){
                    return (
                        <p className="project-idea-members" key={index}> {val.slice(0,2).toUpperCase()} </p>
                    )
                    }
                })} */}
        
        </>
    )
}