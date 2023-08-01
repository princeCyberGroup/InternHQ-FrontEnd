import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import "./MentorAssignNewTask.css";
import axios from "axios";
const MentorAssignNewTask = () => {
  //data
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [technologyTag, setTechnologyTag] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [selectAllAssociate, setSelectAllAssociate] = useState(false);
  const [ratedTask, setRatedTask] = useState(false);

  //function
  const handleCancel = () => {
    // Clear all form fields
    setTaskTitle("");
    setDescription("");
    setSelectAllAssociate(false);
    setRatedTask(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data as a JSON object
    const formData = {
      taskTitle,
      description,
      selectAllAssociate,
      ratedTask,
    };

    // Send the form data to the backend API
    axios
      .post("/api/endpoint", formData)
      .then((response) => {
        // Handle the API response if needed
        console.log("API response:", response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("API error:", error);
      });
  };
  return (
    <>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#mentorAssignModal"
      >
        + Assign New Task
      </button>
      <div className="modal fade" id="mentorAssignModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <span>Assign New Task</span>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              {/* <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClose}>
                Close
              </button> */}
              <Form className="custom-form">
                <Form.Group controlId="taskTitle">
                  <Form.Label className="mb-1 custom-form-label">
                    Task Title *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label className="mb-1 custom-form-label">
                    Description *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="startDate">
                      <Form.Label className="mb-1 custom-form-label">
                        Start Date *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="endDate">
                      <Form.Label className="mb-1 custom-form-label">
                        End Date *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="technologyTag">
                  <Form.Label className="mb-1 custom-form-label">
                    Technology Tag
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter technology tag"
                    value={technologyTag}
                    onChange={(e) => setTechnologyTag(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="assignedTo">
                  <Form.Label className="mb-1 custom-form-label">
                    Assigned To
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter assigned to"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  />
                </Form.Group>
                {/* <Row className="mb-3 d-flex align-items-center">
                  <Col md={10}>
                    <Form.Label className="mb-1 custom-form-label">
                      Select All Associate Consultant
                    </Form.Label>
                  </Col>
                  <Col md={2}>
                    <Form.Check
                      type="switch"
                      id="selectAllAssociateSwitch"
                      checked={selectAllAssociate}
                      className="custom-switch-container"
                      onChange={() =>
                        setSelectAllAssociate(!selectAllAssociate)
                      }
                    />
                  </Col>
                </Row> */}

                <Row className="mb-3 d-flex align-items-center">
                  <Col md={10}>
                    <Form.Label className="mb-1 custom-form-label">
                      This is the Rated Task
                    </Form.Label>
                  </Col>
                  <Col md={2}>
                    <Form.Check
                      type="switch"
                      id="ratedTaskSwitch"
                      checked={ratedTask}
                      onChange={() => setRatedTask(!ratedTask)}
                      className="custom-switch-container"
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mb-3">
                  <Button
                    variant="secondary"
                    type="button"
                    className="custom-cancel-button me-2 "
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorAssignNewTask;
