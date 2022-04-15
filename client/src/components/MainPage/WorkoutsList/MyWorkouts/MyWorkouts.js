import React from "react";
import AppBarMain from "../../ActionsAndUtils/AppBarMain";
import ScheduledWorkoutsList from "../../ScheduledWorkoutsList/ScheduledWorkoutsList";

function MyWorkouts({ updateWorkout, setUpdateWorkout, workoutBaseList }) {
  return (
    <div>
      <AppBarMain />

      <ScheduledWorkoutsList/>
    </div>
  );
}

export default MyWorkouts;
