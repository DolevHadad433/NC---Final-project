import React, { useState, useEffect } from "react";

function useWorkouts({ updateSubscribe, updateUnsubscribe }) {
  const [workoutsList, setWorkoutsList] = useState([]);
  useEffect(() => {
    fetch("/api/workouts/")
      .then((response) => response.json())
      .then((data) => setWorkoutsList([...data.reverse()]));
  }, [updateSubscribe, updateUnsubscribe]);

  return workoutsList;
}

export default useWorkouts;
