import"./EmptyNoti.css";
import {ReactComponent as Noti} from "./Group 3Noti.svg"

export const EmptyNoti = () => {
    return (
        <div className=" notification-card card">
            <div className="card-header-notification">
                Notifications
            </div>

            <div className="col-12 d-flex justify-content-center" style={{marginTop:"83.5px"}}>
                <Noti/>
            </div>
            <div className="col-12 d-flex justify-content-center noNoti">
                <p>No Notifications Right Now!</p>
            </div>
            <div className="col-12 d-flex justify-content-center p1">
                <p>We’ll notify you when something arrives.</p>
            </div>
            
        </div>
    )
}