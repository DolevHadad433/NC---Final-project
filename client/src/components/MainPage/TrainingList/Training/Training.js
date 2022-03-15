import React from "react";
import "./Training.css";

function Training({ training }) {
  return (
    <div className="Training">
      <div className="training-container">
        <h3 className="training-title">{training.title}</h3>
        <p className="training-descreption">
          <span>Descreption:</span>
          {training.descreption}
        </p>
        <p className="training-duration">
          <span>Duration:</span>
          {training.duration}
        </p>
        <p className="training-group-size">
          <span>Group size:</span>
          {training.groupSize}
        </p>
      </div>
    </div>
  );
}

export default Training;
