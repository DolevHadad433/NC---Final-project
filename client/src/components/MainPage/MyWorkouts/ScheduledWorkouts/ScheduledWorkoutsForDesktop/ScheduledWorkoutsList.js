//============ Imports start ============
import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../../../../../contexts/WorkoutsContext";
import { useUsersContext, Actions } from "../../../../../contexts/UsersContext";
import { v4 as uuid } from "uuid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import ScheduledWorkoutsFilter from "./ScheduledWorkoutsFilter/ScheduledWorkoutsFilter";

//============ Imports end ============

//============ Component start ============
function ScheduledWorkoutsList({
  schedules,
  historyScheduledList,
  setHistoryScheduledList,
  setSchedules
}) {
  const { userNames, deletedWorkout } = useWorkoutsContext();

  const { isAdmin } = useUsersContext();

  function ifThereIsScheduled() {
    if (schedules.length > 0) {
      const scheduledWorkoutsID = schedules.map(
        (scheduled) => scheduled.workoutID
      );
      (function updateLocalStorage() {
        let user = localStorage.getItem("User");
        user = user ? JSON.parse(user) : {};
        user["subscribedWorkouts"] = scheduledWorkoutsID;
        localStorage.setItem(
          "User",
          JSON.stringify({
            ...user,
          })
        );
      })();
      return <ScheduledWorkoutsFilter schedulesList={schedules} />;
    } else return "Not subscribed yet";
  }

  return (
    <Container maxWidth="xxl" sx={{ alignItems: "center" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Grid item sm={12} sx={{ height: 200, width: "100%" }}>
          {ifThereIsScheduled()}
        </Grid>
      </Grid>
    </Container>
  );
}
//============ Component end ============

export default ScheduledWorkoutsList;
