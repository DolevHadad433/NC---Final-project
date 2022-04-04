import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ScheduledTraining from "./ScheduledTraining/ScheduledTraining";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import AppBar from "@mui/material/AppBar";

import Typography from "@mui/material/Typography";

function ScheduledTrainings() {
  const [schedules, setScheduled] = useState([]);
  const [updateScheduled, setUpdateScheduled] = useState("");
  const { userContextState, userContextDispatch } = useUsersContext();

  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }

  useEffect(async () => {
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
    console.log(data);

    setScheduled(data.reverse());
  }, [updateScheduled, userContextState]);

  //=======DELETE========Modal ** NOT DONE YET **=============

  async function unsubscribeScheduledTraining(_id) {
    await fetch(`/api/schedules/${_id}`, {
      method: "DELETE",
    });
    setUpdateScheduled(`Delete scheduled training: ${_id}.`);
  }

  //===========================DELETE=========================

  function ifThereIsScheduled() {
    if (schedules !== "") {
      return schedules.map((scheduled) => (
        <ScheduledTraining
          key={uuid()}
          scheduled={scheduled}
          unsubscribeScheduledTraining={unsubscribeScheduledTraining}
        />
      ));
    } else return "Not subscribed yet";
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          textAlign: "center",
          width: 200,
          borderRadius: 1,
          marginLeft: 5,
          marginBottom: 4,
        }}
      >
        <Typography variant="h6" component="div">
          My trainings:
        </Typography>
      </AppBar>

      {ifThereIsScheduled()}
    </>
  );
}

export default ScheduledTrainings;
