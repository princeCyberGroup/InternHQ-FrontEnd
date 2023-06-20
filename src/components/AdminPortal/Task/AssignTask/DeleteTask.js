// import {ReactComponent as DeleteTask} from "../../Assets/VectorDelete.svg";
import "./PopUpModals.css";
import { useState } from "react";
import axios from "axios";
import { ReactComponent as DeleteTask } from "../../../../Assets/VectordeleteTsk.svg";

const TaskDeleted = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(props);
  const deleteTask = (taskId) => {
    setIsLoading(true);

    axios
      .post(
        "https://cg-interns-hq.azurewebsites.net/deleteTask"
        // {taskId:`${taskId}`}
      )
      .then((res) => {
        console.log("print", res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#TaskDeleteModal">
  Task Delete
</button> */}

      <div
        class="modal fade"
        id="TaskDeleteModal"
        tabindex="-1"
        aria-labelledby="TaskDeleteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-bottom-0">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <DeleteTask/>
              <div className="mt-3 delete-task-text">Delete Task</div>
              <p className="some-text-styling mt-2">
                Are you sure you want to delete the task.
              </p>
            </div>
            <div>
              <div>
                <button
                  type="button"
                  className="btn no-cancel-button"
                  data-bs-dismiss="modal"
                >
                  <span className="no-cancel-text">No,cancel</span>
                </button>
                <button
                  type="button"
                  className="btn yes-delete-button"
                  onClick={() => deleteTask()}
                  data-bs-dismiss="modal"
                >
                  <span className="yes-delete-text">Yes,delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDeleted;
