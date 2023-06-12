import { ReactComponent as NoIdea } from "./NoProject.svg";
import "./MyIdea.css";

export const EmptyProject = () => {
    return (
        <div className="empty-idea">
            <div className="d-flex justify-content-center empty-image">
                <NoIdea />
            </div>
            <p className="fw-bold empty-text">No project ideas yet?</p>
        </div>
    )
}