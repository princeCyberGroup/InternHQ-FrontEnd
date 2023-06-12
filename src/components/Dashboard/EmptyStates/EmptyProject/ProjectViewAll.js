import { ReactComponent as NoViewProject } from "./NoProject.svg";
import "./MyIdeaViewAll.css";

export const EmptyProjectView = () => {
    return (
        <div>
            <div className="empty-idea-image">
                <NoViewProject />
            </div>
            <div className="d-flex justify-content-center">
                <p className="empty-view-text">No project yet?</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className="idea-share">Start by sharing your first one by clicking the 'Add Project' button</p>
            </div>
        </div>
    )
}