import { ReactComponent as NoViewProject } from "../../../../../Assets/NoProject.svg";
import "./MyIdeaViewAll.css";

const EmptyProjectView = () => {
  return (
    <div className="empty-project">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <NoViewProject />
        <p className="empty-view-text">No project yet?</p>
      </div>
    </div>
  );
};
export default EmptyProjectView;