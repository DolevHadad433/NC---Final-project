import React, { useState, useEffect, useCallback } from "react";

function useEditWorkout() {
  const editWorkout = useCallback((editedWorkoutID, editedWorkout) => {
    fetch(`/api/workouts/${editedWorkoutID}`, {
      method: "PUT",
      body: JSON.stringify({
        editedWorkout,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }, []);
  return editWorkout;
}

export default useEditWorkout;
