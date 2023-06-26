import {ReactComponent as SuccessfullAdd} from "../../../../Assets/VectorSucessfull.svg";
import "../UploadCsv/PopUpModals.css";

const NewSkillSet = () =>{
    return(
        <>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewSkillSetModal">
  New Skill Set
</button>

<div className="modal fade" id="NewSkillSetModal" tabindex="-1" aria-labelledby="NewSkillSetModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header border-bottom-0">
       
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <SuccessfullAdd/>
        <div className="mt-3 text-added-successfull">
        New Skill Set Test<br/>
        Uploaded Successfully
        </div>
      </div>
     <div>
        <button type="button" className="btn ok-button" data-bs-dismiss="modal"><span className="ok-text">OK</span></button>
     </div>
    </div>
  </div>
</div>
</>
    )
}
export default NewSkillSet;