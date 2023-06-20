import React, { useState, useRef } from "react";
// import {ReactComponent as RemoveButton} from "../../Assets/Close.svg";
// import './Modals.css';

const CSVReader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setProgress(0);

    if (selectedFile) {
      readFileData(selectedFile);
    }
  };

  const readFileData = (file) => {
    const reader = new FileReader();

    reader.onloadstart = () => {
      setProgress(0);
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progressPercent = Math.round((e.loaded / e.total) * 100);
        setProgress(progressPercent);
      }
    };

    reader.onload = (e) => {
      const contents = e.target.result;
      // Process the file data here if needed
      setProgress(100);
    };

    reader.readAsText(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files[0])}
          accept=".csv"
          style={{ display: "none" }}
        />
        <button type="button" onClick={handleBrowseClick} className="csv-upload-button">Browse from your computer</button>
      </div>
      {file && (
        <div className="d-flex align-items-center">
          <div>{file.name}</div>
          {/* <button type="button" onClick={handleRemoveFile} className="border-0"><RemoveButton/></button> */}
        </div>
      )}
      {progress > 0 && (
          <progress max="100" value={progress}></progress>
      )}
    </>
  );
};

export default CSVReader;
