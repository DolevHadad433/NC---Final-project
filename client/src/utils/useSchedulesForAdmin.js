import React, { useState, useEffect } from "react";

function useSchedulesForAdmin({ updateSubscribe, updateUnsubscribe }) {
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
  }, [updateSubscribe, updateUnsubscribe]);

  return schedules;
}

export default useSchedulesForAdmin;
