//============ Imports start ============
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ScheduledWorkout from "./ScheduledWorkout/ScheduledWorkout";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
//============ Imports end ============

//============ Component start ============
function ScheduledWorkoutsList() {
  const [schedules, setScheduled] = useState([]);
  const [updateScheduled, setUpdateScheduled] = useState("");
  const [userNames, setUserNames] = useState([]);
  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();

  //get the schedules workouts by user (the post request send the userID to the server and recieve the data)
  useEffect(async () => {
    // if you are an admin you will get all schedules, if you are an ordinery user you will get just your schedules.
    if (isAdmin()) {
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();

      //getting the usernames of all users and match them to the right scheduled.
      const responseUserName = await fetch("/api/users");
      const dataUserName = await responseUserName.json();
      setUserNames([...dataUserName]);

      setScheduled(data.reverse());
    } else {
      const response = await fetch("/api/schedules/userID", {
        method: "POST",
        body: JSON.stringify({
          userID: getUserIdFromLocalStorage(
            JSON.parse(localStorage.getItem("User"))
          ),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();

      setScheduled(data.reverse());
    }
  }, [updateScheduled, userContextState]);

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }
  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }

  async function unsubscribeScheduledWorkout(_id) {
    await fetch(`/api/schedules/${_id}`, {
      method: "DELETE",
    });
    setUpdateScheduled(`Delete scheduled workout: ${_id}.`);
  }

  function whatIsYourUserName(userId) {
    const username = userNames.find(e => e._id === userId);
    return username;
  }

  function ifThereIsScheduled() {
    if (schedules !== "") {
      return schedules.map((scheduled) => (
        <ScheduledWorkout
          key={uuid()}
          scheduled={scheduled}
          unsubscribeScheduledWorkout={unsubscribeScheduledWorkout}
          userName={whatIsYourUserName(scheduled.userID)}
        />
      ));
    } else return "Not subscribed yet";
  }

  return (
    <Container maxWidth="xxl" sx={{ alignItems: "center" }}>
      <Grid container direction="row" justifyContent="center">
        <Grid item sm={6}>
          <AppBar
            position="static"
            sx={{
              textAlign: "center",
              width: 200,
              borderRadius: 1,
              marginLeft: 3,
              marginBottom: 4,
            }}
          >
            <Typography variant="h6" component="div">
              My workouts:
            </Typography>
          </AppBar>
        </Grid>
        <Grid item sm={12}>
          {ifThereIsScheduled()}
        </Grid>
      </Grid>
    </Container>
  );
}
//============ Component end ============

export default ScheduledWorkoutsList;
