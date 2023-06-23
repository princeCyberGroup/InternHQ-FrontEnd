import React, { useState } from "react";
import axios from "axios";

const FileUploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    // Validate if the file is a CSV file
    if (file.type !== "text/csv") {
      alert("Please select a CSV file.");
      return;
    }

    setSelectedFile(file);
    convertFileToString(file);
  };

  const convertFileToString = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileString = event.target.result;
      // Perform further processing or send the fileString to the backend
      // console.log(fileString);
    };
    reader.readAsText(file);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };



  return (
    <div
      onDrop={(e) => handleFileDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
    
    >
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept=".csv"
        onChange={handleFileChange}
      />
      <button type="button" className="btn csv-upload-button" onClick={(e) => handleButtonClick(e)}>Browse from your computer</button>
    
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUploadButton;
