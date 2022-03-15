import React, { useEffect, useState } from "react";
import Training from "./Training/Training";
import { useParams } from "react-router-dom";

function TrainingList({ search }) {
  const [trainingList, setTrainingList] = useState([]);
  let { category } = useParams();

  useEffect(() => {
    fetch("/api/training/")
      .then((response) => response.json())
      .then((data) => setTrainingList(data));
  }, []);

  return (
    <div className="TrainingList">
      <div className="training-container">
        <h2 className="training-list-title">Here is the training list:</h2>
        {trainingList
          .filter((training) => {
            const isInCategory =
              training === undefined || training.category === category;
            const isInSearch = training.title
              .toLowerCase()
              .includes(search.toLowerCase());
            return isInCategory && isInSearch;
          })
          .map((training) => {
            return <Training key={training.id} {...training} />;
          })}
      </div>
    </div>
  );
}

export default TrainingList;
