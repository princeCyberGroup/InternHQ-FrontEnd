import React, { useState } from "react";
import "./DailyUpdateTable.css";

const ImageTooltip = ({ src, alt, tooltipHead, tooltipBody, styleClass }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);//false
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
        <div className={styleClass ? "tooltip last-tooltip" : "tooltip"}>
          <div className="tooltip-head">{tooltipHead}</div>
          <div className="tooltip-body">{tooltipBody}</div>
        </div>
      )}
    </div>
  );
};

export default ImageTooltip;
