import React, { useState, useEffect } from "react";

function useSchedulesForUsers({ updateSubscribe, updateUnsubscribe }) {
  const [schedules, setScheduled] = useState([]);

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
      .then((data) => setScheduled([...data.reverse()]));
  }, [updateSubscribe, updateUnsubscribe]);

  return schedules;
}

export default useSchedulesForUsers;
