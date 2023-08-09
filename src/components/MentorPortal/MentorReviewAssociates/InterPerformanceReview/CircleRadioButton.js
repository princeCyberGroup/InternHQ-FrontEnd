import React, { useState } from "react";

const CircleRadioButton = ({ value, selected, onClick }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      className={`circle-radio-btn ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default CircleRadioButton;
