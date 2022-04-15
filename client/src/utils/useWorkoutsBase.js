import React, { useState, useEffect } from "react";

function useWorkoutsBase() {
  const [workoutBaseList, setWorkoutBaseList] = useState([]);

  useEffect(() => {
    fetch("/api/workoutsBase/")
      .then((responseWorkoutsBase) => responseWorkoutsBase.json())
      .then((dataWorkoutsBase) => setWorkoutBaseList([...dataWorkoutsBase]));
  }, []);

  return workoutBaseList;
}

export default useWorkoutsBase;
