import { ReactComponent as NoIdea } from "./NoProject.svg";
import "./MyIdea.css";

export const EmptyProject = () => {
    return (
         <div className="empty-idea">
         <div className="d-flex justify-content-center align-items-center flex-column">
             <NoIdea />
             <p className="fw-bold empty-text">No ideas yet?</p>
         </div>
     </div>
    )
}