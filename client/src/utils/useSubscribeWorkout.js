import React, { useState, useEffect, useCallback } from "react";

function useSubscribeWorkout() {
  const subscribeHandler = useCallback((workoutID, userID) => {
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
  }, []);

  return subscribeHandler;
}

export default useSubscribeWorkout;
