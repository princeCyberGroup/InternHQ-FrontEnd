import React from "react";

export default function ModalView (){
    return (
        <>
          <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <span class="modal-title instruction" id="staticBackdropLabel">
                 Time is up {" "}
                </span>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
              </div>
              <div class="modal-body">  TimeOut  </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-danger"
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