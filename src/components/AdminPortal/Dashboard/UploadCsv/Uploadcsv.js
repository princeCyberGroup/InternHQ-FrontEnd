import '../UploadCsv/uploadCsv.css'
import { ReactComponent as UploadCsv } from "../Assets/upload.svg"
export default function Uploadcsv() {
  return (
    <>
      <div className='upload-bullets'>
        
        <ul>
        <li>To add a new batch of freshers, please upload the CSV file.The CSV file should contain the : </li>
          <li>Names of freshers</li>
          <li>Corresponding IDs</li>
          <li>Duration of their Internship</li>
        </ul>
      </div>
      <button>
       <UploadCsv /> Upload CSV
      </button>

      <div className='row'>
        <div className='col csv-icon'></div>
        <div className='col csv-upload-text'></div>
      </div></>
  )
}