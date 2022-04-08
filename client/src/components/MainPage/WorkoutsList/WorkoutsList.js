//============ Imports start ============
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Workout from "./Workout/Workout";
import { Actions, useUsersContext } from "../../../contexts/UsersContext";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import DataFilter from "../WorkoutsCategoryChooser/DataFilter";
//============ Imports end ============

//============ Component start ============
function WorkoutsList({ search, setSearch, updateWorkout, setUpdateWorkout }) {
  const [workoutsList, setWorkoutsList] = useState([]);
  const { userContextState, userContextDispatch } = useUsersContext();
  let { category } = useParams();
  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }

  useEffect(() => {
    fetch("/api/workouts/")
      .then((response) => response.json())
      .then((data) => setWorkoutsList([...data.reverse()]));
  }, [updateWorkout]);

  async function deleteWorkout(id) {
    const response = await fetch(`/api/schedules/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
    setUpdateWorkout(`Update the ${id} workout.`);
    userContextDispatch({
      type: Actions.updateScheduledWorkouts,
      payload: data,
    });
  }

  return (
    <Container maxWidth="xl">
      <div className="WorkoutsList">
        <div className="workout-container-list">
          <DataFilter
            workoutsList={workoutsList}
            setWorkoutsList={setWorkoutsList}
            search={search}
            setSearch={setSearch}
          />
          {/* {workoutsList
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
            })} */}
        </div>
      </div>
    </Container>
  );
}
//============ Component end ============

export default WorkoutsList;

// {isAdmin() ? (

//   ) : (
//     ""
//   )}
