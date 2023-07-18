import { useEffect, useState } from "react";
import "./Modals.css";
import { ReactComponent as DeleteStroke } from "../../../Assets/Delete.svg";
import { AddNewSkillTest } from "./AddNewSkillTest";
import { ReactComponent as VectorAdd } from "../../../Assets/Vectoradd.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ManageSkillTestSkeleton from "./ManageSkillTestSkeleton";
import Header from "../../Header/Header";
import CryptoJS from "crypto-js";
import Confirmation from "../Confirmation";
export const ManageSkillTest = () => {
  //data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmId, setconfirmId] = useState(-1);
  //function
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  const handleConfirm = (id) => {
    setconfirmId(id);
    setShowConfirm(true);
  };
  const handleCancel = () => {
    setconfirmId(-1);
    setShowConfirm(false);
  };
  const handleDel = (id) => {
    setData(data.filter((item) => item.examId !== id));
  };
  const fetchData = async () => {
    const secretkeyUser = process.env.REACT_APP_USER_KEY;
    var parsedObject;
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data, secretkeyUser);
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
      parsedObject = JSON.parse(decryptedJsonString);
    } else {
      console.log("No encrypted data found in localStorage.");
    }
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v3/getAllExam`,
        {
          headers: {
            Authorization: `Bearer ${parsedObject["token"]}`,
          },
        }
      );
      console.log("object", response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/error/statusCode=401");
      }
      if (error.response.status === 400) {
        navigate("/error/statusCode=400");
      }
      if (error.response.status === 500) {
        navigate("/error/statusCode=500");
      }
      if (error.response.status === 404) {
        navigate("/error/statusCode=404");
      }
      console.error("Error while fetching the data is ", error);
    }
  };
  const handleClick = () => {
    setShowComponent(true);
  };

  return (
    <>
      {showConfirm && (
        <Confirmation
          handleCancel={handleCancel}
          id={confirmId}
          handleDel={handleDel}
          confirmationValue = "manageskill"
        />
      )}
      <div style={{ marginBottom: "5.5rem" }}>
        <Header />
      </div>
      <div className="container-fluid manage-skill-test-container d-flex flex-column">
        <div>
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
                  {/* {showComponent && <AddNewSkillTest />} */}
                  <AddNewSkillTest />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 manageskilltest-table-container">
          <div className="col-12 manage-skill-table-style p-0 ">
            <div
              className="table-responsive"
              style={{ overflow: "visible" }}
            ></div>
            <table id="example" className="table table-striped">
              <thead className="manageskilltest-thead">
                <tr className="color-table">
                  <th className="column-technology" style={{ width: "1rem" }}>
                    S.No
                  </th>
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
                {isLoading ? (
                  <>
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                    <ManageSkillTestSkeleton />
                  </>
                ) : (
                  data?.map((item, index) => {
                    const options = { timeZone: "Asia/Kolkata" };
                    const currentTimeIST = item?.uploadedOn?.toLocaleString(
                      "en-US",
                      options
                    );
                    const dateObj = new Date(currentTimeIST);
                    const date = dateObj?.toISOString().split("T")[0];
                    {
                      /* const time = date?.toTimeString().split(" ")[0]; */
                    }
                    return (
                      <tr key={index}>
                        <td className="technology-rows">{index + 1}</td>
                        <td className="technology-rows">{item?.techName}</td>
                        <td className="name-row">{item?.examName}</td>
                        <td className="levels-row">{item?.level}</td>
                        <td className="questions-row">
                          {item?.numberOfQuestion}
                        </td>
                        <td className="duration-row">{`${item?.examDuration} mins`}</td>
                        <td className="uploaded-on-row">{`${date}`}</td>
                        <td className="delete-btn-row">
                          <button
                            type="button"
                            style={{ border: "none", background: "none" }}
                            onClick={() => {
                              handleConfirm(item?.examId);
                            }}
                          >
                            <DeleteStroke />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
