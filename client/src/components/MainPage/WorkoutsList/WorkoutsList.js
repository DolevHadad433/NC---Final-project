//============ Imports start ============
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Workout from "./Workout/Workout";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
//============ Imports end ============

//============ Component start ============
function WorkoutsList({ search, updateWorkout, setUpdateWorkout }) {
  const [workoutsList, setWorkoutsList] = useState([]);
  const { userContextState, userContextDispatch } = useUsersContext();
  let { category } = useParams();

  useEffect(() => {
    fetch("/api/workouts/")
      .then((response) => response.json())
      .then((data) => setWorkoutsList([...data]));
  }, [updateWorkout]);

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }

  async function deleteWorkout(_id) {
    await fetch(`/api/workouts/${_id}`, {
      method: "DELETE",
    });
    await fetch(`/api/schedules/${_id}`, {
      method: "DELETE",
    });
    setUpdateWorkout(`Update the ${_id} workout.`);
  }

  return (
    <Container maxWidth="xl">
      <div className="WorkoutsList">
        <div className="workout-container-list">
          {workoutsList
            .filter((workout) => {
              const isInCategory =
                category === undefined || workout.category === category;
              const isInSearch = workout.title
                .toLowerCase()
                .includes(search.toLowerCase());
              return isInCategory && isInSearch;
            })
            .map((workout) => {
              return (
                <Workout
                  key={uuid()}
                  workout={workout}
                  deleteWorkout={deleteWorkout}
                />
              );
            })}
        </div>
      </div>
    </Container>
  );
}
//============ Component end ============

export default WorkoutsList;
