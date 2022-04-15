import React, { useState, useEffect } from "react";

function useSchedulesForUsers() {
  const [schedulesForUsers, setScheduledForUsers] = useState([]);
  const [state, setState] = useState();
  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }

  useEffect(() => {
    fetch("/api/schedules/userID", {
      method: "POST",
      body: JSON.stringify({
        userID: getUserIdFromLocalStorage(
          JSON.parse(localStorage.getItem("User"))
        ),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setScheduledForUsers([...data.reverse()]));
  }, [state]);

  return [schedulesForUsers, setState];
}

export default useSchedulesForUsers;
