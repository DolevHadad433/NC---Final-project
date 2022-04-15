import React, { useState, useEffect } from "react";

function useDeleteWorkout() {
  const [deletedWorkout, setDeletedWorkout] = useState("");

  function deleteWorkoutHandler(id) {
    fetch(`/api/schedules/${id}`, {
      method: "DELETE",
    });
    fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
    setDeletedWorkout(`Delete the ${id} workout successfully.`);
  }

  return { deleteWorkoutHandler, deletedWorkout };
}

export default useDeleteWorkout;
