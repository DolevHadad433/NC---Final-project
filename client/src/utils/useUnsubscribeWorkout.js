import React, { useState, useEffect } from "react";

function useUnsubscribeWorkout() {
  const [updateUnsubscribe, setUpdateUnsubscribe] = useState("");

  function unsubscribeHandler(scheduledID) {
    fetch(`/api/schedules/${scheduledID}`, {
      method: "DELETE",
    });
    setUpdateUnsubscribe(
      `Unsubscribe the ${scheduledID} workout successfully.`
    );
  }

  return [updateUnsubscribe, unsubscribeHandler];
}

export default useUnsubscribeWorkout;
