//============ Imports start ============
import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import { v4 as uuid } from "uuid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import ScheduledWorkoutsFilter from "./ScheduledWorkoutsFilter/ScheduledWorkoutsFilter";
import useUpdateWorkout from "../../../utils/useUpdateWorkout";

//============ Imports end ============

//============ Component start ============
function ScheduledWorkoutsList() {
  const { schedulesForAdmin, schedulesForUsers, userNames, deletedWorkout } =
    useWorkoutsContext();

  const { isAdmin } = useUsersContext();

  const schedules = isAdmin() ? schedulesForAdmin : schedulesForUsers;

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
      return (
        <ScheduledWorkoutsFilter
          schedulesList={schedules}
          username={whatIsYourUserName}
        />
      );
    } else return "Not subscribed yet";
  }

  function whatIsYourUserName(userId) {
    const username = userNames.find((e) => e._id === userId);
    if (username !== undefined) {
      return username.username;
    } else return "";
  }

  return (
    <Container maxWidth="xxl" sx={{ alignItems: "center" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Grid item sm={6}>
          <AppBar
            position="static"
            sx={{
              textAlign: "center",
              width: "100%",
              borderRadius: 2,
              marginTop: 5,
            }}
          >
            <Typography variant="h5" component="div">
              {isAdmin() ? "Workouts subscriptions:" : "My workouts:"}
            </Typography>
          </AppBar>
        </Grid>
        <Grid item sm={12} sx={{ height: 200, width: "100%" }}>
          {ifThereIsScheduled()}
        </Grid>
      </Grid>
    </Container>
  );
}
//============ Component end ============

export default ScheduledWorkoutsList;
