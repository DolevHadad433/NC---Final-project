import React, { useCallback } from "react";
import moment from "moment";

function useUpdateHistoryScheduled() {
  function UpdateHistoryScheduledHandler(scheduledList) {
    const scheduledThatEnded = scheduledList.filter(
      (scheduled) =>
        moment(
          scheduled.workoutInfo.dayInMonth + " " + scheduled.workoutInfo.time,
          "MMM Do kk:mm A"
        ).isBefore(moment()) &&
        Number(scheduled.workoutInfo.weekOfYear) >
          Number(moment().format("w")) - 2
    );
    if (scheduledThatEnded.length > 0) {
      fetch("/api/history-scheduled", {
        method: "POST",
        body: JSON.stringify(scheduledThatEnded),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    } else {
      console.log("Nothing to update!");
    }
  }

  // const UpdateHistoryScheduledHandler = useCallback((scheduledList) => {
  //   const scheduledThatEnded = scheduledList.filter(
  //     (scheduled) =>
  //       moment(
  //         scheduled.workoutInfo.dayInMonth + " " + scheduled.workoutInfo.time,
  //         "MMM Do kk:mm A"
  //       ).isBefore(moment()) &&
  //       Number(scheduled.workoutInfo.weekOfYear) >
  //         Number(moment().format("w")) - 2
  //   );
  //   fetch("/api/history-scheduled", {
  //     method: "POST",
  //     body: JSON.stringify(
  //       scheduledThatEnded,
  //     ),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   });
  // }, []);

  return UpdateHistoryScheduledHandler;
}

export default useUpdateHistoryScheduled;
