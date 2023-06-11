import { ReactComponent as NoViewProject } from "./NoProject.svg";
import "./MyIdeaViewAll.css";

export const EmptyProjectView = () => {
    return (
        <div className="empty-project">
            <div className="d-flex justify-content-center align-items-center flex-column">
                <NoViewProject />
                <p className="empty-view-text">No project yet?</p>
            </div>
        </div>
    )
}