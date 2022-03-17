import React, { useEffect, useState } from "react";
import Training from "./Training/Training";
import { useParams } from "react-router-dom";

function TrainingList({ search }) {
  const [trainingList, setTrainingList] = useState([]);
  let { category } = useParams();

  useEffect(() => {
    fetch("/api/training/")
      .then((response) => response.json())
      .then((data) => setTrainingList([...data]));
  }, []);

  return (
    <div className="TrainingList">
      <div className="training-container">
        {trainingList
          .filter((training) => {
            const isInCategory =
              category === undefined || training.category === category;
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