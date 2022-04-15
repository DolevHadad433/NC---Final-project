import React, { useState, useEffect } from "react";

function useUpdateWorkout({ workoutID, userID, scheduledID }) {
  const [updateSubscribe, setUpdateSubscribe] = useState({ workoutID, userID });
  const [updateUnsubscribe, setUpdateUnsubscribe] = useState({ scheduledID });

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
    setUpdateSubscribe(`Subscribe the ${workoutID} workout successfully.`);
  }

  function unsubscribeHandler() {
    fetch(`/api/schedules/${scheduledID}`, {
      method: "DELETE",
    });
    setUpdateUnsubscribe(
      `Unsubscribe the ${scheduledID} workout successfully.`
    );
  }

  return {
    subscribeHandler,
    unsubscribeHandler,
  };
}

export default useUpdateWorkout;
