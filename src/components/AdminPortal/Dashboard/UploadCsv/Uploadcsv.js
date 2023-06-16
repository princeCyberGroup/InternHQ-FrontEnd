import '../UploadCsv/uploadCsv.css'
import { ReactComponent as UploadCsv } from "../Assets/upload.svg"
import React, { useState, useEffect } from 'react';
export default function Uploadcsv() {

  const [csvFile, setCSVFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCSVFile(file);
  };

  const handleUpload = () => {
    // Perform any necessary processing with the CSV file
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        // Process the csvData as per your requirements
        console.log(csvData);
      };
      reader.readAsText(csvFile);
    }
  };
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
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}><UploadCsv /> Upload CSV</button>

      <div className='row'>
        <div className='col csv-icon'></div>
        <div className='col csv-upload-text'></div>
      </div></>
  )
}