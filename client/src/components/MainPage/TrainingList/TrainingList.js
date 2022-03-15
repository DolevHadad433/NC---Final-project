import React, { useEffect, useState } from "react";
import Training from "./Training/Training";

function TrainingList() {
  const [trainingList, setTrainingList] = useState([]);

  useEffect(() => {
    fetch("/api/training/")
      .then((response) => response.json())
      .then((data) => setTrainingList(data));
  }, []);

  return (
    <div className="TrainingList">
      <div className="training-container">
        <h2 className="training-list-title">Here is the training list:</h2>
        {trainingList.map((training) => {
          return <Training key={training.id} training={training} />;
        })}
      </div>
    </div>
  );
}

export default TrainingList;
