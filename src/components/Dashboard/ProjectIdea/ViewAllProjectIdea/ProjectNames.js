export const ProjectNames = (props) =>{
    const truncate = (str, maxLength) => {
        if (str.length > maxLength) return (str.slice(0, maxLength) + "...");
        else return str;
    }
    return(
        <div>
            {props.data1.map((user,index)=>{
                return(
                    <div className="mt-2 pb-0 d-flex justify-content-between" key={index}
                        onClick={() => {
                            props.projectDetails(index);
                        }}>

                        <div
                            style={{
                                display: "flex",
                            }}>
                            <h5
                                className=""
                            >{user.ProjectNames}
                            </h5>
                            <span
                                className="click-arrow"
                            // style={{ border:"1px solid black" }}
                            >
                                &gt;
                            </span>
                        </div>


                        <div>
                            <p className="flex-grow-1">{truncate(user.ProjectText, 100)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}