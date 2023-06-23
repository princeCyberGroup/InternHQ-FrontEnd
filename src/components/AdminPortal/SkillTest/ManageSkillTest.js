import { useEffect, useState } from "react";
import "./Modals.css";
import { ReactComponent as DeleteStroke } from "../../../Assets/Delete.svg";
import { AddNewSkillTest } from "./AddNewSkillTest";
import { ReactComponent as VectorAdd } from "../../../Assets/Vectoradd.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export const ManageSkillTest = () => {
  //data
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    console.log("this is id and it is working", id);
    axios
      .post(`https://cg-interns-hq.azurewebsites.net/removeExam`, {
        examId: id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setData(data.filter((item) => item.examId !== id));
  };
  const [showComponent, setShowComponent] = useState(false);

  //function
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://cg-interns-hq.azurewebsites.net/getAllExam`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error while fetching the data is ", error);
    }
  };
  const handleClick = () => {
    setShowComponent(true);
  };

  return (
    <div className="container-fluid manage-skill-test-container d-flex flex-column">
      <div className=" ">
        <div className="row ">
          <div className="col-12">
            <div className="manage-skill-test-nav-bar d-flex">
              <Link to="/admin-dashboard" className="breadcrum-link">
                Dashboard
              </Link>{" "}
              &nbsp; &gt; &nbsp;<p>Manage Skill Test</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="manage-skill-test-heading d-flex justify-content-between mb-0">
              <div>
                <p>Manage Skill Set</p>
              </div>
              <div>
                <button
                  type="button"
                  className="add-new-skill-test-button mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#newSkillModal"
                  onClick={handleClick}
                >
                  <VectorAdd />
                  <span>Add New Skill Test</span>
                </button>
                {showComponent && <AddNewSkillTest />}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="col-12 manage-skill-table-style p-0">
            <div
              className="table-responsive"
              style={{ overflow: "visible" }}
            ></div>
            <table id="example" className="table table-striped">
              <thead>
                <tr className="color-table">
                  <th className="column-technology">Technology</th>
                  <th className="column-name">Name</th>
                  <th className="column-level">Level</th>
                  <th className="column-questions">Questions</th>
                  <th className="column-duration">Duration</th>
                  <th className="column-uploaded-on">Uploaded On</th>
                  <th className="column-actions">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  const options = { timeZone: "Asia/Kolkata" };
                  const currentTimeIST = item?.uploadedOn.toLocaleString(
                    "en-US",
                    options
                  );
                  const dateObj = new Date(currentTimeIST);
                  const date = dateObj.toISOString().split("T")[0];
                  const time = dateObj.toTimeString().split(" ")[0];
                  return (
                    <tr key={index}>
                      <td className="technology-rows">{item?.techName}</td>
                      <td className="name-row">{item?.examName}</td>
                      <td className="levels-row">{item?.level}</td>
                      <td className="questions-row">
                        {item?.numberOfQuestion}
                      </td>
                      <td className="duration-row">{`${item?.examDuration} mins`}</td>
                      <td className="uploaded-on-row">{`${date} ${time}`}</td>
                      <td className="delete-btn-row">
                        <button
                          type="button"
                          style={{ border: "none", background: "none" }}
                          onClick={() => handleDelete(item?.examId)}
                        >
                          <DeleteStroke />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
