import "./KYMEmpty.css";
import { ReactComponent as NoMentor } from "./KYM Empty.svg";


export const KYMEmpty = () => {



  return (
    <>
      <div className="card" style={{ height: "370px", alignContent: "center" }}>
        <div className="border-bottom ">
          <h5 className="card-title dtt-hfs">Know Your Mentors</h5>
        </div>
        
          <div className="col-12 d-flex justify-content-center" style={{marginTop:"80px"}} >
            <NoMentor/>
          </div>
          <div className="col-12 d-flex justify-content-center noMentor">
            <p>No Mentors Yet ?</p>
          </div>
          

        
        <br />
      </div>
    </>
  );
};
