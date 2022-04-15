import React, { useState, useEffect } from "react";

function useSubscribe({ workoutID, userID }) {
  const [updateScheduled, setUpdateScheduled] = useState("");
  const [updateWorkout, setUpdateWorkout] = useState("");

  function subscribeHandler() {
    fetch("/api/schedules/create", {
      method: "POST",
      body: JSON.stringify({
        userID,
        workoutID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setUpdateScheduled(`Subscribe the ${id} workout successfully.`);
    setUpdateWorkout(`Subscribe the ${id} workout successfully.`);
  }

  return [subscribeHandler, updateScheduled, updateWorkout];
}

export default useSubscribe;
