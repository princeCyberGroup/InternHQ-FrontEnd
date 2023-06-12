import "./EmptyGraph.css";
import { ReactComponent as NoGraph } from "../../../../../Assets/Group 3EmpGraph.svg";

const EmptyGraph = () => {
  return (
    <>
      <div class="report p-3">
        <div class="card-body">
          <div
            className="col-12 d-flex justify-content-center"
            style={{ marginTop: "70px" }}
          >
            <NoGraph />
          </div>
          <div className="col-12 d-flex justify-content-center noRep">
            <p>No Reports Found! </p>
          </div>
          <div className="col-12 d-flex justify-content-center p2">
            <p>Sorry, there is no report available to display at this time.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyGraph;
