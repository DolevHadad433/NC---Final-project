import React from "react";
import "./Training.css";

function Training({ title, category, description, duration, groupSize, id }) {
  return (
    <div className="Training">
      <div className="training-container">
        <h3 className="training-title">{title}:</h3>
        <p className="training-subject">
          <span className="subject-title">Description:</span>
          {description}
        </p>
        <p className="training-subject">
          <span className="subject-title">Duration:</span>
          {duration}
        </p>
        <p className="training-subject">
          <span className="subject-title">Group size:</span>
          {groupSize}
        </p>
        <p className="training-subject">
          <span className="subject-title">Trainer:</span>
          NAME
        </p>
        <button className="subscribe-btn">Subscribe</button>
      </div>
    </div>
  );
}

export default Training;
