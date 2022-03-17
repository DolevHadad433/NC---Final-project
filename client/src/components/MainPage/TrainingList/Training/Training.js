import React from "react";
import "./Training.css";

function Training({ title, category, description, duration, groupSize, id }) {
  return (
    <div className="Training">
      <div className="training-container">
        <h3 className="training-title">{title}</h3>
        <p className="training-description">
          <span>Description:</span>
          {description}
        </p>
        <p className="training-duration">
          <span>Duration:</span>
          {duration}
        </p>
        <p className="training-group-size">
          <span>Group size:</span>
          {groupSize}
        </p>
      </div>
    </div>
  );
}

export default Training;