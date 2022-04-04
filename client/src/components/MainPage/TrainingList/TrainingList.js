import React, { useEffect, useState } from "react";
import {v4 as uuid} from 'uuid';
import Training from "./Training/Training";
import { useParams } from "react-router-dom";
import "./TrainingList.css";

function TrainingList({ search }) {
  const [trainingList, setTrainingList] = useState([]);
  const [updateTraining, setUpdateTraining] = useState("");
  let { category } = useParams();

  useEffect(() => {
    fetch("/api/training/")
      .then((response) => response.json())
      .then((data) => setTrainingList([...data]));
  }, [updateTraining]);

  async function deleteTraining(_id) {
    await fetch(`/api/training/${_id}`, {
      method: "DELETE",
    });
    setUpdateTraining(`Update the ${_id} training.`);
  }

  return (
    <div className="TrainingList">
      <div className="training-container-list">
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
            return (
              <Training
                key={uuid()}
                training={training}
                deleteTraining={deleteTraining}
              />
            );
          })}
      </div>
    </div>
  );
}

export default TrainingList;
