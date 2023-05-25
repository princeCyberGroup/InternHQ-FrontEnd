import "./ProjectDetail.css";
// import { useState } from "react";
export const ProjectDetail = ({data, indexNumber}) => {
    // const data = [
    //     {
    //         ProjectNames: "EcoSpace",
    //         ProjectText: "EcoSpace is a web-based platform that connects users with local sustainable landscaping and gardening services. The platform provides a one-stop-shop for individuals and businesses looking to create and maintain eco-friendly outdoor spaces. The project can be developed using a combination of technologies such as HTML, CSS, JavaScript, and PHP, with a focus on creating a seamlesss and user-friendly interface.",
    //         "Technology-1": "HTML",
    //         "Technology-2": "CSS",
    //         "Technology-3": "JavaScript",
    //         "Technology-4": "ReactJS",
    //         "Technology-5": "Bootstrap",
    //         ProjectLink: "http.reciperecommendationengine.github",
    //         HostedLink: "http.reciperecommendation.github"
    //     },
    // ]
    return (
        // <div>
        //     {props.data.map((user, key) => {
        //         return (
        //             <div className="">
        //                 <h5 className="project-detail-name">{user.ProjectNames}</h5>
        //                 <p className="project-detail-text">{user.ProjectText}</p>
        //                 <p className="project-detail-technology-used">Technology Used:</p>
        //                 <div className="project-detail-technology-badges">
        //                     <p className="technology-badge">{user["Technology-1"]}</p>
        //                     <p className="technology-badge">{user["Technology-2"]}</p>
        //                     <p className="technology-badge">{user["Technology-3"]}</p>
        //                     <p className="technology-badge">{user["Technology-4"]}</p>
        //                     <p className="technology-badge">{user["Technology-5"]}</p>
        //                 </div>
        //                 {/* <p className="project-detail-technology-badges technology-badges">{user.TechnologyUsed}</p> */}
        //                 <p className="project-detail-link">Project Link:</p>
        //                 <p className="project-link-name">{user.ProjectLink}</p>
        //                 <p className="project-detail-hosted-link">Hosted Link:</p> <p className="hosted-link-name">{user.HostedLink}</p>
        //             </div>
        //         )
        //     })}
        // </div>
        <div className="">
            <h5 className="project-detail-name">{data[indexNumber].ProjectNames}</h5>
            <p className="project-detail-text">{data[indexNumber].ProjectText}</p>
            <p className="project-detail-technology-used">Technology Used:</p>
            {console.log(data[indexNumber].Technology)}
            <div className="project-detail-technology-badges">
                {/* mapping */}
                {data[indexNumber].Technology.map((tech) => {
                    return <p className="technology-badge me-1"> {tech} </p>
                })}
                {/* <p className="technology-badge">{data[indexNumber].Technology_1}</p> */}
                {/* <p className="technology-badge">{data[indexNumber].Technology_2}</p>
                <p className="technology-badge">{data[indexNumber].Technology_3}</p>
                <p className="technology-badge">{data[indexNumber].Technology_4}</p>
                <p className="technology-badge">{data[indexNumber].Technology_5}</p> */}
            </div>
            {/* <p className="project-detail-technology-badges technology-badges">{data[indexNumber].TechnologyUsed}</p> */}
            <p className="project-detail-link">Project Link:</p>
            <p className="project-link-name">{data[indexNumber].ProjectLink}</p>
            <p className="project-detail-hosted-link">Hosted Link:</p> <p className="hosted-link-name">{data[indexNumber].HostedLink}</p>
        </div>
    )
}