import React, { useState } from "react";
import "./DailyUpdateTable.css";

const ImageTooltip = ({ src, alt, tooltipHead, firstActivity, secondActivity, thirdActivity, fourthActivity, fifthActivity, styleClass }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  return (
    <div className="image-tooltip-container">
      <img
        src={src}
        alt={alt}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showTooltip && (
        <div className={styleClass ? "tooltip tooltip-above" : "tooltip"}>
          <div className="tooltip-head">{tooltipHead}</div>
          <div className="tooltip-body">{firstActivity}</div>
          <div className="tooltip-body">{secondActivity}</div>
          <div className="tooltip-body">{thirdActivity}</div>
          <div className="tooltip-body">{fourthActivity}</div>
          <div className="tooltip-body">{fifthActivity}</div>
        </div>
      )}
    </div>
  );
};

export default ImageTooltip;
