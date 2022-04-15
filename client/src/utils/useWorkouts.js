import React, { useState, useEffect } from "react";

function useWorkouts({ deletedWorkout, updateScheduled }) {
  const [workoutsList, setWorkoutsList] = useState([]);
  useEffect(() => {
    fetch("/api/workouts/")
      .then((response) => response.json())
      .then((data) => setWorkoutsList([...data.reverse()]));
  }, [deletedWorkout, updateScheduled]);

  return workoutsList;
}

export default useWorkouts;
