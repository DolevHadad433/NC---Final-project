//============ Imports start ============
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Actions, useUsersContext } from "../../../contexts/UsersContext";
import { useParams } from "react-router-dom";
import { Container, Box } from "@mui/material";
import WorkoutFilter from "./WorkoutFilter/WorkoutFilter";
//============ Imports end ============

//============ Component start ============
function WorkoutsList({
  search,
  setSearch,
  updateWorkout,
  setUpdateWorkout,
  forUnsubscribeButton,
  setUpdateScheduled,
  updateScheduled
}) {
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
  }, [updateWorkout, updateScheduled]);

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
    <Container maxWidth="xl" sx={{}}>
      <div className="WorkoutsList">
        <div className="workout-container-list">
          <WorkoutFilter
            workoutsList={workoutsList}
            setWorkoutsList={setWorkoutsList}
            search={search}
            setSearch={setSearch}
            deleteWorkout={deleteWorkout}
            setUpdateScheduled={setUpdateScheduled}
            forUnsubscribeButton={forUnsubscribeButton}
          />
        </div>
      </div>
    </Container>
  );
}
//============ Component end ============

export default WorkoutsList;

