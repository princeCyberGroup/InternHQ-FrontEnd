import './EmptyGraph.css';
import './Group 3EmpGraph.svg'
import { ReactComponent as NoGraph } from "./Group 3EmpGraph.svg";


export default function EmptyGraph() {

  return (

    <>
      <div class="report p-3">
        <div class="card-body">
            <div className='col-12 d-flex justify-content-center' style={{marginTop:"70px"}}>
                <NoGraph/>
            </div>
            <div className='col-12 d-flex justify-content-center noRep'>
                <p>No Reports Found! </p>
            </div>
            <div className='col-12 d-flex justify-content-center p2'>
                <p>Sorry, there is no report available to display at this time.</p>
            </div>
            
          </div>
        </div>
    </>
  );
}
