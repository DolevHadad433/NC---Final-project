import React, { useState, useEffect } from "react";

function useWorkouts() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [state, setState] = useState();
  useEffect(() => {
    fetch("/api/workouts/")
      .then((response) => response.json())
      .then((data) => setWorkoutsList([...data.reverse()]));
  }, [state]);

  return [workoutsList, setState];
}

export default useWorkouts;
