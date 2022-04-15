import React, { useCallback } from "react";

function useDeleteWorkout() {
  const deleteWorkoutHandler = useCallback((id) => {
    fetch(`/api/schedules/${id}`, {
      method: "DELETE",
    });
    fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
  }, []);

  // function deleteWorkoutHandler(id) {
  //   fetch(`/api/schedules/${id}`, {
  //     method: "DELETE",
  //   });
  //   fetch(`/api/workouts/${id}`, {
  //     method: "DELETE",
  //   });
  // }

  return deleteWorkoutHandler;
}

export default useDeleteWorkout;
