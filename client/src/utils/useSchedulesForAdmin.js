import React, { useState, useEffect } from "react";

function useSchedulesForAdmin({ deletedWorkout, updateScheduled }) {
  const [schedules, setScheduled] = useState([]);
  useEffect(() => {
    fetch("/api/schedules", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setScheduled([...data.reverse()]));
  }, [deletedWorkout, updateScheduled]);

  return schedules;
}

export default useSchedulesForAdmin;
