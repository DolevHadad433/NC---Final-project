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
      <Training />
    </div>
  );
}

export default TrainingList;
