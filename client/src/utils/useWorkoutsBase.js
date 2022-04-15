import React, { useState, useEffect } from "react";

function useWorkoutsBase() {
  const [workoutBaseList, setWorkoutBaseList] = useState([]);
  const [state, setState] = useState();
  useEffect(() => {
    fetch("/api/workoutsBase/")
      .then((responseWorkoutsBase) => responseWorkoutsBase.json())
      .then((dataWorkoutsBase) => setWorkoutBaseList([...dataWorkoutsBase]));
  }, [state]);

  return [workoutBaseList, setState];
}

export default useWorkoutsBase;
