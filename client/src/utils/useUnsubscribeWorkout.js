import React, { useState, useEffect, useCallback } from "react";

function useUnsubscribeWorkout() {
  const unsubscribeHandler = useCallback((scheduledID) => {
    fetch(`/api/schedules/${scheduledID}`, {
      method: "DELETE",
    });
  }, []);

  // function unsubscribeHandler(scheduledID) {
  //   fetch(`/api/schedules/${scheduledID}`, {
  //     method: "DELETE",
  //   });
  // }

  return unsubscribeHandler;
}

export default useUnsubscribeWorkout;
