import React, { useState, useEffect } from "react";

function useSchedulesForAdmin() {
  const [schedulesForAdmin, setScheduledForAdmin] = useState([]);
  const [state, setState] = useState();
  useEffect(() => {
    fetch("/api/schedules", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setScheduledForAdmin([...data.reverse()]));
  }, [state]);

  return [schedulesForAdmin, setState];
}

export default useSchedulesForAdmin;
