import React, { useState, useEffect, useCallback } from "react";

function useSubscribeWorkout() {
  const [updateSubscribe, setUpdateSubscribe] = useState("");

  function subscribeHandler(workoutID, userID) {
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

  return [updateSubscribe, subscribeHandler];
}

export default useSubscribeWorkout;







// useEffect(()=>{
//   fetch("/api/schedules/create", {
//     method: "POST",
//     body: JSON.stringify({
//       userID,
//       workoutID,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   setUpdateSubscribe(`Subscribe the ${workoutID} workout successfully.`);
// },[])

// const subscribeHandler = useCallback(
//   (workoutID, userID) => {
//     fetch("/api/schedules/create", {
//       method: "POST",
//       body: JSON.stringify({
//         userID,
//         workoutID,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });
//     setUpdateSubscribe(`Subscribe the ${workoutID} workout successfully.`);
//   },
//   [updateSubscribe]
// );
