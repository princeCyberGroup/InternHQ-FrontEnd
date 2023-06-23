import React from "react";

export default function ModalView (){
    return (
        <>
          <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title instruction" id="staticBackdropLabel">
                 Time is up {" "}
                </span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
              </div>
              <div className="modal-body">  TimeOut  </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>{" "}
                <button
                  type="button"
                  onClick={() => {
                    // submitQuiz();
                    // setFullscreen(false);
                    // submitTest();
                    // clickHandler();
                  }}
                  
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
       
        </>
    );

}