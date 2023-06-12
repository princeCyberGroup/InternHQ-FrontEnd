import "./EmptyNoti.css";
import { ReactComponent as Noti } from "./Group 3Noti.svg";

const EmptyNoti = () => {
  return (
    <div className="mt-5">
      <div className="col-12 d-flex justify-content-center align-items-center">
        <Noti />
      </div>
      <div className="col-12 d-flex justify-content-center noNoti">
        <p>No Notifications Right Now!</p>
      </div>
      <div className="col-12 d-flex justify-content-center p1">
        <p>We’ll notify you when something arrives.</p>
      </div>
    </div>
  );
};

export default EmptyNoti;
