import {ReactComponent as NoProjectYet} from "./NoProject.svg";
import "./MyIdea.css";

export const EmptyProjectState = () =>{
    return(
        <div className="empty-idea">
            <div className="d-flex justify-content-center empty-image"><NoProjectYet/></div>
            <div><p className="fw-bold empty-text">No Project Yet?</p></div>
        </div>
    )
}