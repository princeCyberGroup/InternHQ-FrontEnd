import { ReactComponent as NoProjectYet } from "../../../../../Assets/NoProject.svg";
import "./MyIdea.css";

 const EmptyProjectState = () => {
  return (
    <div className="empty-idea">
      <div className="d-flex justify-content-center empty-image">
        <NoProjectYet />
      </div>
      <div>
        <p className="fw-bold empty-text">No Project Yet?</p>
      </div>
    </div>
  );
};
export default EmptyProjectState