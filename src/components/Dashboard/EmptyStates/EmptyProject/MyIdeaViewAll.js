import { ReactComponent as NoViewIdea } from "./NoProject.svg";
import "./MyIdeaViewAll.css";

export const EmptyIdea = () => {
    return (
        <div>
            <div className="empty-idea-image">
                <NoViewIdea />
            </div>
            <div className="d-flex justify-content-center">
                <p className="empty-view-text">No project ideas yet?</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className="idea-share">Start by sharing your first one by clicking the 'Add your Idea' button</p>
            </div>
        </div>
    )
}