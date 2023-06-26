import "../UploadCsv/uploadCsv.css";
import { ReactComponent as UploadCsvv } from "../../../../Assets/upload.svg";
import { UploadCsv } from "../UploadCsv/UploadCsvModal";
export default function Uploadcsv() {
  return (
    <>
      <div className="upload-bullets">
        <ul>
          <li>
            To add a new batch of freshers, please upload the CSV file.The CSV
            file should contain the :{" "}
          </li>
          <li>
            <b>Names of freshers</b>
          </li>
          <li>
            <b>Corresponding IDs</b>
          </li>
          <li>
            <b>Duration of their Internship</b>
          </li>
        </ul>
      </div>
      <button
        className="upload-btn"
        data-bs-toggle="modal"
        data-bs-target="#uploadCsv"
      >
        <UploadCsvv /> &nbsp;&nbsp;Upload CSV
      </button>
      <div className="row">
        <div className="col csv-icon"></div>
        <div className="col csv-upload-text"></div>
      </div>
      <UploadCsv />
    </>
  );
}
