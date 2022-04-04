//============ Imports start ============
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Training from "./Training/Training";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import { useParams } from "react-router-dom";
import "./TrainingList.css";
//============ Imports end ============

//============ Component start ============
function TrainingList({ search }) {
  const [trainingList, setTrainingList] = useState([]);
  const [updateTraining, setUpdateTraining] = useState("");
  const { userContextState, userContextDispatch } = useUsersContext();
  let { category } = useParams();
  let isAdmin = false;

  useEffect(() => {
    fetch("/api/training/")
      .then((response) => response.json())
      .then((data) => setTrainingList([...data]));
  }, [updateTraining]);

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }

  async function deleteTraining(_id) {
    await fetch(`/api/training/${_id}`, {
      method: "DELETE",
    });
    setUpdateTraining(`Update the ${_id} training.`);
  }

  if (
    userContextState.username === "Admin" ||
    userContextState.username === "admin" ||
    getUsernameFromLocalStorage(JSON.parse(localStorage.getItem("User"))) ===
      "Admin" ||
    getUsernameFromLocalStorage(JSON.parse(localStorage.getItem("User"))) ===
      "admin"
  ) {
    isAdmin = true;
  } else {
    isAdmin = false;
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
                isAdmin={isAdmin}
              />
            );
          })}
      </div>
    </div>
  );
}
//============ Component end ============

export default TrainingList;
