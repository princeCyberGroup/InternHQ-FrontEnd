import {ReactComponent as NoIdea} from "./NoProject.svg";
import "./MyIdea.css";

export const EmptyProject =()=>{
    return(
        <div className="empty-idea">
            <NoIdea/>
            <p className="fw-bold">No project ideas yet?</p>
        </div>
    )
}